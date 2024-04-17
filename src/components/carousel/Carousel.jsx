import React, { useState } from 'react';
import styles from './Carousel.module.css'; // Import CSS for styling

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className={styles.carousel}>
            <button className={styles.prev} onClick={prevSlide}>
                &#10094;
            </button>
            <button className={styles.next} onClick={nextSlide}>
                &#10095;
            </button>
            <div className={styles.slideContainer}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={index === currentIndex ? styles.slideActive : styles.slide}
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
