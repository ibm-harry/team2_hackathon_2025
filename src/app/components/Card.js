import styles from "./Card.module.css";

function Card({ title, content, imageUrl }) {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.heading}>{content}</p>
    </div>
  );
}

export default Card;
