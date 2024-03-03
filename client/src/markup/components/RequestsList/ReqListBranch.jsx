import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import requestService from "../../../services/requests.service";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import SmallModal from "../SmallModal/SmallModal";
import ProhibitDel from "../ProhibitDel/ProhibitDelete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ReqListBranch = ({ request, token, getRequestsfn }) => {
  const [fixedForm, setFixedForm] = useState({});
  const [checked, setChecked] = useState(request.isFixed);
  fixedForm._id = request._id;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [prohibitDelete, setProhibitDelete] = useState(false);
  const [error, setError] = useState({
    serverError: "",
  });

  const handleChange = async (event) => {
    const newFixedForm = { ...fixedForm, isFixed: event.target.checked };
    setFixedForm(newFixedForm);
    setChecked(event.target.checked);

    try {
      const fix = await requestService.updateRequest(newFixedForm, token);

      if (fix.data.status == "success") {
        getRequestsfn();
        // const getRequests = requestService.getRequests(token);
        // // console.log(getRequests);
        // getRequests.then((data) => {
        //   // console.log(data.data.data);
        //   updateList(data.data.data);
        // }
        // );
      }
    } catch (err) {
      console.error("Error updating request:", err);
      setError((error) => ({
        ...error,
        serverError: err.response.data.message,
      }));
      setTimeout(() => {
        setChecked(() => request.isFixed);
      }, 500);

      setTimeout(() => {
        setError((error) => ({
          ...error,
          serverError: "",
        }));
      }, 10000);
    }
  };

  return (
    <>
      <td className="w-9/12">
        {request.issue}
        {error.serverError && (
          <p className="text-xs text-red-500 italic">{error.serverError}</p>
        )}
      </td>

      <td className="w-9/12 text-center">
        <div className="edit-delete-icons">
          {request.isDone ? (
            <>
              <p className="-mb-4 text-xs font-bold italic">
                Please confirm if the request is fixed
              </p>
              <div>
                <label htmlFor="switch"></label>
                <Switch
                  size="small"
                  name="switch"
                  checked={checked}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <p className="-mb-4 text-xs font-bold italic invisible">
                Please confirm if the request is fixed
              </p>
              <div>
                <IconButton
                  onClick={
                    request.requestAssignee
                      ? () => setProhibitDelete(() => true)
                      : () => setShowDeleteConfirm(() => true)
                  }
                >
                  <DeleteIcon className="text-black" />
                </IconButton>
              </div>
            </>
          )}
          {/* {console.log(request)} */}
        </div>
      </td>
      <td>
        <p
          onClick={() => {
            setShowSmallModal(true);
          }}
        >
          <InfoOutlinedIcon className="cursor-pointer active:opacity-50" />
        </p>
      </td>
      {showDeleteConfirm && (
        <DeleteConfirm
          showdeleteconfirm={showDeleteConfirm}
          setshowdeleteconfirm={setShowDeleteConfirm}
          id={request._id}
        />
      )}
      {showSmallModal && (
        <SmallModal
          from="RequestsList"
          requester={request}
          showsmallmodal={showSmallModal}
          setshowsmallmodal={setShowSmallModal}
        />
      )}
      {prohibitDelete && (
        <ProhibitDel
          from="DelReq"
          requestAssigneeName={request.firstName + " " + " " + request.lastName}
          prohibitdelete={prohibitDelete}
          setprohibitdelete={setProhibitDelete}
        />
      )}
    </>
  );
};

export default ReqListBranch;
