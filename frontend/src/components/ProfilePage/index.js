import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from "./ProfileCard"
import PolicyCard from "./PolicyCard"
import DeletePolicy from "./DeletePolicy"
import './ProfilePage.css' 


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

  const monthlyPremiumArr = [];
  userSessionPolicies.forEach(policy => {
    monthlyPremiumArr.push(policy.premium)
  })
  const initialValue = 0;
  const monthlyPremium = monthlyPremiumArr.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

  return (
       <div>
      <ProfileCard name={user.username} policyNum={userPolicies.length} monthlyPremium={monthlyPremium} />
        <div className="container">
          {userSessionPolicies.map(policy => (
            <div>
              <PolicyCard id={policy.id} name={policy.name} companyName={policy.companyName} description={policy.description} premium={policy.premium} userId={user.id} />
            </div>
          ))}
        </div>
     </div>
  );
}

export default ProfilePage;