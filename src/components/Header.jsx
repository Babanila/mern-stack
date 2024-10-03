"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fa_1 = require("react-icons/fa");
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../app/hooks");
const authSlice_1 = require("../features/auth/authSlice");
function Header() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const onLogOut = () => {
        dispatch((0, authSlice_1.logout)());
        dispatch((0, authSlice_1.reset)());
        navigate('/login');
    };
    return (<header className='header'>
            <div className='logo'>
                <react_router_dom_1.Link to='/'>GoalSetter</react_router_dom_1.Link>
            </div>
            <ul>
                {user ? (<li>
                        <button className='btn' onClick={onLogOut}>
                            <fa_1.FaSignOutAlt /> Logout
                        </button>
                    </li>) : (<>
                        <li>
                            <react_router_dom_1.Link to='/login'>
                                <fa_1.FaSignInAlt /> Login
                            </react_router_dom_1.Link>
                            <react_router_dom_1.Link to='/register'>
                                <fa_1.FaUser /> Register
                            </react_router_dom_1.Link>
                        </li>
                    </>)}
            </ul>
        </header>);
}
exports.default = Header;
