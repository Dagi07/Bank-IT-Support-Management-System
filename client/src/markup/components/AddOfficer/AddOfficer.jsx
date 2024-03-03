import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import officersService from "../../../services/officers.service";
import { connect } from "react-redux";

const AddOfficer = (props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneno: "",
    password: "",
    role: "IT Officer",
    uniquePasscode: "",
  });
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phonenoError: "",
    passwordError: "",
    uniquePasscodeError: "",
    serverError: "",
  });
  const [enablePasscode, setEnablePasscode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [loading, setLoading] = useState(false);

  let token = null; // To store the token
  if (props.userInfo) {
    token = props?.userInfo.userInfo;
  }

  const handleChange = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (form.role === "Manager") {
      setEnablePasscode(true);
    } else {
      setEnablePasscode(false);
    }
  }, [form.role]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    if (!form.firstName) {
      setError((error) => ({
        ...error,
        firstNameError: "First name is required",
      }));
      valid = false;
    } else {
      setError((error) => ({ ...error, firstNameError: "" }));
    }

    if (!form.lastName) {
      setError((error) => ({ ...error, lastNameError: "City is required" }));
      valid = false;
    } else {
      setError((error) => ({ ...error, lastNameError: "" }));
    }

    if (!form.email) {
      setError((error) => ({
        ...error,
        emailError: "Email is required",
      }));
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm.test(form.email)) {
      setError((error) => ({
        ...error,
        emailError: "Please enter a valid Officer email",
      }));
      valid = false;
    } else {
      setError((error) => ({ ...error, emailError: "" }));
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
    if (form.role == "Manager" && !form.uniquePasscode) {
      setError((error) => ({
        ...error,
        uniquePasscodeError:
          "Unique passcode must be at least 8 characters long",
      }));
      valid = false;
    } else {
      setError({ ...error, uniquePasscodeError: "" });
    }
    console.log(error);
    if (!valid) {
      return;
    }
    setLoading(() => true);
    try {
      const addOfficer = officersService.addOfficer(form, token);
      addOfficer
        .then((data) => {
          if (data.data.status == "success") {
            setError((error) => ({ ...error, serverError: "" }));

            setTimeout(() => {
              props.setshowaddofficer(false);
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
    }
  };

  return (
    <div className="modal-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-5/6 mx-auto">
          {error.serverError && (
            <div
              className="validation-error text-red-500 italic text-sm"
              role="alert"
            >
              {error.serverError}
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex flex-col  mb-5 w-1/3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                value={form.firstName}
              />
              {error.firstNameError && (
                <div
                  className="validation-error text-xs mb-2 text-red-600 text-right"
                  role="alert"
                >
                  {error.firstNameError}{" "}
                </div>
              )}
            </div>
            <div className="flex flex-col mb-5 w-1/3">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                value={form.lastName}
              />
              {error.lastNameError && (
                <div
                  className="validation-error text-xs mb-2 text-red-600 text-right"
                  role="alert"
                >
                  {error.lastNameError}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/3 mb-5 ">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-md"
                onChange={handleChange}
                value={form.email}
              />
              {error.emailError && (
                <div
                  className="validation-error text-xs mb-2 text-red-600 text-right"
                  role="alert"
                >
                  {error.emailError}
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

          <div className="flex justify-between items-center h-full">
            <div className="flex flex-col w-1/3 mb-5 ">
              <div class="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 p-2 rounded-md block w-full  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  onChange={handleChange}
                  value={form.password}
                />
                <button
                  type="button"
                  data-hs-toggle-password='{
      "target": "#hs-toggle-password"
    }'
                  class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={() => setShowPassword(() => !showPassword)}
                >
                  <svg
                    class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      class="hs-password-active:hidden"
                      d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                    />
                    <path
                      class="hs-password-active:hidden"
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    />
                    <path
                      class="hs-password-active:hidden"
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    />
                    <line
                      class="hs-password-active:hidden"
                      x1="2"
                      x2="22"
                      y1="2"
                      y2="22"
                    />
                    <path
                      class="hidden hs-password-active:block"
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    />
                    <circle
                      class="hidden hs-password-active:block"
                      cx="12"
                      cy="12"
                      r="3"
                    />
                  </svg>
                </button>
              </div>
              {error.passwordError && (
                <div
                  className="validation-error text-xs mb-2 text-red-600 text-right"
                  role="alert"
                >
                  {error.passwordError}
                </div>
              )}
            </div>
            <div className="flex w-1/3 mb-5 items-center">
              <label htmlFor="role">Role:</label>
              <select
                name="role"
                className="w-full p-2 ml-1 rounded-md"
                defaultValue={form.role}
                onChange={handleChange}
              >
                <option value="IT Officer">IT Officer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>
          <div className="flex mb-5 w-2/3">
            {enablePasscode && (
              <div class="relative w-full">
                <input
                  type={showPasscode ? "text" : "password"}
                  name="uniquePasscode"
                  placeholder="Please enter the Unique Passcode to add another manager"
                  className="border border-gray-300 p-2 rounded-md w-full block text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  onChange={handleChange}
                  value={form.uniquePasscode}
                />
                <button
                  type="button"
                  data-hs-toggle-password='{
      "target": "#hs-toggle-password"
    }'
                  class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={() => setShowPasscode(() => !showPasscode)}
                >
                  <svg
                    class="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      class="hs-password-active:hidden"
                      d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                    />
                    <path
                      class="hs-password-active:hidden"
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    />
                    <path
                      class="hs-password-active:hidden"
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    />
                    <line
                      class="hs-password-active:hidden"
                      x1="2"
                      x2="22"
                      y1="2"
                      y2="22"
                    />
                    <path
                      class="hidden hs-password-active:block"
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    />
                    <circle
                      class="hidden hs-password-active:block"
                      cx="12"
                      cy="12"
                      r="3"
                    />
                  </svg>
                </button>
                {error.uniquePasscodeError && (
                  <div
                    className="validation-error text-xs mb-2 text-red-600 text-right"
                    role="alert"
                  >
                    {error.uniquePasscodeError}
                  </div>
                )}
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
                "Register"
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
              onClick={() => props.setshowaddofficer(false)}
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
export default connect(mapStateToProps, null)(AddOfficer);
