import React from "react";
import "./QuizView.css";
import { useState, useEffect } from "react";

const QuizView = ({ questions, currentQuestion, handleAnswerClick }) => {
  console.log('language in :',questions)
  const [timer, setTimer] = useState(30);

  // useEffect hook to decrement the timer every second
  useEffect(() => {
    // Exit if the timer reaches 0
    if (timer === 0){
      handleAnswerClick();
    };
    
    // Set up an interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    // Clean up the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, [timer]); // Dependency array ensures useEffect runs only when timer changes

  // Reset timer when the current question changes
  useEffect(() => {
    setTimer(30);
  }, [currentQuestion]);

  return (
    <>
      <div className="question">
      <div className="timer">Time left: {timer} seconds</div>
        <div>
          <h1>{questions[currentQuestion].language}</h1>
        </div>
        <div className="question-number">
          <span>
            Question {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="question-text">
          {questions[currentQuestion].question}
        </div>
      </div>

      <div className="answer">
        {questions[currentQuestion].answers.map(({ text, isCorrect }) => (
          <button className="button" key={text} onClick={() => handleAnswerClick(isCorrect)}>
            {text}
          </button>
        ))}
      </div>
    </>
  );
};

export default QuizView;