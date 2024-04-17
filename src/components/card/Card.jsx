import styles from './Card.module.css';

const Card=({product,onClick})=>{
 return(
    <div className={styles.container} onClick={onClick}>
     <div className={styles.image}>
        <img src={product.image}></img>
     </div>
     <p className={styles.name}>{product.productName}</p>
     <h2 className={styles.price}>${product.price}</h2>
     <p className={styles.description}>{product.productDescription}</p>

    </div>

 )
}

 export default Card;