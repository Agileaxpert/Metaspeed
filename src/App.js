import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
//import Home from "./Pages/Home";
import { Footer, Header, Offcanvas, Preloader, Register,ScrollToTop } from "./Pages/Mainlayout";
import Pricing from "./Pages/Pricing/Pricing";
import Home from "./Pages/Home/Home";
import Erp from "./Pages/ERP/Erp";
import Partner from "./Pages/Partner/Partner";
import { CountryProvider } from "./Context/Countrycontext";


function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
 

  return (
    <div className="App">
      <CountryProvider>
       <Offcanvas openModal={openModal}/>
      
      <Preloader />
      <Header  />
     
      <Routes>
        <Route path="/" element={<><ScrollToTop /><Home openModal={openModal}/></>} />
        <Route path="/pricing" element={<><ScrollToTop /><Pricing /></>} />
        <Route path="/erp" element={<><ScrollToTop /><Erp openModal={openModal}/></>} />
        <Route path="/partner" element={<><ScrollToTop /><Partner openModal={openModal}/></>} />
      </Routes>
      
      {isModalOpen && <Register closeModal={closeModal} />}
      <Footer/>
      </CountryProvider>
    </div>
  );
}

export default App;
