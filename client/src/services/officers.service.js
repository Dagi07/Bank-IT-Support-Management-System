import axios from "../util/axios";

const getOfficers = async (token) => {
  const requestOptions = {
    method: "GET",
    url: "/manage-officers",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  try {
    const response = await axios(requestOptions);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addOfficer = async (addedRow, token) => {
  const requestOptions = {
    method: "POST",
    url: `/manage-officers`,
    headers: { "Content-Type": "application/json", "x-access-token": token },
    data: addedRow,
  };

  const response = await axios(requestOptions);
  return response;
};

const updateOfficer = async (updatedRow, token) => {
  const requestOptions = {
    method: "PUT",
    url: `/manage-officers/${updatedRow._id}`,
    headers: { "Content-Type": "application/json", "x-access-token": token },
    data: updatedRow,
  };
  //   try {
  const response = await axios(requestOptions);
  // console.log(response);
  return response;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     return error;
  //   }
};

const getInactive = async (token) => {
  const requestOptions = {
    method: "GET",
    url: "/manage-officers/inactive",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  try {
    const response = await axios(requestOptions);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const officersService = { getOfficers, updateOfficer, getInactive, addOfficer };
export default officersService;
