import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Submissions.module.css";
import axios from "axios";

const Submissions = () => {
  const url=import.meta.env.VITE_BACKEND_URL
  const [submissions, setSubmissions] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get(`${url}/api/my-submissions?email=${email}`);
        setSubmissions(response.data); 
      } catch (error) {
        console.log(error);
      }
    }
    fetchSubmissions();
  }, [email]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'rejected':
        return { color: 'red' };
      case 'pending':
        return { color: 'orange' };
      case 'approved':
        return { color: 'green' };
      default:
        return {}; 
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>My Submissions</h2>
        <table className={styles.submissionsTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.productName || "-"}</td>
                <td>{submission.productId || "-"}</td>
                <td style={getStatusColor(submission.status)}>{submission.status || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Submissions;
