import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import "./Doctor.jsx";
import { useAuth } from "./Securirty/AuthContext";

export default function BookingComponent({ onBookingMade }) {
  // State variables for form data, errors, response message, and more.
  const [formData, setFormData] = useState({
    // Initializing form data with default values
    doctor_id: "",
    patient_id: "",
    patient_name: "",
    age: 0,
    contact: 0,
    booking_date: "",
    booking_time: "",
    booking_type: "",
    payment_mode: "",
  });

  // Variables to handle response message, errors, doctor list, and other states.
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  // Navigation and authentication context.
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user ? user.user_id : "";

  // Fetch list of doctors when component mounts.
  useEffect(() => {
    fetchDoctorList();
  }, []);

  // Function to fetch the list of doctors from the server.
  const fetchDoctorList = async () => {
    try {
      const response = await fetch("http://localhost:8080/doctorlist");
      const data = await response.json();
      console.log(data); // Logging the data received from the server.
      console.log("Data fetched successfully");

      // Setting the doctor list state with the received data.
      setDoctorList(data);
    } catch (error) {
      console.error("Error fetching doctor list: ", error); // Logging any error occurred during the fetch.
    }
  };

  // Function to get the current time in HH:MM format.
  const getCurrentTime = () => {
    const now = new Date();
    const selectedDate = new Date(formData.booking_date);

    // Check if selected date is today or in the future.
    if (selectedDate.toDateString() === now.toDateString()) {
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const minutes = (totalMinutes % (24 * 60)) % 60;
      const hours = Math.floor(totalMinutes / 60) % 24;

      // Returning current time in HH:MM format.
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    } else {
      // If selected date is in the future, return empty string to not disable the time.
      return "";
    }
  };

  // Function to validate the form data before submission.
  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate patient's name.
    if (!formData.patient_name.trim()) {
      errors.patient_name = "Name is required";
      valid = false;
    }

    // Validate age.
    if (!formData.age.trim()) {
      errors.age = "Age is required";
      valid = false;
    }

    // Validate contact number.
    if (!formData.contact) {
      errors.contact = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact number is invalid";
      valid = false;
    }

    // Validate booking date.
    if (!formData.booking_date.trim()) {
      errors.booking_date = "Date is required";
      valid = false;
    }

    // Validate booking time.
    if (!formData.booking_time.trim()) {
      errors.booking_time = "Time is required";
      valid = false;
    }

    // Validate doctor's ID.
    if (!formData.doctor_id.trim()) {
      errors.doctor_id = "Doctor is required";
      valid = false;
    }

    // Validate booking type.
    if (!formData.booking_type.trim()) {
      errors.booking_type = "Booking type is required";
      valid = false;
    }

    // Validate payment mode.
    if (!formData.payment_mode.trim()) {
      errors.payment_mode = "Payment mode is required";
      valid = false;
    }

    // Set the errors state with any validation errors found.
    setErrors(errors);
    return valid; // Return whether the form data is valid.
  };

  // Function to handle the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way.

    // If the form data is valid, proceed with form submission.
    if (validateForm()) {
      try {
        // Make a POST request to the server with the form data.
        const response = await fetch("http://localhost:8080/Patientbooking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, patient_id: userId }), // Include user ID in the form data.
        });

        const data = await response.json();

        // If the response is successful, set the response message and navigate to the booking success page.
        if (response.ok) {
          setResponseMessage(data.response);
          navigate("/bookingsuccess", { state: { responseMessage: data } });
        } else {
          // If there is an error in the response, throw an error.
          throw new Error(data.response);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Booking Failed: " + error.response); // Display alert with the error message.
      }
    }
  };

  return (
    <div className="book">
      <form onSubmit={handleSubmit}>
        {/* Input for patient's name */}
        <div className="fPname">
          <label>Patient Name</label>
          <input
            type="text"
            value={formData.patient_name}
            onChange={(e) =>
              setFormData({ ...formData, patient_name: e.target.value })
            }
          />
          {errors.patient_name && (
            <div className="error">{errors.patient_name}</div>
          )}
        </div>

        {/* Input for patient's age */}
        <div className="fAge">
          <label>Age</label>
          <select
            id="numberSelect"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          >
            <option value="">Select</option>
            {[...Array(201)].map((_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
          {formData.age && <p>Selected Age: {formData.age}</p>}
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        {/* Input for contact number */}
        <div className="fContact">
          <label>Contact</label>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
          {errors.contact && <div className="error">{errors.contact}</div>}
        </div>

        {/* Input for booking date */}
        <div className="fBookingDate">
          <label>Booking Date</label>
          <input
            type="date"
            value={formData.booking_date}
            min={new Date().toISOString().split("T")[0]} // Disable past dates.
            onChange={(e) =>
              setFormData({
                ...formData,
                booking_date: new Date(e.target.value)
                  .toISOString()
                  .split("T")[0],
              })
            }
          />
          {errors.booking_date && (
            <div className="error">{errors.booking_date}</div>
          )}
        </div>

        {/* Input for booking time */}
        <div className="fBookingTime">
          <label>Booking Time</label>
          <input
            type="time"
            value={formData.booking_time}
            min={getCurrentTime()} // Set minimum time to current time if date is today.
            onChange={(e) =>
              setFormData({
                ...formData,
                booking_time: e.target.value,
              })
            }
          />
          {errors.booking_time && (
            <div className="error">{errors.booking_time}</div>
          )}
        </div>

        {/* Dropdown to select a doctor */}
        <div className="fDoctor">
          <label>Select a doctor</label>
          <select
            value={formData.doctor_id}
            onChange={(e) =>
              setFormData({ ...formData, doctor_id: e.target.value })
            }
            className="dropdown"
          >
            <option value=""></option>
            {doctorList.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.doctor_name}
              </option>
            ))}
          </select>
          {errors.doctor_id && <div className="error">{errors.doctor_id}</div>}
        </div>

        {/* Dropdown to select booking type */}
        <div className="fBookingType">
          <label>Booking Type:</label>
          <select
            value={formData.booking_type}
            onChange={(e) =>
              setFormData({ ...formData, booking_type: e.target.value })
            }
          >
            <option value="">Select Booking Type</option>
            <option value="Regular_checkup">Regular Checkup</option>
            <option value="Emergency">Emergency</option>
          </select>
          {formData.booking_type && (
            <p>Selected Type: {formData.booking_type}</p>
          )}
          {errors.booking_type && (
            <div className="error">{errors.booking_type}</div>
          )}
        </div>

        {/* Radio buttons for payment mode */}
        <div className="payment">
          <h4>Payment Mode</h4>
          <input
            type="radio"
            value="Cash"
            checked={formData.payment_mode === "Cash"}
            onChange={(e) =>
              setFormData({ ...formData, payment_mode: e.target.value })
            }
          />
          <label>Cash</label>
          {errors.payment_mode && (
            <div className="error">{errors.payment_mode}</div>
          )}
        </div>

        {/* Submit button */}
        <div>
          <button type="submit">Book</button>
        </div>
      </form>

      {/* Display response message */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
