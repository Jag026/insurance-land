import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from './card.js'
import './HomePage.css' 

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.loginDemo())
  }

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.loginDemoCompany())
  }
  
    return (
    <div>
     <h1 class="top-header">The Ultimate Insurance Marketplace</h1>
     <div class="container-home">
        
       <div class="cta-text">
        <div class="top-cta">
         <div class='title-buttons'>
          <h2>Select one of the following options to get started</h2>
          <div class="button-grid">
            <Card text="User Login" logo="fa-solid fa-user" link='login' />
            <Card text="Company Login" logo="fa-solid fa-building" link="company-login" />
            <Card text="New User" logo="fa-solid fa-user-plus" link="signup" />
            <Card text="Register Company" logo="fa-solid fa-building-circle-check" link="company-signup" />
            <a className="demo-user" onClick={handleSubmit} href=""> <i class="fa-solid fa-arrow-right"></i> Login As Demo User</a>
            <a className="demo-company" onClick={handleSubmitCompany} href=""><i class="fa-solid fa-arrow-right"></i> Login As Demo Company</a>
           
          </div>
            
         </div>
         
         <div class="fox-container">
            <img class="fox" src={require('./fox.png')} alt="smiling fox" />
         </div>
         
        </div>
        <h2>OR Browse The Marketplace For Products</h2>
          <div class="marketplace-cta">
            <Card text="Marketplace" logo="fa-solid fa-shop" link="marketplace"/>
          </div>
        </div>
       </div>
     
   </div>
  );
}


export default HomePage;