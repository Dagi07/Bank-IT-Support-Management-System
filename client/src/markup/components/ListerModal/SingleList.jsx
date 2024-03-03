import React, { useState } from "react";
import { Switch } from "@mui/material";
import requestService from "../../../services/requests.service";

const SingleList = ({ request, token, getFixedfn }) => {
  const [checked, setChecked] = useState(request.isFixed);
  const [fixedForm, setFixedForm] = useState({});
  fixedForm._id = request._id;
  const [error, setError] = useState({
    serverError: "",
  });

  const handleChange = async (event) => {
    const newFixedForm = { ...fixedForm, isFixed: event.target.checked };
    setFixedForm(newFixedForm);
    setChecked(event.target.checked);

    try {
      const notFix = await requestService.updateRequest(newFixedForm, token);
      if (notFix.data.status == "success") {
        getFixedfn();
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
      <td className="w-9/12 border border-slate-500">
        {request.issue}
        {error.serverError && (
          <p className="text-xs text-red-500 italic">{error.serverError}</p>
        )}
      </td>
      <td className="w-9/12 border border-slate-500 text-center">
        {request.firstName} {request.lastName}
      </td>
      <td className="w-9/12 text-center border border-slate-500">
        <div className="edit-delete-icons">
          <p className="-mb-4 text-xs font-bold italic">
            Slide left if the issue is not resolved
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

export default SingleList;
