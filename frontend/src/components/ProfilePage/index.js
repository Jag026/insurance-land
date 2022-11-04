import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"
import DeletePolicy from "./DeletePolicy"


function ProfilePage() {  
  const sessionUser = useSelector(state => state.session.user);
  const user = sessionUser;
  const userPolicies = JSON.parse(user.policyIds);
  const sessionPolicies = useSelector(state => state.session.policies);
  let userSessionPolicies = [];
  sessionPolicies.forEach(policy => {
    if (userPolicies.includes(policy.id)) {
      userSessionPolicies.push(policy)
    }
  })

  return (
       <div>
      <ProfileCard name={user.username} email={user.email} policyNum={userPolicies.length} />
        <div>
          {userSessionPolicies.map(policy => (
            <div>
              <PolicyCard id={policy.id} name={policy.name} companyName={policy.companyName} description={policy.description} premium={policy.premium} />
              <DeletePolicy policyId={policy.id} userId={user.id} />
            </div>
          ))}
        </div>
     </div>
  );
}

export default ProfilePage;