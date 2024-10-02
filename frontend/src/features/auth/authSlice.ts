import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService, {
    IUserRegistrationData,
    IUserLoginData,
    IUserErrorResponse,
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

// Get user from local storage
const localUser: string | null = localStorage.getItem('user');
const user: IUserResponse = localUser ? JSON.parse(localUser) : null;

const initialState: IState = {
    user: user ? user : null,
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
        rejectValue: string;
    }
>('auth/register', async (user, thunkAPI) => {
    const response = await authService.register(user);

    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue(
            'Something went wrong, please try again later.',
        );
    } else if (response.message) {
        return thunkAPI.rejectWithValue(response.message);
    } else {
        return response;
    }
});

// Login User
export const login = createAsyncThunk<
    IUserResponse,
    IUserLoginData,
    {
        rejectValue: IUserErrorResponse;
    }
>('auth/login', async (user: IUserLoginData, thunkAPI) => {
    const response = await authService.login(user);

    if (response.message) {
        return thunkAPI.rejectWithValue(response.message);
    } else {
        return response;
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
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as unknown as string;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export type { IUserRegistrationData, IUserLoginData };
export const { reset } = authSlice.actions;
export default authSlice.reducer;
