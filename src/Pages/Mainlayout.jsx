import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import gsap from "gsap";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Register.css";
import CountryDropdown from "../Pages/DropdownComponent/Countrydropdown";
import { useCountry } from "../Context/Countrycontext";

import { useConfig } from "../Context/ConfigContext";

const Preloader = () => {
  return (
    <div id="preloader">
      <div id="container" className="container-preloader">
        <div className="animation-preloader">
          <div className="spinner"></div>
        </div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
    </div>
  );
};

const Register = ({ closeModal}) => {

  const config = useConfig();

  const [loading, setLoading] = useState(false); // Loader state
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  const userSource = source && source === "Partner" ? "Partner" : "User";

  const [secretKey, setSecretKey] = useState(""); // Store the SecretKey token
  const [formData, setFormData] = useState({
    orgname: "",
    orgsize: "",
    uname: "",
    designation: "",
    usermail: "",
    specsforreq: "",
    iagree: false, // Add this for checkbox state
    usersource: userSource,
  });

  // const config1 = useConfig()
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Check for checkbox type
    });
  };

  // Function to fetch the encrypted secret (token)
  const getEncryptedSecret = () => {
    return fetch(
      config.fetchSecretKeyUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SecretKey: config.registerConfig.secretKey, // Replace with the actual input key if needed
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Since response is a token, use `.text()` instead of `.json()`
      })
      .then((token) => {
        console.log("Encrypted Secret (Token):", token); // Log the token for debugging
        return token; // Return the token
      })
      .catch((error) => {
        console.error("Error fetching encrypted secret:", error);
        throw error; // Propagate the error
      });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
        !formData.orgname ||
        !formData.uname ||
        !formData.usermail ||
        !formData.specsforreq ||
        !formData.iagree
    ) {
        setAlertInfo({
            show: true,
            type: "error",
            message: "Please fill in all required fields.",
        });
        setLoading(false);
        return;
    }

    getEncryptedSecret()
        .then((encryptedSecret) => {
            const tfval = formData.iagree ? "T" : "F";
            const submitData = {
                SecretKey: encryptedSecret,
                publickey: config.registerConfig.publicKey,
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
                                    orgname: formData.orgname,
                                    orgsize: formData.orgsize,
                                    uname: formData.uname,
                                    designation: formData.designation,
                                    usermail: formData.usermail,
                                    upassword: formData.upassword,
                                    confirmupassword: formData.confirmupassword,
                                    specsforreq: formData.specsforreq,
                                    usersource: formData.usersource,
                                    iagree: tfval,
                                },
                            },
                        },
                    },
                },
            };

            return fetch(config.fetchApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.message || "Something went wrong. Please try again later.");
                });
            }
            return response.json();
        })
        .then((result) => {
            if (result.success) {
                setAlertInfo({
                    show: true,
                    type: "success",
                    message: `${formData.usermail} Your Registration is Successful`,
                });

                setFormData({
                    orgname: "",
                    orgsize: "",
                    uname: "",
                    designation: "",
                    usermail: "",
                    specsforreq: "",
                    iagree: false,
                });

                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                throw new Error(result.message);
            }
        })
        .catch((error) => {
            let errmsg = error.message || "An error occurred.";

            if (errmsg.includes("Duplicate values are not allowed in Usermail")) {
                errmsg = `The email ID ${formData.usermail} is already registered.`;
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }

            setAlertInfo({
                show: true,
                type: "error",
                message: errmsg,
            });
        })
        .finally(() => {
            setLoading(false); // Ensure loading is stopped in all cases
        });
};


  // if (!isConfigLoaded) {
  //   return <p>Loading...</p>; // Show loading inside the Register component until config is loaded
  // }
  useEffect(() => {
    // Close alert on document click
    const handleClick = () => {
      setAlertInfo({ show: false, type: "", message: "" });
    };

    // Add the event listener
    document.addEventListener("click", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      {/* Testimonial Slider Section */}
      <div className="testimonial-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".testimonial-button-next",
            prevEl: ".testimonial-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>

        {/* Pagination */}
        <div className="swiper-pagination"></div>

        {/* Navigation buttons */}
        <div className="testimonial-button-next">Next</div>
        <div className="testimonial-button-prev">Prev</div>
      </div>

      {/* Modal for Registration */}
      <div
        className="modal fade show"
        id="signupform"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <img
          className="shape-1"
          src="assets/imgs/shape/shape-06.png"
          alt="shape"
        />
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="container-fluid">
              <div className="row">
                {/* Testimonial Section */}
                <div className="col-md-6">
                  <section className="testimonial-area section-spacing">
                    <div className="container">
                      <div className="testimonial-area-inner">
                        <div className="section-header">
                          <a href="index.html">
                            <img
                              src="assets/imgs/logo/logo.svg"
                              className="normal-logo"
                              alt="Site Logo"
                            />
                          </a>
                          <div className="section-title-wrapper">
                            <div className="title-wrapper">
                              <h2 className="title">
                                <span>
                                  Start Your <br />
                                  Journey
                                </span>{" "}
                                with us.
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="testimonial-wrapper-box">
                          <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            slidesPerView={1}
                            loop={true}
                            navigation={{
                              nextEl: ".testimonial-button-next",
                              prevEl: ".testimonial-button-prev",
                            }}
                            pagination={{
                              el: ".swiper-pagination",
                              clickable: true,
                            }}
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                          >
                            <SwiperSlide>
                              <div className="testimonial-content">
                                <div className="icon">
                                  <img
                                    src="assets/imgs/icon/icon-s-29.png"
                                    alt="icon"
                                  />
                                </div>
                                <div className="meta">
                                  <h3 className="name">Simple</h3>
                                </div>
                                <div className="text-wrapper">
                                  <p className="text">
                                    We built Axpert simple on purpose. Process
                                    owners and business analysts can collaborate
                                    with developers to create a culture of
                                    innovation.
                                  </p>
                                </div>
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="testimonial-content">
                                <div className="icon">
                                  <img
                                    src="assets/imgs/icon/icon-s-30.png"
                                    alt="icon"
                                  />
                                </div>
                                <div className="meta">
                                  <h3 className="name">Faster</h3>
                                </div>
                                <div className="text-wrapper">
                                  <p className="text">
                                    No-code workflows can be up and running in
                                    hours. Fully functional apps can be ready in
                                    days. Launch new applications every week.
                                  </p>
                                </div>
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="testimonial-content">
                                <div className="icon">
                                  <img
                                    src="assets/imgs/icon/icon-s-31.png"
                                    alt="icon"
                                  />
                                </div>
                                <div className="meta">
                                  <h3 className="name">Flexible</h3>
                                </div>
                                <div className="text-wrapper">
                                  <p className="text">
                                    Build kanban boards, automated workflows,
                                    custom pages, dashboards, and integrations,
                                    all on the same platform.
                                  </p>
                                </div>
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="swiper-slide">
                                <div className="testimonial-content">
                                  <div className="icon">
                                    <img
                                      src="assets/imgs/icon/icon-s-32.png"
                                      alt="icon image"
                                    />
                                  </div>
                                  <div className="meta">
                                    <h3 className="name"> Powerful </h3>
                                  </div>
                                  <div className="text-wrapper">
                                    <p className="text">
                                      Axpert has everything developers need to
                                      build complete applications including
                                      reusable custom components and API
                                      endpoints.{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          </Swiper>
                          <div className="nav-wrapper">
                            <div className="testimonial-button-prev">
                              <img
                                src="assets/imgs/icon/arrow-left-long.png"
                                alt="prev"
                              />
                            </div>
                            <div className="testimonial-button-next">
                              <img
                                src="assets/imgs/icon/arrow-right-long.png"
                                alt="next"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Registration Form */}
                <div className="col-md-6">
                  <div className="form-box-wrapper">
                    <div className="register-form-box">
                      <div className="btn-wrapper">
                        <button
                          className="close-btn"
                          data-bs-dismiss="modal"
                          onClick={closeModal}
                        >
                          <img src="assets/imgs/icon/cross.png" alt="close" />
                        </button>
                      </div>
                      <div className="form-wrapper">
                        <form className="user-form" onSubmit={handleSubmit}>
                          <div className="input-field mandatory">
                            <input
                              type="text"
                              placeholder="Organisation Name"
                              name="orgname" // Add name attribute
                              value={formData.orgname}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Organisation Size"
                              name="orgsize" // Add name attribute
                              value={formData.orgsize}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="input-field mandatory">
                            <input
                              type="text"
                              placeholder="Name"
                              name="uname" // Add name attribute
                              value={formData.uname}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              type="text"
                              placeholder="Designation"
                              name="designation" // Add name attribute
                              value={formData.designation}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="input-field mandatory">
                            <input
                              type="email"
                              placeholder="Email"
                              name="usermail" // Add name attribute
                              value={formData.usermail}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="text_area input-field mandatory">
                            <textarea
                              id="comments"
                              className="input-field mandatory"
                              placeholder="Specifics of the requirement"
                              name="specsforreq" // Add name attribute
                              value={formData.specsforreq}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                          <div className="input-field d-none">
                            <input
                              type="text"
                              placeholder="userorpartner"
                              name="userorpartner" // Add name attribute
                              value={formData.usersource}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="policy-field">
                            <input
                              type="checkbox"
                              id="d-policy"
                              name="iagree" // Add name attribute
                              checked={formData.iagree}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="d-policy">
                              I agree to Axpert{" "}
                              <span>
                                <a href="#">Terms of Service.</a>
                              </span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="subscribe-btn wc-btn-primary btn-text-flip"
                          >
                            <span data-text="Submit">Submit</span>
                          </button>

                          {alertInfo.show && (
                            <Stack
                              sx={{ width: "100%", marginTop: 2 }}
                              spacing={2}
                            >
                              <Alert
                                variant="filled"
                                severity={alertInfo.type}
                                sx={{
                                  "& .MuiAlert-message": {
                                    fontWeight: "700",
                                  },
                                }}
                              >
                                {alertInfo.message}
                              </Alert>
                            </Stack>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Registration Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};
const ScrollToTop = () => {
  const location = useLocation();
  const [strokeColor, setStrokeColor] = useState("#ff845d"); // Default stroke color
  const [dashOffset, setDashOffset] = useState(307.919); // Default dashoffset for the circle

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0); // This ensures the page scrolls to the top on navigation
    setStrokeColor("#ff845d"); // Reset stroke color
    setDashOffset(307.919); // Reset progress indicator
  }, [location.pathname]); // Runs when pathname changes

  // Scroll event to update progress indicator
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollPosition / documentHeight) * 100;
    const strokeDashoffset = 307.919 - scrollProgress * (307.919 / 100);

    setDashOffset(strokeDashoffset);
    setStrokeColor(scrollProgress > 0 ? "#ff845d" : "white");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="progress-wrap">
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease",
            strokeDasharray: 307.919,
            strokeDashoffset: dashOffset,
            stroke: strokeColor,
            strokeWidth: 5,
          }}
        />
      </svg>
    </div>
  );
};
const Offcanvas = ({ openModal }) => {
  const location = useLocation();
  const showCanvas3 = () => {
    const canvas3 = gsap.timeline();

    canvas3.to(".offcanvas-area", {
      left: 0,
      visibility: "visible",
      duration: 0.8,
      opacity: 1,
      rotationY: 0,
      perspective: 0,
    });

    // Menu Item
    canvas3.to(
      ".offcanvas-area-menu-wrapper ul li",
      {
        opacity: 1,
        top: 0,
        stagger: 0.05,
        duration: 1,
        rotationX: 0,
      },
      "-=0.1"
    );

    // Meta
    canvas3.to(
      ".offcanvas-area-meta-wrapper",
      {
        top: 0,
        visibility: "visible",
        duration: 0.8,
        opacity: 1,
      },
      "-=0.5"
    );

    // Social
    canvas3.to(
      ".offcanvas-area-social",
      {
        top: 0,
        visibility: "visible",
        duration: 0.8,
        opacity: 1,
      },
      "-=0.5"
    );
  };

  const hideCanvas3 = () => {
    const canvas3 = gsap.timeline();

    canvas3.to(".offcanvas-area", {
      duration: 0.8,
      rotationY: -90,
      opacity: 0,
    });

    canvas3.to(".offcanvas-area", {
      visibility: "hidden",
      duration: 0.1,
      rotationY: 50,
      left: 0,
      rotationX: 0,
    });

    // Menu Item
    canvas3.to(".offcanvas-area-menu-wrapper ul li", {
      opacity: 0,
      top: -100,
      stagger: 0.01,
      duration: 0.1,
      rotationX: 50,
    });

    // Meta
    canvas3.to(
      ".offcanvas-area-meta-wrapper",
      {
        top: -30,
        visibility: "hidden",
        duration: 0.8,
        opacity: 1,
      },
      "-=0.5"
    );

    // Social
    canvas3.to(
      ".offcanvas-area-social",
      {
        top: -30,
        visibility: "hidden",
        duration: 0.8,
        opacity: 1,
      },
      "-=0.5"
    );
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const offcanvasBtn = document.querySelector(".open-offcanvas");
    const closeBtn = document.querySelector(".close-offcanvas");

    if (offcanvasBtn) {
      offcanvasBtn.addEventListener("click", () => {
        body.style.overflow = "hidden"; // Hide the scrollbar
        showCanvas3();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        body.style.overflow = "auto"; // Restore the scrollbar
        hideCanvas3();
      });
    }

    return () => {
      if (offcanvasBtn) offcanvasBtn.removeEventListener("click", showCanvas3);
      if (closeBtn) closeBtn.removeEventListener("click", hideCanvas3);
    };
  }, []);
  
  return (
    <div className="offcanvas-area">
      <div className="offcanvas-area-meta-wrapper">
        <span id="close_offcanvas" className="close-offcanvas">
          <img
           src="assets/imgs/icon/close.png"
            alt="close"
          />
        </span>
        <div className="offcanvas-btn-wrapper">
        <button
              className="wc-btn wc-btn-default btn-hover-cropping"
              onClick={() => {
                openModal();
                hideCanvas3();
              }}
            >
              Get Started
            </button>
        </div>
      </div>
      <div className="offcanvas-area-menu-wrapper">
      <ul id="accordion" className="accordion">
            <li>
              <NavLink to="/" onClick={hideCanvas3}>Home</NavLink>
            </li>
            <li>
              <div className="link">
                About
                <img
                  className="angle-down"
                  src="assets/imgs/icon/angle-down.png"
                  alt="icon image"
                />
              </div>
              <ul className="submenu">
                <li>
                  <a
                    href="https://agile-labs.com/the-team/"
                    target="_blank"
                    rel="noopener noreferrer" onClick={hideCanvas3}
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="https://agile-labs.com/about-us/"
                    target="_blank"
                    rel="noopener noreferrer" onClick={hideCanvas3}
                  >
                    Our Company
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/pricing" onClick={hideCanvas3}>Pricing</NavLink>
            </li>
            <li>
               <NavLink
                    to="/partner?source=Partner"
                    className={
                      location.pathname.startsWith("/partner") ? "active" : ""
                    } onClick={hideCanvas3}
                  >
                    Partner with us
                  </NavLink>
            </li>
            <li>
              <a
                href="https://agile-labs.com/index.php/contact-us"
                target="_blank"
                rel="noopener noreferrer" onClick={hideCanvas3}
              >
                Contact
              </a>
            </li>
          </ul>
      </div>

    </div>

  );
};

