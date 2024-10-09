import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';
const API_URL:string|undefined = process.env.REACT_APP_API_BASE_URL;
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit: (e: React.FormEvent) => Promise<void|string> = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // if returned with error (cannot login), wont navigate
       await axios.post(
        `${API_URL}/login`,  
        { username, password }, 
        { withCredentials: true }  
      );
      
        navigate('/app');
    } catch (error: any) {
        setMessage('Login failed');
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);  // priority to custom errors
      } else {
        setMessage('couldnt log in.');
      }
    }
  };

  return (
    <div className="login-body">
      <div className="login-divider">
        <div className="login-coolpicture">
          <img src="/minimonimmm.png" alt="Minions Background"/>
        </div>
        <div className='login-toCenter' >
          <h2>Login</h2>
          <form style={{width:"100%"}} onSubmit={handleSubmit}>
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
            <button className="login-input" type="submit">Login</button>
          </form >
          <p style={{wordBreak:"break-word"}}>{message}</p>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
