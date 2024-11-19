import React, { useState, useEffect } from 'react';
import logoSvg from './images/logpo.svg'; 
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './login.css';
import qs from "qs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const navigate = useNavigate();
  const [containerClass, setContainerClass] = useState('container sign-in');
  const [error, setError] = useState("enter your name and password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);



  //form signup 

  const [addusername, setaddUsername] = useState("");
  const [addnumber, setaddNumber] = useState("");
  const [addpassword, setaddPassword] = useState("");
  const [addemail, setaddEmail] = useState("");

  useEffect(() => {
    const container = document.getElementById('container');
    setTimeout(() => {
      setContainerClass('container sign-in');
    }, 100);
  }, []);

  useEffect(() => {


    Cookies.remove('login');
    Cookies.remove('username');
    Cookies.remove('user');


   // if (Cookies.get('login')) {
        // Redirect to the login page
     //   navigate("/",); // Replace '/login' with the actual login page URL
    //}

  }, []); 

  const toggle = () => {
    setContainerClass((prevClass) =>
      prevClass === 'container sign-in' ? 'container sign-up' : 'container sign-in'
    );
  };

  useEffect(() => {
    const typed1 = document.querySelector('.typed1');
    const typed2 = document.querySelector('.typed2');

    const handleAnimationEnd = () => {
      typed1.style.borderRight = 'none'; // Hide border after animation
    };

    typed1.addEventListener('animationend', handleAnimationEnd);

    return () => {
      // Cleanup event listeners on component unmount
      typed1.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission

    fetch(`http://localhost:8081/logindata/${username}/${password}`)
        .then((response) => response.json())
        .then((result) => {
            setData(result);
            console.log(result.user)

            if (result && result.user==="admin" || result.user==="superadmin") {
                Cookies.set('login', 'login');
                Cookies.set('username', username);
                Cookies.set('user', result.user);
                Cookies.set('id', result._id);
                
                
                // , { expires: 1 / 144, sameSite: 'Strict' }
                navigate("/dashboard"); // Redirect to the main page
            } else {
                setError("Your name or password does not match");
                setTimeout(() => {
                    setError("re-enter your name and password"); // Clear the error after 2 seconds (adjust as needed)
                }, 2000);
            }

            console.log(result);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError("Your name or password does not match");
            setTimeout(() => {
                setError("reenter your name and password"); // Clear the error after 2 seconds (adjust as needed)
            }, 2000);
        });
};
 
  return (
  
      <body className="loginbody">
        <div className='bodybg'>
        <div className="logo">
          <img src={logoSvg} alt="Logo" />
        </div>
        <div className="menu">
          <ul>
            <a href="About.html">About</a>
            <a href="Terms.html">Terms&nbsp;&#169;</a>
          </ul>
        </div>
        <div className="skip">
          <u>
            <a href="skip.html">Skip</a>
          </u>
        </div>
        <div id="container" className={containerClass}>
          <div className="row">
            <div className="col align-items-center flex-col sign-up">
              <div className="form-wrapper align-items-center">
              </div>
            </div>
            <div className="col align-items-center flex-col sign-in">
              <div className="form-wrapper align-items-center">
                <div className="form sign-in">
                  <h3 className="heading_cont">
                    
                    &#60;&#47;&#62;&nbsp;Login to Quizcodey!
               
                
                  </h3>
                  {error === "enter your name and password"|| error === "reenter your name and password" ? (
              <p className="details">{error}</p>
            ) : (
              <p className="error">{error}</p>
            )}
                  <form onSubmit={handleLogin}>
                  <div className="input-group bor2">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input type="text" placeholder="username" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required />
                  </div>
                  <div className="input-group bor2">
                     <FontAwesomeIcon icon={faLock} className="icon" />
                    <input type="password" placeholder="Password"  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button className="button_signin">
                    <b>Log in</b>
                  </button>
                  </form>
                  
                </div>
              </div>
              <div className="form-wrapper"></div>
            </div>
          </div>
          <div className="row content-row">
            <div className="col align-items-center flex-col">
              <div className="text sign-in">
                <h2 className="entrytext">
                  &#x1F64F; &nbsp;Wellcome
                </h2>
                <br />
                <br />
                <div className="textanimated">
                  <p className="typed1 font_style">Hello friends! Now you must login and after </p>
                  <p className="typed2 font_style">you starting fun with the quiz of coding!.</p>
                </div>
              </div>
              <div className="img sign-in"></div>
            </div>
            <div className="col align-items-center flex-col">
              <div className="img sign-up"></div>
              <div className="text sign-up">
                <h2 className="entrytext">
                  <span className="mirror">&#128227;</span>&nbsp;&nbsp;Join with us
                </h2>
                <div className="textanimated2">
                  <p className="font_style">Be part of something meaningful knowledge </p>
                  <p className="typed22 font_style">Sign up and support causes....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script type="text/javascript">
          {`
            let container = document.getElementById('container')

            const toggle = () => {
              container.classList.toggle('sign-in')
              container.classList.toggle('sign-up')
            }

            setTimeout(() => {
              container.classList.add('sign-in')
            }, 100)
          `}
        </script>
        </div>
      </body>

  );
};

export default LoginForm;
