import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuestionDisplay.css'; // Import your CSS file
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const QuestionDisplay = () => {
  const { language } = useParams();
  const [isLoading, setIsLoading] = useState(true); 
  const [questions, setQuestions] = useState([]);


  const navigate = useNavigate();

  const user = Cookies.get('user');

  if (!user) {
    navigate('/');
}

  const fetchQuestions = () => {
    fetch(`http://localhost:8081/api/questions/${language}`)
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  
  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/questions/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted question from the state
        fetchQuestions();
      } else {
        console.error('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="col main pt-5 mt-3">
      <div className="mb-3">
        <h2>Questions for {language.toUpperCase()}</h2>
        {questions.map((item) => (
          <div key={item._id} className="question">
            <h3>{item.question}</h3>
            <ul className="answers">
              {item.answers.map((answer) => (
                <li key={answer._id} className={answer.isCorrect ? 'correct-answer' : ''}>
                  {answer.text} {answer.isCorrect ? <span className="correct-text">(Correct)</span> : ''}
                </li>
              ))}
            </ul>
            <button className="btn btn-outline-danger" onClick={() => handleDeleteQuestion(item._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
