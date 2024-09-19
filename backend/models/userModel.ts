import { model, Document, Model, Schema } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserModel = Model<UserInterface>;

const userSchema: Schema = new Schema<UserInterface, UserModel>(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true,
    },
);

export const User = model<UserInterface, UserModel>('User', userSchema);