const Header = () => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ show: false, type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo.show]);

  const { setSelectedCountry, locationurl } = useCountry(); // Get setter function

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode); // Store selected country globally
  };

  // const [active, setActive] = useState("Home");
  const [isSticky, setIsSticky] = useState(false);
  // const handleLoad = (link) => {
  //   setActive(link); // Set the active link
  // };
  const location = useLocation();

  // const openSignInPage = () => {
  //   window.open(
  //     "https://metaspeed.agilecloud.biz/Metaspeed/aspx/signin.aspx",
  //     "_blank" // Opens in a new tab
  //   );
  // };

  const openSignInPage = (locationurl) => {
    if (!locationurl || locationurl === "#") {
      setAlertInfo({
        show: true,
        type: "error",
        message: "URL Not Mapped",
      });
    } else {
      window.open(locationurl, "_blank"); // Open valid URL in a new tab
    }
  };
  // const navigate = useNavigate();
  // const openPartnerComponent = () => {
  //   navigate("/partner?source=Partner");  // Open ERP page in a new tab
  // };
  useEffect(() => {
    // Event listener to track scroll position
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true); // Add sticky class after scrolling 50px
      } else {
        setIsSticky(false); // Remove sticky class when scroll is less than 50px
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header-area style-1 pos-abs zi-9 ${isSticky ? "sticky" : ""}`}
    >
      <div className="container">
        <div className="header-area__inner">
          <div className="header__logo">
            <NavLink to="/">
              <img
                src="assets/imgs/logo/logo.svg"
                className="normal-logo"
                alt="Site Logo"
              />
              <img
                src="assets/imgs/logo/logo.svg"
                className="sticky-logo"
                alt="Site Logo"
              />
            </NavLink>
          </div>
          <div className="header__nav pos-center">
            <nav className="main-menu">
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="menu-item-has-children">
                  <a href=" ">about</a>
                  <ul className="dp-menu">
                    {/* <li>
                        <a
                          href="https://agile-labs.com/axpert-in-action/"
                          target="_blank"
                        >
                          Axpert
                        </a>
                      </li> */}
                    <li>
                      <a
                        href="https://agile-labs.com/the-team/"
                        target="_blank"
                      >
                        Our Team
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://agile-labs.com/about-us/"
                        target="_blank"
                      >
                        Our Company
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink
                    to="/pricing"
                    className={location.pathname === "/pricing" ? "active" : ""}
                  >
                    Pricing
                  </NavLink>
                </li>
                <li>
                  {/* <a href="#"  onClick={(e) => {
                  e.preventDefault();
                  openPartnerComponent();
                }}  target="_blank">
                      Partner with us 
                    </a> */}
                  <NavLink
                    to="/partner?source=Partner"
                    className={
                      location.pathname.startsWith("/partner") ? "active" : ""
                    }
                  >
                    Partner with us
                  </NavLink>
                </li>
                <li>
                  <a
                    href="https://agile-labs.com/index.php/contact-us"
                    target="_blank"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <a
            href={locationurl && locationurl !== "#" ? locationurl : "#"}
            className="wc-btn wc-btn-primary btn-text-flip bordered video-popup"
            onClick={(e) => {
              e.preventDefault(); // Prevent default action always
              openSignInPage(locationurl); // Handle redirection or alert
            }}
            target={locationurl && locationurl !== "#" ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            <span data-text="Sign In">Sign In</span>
          </a>

          <CountryDropdown onCountrySelect={handleCountrySelect} />


          {/* <div className="header-search" data-bs-toggle="modal" data-bs-target="#search-template">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
  
          <div className="header-notifications" data-bs-toggle="modal" data-bs-target="#search-template">
            <i className="fa-solid fa-bullhorn"></i>
          </div> */}

          {/* <div className="header__button" id="signupbtn">
          <a
            href="#"
            className="wc-btn wc-btn-primary btn-text-flip"
            onClick={(e) => {
              e.preventDefault();
              openModal(); // Call openModal function passed from Home
            }}
          >
            <span data-text="Sign up">Sign up</span>
          </a>
        </div> */}
          <div className="header__navicon d-xl-none">
            <button className="open-offcanvas">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {alertInfo.show && (
                            <Stack
                              sx={{ width: "100%", marginTop: 2 }}
                              spacing={2}
                            >
                              <Alert
                                variant="filled"
                                severity={alertInfo.type}
                                sx={{
                                  "& .MuiAlert-message": {
                                    fontWeight: "700",
                                  },
                                }}
                              >
                                {alertInfo.message}
                              </Alert>
                            </Stack>
                          )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer-area style-1">
      <div className="container">
        <div className="footer-area-inner">
          <div className="footer-widget-wrapper">
            <div className="footer-logo">
              <img src="assets/imgs/logo/logo-white.svg" alt="site-logo" />
            </div>
            <div className="description-text">
              <div className="text-wrapper">
                <p className="text">
                  Axpert is a real early-stage software looking for an analytics
                  platform that scales with you, check out our stage program.
                </p>
              </div>
            </div>
          </div>
          <div className="footer-widget-wrapper">
            <h2 className="title">Company</h2>
            <ul className="footer-nav-list">
              <li>
                <a href="https://agile-labs.com/axpert-in-action/">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a
                  href="https://agile-labs.com/partners/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Partners
                </a>
              </li>
              <li>
                <a href="https://agile-labs.com/index.php/contact-us">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-widget-wrapper">
            <h2 className="title">Useful Link</h2>
            <ul className="footer-nav-list">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
              <li>
                <a href="#">Service</a>
              </li>
              <li>
                <a href="https://agile-labs.com/the-team/">Team</a>
              </li>
              <li>
                <a href="#">Collection</a>
              </li>
            </ul>
          </div>
          <div className="footer-widget-wrapper">
            <h2 className="title">Product</h2>
            <ul className="footer-nav-list">
              <li>
                <a href="ERPNew.html">ERP</a>
              </li>
              <li>
                <a href="#">Portals</a>
              </li>
              <li>
                <a href="#">Tools</a>
              </li>
              <li>
                <a href="#">HR & Payroll</a>
              </li>
              <li>
                <a href="https://agile-labs.com/cms/">CMS</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright-area-inner">
          <div className="copyright-text">
            <p className="text">© 2024. All Right Reserved.</p>
          </div>

          <ul className="social-links">
            <li>
              <a
                href="https://www.facebook.com/AgileLabsAxpert"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/AgileAxpert?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/agileaxpert/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://in.linkedin.com/company/agile-labs_2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCUvC7Z8wm8RmfjmC-RTa1cg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer, Header, Preloader, Register, ScrollToTop,Offcanvas};


