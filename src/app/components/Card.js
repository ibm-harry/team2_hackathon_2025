import styles from "./Card.module.css";

function Card({ title, content, imageUrl }) {
  return (
    <div className={styles.main}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Card;
