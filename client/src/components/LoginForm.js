"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const authContext_1 = require("../context/authContext");
const hooks_1 = require("../utils/hooks");
const react_hooks_1 = require("@apollo/react-hooks");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const mutations_1 = require("../utils/mutations");
function Login() {
    let navigate = (0, react_router_dom_1.useNavigate)();
    const Context = (0, react_1.useContext)(authContext_1.AuthContext);
    const [errors, setErrors] = (0, react_1.useState)([]);
    const loginUserCallback = () => {
        console.log('Logging in user...');
        loginUser();
    };
    const { onChange, onSubmit, values } = (0, hooks_1.useForm)(loginUserCallback, {
        email: '',
        password: '',
    });
    const [loginUser] = (0, react_hooks_1.useMutation)(mutations_1.LOGIN_USER, {
        update(_, { data: { loginUser: userData } }) {
            localStorage.setItem('token', userData.token);
            Context.login(userData);
            navigate('/home');
        },
        onError({ graphQLErrors }) {
            setErrors([...graphQLErrors]);
        },
        variables: { loginInput: values },
    });
    return (<>
      <material_1.Container spacing={2}>
        <h3>Login</h3>
        <material_1.Stack spacing={2} paddingBottom={2}>
          <material_1.TextField label="Email" name="email" onChange={onChange}/>
          <material_1.TextField label="Password" name="password" onChange={onChange}/>
        </material_1.Stack>
        <p>Enter your email and password to log in</p>
        {errors.map(errors => (<material_1.Alert severity="error">{errors.message}</material_1.Alert>))}
        <material_1.Button variant="contained" onClick={onSubmit}>Login</material_1.Button>
        <material_1.Button variant="contained" onClick={() => navigate('/signup')}>Not a member? Sign up here!</material_1.Button>
      </material_1.Container>
    </>);
}
;
exports.default = Login;
