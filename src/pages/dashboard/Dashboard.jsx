import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import Card from '../../components/card/Card';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";

    const Dashboard = () => {
      const url=import.meta.env.VITE_BACKEND_URL
      const navigate = useNavigate();
      const [products, setProducts] = useState([]);

      const handleSingleProductClick = (id) => {
        console.log('Product clicked:', id);
        navigate(`/product/${id}`);
      };

      useEffect(() => {
        axios.get(`${url}/dashboard/`)
          .then(response => setProducts(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      return (
        <>
          <Navbar />
          <div className="products-page">
            <div className={styles.container}>
              {products.map(product => (
                <Card 
                  key={product.id} 
                  product={product} 
                  onClick={() => handleSingleProductClick(product.id)} 
                />
              ))}
            </div>
          </div>
        </>
      );
    };

    export default Dashboard;

  
