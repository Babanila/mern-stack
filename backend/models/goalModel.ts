import mongoose, { Schema } from 'mongoose';

const GoalSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
    },
    {
        timestamps: true,
    },
);

export const Goal = mongoose.model('Goal', GoalSchema);
