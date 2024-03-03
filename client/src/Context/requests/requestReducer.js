import { GET_REQUESTS } from "./requestTypes";
const initialState = {
  requests: [],
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS.pending:
      return {
        ...state,
        loading: true,
      };
    case GET_REQUESTS.fulfilled:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };
    case GET_REQUESTS.rejected:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "UPDATE_REQUEST":
      const updatedRequest = action.payload;
      const updatedRequests = state.requests.map((request) =>
        request._id === updatedRequest._id ? updatedRequest : request
      );

      return {
        ...state,
        requests: updatedRequests,
      };
    default:
      return state;
  }
};

export default requestReducer;
