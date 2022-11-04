import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function DeletePolicy(props) {
  const dispatch = useDispatch();
  const policyId = props.policyId
  const userId = props.userId
  const handleSubmit = (e) => {
    e.preventDefault();
      return dispatch(sessionActions.deleteUserPolicy({ policyId, userId }))
        .then(window.location.href = '/profile')
        .catch(async (res) => {
          const data = await res.json();
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Delete Policy</button>
    </form>
  );
}

export default DeletePolicy;