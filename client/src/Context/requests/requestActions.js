export const updateRequests = (updatedRequest) => ({
  type: "UPDATE_REQUEST",
  payload: updatedRequest,
});

import requestService from "../../services/requests.service";
import { GET_REQUESTS } from "./requestTypes";

export const getRequestsRx = (token) => {
  // Fetch requests using requestService
  //   requestService.getRequests(token).then((response) => console.log(response));
  //   return {
  //     type: GET_REQUESTS,
  //     payload: requestService
  //       .getRequests(token)
  //       .then((response) => response.data.data)
  //       .catch((error) => console.error(error)),
  //   };
};
