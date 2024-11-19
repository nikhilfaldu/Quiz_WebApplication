import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import './profile.css';
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [maxCorrectByLanguage, setMaxCorrectByLanguage] = useState({});
 
  const fetchUserData = () => {
    const username = Cookies.get("clientusername");
    const number = Cookies.get("phonenumber");
    const emaill = Cookies.get("email");
    setName(username);
    setPhoneNumber(number);
    setEmail(emaill);
    
    if (!Cookies.get("clientlogin")) {
      navigate("/login");
    }
    
    fetch(`http://localhost:8081/results/${username}`)
      .then(response => response.json())
      .then(data => {
        setExpenses(data);
      });
   };
   
   useEffect(() => {
     fetchUserData();
   }, []);  
 
   useEffect(() => {
     const tempMaxCorrectByLanguage = {};
     expenses.forEach(entry => {
      const { language, correct, total } = entry;
      const percentage = (correct / total) * 100;
      if (!(language in tempMaxCorrectByLanguage) || percentage > tempMaxCorrectByLanguage[language]?.percentage) {
        tempMaxCorrectByLanguage[language] = { language, percentage, total };
      }
    });
     setMaxCorrectByLanguage(tempMaxCorrectByLanguage);
   }, [expenses]);

   const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
   
  return (
    <>
      <Navbar />
      <div className="containerr p-5">
        <div className="row">
          <div className="col-md-4">
            <img className="img" src="https://i.imgur.com/aCwpF7V.jpg" alt="Profile" />
            <div className="d-flex flex-column p-5 bg-dark text-white">
              <div>
                <label htmlFor="name" className="display-5 text-white">Name:</label>
                <h4 id="name" className="text-white">{name}</h4>
              </div>
              <div>
                <label htmlFor="email" className="display-5 text-white">Email:</label>
                <h4 id="email" className="text-white">{email}</h4>
              </div>
              <div>
                <label htmlFor="phone" className="display-5 text-white">Phone:</label>
                <h4 id="phone" className="text-white">{phoneNumber}</h4>
              </div>
              <div>
                <button><Link to="/profiledit">edit</Link></button>
              </div>
            </div>
          </div>
          
          <div className="col-md-8 language">
            <div className="row d-flex flex-row text-white">
              {Object.values(maxCorrectByLanguage).map(({ language, percentage }) => (
                <div className=" text-center skill-block" key={language} style={{ backgroundColor: getRandomColor() }}>
                  <h4>{percentage}%</h4>
                  <h6>{language}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
