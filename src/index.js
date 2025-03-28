import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import {HashRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from './Context/ConfigContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider>

  
     <BrowserRouter basename="/MetaSpeed"> 
  {/* <BrowserRouter>   */}
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </BrowserRouter>
  </ConfigProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
