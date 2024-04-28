import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Router,
  useLocation,
} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import WelcomeComponent from "./WelcomeComponent";
import Signin from "./Signin";
import InvalidCred from "./Invalidcred";
import HeaderComponent from "./HeaderComponent";
import Signup from "./Signup";
import BookingComponent from "./Booking";
import BookingSuccess from "./BookingSuccess";
import SignupSuccess from "./SignupSuccess";
import DoctorComponent from "./Doctor";
import AuthProvider, { useAuth } from "./Securirty/AuthContext";
import SignoutComponent from "./SignoutComponent";
import { useEffect } from "react";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  console.log(authContext);

  if (!authContext.isAuthenticated) return <Navigate to="/" />;
  if (authContext.doctor) return <Navigate to="/DoctorComponent/:user_id" />;
  else {
    <Navigate to="/welcome/:user_id" />;
  }

  return children;
}

export default function Loogin() {
  const location = useLocation();

  //Store the last visited route in local storage
  useEffect(() => {
    localStorage.setItem("lastVisitedRoute", location.pathname);
  }, [localStorage]);
  return (
    <div>
      <AuthProvider>
        {/* <BrowserRouter>
        <Router> */}
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/Signin" element={<Signin />} />
          <Route
            path="/welcome/:user_id"
            element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/loginfailed"
            element={
              <AuthenticatedRoute>
                <InvalidCred />
              </AuthenticatedRoute>
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/signout"
            element={
              <AuthenticatedRoute>
                <SignoutComponent />
              </AuthenticatedRoute>
            }
          />
          <Route path="/booking" element={<BookingComponent />} />
          <Route path="/bookingsuccess" element={<BookingSuccess />} />
          <Route path="/signupsuccess" element={<SignupSuccess />} />
          <Route
            path="/DoctorComponent/:user_id"
            element={<DoctorComponent />}
          />
        </Routes>
        {/* </Router>
        </BrowserRouter> */}
      </AuthProvider>
    </div>
  );
}
