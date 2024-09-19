"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
// @desc    Get users
// @route   GET    /api/users
// @access  Private
const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.User.find();
    res.status(200).json(users);
}));
exports.getUsers = getUsers;
// @desc    Register  user
// @route   POST    /api/users/register
// @access  Public
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // Check if user exist
    const userExist = yield userModel_1.User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists.');
    }
    // Hash Password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield userModel_1.User.create({ name, email, password: hashedPassword });
    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.registerUser = registerUser;
// @desc    Login  user
// @route   POST    /api/users/login
// @access  Public
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const user = yield userModel_1.User.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}));
exports.loginUser = loginUser;
// @desc    Get  user data
// @route   GET    /api/users/me
// @access  Private
const getLoggedInUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { _id, name, email } = (yield userModel_1.User.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id));
    if (!_id || !name || !email) {
        res.status(400);
        throw new Error('Missing user details');
    }
    else {
        res.status(200).json({
            id: _id,
            name: name,
            email: email,
        });
    }
}));
exports.getLoggedInUser = getLoggedInUser;
// @desc    Update  user
// @route   PUT    /api/users/:id
// @access  Private
const updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield userModel_1.User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!updatedUser) {
        res.status(400);
        throw new Error('User not found!');
    }
    res.status(200).json(updatedUser);
}));
exports.updateUser = updateUser;
// @desc    Delete  user
// @route   DELETE    /api/users/:id
// @access  Private
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findByIdAndDelete(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error('User not found!');
    }
    res.status(200).json({ id: req.params.id });
}));
exports.deleteUser = deleteUser;
// Generate Token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: '5h' });
};
