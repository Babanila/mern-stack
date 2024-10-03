"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const store_1 = require("./app/store");
const App_1 = __importDefault(require("./App"));
test('renders learn react link', () => {
    const { getByText } = (0, react_2.render)(<react_redux_1.Provider store={store_1.store}>
            <App_1.default />
        </react_redux_1.Provider>);
    expect(getByText(/learn/i)).toBeInTheDocument();
});
