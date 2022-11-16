import React from 'react';
import { useSelector } from 'react-redux';
import * as sessionActions from "../../store/session";
import './companyMarketplace.css'

function CompanyMarketplace() {  
  const policies = useSelector(state => state.session.policies);
  console.log(policies)
  return (
    <div>
        <div className="policy-container">
            {policies.map((policy => {
              return <div className="policy">
               <h1>{policy.name}</h1>
               <h2>Policy ID: {policy.id}</h2>
                <h2>Premium: {policy.premium}</h2>
              </div>
            }))}
        </div>
      </div>
  );
}

export default CompanyMarketplace;