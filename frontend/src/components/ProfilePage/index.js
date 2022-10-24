import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"
import * as sessionActions from '../../store/session';

function ProfilePage(){
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser;
  const sessionPolicies = useSelector(state => state.session.policies);
  const dispatch = useDispatch();
  dispatch(sessionActions.getPolicies());

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
//        <PolicyCard id="hello" name="Billy" companyName="United LLC" description="This shit rocks" premium="100000" />


export default ProfilePage;