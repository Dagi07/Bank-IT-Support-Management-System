import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import requestService from "../../../services/requests.service";
import officersService from "../../../services/officers.service";
import ReqListOff from "./ReqListOff";
import ReqListBranch from "./ReqListBranch";
import ReqListManager from "./ReqListManager";
import { dayHandler } from "../../../util/dayHandler";
import "./RequestsList.css";

const RequestsList = (props) => {
  const [requests, setRequests] = useState([]);
  const [officerData, setOfficerData] = useState([]);

  let token = null; // To store the token
  if (props.userInfo) {
    token = props?.userInfo.userInfo;
  }

  useEffect(() => {
    // if (props?.userInfo.role == "Branch") {
    getRequestsfn();
    // props.getRequestsRx(token);
    // }
    if (props?.userInfo.role == "Manager") {
      const getOfficers = officersService.getOfficers(token);
      getOfficers.then((data) => {
        setOfficerData(data.data.data);
      });
    }
    // if (props?.userInfo.role == "IT Officer") {
    //   const getOfficers = officersService.getOfficers(token);
    //   getOfficers.then((data) => {
    //     setOfficerData(data.data.data);
    //   });
    // }
  }, []);

  const updateRequests = (updatedRequest) => {
    // Update the local state with the updated request
    setRequests((requests) =>
      requests.map((req) =>
        req._id === updatedRequest._id ? updatedRequest : req
      )
    );
  };
  const getRequestsfn = () => {
    const getRequests = requestService.getRequests(token);
    getRequests
      .then((data) => {
        setRequests(data.data.data);
        updateRequests(data.data.data);
        // console.log(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  // const updateList = (updatedList) => {
  //   setRequests((requests) => updatedList);
  // };

  const groupedRequests = requests.reduce((acc, request) => {
    const date = request.createdAt.split("T")[0]; // Extract date from createdAt
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {});

  return (
    <section className="request-section w-full top-44 mx-auto overflow-hidden flex flex-col">
      <div className="flex flex-col-reverse overflow-auto invisible hover:visible">
        <div className="visible w-11/12 mx-auto pb-5">
          {Object.entries(groupedRequests).map(
            ([date, requestsForDay], index) => (
              <div key={index} className="auto-container">
                <h2 className="text-2xl mt-16">{dayHandler(date)}</h2>

                <Table className="table-fixed border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="w-1/2">Issue detail</th>
                      {props?.userInfo.role != "Branch" && (
                        <th className="w-1/4 text-left">Branch Name</th>
                      )}

                      <th className="w-1/3"></th>

                      {props?.userInfo.role == "Manager" && (
                        <th className="w-1/4">status</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {props?.userInfo.role == "Branch" &&
                      requestsForDay.map((request) => (
                        <tr
                          key={request._id}
                          className="hover:bg-gray-200 even:bg-gray-50 odd:bg-gray-100 leading-10"
                        >
                          <ReqListBranch
                            request={request}
                            token={token}
                            getRequestsfn={getRequestsfn}
                          />
                        </tr>
                      ))}

                    {props?.userInfo.role == "IT Officer" &&
                      requestsForDay.map((request, index) => (
                        <tr
                          key={request._id}
                          className="hover:bg-gray-200 even:bg-gray-50 odd:bg-gray-100 leading-10"
                        >
                          <ReqListOff
                            request={request}
                            token={token}
                            updateRequests={updateRequests}
                          />
                        </tr>
                      ))}

                    {props?.userInfo.role == "Manager" &&
                      requestsForDay.map((request, index) => (
                        <tr
                          key={request._id}
                          className="hover:bg-gray-200 even:bg-gray-50 odd:bg-gray-100 leading-10"
                        >
                          <ReqListManager
                            request={request}
                            officerdata={officerData}
                            token={token}
                            updateRequests={updateRequests}
                          />
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
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
    requests: state.requests,
  };
};

export default connect(mapStateToProps, null)(RequestsList);
