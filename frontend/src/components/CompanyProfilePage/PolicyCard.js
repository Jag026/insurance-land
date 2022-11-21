import React from 'react';
import './ProfilePage.css' 
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";


function PolicyCard(props) {
    const dispatch = useDispatch();
    const sessionCompany = useSelector(state => state.session.company);
    const companyId = sessionCompany.id;
    const policyId = props.id;
    const handleSubmit = async (e) => {
    e.preventDefault();
        await dispatch(sessionActions.deleteCompanyPolicy({ policyId, companyId }))
        (window.location.href = '/company-profile')
        .catch(async (res) => {
          const data = await res.json();
        });
  };
    
    return (
      <div>
        <div class="policy-card2" to="/login">
            <h2>{props.name}</h2>
            <div className="description-container">
                <p>Description: {props.description}</p>
            </div>
            <p>Monthly Premium: ${props.premium}</p>
            <br></br>
            <p>Issuing Company Name: {props.companyName}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Delete Policy</button>
            </form>
      </div>
    )
}


export default PolicyCard;