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
        await (window.location.href = '/company-profile')
        .catch(async (res) => {
          const data = await res.json();
        });
  };
    
    return (
        <div class="policy-card" to="/login">
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.companyName}</p>
            <p>{props.description}</p>
            <p>${props.premium}</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Delete Policy</button>
            </form>
        </div>

    )
}


export default PolicyCard;