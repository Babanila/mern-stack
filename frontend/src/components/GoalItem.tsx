import { useAppDispatch } from '../app/hooks';
import { deleteGoal, IGoalData } from '../features/goals/goalSlice';

interface GoalItemProps {
    goal: IGoalData;
}

function GoalItem({ goal }: GoalItemProps) {
    const dispatch = useAppDispatch();

    return (
        <div className='goal'>
            <div>{new Date(goal?.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button
                className='close'
                onClick={() => dispatch(deleteGoal(goal._id))}
            >
                X
            </button>
        </div>
    );
}

export default GoalItem;
