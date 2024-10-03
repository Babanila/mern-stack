"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Login_1 = __importDefault(require("./pages/Login"));
const Register_1 = __importDefault(require("./pages/Register"));
const Header_1 = __importDefault(require("./components/Header"));
function App() {
    return (<>
            <react_router_dom_1.BrowserRouter>
                <div className='container'>
                    <Header_1.default />
                    <react_router_dom_1.Routes>
                        <react_router_dom_1.Route path='/' element={<Dashboard_1.default />}/>
                        <react_router_dom_1.Route path='/register' element={<Register_1.default />}/>
                        <react_router_dom_1.Route path='/login' element={<Login_1.default />}/>
                    </react_router_dom_1.Routes>
                </div>
            </react_router_dom_1.BrowserRouter>
            <react_toastify_1.ToastContainer />
        </>);
}
exports.default = App;
