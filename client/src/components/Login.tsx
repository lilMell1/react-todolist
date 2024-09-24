import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';
import { useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear history state on page load if you don't want to keep it
      navigate('/login');  //clear the browser history when a user navigates back to the login page, ensuring they can’t use the "Forward" button to return to the app after logging out   
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.userId) {
        //console.log("userId from response:", response.data.userId);
        navigate('/app', { state: { userId: response.data.userId } }); // state is a value to give the state
      } else {
        setMessage('Login failed');
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="login-body">
      <div className="login-divider">
        <div className="login-coolpicture">
          <img src="/minimonimmm.png" alt="Minions Background" style={{width:'300px', height:'350px'}} />
        </div>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <p>{message}</p>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
