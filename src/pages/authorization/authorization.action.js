import axios from "axios";
import md5 from "md5";
import { backendUrl } from "./../../constants/backendUrl";

import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOADING,
  REGISTERED_FALSE,
  LOGOUT_SUCCESS
} from "./authorization.action-types";

export const falseRegistered = () => dispatch => {
  dispatch({ type: REGISTERED_FALSE });
};

export const register = ({ name, email, password }) => dispatch => {
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/users`;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  password = md5(password);
  const body = JSON.stringify({ name, email, password });

  axios
    .post(url, body, config)
    .then(res => dispatch({ type: REGISTRATION_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: REGISTRATION_FAIL, payload: err.response }));
};

export const logIn = ({ email, password }) => dispatch => {
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/auth`;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  password = md5(password);
  const body = JSON.stringify({ email, password });

  axios
    .post(url, body, config)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.response }));
};

export const deleteUser = () => dispatch => {
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/auth/user`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": `${localStorage.getItem("token")}`
    }
  };

  axios
    .delete(url, config)
    .then(res => dispatch({ type: DELETE_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: DELETE_FAIL, payload: err.response }));
};

export const updateUser = property => dispatch => {
  dispatch({ type: LOADING });
  const url = `${backendUrl}/api/auth/user/${Object.keys(property)}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    }
  };

  const body = JSON.stringify(property);

  axios
    .put(url, body, config)
    .then(res => dispatch({ type: UPDATE_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: UPDATE_FAIL, payload: err.response }));
};

export const logOut = ({ email, password }) => dispatch => {
  const url = `${backendUrl}/api/auth`;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios.post(url, body, config).then(res =>
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: res.data
    })
  );
};
