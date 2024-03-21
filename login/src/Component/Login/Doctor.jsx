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

import { useEffect, useRef, useState } from "react";
import { useAuth } from "./Securirty/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import BookingComponent from "./Booking";


export default function DoctorComponent() {
  const authContext = useAuth();
  const { user_id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
 const [uploadParams, setUploadParams] = useState({});
  const [uploadStatusMap, setUploadStatusMap] = useState({});
   const [error, setError] = useState(null);
   const [selectedOption, setSelectedOption] = useState({});
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

//   // Define a function to manually set the option to "right"
// const setOptionRight = (booking_id) => {
//   // Update the option to "right" for the corresponding booking
//   // This is just a placeholder, you need to implement the actual logic to update the option in your backend
//   console.log(`Manually setting option to "right" for booking ID ${booking_id}`);
// };

// // Define a function to manually set the option to "wrong"
// const setOptionWrong = (booking_id) => {
//   // Update the option to "wrong" for the corresponding booking
//   // This is just a placeholder, you need to implement the actual logic to update the option in your backend
//   console.log(`Manually setting option to "wrong" for booking ID ${booking_id}`);
// };

 // Function to mark the option as right
  const markOption = (bookingId, option) => {
    // Update the selected option for the booking
    setSelectedOption((prevOptions) => {
      const updatedOptions = { ...prevOptions, [bookingId]: option };
      // Store the selected option in local storage
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

        //sort filtered bookings by time in dscending order
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
  

  //Function to upload file to Dropbox and get shared link
  // async function uploadFileToDropbox(){
  //   try{
  //     const dbx = new Dropbox({
  //       accessToken: ""
  //     });
  //     const response = await dbx.filesUpload({})
  //     const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({path});
  //     const sharedLink = sharedLinkResponse.result;
  //     savePdfLinkToDatabase(sharedLink);
  //   }catch (error){
  //     console.error("Error uploading file to Dropbox:", error);
  //   }
  // }

  // async function savePdfLinkToDatabase(link) {
  //   try {
  //     const response = await fetch("/savePdfLink", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ link })
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setPdfLink(data.link);
  //     } else {
  //       console.error("Failed to save PDF link:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error saving PDF link to the database:", error);
  //   }
  // }

  //Function to handle report submission
//    async function handleReportSubmission(booking_id, patient_name, booking_date) {
//   try {
//     // Programmatically trigger file input click
//     fileInputRef.current.click();
//     setUploadStatus(null); // Reset upload status
//     setUploadParams({ booking_id, patient_name, booking_date }); // Store parameters for file upload
//   } catch (error) {
//     console.error("Error handling report submission:", error);
//   }
// }

// async function handleFileUpload(e) {
//   const { booking_id, patient_name, booking_date } = uploadParams;
//   if (!booking_id || !patient_name || !booking_date) {
//     console.error("Booking details not available for file upload");
//     return;
//   }

//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("report_id", booking_id);
//   formData.append("patient_report_name", patient_name);
//   formData.append("doctor_report_id", authContext.user.doctor_id);
//   formData.append("booking_date", booking_date);
//   formData.append("pdf", file);

//   try {console.log(formData);
//     const response = await fetch("http://localhost:8080/uploadReport", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       setUploadStatus("success");
//     } else {
//       setUploadStatus("failure");
//       console.error("Failed to upload report");
//     }
//   } catch (error) {
//     console.error("Error uploading report:", error);
//     setUploadStatus("failure");
//   }
// }

// async function handleReportSubmission(booking_id, patient_name, booking_date) {
//     try {
//       fileInputRef.current.click();
//       setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: null }));
//       setUploadParams({ booking_id, patient_name, booking_date });
//     } catch (error) {
//       console.error("Error handling report submission:", error);
//     }
//   }

//   async function handleFileUpload(e) {
//     const { booking_id, patient_name, booking_date } = uploadParams;
//     if (!booking_id || !patient_name || !booking_date) {
//       console.error("Booking details not available for file upload");
//       return;
//     }

//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("booking_report_id", booking_id);
//     formData.append("patient_report_name", patient_name);
//     formData.append("doctor_report_id", authContext.user.doctor_id);
//     formData.append("booking_date", booking_date);
//     formData.append("pdf", file);

//     try {
//       const response = await fetch("http://localhost:8080/uploadReport", {
//         method: "POST",
//         body: formData,
//       });

//       const responseData = await response.json(); // Parse response data as JSON
//       console.log(responseData);
//       if (response.ok) {
//         setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: "success" }));
//         setUploadStatusMap(responseData);
//       } else {
//         setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: "failure" }));
//         console.error("Failed to upload report");
//       }
//     } catch (error) {
//       console.error("Error uploading report:", error);
//       setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: "failure" }));
//     }
//   }

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

async function handleReportSubmission(booking_id, patient_name, booking_date) {
    try {
      fileInputRef.current.click();
      setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: null }));
      setUploadParams({ booking_id, patient_name, booking_date });
    } catch (error) {
      console.error("Error handling report submission:", error);
    }
}

async function handleFileUpload(e) {
    const { booking_id, patient_name, booking_date } = uploadParams;
    if (!booking_id || !patient_name || !booking_date) {
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
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:8080/uploadReport", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json(); // Parse response data as JSON
      console.log(responseData);
      if (response.ok) {
        setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: "success" }));
        setUploadStatusMap(prevMap => ({ ...prevMap, [booking_id]: responseData.report_id }));
         saveReportIdToLocalStorage(booking_id, responseData.report_id); // Save report ID in local storage
      } else {
        setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: "failure" }));
        console.error("Failed to upload report");
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      setUploadStatus(prevStatus => ({ ...prevStatus, [booking_id]: "failure" }));
    }
}


  // async function handleDownloadPDF(bookingId) {
  //   try {
  //     const response = await fetch(`http://localhost:8080/downloadReport?booking_report_id=${bookingId}`, {
  //       method: 'GET',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to download PDF');
  //     }

  //     // Create a Blob from the PDF response
  //     const blob = await response.blob();

  //     // Create a temporary URL for the Blob object
  //     const url = window.URL.createObjectURL(blob);

  //     // Create a temporary link element
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `report_${bookingId}.pdf`);
      
  //     // Append the link to the document body and programmatically click it
  //     document.body.appendChild(link);
  //     link.click();

  //     // Remove the temporary link
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //   }
  // }

  const handleDownloadPDF = async (report_id) => {
    try {console.log(report_id);
      // Make a GET request to the API endpoint
      const response = await axios.get(`http://localhost:8080/downloadReport`, {
        params: {
           report_id// Replace with actual report ID
        },
        responseType: 'blob' // Receive response as binary data
      });

      // Create a Blob object from the binary data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      setError('Failed to download report');
      console.error('Error downloading report:', error);
    }
  };

  // const APP_KEY = "rpbatmbf1lx0l0m";

   function handleSignout(){
    navigate("/signout")
   }

   //upload Report


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
              <th>Report ID</th>
              <th>Actions</th>
              <th>Upload Status</th>
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
                        booking.booking_date
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
                  

                   <button onClick={() => {
  const report_id = getReportIdFromLocalStorage(booking.booking_id);
  handleDownloadPDF(report_id);
}}>Download PDF</button>

                </td>
                <td>
                  {uploadStatus[booking.booking_id] === "success" && (
                    <p>Report uploaded successfully. </p>
                  )}
                  {uploadStatus[booking.booking_id] === "failure" && (
                    <p>Failed to upload report</p>
                  )}</td>
                    <td>
                  {selectedOption[booking.booking_id] ? (
                    selectedOption[booking.booking_id] === "right" ? (
                      <span style={{ color: "green" }}>&#10004;</span>
                    ) : (
                      <span style={{ color: "red" }}>&#10006;</span>
                    )
                  ) : (
                    <>
                      <button onClick={() => markOption(booking.booking_id, 'right')}> <span style={{ color: "green" }}>&#10004; </span></button>
                      <button onClick={() => markOption(booking.booking_id, 'wrong')}> <span style={{ color: "red" }}>&#10006; </span></button>
                    </>
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
                  <button onClick={() => {
  const report_id = getReportIdFromLocalStorage(bookings.booking_id);
  handleDownloadPDF(report_id);
}}>Download PDF</button>
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