import { useState } from 'react';
import styles from '../signup/Signup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const url=import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await axios.post(`${url}/login`, { email, password });
      console.log('User logged in:', response.data);

      localStorage.setItem('email',response.data.email);
      localStorage.setItem('role', response.data.isAdmin ? 'admin' : 'teamMember');
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <input
          type="email"
          className={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.btn} onClick={handleLogin}>
          Login
        </button>
        <p>New User? <a href="/register">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
