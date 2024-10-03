"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../app/hooks");
const goalSlice_1 = require("../features/goals/goalSlice");
function GoalItem({ goal }) {
    const dispatch = (0, hooks_1.useAppDispatch)();
    return (<div className='goal'>
            <div>{new Date(goal === null || goal === void 0 ? void 0 : goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button className='close' onClick={() => dispatch((0, goalSlice_1.deleteGoal)(goal._id))}>
                X
            </button>
        </div>);
}
exports.default = GoalItem;
