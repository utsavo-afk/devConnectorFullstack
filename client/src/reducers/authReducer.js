import { signin } from "../api/auth-api";
import { decode } from "jsonwebtoken";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return action.data;
    default:
      return state;
  }
};
export default authReducer;

// actions
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      let res = await signin(credentials);
      if (res) {
        dispatch({
          type: "SET_AUTH",
          data: res,
        });
        localStorage.setItem("authUser", JSON.stringify(res));
      }
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem("authUser")) {
        dispatch({
          type: "SET_AUTH",
          data: null,
        });
        localStorage.removeItem("authUser");
      }
    } catch (error) {
      throw new Error("Error occured while logging out, try again");
    }
  };
};

export const checkCacheAndSetAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("authUser")) {
      let userAuth = JSON.parse(localStorage.getItem("authUser"));
      dispatch({
        type: "SET_AUTH",
        data: userAuth,
      });
    }
  };
};

export const setAuthAndCache = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: "SET_AUTH",
      data: credentials,
    });
    localStorage.setItem("authUser", JSON.stringify(credentials));
  };
};

export const checkIsTokenExpired = (history) => {
  return (dispatch) => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser) {
      let { token } = authUser;
      let { exp } = decode(token);
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        dispatch({
          type: "SET_AUTH",
          data: null,
        });
        localStorage.removeItem("authUser");
        history.push("/login");
      }
    }
  };
};
