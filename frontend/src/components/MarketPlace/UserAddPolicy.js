import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './marketplace.css'

export function UserAddPolicy(props) {
  const dispatch = useDispatch();
  const num = props.num
  const userId = props.userId
  const handleSubmit = (e) => {
    e.preventDefault();
      return dispatch(sessionActions.addUserPolicy({ num, userId }))
        .then(window.location.href = '/marketplace')
        .catch(async (res) => {
          const data = await res.json();
        });
  };

  return (
    <div className="policy1">
          <h2 className="policy-name">{props.name}</h2>
          <p>Description: <span className="inner-text">{props.description}</span></p>
          <p>Issuer: <span className="inner-text">{props.companyName}</span></p>
          <p>Monthly Premium: <span className="inner-text">${props.premium}</span></p>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Policy</button>
      </form>
    </div>
  );
}

export default UserAddPolicy;