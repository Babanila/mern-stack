import express from 'express';
import {
    getMe,
    getUsers,
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getMe);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as userRoutes };
