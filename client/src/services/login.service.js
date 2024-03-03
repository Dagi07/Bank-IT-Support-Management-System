import axios from "../util/axios";

const signin = async (signinData) => {
  const requestOptions = {
    method: "POST",
    url: "/",
    headers: { "Content-Type": "application/json" },
    data: signinData,
  };

  const response = await axios(requestOptions);

  return response;
};

export default signin;
