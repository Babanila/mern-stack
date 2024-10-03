"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importStar(require("axios"));
const API_URL = '/api/goals/';
// Set User Goal Endpoint
const createGoal = (text, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.post(API_URL, { text }, config);
        if (typeof response.data === 'string') {
            return {
                message: 'Something went wrong',
                stack: `${response.data}`,
            };
        }
        else {
            return response.data;
        }
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error) && error.response) {
            return (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
        }
        else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
});
// Get User Goals Endpoint
const getGoals = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.get(API_URL, config);
        if (typeof response.data === 'string') {
            return {
                message: 'Something went wrong',
                stack: `${response.data}`,
            };
        }
        else {
            return response.data;
        }
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error) && error.response) {
            return (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
        }
        else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
});
// Delete User Goal Endpoint
const deleteGoal = (goalId, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.delete(API_URL + goalId, config);
        if (typeof response.data === 'string') {
            return {
                message: 'Something went wrong',
                stack: `${response.data}`,
            };
        }
        else {
            return response.data;
        }
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error) && error.response) {
            return (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data;
        }
        else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
});
const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
};
exports.default = goalService;
