import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./markup/pages/Login/Login";
import ManageBranchs from "./markup/pages/ManageBranchs/ManageBranchs";
import ManageOfficers from "./markup/pages/ManageOfficers/ManageOfficers";
import Header from "./markup/components/Header/Header";
import ManageRequests from "./markup/pages/ManageRequests/ManageRequests";
import Unauthorized from "./markup/pages/Unauthorized/Unauthorized";
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/manage-requests"
          element={
            <PrivateAuthRoute roles={["Branch", "IT Officer", "Manager"]}>
              <ManageRequests />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/manage-branchs"
          element={
            <PrivateAuthRoute roles={["IT Officer", "Manager"]}>
              <ManageBranchs />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/manage-officers"
          element={
            <PrivateAuthRoute roles={["Manager"]}>
              <ManageOfficers />
            </PrivateAuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
