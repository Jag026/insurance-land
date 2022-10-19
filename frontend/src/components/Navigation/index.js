import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <button onClick={logout}>Log Out</button>
        <Redirect to="/" />
        </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
        <NavLink to="/profile">Profile</NavLink>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;