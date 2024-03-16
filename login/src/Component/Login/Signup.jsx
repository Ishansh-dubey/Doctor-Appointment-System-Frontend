import { useState } from "react";
import signup from "./signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    date_of_birth: "",
    address: "",
    contact: 0,
    other_contact: 0,
    role: "",
    email_id: "",
    password: "",
    specification: "",
    doctor_id: "",
    hospital_address: "",
    official_contact: "",
    official_email_id: "",
  });
  const [errors, setErrors] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    // Validate email
    if (!formData.email_id.trim()) {
      errors.email_id = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email_id)) {
      errors.email_id = "Email is invalid";
      valid = false;
    }

    // Validate user_id
    if (!formData.user_id.trim()) {
      errors.user_id = "Username is required";
      valid = false;
    }

    // Validate dob
    if (!formData.date_of_birth.trim()) {
      errors.date_of_birth = "Date of Birth is required";
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

    // Validate contact
    if (!formData.other_contact) {
      errors.other_contact = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.other_contact)) {
      errors.other_contact = "Contact number is invalid";
      valid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid = false;
    }

    // Validate role
    if (!formData.role.trim()) {
      errors.role = "Role is required";
      valid = false;
    }

    // Additional validation for doctor role
    if (formData.role === "Doctor") {
      if (!formData.specification.trim()) {
        errors.specification = "Specification is required";
        valid = false;
      }
      if (!formData.doctor_id.trim()) {
        errors.doctor_id = "Doctor Id is required";
        valid = false;
      }
      if (!formData.hospital_address.trim()) {
        errors.hospital_address = "Hospital address is required";
        valid = false;
      }
      if (!formData.official_contact.trim()) {
        errors.official_contact = "Official contact is required";
        valid = false;
      }
      if (!formData.official_email_id.trim()) {
        errors.official_email_id = "Official email ID is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.official_email_id)) {
        errors.official_email_id = "Official email ID is invalid";
        valid = false;
      }
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        console.log(formData);

        const response = await fetch("http://localhost:8080/signupdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const jsonData = await response.json();
        if (response.ok) {
          setResponseMessage(jsonData.response);
          navigate("/signupsuccess", { state: { responseMessage: jsonData } });
        } else {
          throw new Error("Failed to sign up");
        }
        // Reset form fields on successful signup
        setFormData({
          user_id: "",
          name: "",
          date_of_birth: "",
          address: "",
          contact: 0,
          other_contact: 0,
          role: "",
          email_id: "",
          password: "",
          specification: "",
          doctor_id: "",
          hospital_address: "",
          official_contact: "",
          official_email_id: "",
        });
        alert("User signed up successfully");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to sign up");
      }
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="fName">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="fEmail">
          <label>Email</label>
          <input
            type="email"
            value={formData.email_id}
            onChange={(e) =>
              setFormData({ ...formData, email_id: e.target.value })
            }
          />
          {errors.email_id && <div className="error">{errors.email_id}</div>}
        </div>

        <div className="fUserId">
          <label>Username</label>
          <input
            type="text"
            value={formData.user_id}
            onChange={(e) =>
              setFormData({ ...formData, user_id: e.target.value })
            }
          />
          {errors.user_id && <div className="error">{errors.user_id}</div>}
        </div>

        <div className="fDob">
          <label>Date of Birth</label>
          <input
            type="date"
            value={formData.date_of_birth}
            onChange={(e) =>
              setFormData({
                ...formData,
                date_of_birth: new Date(e.target.value)
                  .toISOString()
                  .split("T")[0],
              })
            }
          />
          {errors.date_of_birth && (
            <div className="error">{errors.date_of_birth}</div>
          )}
        </div>

        <div className="fContact">
          <label>contact</label>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
          {errors.contact && <div className="error">{errors.contact}</div>}
        </div>

        <div className="fOtherContact">
          <label>Other Contact</label>
          <input
            type="text"
            value={formData.other_contact}
            onChange={(e) =>
              setFormData({
                ...formData,
                other_contact: e.target.value,
              })
            }
          />
          {errors.other_contact && (
            <div className="error">{errors.other_contact}</div>
          )}
        </div>

        <div className="fAddress">
          <label>Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div className="fRole">
          <h4>Role</h4>
          <input
            type="radio"
            value="Doctor"
            checked={formData.role === "Doctor"}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <label>Doctor</label>
          {formData.role === "Doctor" && (
            <div>
              <div className="fSpecification">
                <label>Specification</label>
                <input
                  type="text"
                  value={formData.specification}
                  onChange={(e) =>
                    setFormData({ ...formData, specification: e.target.value })
                  }
                />
                {errors.specification && (
                  <div className="error">{errors.specification}</div>
                )}
              </div>

              <div className="fDoctor_id">
                <label>Doctor Id</label>
                <input
                  type="text"
                  value={formData.doctor_id}
                  onChange={(e) =>
                    setFormData({ ...formData, doctor_id: e.target.value })
                  }
                />
                {errors.doctor_id && (
                  <div className="error">{errors.doctor_id}</div>
                )}
              </div>

              <div className="fHospitalAddress">
                <label>Hospital Address</label>
                <input
                  type="text"
                  value={formData.hospital_address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hospital_address: e.target.value,
                    })
                  }
                />
                {errors.hospital_address && (
                  <div className="error">{errors.hospital_address}</div>
                )}
              </div>

              <div className="fOfficialContact">
                <label>Official Contact</label>
                <input
                  type="text"
                  value={formData.official_contact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      official_contact: e.target.value,
                    })
                  }
                />
                {errors.official_contact && (
                  <div className="error">{errors.official_contact}</div>
                )}
              </div>

              <div className="fOfficialEmail">
                <label>Official Email</label>
                <input
                  type="text"
                  value={formData.official_email_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      official_email_id: e.target.value,
                    })
                  }
                />
                {errors.official_email_id && (
                  <div className="error">{errors.official_email_id}</div>
                )}
              </div>
            </div>
          )}
          <input
            type="radio"
            value="Patient"
            checked={formData.role === "Patient"}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <label>Patient</label>
          {errors.role && <div className="error">{errors.role}</div>}
        </div>

        <div className="fPassword">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}
