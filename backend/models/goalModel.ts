import { model, Document, Model, Schema } from 'mongoose';

export interface GoalInterface extends Document {
    user: Schema.Types.ObjectId;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type GoalModel = Model<GoalInterface>;

const goalSchema: Schema = new Schema<GoalInterface, GoalModel>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
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
