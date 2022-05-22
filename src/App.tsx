import React from "react";
import "./styles.css";
import axios from "axios";

interface ICard {
  headline: string;
  questions: string[];
}

export default function App() {
  const [cards, setCards] = React.useState<ICard[]>(() => []);
  const [cardNumber, setCardNumber] = React.useState<number>(0);

  const onClickHandler = async () => {
    const { data } = await axios.get<ICard[]>("http://localhost:3333/cards");
    setCards(data);
  };

  const Question = () => {
    const card = cards[cardNumber];
    return (
      <>
        <h2>{card.headline}</h2>
        <ul>
          {card.questions.map((q) => (
            <li>{q}</li>
          ))}
        </ul>
        <button onClick={() => setCardNumber(cardNumber + 1)}>
          Next question
        </button>
        <button
          onClick={() =>
            cardNumber > 0 ? setCardNumber(cardNumber - 1) : null
          }
        >
          Previous question
        </button>
      </>
    );
  };

  return (
    <div className="App">
      <h1>Are you an introvert or an extrovert? 🔍</h1>
      <button onClick={onClickHandler}>GO TO TEST</button>
      {cards.length > 0 && <Question />}
    </div>
  );
}
