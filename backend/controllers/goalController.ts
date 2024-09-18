import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Goal } from '../models/goalModel';

// @desc    Get goal
// @route   GET    /api/goals
// @access  Private
const getGoals = asyncHandler(async (req: Request, res: Response) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST    /api/goals
// @access  Private
const setGoal = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error(
            'Please add a payload with text key e.g text: value-one',
        );
    }

    const goal = await Goal.create({
        text: req.body.text,
    });

    res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT    /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req: Request, res: Response) => {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!updatedGoal) {
        res.status(400);
        throw new Error('Goal not found!');
    }

    res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE    /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
    const goal = await Goal.findByIdAndDelete(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found!');
    }

    res.status(200).json({ message: `Goal with id ${req.params.id} deleted` });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
