import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rank from './rank';
import Login from './login';
import { CheckUserExist } from '../helper/helper';
import Dashboard from './dashboard';


import Quizhndler from './quizhandler';
import History from './history';
import ProfilePage from './profile';
import ProfilePageedit from './profileedit';

function App() {

 
  return (
    <Router>
      <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
  <Route path="/quiz/:language" element={<Quizhndler/>}/>
  {/* <Route path="/results" element={<Results/>} /> */}
  <Route path="/rank" element={<Rank />} />
  <Route path="/history" element={<History />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/profiledit" element={<ProfilePageedit />} />




</Routes>

    </Router>
  );
}

export default App;
