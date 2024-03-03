import React from "react";
import requestService from "../../../services/requests.service";
import { connect } from "react-redux";

const DeleteConfirm = (props) => {
  let token = null; // To store the token
  if (props.userInfo) {
    token = props?.userInfo.userInfo;
  }
  const handleDelete = () => {
    const deleteReq = requestService.deleteRequest(props.id);
    deleteReq
      .then((data) => {
        if (data.data.status == "success") {
          props.setshowdeleteconfirm(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="fixed top-40 left-48 md:left-96 w-1/3 h-1/4 border border-s-stone-300 rounded-md p-4 bg-slate-100 shadow-lg drop-shadow-lg z-10">
      <p className="pt-1 pl-2 font-bold">
        Are you sure you want to delete this ?
      </p>
      <div className="float-end w-5/6 md:w-1/2 pt-1 md:pt-5 xl:pt-9">
        <div className="w-full flex justify-between">
          <button
            onClick={handleDelete}
            className="text-white bg-black border  px-2 md:px-4 hover:text-black hover:bg-white hover:border-black active:opacity-10"
          >
            Yes
          </button>
          <button
            onClick={() => props.setshowdeleteconfirm(false)}
            className="text-black border border-black  px-2 md:px-4 hover:text-white hover:bg-black hover:border-white active:opacity-10"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(DeleteConfirm);
