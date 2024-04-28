import React from 'react';
import ReactDOM from 'react-dom/client';
// import  ReactDOM  from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    
      <App />
    
    
  </React.StrictMode>,
  
);
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App /> {/* Render your App component, which contains the Loogin component */}
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Update import statement
// import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// const domNode = document.getElementById('root');
// const root = createRoot(domNode);

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
  
// );

// reportWebVitals();


// import React from "react";
// import {StrictMode} from 'react';
// import ReactDOM from "react-dom/client";
// import {createRoot} from 'react-dom/client';
// import { BrowserRouter } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//   <BrowserRouter>
//     <Routes>
//         <Route path="/" element={ <App /> }>
//         </Route>
//       </Routes>
//   </BrowserRouter>
//   </React.StrictMode>,
 
// );