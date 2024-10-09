import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Register.css';
const API_URL:string|undefined = process.env.REACT_APP_API_BASE_URL;

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit: (e: React.FormEvent) => Promise<void|string> 
  = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try { 
      await axios.post(`${API_URL}/register`, { username, password }); // if i dont need to send data to console i dont need 'const res'
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error: any) { 
      if (error.response && error.response.data) { 
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="register-body">
      <div className="register-divider">
        <div className="register-coolpicture">
          <img src="/minimon.png" alt="Minions Background" />
        </div>
        <div className='register-toCenter'> 
          <h2>Register</h2>
          <form style={{width:"100%"}} onSubmit={handleSubmit}>
            <input
              className="register-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="register-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="register-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button> {/* activaites the onSubmit function */}
          </form>
          <p>{message}</p>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
