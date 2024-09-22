import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

interface IState {
    user: string | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

type ErrorResponse =
    | {
          response?: {
              data?: {
                  message?: string;
              };
          };
          message?: string;
      }
    | string;

// Get user from local storage
const localUser: string | null = localStorage.getItem('user');
const user = localUser ? JSON.parse(localUser) : '';

const initialState: IState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register User
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error: ErrorResponse) {
            const message: string =
                error?.response?.data?.message ||
                error?.message ||
                error?.toString();

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (err: unknown) {
        const error = err as ErrorResponse;

        const message: string =
            error?.response?.data?.message ||
            error?.message ||
            error?.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export const authSlice = createSlice({
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
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
