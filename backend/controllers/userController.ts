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

// @desc    Create  user
// @route   POST    /api/users
// @access  Private
const createUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json({ message: 'User created' });
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

export { getUsers, createUser, updateUser, deleteUser };
