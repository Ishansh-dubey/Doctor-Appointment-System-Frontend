import React from "react";
import { useLocation } from "react-router-dom";

const BookingSuccess = () => {
  const location = useLocation();
  let responseMessage = "Error: No response message found";

  if (location && location.state && location.state.responseMessage) {
    responseMessage = JSON.stringify(location.state.responseMessage, null, 2);
  }

  return (
    <div>
      <h2>Booking Successful!</h2>
      <p>{responseMessage}</p>
    </div>
  );
};

export default BookingSuccess;
