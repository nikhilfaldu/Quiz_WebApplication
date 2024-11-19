import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import qs from "qs";

const ProfilePageedit = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [signupError, setSignupError] = useState("");

  const fetchUserData = () => {
    const number = Cookies.get("phonenumber");
    const email = Cookies.get("email");
    setPhoneNumber(number);
    setEmail(email);
    
    if (!Cookies.get("clientlogin")) {
      navigate("/login");
    }
  };
   
  useEffect(() => {
    fetchUserData();
  }, []);  

  const submitHandler = (event) => {
    event.preventDefault();

    const username = Cookies.get("clientusername");
    
    const expenseData = {
        phone: phoneNumber,
        email: email,
      };
      
      fetch(`http://localhost:8081/studentlogindata/${username}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(expenseData),
      })
      .then(() => {
        console.log("Update successful");
        Cookies.remove('phonenumber');
        Cookies.remove('email');
        Cookies.set('phonenumber', phoneNumber);
        Cookies.set('email', email);
        setPhoneNumber('');
        setEmail('');
        navigate("/profile");
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <>
      <div className="containerr p-5">
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column p-5 bg-dark text-white">
              {signupError ? (
                <p className="text-danger">{signupError}</p>
              ) : null}
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="email" className="display-5 text-white">Email:</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="phone" className="display-5 text-white">Phone:</label>
                  <input id="phone" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                  <input type="submit" value="Update" />
                </div>
              </form>
              <Link to="/profile">back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePageedit;
