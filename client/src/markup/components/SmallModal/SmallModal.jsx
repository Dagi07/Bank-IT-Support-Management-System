import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import countService from "../../../services/count.service";

const SmallModal = (props) => {
  useEffect(() => {
    if (props.from == "BranchsList") {
      try {
        countRequestsMadefn();
      } catch (error) {}
    }
  }, []);
  const countRequestsMadefn = () => {
    console.log(props.branch);
    const countRequestsMade = countService.countRequestsMade(
      props.branch._id,
      props.token
    );

    // console.log(props.branch._id, props.token);
    // console.log(countRequestsMade);
  };
  return (
    <div className="fixed text-sm font-bold top-40 left-96 w-1/4 h-1/4 border border-s-stone-300 p-4 bg-slate-100 shadow-lg drop-shadow-lg z-30">
      <button
        className="relative -top-3 -left-2"
        onClick={() => props.setshowsmallmodal(false)}
      >
        {" "}
        <CloseIcon fontSize="small" className="active:opacity-25" />
      </button>
      {props.from == "RequestsList" && (
        <p className="pt-5 pl-4">Requested by: {props.requester.fullName}</p>
      )}
      {props.from == "BranchsList" && (
        <p className="pt-5 pl-4">Total number of requests made:</p>
      )}
      {props.from == "OfficersList" && (
        <p className="pt-5 pl-4">
          Total number of requests resolved: 12 {console.log(props.officerData)}
        </p>
      )}
    </div>
  );
};

export default SmallModal;
