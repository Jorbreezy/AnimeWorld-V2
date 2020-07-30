import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from './Auth';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    warning: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    const { username, password } = state;

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status !== 200) {
          setState({ warning: res.message });
        } else {
          Auth.login(() => {
            history.push('/discover');
          }, username);
        }
      })
      .catch((err) => console.log(err));
  };

  const register = () => {
    history.push('/register');
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <hr />
      </div>
      <div className="container">
        <h3>Username</h3>
        <input type="text" placeholder="Enter Username" id="username" name="username" onChange={handleChange} />

        <h3>Password</h3>
        <input type="password" placeholder="Enter Password" id="password" name="psw" onChange={handleChange} />

        <p>{ state.warning }</p>

        <button type="button" onClick={handleClick}>Login</button>
        <button type="button" onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Login;