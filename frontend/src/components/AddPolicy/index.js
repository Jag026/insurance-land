import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function AddPolicy() {
  const dispatch = useDispatch();
  const sessionPolicies = useSelector((state) => state.session.policy);
  const sessionCompany = useSelector(state => state.session.company);
  const [name, setName] = useState("");
  const [premium, setPremium] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.addPolicy({ name, premium, description, companyName }, sessionCompany.id))
    await console.log(sessionCompany.id)
    await (window.location.href = '/company-login')
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
  };


  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Policy Name
        <br></br>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Premium
        <br></br>
        <input
          type="integer"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <br></br>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}

        />
        <input
          type="integer"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        />
      <button type="submit">Add Policy</button>
    </form>
  );
}

export default AddPolicy;