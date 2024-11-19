import React, { useState, useEffect } from "react";
import './quizhandler.css';
import QuizView from "./Quiz";
import ScoreView from "./Result";
import { useParams } from 'react-router-dom';
import logoSvg from '../images/logpo.svg'; 
import qs from "qs";
import Cookies from 'js-cookie';
function QuizHandler() {
  const usernamename =Cookies.get('clientusername');
  const { language } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state


  const fetchUserData = () => {
    fetch(`http://localhost:8081/api/questions/${language}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setQuestions(data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
useEffect(() => {
    if (isQuizOver) {
      adduserresult();
    }
  }, [isQuizOver]);
  const adduserresult = () => {
    const newTransaction = {
      name: usernamename,
      language: questions[currentQuestion].language,
      total: questions.length,
      correct: score,
    };
    fetch(`http://localhost:8081/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(newTransaction),
    })
      .then((result) => {
        console.log("add successfully");
        // Clear the form inputs after successful registration
      
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
}
 

  const handleAnswerClick = (isCorrect) => {
    // check score
    if (isCorrect) setScore(score + 1);

    const next = currentQuestion + 1;
    if (next < questions.length) setCurrentQuestion(next);
    else setIsQuizOver(true);
  };

  const handleResetClick = () => {
    // Fix: score not resetting
    setScore(0);
    setCurrentQuestion(0);
    setIsQuizOver(false);
  };

  // Render loading state if data is still being fetched
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  console.log(questions);
  return (
    <>
       <img className="imglogoinquiz" src={logoSvg}/>

    <div className="Appquize">
      {isQuizOver ? (
        <ScoreView handleResetClick={handleResetClick} score={score} totalquestion={questions.length}  languages={questions[currentQuestion].language}/>
      ) : (
        <QuizView
          questions={questions}
          currentQuestion={currentQuestion}
          handleAnswerClick={handleAnswerClick}
        />
      )}
    </div>
    </>
  );
}

export default QuizHandler;
