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
    window.location.href = '/';
  };

  const goHome = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };
  
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav>
       <div>
         <a onClick={logout} class="logout">Log Out</a>
       </div>
       
        <div class="nav-div">
          <h1 onClick={goHome} class="navTitle">Insurity</h1>
        </div>
      </nav>
    );
  } else {
    sessionLinks = (
      <>
        <nav>
          <div>
            <NavLink class="nav-login" to="/login">Log In</NavLink>
            <NavLink class="nav-signup" to="/signup">Sign Up</NavLink>
          </div>

          <div class="nav-div">
            <h1 onClick={goHome} class="navTitle">Insurity</h1>
          </div>

        </nav>
      </>
    );
  }

  return (
    <ul>
        <NavLink to="/profile"></NavLink>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;