import express from 'express';
import {
    getUsers,
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
    getLoggedInUser,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', protect, getLoggedInUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as userRoutes };
