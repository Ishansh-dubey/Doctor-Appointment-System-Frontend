import React from "react";
import { useLocation } from "react-router-dom";

// Component to display booking success message
const BookingSuccess = () => {
  const location = useLocation(); // Get the current location object
  let responseMessage = "Error: No response message found"; // Default error message

  // If location and state exist, extract the response message from the state
  if (location && location.state && location.state.responseMessage) {
    // Format the response message as a JSON string
    responseMessage = JSON.stringify(location.state.responseMessage, null, 2);
  }

  return (
    <div>
      <h2>Booking Successful!</h2> {/* Display a success heading */}
      <p>{responseMessage}</p> {/* Display the response message */}
    </div>
  );
};

export default BookingSuccess; // Export the component
