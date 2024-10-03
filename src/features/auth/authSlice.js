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
exports.reset = exports.authSlice = exports.logout = exports.login = exports.register = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authService_1 = __importDefault(require("./authService"));
// Get user from local storage
const localUser = localStorage.getItem('user');
const user = localUser ? JSON.parse(localUser) : null;
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};
// Register User
exports.register = (0, toolkit_1.createAsyncThunk)('auth/register', (user, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield authService_1.default.register(user);
    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue('Something went wrong, please try again later.');
    }
    else if (response.message) {
        return thunkAPI.rejectWithValue(response.message);
    }
    else {
        return response;
    }
}));
// Login User
exports.login = (0, toolkit_1.createAsyncThunk)('auth/login', (user, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield authService_1.default.login(user);
    if (response.message) {
        return thunkAPI.rejectWithValue(response.message);
    }
    else {
        return response;
    }
}));
exports.logout = (0, toolkit_1.createAsyncThunk)('auth/logout', () => __awaiter(void 0, void 0, void 0, function* () {
    yield authService_1.default.logout();
}));
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
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
            .addCase(exports.register.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
            .addCase(exports.register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
            .addCase(exports.login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
            .addCase(exports.login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
            .addCase(exports.logout.fulfilled, (state) => {
            state.user = null;
        });
    },
});
exports.reset = exports.authSlice.actions.reset;
exports.default = exports.authSlice.reducer;
