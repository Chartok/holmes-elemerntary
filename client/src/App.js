"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const SavedBooks_1 = __importDefault(require("./pages/SavedBooks"));
const LoginForm_1 = __importDefault(require("./components/LoginForm"));
const SignupForm_1 = __importDefault(require("./components/SignupForm"));
function App() {
    return (<div>
      <Navbar_1.default />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<react_router_dom_1.Navigate to="/home"/>}/>
        <react_router_dom_1.Route path="/home" element={<HomePage_1.default />}/>
        <react_router_dom_1.Route path="/savedbooks" element={<SavedBooks_1.default />}/>
        <react_router_dom_1.Route path="/login" element={<LoginForm_1.default />}/>
        <react_router_dom_1.Route path="/signup" element={<SignupForm_1.default />}/>
      </react_router_dom_1.Routes>
    </div>);
}
exports.default = App;
