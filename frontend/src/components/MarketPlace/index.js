import React from 'react';
import { useSelector } from 'react-redux';
import { UserAddPolicy } from './UserAddPolicy.js'
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './marketplace.css'

function Marketplace() {  
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser;
  const policies = useSelector(state => state.session.policies);
  if (!sessionUser) return <Redirect to="/company-marketplace" />;

  return (
      <div>
          <h2>Curruent User: {user.username}</h2>
          <div className="policy-container1">
            {policies.map((policy => {
                if (!user.policyIds.includes(policy.id)) {
                    return <UserAddPolicy num={policy.id} userId={user.id} name={policy.name} description={policy.description} companyName={policy.companyName} premium={policy.premium} />
                }
            }))}
          </div>
        </div>
  );
}

export default Marketplace;