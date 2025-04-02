import Image from "next/image";
import styles from "./page.module.css";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className={styles.main}>
      <Card title="Card Title 1" content="Card Content"></Card>
      <Card title="Card Title 2" content="Card Content"></Card>
      <Card title="Card Title 3" content="Card Content"></Card>
      <Card title="Card Title 4" content="Card Content"></Card>
      <Card title="Card Title 5" content="Card Content"></Card>
      <Card title="Card Title 6" content="Card Content"></Card>
    </div>
  );
}
