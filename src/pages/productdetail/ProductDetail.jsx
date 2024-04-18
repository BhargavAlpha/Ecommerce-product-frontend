import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetail.module.css';
import Navbar from '../../components/navbar/Navbar';

const ProductDetail = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const email = localStorage.getItem('email');
  const isAdmin = localStorage.getItem('role') === 'admin';
  const [file,setFile]=useState(null)
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    productId: parseInt(id),
    productName: '',
    price: '',
    productDescription: '',
    image: null,
    email: email
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/product/${id}`);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        console.log(fetchedProduct);
        setFormData({
          productId: fetchedProduct.id,
          productName: fetchedProduct.productName,
          price: fetchedProduct.price,
          productDescription: fetchedProduct.productDescription,
          image: fetchedProduct.image,
          email: email
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange=(e)=>{
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      try{
        console.log(`${url}/upload`);
        const imgUpload=await axios.post(`${url}/upload`,data);
        console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
      formData.image=`${url}/images/${filename}`;
    }

    try {
      const formDataToSend={
        ...formData
      }
      if (isAdmin) {
        console.log(`${url}/product/${id}`);
        console.log(formDataToSend);
        console.log(formData);
        const response = await axios.put(`${url}/product/${id}`, formDataToSend);
        console.log('Product updated:', response.data);
        alert('Product updated successfully!');
      } else {
        const response = await axios.post(`${url}/api/submit-request`, formDataToSend);
        console.log('Request submitted:', response.data);
        const increaseRequestCount = await axios.put(`${url}/user/count/${email}`);
        console.log('Request count updated:', increaseRequestCount.data);
        alert('Request submitted successfully!');
      }
    } catch (error) {
      console.error('Error updating product/request:', error);
      alert('Failed to update product/request');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <img className={styles.image} src={product.image} alt={product.productName} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.labels}>Name:</p>
          <input
            className={styles.name}
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
          <p className={styles.labels}>Price:</p>
          <input
            className={styles.price}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <p className={styles.labels}>Description:</p>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
          />
          <input
            className={styles.file}
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {
            isAdmin ?
              <button className={styles.btn} type="button" onClick={handleSubmit}>
                Make Change
              </button>
              :
              <button className={styles.btn} type="button" onClick={handleSubmit}>
                Submit for Review
              </button>
            
          }

        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
