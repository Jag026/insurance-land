import React from 'react';
import './ProfilePage.css' 
import { useSelector } from 'react-redux';
  
function ProfileCard(props) {
    const sessionCompany = useSelector(state => state.session.company);
    const company = sessionCompany;    
    const numberOfPolicies = JSON.parse(company.ownedPolicies).length
    return (
        <div class="profile-card">
            <p><i class="fa-solid fa-building"></i>{props.name}</p>
            <p> Number of owned policies: {numberOfPolicies}</p>
        </div>
    )
}


export default ProfileCard;