import React from 'react';
import './HomePage.css' 
import { NavLink, Redirect } from 'react-router-dom';

function Card(props) {
    return (
        <div class="card">
            <div class="logo-container">
                <i class={props.logo}></i>
            </div>
            <div class="text-container">
                <NavLink to={`/${props.link}`} class="navLink"><a>{props.text}</a></NavLink>
            </div>
         </div>
    )
}


export default Card;