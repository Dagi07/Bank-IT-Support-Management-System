import { LOG_IN, LOG_OUT } from "./authTypes";

const initialState = {
  loggedIn: false,
  userInfo: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: true, userInfo: action.payload };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
