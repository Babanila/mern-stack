import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel';

// @desc    Get users
// @route   GET    /api/users
// @access  Private
const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
});

// @desc    Get  user data
// @route   GET    /api/users/me
// @access  Public
const getMe = asyncHandler(async (req: Request, res: Response) => {
    /*
    if (!req.body) {
        res.status(400);
        throw new Error('Please add a payload with email and password');
    }

    const user = await User.find({ ...req.body });

    res.status(201).json(user);
    */
    res.status(201).json({ message: 'User data details' });
});

// @desc    Register  user
// @route   POST    /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400);
        throw new Error('Please add a payload with name, email and password');
    }

    const user = await User.create({ ...req.body });

    res.status(201).json(user);
});

// @desc    Login  user
// @route   POST    /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    /*
    if (!req.body) {
        res.status(400);
        throw new Error('Please add a payload with email and password');
    }

    const user = await User.find({ ...req.body });

    res.status(201).json(user);
    */
    res.status(201).json({ message: 'Login Sucessful.' });
});

// @desc    Update  user
// @route   PUT    /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json({ message: 'User updated' });
});

// @desc    Delete  user
// @route   DELETE    /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json({ message: 'User deleted' });
});

export { getMe, getUsers, registerUser, loginUser, updateUser, deleteUser };
