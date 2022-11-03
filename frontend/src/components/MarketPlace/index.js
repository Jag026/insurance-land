import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserAddPolicy } from './UserAddPolicy.js'
import * as sessionActions from "../../store/session";
import './marketplace.css'

function Marketplace() {  
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser;
  const policies = useSelector(state => state.session.policies);

  return (
      <div>
          <h2>Curruent User: {user.username}</h2>
          <div className="policy-container">
            {policies.map((policy => {
                if (!user.policyIds.includes(policy.id)) {
                    return <UserAddPolicy num={policy.id} userId={user.id} header={policy.name} />
                }
            }))}
          </div>
        </div>
  );
}

export default Marketplace;