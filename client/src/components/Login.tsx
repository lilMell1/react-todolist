import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // deletes snapshots of web
  // useEffect(() => {
  //   navigate('/login', { replace: true });  // Replace navigation state to prevent "Back" navigation
  // }, [navigate]);

  const handleSubmit: (e: React.FormEvent) => Promise<void|string> = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',  // Change to match the correct path
        { username, password }, //request body
        { withCredentials: true }  // Enable cookie handling
      );
      

     // if (response.status === 200) {
        setMessage('Login successful');
        // Redirect to the app after successful login
        navigate('/app');
     // } else {
        setMessage('Login failed');
      //}
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);  // priority to custom errors
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
