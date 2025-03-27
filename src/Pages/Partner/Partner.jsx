import React,{useState,useEffect}from 'react'
import "../Partner/Partner.css";


const Partner = ({ openModal }) => {
  
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
  return (
    <div>
      {/* partnerwuthus */}
      <section className="Partnerwithus10">
      <svg
        className="Partnerwithus10-shape"
        viewBox="0 0 436 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="45" cy="121" r="391" fill="#FFFAF1"></circle>
        <circle cx="44.6737" cy="121.327" r="332.578" fill="#FFF5E1"></circle>
        <circle cx="45.0002" cy="121" r="265.671" fill="#FFEFD1"></circle>
        <circle cx="44.6736" cy="121.326" r="213.777" fill="#FFE8BC"></circle>
      </svg>
      <div className="container">
        <div className="container position-relative">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12 text-center">
              <h2
                className="Partnerwithusheading10-heading mb-4 has_fade_anim"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
              >
                Partner with Metaspeed to Empower Your Business
              </h2>
              <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                  <p
                    className="Partnerwithusheading10-sub-heading px-5 has_fade_anim"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 0.8,
                    }}
                  >
                    As a Metaspeed partner, you gain access to advanced
                    infrastructure, seamless integrations, and scalable solutions
                    to enhance your offerings and deliver superior value.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="btn header24-btn fs-5 mt-2 has_fade_anim"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }} onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    openModal(); // Call the openModal function
                  }}
                >
                  Join, Let’s Grow Together
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* get started container */}
    <div className="get-started-container">
      <div className="get-started-card">
        <div className="card-content">
          <div className="left-section">
            <h4>Quick Start – Partner in 10 Minutes or Less!</h4>
            <p>Get started effortlessly with the right details to begin your journey with us.</p>
            <ul>
              <li>
                <i className="fa-solid fa-check-circle"></i> Business Growth &amp; Revenue Opportunities
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i> Exclusive Access to Product &amp; Training
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i> Technical &amp; Business Support
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i> Market Differentiation &amp; Competitive Advantage
              </li>
              <li>
                <i className="fa-solid fa-check-circle"></i> Flexible Partnership Models
              </li>
            </ul>
          </div>
          <div className="right-section">
            {/* Correct YouTube Embed Code */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/3sTomJhHXNw"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  {/* whywithus */}
  <section className="whywithus">
  <div>
    <div className="container">
      <div className="row justify-content-center">
        <div className="why-partner-heading">
          <h2 className="whywithus-heading mb-3 mt-0 has_fade_anim" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: 1 }}>
            Why should you partner with Metaspeed?
          </h2>
        </div>
      </div>
      <div className="row mt-5">
        {/* Card starts */}
        <div className="col-12 col-md-6 col-lg-4 has_fade_anim" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: 1 }}>
          <div className="card">
            <div className="card-body text-center d-flex flex-column align-items-center p-4 p-lg-5">
              <div className="whywithuscard-card-icon d-flex justify-content-center align-items-center mb-4">
                <i className="fa-solid fa-tags"></i>
              </div>
              <h5 className="whywithuscard-card-title mb-3">Exclusive Platform Benefits</h5>
              <p className="whywithuscard-card-text mb-0">
                As a Metaspeed partner, you’ll gain exclusive access, special discounts, and premium benefits on our cutting-edge low-code/no-code platform.
              </p>
            </div>
          </div>
        </div>
        {/* Card ends */}
        
        {/* Card starts */}
        <div className="col-12 col-md-6 col-lg-4 has_fade_anim" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: 1 }}>
          <div className="card">
            <div className="card-body text-center d-flex flex-column align-items-center p-4 p-lg-5">
              <div className="whywithuscard-card-icon d-flex justify-content-center align-items-center mb-4">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h5 className="whywithuscard-card-title mb-3">Unlimited Users &amp; Traction</h5>
              <p className="whywithuscard-card-text mb-0">
                Gain access to a growing ecosystem of users on Metaspeed’s low-code/no-code platform. Expand your reach and engage with a wider audience effortlessly.
              </p>
            </div>
          </div>
        </div>
        {/* Card ends */}
        
        {/* Card starts */}
        <div className="col-12 col-md-6 col-lg-4 has_fade_anim" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)", opacity: 1 }}>
          <div className="card">
            <div className="card-body text-center d-flex flex-column align-items-center p-4 p-lg-5">
              <div className="whywithuscard-card-icon d-flex justify-content-center align-items-center mb-4">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h5 className="whywithuscard-card-title mb-3">Business Growth &amp; Market Promotion</h5>
              <p className="whywithuscard-card-text mb-0">
                We actively promote our partners, helping them gain market recognition, visibility, and business growth through strategic exposure.
              </p>
            </div>
          </div>
        </div>
        {/* Card ends */}
      </div>
    </div>
  </div>
</section>
</div>
  )
}

export default Partner
