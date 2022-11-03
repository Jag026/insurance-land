import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserAddPolicy } from './UserAddPolicy.js'
import * as sessionActions from "../../store/session";

function Marketplace() {  

  //const dispatch = useDispatch();
  //dispatch.sessionActions.getPolicies();
  const policies = useSelector(state => state.session.policies);

  return (
      <div>
          <h2>Curruent User: 16</h2>
          {policies.map(policy => (
              <UserAddPolicy num={policy.id} userId={16} header={policy.name} />
          ))}
        </div>
  );
}

export default Marketplace;