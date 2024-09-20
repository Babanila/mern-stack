import { useEffect, useState, FormEvent } from 'react';
import { FaUser } from 'react-icons/fa';

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

    const onChange = (e: { target: { name: string; value: string } }) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e: FormEvent<RegistrationFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
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
