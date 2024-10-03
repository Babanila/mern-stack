import path from 'path';
import express, { Request, Response } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorMiddleware';
import { goalRoutes } from './routes/goalRoutes';
import { userRoutes } from './routes/userRoutes';
import { connectToDatabase } from './config/db';
dotenv.config();

connectToDatabase();
const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: number = Number(process.env.PORT) || 8000;

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'),
        ),
    );
} else {
    app.get('/', (req: Request, res: Response) => {
        res.send("Please set environment to production, or run 'npm run dev'");
    });
}

app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(colors.yellow(`Server is running on http://localhost:${port}`));
});
