import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Home.css";
import img from "./img/doctor-image.jpg";

export default function HomeComponent() {
  return (
    <div className="home-container">
      {/* Banner section with welcome message */}
      <div className="banner">
        <h1>Welcome to Our DAS</h1>
        <p>
          Book appointments effortlessly and access cutting-edge healthcare
          services!
        </p>
      </div>

      {/* About section with information about the platform */}
      <div className="about-section">
        <h2>About Our Healthcare Platform</h2>
        <p>
          Our platform is designed to connect patients with top-tier healthcare
          providers, ensuring convenient access to medical care from the comfort
          of your home or office.
        </p>
        <p>
          Whether you're seeking routine check-ups, specialized treatments, or
          expert medical advice, our platform streamlines the appointment
          scheduling process, making healthcare more accessible and convenient
          for everyone.
        </p>
        <p>
          The “Doctor Appointment System” has been developed to solve the
          problems prevailing in the practicing manual system. This software
          helps to reduce the manual system burden. This system carries out
          operations in a smooth and effective manner. No formal knowledge is
          needed for the user to use this system.
        </p>
      </div>

      {/* Doctor section with an image and information about medical technologies */}
      <div className="doctor-section">
        <h2>Explore Modern Medical Innovations</h2>
        <div className="doctor-card">
          {/* Display doctor image */}
          <img src={img} alt="Doctor" />
          <div className="doctor-info">
            <h3>Discover New Medical Technologies</h3>
            <p>
              Stay informed about the latest advancements in healthcare
              technology, including:
            </p>
            <br />
            {/* List of medical innovations */}
            <ul>
              <li>
                Telemedicine: Access medical consultations and follow-ups
                remotely via video conferencing.
              </li>
              <br />
              <li>
                Artificial Intelligence: Harness the power of AI for accurate
                diagnostics and personalized treatment plans.
              </li>
              <br />
              <li>
                Remote Monitoring: Monitor vital signs and health metrics from
                the comfort of your home.
              </li>
              <br />
              <li>
                Robotics: Experience enhanced precision and faster recovery with
                robotic-assisted surgeries.
              </li>
              <br />
              <li>
                Healthcare Apps: Access healthcare resources and manage your
                wellness with user-friendly mobile applications.
              </li>
              <br />
            </ul>
          </div>
        </div>
        <p>
          Explore how these innovative technologies are revolutionizing the
          healthcare industry and improving patient outcomes.
          {/* Link to an external resource about medical technology */}
          <a
            href="https://www.fortec.uk/latest-news/emerging-technology/the-future-of-medical-technology-in-2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </p>
        <hr />
      </div>

      {/* Signup process section with step-by-step instructions */}
      <div className="signup-process">
        <h2>How to Signup</h2>
        {/* Step-by-step guide for signing up */}
        <div className="step">
          <h4>Step 1: Fill in Your Details</h4>
          <p>
            Start by entering your personal information such as name, email,
            username, date of birth, contact number, and address. Ensure that
            all fields marked with an asterisk (*) are filled out correctly.
          </p>
        </div>

        <div className="step">
          <h4>Step 2: Choose Your Role</h4>
          <p>
            Select whether you are signing up as a patient or a doctor. If you
            choose the doctor role, additional fields such as specification,
            doctor ID, hospital address, official contact, and official email
            will be displayed.
          </p>
        </div>

        <div className="step">
          <h4>Step 3: Set Your Password</h4>
          <p>
            Choose a secure password for your account. Make sure it's a
            combination of letters, numbers, and special characters for better
            security.
          </p>
        </div>

        <div className="step">
          <h4>Step 4: Submit Your Information</h4>
          <p>
            Once you have filled in all the required details and reviewed them
            for accuracy, click the "Sign up" button to submit your information.
          </p>
        </div>

        <div class="step">
          <h4>Step 5: Confirmation</h4>
          <p>
            After successfully submitting your information, you will receive a
            confirmation message indicating that your signup process is
            complete.
          </p>
        </div>
        <hr />
      </div>

      {/* Booking section with step-by-step instructions */}
      <div className="booking-section">
        <h2>How to Book an Appointment</h2>
        <ol>
          {/* Step-by-step guide for booking an appointment */}
          <li>Fill in the patient details in the form:</li>
          <br />
          <ul>
            <br />
            <li>Enter the patient's name.</li>
            <br />
            <br />
            <li>Select the patient's age from the dropdown menu.</li>
            <br />
            <br />
            <li>Provide the patient's contact number.</li>
            <br />
            <br />
            <li>
              Choose the desired booking date by clicking on the calendar icon
              and selecting a date.
            </li>
            <br />
            <br />
            <li>
              Specify the preferred booking time by clicking on the clock icon
              and choosing a time.
            </li>
            <br />
            <br />
            <li>Select the doctor from the dropdown list.</li>
            <br />
            <br />
            <li>
              Choose the booking type (Regular Checkup or Emergency) from the
              dropdown menu.
            </li>
            <br />
            <br />
            <li>
              Select the preferred payment mode by clicking on the radio button
              (Cash).
            </li>
            <br />
            <br />
          </ul>
          <li>
            After filling in all the required details, click on the "Book"
            button at the bottom of the form.
          </li>
          <br />
          <li>
            If the form submission is successful, you will see a confirmation
            message indicating that your appointment has been booked
            successfully.
          </li>
          <br />
          <li>
            If there are any errors in the form submission (e.g., missing fields
            or invalid data), error messages will be displayed below the
            corresponding fields. Please correct the errors and try again.
          </li>
          <br />
        </ol>
        <p>
          If you encounter any issues or have any questions, please contact our
          support team for assistance.
        </p>
        <hr />
      </div>

      {/* Caution section with information about viral diseases */}
      <div className="caution-section">
        <h2>Stay Informed About Viral Diseases</h2>
        <p>
          Amidst the ever-evolving landscape of infectious diseases, it's
          crucial to stay informed and take necessary precautions to safeguard
          your health and well-being.
        </p>
        <p>
          Our platform provides valuable resources and guidelines to help you:
        </p>
        {/* List of resources and guidelines */}
        <ul>
          <li>
            Stay updated on the latest developments regarding viral outbreaks
            and epidemics.
          </li>
          <br />
          <li>
            Learn about preventive measures to minimize the risk of viral
            transmission.
          </li>
          <br />
          <li>
            Access reliable information from trusted healthcare authorities and
            organizations.
          </li>
          <br />
          <li>
            Find healthcare providers offering vaccination services and
            preventive screenings.
          </li>
          <br />
        </ul>
        <br />
        <br />
        <p>
          Together, we can combat the spread of viral diseases and promote a
          healthier, safer community.
        </p>
      </div>
    </div>
  );
}
