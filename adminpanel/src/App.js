import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddLanguageForm from './Addlanguage';
import AddPanelUser from './AddUser';

import AdminAllinfo from './Allinfo';
import Dashboard from './Dashboard';
import LoginForm from './login';

import Navbar from './Navbar';
import NewsLatter from './NewsLatter';
import PanelUser from './Paneluser';
import QuestionDisplay from './Question';

import Sidebar from './Sidebar';
import UpdatePanelUserdata from './UpdatePaneluser';
import UserDetails from './userdetails';


function App(){
        return (
          
            <BrowserRouter>
        <Routes>
          <Route path="/" element={
         <LoginForm/>
          }></Route>
          <Route path="/dashboard" element={
          <div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <Dashboard/>
                
             </div>
            </div>  
          </div>
          }></Route>
          <Route path="/Allinfo" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AdminAllinfo/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/NewsLatter" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <NewsLatter/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/addpaneluser" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AddPanelUser/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/update/:name/:phone/:email/:user/:password/:_id" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <UpdatePanelUserdata/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/Addlanguage" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AddLanguageForm/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/paneluser" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <PanelUser/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/quiz/:language" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <QuestionDisplay/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/userdetails" element={<div>
            <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <UserDetails/>     
             </div>
            </div>  
          </div>}></Route>
        </Routes>
      </BrowserRouter>
      
        );
    }
  
export default App