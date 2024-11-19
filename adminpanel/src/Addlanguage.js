import React, { useState } from 'react';
import qs from 'qs'; // Import qs for query string serialization
import './Addlanguage.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const AddLanguageForm = () => {
  const [language, setLanguage] = useState('');
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const navigate = useNavigate();

  const user = Cookies.get('user');

  if (!user) {
    navigate('/');
}
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleRadioChange = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapping answers to correct format
    const answerss = answers.map((answer, index) => ({
      text: answer,
      isCorrect: index === correctAnswerIndex,
    }));

    const addbooked = {
      language,
      question,
      answers: answerss
    };

    try {
      const url = `http://localhost:8081/api/Add-quiz`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(addbooked),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        console.log('Response:', responseData);
        // Clear form fields after successful submission

        setQuestion('');
        setAnswers(['', '', '', '']);
        setCorrectAnswerIndex(0);
      } else {
        throw new Error('Failed to add new quiz.'); // Throw error if request fails
      }
    } catch (error) {
      console.error('Error adding new quiz:', error);
    }
  };

  return (
    <div className="coll main pt-5 mt-3">
      <form onSubmit={handleSubmit} >
        <label>
          Language:
          <input type="text" className="form-input" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        </label>
        <label>
          Question:
          <input type="text" className="form-input" value={question} onChange={(e) => setQuestion(e.target.value)}  required/>
        </label>
        <label>
          Answers:
          {answers.map((answer, index) => (
            <div key={index} className="answer-option">
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswerIndex === index}
                onChange={() => handleRadioChange(index)}
              />
              <input
                type="text"
                className="form-input"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </label>
        <button type="submit" className="btn-submit">Add Language</button>
      </form>
    </div>
  );
};

export default AddLanguageForm;
