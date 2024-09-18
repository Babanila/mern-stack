import { model, Document, Model, Schema } from 'mongoose';

interface GoalInterface extends Document {
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type GoalModel = Model<GoalInterface>;

const goalSchema: Schema = new Schema<GoalInterface, GoalModel>(
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

export const Goal = model<GoalInterface, GoalModel>('Goal', goalSchema);
