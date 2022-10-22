import React from 'react';
import './HomePage.css' 

function Card(props) {
    return (
        <div class="card">
            <div class="logo-container">
                <i class={props.logo}></i>
            </div>
            <div class="text-container">
                <p>{props.text}</p>
            </div>
         </div>
    )
}


export default Card;