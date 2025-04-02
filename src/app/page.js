import Image from "next/image";
import styles from "./page.module.css";
import Card from "./components/Card";

export default function Home() {
  const cardsData = [
    {
      title: "Card Title 1",
      content: "Content for card 1...",
    },
    {
      title: "Card Title 2",
      content: "Content for card 2...",
    },
    {
      title: "Card Title 3",
      content: "Content for card 3...",
    },
    {
      title: "Card Title 4",
      content: "Content for card 4...",
    },
    {
      title: "Card Title 5",
      content: "Content for card 5...",
    },
    {
      title: "Card Title 6",
      content: "Content for card 6...",
    },
  ];
  return (
    <div className={styles.main}>
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} content={card.content} />
      ))}
    </div>
  );
}
