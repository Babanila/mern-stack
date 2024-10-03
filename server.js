"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const goalRoutes_1 = require("./routes/goalRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const db_1 = require("./config/db");
dotenv_1.default.config();
(0, db_1.connectToDatabase)();
const app = (0, express_1.default)();
// Add middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = Number(process.env.PORT) || 8000;
app.use('/api/goals', goalRoutes_1.goalRoutes);
app.use('/api/users', userRoutes_1.userRoutes);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});
app.use(errorMiddleware_1.errorHandler);
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(colors_1.default.yellow(`Server is running on http://localhost:${port}`));
});
