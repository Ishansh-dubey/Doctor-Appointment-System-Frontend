// import { createContext, useContext, useState } from "react";


// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext)



// export default function AuthProvider({children}) {

//     const [isAuthenticated, setAuthenticated] = useState(false)
//     const [user, setUser] = useState(null);
//     const [doctor, setDoctor] = useState(false)


//     const login = async (user_id, password) => {
//          try {
//       const response = await fetch("http://localhost:8080/signinuser", {
//         method: "POST", //POST method
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_id, password }),
//       });
      
//        if (response.ok) {
//         const jsonData = await response.json();
//         setAuthenticated(true);
//         // Check if the user has the role of a doctor
//         if (jsonData.role === "Doctor") {
//           setDoctor(true);
//         }
//         setUser(jsonData.user); // Set user if available from response
//         return true;
//       } else {
//         console.error("Login failed:", response.statusText);
//         return false;
//       }
//     } catch (error) {
//       console.error("Error during sign-in", error);
//       return false;
//     }
//   };
// //  const login = async (user_id, password) => {
// //     try {
// //       const response = await fetch("http://localhost:8080/signinuser", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ user_id, password }),
// //       });
// //        const jsonData = await response.json();
// //        const role = jsonData;
    
// //     if (response.ok) {
      
// //       // Check if jsonData contains a user object

// //       if (jsonData.user) {console.log(jsonData);
// //         // Check the role of the user
// //         if (role === "Doctor") {
// //           setDoctor(true);
// //         }
// //         setUser(jsonData.user);
// //         setAuthenticated(true);
// //         return true;
// //       } else {
// //         console.error("Login failed:", jsonData.message);
// //         return false;
// //       }
// //     } else {
// //       console.error("Login failed:", jsonData.message);
// //       return false;
// //     }
// //   } catch (error) {
// //     console.error("Error during sign-in", error);
// //     return false;
// //   }
// // };
//   return(
//     <AuthContext.Provider value = { {isAuthenticated,login,user,doctor}}>
//         {children}
//     </AuthContext.Provider>
//   )
//     }


import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(false);
  

  async function login(user_id, password) {
    try {
      const response = await fetch("http://localhost:8080/signinuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, password }),
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setAuthenticated(true);
        setUser(jsonData.user);
        console.log(jsonData.user);
        
        
        setDoctor(jsonData.user.role === "Doctor");
        console.log(jsonData.user.role);
        console.log(jsonData.user.doctor_id);
        return true;
      } else {
        console.error("Login failed:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error during sign-in", error);
      return false;
    }
  }function signOut(){
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, doctor ,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}
