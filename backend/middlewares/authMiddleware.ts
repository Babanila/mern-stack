import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserInterface } from '../models/userModel';

interface JwtPayloadExtended extends JwtPayload {
    id?: string;
}

export interface RequestExtended extends Request {
    user?: UserInterface;
}

const protect = asyncHandler(
    async (req: RequestExtended, res: Response, next) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];

                // Verify token
                const decoded = jwt.verify(
                    token,
                    `${process.env.JWT_SECRET}`,
                ) as JwtPayloadExtended;

                // Derived user from token
                req.user = (await User.findById(decoded.id).select(
                    '-password',
                )) as UserInterface;

                next();
            } catch (error) {
                console.log('error', error);
                res.status(401);
                throw new Error('Not Authorized');
            }
        }

        if (!token) {
            res.status(401);
            throw new Error('Not Authorized, no token');
        }
    },
);

export { protect };
