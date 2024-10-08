import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner';
import {
    register,
    reset,
    IUserRegistrationData,
} from '../features/auth/authSlice';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    confirmPassword: HTMLInputElement;
}
interface RegistrationFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface IFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.auth,
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e: { target: { name: string; value: string } }) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e: FormEvent<RegistrationFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            const userData: IUserRegistrationData = { name, email, password };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <div className='page-title'>
                    <FaUser />
                    <h1>Register</h1>
                </div>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            placeholder='Please enter your name'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={onChange}
                        />
                    </div>
                    <div className='btn-group'>
                        <button type='submit' className='btn-submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
