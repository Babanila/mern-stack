import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware";
dotenv.config();

const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: number = Number(process.env.PORT) || 8000;

app.use("/api/goals", require("./routes/goalRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
