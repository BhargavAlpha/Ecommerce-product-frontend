import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Admin.module.css';
import Navbar from '../../components/navbar/Navbar';
import {toast, ToastContainer} from 'react-toastify';

const ProductAdminDetail = () => {
  const url=import.meta.env.VITE_BACKEND_URL
  const { id } = useParams();
  const [originalProduct, setOriginalProduct] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const submissionResponse = await axios.get(`${url}/reviews/${id}`);
        setSubmissionData(submissionResponse.data);

        const productId = submissionResponse.data.productId;
        const productResponse = await axios.get(`${url}/product/${productId}`);
        setOriginalProduct(productResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); 

  const handleApprove = async () => {
    try {
      const updatedFields = getUpdatedFields();
      if (Object.keys(updatedFields).length > 0){
        const productId = submissionData.productId;
        const response = await axios.put(`${url}/product/${productId}`, updatedFields);
        console.log('Approve response:', response.data);
        alert('Product approved successfully');
        await axios.put(`${url}/reviews/${id}`, { status: 'approved' });
        const memberEmail=submissionData.email;
        const adminEmail=localStorage.getItem('email'); 
        const increaseRequestCount = await axios.put(`${url}/user/count/${adminEmail}`);
        const reviewApproved=await axios.put(`${url}/user/approve/${memberEmail}`);
        const reviewApprovedAdmin=await axios.put(`${url}/user/approve/${adminEmail}`);
        console.log('Review approved:', reviewApproved.data);
        console.log('Review approved:', reviewApprovedAdmin.data);
      } else {
        console.log('No changes to update.');
      }
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };
  
  const handleReject = async () => {
    try {
      await axios.put(`${url}/reviews/${id}`, { status: 'rejected' });
      alert('Product rejected successfully');
      const memberEmail=submissionData.email;
      const adminEmail=localStorage.getItem('email');
      const increaseRequestCount = await axios.put(`${url}/user/count/${adminEmail}`);
      const reviewRejected=await axios.put(`${url}/user/reject/${memberEmail}`);
      const reviewRejectedAdmin=await axios.put(`${url}/user/reject/${adminEmail}`);
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  const getUpdatedFields = () => {
    const updatedFields = {};
    if (submissionData.productName !== originalProduct.productName) {
      updatedFields.productName = submissionData.productName;
    }
    if (submissionData.price !== originalProduct.price) {
      updatedFields.price = submissionData.price;
    }
    if (submissionData.productDescription !== originalProduct.productDescription) {
      updatedFields.productDescription = submissionData.productDescription;
    }
    if (submissionData.image !== originalProduct.image && submissionData.image != null) {
      updatedFields.image = submissionData.image;
    }
    return updatedFields;
  };

  const renderInputField = (label, fieldName) => {
    const originalValue = originalProduct ? originalProduct[fieldName] : '';
    const submittedValue = submissionData ? submissionData[fieldName] : '';

    const isChanged = originalValue !== submittedValue;
    const highlightColor = isChanged ? '#ffcccb' : 'transparent';

    return (
      <div style={{ marginBottom: '15px' }}>
        <p className={styles.labels}>{label}</p>
        <input 
          className={styles.input}
          type="text"
          name={fieldName}
          value={submittedValue}
          style={{ borderColor: highlightColor }}
          readOnly
        />
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
       {
        submissionData.image != null ?
        <div>
          <img className={styles.image} style={{ border: '2px solid red' }} src={submissionData.image} alt={submissionData.productName} />
        </div> :
        <div className={styles.imgcontainer}>
          <img className={styles.image} src={originalProduct.image} alt={originalProduct.productName} />
        </div>
       }
        <form className={styles.form}>
          {renderInputField('Name:', 'productName')}
          {renderInputField('Price:', 'price')}
          {renderInputField('Description:', 'productDescription')}
        </form>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.approveBtn} onClick={handleApprove}>Approve</button>
        <button className={styles.rejectBtn} onClick={handleReject}>Reject</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductAdminDetail;
