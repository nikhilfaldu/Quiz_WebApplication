import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';
import qs from "qs";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const navigate = useNavigate();

  const fetchUserData = () => {
    fetch("http://localhost:8081/api/questions")
           .then(response => {
             return response.json()
           })
           .then(data => {
            
            setQuestions(data);
            
           })
}
useEffect(() => {
fetchUserData()
}, [])  




  const handleAnswer = (questionId, selectedOption) => {
    setUserAnswers(prevState => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/submit-quiz', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(userAnswers),
      });


      const data = await response.json();
      console.log('Server response:', data);

      // Calculate correct and incorrect answers
      const correctAnswers = data.correctAnswers;
      const incorrectAnswers = questions.length - correctAnswers;

      // Update state with results
      setResults({
        correctAnswers,
        incorrectAnswers,
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle error, show a message, etc.
    }
  };
  if (!questions.length) {
    // Loading state while fetching questions
    return <div className="loading">Loading...</div>;
  }

  const currentQuestionData = questions[currentQuestion];

  if (results) {
    return (
      <div className="results-container">
        <h2>Quiz Results</h2>
        {/* Display results information here */}
        <p>Total Questions: {questions.length}</p>
        <p>Correct Answers: {results.correctAnswers}</p>
        <p>Incorrect Answers: {results.incorrectAnswers}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2 className="question">{currentQuestionData.text}</h2>
      {currentQuestionData.options.map(option => (
        <div key={option.id} className="option">
          <input
            type="radio"
            id={option.id}
            name={`question-${currentQuestionData.id}`}
            value={option.id}
            onChange={() => handleAnswer(currentQuestionData.id, option.id)}
            checked={userAnswers[currentQuestionData.id] === option.id}
          />
          <label htmlFor={option.id}>{option.text}</label>
        </div>
      ))}
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentQuestion === 0}>
          Prev
        </button>
        <button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
          Next
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Quiz;
