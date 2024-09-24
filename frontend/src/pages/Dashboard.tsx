import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { reset } from '../features/auth/authSlice';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch]);

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
        </>
    );
}

export default Dashboard;
