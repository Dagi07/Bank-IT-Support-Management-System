import axios from "../util/axios";

const getBranchs = async (token) => {
  const requestOptions = {
    method: "GET",
    url: "/manage-branchs",
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

const addBranch = async (addedRow, token) => {
  const requestOptions = {
    method: "POST",
    url: `/manage-branchs`,
    headers: { "Content-Type": "application/json", "x-access-token": token },
    data: addedRow,
  };
  //   try {
  const response = await axios(requestOptions);
  console.log(response);
  return response;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     return error;
  //   }
};

const updateBranch = async (updatedRow, token) => {
  const requestOptions = {
    method: "PUT",
    url: `/manage-branchs/${updatedRow._id}`,
    headers: { "Content-Type": "application/json", "x-access-token": token },
    data: updatedRow,
  };
  //   try {
  const response = await axios(requestOptions);
  console.log(response);
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
    url: "/manage-branchs/inactive",
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

const branchsService = { getBranchs, addBranch, updateBranch, getInactive };
export default branchsService;
