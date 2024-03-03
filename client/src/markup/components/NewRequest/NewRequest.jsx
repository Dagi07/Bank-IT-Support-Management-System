import React, { useState } from "react";
import { Button } from "react-bootstrap";
import requestService from "../../../services/requests.service";
import { connect } from "react-redux";

const NewRequest = (props) => {
  const [form, setForm] = useState({ issue: "", fullName: "" });
  const [error, setError] = useState({
    issueError: "",
    fullNameError: "",
    serverError: "",
  });
  const [loading, setLoading] = useState(false);

  let token = null; // To store the token
  if (props.userInfo) {
    token = props?.userInfo.userInfo;
  }

  const handleChange = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    if (!form.issue) {
      setError((error) => ({
        ...error,
        issueError: "Please describe the issue",
      }));
      valid = false;
    } else {
      setError({ ...error, issueError: "" });
    }
    console.log(error);
    if (!form.fullName || !/[A-Za-z]+\s[A-Za-z]+/gm.test(form.fullName)) {
      setError((error) => ({
        ...error,
        fullNameError: "Please enter your full name",
      }));
      valid = false;
    } else {
      setError({ ...error, fullNameError: "" });
    }
    console.log(error);
    if (!valid) {
      return;
    }
    setLoading(() => true);
    const addRequest = requestService.addRequest(form, token);
    addRequest
      .then((data) => {
        if (data.data.status == "success") {
          setError((error) => ({ ...error, serverError: "" }));

          setTimeout(() => {
            // () =>
            props.setshownewreq(false);
            window.location.reload();
            setLoading(() => false);
          }, 1000);
        } else {
          // setSuccess(true);
          setError((error) => ({ ...error, serverError: data.error }));
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError((error) => ({ ...error, serverError: resMessage }));
      });
  };

  return (
    <div className="modal-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-5/6 mx-auto">
          {error.serverError && (
            <div className="validation-error" role="alert">
              {error.serverError}
            </div>
          )}
          <div className="flex flex-col  mb-5">
            <textarea
              name="issue"
              id=""
              cols="30"
              rows="5"
              placeholder="Type the issue you encountered here..."
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={form.issue}
            ></textarea>
            {error.issueError && (
              <div
                className="validation-error text-xs mb-2 text-red-600 text-right"
                role="alert"
              >
                {error.issueError}{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col w-5/6 mb-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={form.fullName}
            />
            {error.fullNameError && (
              <div
                className="validation-error text-xs mb-2 text-red-600 text-right"
                role="alert"
              >
                {error.fullNameError}
              </div>
            )}
          </div>
          <div className="w-1/2 self-end flex justify-between">
            <Button
              type="submit"
              variant="outline-dark"
              className="group text-white bg-black border rounded-3xl py-1 md:py-2 hover:text-black hover:bg-white hover:border-black active:opacity-0 ease-in duration-300 w-1/2"
            >
              {!loading ? (
                "Add Request"
              ) : (
                <svg
                  className="mx-auto h-5 w-5 animate-spin text-white group-hover:text-black"
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
            </Button>
            <Button
              onClick={() => props.setshownewreq(false)}
              variant="outline-dark"
              className="text-black bg-white border border-black rounded-3xl py-1 px-0 md:py-2 hover:text-white hover:bg-black hover:border-white active:opacity-0 ease-in duration-300 w-1/3"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(NewRequest);
