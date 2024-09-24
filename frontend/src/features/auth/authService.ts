import axios, { isAxiosError } from 'axios';

const API_URL = '/api/users/';

export interface IUserRegistrationData {
    name: string;
    email: string;
    password: string;
}

export interface IUserErrorResponse {
    message: string;
    stack: string;
}

export type IUserLoginData = Omit<IUserRegistrationData, 'name'>;

// Register User
const register = async (userData: IUserRegistrationData) => {
    try {
        const response = await axios.post(API_URL, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error?.response?.data as IUserErrorResponse;
        } else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
};

// Login User
const login = async (userData: IUserLoginData) => {
    try {
        const response = await axios.post(API_URL + 'login', userData);

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response?.data as IUserErrorResponse;
        } else {
            return { message: 'Other error related to 400', stack: `${error}` };
        }
    }
};

// Logout User
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export { isAxiosError };
export default authService;
