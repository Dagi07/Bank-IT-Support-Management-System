import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OfficersList from "../../components/OfficersList/OfficersList";
import ListerModal from "../../components/ListerModal/ListerModal";
import AddOfficer from "../../components/AddOfficer/AddOfficer";

const ManageOfficers = () => {
  const [showAddOfficer, setShowAddOfficer] = useState(false);
  const [showListerModal, setShowListerModal] = useState(false);
  return (
    <>
      <div className="fixed top-16 left-0 right-0">
        <div className="contact-title flex justify-between bg-black text-white p-4">
          <h2 className="text-2xl/loose font-bold ml-0 sm:ml-36">
            Manage IT Officers
          </h2>
          <div className="flex justify-between mr-0 lg:mr-16 w-1/2 sm:w-1/3 lg:w-1/4 ">
            <Button
              variant="outline-light"
              className="dark-outline-btn"
              onClick={() => setShowAddOfficer(true)}
            >
              Add IT Officer
            </Button>
            <Button
              variant="outline-light"
              className="dark-outline-btn"
              onClick={() => setShowListerModal(true)}
            >
              Inactive IT Officers
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <OfficersList />
      </div>
      <div className="mt-28 w-full bg-slate-400 block">
        {showAddOfficer && (
          <AddOfficer
            showaddofficer={showAddOfficer}
            setshowaddofficer={setShowAddOfficer}
          />
        )}
      </div>
      <div className="mt-28 w-full bg-slate-400 block">
        {showListerModal && (
          <ListerModal
            from="ManageOfficers"
            showlistermodal={showListerModal}
            setshowlistermodal={setShowListerModal}
          />
        )}
      </div>
    </>
  );
};

export default ManageOfficers;
