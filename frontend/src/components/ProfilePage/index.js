import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePageButton from './ProfilePageButton.js';

function ProfilePage({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfilePageButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/policies">View Policies</NavLink>
        <NavLink to="/marketplace">Market Place</NavLink>
      </>
    );
  }

    return (
     <div class="nav">
      <nav>
       <ul>
          <li>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
          </li>
       </ul>
      </nav>
     </div>
  );
}


export default ProfilePage;