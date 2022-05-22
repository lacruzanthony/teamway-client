import React from "react";
import "./styles.css";
import axios from "axios";
import Button from "./components/button";

interface ICard {
  headline: string;
  questions: string[];
}

export default function App() {
  const [cards, setCards] = React.useState<ICard[]>(() => []);
  const [cardNumber, setCardNumber] = React.useState(0);
  const [questionSelected, setQuestionSelected] = React.useState(false);
  const [isTestFinish, setIsTestFinish] = React.useState(false);

  React.useEffect(() => {
    setQuestionSelected(false);
  }, [cardNumber]);

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
          {card.questions.map((q, idx) => (
            <li key={idx}>
              <Button
                onClick={() => {
                  setQuestionSelected(true);
                }}
                content={q}
              />
            </li>
          ))}
        </ul>
        <Button
          disabled={cardNumber <= 0}
          content="Previous question"
          onClick={() =>
            cardNumber > 0 ? setCardNumber(cardNumber - 1) : null
          }
        />
        {cardNumber + 1 < cards.length && (
          <Button
            disabled={!questionSelected}
            onClick={() =>
              cardNumber + 1 < cards.length
                ? setCardNumber(cardNumber + 1)
                : null
            }
            content="Next question"
          />
        )}
        {cardNumber + 1 === cards.length && (
          <Button
            disabled={!questionSelected}
            onClick={() => setIsTestFinish(true)}
            content="Finish test"
          />
        )}
      </>
    );
  };

  const Result = () =>
    Math.random() * (1 - 0) + 0 < 0.5 ? (
      <h3>You are more of an extrovert.</h3>
    ) : (
      <h3>You are more of an introvert.</h3>
    );

  return (
    <div className="App">
      <h1>
        Are you an introvert or an extrovert?
        <span role="img" aria-label="lens">
          🔍
        </span>
      </h1>
      <Button onClick={onClickHandler} content="Go to test" />
      {!isTestFinish && cards.length > 0 && <Question />}
      {isTestFinish && <Result />}
    </div>
  );
}
