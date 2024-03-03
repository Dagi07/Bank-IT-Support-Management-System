import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SmallModal from "../SmallModal/SmallModal";
import officersService from "../../../services/officers.service";
import { connect } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const OfficersList = (props) => {
  const [officerData, setOfficerData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [apiError, setApiError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [originalOfficerData, setOriginalOfficerData] = useState([]);
  const [loading, setLoading] = useState(false);

  let token = null; // To store the token
  if (props.userInfo) {
    token = props?.userInfo.userInfo;
  }

  useEffect(() => {
    getOfficersfn();
  }, []);

  const getOfficersfn = () => {
    const getOfficers = officersService.getOfficers(token);
    getOfficers
      .then((data) => {
        setOfficerData(data.data.data);
        setOriginalOfficerData([...data.data.data]);
      })

      .catch((err) => {
        console.log(err);
        setApiError(() => err);
      });
  };

  const handleUpdate = (index) => {
    const updatedRow = officerData[index];
    const originalRow = originalOfficerData[index];

    const changesOnRow = Object.keys(updatedRow).reduce((result, key) => {
      if (updatedRow[key] !== originalRow[key]) {
        result[key] = updatedRow[key];
      }
      return result;
    }, {});
    if (changesOnRow.password && changesOnRow.password.length < 6) {
      setServerError(() => "Password length should atleast be 6 characters");
      return;
    } else if (changesOnRow.password && changesOnRow.password.length > 30) {
      setServerError(
        () => "Password length should not be more than 30 characters"
      );
      return;
    } else {
      setServerError(() => "");
    }
    setLoading(() => true);
    changesOnRow._id = officerData[index]._id;
    // console.log("changesOnRow", changesOnRow);
    const updateOfficer = officersService.updateOfficer(changesOnRow, token);
    updateOfficer
      .then((data) => {
        if (data.data.status == "success") {
          console.log("Update successful:", data);
          setEditing(() => null);
          getOfficersfn();
          setLoading(() => false);
          // setOfficerData((officerData) => [...officerData, data.data.data]);
        }
      })
      .catch((error) => {
        console.error("Error updating row:", error);
        setServerError(() => error.response.data.message);
      })
      .finally(() => setShowPassword(() => false));
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiError}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="request-section w-full top-44 mx-auto overflow-hidden flex flex-col">
          <div className="flex flex-col overflow-auto invisible hover:visible">
            <div className="visible w-full mx-auto pr-2 pl-5 pb-5">
              <h2 className="text-2xl">IT Officers List</h2>
              <Table className="table-fixed w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="text-center w-40">First Name</th>
                    <th className="text-center w-40">Last Name</th>
                    <th className="text-center w-44">Email</th>
                    <th className="text-center w-44">Phone no</th>
                    <th className="text-center w-32">Password</th>
                    <th className="text-center w-32">On Leave?</th>
                    <th className="text-center w-32">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {officerData &&
                    officerData.map((officer, index) => (
                      <React.Fragment key={officer._id}>
                        <tr className="hover:bg-gray-200 even:bg-gray-50 odd:bg-gray-100 leading-9">
                          {editing == null || editing !== index ? (
                            <>
                              <td className="text-center">
                                {officer.firstName}
                              </td>
                              <td className="text-center">
                                {officer.lastName}
                              </td>
                              <td className=" text-center">{officer.email}</td>
                              <td className=" text-center">
                                {officer.phoneno}
                              </td>
                              <td className=" text-center">******</td>
                              <td className=" text-center">
                                {officer.onLeave ? "Yes" : "No"}
                              </td>
                              <td className=" text-center">Active</td>
                              <td
                                className=" text-center"
                                onClick={() => {
                                  setShowSmallModal(true);
                                }}
                              >
                                <p>
                                  <InfoOutlinedIcon className="cursor-pointer active:opacity-25" />
                                </p>
                              </td>
                              <td>
                                <button
                                  onClick={() => setEditing(index)}
                                  className="border border-black rounded-lg px-3 py-1 bg-white text-black text-sm hover:opacity-50 active:opacity-25"
                                >
                                  Edit
                                </button>{" "}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className=" text-center">
                                <input
                                  name="firstName"
                                  type="text"
                                  value={officer.firstName}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter")
                                      handleUpdate(index);
                                  }}
                                  onChange={(event) =>
                                    setOfficerData((prevOfficerData) => [
                                      ...prevOfficerData.slice(0, index),
                                      {
                                        ...prevOfficerData[index],
                                        [event.target.name]: event.target.value,
                                      },
                                      ...prevOfficerData.slice(index + 1),
                                    ])
                                  }
                                  className="border border-gray-400 px-2 rounded-md w-28"
                                />
                              </td>

                              <td className="text-center">
                                <input
                                  name="lastName"
                                  type="text"
                                  value={officer.lastName}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter")
                                      handleUpdate(index);
                                  }}
                                  onChange={(event) =>
                                    setOfficerData((prevOfficerData) => [
                                      ...prevOfficerData.slice(0, index),
                                      {
                                        ...prevOfficerData[index],
                                        [event.target.name]: event.target.value,
                                      },
                                      ...prevOfficerData.slice(index + 1),
                                    ])
                                  }
                                  className="border border-gray-400 px-2 rounded-md w-28"
                                />
                              </td>
                              <td className=" text-center">
                                <input
                                  name="email"
                                  type="text"
                                  value={officer.email}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter")
                                      handleUpdate(index);
                                  }}
                                  onChange={(event) =>
                                    setOfficerData((prevOfficerData) => [
                                      ...prevOfficerData.slice(0, index),
                                      {
                                        ...prevOfficerData[index],
                                        [event.target.name]: event.target.value,
                                      },
                                      ...prevOfficerData.slice(index + 1),
                                    ])
                                  }
                                  className="border border-gray-400 px-2 rounded-md w-44"
                                />
                              </td>
                              <td className=" text-center">
                                <input
                                  name="phoneno"
                                  type="text"
                                  value={officer.phoneno}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter")
                                      handleUpdate(index);
                                  }}
                                  onChange={(event) =>
                                    setOfficerData((prevOfficerData) => [
                                      ...prevOfficerData.slice(0, index),
                                      {
                                        ...prevOfficerData[index],
                                        [event.target.name]: event.target.value,
                                      },
                                      ...prevOfficerData.slice(index + 1),
                                    ])
                                  }
                                  className="border border-gray-400 px-2 rounded-md w-32"
                                />
                              </td>
                              <td className=" text-center">
                                <div class="relative">
                                  <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={officer.password}
                                    onKeyDown={(event) => {
                                      if (event.key === "Enter")
                                        handleUpdate(index);
                                    }}
                                    onChange={(event) =>
                                      setOfficerData((prevOfficerData) => [
                                        ...prevOfficerData.slice(0, index),
                                        {
                                          ...prevOfficerData[index],
                                          [event.target.name]:
                                            event.target.value,
                                        },
                                        ...prevOfficerData.slice(index + 1),
                                      ])
                                    }
                                    className="border border-gray-400 px-2 rounded-md py-2 block w-full  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                    placeholder="New Password"
                                  />
                                  <button
                                    type="button"
                                    data-hs-toggle-password='{
      "target": "#hs-toggle-password"
    }'
                                    class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    onClick={() =>
                                      setShowPassword(() => !showPassword)
                                    }
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
                              </td>
                              <td className=" text-center">
                                <select
                                  name="onLeave"
                                  value={officer.onLeave}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter")
                                      handleUpdate(index);
                                  }}
                                  onChange={(event) =>
                                    setOfficerData((prevOfficerData) => [
                                      ...prevOfficerData.slice(0, index),
                                      {
                                        ...prevOfficerData[index],
                                        [event.target.name]: event.target.value,
                                      },
                                      ...prevOfficerData.slice(index + 1),
                                    ])
                                  }
                                >
                                  <option value="false">No</option>
                                  <option value="true">Yes</option>
                                </select>
                              </td>
                              <td className=" text-center">
                                <select
                                  name="isActive"
                                  defaultValue={officer.isActive}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter")
                                      handleUpdate(index);
                                  }}
                                  onChange={(event) =>
                                    setOfficerData((prevOfficerData) => [
                                      ...prevOfficerData.slice(0, index),
                                      {
                                        ...prevOfficerData[index],
                                        [event.target.name]: event.target.value,
                                      },
                                      ...prevOfficerData.slice(index + 1),
                                    ])
                                  }
                                >
                                  <option value="true">Active</option>
                                  <option value="false">Inactive</option>
                                </select>
                              </td>
                              <td></td>
                              <td className="w-7">
                                <button
                                  onClick={() => handleUpdate(index)}
                                  className="border border-white rounded-lg px-2 py-1 bg-black text-white text-sm hover:opacity-65 active:opacity-50"
                                >
                                  {!loading ? (
                                    "Update"
                                  ) : (
                                    <svg
                                      className="mx-3 h-5 w-5 animate-spin text-white"
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
                              </td>
                            </>
                          )}
                        </tr>
                        {serverError && editing == index && (
                          <tr
                            key={index}
                            className="text-xs text-red-600 text-end -mt-10 -pt-2"
                          >
                            {serverError}
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>

          {showSmallModal && (
            <SmallModal
              from="OfficersList"
              officerData={officerData}
              showsmallmodal={showSmallModal}
              setshowsmallmodal={setShowSmallModal}
            />
          )}
          {/* <div>
        {showDeleteConfirm && (
          <DeleteConfirm
            showdeleteconfirm={showDeleteConfirm}
            setshowdeleteconfirm={setShowDeleteConfirm}
          />
        )}
      </div> */}
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(OfficersList);
