import express from "express";
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalControllers";

const router = express.Router();

router.get("/", getGoals);
router.post("/", setGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

/*
// Alternative to the above
router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);
*/

module.exports = router;
