import React from "react";
import styles from "./Navbar.module.css";
import kkoin from "../../assets/logo.jpeg";
import { FaUserCircle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

const Navbar=()=>{

  const isAdmin=localStorage.getItem("role")==="admin"; 
  const navigate=useNavigate();
  const navigateHome=()=>navigate('/dashboard');
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <img src={kkoin} alt="Website Logo" className={styles.navbar_logo}  onClick={navigateHome}/>
      </div>
      <div className={styles.navbar_right}>
        {isAdmin ? (
          <ul className={styles.navbar_links}>
          <li onClick={()=>navigate('/reviews')} className={styles.navbar_link}>Requests</li>
          </ul>
        ) : (
          <ul className={styles.navbar_links}>
            <li onClick={()=>navigate('/my-submissions')} className={styles.navbar_link}>My Submissions</li>
          </ul>
        )}
        <div className={styles.profile}>
          <FaUserCircle size={25} onClick={()=>navigate('/profile')}/>
        </div>
        <button className={styles.btn} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
