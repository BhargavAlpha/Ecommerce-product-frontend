import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import styles from '../submissions/Submissions.module.css';

function Reviews() {
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/requests`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []); 
  const handleSubmit=(id)=>{
    navigate(`/admin/product/${id}`);
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <table className={styles.submissionsTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review) => (
                <tr key={review._id}>
                  <td onClick={()=>handleSubmit(review._id)}>
                    {review.productName}
                  </td>
                  <td>{review.productId}</td>
                  <td>{review.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reviews;
