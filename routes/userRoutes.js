"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
exports.userRoutes = router;
router.get('/', userController_1.getUsers);
router.get('/me', authMiddleware_1.protect, userController_1.getLoggedInUser);
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.put('/:id', userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
