import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Booking from "./Booking.css"
import DoctorComponent from "./Doctor";

export default function BookingComponent({onBookingMade}) {
  const [formData, setFormData] = useState({
    // user_id: "",
    doctor_id: "",
    patient_name: "",
    age: 0,
    contact: 0,
    booking_date: "",
    booking_time: "",
    booking_type: "",
    payment_mode: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [bookingRefresh, setBookingRefresh] = useState(false);
  const [bookedTimeslots, setBookedTimeslots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorList();
  }, []);

  const fetchDoctorList = async () => {
    try {
      const response = await fetch("http://localhost:8080/doctorlist");
      const data = await response.json();
      console.log(data);
      console.log("data success");

      
      setDoctorList(data);
    } catch (error) {
      console.error("Error fetching doctor list: ", error);
    }
  };

  //Funtion to get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    const selectedDate = new Date(formData.booking_date);

    //Check if selected date is of today or in future
    if(
      selectedDate.toDateString() === now.toDateString() 
    ){
    const totalMinutes = now.getHours()*60 + now.getMinutes();
    const minutes = (totalMinutes%(24*60)) %60;
    const hours = Math.floor(totalMinutes/60)%24;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  } else{
    //If selected date is in the future, return empty String it will not disable the time
    return"";
  }
};
//hi
//welcome

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchBookedTimeslotsForToday();
  //   });
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if(formData.booking_date) {
  //     fetchBookedTimeslotsForDate(formData.booking_date);
  //   }
  // },[formData.booking_date]);

  // const fetchBookedTimeslotsForToday = async () => {
  //   const today = new Date().toISOString().split("T")[0];
  //   fetchBookedTimeslotsForDate(today);
  // };

  // const fetchBookedTimeslotsForDate = async () => {
  //   try{
  //     const response = await fetch("http://localhost:8080/booking");
  //     const bData = await response.json();
  //     console.log(bData);
      
  //   }catch(error){
  //     console.error("Error fetching booked timeslots: ", error);
  //   }
  // }

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // // Validate user_id
    // if (!formData.user_id.trim()) {
    //   errors.user_id = "Username is required";
    //   valid = false;
    // }

    // Validate name
    if (!formData.patient_name.trim()) {
      errors.patient_name = "Name is required";
      valid = false;
    }

    // Validate age
    if (!formData.age.trim()) {
      errors.age = "Age is required";
      valid = false;
    }

    // Validate contact
    if (!formData.contact) {
      errors.contact = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact number is invalid";
      valid = false;
    }

    //Validate date
    if (!formData.booking_date.trim()) {
      errors.booking_date = "Date is required";
      valid = false;
    }

    //Validate time
    if (!formData.booking_time.trim()) {
      errors.booking_time = "Time is required";
      valid = false;
    }

    //Validate doctor
    if (!formData.doctor_id.trim()) {
      errors.doctor_id = "Doctor is required";
      valid = false;
    }

    //Validate time
    if (!formData.booking_type.trim()) {
      errors.booking_type = "Booking type is required";
      valid = false;
    }

    //Validate payment
    if (!formData.payment_mode.trim()) {
      errors.payment_mode = "Payment mode is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {

         


        

        const response = await fetch("http://localhost:8080/Patientbooking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          setResponseMessage(data.response);
          navigate("/bookingsuccess", { state: { responseMessage: data } });
        } else {
          throw new Error(data.response);
          // console.log(data);
          // // navigate("/success");
          // setResponseMessage(data.response);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Booking Failed: " + error.response);
      }
    }
  };

  return (
    <div className="book">
      <form onSubmit={handleSubmit}>
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

        <div className="fAge">
          <label>Age</label>
          <select
            id="numberSelect"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          >
            <option value="">Select</option>
            {[...Array(201)].map(
              (
                _,
                index // Generating options from 0 to 9
              ) => (
                <option key={index} value={index}>
                  {index}
                </option>
              )
            )}
          </select>
          {formData.age && <p>Selected Age: {formData.age}</p>}
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

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

        <div className="fBookingDate">
          <label>Booking Date</label>
          <input
            type="date"
            value={formData.booking_date}
            min={new Date().toISOString().split("T")[0]} // Disable Past Dates
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

        <div className="fBookingTime">
          <label>Booking Time</label>
          <input
            type="time"
            value={formData.booking_time}
            min={getCurrentTime()}
            onChange={(e) =>
              setFormData({
                ...formData,
                booking_time: e.target.value,
              })
            }
      //  disabled={bookedTimeslots.some(
//     (booking) =>
//       booking.booking_time === formData.booking_time
// )}

          />
          {errors.booking_time && (
            <div className="error">{errors.booking_time}</div>
          )}
        </div>

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
          
          {errors.doctor_id && <div className="errors">{errors.doctor_id}</div>}
        </div>

        <div className="fBookingType">
          <label>Booking Type: </label>
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

        <div>
          <button type="submit">Book</button>
        </div>
        </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
