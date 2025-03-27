import React, { useState, useEffect } from "react";
import { Preloader,ScrollToTop, Offcanvas, SearchModal, FirstSection, BrandArea, ReviewArea, FeaturesArea, Integrationarea, Choosearea, Performance, Rating,Register } from "./Sample";


const Home = () => {
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
  
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className="font-heading-colasta-bold">
       
          <ScrollToTop />
          <Offcanvas />
          <SearchModal />
          <div className="has-smooth" id="has_smooth"></div>
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <div className="body-wrapper body-booking">
                <div className="overlay-switcher-close"></div>
                <main>
                  <FirstSection  openModal={openModal} />
                  {isModalOpen && <Register closeModal={closeModal} />}
                  <BrandArea />
                  <ReviewArea />
                  <FeaturesArea />
                  <Integrationarea />
                  <Choosearea />
                  {/* <Performance  openModal={openModal} /> */}
                  {isModalOpen && <Register closeModal={closeModal} />}
                  <Rating />
                  
                </main>
              </div>
            </div>
          </div>
       
   
    </div>
  );
};

export default Home;
