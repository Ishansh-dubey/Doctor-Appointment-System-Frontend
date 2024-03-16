// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   Router,
// } from "react-router-dom";
// import WelcomeComponent from "./WelcomeComponent";
// import Signin from "./Signin";
// import InvalidCred from "./Invalidcred";
// import HeaderComponent from "./Header";
// import Signup from "./Signup";
// import BookingComponent from "./Booking";
// import BookingSuccess from "./BookingSuccess";
// import SignupSuccess from "./SignupSuccess";
// import DoctorComponent from "./Doctor";
// import AuthProvider, { useAuth } from "./Securirty/AuthContext";

// function AuthenticatedRoute({ children }) {
//   const authContext = useAuth();

//   if (authContext.isAuthenticated) return children;
//   return <Navigate to="/" />;
// }

// export default function Loogin() {
//   return (
//     <div>
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Signin />} />
//             <Route
//               path="/welcome/:user_id"
//               element={
//                 <AuthenticatedRoute>
//                   <WelcomeComponent />
//                 </AuthenticatedRoute>
//               }
//             />
//             <Route
//               path="/loginfailed"
//               element={
//                 <AuthenticatedRoute>
//                   <InvalidCred />
//                 </AuthenticatedRoute>
//               }
//             />
//             <Route
//               path="/Signup"
//               element={
//                 <AuthenticatedRoute>
//                   <Signup />
//                 </AuthenticatedRoute>
//               }
//             />
//             <Route path="/booking" element={<BookingComponent />} />
//             <Route path="/bookingsuccess" element={<BookingSuccess />} />
//             <Route path="/signupsuccess" element={<SignupSuccess />} />
//             <Route
//               path="/DoctorComponent/:user_id"
//               element={
//                 <AuthenticatedRoute>
//                   <DoctorComponent />
//                 </AuthenticatedRoute>
//               }
//             />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </div>
//   );
// }

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Router,
} from "react-router-dom";
import WelcomeComponent from "./WelcomeComponent";
import Signin from "./Signin";
import InvalidCred from "./Invalidcred";
import HeaderComponent from "./Header";
import Signup from "./Signup";
import BookingComponent from "./Booking";
import BookingSuccess from "./BookingSuccess";
import SignupSuccess from "./SignupSuccess";
import DoctorComponent from "./Doctor";
import AuthProvider, { useAuth } from "./Securirty/AuthContext";
import SignoutComponent from "./SignoutComponent";


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
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
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
            <Route
              path="/Signup"
              element={
                
                  <Signup />
                
              }
            />
            <Route path="/signout" element={
              <AuthenticatedRoute>
                <SignoutComponent/>
              </AuthenticatedRoute>
            }/>
            <Route path="/booking" element={<BookingComponent />} />
            <Route path="/bookingsuccess" element={<BookingSuccess />} />
            <Route path="/signupsuccess" element={<SignupSuccess />} />
            <Route
              path="/DoctorComponent/:user_id"
              element={<DoctorComponent />}
            />
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
