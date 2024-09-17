import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// @desc    Get goal
// @route   GET    /api/goals
// @access  Private
const getGoals = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Get goal" });
});

// @desc    Set goal
// @route   POST    /api/goals
// @access  Private
const setGoal = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a payload");
  }

  res.status(201).json({ message: "Set goal" });
});

// @desc    Update goal
// @route   PUT    /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).json({ message: `Update goal with id ${id}` });
});

// @desc    Delete goal
// @route   DELETE    /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).json({ message: `Goal with id ${id} deleted` });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
