import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileCard from "./ProfileCard"
// import ProfilePageButton from './ProfilePageButton.js';

function ProfilePage(){
  const sessionUser = useSelector(state => state.session.user);
   const user = sessionUser;
    return (
       <div>
        <ProfileCard name={user.username} email={user.email} />
     </div>
  );
}


export default ProfilePage;