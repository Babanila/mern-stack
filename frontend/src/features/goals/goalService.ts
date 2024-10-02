import axios, { isAxiosError } from 'axios';

const API_URL = '/api/goals/';

export interface IGoalData {
    createdAt: Date;
    text: string;
    updatedAt: Date;
    user: string;
    __v: number;
    _id: string;
}

export type IGoalsResponse = IGoalData[] | [];

export interface IGoalErrorResponse {
    message: string;
    stack: string;
}

export interface IGoalDeleteResponse {
    id: string;
}

// Set User Goal Endpoint
const createGoal = async (text: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(API_URL, { text }, config);

        if (typeof response.data === 'string') {
            return {
                message: 'Something went wrong',
                stack: `${response.data}`,
            };
        } else {
            return response.data as IGoalData;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error?.response?.data as IGoalErrorResponse;
        } else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
};

// Get User Goals Endpoint
const getGoals = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(API_URL, config);

        if (typeof response.data === 'string') {
            return {
                message: 'Something went wrong',
                stack: `${response.data}`,
            };
        } else {
            return response.data as IGoalsResponse;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error?.response?.data as IGoalErrorResponse;
        } else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
};

// Delete User Goal Endpoint
const deleteGoal = async (goalId: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(API_URL + goalId, config);
        if (typeof response.data === 'string') {
            return {
                message: 'Something went wrong',
                stack: `${response.data}`,
            };
        } else {
            return response.data as IGoalDeleteResponse;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error?.response?.data as IGoalErrorResponse;
        } else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
};

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
};

export default goalService;
