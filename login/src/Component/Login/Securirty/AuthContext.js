//This AuthProvider component is responsible for managing and providing authentication context for its child components. It maintains the authentication state, current user details, and doctor status, and provides functions for user login and sign-out.

import { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that provides authentication context to its children
export default function AuthProvider({ children }) {
  // State to track whether the user is authenticated
  const [isAuthenticated, setAuthenticated] = useState(false);
  // State to hold the current user details
  const [user, setUser] = useState(null);
  // State to track whether the user is a doctor
  const [doctor, setDoctor] = useState(false);

  // useEffect hook to check for stored user data on component mount
  useEffect(() => {
    // Retrieve stored user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // Retrieve stored doctor status from local storage
    const storedDoctor = localStorage.getItem("doctor") === "true";

    // Log stored user and doctor information for debugging
    console.log(storedUser);
    console.log(storedDoctor);

    // If a stored user exists, set authentication state and user data
    if (storedUser) {
      setAuthenticated(true);
      setUser(storedUser);
      setDoctor(storedDoctor);
      console.log(storedUser);
      console.log(storedDoctor);
    }
  }, []);

  // Function to handle user login
  async function login(user_id, password) {
    try {
      // Send a POST request to the server for user authentication
      const response = await fetch("http://localhost:8080/signinuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, password }),
      });

      // If the response is successful, set authentication state and user data
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        // Set authentication state to true
        setAuthenticated(true);
        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(jsonData.user));
        setUser(jsonData.user);
        console.log(jsonData.user);

        // Determine whether the user is a doctor
        setDoctor(jsonData.user.role === "Doctor");
        console.log(jsonData.user.role);
        console.log(jsonData.user.doctor_id);
        // Store doctor status in local storage
        localStorage.setItem("doctor", jsonData.user.role === "Doctor");
        return true;
      } else {
        // If the response is not successful, log the error
        console.error("Login failed:", response.statusText);
        return false;
      }
    } catch (error) {
      // Log any errors during sign-in
      console.error("Error during sign-in", error);
      return false;
    }
  }

  // Function to handle user sign-out
  function signOut() {
    // Clear authentication state and user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("doctor");
    setAuthenticated(false);
    setUser(null);
    setDoctor(false);
  }

  // Provide authentication context to child components
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, user, doctor, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
