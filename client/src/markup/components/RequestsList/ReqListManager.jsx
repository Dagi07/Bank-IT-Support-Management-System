import React, { useState } from "react";
import requestService from "../../../services/requests.service";

const ReqListManager = ({ request, officerdata, token, updateRequests }) => {
  const [error, setError] = useState({
    serverError: "",
  });
  const [changedAssignee, setChangedAssignee] = useState(
    request.requestAssignee
  );
  const [assignForm, setAssignForm] = useState({});
  assignForm._id = request._id;
  const [loading, setLoading] = useState(false);

  const handleAssign = async (event) => {
    const newAssignedForm = {
      ...assignForm,
      requestAssignee: changedAssignee,
    };
    setAssignForm(newAssignedForm);
    setLoading(() => true);
    try {
      // console.log("Before Update:", request);
      const assign = await requestService.updateRequest(newAssignedForm, token);
      if (assign.data.status == "success") {
        // console.log("Assign Success:", assign.data.data);
        updateRequests(assign.data.data);
        setLoading(() => false);
      }
      if (assign.data.status == "failure") {
        setError(() => ({
          ...error,
          serverError: assign.data.message,
        }));
        setTimeout(() => {
          setError((error) => ({
            ...error,
            serverError: "",
          }));
        }, 10000);
      }
      // console.log("After Update:", request);
    } catch (err) {
      console.error("Error updating request:", err);
      setError(() => ({
        ...error,
        serverError: err.response.data.message,
      }));
      setTimeout(() => {
        setChangedAssignee(() => request.requestAssignee);
      }, 500);

      setTimeout(() => {
        setError((error) => ({
          ...error,
          serverError: "",
        }));
      }, 10000);
    }
  };

  const getStatusSymbol = (request) => {
    if (request.requestAssignee) {
      if (request.isDone) {
        if (request.isFixed) {
          return "✔️✔️✔️";
        }
        return "✔️✔️";
      }
      return "✔️";
    } else {
      return "⏳";
    }
  };

  if (request) {
    return (
      <>
        <td className="w-1/2">{request.issue}</td>
        <td className="w-1/4">{request.name}</td>
        <td className="w-1/4 text-center ">
          <div className="edit-delete-icons">
            <div className="flex align-middle">
              {!request.requestAssignee ? (
                <>
                  <select
                    name="requestAssignee"
                    className="w-1/2"
                    onChange={(event) =>
                      setChangedAssignee(() => event.target.value)
                    }
                    value={changedAssignee}
                  >
                    <option> -- select --</option>
                    {officerdata.map((officer, index) => (
                      <option
                        key={index}
                        value={officer._id}
                        className={
                          officer.onLeave &&
                          "border border-pink-600 bg-pink-200"
                        }
                      >
                        {officer.firstName} {officer.lastName}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    onClick={handleAssign}
                    className="border border-white rounded-lg px-2 py-2 bg-black text-white text-xs hover:opacity-75 active:opacity-60"
                  >
                    {!loading ? (
                      "Assign"
                    ) : (
                      <svg
                        className="mx-2 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <select
                    name="requestAssignee"
                    className="w-1/2"
                    onChange={(event) =>
                      setChangedAssignee(() => event.target.value)
                    }
                    value={changedAssignee}
                  >
                    {officerdata.map((officer, index) => (
                      <option
                        key={index}
                        value={officer._id}
                        className={`
                          ${
                            officer.onLeave &&
                            "border border-pink-600 bg-pink-200"
                          }`}
                      >
                        {officer.firstName} {officer.lastName}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    onClick={handleAssign}
                    className="border border-black rounded-lg px-2 py-2 bg-white text-black text-xs hover:opacity-75 active:opacity-60"
                  >
                    {!loading ? (
                      "Change Assignee"
                    ) : (
                      <svg
                        className="mx-9 h-5 w-5 animate-spin text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          {error.serverError && (
            <p className="text-xs text-red-500 italic">{error.serverError}</p>
          )}
        </td>
        <td className="w-1/4 text-center">{getStatusSymbol(request)}</td>
      </>
    );
  }
};

export default ReqListManager;
