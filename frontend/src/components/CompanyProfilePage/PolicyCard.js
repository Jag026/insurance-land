import React from 'react';
import './ProfilePage.css' 

function PolicyCard(props) {

    return (
        <div class="policy-card" to="/login">
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.companyName}</p>
            <p>{props.description}</p>
            <p>${props.premium}</p>
        </div>
    )
}


export default PolicyCard;