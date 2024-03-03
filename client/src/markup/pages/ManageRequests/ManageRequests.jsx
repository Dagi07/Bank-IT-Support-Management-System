import React, { useState } from "react";
import RequestsList from "../../components/RequestsList/RequestsList";
import { Button } from "react-bootstrap";
import NewRequest from "../../components/NewRequest/NewRequest";
import ListerModal from "../../components/ListerModal/ListerModal";
import { connect } from "react-redux";

const ManageRequests = (props) => {
  const [showNewReq, setShowNewReq] = useState(false);
  const [showListerModal, setShowListerModal] = useState(false);

  return (
    <>
      <div className="fixed top-16 left-0 right-0 z-20">
        <div className="contact-title flex justify-between bg-black text-white p-4">
          <h2 className="text-2xl/loose font-bold ml-0 sm:ml-36">
            Manage Requests
          </h2>
          <div className="flex justify-between mr-0 lg:mr-16 w-1/2 sm:w-1/3 lg:w-1/4 ">
            <Button
              variant="outline-light"
              className={`dark-outline-btn ${
                props?.userInfo.role == "Branch" ? "visible" : "invisible"
              }`}
              onClick={() => setShowNewReq(true)}
            >
              New Request
            </Button>
            <Button
              variant="outline-light"
              className="dark-outline-btn"
              onClick={() => setShowListerModal(true)}
            >
              Fixed Requests
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-36">
        <RequestsList />
      </div>

      {showNewReq && (
        <div className="mt-28 w-full bg-slate-400 block">
          <NewRequest shownewreq={showNewReq} setshownewreq={setShowNewReq} />
        </div>
      )}

      {showListerModal && (
        <div className="mt-28 w-full bg-slate-400 block">
          <ListerModal
            from="ManageRequests"
            showlistermodal={showListerModal}
            setshowlistermodal={setShowListerModal}
          />
        </div>
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

export default connect(mapStateToProps, null)(ManageRequests);
