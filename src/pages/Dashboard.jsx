"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const hooks_1 = require("../app/hooks");
const GoalForm_1 = __importDefault(require("../components/GoalForm"));
const GoalItem_1 = __importDefault(require("../components/GoalItem"));
const Spinner_1 = __importDefault(require("../components/Spinner"));
const authSlice_1 = require("../features/auth/authSlice");
const goalSlice_1 = require("../features/goals/goalSlice");
function Dashboard() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const { goals, isLoading, isError, message } = (0, hooks_1.useAppSelector)((state) => state.goals);
    (0, react_1.useEffect)(() => {
        if (isError) {
            react_toastify_1.toast.error(message);
        }
        if (!user) {
            navigate('/login');
        }
        dispatch((0, goalSlice_1.getGoals)());
        return () => {
            dispatch((0, authSlice_1.reset)());
        };
    }, [user, message, isError, navigate, dispatch]);
    if (isLoading) {
        return <Spinner_1.default />;
    }
    return (<>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm_1.default />

            <div className='title'>Goals</div>
            <section className='content'>
                {goals.length > 0 ? (<div className='goals'>
                        {goals.map((goal) => (<GoalItem_1.default key={goal._id} goal={goal}/>))}
                    </div>) : (<h3>You have not set any goals</h3>)}
            </section>
        </>);
}
exports.default = Dashboard;
