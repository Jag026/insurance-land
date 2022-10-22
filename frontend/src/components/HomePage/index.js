import React from 'react';
import Card from './card.js'
import './HomePage.css' 

function HomePage(){

    return (
    <div>
     <h1 class="top-header">Viva la insurance products</h1>
     <div class="container">
        
       <div class="cta-text">
        <div class="top-cta">
         <div class='title-buttons'>
          <h2>Select one of the following options to get started</h2>
          <div class="button-grid">
            <Card text="User Login" logo="fa-solid fa-hotel" />
            <Card text="Company Login" logo="fa-solid fa-hotel" />
            <Card text="New User" logo="fa-solid fa-hotel" />
            <Card text="Register User" logo="fa-solid fa-hotel" />
          </div>
         </div>
         
         <div class="aligator-container">
            <img class="fox" src={require('./fox.png')} alt="smiling fox" />
         </div>
         
        </div>
        <h2>OR</h2>
          <div class="marketplace-cta">
            <h2>Browse The Marketplace For Products</h2>
            <button>Take Me There</button>
          </div>
        </div>
       </div>
     
   </div>
  );
}


export default HomePage;