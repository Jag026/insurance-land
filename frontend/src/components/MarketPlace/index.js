import React from 'react';
import { useSelector } from 'react-redux';
import { UserAddPolicy } from './UserAddPolicy.js'

function Marketplace() {  

  console.log()
  return (
      <div>
          <UserAddPolicy num={77} userId={16} />
     </div>
  );
}

export default Marketplace;