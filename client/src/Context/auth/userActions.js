import getAuth from "../../util/auth";
import { LOG_IN, LOG_OUT } from "./authTypes";

export const login = (userInfo) => {
  return {
    type: LOG_IN,
    payload: userInfo,
  };
};

export const loginUser = () => {
  return async (dispatch) => {
    try {
      const user = await getAuth(); // Assuming getAuth is an asynchronous function
      console.log(user);
      dispatch(login(user));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
