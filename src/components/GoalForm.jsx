"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const hooks_1 = require("../app/hooks");
const goalSlice_1 = require("../features/goals/goalSlice");
function GoalForm() {
    const [text, setText] = (0, react_1.useState)('');
    const dispatch = (0, hooks_1.useAppDispatch)();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch((0, goalSlice_1.createGoal)(text));
        setText('');
    };
    return (<section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input type='text' name='text' id='text' placeholder='Type Goal here' value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <button className='btn-submit' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>);
}
exports.default = GoalForm;
