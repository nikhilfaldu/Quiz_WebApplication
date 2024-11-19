// import FrameComponent from "./MacBookAir1";
import "./logincss.css";
import {

  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,

}
from 'mdb-react-ui-kit';

import tableimg from './rectangle-591@2x.png';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const MacBookAir = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  Cookies.remove('user');
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    try {
      const response = await fetch(`http://localhost:8081/logindata/${username}/${password}`);
      const result = await response.json();

      setData(result);

      if (result && result.user === 'superadmin') {
        Cookies.set('user', 'superadmin');
        console.log("superadmin")
        navigate('/dashboard');
      } else if (result && result.user === 'admin') {
        Cookies.set('user', 'admin');
        console.log("admin")
        navigate('/dashboard');
      } else {
        setError('Your name or password does not match');
        setTimeout(() => {
          setError(null); // Clear the error after 2 seconds (adjust as needed)
        }, 2000);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setTimeout(() => {
        setError(null); // Clear the error after 2 seconds (adjust as needed)
      }, 2000);
    }
  };

  return (
    <MDBContainer className="body my-5">

    <MDBCard className="inerbody">
      <MDBRow className='g-0'>

        <MDBCol md='6'>
          <MDBCardImage src={tableimg} alt="login form" className='img rounded-start w-100'/>
        </MDBCol>


        <MDBCol md='6'>
          <MDBCardBody className='d-flex flex-column'>

           <div className="cover">
            
              <h1 className="gericht">
          <span>Ger</span>
          <span className="i">i</span>
          <span>cht</span>
        </h1>
           

           <div className="secondcover" >
            <div className="welcomeBack mb-2">Welcome back!</div>
            <div className="signInTo mb-5">Sign in to your account</div>
            <form onSubmit={handleLogin}>
            <input
                  className="wrapperFrame5Child mb-4"
                  placeholder="enter your name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
             <input
                  className="wrapperFrame4Child mb-5"
                  placeholder="enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            
            <input type="submit" className="btnn mb-5 px-5" value="Sign in" />
            </form>
            </div>
            </div>

          </MDBCardBody>
        </MDBCol>

      </MDBRow>
    </MDBCard>

  </MDBContainer>
  );
};

export default MacBookAir;