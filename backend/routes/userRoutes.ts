import express from 'express';
import {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as userRoute };
