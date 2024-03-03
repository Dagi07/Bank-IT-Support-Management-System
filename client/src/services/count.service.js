import axios from "../util/axios";

const countRequestsMade = async (requestsMadeId, token) => {
  const requestOptions = {
    method: "GET",
    url: `/count/requests-made/${requestsMadeId}`,
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

const countService = { countRequestsMade };

export default countService;
