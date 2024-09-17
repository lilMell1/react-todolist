import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      // If login is successful, navigate to MainApp and pass userId as state
      if (response.status === 200 && response.data.userId) {
        console.log("userId from response:", response.data.userId);  // Debug log
        navigate('/app', { state: { userId: response.data.userId } }); // Pass userId to MainApp via state
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
