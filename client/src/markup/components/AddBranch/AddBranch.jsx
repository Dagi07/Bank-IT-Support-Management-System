import React, { useState } from "react";
import { Button } from "react-bootstrap";
import branchsService from "../../../services/branchs.service";

const AddBranch = (props) => {
  const [form, setForm] = useState({
    username: "",
    city: "",
    name: "",
    phoneno: "",
    password: "",
  });
  const [error, setError] = useState({
    usernameError: "",
    cityError: "",
    nameError: "",
    phonenoError: "",
    passwordError: "",
    serverError: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    if (!form.username) {
      setError((error) => ({
        ...error,
        usernameError: "Username is required",
      }));
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+$/gm.test(form.username)) {
      setError((error) => ({
        ...error,
        usernameError: "Please enter a valid branch username",
      }));
      valid = false;
    } else {
      setError((error) => ({ ...error, usernameError: "" }));
    }

    if (!form.name) {
      setError((error) => ({ ...error, nameError: "Branch name is required" }));
      valid = false;
    } else {
      setError((error) => ({ ...error, nameError: "" }));
    }

    if (!form.city) {
      setError((error) => ({ ...error, cityError: "City is required" }));
      valid = false;
    } else {
      setError((error) => ({ ...error, cityError: "" }));
    }

    if (!form.phoneno) {
      setError((error) => ({
        ...error,
        phonenoError: "Phone number is required",
      }));
      valid = false;
    } else if (form.phoneno.length < 10 || form.phoneno.length > 15) {
      setError((error) => ({
        ...error,
        phonenoError: "Please enter a valid phone number",
      }));
      valid = false;
    } else {
      setError((error) => ({ ...error, phonenoError: "" }));
    }

    if (!form.password || form.password.length < 6) {
      setError((error) => ({
        ...error,
        passwordError: "Password must be at least 6 characters long",
      }));
      valid = false;
    } else {
      setError({ ...error, passwordError: "" });
    }
    console.log(error);
    if (!valid) {
      return;
    }
    setLoading(() => true);
    try {
      const addBranch = branchsService.addBranch(form, props.token);
      addBranch
        .then((data) => {
          if (data.data.status == "success") {
            setError((error) => ({ ...error, serverError: "" }));

            setTimeout(() => {
              props.setshowaddbranch(false);
              setLoading(() => false);
              window.location.reload();
            }, 1000);
          } else {
            // setSuccess(true);
            setError((error) => ({ ...error, serverError: data.error }));
          }
        })
        .catch((err) => {
          const resMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          setError((error) => ({ ...error, serverError: resMessage }));
        });
    } catch (err) {
      console.log(err);
      // setError((error) => ({ ...error, serverError: err }));
    }
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
            <input
              type="text"
              name="name"
              placeholder="Branch Name"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={form.name}
            />
            {error.nameError && (
              <div
                className="validation-error text-xs mb-2 text-red-600 text-right"
                role="alert"
              >
                {error.nameError}{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col w-5/6 mb-5 ">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={form.username}
            />
            {error.usernameError && (
              <div
                className="validation-error text-xs mb-2 text-red-600 text-right"
                role="alert"
              >
                {error.usernameError}
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/3 mb-5 ">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                value={form.city}
              />
              {error.usernameError && (
                <div
                  className="validation-error text-xs mb-2 text-red-600 text-right"
                  role="alert"
                >
                  {error.cityError}
                </div>
              )}
            </div>
            <div className="flex flex-col w-1/3 mb-5 ">
              <input
                type="text"
                name="phoneno"
                placeholder="Phone Number"
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                value={form.phoneno}
              />
              {error.phonenoError && (
                <div
                  className="validation-error text-xs mb-2 text-red-600 text-right"
                  role="alert"
                >
                  {error.phonenoError}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-5/6 mb-5 ">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
              value={form.password}
            />
            {error.passwordError && (
              <div
                className="validation-error text-xs mb-2 text-red-600 text-right"
                role="alert"
              >
                {error.passwordError}
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
                "Add Branch"
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
              onClick={() => props.setshowaddbranch(false)}
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

export default AddBranch;
