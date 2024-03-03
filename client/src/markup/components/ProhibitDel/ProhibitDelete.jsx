import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ProhibitDel = (props) => {
  return (
    <div className="fixed top-40 left-96 w-1/3 h-1/3 border border-s-stone-300  bg-slate-100 shadow-lg drop-shadow-lg p-4">
      <button
        className="relative -top-3 -left-2"
        onClick={() => props.setprohibitdelete(false)}
      >
        {" "}
        <CloseIcon fontSize="small" className="active:opacity-25" />
      </button>
      {props.from == "DelReq" && (
        <>
          <p className="text-center">
            Deletion of the request is not allowed since it has been assigned to
            an IT Officer!
          </p>
          <p className="text-left">
            Assigned IT Officer is {props.requestAssigneeName}
          </p>
        </>
      )}
    </div>
  );
};

export default ProhibitDel;
