import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, UserInterface } from '../models/userModel';
import { RequestExtended } from '../middlewares/authMiddleware';

// @desc    Get users
// @route   GET    /api/users
// @access  Private
const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
});

// @desc    Register  user
// @route   POST    /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exist
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists.');
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id as string),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Login  user
// @route   POST    /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id as string),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get  user data
// @route   GET    /api/users/me
// @access  Private
const getLoggedInUser = asyncHandler(
    async (req: RequestExtended, res: Response) => {
        const result = (await User.findById(req?.user?._id)) as UserInterface;

        if (!result._id || !result.name || !result.email) {
            res.status(400);
            throw new Error('Missing user details in header');
        } else {
            res.status(200).json({
                id: result._id,
                name: result.name,
                email: result.email,
            });
        }
    },
);

// @desc    Update  user
// @route   PUT    /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!updatedUser) {
        res.status(400);
        throw new Error('User not found!');
    }

    res.status(200).json(updatedUser);
});

// @desc    Delete  user
// @route   DELETE    /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(400);
        throw new Error('User not found!');
    }

    res.status(200).json({ id: req.params.id });
});

// Generate Token
const generateToken = (id: string) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: '5h' });
};

export {
    getUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getLoggedInUser,
};
