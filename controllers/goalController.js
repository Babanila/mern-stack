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
exports.deleteGoal = exports.updateGoal = exports.setGoal = exports.getGoals = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const goalModel_1 = require("../models/goalModel");
const userModel_1 = require("../models/userModel");
// @desc    Get goal
// @route   GET    /api/goals
// @access  Private
const getGoals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const goals = yield goalModel_1.Goal.find({ user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id });
    res.status(200).json(goals);
}));
exports.getGoals = getGoals;
// @desc    Set goal
// @route   POST    /api/goals
// @access  Private
const setGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a payload with text key e.g text: value-one');
    }
    const goal = yield goalModel_1.Goal.create({
        user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
        text: req.body.text,
    });
    res.status(201).json(goal);
}));
exports.setGoal = setGoal;
// @desc    Update goal
// @route   PUT    /api/goals/:id
// @access  Private
const updateGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const goal = yield goalModel_1.Goal.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    const user = yield userModel_1.User.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    // Make sure that loggedin user matches goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    const updatedGoal = yield goalModel_1.Goal.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updatedGoal) {
        res.status(500);
        throw new Error('Server error, try again!');
    }
    res.status(200).json(updatedGoal);
}));
exports.updateGoal = updateGoal;
// @desc    Delete goal
// @route   DELETE    /api/goals/:id
// @access  Private
const deleteGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const goal = yield goalModel_1.Goal.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found!');
    }
    const user = yield userModel_1.User.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    // Make sure that loggedin user matches goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    yield goalModel_1.Goal.findByIdAndDelete(id);
    res.status(200).json({ id });
}));
exports.deleteGoal = deleteGoal;
