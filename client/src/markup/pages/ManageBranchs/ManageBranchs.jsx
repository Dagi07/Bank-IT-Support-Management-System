import React, { useState } from "react";
import BranchsList from "../../components/BranchsList/BranchsList";
import { Button } from "react-bootstrap";
import AddBranch from "../../components/AddBranch/AddBranch";
import ListerModal from "../../components/ListerModal/ListerModal";

const ManageRequests = () => {
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [showListerModal, setShowListerModal] = useState(false);
  return (
    <>
      <div className="fixed top-16 left-0 right-0">
        <div className="contact-title flex justify-between bg-black text-white p-4">
          <h2 className="text-2xl/loose font-bold ml-0 sm:ml-36">
            Manage Branches
          </h2>
          <div className="flex justify-between mr-0 lg:mr-16 w-1/2 sm:w-1/3 lg:w-1/4 ">
            <Button
              variant="outline-light"
              className="dark-outline-btn"
              onClick={() => setShowAddBranch(true)}
            >
              Add Branch
            </Button>
            <Button
              variant="outline-light"
              className="dark-outline-btn"
              onClick={() => setShowListerModal(true)}
            >
              Inactive Branches
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <BranchsList />
      </div>
      <div className="mt-28 w-full bg-slate-400 block">
        {showAddBranch && (
          <AddBranch
            showaddbranch={showAddBranch}
            setshowaddbranch={setShowAddBranch}
          />
        )}
      </div>
      <div className="mt-28 w-full bg-slate-400 block">
        {showListerModal && (
          <ListerModal
            from="ManageBranchs"
            showlistermodal={showListerModal}
            setshowlistermodal={setShowListerModal}
          />
        )}
      </div>
    </>
  );
};

export default ManageRequests;
