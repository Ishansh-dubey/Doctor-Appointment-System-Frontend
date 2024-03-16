// export default function DoctorComponent() {
//   async function handleProfile() {
//     try {
//       const response = await fetch("");

//       if (!response.ok) {
//         throw new Error("network response not ok");
//       }

//       const data = await response.json();
//       console.log("Data:", data);
//       return data;
//     } catch (error) {
//       console.error("error in fetching data:", error);
//     }
//   }
//   return (
//     <div>
//       Welcome Dr. user_name
//       <div>
//         <button>Logout</button>
//       </div>
//       <div>
//         <button onClick={handleProfile}>Profile</button>
//       </div>
//       <div>
//         <button>Appointments</button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useAuth } from "./Securirty/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BookingComponent from "./Booking";

export default function DoctorComponent() {
  const authContext = useAuth();
  const { user_id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  const navigate = useNavigate();

  // useEffect ( () =>{
  //   fetchBookings();
  // },[]);

  // const fetchBookings = async() => {
  //   try {
  //     const response = await fetch ("http://localhost:8080/bookings");
  //     const responseData = await response.json();
  //     setBookings(responseData);
  //   } catch (error) {
  //     console.error("error in fetching")
  //   }
  // }

  // useEffect(() => {
  //   // Fetch past and new bookings
  //   async function fetchBookings() {
  //     try {

  //       if (!authContext.user || !authContext.user.doctor_id) {
  //         console.error("User data not available");
  //         return;
  //       }
  //       const pastResponse = await fetch(
  //         `http://localhost:8080/pastBookings/${authContext.user.doctor_id}`
          
  //       );console.log("errorror");
  //       const newResponse = await fetch(
  //         `http://localhost:8080/live/${authContext.user.doctor_id}`
  //       );

  //       const pastBookingsData = await pastResponse.json();
  //       const newBookingsData = await newResponse.json();

  //       console.log(pastBookingsData);
  //       console.log(newBookingsData);

  //       setBookings([...pastBookingsData, ...newBookingsData]);
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     }
  //   }

  //   fetchBookings();
  // }, [user_id, authContext.user]);

   useEffect(() => {
    // Fetch all bookings for the doctor
    async function fetchBookings()  {
      try {
        
        const response = await fetch(
          "http://localhost:8080/booking"
        );
        const bookingsData = await response.json();
        console.log(bookingsData);
       
        
        // //Getting current date and time
        // const currentDate = new Date();
        // const currentTime = currentDate.toLocaleTimeString('en-US', {hour12:false});

        // //Filter date for today and future date
        // const filterAppointments = doctorBooking.filter(doctorBooking => {
        //   const appointmentDate = new Date(doctorBooking.booking_date);
        //   const appointmentTime = doctorBooking.booking_time;

        //   console.log ("filterappoint:" ,filterAppointments);

        //   //compare Date 
        //   if(appointmentDate > currentDate) {
        //     return true;
        //   } else if(appointmentDate.toDateString() === currentDate.toDateString()){
        //     //date is today so comparing time
        //     return appointmentTime >= currentTime;
        //   }
        //   return false;
        // });
        // console.log (filterAppointments);

        //  // Sort appointments by date and time
        // filterAppointments.sort((a, b) => {
        //   const dateA = new Date(a.booking_date + " " + a.booking_time);
        //   const dateB = new Date(b.booking_date + " " + b.booking_time);
        //   return dateA - dateB;
        // });

        //Get todays date
        const today = new Date();
        today.setHours(0,0,0,0);

        //filter booking for todays and future dates
        const filteredBookings = bookingsData.filter(booking => { 
          const bookingDate = new Date(booking.booking_date);
          return bookingDate >= today;
        });console.log(filteredBookings);

        //sort filtered bookings by time in ascending order
        const liveBookings = filteredBookings.sort((a,b) => {
        const timeA = new Date(`${a.booking_date}T${a.booking_time}`);
        const timeB = new Date(`${b.booking_date}T${b.booking_time}`);
        return timeA - timeB;
      }); console.log(liveBookings);

       const doctorBooking = filteredBookings.filter(booking => booking.doctor_id === authContext.user.doctor_id);
        console.log(doctorBooking);

        setBookings(doctorBooking);

      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
    const interval = setInterval(fetchBookings,10000);

    return () => clearInterval(interval);
  }, [user_id, authContext.user]);

  
   useEffect(() => {
    // Fetch all bookings for the doctor
    async function fetchBookings()  {
      try {
        
        const response = await fetch(
          "http://localhost:8080/booking"
        );
        const pastBookingsData = await response.json();
        console.log(pastBookingsData);
        //Get todays date
        const today = new Date();
        today.setHours(0,0,0,0);

        //filter booking for todays and future dates
        const filteredBookings = pastBookingsData.filter(booking => { 
          const bookingDate = new Date(booking.booking_date);
          return bookingDate < today;
        });console.log(filteredBookings);

        //sort filtered bookings by time in ascending order
        const pastBookings = filteredBookings.sort((a,b) => {
        const timeA = new Date(`${a.booking_date}T${a.booking_time}`);
        const timeB = new Date(`${b.booking_date}T${b.booking_time}`);
        return timeB - timeA;
      }); console.log(pastBookings);

       const doctorPastBooking = filteredBookings.filter(booking => booking.doctor_id === authContext.user.doctor_id);
        console.log(doctorPastBooking);

        setPastBookings(doctorPastBooking);

      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
    const interval = setInterval(fetchBookings,90000);

    return () => clearInterval(interval);
  }, [user_id, authContext.user]);
  

  // Function to handle report submission
  async function handleReportSubmission(patientId, reportData) {
    try {
      const response = await fetch(`/uploadReport/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error("Failed to upload report");
      }

      // Update UI or show success message
    } catch (error) {
      console.error("Error uploading report:", error);
    }
  }

   function handleSignout(){
    navigate("/signout")
   }

  // Redirect to home if user is not authenticated or is not a doctor
  if (!authContext.isAuthenticated || !authContext.doctor) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navbar-left">Doctor {authContext.user.name}</div>
          <div className="navbar-right">
            
          </div>
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
        <h1>List of live Appointments</h1>
      </div>
        <table>
          <thead>
            <tr>
            <th>Appointment ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.booking_time}</td>
                <td>{booking.patient_name}</td>
                <td>

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pastBookings.map((bookings) => (
              <tr key={bookings.booking_id}>
              <td>{bookings.booking_id}</td>
                <td>{bookings.booking_date}</td>
                <td>{bookings.booking_time}</td>
                <td>{bookings.patient_name}</td>
                <td>
                  <button >
                      Upload Report
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="signout" onClick={handleSignout}>Signout</button>
    </div>
  );
}