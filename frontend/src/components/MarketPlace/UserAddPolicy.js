import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

export function UserAddPolicy(props) {
  const dispatch = useDispatch();
  const num = props.num
  const userId = props.userId
  const handleSubmit = (e) => {
    e.preventDefault();
      return dispatch(sessionActions.addUserPolicy({ num, userId }))
        .catch(async (res) => {
          const data = await res.json();
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Add Policy</button>
    </form>
  );
}

export default UserAddPolicy;