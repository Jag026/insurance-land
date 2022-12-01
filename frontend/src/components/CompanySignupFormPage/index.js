import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './CompanySignUpForm.css';

function CompanySignupFormPage() {
  const dispatch = useDispatch();
  const sessionCompany = useSelector((state) => state.session.company);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ownedPolicies, setOwnedPolicies] = useState("[]");
  const [errors, setErrors] = useState([]);

  if (sessionCompany) return <Redirect to="/company-profile" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signupCompany({ email, username, password, ownedPolicies }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <br></br>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <br></br>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <br></br>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          hidden
          type="text"
          value={ownedPolicies}
          onChange={(e) => setOwnedPolicies(e.target.value)}
          required
        />
      </label>
      <button className="signup-button" type="submit">Sign Up</button>
    </form>
  );
}

export default CompanySignupFormPage;