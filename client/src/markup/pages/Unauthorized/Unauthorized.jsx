import React from "react";

const Unauthorized = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center ">
      <div>
        <div className="text-3xl font-bold ">403.</div>
        <div className="text-5xl font-bold ">Not Authorized</div>
        <div className="text-lg ">
          You don't have the authorization to access the page you requested
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
