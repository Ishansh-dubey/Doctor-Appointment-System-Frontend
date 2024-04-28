import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; // Importing Link from React Router for navigation
import { useAuth } from "./Securirty/AuthContext"; // Importing authentication context for checking user authentication

// HeaderComponent function renders the header section of the application
const HeaderComponent = () => {
  // Access authentication context
  const authContext = useAuth();
  // Check if the user is authenticated
  const isAuthenticated = authContext.isAuthenticated;

  // Function to log out the user
  function logout() {
    authContext.signOut();
  }

  return (
    // Header section with a bottom border and margin
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="logo">
        <h1>DAS</h1> {/* Displaying the application logo */}
      </div>
      <ul className="header">
        {" "}
        {/* Navigation links */}
        <li>
          <a href="/">Home</a>
        </li>{" "}
        {/* Home link */}
        {/* Display account link based on authentication and user role */}
        {authContext.isAuthenticated && (
          <li style={{ float: "right" }}>
            <Link
              to={
                authContext.doctor
                  ? `/DoctorComponent/${authContext.user.user_id}`
                  : `/welcome/${authContext.user.user_id}`
              }
            >
              Account
            </Link>
          </li>
        )}
        {/* Display Signin/Signup link if not authenticated */}
        <li style={{ float: "right" }}>
          {!isAuthenticated && (
            <Link className="nav-link" to="/Signin">
              Signin/Signup
            </Link>
          )}
        </li>
        {/* Display Logout link if authenticated */}
        <li style={{ float: "right" }} className="nav-item fs-5">
          {isAuthenticated && (
            <Link className="nav-link" to="/signout" onClick={logout}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
};

export default HeaderComponent;
