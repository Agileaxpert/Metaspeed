import React, { useState, useEffect } from "react";
// import { Preloader,ScrollToTop, Offcanvas, SearchModal,BrandArea, ReviewArea, FeaturesArea, Integrationarea, Choosearea, Performance, Rating,Register } from "./Sample";
import { EighthSection, FifthSection, FirstSection,FourthSection,SecondSection, SeventhSection, SixthSection, ThirdSection } from "./Homepagecomponents";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Home = ({ openModal }) => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Only run the animation logic if the user is scrolling down
    if (currentScrollY > lastScrollY) {
      const elements = document.querySelectorAll('.has_fade_anim');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add('visible');
        }
      });
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to check visibility immediately
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  

  // const [isModalOpen, setModalOpen] = useState(false);
  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

  // useEffect(() => {
  //   // Create script element
  //   const script = document.createElement("script");
  //   script.src = "http://192.168.2.11/MetaSpeed/assets/js/backToTop.js";
  //   script.async = true;
  //   script.onload = () => {
  //     console.log("backToTop.js script loaded");
  //   };

  //   // Append to body
  //   document.body.appendChild(script);

  //   // Cleanup function to remove script when component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ show: false, type: "", message: "" });
      }, 3000); // Alert will disappear after 3 seconds
  
      return () => clearTimeout(timer); // Cleanup timer on component unmount or alert change
    }
  }, [alertInfo]);
  
  return (
    <div className="font-heading-colasta-bold">
          {/* <ScrollToTop /> */}
          {/* <Offcanvas />
          <SearchModal /> */}
          <div className="has-smooth" id="has_smooth"></div>
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <div className="body-wrapper body-booking">
                <div className="overlay-switcher-close"></div>
                <main>
                  {/* <FirstSection  openModal={openModal} />
                  {isModalOpen && <Register closeModal={closeModal} />}
                  <BrandArea />
                  <ReviewArea />
                  <FeaturesArea />
                  <Integrationarea />
                  <Choosearea />
                  {/* <Performance  openModal={openModal} /> 
                  {isModalOpen && <Register closeModal={closeModal} />}
                  <Rating /> */}
                  <FirstSection openModal={openModal}/>
                  <SecondSection/>
                  <ThirdSection/>
                  <FourthSection/>
                  <FifthSection/>
                  {/* <SixthSection/> */}
                  <SeventhSection/>
                  <EighthSection setAlertInfo={setAlertInfo} />
                  {alertInfo.show && (
              <Stack
              
              spacing={2}
              className="alert-box"
              >
                <Alert variant="filled" severity={alertInfo.type}>{alertInfo.message}</Alert>
              </Stack>
            )}
                </main>
              </div>
            </div>
          </div>
       
   
    </div>
  );
};

export default Home;
