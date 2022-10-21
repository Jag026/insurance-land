import React from 'react';
import Card from './card.js'
import './HomePage.css' 

function HomePage(){

    return (
    <div>
     <h1 class="top-header">Viva la insurance products</h1>
     <div class="container">
       <div class="cta-text">
        <h2>Select one of the following options to get started</h2>
        <div class="button-grid">
            <Card text="User Login" />
            <Card text="Company Login" />
            <Card text="New User" />
            <Card text="Register User" />
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