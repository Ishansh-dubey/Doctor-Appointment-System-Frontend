import { useEffect, useRef, useState } from "react";
import { useAuth } from "./Securirty/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import "./Doctor.css";
import "./Booking";

export default function DoctorComponent() {
  // Authentication context for checking user authentication and access control
  const authContext = useAuth();

  // Destructure user_id from the URL parameters
  const { user_id } = useParams();

  // State variables for managing bookings, past bookings, and file uploads
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const [uploadParams, setUploadParams] = useState({});
  const [uploadStatusMap, setUploadStatusMap] = useState({});
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});

  const fileInputRef = useRef(null);

  // Modify the markOption function to update the selected option for the specific booking ID
  const markOption = (bookingId, option) => {
    setSelectedOption((prevOptions) => {
      const updatedOptions = { ...prevOptions, [bookingId]: option };
      localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
      return updatedOptions;
    });
  };

  // Modify the resetOption function to reset the selected option for the specific booking ID
  const resetOption = (bookingId) => {
    setSelectedOption((prevOptions) => {
      const updatedOptions = { ...prevOptions, [bookingId]: null };
      localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
      return updatedOptions;
    });
  };

  useEffect(() => {
    // Retrieve selected options from local storage when component mounts
    const storedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
    if (storedOptions) {
      setSelectedOption(storedOptions);
    }
  }, []);

  useEffect(() => {
    // Fetch all bookings for the doctor
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:8080/booking");
        const bookingsData = await response.json();
        console.log(bookingsData);

        //Get todays date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        //filter booking for todays and future dates
        const filteredBookings = bookingsData.filter((booking) => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate >= today;
        });
        console.log(filteredBookings);

        //sort filtered bookings by time in ascending order
        const liveBookings = filteredBookings.sort((a, b) => {
          const timeA = new Date(`${a.booking_date}T${a.booking_time}`);
          const timeB = new Date(`${b.booking_date}T${b.booking_time}`);
          return timeA - timeB;
        });
        console.log(liveBookings);

        const doctorBooking = filteredBookings.filter(
          (booking) => booking.doctor_id === authContext.user.doctor_id
        );
        console.log(doctorBooking);

        setBookings(doctorBooking);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
    const interval = setInterval(fetchBookings, 10000);

    return () => clearInterval(interval);
  }, [user_id, authContext.user]);

  useEffect(() => {
    // Fetch all bookings for the doctor for past appointments
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:8080/booking");
        const pastBookingsData = await response.json();
        console.log(pastBookingsData);
        //Get todays date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        //filter booking for todays and future dates
        const filteredBookings = pastBookingsData.filter((booking) => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate < today;
        });
        console.log(filteredBookings);

        //sort filtered bookings by time in dscending order
        const pastBookings = filteredBookings.sort((a, b) => {
          const timeA = new Date(`${a.booking_date}T${a.booking_time}`);
          const timeB = new Date(`${b.booking_date}T${b.booking_time}`);
          return timeB - timeA;
        });
        console.log(pastBookings);

        const doctorPastBooking = filteredBookings.filter(
          (booking) => booking.doctor_id === authContext.user.doctor_id
        );
        console.log(doctorPastBooking);

        setPastBookings(doctorPastBooking);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
    const interval = setInterval(fetchBookings, 90000);

    return () => clearInterval(interval);
  }, [user_id, authContext.user]);

  // Function to save report ID in local storage
  const saveReportIdToLocalStorage = (bookingId, reportId) => {
    const storageKey = `report_${bookingId}`;
    localStorage.setItem(storageKey, reportId);
  };

  // Function to retrieve report ID from local storage
  const getReportIdFromLocalStorage = (bookingId) => {
    const storageKey = `report_${bookingId}`;
    return localStorage.getItem(storageKey);
  };

  async function handleReportSubmission(
    booking_id,
    patient_name,
    booking_date,
    patient_id
  ) {
    try {
      fileInputRef.current.click();

      setUploadStatus((prevStatus) => ({ ...prevStatus, [booking_id]: null }));

      setUploadParams({ booking_id, patient_name, booking_date, patient_id });
    } catch (error) {
      console.error("Error handling report submission:", error);
    }
  }

  async function handleFileUpload(e) {
    const { booking_id, patient_name, booking_date, patient_id } = uploadParams;
    if (!booking_id || !patient_name || !booking_date || !patient_id) {
      console.error("Booking details not available for file upload");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("booking_report_id", booking_id);
    formData.append("patient_report_name", patient_name);
    formData.append("doctor_report_id", authContext.user.doctor_id);
    formData.append("booking_date", booking_date);
    formData.append("patient_report_id", patient_id);
    formData.append("pdf", file);
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8080/uploadReport", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json(); // Parse response data as JSON
      console.log(responseData);
      if (response.ok) {
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [booking_id]: "success",
        }));

        setUploadStatusMap((prevMap) => ({
          ...prevMap,
          [booking_id]: responseData.report_id,
        }));
        saveReportIdToLocalStorage(booking_id, responseData.report_id); // Save report ID in local storage
      } else {
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [booking_id]: "failure",
        }));
        console.error("Failed to upload report");
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      setUploadStatus((prevStatus) => ({
        ...prevStatus,
        [booking_id]: "failure",
      }));
    }
  }

  const handleDownloadPDF = async (report_id) => {
    try {
      console.log(report_id);
      // Make a GET request to the API endpoint
      const response = await axios.get(`http://localhost:8080/downloadReport`, {
        params: {
          report_id, // Replace with actual report ID
        },
        responseType: "blob", // Receive response as binary data
      });

      // Create a Blob object from the binary data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

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

  // Redirect to home if user is not authenticated or is not a doctor
  if (!authContext.isAuthenticated || !authContext.doctor) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navbar-right"></div>
        </div>
      </nav>
      <div className="profile">
        <h3>Doctor Information</h3>
        <p>Doctor ID: {authContext.user.doctor_id}</p>
        <p>Name: {authContext.user.name}</p>
        <p>Email: {authContext.user.email_id}</p>
        <p>Contact: {authContext.user.contact}</p>
        <p>Address: {authContext.user.address}</p>
        <p>Specialization: {authContext.user.specification}</p>
      </div>
      {/* Bookings */}
      <div className="cBooking">
        <div>
          <h1>List of Pending Appointments</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Report ID</th>
              <th>Actions</th>
              {/* <th>Upload Status</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.booking_time}</td>
                <td>{booking.patient_name}</td>
                <td>{getReportIdFromLocalStorage(booking.booking_id)}</td>

                <td>
                  <button
                    onClick={() =>
                      handleReportSubmission(
                        booking.booking_id,
                        booking.patient_name,
                        booking.booking_date,
                        booking.patient_id
                      )
                    }
                  >
                    Upload Report
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />

                  <button
                    onClick={() => {
                      const report_id = getReportIdFromLocalStorage(
                        booking.booking_id
                      );
                      handleDownloadPDF(report_id);
                    }}
                  >
                    Download PDF
                  </button>
                </td>

                <td className="optionSelection">
                  {selectedOption[booking.booking_id] ? (
                    selectedOption[booking.booking_id] === "right" ? (
                      <span style={{ color: "green" }}>&#10004;</span>
                    ) : (
                      <span style={{ color: "red" }}>&#10006;</span>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => markOption(booking.booking_id, "right")}
                      >
                        <span style={{ color: "green" }}>&#10004; </span>
                      </button>
                      <button
                        onClick={() => markOption(booking.booking_id, "wrong")}
                      >
                        <span style={{ color: "red" }}>&#10006; </span>
                      </button>
                    </>
                  )}
                  {/* Add a reset button here */}
                  <button onClick={() => resetOption(booking.booking_id)}>
                    <FontAwesomeIcon icon={faUndo} /> {/* Reset icon */}
                  </button>
                </td>

                <td>
                  {uploadStatus[booking.booking_id] === "success" && (
                    <p>Report uploaded successfully. </p>
                  )}
                  {uploadStatus[booking.booking_id] === "failure" && (
                    <p>Failed to upload report</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>List of Past Appointments</h1>
      </div>
      {/* Bookings */}
      <div className="pBooking">
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Report ID</th>
              <th>Actions</th>
              {/* <th>Upload Status</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pastBookings.map((bookings) => (
              <tr key={bookings.booking_id}>
                <td>{bookings.booking_id}</td>
                <td>{bookings.booking_date}</td>
                <td>{bookings.booking_time}</td>
                <td>{bookings.patient_name}</td>
                <td>{getReportIdFromLocalStorage(bookings.booking_id)}</td>

                <td>
                  <button
                    onClick={() =>
                      handleReportSubmission(
                        bookings.booking_id,
                        bookings.patient_name,
                        bookings.booking_date,
                        bookings.patient_id
                      )
                    }
                  >
                    Upload Report
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />

                  <button
                    onClick={() => {
                      const report_id = getReportIdFromLocalStorage(
                        bookings.booking_id
                      );
                      handleDownloadPDF(report_id);
                    }}
                  >
                    Download PDF
                  </button>
                </td>

                <td className="optionSelection">
                  {selectedOption[bookings.booking_id] ? (
                    selectedOption[bookings.booking_id] === "right" ? (
                      <span style={{ color: "green" }}>&#10004;</span>
                    ) : (
                      <span style={{ color: "red" }}>&#10006;</span>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => markOption(bookings.booking_id, "right")}
                      >
                        <span style={{ color: "green" }}>&#10004; </span>
                      </button>
                      <button
                        onClick={() => markOption(bookings.booking_id, "wrong")}
                      >
                        <span style={{ color: "red" }}>&#10006; </span>
                      </button>
                    </>
                  )}
                  {/* Add a reset button here */}
                  <button onClick={() => resetOption(bookings.booking_id)}>
                    <FontAwesomeIcon icon={faUndo} /> {/* Reset icon */}
                  </button>
                </td>
                <td>
                  {uploadStatus[bookings.booking_id] === "success" && (
                    <p>Report uploaded successfully. </p>
                  )}
                  {uploadStatus[bookings.booking_id] === "failure" && (
                    <p>Failed to upload report</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
