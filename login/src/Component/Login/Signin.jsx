// import { useState } from "react";
// import axios from "axios";
// import { json, useNavigate } from "react-router-dom";
// import WelcomeComponent from "./WelcomeComponent";
// import loogin from "./loogin";
// import sign from "./sign.css";
// import { useAuth } from "./Securirty/AuthContext";

// export default function Signin() {
//   const [user_id, setUser_id] = useState("");
//   const [password, setPassword] = useState("");

//   const [message, setMessage] = useState(null);
//   const [responseMessage, setResponseMessage] = useState("");

//   const navigate = useNavigate();

//   const authContext = useAuth();

//   function handleLogin() {
//     if (authContext.login(user_id, password)) {
//       if (authContext.doctor) {
//         console.log("navigate");
//         navigate(`/DoctorComponent/${user_id}`);
//       } else {
//         navigate(`/welcome/${user_id}`);
//         console.log("navigate pateiny");
//       }
//     }
//   }

//   // function handleLogin() {
//   //   navigate("/welcome");
//   //   console.log("Username:", username);
//   //   console.log("Password", password);
//   //   axios
//   //     .get("http://localhost:8080/hello-body", {
//   //     })
//   //     .then((response) => successfulResponse(response))
//   //     .catch((error) => errorResponse(error))
//   //     .finally(() => console.log("cleanup"));
//   //   function successfulResponse(response) {
//   //     console.log("response");
//   //     setMessage(response.data);
//   //   }

//   //   function errorResponse(error) {
//   //     console.log(error);
//   //   }
//   // }

//   // const handleLogin = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:8080/signinuser", {
//   //       method: "POST", //POST method
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ user_id, password }),
//   //     });
//   //     // navigate("/welcome");
//   //     const jsonData = await response.json();
//   //     console.log(jsonData);
//   //     setResponseMessage(jsonData.response);
//   //     navigate(`/welcome/${user_id}`);
//   //     //setResponseMessage("SUCCESS");
//   //     // navigate("/Signup");
//   //   } catch (error) {
//   //     console.error("Error during sign-in", error);
//   //     setResponseMessage("An error occured during sign-in");
//   //     // navigate("/welcome");
//   //   }
//   // };
//   return (
//     <div className="LoginForm">
//       <div className="SUsername">
//         <h2>Login</h2>
//         <label>Username</label>
//         <input
//           type="text"
//           value={user_id}
//           onChange={(e) => setUser_id(e.target.value)}
//         />
//       </div>
//       <div className="SPassword">
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <div>
//         <button onClick={handleLogin}>Sign in</button>
//       </div>
//       <p>{responseMessage}</p>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Securirty/AuthContext";

export default function Signin() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useAuth();

  async function handleLogin() {
    // const success = await authContext.login(user_id, password);
    if (await authContext.login(user_id, password)) {
      console.log("User is doctor:", authContext);
      // if (success) {
      if (authContext.doctor) {
        console.log("navigate doc");
        navigate(`/DoctorComponent/${user_id}`);
      } else {
        console.log("navigate pat");
        console.log(authContext.doctor);
        navigate(`/welcome/${user_id}`);
      }
    }
  }

  function handleSignup(){
    navigate("/Signup")
  }

  return (
    <div className="LoginForm">
      <div className="SUsername">
        <h2>Login</h2>
        <label>Username</label>
        <input
          type="text"
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
        />
      </div>
      <div className="SPassword">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Sign in</button>
      </div>
      <div>
        <button  onClick={handleSignup}>Sign up </button>
      </div>
    </div>
  );
}
