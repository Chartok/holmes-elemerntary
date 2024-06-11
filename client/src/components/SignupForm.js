"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const authContext_1 = require("../context/authContext");
const hooks_1 = require("../utils/hooks");
const react_hooks_1 = require("@apollo/react-hooks");
const material_1 = require("@mui/material");
const graphql_tag_1 = require("graphql-tag");
const react_router_dom_1 = require("react-router-dom");
const REGISTER_USER = (0, graphql_tag_1.gql) `
    mutation Mutation(
        $registerInput: RegisterInput!
    ) {
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
        }
    }
`;
function Register() {
    const context = (0, react_1.useContext)(authContext_1.AuthContext);
    let navigate = (0, react_router_dom_1.useNavigate)();
    const [errors, setErrors] = (0, react_1.useState)([]);
    const registerUserCallback = () => {
        console.log("Registering user...");
        registerUser();
    };
    const { onChange, onSubmit, values } = (0, hooks_1.useForm)(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [registerUser, { loading }] = (0, react_hooks_1.useMutation)(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values }
    });
    return (<material_1.Container spacing={2} maxWidth="sm">
            <h3>Register</h3>
            <p>Register for a new account</p>
            <material_1.Stack spacing={2} paddingBottom={2}>
                <material_1.TextField label="Username" name="username" onChange={onChange}/>
                <material_1.TextField label="Email" name="email" onChange={onChange}/>
                <material_1.TextField label="Password" name="password" onChange={onChange}/>
                <material_1.TextField label="Confirm Password" name="confirmPassword" onChange={onChange}/>
            </material_1.Stack>
            {errors.map(error => (<material_1.Alert severity="error">{error.message}</material_1.Alert>))}
            <div>
                {loading ? (<p>Loading...</p>) : (<material_1.Button variant="contained" onClick={onSubmit}>Register</material_1.Button>)}
            </div>
        </material_1.Container>);
}
exports.default = Register;
