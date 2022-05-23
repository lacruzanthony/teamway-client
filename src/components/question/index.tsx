import React from "react";
import Button from "../button";

interface IQuestion {
  headline: string;
  questions: string[];
  setQuestionSelected: (questionSelected: boolean) => void;
}

const Question = ({ headline, questions, setQuestionSelected }: IQuestion) => {
  return (
    <>
      <h2>{headline}</h2>
      <ul>
        {questions.map((q, idx) => (
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
    </>
  );
};

export default Question;
