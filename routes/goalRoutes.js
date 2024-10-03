"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const goalController_1 = require("../controllers/goalController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, goalController_1.getGoals);
router.post('/', authMiddleware_1.protect, goalController_1.setGoal);
router.put('/:id', authMiddleware_1.protect, goalController_1.updateGoal);
router.delete('/:id', authMiddleware_1.protect, goalController_1.deleteGoal);
/*
// Alternative to the above
router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);
*/
exports.goalRoutes = router;
