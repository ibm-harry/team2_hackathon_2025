import styles from "./Card.module.css";

function Card({ title, content, isActive }) {
  return (
    <div className={`${styles.main} ${isActive ? styles.active : ""}`}>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.heading}>{content}</p>
    </div>
  );
}

export default Card;