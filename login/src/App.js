import logo from './logo.svg';
import './App.css';
import Loogin from './Component/Login/loogin';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import HeaderComponent from './HeaderComponent.jsx';
import HeaderComponent from './Component/Login/HeaderComponent';
import Signin from './Component/Login/Signin';

function App() {
  return (
    <BrowserRouter>
         <Loogin/>
          </BrowserRouter>
  )
}
// function App() {
//   return (
//     <Router>
//       <HeaderComponent />
      
//         <Route path="/" element={<Loogin />} />
      
//     </Router>
//   );
// }
   
export default App;
