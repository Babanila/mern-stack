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
exports.reset = exports.goalSlice = exports.deleteGoal = exports.getGoals = exports.createGoal = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const goalService_1 = __importDefault(require("./goalService"));
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};
// Create new goal
exports.createGoal = (0, toolkit_1.createAsyncThunk)('goals/create', (text, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const token = (_d = (_c = (_b = (_a = thunkAPI.getState()) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : '';
    const response = yield goalService_1.default.createGoal(text, token);
    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue('Something went wrong, please try again later.');
    }
    else if (Object.keys(response).includes('message')) {
        return thunkAPI.rejectWithValue(response === null || response === void 0 ? void 0 : response.message);
    }
    else {
        return response;
    }
}));
// Get user goals
exports.getGoals = (0, toolkit_1.createAsyncThunk)('goals/getAll', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const token = (_d = (_c = (_b = (_a = thunkAPI.getState()) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : '';
    const response = yield goalService_1.default.getGoals(token);
    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue('Something went wrong, please try again later.');
    }
    else if (Object.keys(response).includes('message')) {
        return thunkAPI.rejectWithValue(response === null || response === void 0 ? void 0 : response.message);
    }
    else {
        return response;
    }
}));
// Delete user goal
exports.deleteGoal = (0, toolkit_1.createAsyncThunk)('goals/delete', (id, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const token = (_d = (_c = (_b = (_a = thunkAPI.getState()) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : '';
    const response = yield goalService_1.default.deleteGoal(id, token);
    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue('Something went wrong, please try again later.');
    }
    else if (Object.keys(response).includes('message')) {
        return thunkAPI.rejectWithValue(response === null || response === void 0 ? void 0 : response.message);
    }
    else {
        return response;
    }
}));
exports.goalSlice = (0, toolkit_1.createSlice)({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.createGoal.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.createGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals.push(action.payload);
        })
            .addCase(exports.createGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.getGoals.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.getGoals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = action.payload;
        })
            .addCase(exports.getGoals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
            .addCase(exports.deleteGoal.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.deleteGoal.fulfilled, (state, action) => {
            const payload = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = state.goals.filter((goal) => goal._id !== payload.id);
        })
            .addCase(exports.deleteGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    },
});
exports.reset = exports.goalSlice.actions.reset;
exports.default = exports.goalSlice.reducer;
