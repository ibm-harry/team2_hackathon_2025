import Image from "next/image";
import styles from "./page.module.css";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className={styles.main}>
      <Card title="Card Title" content="Card Content"></Card>
      <Card title="Card Title" content="Card Content"></Card>
      <Card title="Card Title" content="Card Content"></Card>
      <Card title="Card Title" content="Card Content"></Card>
      <Card title="Card Title" content="Card Content"></Card>
      <Card title="Card Title" content="Card Content"></Card>
    </div>
  );
}
