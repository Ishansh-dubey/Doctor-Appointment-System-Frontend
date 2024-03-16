import { Link, useNavigate } from "react-router-dom"
export default function SignoutComponent(){
    const navigate = useNavigate;
    return(
        <div className="signoutComponent">
        <h1>You are logged out!</h1>
        

         <Link to={"/"}/>
           </div>  // navigate("/")
       
    )
}