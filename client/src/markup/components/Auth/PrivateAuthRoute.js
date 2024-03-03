import { useEffect, useState } from "react";
import getAuth from "../../../util/auth";
import { useNavigate } from "react-router";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInUser = getAuth();

    loggedInUser.then((response) => {
      if (response.userInfo) {
        // If in here, that means the user is logged in
        // console.log(response.userInfo);
        // console.log("Set logged in to true");
        setIsLogged(true);
        if (roles && roles.length > 0 && roles.includes(response.role)) {
          // If in here, that means the user is logged and has  authorization to access the route
          console.log("Set authorized to true", response.role);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      return navigate("/");
    }
    if (!isAuthorized) {
      return navigate("/unauthorized");
    }
  }

  return children;
};

export default PrivateAuthRoute;
