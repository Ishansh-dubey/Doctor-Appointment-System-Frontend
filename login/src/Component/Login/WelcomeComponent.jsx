import axios from "axios";
import { useState, useEffect } from "react";
import Signin from "./Signin";
import "./WelcomeComponent.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import BookingComponent from "./Booking";
import { useAuth } from "./Securirty/AuthContext";

export default function WelcomeComponent() {
  const { user_id } = useParams();
  const { patient_id } = useParams();
  const [showBookingComponent, setShowBookingComponent] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const authContext = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setShowBookingComponent(true);
  };

  useEffect(() => {
    // Fetch all bookings for the patient
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:8080/booking");
        const bookingsData = await response.json();
        console.log(bookingsData);

        //Get todays date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter bookings for all dates
        const filteredBookings = bookingsData;
        console.log(filteredBookings);

        //sort filtered bookings by time in dscending order
        const liveBookings = filteredBookings.sort((a, b) => {
          const timeA = new Date(`${a.booking_date}T${a.booking_time}`);
          const timeB = new Date(`${b.booking_date}T${b.booking_time}`);
          return timeB - timeA;
        });
        console.log(liveBookings);

        const patientBooking = filteredBookings.filter(
          (booking) => booking.patient_id === authContext.user.user_id
        );
        console.log(filteredBookings);
        console.log(patientBooking);
        setBookings(patientBooking);
        console.log(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
    const interval = setInterval(fetchBookings, 10000);

    return () => clearInterval(interval);
  }, [user_id, authContext.user]);

  const handleDownloadPDF = async (report_id) => {
    console.log(report_id);
    try {
      console.log(report_id);
      // Make a GET request to the API endpoint
      const response = await axios.get(
        `http://localhost:8080/downloadReport/booking`,
        {
          params: {
            report_id, // Replace with actual report ID
          },
          responseType: "blob", // Receive response as binary data
        }
      );

      // Create a Blob object from the binary data
      const blob = new Blob([response.data], { type: "application/pdf" });
      console.log(blob);
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      setError("Failed to download report");
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="account">
      {showBookingComponent ? (
        <BookingComponent />
      ) : (
        <>
          <nav>
            <div className="navbar">
              <div align="center">Welcome {authContext.user.name}</div>
              <div className="navbar-right"></div>
            </div>
          </nav>

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
          <div className="pBooking">
            <div>
              <h1>List of Appointments</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Report ID</th>
                  <th>Patient Name</th>
                  <th>Upload Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id}>
                    <td>{booking.booking_id}</td>
                    <td>{booking.booking_date}</td>
                    <td>{booking.booking_time}</td>
                    <td>{booking.report_id}</td>
                    <td>{booking.patient_name}</td>
                    <td>
                      <button
                        onClick={() => {
                          const report_id = booking.report_id;
                          handleDownloadPDF(report_id);
                        }}
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
