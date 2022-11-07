import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"
import * as sessionActions from '../../store/session';

function CompanyProfilePage() {  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreCompany());
  }, [dispatch]);
  
  const sessionCompany = useSelector(state => state.session.company);
  const company = sessionCompany;
  const sessionPolicies = useSelector(state => state.session.policies);

  const logoutCompany = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutCompany());
    window.location.href = '/';
  };
  
  const addPolicy = (e) => {
    e.preventDefault();
    window.location.href = '/add-policy';
  };
  return (
    <div>
      <ProfileCard name={company.name} email={company.email} />
      <button onClick={logoutCompany}>Logout</button>
      <button onClick={addPolicy}>Add Policy</button>
        <div>
          {sessionPolicies.map(policy => (
            <PolicyCard id={policy.id} name={policy.name} companyName={policy.companyName} description={policy.description} premium={policy.premium} />
          ))}
        </div>
    </div>
  );
}

export default CompanyProfilePage;