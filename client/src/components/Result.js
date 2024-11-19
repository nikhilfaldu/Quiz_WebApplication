import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/result.css";
import Cookies from 'js-cookie';
const ScoreView = ({ handleResetClick, score, totalquestion,languages}) => {
  // Calculate percentage
  const percentage = (score / 5) * 100;

  const navigate = useNavigate();

  const backhome = () => {
    navigate("/");
  };

  const usernamename =Cookies.get('clientusername');



  return (
    <div>
      <div>
        <p className="lan">&#10022;&nbsp;Language: {languages}&nbsp;&#10022;</p>
      </div>
      <p className="score">&#10022;&nbsp;Hello {usernamename}</p>
      <p className="score">&#10022;&nbsp;Scored: {score} out of {totalquestion}</p>
      <p className="score">&#10022;&nbsp;Status: passed</p>
      {/* 0-2 failed and 3-5 passed */}
      <p className="score">&#10022;&nbsp;Percentage: {percentage}%</p>
      <button className="button" onClick={handleResetClick}>
        Reset
      </button>
      <button className="button" onClick={backhome}>
        Back to Home
      </button>
    </div>
  );
};

export default ScoreView;
