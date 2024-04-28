import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Securirty/AuthContext";
import "./sign.css";

export default function Signin() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useAuth();

  async function handleLogin() {
    if (await authContext.login(user_id, password)) {
      if (authContext.doctor) {
        navigate(`/DoctorComponent/${user_id}`);
      } else {
        navigate(`/welcome/${user_id}`);
      }
    } else {
      navigate("/loginfailed");
    }
  }

  function handleSignup() {
    navigate("/Signup");
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
        <button onClick={handleSignup}>Sign up </button>
      </div>
    </div>
  );
}
