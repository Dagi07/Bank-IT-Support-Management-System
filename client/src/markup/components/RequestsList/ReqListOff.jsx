import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import requestService from "../../../services/requests.service";

const ReqListOff = ({ request, token, updateRequests }) => {
  const [doneForm, setDoneForm] = useState({});
  const [checked, setChecked] = useState(request.isDone);
  doneForm._id = request._id;
  const [error, setError] = useState({
    serverError: "",
  });

  const handleChange = async (event) => {
    const newDoneForm = { ...doneForm, isDone: event.target.checked };
    setDoneForm(newDoneForm);
    setChecked(event.target.checked);

    try {
      const done = await requestService.updateRequest(newDoneForm, token);
      updateRequests(done.data.data);
      console.log(done);
    } catch (err) {
      console.error("Error updating request:", err);
      setError((error) => ({
        ...error,
        serverError: err.response.data.message,
      }));
      setTimeout(() => {
        setChecked(() => request.isDone);
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
      <td className="w-7/12">
        {request.issue}
        {error.serverError && (
          <p className="text-xs text-red-500 italic">{error.serverError}</p>
        )}
      </td>
      <td className="w-1/4">{request.name}</td>
      <td className="w-1/3 text-center">
        <div className="edit-delete-icons">
          <p className="-mb-4 text-xs font-bold italic">
            Mark the issue as resolved
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
        </div>
      </td>
    </>
  );
};

export default ReqListOff;
