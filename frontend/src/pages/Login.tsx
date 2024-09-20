import { useEffect, useState, FormEvent } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface IFormData {
    email: string;
    password: string;
}

function Login() {
    const [formData, setFormData] = useState<IFormData>({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e: { target: { name: string; value: string } }) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e: FormEvent<LoginFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            placeholder='Please enter your email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            placeholder='Please enter your password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='btn-group'>
                        <button type='submit' className='btn-submit'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
