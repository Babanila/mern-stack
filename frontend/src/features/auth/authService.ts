import axios from 'axios';

const API_URL = '/api/user/';

export interface IUserRegistrationData {
    name: string;
    email: string;
    password: string;
}

export type IUserLoginData = Omit<IUserRegistrationData, 'name'>;

// Register User
const register = async (userData: IUserRegistrationData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login User
const login = async (userData: IUserLoginData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
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

export default authService;
