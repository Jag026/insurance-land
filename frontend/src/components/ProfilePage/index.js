import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfilePageButton from './ProfilePageButton.js';

function ProfilePage(){
  const sessionUser = useSelector(state => state.session.user);
   const user = sessionUser;
    return (
       <div>
        <ul>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>Policy Ids: {user.policyIds}</p>
       </ul>
     </div>
  );
}


export default ProfilePage;