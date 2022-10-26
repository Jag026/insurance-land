import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"

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