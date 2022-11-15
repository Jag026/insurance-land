import React from 'react';
import './ProfilePage.css' 
import { useSelector } from 'react-redux';
  
function ProfileCard(props) {
    const sessionCompany = useSelector(state => state.session.company);
    const company = sessionCompany;    
    const numberOfPolicies = company.ownedPolicies.length
    return (
        <div class="profile-card">
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>id:{props.id}</p>
            <p> Number of owned policies: {numberOfPolicies}</p>
        </div>
    )
}


export default ProfileCard;