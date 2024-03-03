import axios from "../util/axios";

const getRequests = async (token) => {
  const requestOptions = {
    method: "GET",
    url: "/manage-requests",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  try {
    const response = await axios(requestOptions);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addRequest = async (form, token) => {
  console.log(token);
  const requestOptions = {
    method: "POST",
    url: "/manage-requests",
    headers: { "Content-Type": "application/json", "x-access-token": token },
    data: form,
  };
  try {
    const response = await axios(requestOptions);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateRequest = async (form, token) => {
  const id = form._id;
  delete form._id;
  const requestOptions = {
    method: "PUT",
    url: `/manage-requests/${id}`,
    headers: { "Content-Type": "application/json", "x-access-token": token },
    data: form,
  };

  const response = await axios(requestOptions);

  return response;
};

const deleteRequest = async (reqId, token) => {
  const id = reqId;
  const requestOptions = {
    method: "DELETE",
    url: `/manage-requests/${id}`,
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };

  const response = await axios(requestOptions);

  return response;
};

const getFixed = async (token) => {
  const requestOptions = {
    method: "GET",
    url: "/manage-requests/fixed",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };

  const response = await axios(requestOptions);

  return response;
};

const requestService = {
  getRequests,
  addRequest,
  updateRequest,
  deleteRequest,
  getFixed,
};
export default requestService;
