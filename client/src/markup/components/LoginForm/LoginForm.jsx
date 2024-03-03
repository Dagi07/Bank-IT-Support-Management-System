import React, { useState } from "react";
import singin from "../../../services/login.service";
import { login } from "../../../Context/actions";
import { loginUser } from "../../../Context/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    serverError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    // console.log({ [event.target.name]: event.target.value });
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!form.username) {
      setError((error) => ({
        ...error,
        emailError: "Please enter your username or email address first",
      }));
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm.test(form.username) &&
      !/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+$/gm.test(form.username)
    ) {
      console.log("email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm.test(form.username));
      setError((error) => ({
        ...error,
        emailError: "Please enter a valid username or email address",
      }));
      valid = false;
    } else {
      setError((error) => ({ ...error, emailError: "" }));
    }

    if (!form.password || form.password.length < 6) {
      setError((error) => ({
        ...error,
        passwordError: "Password must be at least 6 characters long",
      }));
      valid = false;
    } else {
      setError((error) => ({ ...error, passwordError: "" }));
    }
    console.log(error);
    if (!valid) {
      return;
    }
    setLoading(() => true);
    try {
      const loginResponse = await singin(form);

      if (loginResponse.data.status === "success" && loginResponse.data.data) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(loginResponse.data.data)
        );
        await props
          .loginUser()
          .then(() => navigate("/manage-requests"))
          .then(() => setLoading(() => false));
      } else {
        console.log("not working");
        console.log("form", loginResponse.response);
        return;
      }
    } catch (err) {
      console.log("form", err.response.data.message);
      setError((error) =>
        // console.log(err.response.data.message);
        ({
          ...error,
          serverError: err.response.data.message,
        })
      );
      return;
    }
  };

  return (
    <section className="contact-section w-1/2">
      <div className="container mx-auto">
        <div className="contact-title">
          <h2 className="text-2xl/loose font-bold">Login to your account</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="flex flex-col md:w-2/3 mb-4 md:mb-0 ">
                      {error.serverError && (
                        <div
                          className="validation-error text-red-700 italic"
                          role="alert"
                        >
                          {error.serverError}
                        </div>
                      )}

                      <input
                        type="email"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`
                          border border-gray-300 p-2 rounded-md
                          ${!error.emailError && "mb-3"}`}
                      />
                      {error.emailError && (
                        <div
                          className="validation-error text-xs mb-3 text-red-600 text-right"
                          role="alert"
                        >
                          {error.emailError}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:w-2/3 mb-4 md:mb-0">
                      {/* <div className="max-w-sm"> */}
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Password"
                          onKeyDown={(event) => {
                            if (event.key === "Enter") handleSubmit;
                          }}
                          className={`
                        border border-gray-300 p-2 rounded-md px-2  py-2 block w-full  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        ${!error.passwordError && "mb-3"}`}
                        />
                        <button
                          type="button"
                          data-hs-toggle-password='{
      "target": "#hs-toggle-password"
    }'
                          className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={() => setShowPassword(() => !showPassword)}
                        >
                          <svg
                            className="flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              className="hs-password-active:hidden"
                              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                            />
                            <path
                              className="hs-password-active:hidden"
                              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                            />
                            <path
                              className="hs-password-active:hidden"
                              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                            />
                            <line
                              className="hs-password-active:hidden"
                              x1="2"
                              x2="22"
                              y1="2"
                              y2="22"
                            />
                            <path
                              className="hidden hs-password-active:block"
                              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                            />
                            <circle
                              className="hidden hs-password-active:block"
                              cx="12"
                              cy="12"
                              r="3"
                            />
                          </svg>
                        </button>
                      </div>
                      {/* </div> */}
                      {error.passwordError && (
                        <div
                          className="validation-error text-xs mb-3 text-red-600 text-right"
                          role="alert"
                        >
                          {error.passwordError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group col-md-12">
                    <button
                      className="group text-white bg-black py-2 px-4 rounded-md hover:bg-white hover:text-black active:opacity-50 ease-in duration-300 border border-black"
                      type="submit"
                      // disabled
                    >
                      {!loading ? (
                        <span>Login</span>
                      ) : (
                        <svg
                          className="mx-3 h-5 w-5 animate-spin text-white group-hover:text-black"
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="contact-section">
    //   <div className="auto-container">
    //     <div className="contact-title">
    //       <h2 >Login to your account</h2>
    //     </div>
    //     <div className="row clearfix">
    //       <div className="form-column col-lg-7">
    //         <div className="inner-column">
    //           <div className="contact-form">
    //             <form onSubmit={handleSubmit}>
    //               <div className="row clearfix">
    //                 <div className="form-group col-md-12">
    //                   {error.serverError && (
    //                     <div className="validation-error" role="alert">
    //                       {error.serverError}
    //                     </div>
    //                   )}
    //                   <input
    //                     type="email"
    //                     name="username"
    //                     value={form.username}
    //                     onChange={handleChange}
    //                     placeholder="Email"
    //                   />
    //                   {error.emailError && (
    //                     <div className="validation-error" role="alert">
    //                       {error.emailError}
    //                     </div>
    //                   )}
    //                 </div>

    //                 <div className="form-group col-md-12">
    //                   <input
    //                     type="password"
    //                     name="password"
    //                     value={form.password}
    //                     onChange={handleChange}
    //                     placeholder="Password"
    //                   />
    //                   {error.passwordError && (
    //                     <div className="validation-error" role="alert">
    //                       {error.passwordError}
    //                     </div>
    //                   )}
    //                 </div>

    //                 <div className="form-group col-md-12">
    //                   <button
    //                     className="theme-btn btn-style-one"
    //                     type="submit"
    //                     data-loading-text="Please wait..."
    //                   >
    //                     <span>Login</span>
    //                   </button>
    //                 </div>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     loggedIn: state.loggedIn,
//     userInfo: state.userInfo,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (token) => dispatch(login(token)),
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginUser()),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
