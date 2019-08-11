import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

// Action types.
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

// Action creators.
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Thunk action creators.
export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};
