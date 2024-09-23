import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService, {
    IUserRegistrationData,
    IUserLoginData,
} from './authService';

export interface IUserResponse {
    id: string;
    name: string;
    email: string;
    token: string;
}

export interface IState {
    user: IUserResponse | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

export type ErrorResponse =
    | {
          response?: {
              data?: {
                  message?: string;
              };
          };
      }
    | { message: string }
    | string
    | unknown;

// Get user from local storage
const localUser: string | null = localStorage.getItem('user');
const user: IUserResponse = localUser ? JSON.parse(localUser) : null;

const initialState: IState = {
    user: user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register User
export const register = createAsyncThunk<
    IUserResponse,
    IUserRegistrationData,
    {
        rejectValue: ErrorResponse;
    }
>('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error) as ErrorResponse;
    }
});

// Login User
export const login = createAsyncThunk<
    IUserResponse,
    IUserLoginData,
    {
        rejectValue: ErrorResponse;
    }
>('auth/login', async (user: IUserLoginData, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        /*
            const error = err as ErrorResponse;
            const message: string =
                error?.response?.data?.message ||
                error?.message ||
                error?.toString();
        */

        console.log('error', error);
        return thunkAPI.rejectWithValue(error) as ErrorResponse;
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
                state.user = action.payload as IUserResponse;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            });
    },
});

export type { IUserRegistrationData, IUserLoginData };
export const { reset } = authSlice.actions;
export default authSlice.reducer;
