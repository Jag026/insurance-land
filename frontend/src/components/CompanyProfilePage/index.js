import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function CompanyProfilePage() {  
  const sessionCompany = useSelector(state => state.session.company);
  const company = sessionCompany;
  const dispatch = useDispatch();

  const logoutCompany = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutCompany());
    window.location.href = '/';
  };
  
  return (
    <div>
      <h1>{company.username}</h1>
      <button onClick={logoutCompany}>Logout</button>
    </div>
  );
}

export default CompanyProfilePage;