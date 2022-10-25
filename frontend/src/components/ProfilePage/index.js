import React from 'react';
import useEffect from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"
import * as sessionActions from '../../store/session';

//

/*
  const dispatch = useDispatch();
  const policyDispatch = dispatch(sessionActions.getPolicies());
          {sessionPolicies.map(policy => (
            <PolicyCard id={policy.id} name={policy.name} companyName={policy.companyName} description={policy.description} premium={policy.premium} />
          ))}
*/


function ProfilePage() {  
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser;
  const sessionPolicies = useSelector(state => state.session.policies);
  return (
       <div>
        <ProfileCard name={user.username} email={user.email} />
        <div>
          {sessionPolicies.map(policy => (
            <PolicyCard id={policy.id} name={policy.name} companyName={policy.companyName} description={policy.description} premium={policy.premium} />
          ))}
        </div>
     </div>
  );
}

export default ProfilePage;