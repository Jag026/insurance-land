import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import CompanyLoginFormPage from "./components/CompanyLoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import CompanySignupFormPage from "./components/CompanySignupFormPage";
import ProfilePage from "./components/ProfilePage";
import CompanyProfilePage from "./components/CompanyProfilePage";
import AddPolicy from "./components/AddPolicy";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import MarketPlace from "./components/MarketPlace";
import CompanyMarketplace from "./components/CompanyMarketplace";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (sessionActions.restoreUser()) {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  const [isLoadedCompany, setIsLoadedCompany] = useState(false);
  useEffect(() => {
    if (sessionActions.restoreCompany()) {
      dispatch(sessionActions.restoreCompany()).then(() => setIsLoadedCompany(true));
    }
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      
      <div>
        {isLoaded && (
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/company-login">
              <CompanyLoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/company-signup">
              <CompanySignupFormPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        )}
        {isLoadedCompany && (
          <Switch>
            <Route exact path="/company-profile">
              <CompanyProfilePage />
            </Route>
            <Route exact path="/add-policy">
              <AddPolicy />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/marketplace">
              <MarketPlace />
            </Route>
            <Route exact path="/company-marketplace">
              <CompanyMarketplace />
            </Route>
          </Switch>)}
          </div>
    </>
  );
}

export default App;