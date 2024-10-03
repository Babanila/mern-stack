import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { createGoal } from '../features/goals/goalSlice';

interface FormElements extends HTMLFormControlsCollection {
    text: HTMLInputElement;
}
interface GoalFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function GoalForm() {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();

    const onSubmit = (e: FormEvent<GoalFormElement>) => {
        e.preventDefault();

        dispatch(createGoal(text));
        setText('');
    };

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn-submit' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
