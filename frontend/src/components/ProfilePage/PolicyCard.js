import React from 'react';
import './ProfilePage.css' 
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";


function PolicyCard(props) {
  const dispatch = useDispatch();
  const policyId = props.id
  const userId = props.userId
    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.deleteUserPolicy({ policyId, userId }))
            .then(window.location.href = '/profile')
            .catch(async (res) => {
                const data = await res.json();
            });
    }
    return (
        <div className="card">
            <p className="card-header-p">{props.name}</p>
            <p>${props.premium}</p>
            <p>{props.description}</p>
            <p>Issuer: {props.companyName}</p>
            <form onSubmit={handleSubmit} class="submitButton">
                <button type="submit">Delete Policy</button>
            </form>
        </div>
    )
}


export default PolicyCard;