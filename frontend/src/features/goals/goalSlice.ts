import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService, {
    IGoalData,
    IGoalsResponse,
    IGoalDeleteResponse,
    IGoalErrorResponse,
} from './goalService';
import { RootState } from '../../app/store';

export interface IState {
    goals: IGoalData[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: IState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new goal
export const createGoal = createAsyncThunk<
    IGoalData | IGoalErrorResponse,
    string,
    {
        state: RootState;
        rejectValue: string;
    }
>('goals/create', async (text: string, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.user?.token ?? '';
    const response = await goalService.createGoal(text, token);

    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue(
            'Something went wrong, please try again later.',
        );
    } else if (Object.keys(response).includes('message')) {
        return thunkAPI.rejectWithValue(
            (response as IGoalErrorResponse)?.message,
        );
    } else {
        return response as IGoalData;
    }
});

// Get user goals
export const getGoals = createAsyncThunk<
    IGoalsResponse | IGoalErrorResponse,
    undefined,
    {
        state: RootState;
        rejectValue: string;
    }
>('goals/getAll', async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.user?.token ?? '';
    const response = await goalService.getGoals(token);

    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue(
            'Something went wrong, please try again later.',
        );
    } else if (Object.keys(response).includes('message')) {
        return thunkAPI.rejectWithValue(
            (response as IGoalErrorResponse)?.message,
        );
    } else {
        return response as IGoalsResponse;
    }
});

// Delete user goal
export const deleteGoal = createAsyncThunk<
    IGoalDeleteResponse | IGoalErrorResponse,
    string,
    {
        state: RootState;
        rejectValue: string;
    }
>('goals/delete', async (id: string, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.user?.token ?? '';
    const response = await goalService.deleteGoal(id, token);

    if (typeof response === 'string') {
        return thunkAPI.rejectWithValue(
            'Something went wrong, please try again later.',
        );
    } else if (Object.keys(response).includes('message')) {
        return thunkAPI.rejectWithValue(
            (response as IGoalErrorResponse)?.message,
        );
    } else {
        return response as IGoalDeleteResponse;
    }
});

export const goalSlice = createSlice({
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
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload as IGoalData);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload as IGoalsResponse;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                const payload = action.payload as IGoalDeleteResponse;
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter(
                    (goal) => goal._id !== payload.id,
                );
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export type { IGoalData, IGoalDeleteResponse };
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
