"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authSlice_1 = __importDefault(require("../features/auth/authSlice"));
const goalSlice_1 = __importDefault(require("../features/goals/goalSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: authSlice_1.default,
        goals: goalSlice_1.default,
    },
});
