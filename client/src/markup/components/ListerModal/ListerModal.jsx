import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import requestService from "../../../services/requests.service";
import dayjs from "dayjs";
import { Table } from "react-bootstrap";
import SingleList from "./SingleList";
import branchsService from "../../../services/branchs.service";
import officersService from "../../../services/officers.service";
import { dayHandler } from "../../../util/dayHandler";
import CloseIcon from "@mui/icons-material/Close";

const ListerModal = (props) => {
  const [requests, setRequests] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [activeForm, setActiveForm] = useState([]);

  let token = null; // To store the token
  if (props.userInfo) {
    token = props?.userInfo.userInfo;
  }

  useEffect(() => {
    if (props.from == "ManageRequests") {
      getFixedfn();
    }
    if (props.from == "ManageBranchs") {
      getInactiveBrfn();
    }
    if (props.from == "ManageOfficers") {
      getInactiveOfffn();
    }
  }, []);

  const getInactiveBrfn = () => {
    const getInactive = branchsService.getInactive(token);
    getInactive
      .then((data) => {
        setBranchs(data.data.data);
        // console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getInactiveOfffn = () => {
    const getInactive = officersService.getInactive(token);
    getInactive
      .then((data) => {
        setOfficers(data.data.data);
        // console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getFixedfn = () => {
    const getFixed = requestService.getFixed(token);
    getFixed
      .then((data) => {
        setRequests(data.data.data);
        // console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };

  const groupedRequests = requests.reduce((acc, request) => {
    const date = request.createdAt.split("T")[0]; // Extract date from createdAt
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {});

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

  const makeBranchActive = async (id) => {
    const newActiveForm = { ...activeForm, isActive: true };
    setActiveForm(newActiveForm);
    newActiveForm._id = id;
    try {
      const done = await branchsService.updateBranch(newActiveForm, token);
      if (done.data.status == "success") {
        getInactiveBrfn();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const makeOfficerActive = async (id) => {
    const newActiveForm = { ...activeForm, isActive: true };
    setActiveForm(newActiveForm);
    newActiveForm._id = id;
    console.log(activeForm, newActiveForm);
    try {
      const done = await officersService.updateOfficer(newActiveForm, token);
      if (done.data.status == "success") {
        getInactiveOfffn();
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div className="modal-lg">
      <button
        onClick={() => {
          props.setshowlistermodal(false);
        }}
        className="relative -top-5"
      >
        <CloseIcon className="active:opacity-25" />
      </button>
      {props.from == "ManageRequests" && (
        <section className="request-section w-11/12 mx-auto h-96 -mr-1 text-sm flex flex-col">
          <div className="flex flex-col-reverse overflow-auto invisible hover:visible">
            <div className="visible">
              {Object.entries(groupedRequests).map(
                ([date, requestsForDay], index) => (
                  <div key={index} className="auto-container">
                    <h2 className="text-xl mt-4">{dayHandler(date)}</h2>

                    <Table className="table-fixed border-collapse border border-slate-500 w-11/12">
                      <thead>
                        <tr>
                          <th className="w-8/12 border border-slate-500">
                            Issue detail
                          </th>
                          {(props?.userInfo.role == "Manager" ||
                            props?.userInfo.role == "IT Officer") && (
                            <th className="w-3/12 border border-slate-500">
                              Branch
                            </th>
                          )}
                          {
                            (props?.userInfo.role == "Manager" ||
                              props?.userInfo.role == "Branch") && (
                              <th className="w-3/12 border border-slate-500">
                                Resolved by
                              </th>
                            )
                            // )
                          }
                          {props?.userInfo.role == "Branch" && (
                            <th className="w-3/12 border border-slate-500"></th>
                          )}
                          {props?.userInfo.role == "Manager" && (
                            <th className="w-1/12 border border-slate-500">
                              status
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {props?.userInfo.role == "Branch" &&
                          requestsForDay.map((request) => (
                            <tr
                              key={request._id}
                              className="hover:bg-gray-200 leading-10"
                            >
                              <SingleList
                                request={request}
                                token={token}
                                getFixedfn={getFixedfn}
                              />
                            </tr>
                          ))}

                        {props?.userInfo.role == "IT Officer" &&
                          requestsForDay.map((request) => (
                            <tr
                              key={request._id}
                              className="hover:bg-gray-200 leading-9"
                            >
                              <td className="w-2/3 border border-slate-500">
                                {request.issue}
                              </td>
                              {/* {console.log(request)} */}
                              <td className="w-1/3 text-center border border-slate-500">
                                <div className="edit-delete-icons">
                                  {request?.name}
                                </div>
                              </td>
                            </tr>
                          ))}

                        {props?.userInfo.role == "Manager" &&
                          requestsForDay.map((request) => (
                            <tr
                              key={request._id}
                              className="hover:bg-gray-200  leading-9"
                            >
                              <td className="w-4/12 border border-slate-500">
                                {request.issue}
                              </td>
                              <td className="w-4/12 text-center border border-slate-500">
                                <div className="edit-delete-icons">
                                  {request.name}
                                </div>
                              </td>
                              <td className="w-4/12 text-center border border-slate-500">
                                <div className="edit-delete-icons">
                                  {request.firstName} {request.lastName}
                                </div>
                              </td>
                              <td className="w-1/12 text-center text-xs border border-slate-500">
                                {getStatusSymbol(request)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
      {props.from == "ManageBranchs" && (
        <section className="request-section w-11/12 mx-auto h-96 -mr-1 text-sm flex flex-col">
          <div className="flex flex-col-reverse overflow-auto invisible hover:visible">
            <div className="visible">
              <h2 className="text-2xl">IT Officers List</h2>
              <Table className="table-fixed w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="w-48">Branch Name</th>
                    <th className="w-48">Username</th>
                    <th className="w-36">Phone no</th>
                    <th className="w-40">City</th>
                    {/* <th className="text-center w-32">Password</th>
                  <th className="text-center w-32">On Leave?</th>
                  <th className="text-center w-32">Status</th> */}
                    <th className=""></th>
                    <th className="w-28"></th>
                  </tr>
                </thead>
                <tbody>
                  {branchs &&
                    branchs.map((branch, index) => (
                      <>
                        <tr
                          key={"employee.employee_id"}
                          className="hover:bg-gray-200 even:bg-gray-50 odd:bg-gray-100 leading-9"
                        >
                          <>
                            <td className="text-center">{branch.name}</td>
                            <td className="">{branch.username}</td>
                            <td className=" text-center">{branch.phoneno}</td>
                            <td className=" text-center">{branch.city}</td>
                            {/* <td className=" text-center">******</td>
                            <td className=" text-center">No</td> */}
                            {/* <td className=" text-center">Active</td> */}
                            <td
                              className=" text-center"
                              onClick={() => {
                                // setShowSmallModal(true);
                              }}
                            >
                              <p>i</p>
                            </td>
                            <td className="">
                              <button
                                onClick={() => makeBranchActive(branch._id)}
                                className="border border-black rounded-lg px-3 py-1 bg-white text-black text-sm hover:opacity-50 active:opacity-25"
                              >
                                Make Active
                              </button>
                            </td>
                          </>
                        </tr>
                        {/* {serverError && editing == index && (
                        <tr
                          key={"error" + index}
                          className="text-xs text-red-600 text-end -mt-10 -pt-2"
                        >
                          {serverError}
                        </tr>
                      )} */}
                      </>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          {/* {showSmallModal && (
            <SmallModal
              from="BranchsList"
              showsmallmodal={showSmallModal}
              setshowsmallmodal={setShowSmallModal}
            />
          )} */}
        </section>
      )}
      {props.from == "ManageOfficers" && (
        <section className="contact-section w-full px-4 mx-auto">
          <div className="auto-container">
            <h2 className="text-2xl">IT Officers List</h2>
            <Table className="table-fixed w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-center w-40">First Name</th>
                  <th className="text-center w-40">Last Name</th>
                  <th className="text-center w-44">Email</th>
                  <th className="text-center w-44">Phone no</th>
                  {/* <th className="text-center w-32">Password</th>
                  <th className="text-center w-32">On Leave?</th>
                  <th className="text-center w-32">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {officers &&
                  officers.map((officer, index) => (
                    <>
                      <tr
                        key={"employee.employee_id"}
                        className="hover:bg-gray-200 even:bg-gray-50 odd:bg-gray-100 leading-9"
                      >
                        <>
                          <td className="text-center">{officer.firstName}</td>
                          <td className="text-center">{officer.lastName}</td>
                          <td className=" text-center">{officer.email}</td>
                          <td className=" text-center">{officer.phoneno}</td>
                          {/* <td className=" text-center">******</td>
                            <td className=" text-center">No</td> */}
                          {/* <td className=" text-center">Active</td> */}
                          <td
                            className=" text-center"
                            onClick={() => {
                              // setShowSmallModal(true);
                            }}
                          >
                            <p>i</p>
                          </td>
                          <td>
                            <button
                              onClick={() => makeOfficerActive(officer._id)}
                              className="border border-black rounded-lg px-3 py-1 bg-white text-black text-sm hover:opacity-50 active:opacity-25"
                            >
                              Make Active
                            </button>
                          </td>
                        </>
                      </tr>
                    </>
                  ))}
              </tbody>
            </Table>
          </div>
          {/* {showSmallModal && (
            <SmallModal
              from="officersList"
              showsmallmodal={showSmallModal}
              setshowsmallmodal={setShowSmallModal}
            />
          )} */}
        </section>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(ListerModal);
