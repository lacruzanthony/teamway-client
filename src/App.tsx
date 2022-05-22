import React from "react";
import "./styles.css";
import axios from "axios";

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
          {card.questions.map((q) => (
            <li>
              <button
                onClick={() => {
                  setQuestionSelected(true);
                }}
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
        <button
          disabled={cardNumber <= 0}
          onClick={() =>
            cardNumber > 0 ? setCardNumber(cardNumber - 1) : null
          }
        >
          Previous question
        </button>
        {cardNumber + 1 < cards.length && (
          <button
            disabled={!questionSelected}
            onClick={() =>
              cardNumber + 1 < cards.length
                ? setCardNumber(cardNumber + 1)
                : null
            }
          >
            Next question
          </button>
        )}
        {cardNumber + 1 === cards.length && (
          <button
            disabled={!questionSelected}
            onClick={() => setIsTestFinish(true)}
          >
            Finish test
          </button>
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
      <button onClick={onClickHandler}>GO TO TEST</button>
      {!isTestFinish && cards.length > 0 && <Question />}
      {isTestFinish && <Result />}
    </div>
  );
}
