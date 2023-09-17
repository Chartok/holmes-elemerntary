// see SignupForm.js for comments
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/react-hooks';

import { Button, TextField, Container, Stack, Alert } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';

function Login() {
  let navigate = useNavigate();
  const Context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    console.log('Logging in user...');
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      Context.login(userData);
      navigate('/searchBooks');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>Enter your email and password to log in</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField label="Password" name="password" onChange={onChange} />
      </Stack>
      {errors.map(errors => (
        <Alert severity="error">{errors.message}</Alert>
      ))}
      <Button variant="contained" onClick={onSubmit}>Login</Button>
      <Button variant="contained" onClick={() => navigate('/signup')}>Not a member? Sign up here!</Button>
    </Container>
  );
};

export default Login;
