import React from 'react';
import './ProfilePage.css' 
import { useSelector } from 'react-redux';

function ProfileCard(props) {
    const sessionUser = useSelector(state => state.session.user);
    const user = sessionUser;    
    return (
        <div class="profile-card">
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p> Number of owned policies: {props.policyNum}</p>
        </div>
    )
}


export default ProfileCard;