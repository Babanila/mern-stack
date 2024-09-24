import { useEffect, useState, FormEvent } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner';
import { login, reset, IUserLoginData } from '../features/auth/authSlice';

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

    const onSubmit = (e: FormEvent<LoginFormElement>) => {
        e.preventDefault();
        if (!password || !email) {
            toast.error('Please fill all fields');
        } else {
            const userData: IUserLoginData = { email, password };
            dispatch(login(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

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
