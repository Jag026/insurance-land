import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"
import * as sessionActions from '../../store/session';

function CompanyProfilePage() { 
  const sessionCompany = useSelector(state => state.session.company);
  const company = sessionCompany;
  const dispatch = useDispatch();
  const sessionPolicies = useSelector(state => state.session.policies)

  //sets policies owned by company
  const companyPolicies = JSON.parse(company.ownedPolicies);
  console.log(companyPolicies);

  let companySessionPolicies = [];
  sessionPolicies.forEach(policy => {
    if (companyPolicies.includes(policy.id)) {
      companySessionPolicies.push(policy)
    }
  })

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
      <ProfileCard name={company.name} email={company.email} id={company.id} />
      <button onClick={logoutCompany}>Logout</button>
      <button onClick={addPolicy}>Add Policy</button>
        <div>
          {companySessionPolicies.map(policy => (
            <PolicyCard id={policy.id} name={policy.name} companyName={policy.companyName} description={policy.description} premium={policy.premium} />
          ))}
        </div>
    </div>
  );
}

export default CompanyProfilePage;