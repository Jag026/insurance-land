import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_COMPANY = 'session/setCompany';
const REMOVE_COMPANY = 'session/removeCompany';
const SET_POLICIES = 'session/setPolicies';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setCompany = (company) => {
  return {
    type: SET_COMPANY,
    payload: company,
  }
}

const removeCompany = () => {
  return {
    type: REMOVE_COMPANY,
  };
};

const setPolicies = (policies) => {
  return {
    type: SET_POLICIES,
    payload: policies,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(getPolicies());
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const loginCompany = (company) => async (dispatch) => {
  const { credential, password } = company;
  const response = await csrfFetch('/api/session/company-login', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(getPolicies());
  const data = await response.json();
  dispatch(setCompany(data.company));
  return response;
};

const initialState = {
  user: null,
  policies: null,
  company: null,
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_COMPANY:
      newState = Object.assign({}, state);
      newState.company = action.payload;
      return newState;
    case REMOVE_COMPANY:
      newState = Object.assign({}, state);
      newState.company = null;
      return newState;
    case SET_POLICIES:
      newState = Object.assign({}, state);
      newState.policies = action.payload;
      return newState;
    default:
      return state;

  }
};

export const restoreUser = () => async dispatch => {
  dispatch(getPolicies());
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreCompany = () => async dispatch => {
  dispatch(getPolicies());
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setCompany(data.company));
  return response;
};

export const signup = (user) => async dispatch => {
  dispatch(getPolicies());
  const { username, email, password, policyIds } = user;
  const response = await csrfFetch('/api/users', {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      policyIds
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const logoutCompany = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeCompany());
  return response;
};

export const getPolicies = (policies) => async (dispatch) => {
  const response = await csrfFetch('/api/session/policies', {
    method: 'POST',
  });
  const data = await response.json();
  dispatch(setPolicies(data.policies));
  return response;
};

export default sessionReducer;