import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Home/Homepagecomponents.css";
import CircularProgress from "@mui/material/CircularProgress";
// import Erp from "./Erp";
// import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

import { useConfig } from "../../Context/ConfigContext";

const FirstSection = ({ openModal }) => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".has_fade_anim");

    // Intersection Observer to trigger 'visible' class when the element is in the viewport
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'visible' class to trigger the fade-in effect
            const element = entry.target;
            setTimeout(() => {
              element.classList.add("visible");
            }, parseFloat(element.dataset.delay) * 1000 || 0); // Delay based on data-delay attribute

            // Stop observing the element after it is visible
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    ); // 0.2 means 20% of the element is in view

    fadeElements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer on component unmount
    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
  return (
    <section className="container_slider has_fade_anim">
      {/* Shape one */}
      <svg
        className="testimonial23-shape-one"
        width="404"
        height="572"
        viewBox="0 0 404 572"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="118"
          cy="286"
          r="265.5"
          stroke="#fff4df"
          strokeOpacity="0.8"
          strokeWidth="41"
        />
      </svg>

      <svg
        className="position-absolute end-0 top-0"
        width="686"
        height="630"
        viewBox="0 0 686 630"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="403.5"
          cy="231.894"
          rx="403.5"
          ry="397.98"
          fill="#fff4df"
        />
      </svg>

      {/* Swiper Component */}
      <div className="testimonial">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4000, // Delay between slides (in ms)
            disableOnInteraction: false, // Continue autoplay even after user interaction
          }}
          loop="true"
          className="mySwiper"
        >
          <SwiperSlide className="slide">
            <img
              src="assets/imgs/icon/patented.png"
              alt="Patented"
              className="image"
            />
            <h2 className="header11-heading mb-4">
              Run Your Business Smarter, Not Harder
            </h2>
            <p>
              Experience seamless online management with an innovative software
              solution that adapts to your needs, giving you the freedom to grow
              without limitations.
            </p>
            <div className="details">
              <a
                href=" "
                className="btn header11-btn fs-5 "
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  openModal(); // Call the openModal function
                }}
              >
                Get Started{" "}
                <span className="fas fa-arrow-right ms-2"></span>
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide className="slide">
            <img
              src="assets/imgs/icon/patented.png"
              alt="Patented"
              className="image"
            />
            <h2 className="header11-heading mb-4">
              A Unified Platform for Global Success
            </h2>
            <p>
              Experience the future of business management with an intuitive,
              all-in-one software solution that empowers you to shape your
              destiny and grow with ease.
            </p>
            <div className="details">
              <a
                href=""
                className="btn header11-btn fs-5 "
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  openModal(); // Call the openModal function
                }}
              >
                Get Started{" "}
                <span className="fas fa-arrow-right ms-2"></span>
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide className="slide">
            <img
              src="assets/imgs/icon/patented.png"
              alt="Patented"
              className="image"
            />
            <h2 className="header11-heading mb-4">
              Empower Your Business on a Global Scale
            </h2>
            <p>
              Seamlessly integrate the latest technologies into your operations,
              gain vendor independence, and proactively drive your business
              towards long-term success.
            </p>
            <div className="details">
              <a
                href=""
                className="btn header11-btn fs-5 "
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  openModal(); // Call the openModal function
                }}
              >
                Get Started{" "}
                <span className="fas fa-arrow-right ms-2"></span>
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

