import express from 'express';
import {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} from '../controllers/goalController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, getGoals);
router.post('/', protect, setGoal);
router.put('/:id', protect, updateGoal);
router.delete('/:id', protect, deleteGoal);

/*
// Alternative to the above
router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);
*/

export const goalRoutes = router;
