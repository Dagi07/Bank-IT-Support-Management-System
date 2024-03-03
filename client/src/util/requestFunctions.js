import requestService from "../services/requests.service";

const getRequestsUtilfn = (token, setRequests, updateRequests) => {
  const getRequests = requestService.getRequests(token);
  getRequests
    .then((data) => {
      console.log(data.data.data);
      setRequests(data.data.data);
      //   updateRequests(data.data.data);
    })
    .catch((err) => console.log(err));
};

export { getRequestsUtilfn };
