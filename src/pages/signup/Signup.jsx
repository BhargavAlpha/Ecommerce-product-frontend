import React, { useState } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Signup = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: ''
  });

  const showToastSuccessMessage = () => {
    toast.success("Registered Successfully!", {
      
    });
  };
  const showToastFailureMessage = (message = "Fill all fields properly") => {
    toast.error(message, {
      
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
     
      if (!formData.username || !formData.email || !formData.password || !formData.userType) {
        showToast('Please fill out all fields.', 'error');
        return;
      }
  
      const response = await axios.post(`${url}/register`, formData);
      
      if (response.data.name) {
        navigate('/login');
        showToastSuccessMessage();
      } else if (response.data.error) {
        if (response.data.error.includes('User already exists')) {
          showToastFailureMessage('User already exists!');
        } else {
          showToastFailureMessage(response.data.error);
        }
      } else {
        showToastFailureMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      showToastFailureMessage(error.message);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Create an account</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.options}>
          <input
            type="radio"
            name="userType"
            value="teamMember"
            checked={formData.userType === 'teamMember'}
            onChange={handleChange}
          />
          <span>Team Member</span>
          <input
            type="radio"
            name="userType"
            value="admin"
            checked={formData.userType === 'admin'}
            onChange={handleChange}
          />
          <span>Admin</span>
        </div>
        <button onClick={handleSubmit} className={styles.btn}>
          Sign Up
        </button>
        <p>
          Already have an Account? <a onClick={() => navigate('/login')}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
