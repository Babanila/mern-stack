import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Goal } from '../models/goalModel';
import { User } from '../models/userModel';
import { RequestExtended } from '../middlewares/authMiddleware';

// @desc    Get goal
// @route   GET    /api/goals
// @access  Private
const getGoals = asyncHandler(async (req: RequestExtended, res: Response) => {
    const goals = await Goal.find({ user: req?.user?.id });
    res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST    /api/goals
// @access  Private
const setGoal = asyncHandler(async (req: RequestExtended, res: Response) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error(
            'Please add a payload with text key e.g text: value-one',
        );
    }

    const goal = await Goal.create({
        user: req?.user?.id,
        text: req.body.text,
    });

    res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT    /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req: RequestExtended, res: Response) => {
    const id = req.params.id;

    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req?.user?.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure that loggedin user matches goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updatedGoal) {
        res.status(500);
        throw new Error('Server error, try again!');
    }

    res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE    /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req: RequestExtended, res: Response) => {
    const id = req.params.id;

    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found!');
    }

    const user = await User.findById(req?.user?.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure that loggedin user matches goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await Goal.findByIdAndDelete(id);
    res.status(200).json({ id });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
