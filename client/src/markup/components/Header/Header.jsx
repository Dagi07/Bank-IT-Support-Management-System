import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../../Context/actions";
import { connect } from "react-redux";

const Header = (props) => {
  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("persist:root");
    props.logout().then(() => windows.location.replace("/"));
  };

  return (
    <>
      <div className="header-upper fixed top-0 left-0 right-0 z-10">
        <div className="auto-container bg-gray-200 border border-black h-16 text-black p-5 ">
          <div className="inner-container flex justify-between items-center">
            <div className="logo-box">
              <div className="logo text-xl font-bold">
                {/* <Link href="/"><img src={logo} alt="" /></Link> */}
                {props.loggedIn
                  ? props?.userInfo.name
                    ? `Welcome, ${props?.userInfo.name}`
                    : props?.userInfo.firstName
                    ? `Welcome, ${props?.userInfo.firstName}`
                    : "Login please"
                  : null}
              </div>
            </div>
            <div className="right-column flex items-center space-x-4">
              <div className="nav-outer hidden md:block">
                <div className="mobile-nav-toggler">
                  {/* <img src="assets/images/icons/icon-bar.png" alt="" /> */}
                </div>
                <nav className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-150 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li className="nav-list">
                      <Link to="/manage-requests">MANAGE REQUESTS</Link>
                    </li>
                    <li className="nav-list">
                      <Link to="/manage-branchs">MANAGE BRANCHES</Link>
                    </li>
                    <li className="nav-list">
                      <Link to="/manage-officers">MANAGE IT OFFICERS</Link>
                    </li>
                    <li className="nav-list self-start">|</li>
                  </ul>
                </nav>
              </div>
              <div className="search-btn"></div>

              <div className="link-btn">
                <Link
                  to="/"
                  className={`py-2 px-3 text-sm rounded-sm active:opacity-40 ease-in duration-300 ${
                    props.loggedIn
                      ? "border border-black bg-white hover:border-white hover:text-white hover:bg-black"
                      : "border border-black bg-black text-white hover:border-black hover:text-black hover:bg-white"
                  }`}
                  onClick={logout}
                >
                  {props.loggedIn ? "LOG OUT" : "LOG IN"}
                </Link>
              </div>

              {/* <div className="link-btn">
                <Link to="/login" className="theme-btn btn-style-one">
                  Login
                </Link>
              </div> */}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
  };
};

// const fetchUsers
export default connect(mapStateToProps, mapDispatchToProps)(Header);
