import React from 'react';
import { useSelector } from 'react-redux';
import * as sessionActions from "../../store/session";
import './companyMarketplace.css'

function CompanyMarketplace() {  
    const goUserLogin = (e) => {
    e.preventDefault();
    window.location.href = '/login';
    };
  
  const policies = useSelector(state => state.session.policies);
  return (
    <div>
        <div className="policy-container">
            {policies.map((policy => {
              return <div className="policy">
                <div className="policy-title-container">
                  <h2 className="policy-name">{policy.name}</h2>
                </div>
               <p>Description: <span className="inner-text">{policy.description}</span></p>
               <p>Issuer: <span className="inner-text">{policy.companyName}</span></p>
               <p>Monthly Premium: <span className="inner-text">${policy.premium}</span></p>
               <li><span onClick={goUserLogin} className="login">Login</span> as user to add policy</li>
              </div>
            }))}
        </div>
      </div>
  );
}

export default CompanyMarketplace;