import React from 'react';
import './ProfilePage.css' 
import { useSelector } from 'react-redux';

function PolicyCard(props) {

    return (
        <div class="polciy-card">
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.companyName}</p>
            <p>{props.description}</p>
            <p>{props.premium}</p>
        </div>
    )
}


export default PolicyCard;