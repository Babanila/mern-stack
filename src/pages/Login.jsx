"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fa_1 = require("react-icons/fa");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const hooks_1 = require("../app/hooks");
const Spinner_1 = __importDefault(require("../components/Spinner"));
const authSlice_1 = require("../features/auth/authSlice");
function Login() {
    const [formData, setFormData] = (0, react_1.useState)({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { user, isLoading, isError, isSuccess, message } = (0, hooks_1.useAppSelector)((state) => state.auth);
    (0, react_1.useEffect)(() => {
        if (isError) {
            react_toastify_1.toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch((0, authSlice_1.reset)());
    }, [user, isError, isSuccess, message, navigate, dispatch]);
    const onChange = (e) => {
        setFormData((prevState) => (Object.assign(Object.assign({}, prevState), { [e.target.name]: e.target.value })));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (!password || !email) {
            react_toastify_1.toast.error('Please fill all fields');
        }
        else {
            const userData = { email, password };
            dispatch((0, authSlice_1.login)(userData));
        }
    };
    if (isLoading) {
        return <Spinner_1.default />;
    }
    return (<>
            <section className='heading'>
                <div className='page-title'>
                    <fa_1.FaSignInAlt />
                    <h1>Login</h1>
                </div>
                <p>Login and start setting goals</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' name='email' placeholder='Please enter your email' value={email} onChange={onChange}/>
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' id='password' name='password' placeholder='Please enter your password' value={password} onChange={onChange}/>
                    </div>
                    <div className='btn-group'>
                        <button type='submit' className='btn-submit'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>);
}
exports.default = Login;