const SecondSection = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Only run the animation logic if the user is scrolling down
    if (currentScrollY > lastScrollY) {
      const elements = document.querySelectorAll(".has_fade_anim1");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add("visible");
        }
      });
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to check visibility immediately
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <section className="numbers3 has_fade_anim">
      <div className="container">
        {/* <!-- heading --> */}
        <div className="row justify-content-between">
          <div className="col-12 col-lg-6">
            <div
              className="numbers3-contents-wrapper has_fade_anim"
              style={{ transform: "translate(0px, 0px)", opacity: 1 }}
            >
              <h1 className="numbers3-heading mb-3 has_fade_anim">
                Driving Digital Excellence Globally
              </h1>
              <p className="numbers3-sub-heading mb-5 has_fade_anim">
                From startups to enterprises, we empower businesses with Axpert
                cutting-edge low-code technology.
              </p>
            </div>
            {/* <!-- cards --> */}
            <div className="d-flex flex-column flex-sm-row">
              {/* <!-- card starts --> */}
              <div
                className="card border-0 mb-3 has_fade_anim"
                style={{ transform: "translate(0px, 0px)", opacity: 1 }}
              >
                <div className="card-body">
                  <h3 className="mb-3 has_fade_anim1">750+</h3>
                  <h5>Enterprises Transformed</h5>
                  <p className="mb-0 has_fade_anim">
                    Empowering businesses across industries with cutting-edge
                    low-code solutions.
                  </p>
                </div>
              </div>
              {/* <!-- card ends -->
                    <!-- card starts --> */}
              <div
                className="card border-0 mb-3 has_fade_anim"
                style={{ transform: "translate(0px, 0px)", opacity: 1 }}
              >
                <div className="card-body">
                  <h3 className="mb-3 has_fade_anim1">1,00,000+</h3>
                  <h5>Active Users</h5>
                  <p className="mb-0 has_fade_anim">
                    Trusted worldwide for seamless and efficient enterprise
                    applications.
                  </p>
                </div>
              </div>
              {/* <!-- card ends --> */}
            </div>

            <div className="d-flex flex-column flex-sm-row">
              {/* <!-- card starts --> */}
              <div
                className="card border-0 mb-3 has_fade_anim"
                style={{ transform: "translate(0px, 0px)", opacity: 1 }}
              >
                <div className="card-body">
                  <h3 className="mb-3 has_fade_anim1">60%</h3>
                  <h5>Faster Development</h5>
                  <p className="mb-0 has_fade_anim">
                    Metaspeed accelerates application deployment, reducing time
                    and cost significantly.
                  </p>
                </div>
              </div>
              {/* <!-- card ends -->
                    <!-- card starts --> */}
              <div
                className="card border-0 mb-3 has_fade_anim"
                style={{ transform: "translate(0px, 0px)", opacity: 1 }}
              >
                <div className="card-body">
                  <h3 className="mb-3 has_fade_anim1">10+</h3>
                  <h5>Global Regions</h5>
                  <p className="mb-0 has_fade_anim">
                    Recognized across markets, including the US, Canada, and
                    beyond.
                  </p>
                </div>
              </div>
              {/* <!-- card ends --> */}
            </div>
          </div>
          <div className="col-12 col-lg-5 d-flex justify-content-center align-items-end has_fade_anim">
            <img
              src="assets/imgs/gallery/3d-rendering-pen-ai-generated.jpg"
              alt=""
              className="has_fade_anim img-fluid mt-5 mt-md-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ThirdSection = () => {
  return (
    <div className="brand-area section-spacing-bottom has_fade_anim">
      <div className="container">
        <div className="text-wrapper col-12 col-lg-6">
          <h1 className="numbers3-heading mb-3 has_fade_anim">
            Our Network of Excellence
          </h1>
          <p className="clients13-sub-heading mb-0 has_fade_anim">
            Discover the incredible businesses and organizations we collaborate
            with. We take pride in building strong relationships that drive
            success and innovation.
          </p>
        </div>
        <div className="brand-logos">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={6}
            autoplay={{
              delay: 0, // Extremely small delay to trick Swiper into continuous movement
              disableOnInteraction: false,
              pauseOnMouseEnter: false, // Ensures no pause on hover
            }}
            loop={true} // Enables infinite looping
            speed={2000} // Adjust for smooth, gradual scrolling
            freeMode={true} // Enables seamless scrolling
            freeModeMomentum={false} // Removes any stopping effect
            allowTouchMove={false} // Prevents user interaction from stopping autoplay
            cssMode={false} // Prevents sudden jumps
            spaceBetween={20}
            breakpoints={{
              320: {
                // Mobile devices (320px and above)
                slidesPerView: 2,
                spaceBetween: 2, // Adjust space for mobile view
              },
              480: {
                // Slightly larger mobile devices (480px and above)
                slidesPerView: 2,
                spaceBetween: 15, // Adjust space for medium mobile view
              },
              768: {
                // Tablets (768px and above)
                slidesPerView: 3,
                spaceBetween: 20, // Adjust space for tablet view
              },
              1024: {
                // Desktop (1024px and above)
                slidesPerView: 6,
                spaceBetween: 15, // Adjust space for desktop view
              },
            }}
          >
            {[
              "quess",
              "BMRCL",
              "Kauvery-Hospital",
              "sts",
              "GI",
              "BNB",
              "Government-of-Rajasthan",
              "Al-Turki",
              "Assurant",
            ].map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="logo">
                  <img
                    src={`assets/imgs/partners/${logo}.png`}
                    alt={`Logo ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
const FourthSection = () => {
  const navigate = useNavigate();
  // const openERPComponent = () => {
  //   window.open("#/erp", "_blank"); // Open ERP page in a new tab
  // };
  const openERPComponent = () => {
    navigate("/erp"); // Navigates to the ERP page in the same tab
  };
  return (
    <section className="featured13">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7 text-center">
            <h2 className="featured13-heading mb-4 has_fade_anim">
              Seamless Business Management, One Click Away
            </h2>
            <p className="featured13-sub-heading mb-4 has_fade_anim">
              Manage tasks effortlessly with custom statuses, ensuring smooth
              workflow tracking for your business.
            </p>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 mt-lg-0">
            <div className="featured13-item position-relative p-4 p-lg-5 has_fade_anim">
              <img
                src="assets/imgs/gallery/3d-cash-money.jpg"
                alt=""
                className="img-fluid featured13-banner mb-4"
              />
              <h4 className="featured13-title fs-4 fw-bold mb-3">
                HR & Payroll Management
              </h4>
              <p className="featured13-content mb-0">
                Automate payroll, ensure compliance, and simplify HR
                processes—all in one seamless solution.
              </p>
              <div className="details">
                <a href="#" className="btn header11-btn fs-5 mt-4 mt-md-5">
                  Explore More <span className="fas fa-arrow-right ms-2"></span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="featured13-item position-relative p-4 p-lg-5 has_fade_anim">
              <img
                src="assets/imgs/gallery/gradient-vibrant-colors-abstract-3d-art-installation.jpg"
                alt=""
                className="img-fluid featured13-banner mb-4"
              />
              <h4 className="featured13-title fs-4 fw-bold mb-3">
                Smart ERP Solutions
              </h4>
              <p className="featured13-content mb-0">
                Optimize operations with a scalable, integrated ERP system
                designed for efficiency and growth.
              </p>
              <div className="details">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openERPComponent();
                  }}
                  target="_blank"
                  className="btn header11-btn fs-5 mt-4 mt-md-5"
                >
                  Explore More <span className="fas fa-arrow-right ms-2"></span>
                </a>
              </div>
            </div>
          </div>
          {/* Uncomment and update the section if needed */}
          {/* <div className="col-md-4 mt-4 mt-md-0">
        <div className="featured13-item position-relative p-4 p-lg-5">
          <img
            src="assets/imgs/gallery/construction-worker-wearing-yellow-hardhat-safety-construction-site-generated-by-artificial-intelligence.jpg"
            alt=""
            className="img-fluid featured13-banner mb-4"
          />
          <h4 className="featured13-title fs-4 fw-bold mb-3">HSE Compliance & Safety</h4>
          <p className="featured13-content mb-0">
            Strengthen workplace safety and regulatory compliance with our advanced HSE management tools.
          </p>
          <div className="details">
            <a href="#" className="btn header11-btn fs-5 mt-4 mt-md-5">
              Access Now <span className="fas fa-arrow-right ms-2"></span>
            </a>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    </section>
  );
};

const FifthSection = () => {
  return (
    <section className="testimonial24">
      <div className="container">
        <div className="row align-items-center justify-content-between mb-4 mb-md-5">
          <div className="col-12 text-center">
            <hr className="testimonial24-divider mb-3" />
            <h2 className="testimonial24-heading mb-0 has_fade_anim">
              Voices of Trust & Excellence
            </h2>
          </div>
        </div>
        <div
          id="testimonial24-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="1000"
        >
          <div className="carousel-indicators m-0">
            <button
              type="button"
              data-bs-target="#testimonial24-carousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#testimonial24-carousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              className="ms-3"
            ></button>
            {/* <button type="button" data-bs-target="#testimonial24-carousel" data-bs-slide-to="2" aria-label="Slide 3" className="ms-3"></button> */}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <div className="card testimonial24-item border-0 p-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <img
                            src="assets/imgs/feedback/Beltexco.png"
                            alt=""
                            className="img-fluid rounded-circle border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 fs-4">Sakthi Prabhu S.S</h4>
                          <p className="mb-0">Managing Director</p>
                        </div>
                      </div>
                      <p className="opacity-75">
                        We replaced our in-house ERP development with Axpert and
                        have been enjoying its seamless customization, which is
                        essential in our industry.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="card testimonial24-item border-0 p-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <img
                            src="assets/imgs/feedback/Amazingexportcorporation.png"
                            alt=""
                            className="img-fluid rounded-circle border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 fs-4">Prassanna</h4>
                          <p className="mb-0">IT Head</p>
                        </div>
                      </div>
                      <p className="opacity-75">
                        With Axpert, I feel truly empowered. I no longer have to
                        rely on others to manage or modify our ERP system.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="card testimonial24-item border-0 p-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <img
                            src="assets/imgs/feedback/Al-Turki.png"
                            alt=""
                            className="img-fluid rounded-circle border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 fs-4">Johnson</h4>
                          <p className="mb-0">Marketing Head</p>
                        </div>
                      </div>
                      <p className="opacity-75">
                        For over three years, we've been using software
                        applications built on Axpert. It not only meets our
                        requirements but also scales effortlessly with our
                        growth.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="row">
                <div className="col-12 col-lg-4">
                  <div className="card testimonial24-item border-0 p-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <img
                            src="assets/imgs/feedback/prodimpex.png"
                            alt=""
                            className="img-fluid rounded-circle border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 fs-4">Prodimpex S.A</h4>
                          <p className="mb-0"></p>
                        </div>
                      </div>
                      <p className="opacity-75">
                        Axpert offers an excellent user interface, great
                        features, and outstanding technical support. We highly
                        recommend it to other enterprises. Overall, its
                        performance is exceptional.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="card testimonial24-item border-0 p-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <img
                            src="assets/imgs/feedback/Uniworld-Logistics_Logo-1536x1066.png"
                            alt=""
                            className="img-fluid rounded-circle border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 fs-4">Uniworld Logistics</h4>
                          <p className="mb-0"></p>
                        </div>
                      </div>
                      <p className="opacity-75">
                        The speed of development and change management with
                        Axpert is incredible. What once took days now takes only
                        a few hours.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="card testimonial24-item border-0 p-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-4">
                        <div className="me-3">
                          <img
                            src="assets/imgs/feedback/princefarma.png"
                            alt=""
                            className="img-fluid rounded-circle border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-1 fs-4">Prince Farma</h4>
                          <p className="mb-0"></p>
                        </div>
                      </div>
                      <p className="opacity-75">
                        If you're searching for an ERP solution for the
                        pharmaceutical industry, Axpert is a must-try. Plus,
                        regular technical updates keep it ahead of the curve.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="carousel-item">
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="card testimonial24-item border-0 p-4 mt-4">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-4">
                          <div className="me-3">
                            <img src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg" alt="" className="img-fluid rounded-circle border"  />
                          </div>
                          <div>
                            <h4 className="mb-1 fs-4">Akshay Kumar</h4>
                            <p className="mb-0">Founder / CEO</p>
                          </div>
                        </div>
                        <p className="opacity-75">
                          An activity that requires a person's mental or physical effort is work. If a person is trained for a certain type of job, they may have a job. Person's mental or physical effort is work. If a person is trained.
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div className="col-12 col-lg-4">
                    <div className="card testimonial24-item border-0 p-4 mt-4">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-4">
                          <div className="me-3">
                            <img src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg" alt="" className="img-fluid rounded-circle border"  />
                          </div>
                          <div>
                            <h4 className="mb-1 fs-4">Akshay Kumar</h4>
                            <p className="mb-0">Founder / CEO</p>
                          </div>
                        </div>
                        <p className="opacity-75">
                          An activity that requires a person's mental or physical effort is work. If a person is trained for a certain type of job, they may have a job. Person's mental or physical effort is work. If a person is trained.
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div className="col-12 col-lg-4">
                    <div className="card testimonial24-item border-0 p-4 mt-4">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-4">
                          <div className="me-3">
                            <img src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg" alt="" className="img-fluid rounded-circle border"  />
                          </div>
                          <div>
                            <h4 className="mb-1 fs-4">Akshay Kumar</h4>
                            <p className="mb-0">Founder / CEO</p>
                          </div>
                        </div>
                        <p className="opacity-75">
                          An activity that requires a person's mental or physical effort is work. If a person is trained for a certain type of job, they may have a job. Person's mental or physical effort is work. If a person is trained.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

const SixthSection = () => {
  return (
    <section className="featured12">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7 text-center">
            <h2 className="featured12-heading mb-4 has_fade_anim">
              Smart Tools for Smarter Business Decisions
            </h2>
            <p className="featured12-sub-heading mb-4 has_fade_anim">
              Automate workflows, enhance efficiency, and manage everything
              seamlessly from one platform.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mt-lg-0 has_fade_anim">
            <div className="featured12-item position-relative">
              <div className="featured12-icon mb-3">
                <i className="fas fa-bell"></i>
              </div>
              <div className="p-4 px-lg-5 pb-lg-5">
                <h4 className="featured12-title fs-4 fw-bold mb-3">
                  Instant Replies, One Click Away
                </h4>
                <p className="featured12-content mb-0">
                  Respond faster with one-click messaging—available 24/7 for
                  seamless communication.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4 mt-md-0 has_fade_anim">
            <div className="featured12-item position-relative">
              <div className="featured12-icon mb-3">
                <i className="fas fa-globe"></i>
              </div>
              <div className="p-4 px-lg-5 pb-lg-5">
                <h4 className="featured12-title fs-4 fw-bold mb-3">
                  Fully Responsive, Always Adaptive
                </h4>
                <p className="featured12-content mb-0">
                  Enjoy a flawless experience across all devices with our
                  multi-platform compatibility.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-4 mt-md-0 has_fade_anim">
            <div className="featured12-item position-relative">
              <div className="featured12-icon mb-3">
                <i className="fas fa-headset"></i>
              </div>
              <div className="p-4 px-lg-5 pb-lg-5">
                <h4 className="featured12-title fs-4 fw-bold mb-3">
                  Instant Assistance, Anytime, Anywhere
                </h4>
                <p className="featured12-content mb-0">
                  Get instant assistance, ensuring your business never misses a
                  beat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SeventhSection = () => {
  return (
    <section className="testimonial10">
      <div className="container position-relative">
        <div className="row mb-4 mb-lg-5">
          <div className="col-lg-6">
            <h2 className="testimonial10-heading mb-4 has_fade_anim">
              Voices of Trust – Real Business Experiences
            </h2>
            <p className="testimonial10-sub-heading mb-0 has_fade_anim">
              See what users on Google and G2 have to say about Axpert platform
              and its role in revolutionizing business automation.
            </p>
          </div>
        </div>
        <div className="row testimonial10-card">
          <div className="col-md-6 mt-3 mt-md-4 has_fade_anim">
            <div className="card testimonial10-item">
              <div className="card-body d-flex align-items-center p-4 py-5">
                <div className="me-3">
                  <img
                    src="assets/imgs/gallery/7123025_logo_google_g_icon.png"
                    alt=""
                    className="img-fluid testimonial10-img rounded-circle border border-4 border-danger"
                  />
                </div>
                <div>
                  <h4 className="testimonial10-title fs-4 mb-2">
                    Perfected by Innovation
                  </h4>
                  <p className="mb-3 testimonial10-rating">
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star-half-alt active"></span>
                    <span className="fas fa-star"></span>
                  </p>
                  <p className="testimonial10-content mb-0">
                    Trusted for its user-friendly Axpert platform, Axpert
                    enhances business efficiency with seamless automation and
                    excellent customer support.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-md-4 has_fade_anim">
            <div className="card testimonial10-item">
              <div className="card-body d-flex align-items-center p-4 py-5">
                <div className="me-3">
                  <img
                    src="assets/imgs/gallery/pngwing.com.png"
                    alt=""
                    className="img-fluid testimonial10-img rounded-circle border border-4 border-danger"
                  />
                </div>
                <div>
                  <h4 className="testimonial10-title fs-4 mb-2">
                    Innovation Meets Business Success
                  </h4>
                  <p className="mb-3 testimonial10-rating">
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star active"></span>
                    <span className="fas fa-star-half-alt active"></span>
                    <span className="fas fa-star"></span>
                  </p>
                  <p className="testimonial10-content mb-0">
                    With a user-friendly interface and robust automation, Agile
                    Labs’ Axpert platform revolutionizes business management,
                    ensuring accuracy, flexibility, and growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EighthSection = ({ setAlertInfo }) => {

  const config = useConfig();

  const [email, setEmail] = useState(""); // Store email input
 
  const [loading, setLoading] = useState(false); // Loader state

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    const contactNum = ""; // Empty contact number
    const particulars = "Stay in touch - Home Page";

    if (!validateEmail(email)) {
      setAlertInfo({
        show: true,
        type: "error",
        message: "Please enter a valid email ID.",
      });

      setTimeout(() => {
        setAlertInfo({ show: false, type: "", message: "" });
      }, 3000);
      setLoading(false); // Hide loader
      return;
    }

    try {
      // First API Call - Get Encrypted Secret
      const getEncryptedSecret = async () => {
        const response = await fetch(
          config.fetchSecretKeyUrl,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ SecretKey: config.pricingConfig.secretKey}),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      };

      const token = await getEncryptedSecret();
      console.log("Encrypted Secret (Token):", token);

      // Second API Call - Submit Data
      const submitData = {
        SecretKey: token,
        publickey: config.pricingConfig.publicKey,
        project: config.project,
        submitdata: {
          username: "admin",
          trace: config.trace,
          keyfield: "",
          dataarray: {
            data: {
              mode: "new",
              keyvalue: "",
              recordid: "0",
              dc1: {
                row1: {
                  contactno: contactNum,
                  contactname: email, // Pass email here
                  particulars: particulars, // Set predefined text
                },
              },
            },
          },
        },
      };

      const response = await fetch(
        config.fetchApiUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setAlertInfo({
          show: true,
          type: "success",
          message: `Thank you for subscribing!`,
        });

        setTimeout(() => {
          setAlertInfo({ show: false, type: "", message: "" });
          setEmail("");
        }, 3000);
      } else {
        setAlertInfo({
          show: true,
          type: "error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setAlertInfo({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };
  // useEffect(() => {
  //   const handleClick = (event) => {
  //     // Check if the click happened outside the alert box
  //     if (!event.target.closest(".alert-box")) {
  //       setAlertInfo({ show: false, type: "", message: "" });
  //     }
  //   };

  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, []);
  return (
    <section className="cta14" id="cta14">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            {/* Start: Section Heading */}
            <div className="text-center text-sm-start">
              <h2 className="cta14-heading mb-0 has_fade_anim">
                Stay In Touch
              </h2>
              <p className="cta14-sub-heading ms-sm-4 has_fade_anim">
                Sign Up Your Email For Update.
              </p>
            </div>
            {/* End: Section Heading */}
          </div>

          <div className="col-12 col-lg-6 mt-4 has_fade_anim">
            <form method="post">
              <div className="row">
                <div className="col-md-10 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control px-0"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading} // Disable input while loading
                      style={{ opacity: loading ? 0.5 : 1 }}
                    />
                  </div>
                </div>
                <div className="details">
                  <a
                    href=""
                    className="btn header11-btn fs-5 "
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      handleSubmit(e);
                    }}
                    disabled={loading} // Disable input while loading
                    style={{ opacity: loading ? 0.5 : 1 }}
                  >
                    Subscribe <span className="fas fa-arrow-right ms-2"></span>
                  </a>
                </div>
              </div>
            </form>
            
          </div>
          {/* /.subscribe-form-area */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container */}
      {/* Full-Screen Loader Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={130} sx={{ color: "antiquewhite" }} />
        </div>
      )}
    </section>
  );
};

export {
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
  FifthSection,
  SixthSection,
  SeventhSection,
  EighthSection,
};
