import axios from "axios";
import { useState } from "react";
import Signin from "./Signin";
import HeaderComponent from "./Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Booking from "./Booking";
import BookingComponent from "./Booking";
import { useAuth } from "./Securirty/AuthContext";

export default function WelcomeComponent() {
  const { user_id } = useParams();
  const [showBookingComponent, setShowBookingComponent] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setShowBookingComponent(true);
  };
  const handleSignout=()=>{
    navigate ("/signout");
  }

  return (
    <div className="account">
      {showBookingComponent ? (
        <BookingComponent />
      ) : (
        <>
          <div className="header" align="center">
            Welcome {authContext.user.name}
          </div>
          <div className="pProfile">
            <h3>User Information</h3>
            <p>Patient ID: {authContext.user.user_id}</p>
            <p>Name: {authContext.user.name}</p>
            <p>Email: {authContext.user.email_id}</p>
            <p>D.O.B: {authContext.user.date_of_birth}</p>
            <p>Contact: {authContext.user.contact}</p>
            <p>Other Contact: {authContext.user.other_contact}</p>
            <p>Address: {authContext.user.address}</p>
            {/* <p>Specialization: {authContext.user.specification}</p> */}
          </div>
          <div className="booking">
            Book your appointment here
            <button type="submit" onClick={handleSubmit}>
              Book
            </button>
          </div>
          <div className="report">
            {" "}
            Check your Reports
            <button>Report</button>
          </div>
        </>
      )}
      <button className="signout" onClick={handleSignout}>Signout</button>
    </div>
  );
}
