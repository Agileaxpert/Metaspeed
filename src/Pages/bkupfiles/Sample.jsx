import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';

// import config from "./config.json";
import useConfig from "../Hooks/useConfig";

import gsap from "gsap";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Pages/Register.css";
import CountryDropdown from "./Countrydropdown";


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

// const Register = ({ closeModal }) => {
//   return (
//     <div>
//       {/* Testimonial Slider Section */}
//       <div className="testimonial-slider">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           slidesPerView={1}
//           loop={true}
//           navigation={{
//             nextEl: ".testimonial-button-next",
//             prevEl: ".testimonial-button-prev",
//           }}
//           pagination={{
//             el: ".swiper-pagination",
//             clickable: true,
//           }}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//         >
//           <SwiperSlide>Slide 1</SwiperSlide>
//           <SwiperSlide>Slide 2</SwiperSlide>
//           <SwiperSlide>Slide 3</SwiperSlide>
//         </Swiper>

//         {/* Pagination */}
//         <div className="swiper-pagination"></div>

//         {/* Navigation buttons */}
//         <div className="testimonial-button-next">Next</div>
//         <div className="testimonial-button-prev">Prev</div>
//       </div>

//       {/* Modal for Registration */}
//       <div
//         className="modal fade show"
//         id="signupform"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-modal="true"
//         role="dialog"
//         style={{ display: "block" }}
//       >
//         <img
//           className="shape-1"
//          src="assets/imgs/shape/shape-06.png"
//           alt="shape"
//         />
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="container">
//               <div className="row">
//                 {/* Testimonial Section */}
//                 <div className="col-md-6">
//                   <section className="testimonial-area section-spacing">
//                     <div className="container">
//                       <div className="testimonial-area-inner">
//                         <div className="section-header">
//                           <a href="index.html">
//                             <img
//                              src="assets/imgs/logo/logo.svg`}
//                               className="normal-logo"
//                               alt="Site Logo"
//                             />
//                           </a>
//                           <div className="section-title-wrapper">
//                             <div className="title-wrapper">
//                               <h2 className="title">
//                                 <span>
//                                   Start Your <br />
//                                   Journey
//                                 </span>{" "}
//                                 with us.
//                               </h2>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="testimonial-wrapper-box">
//                           <Swiper
//                             modules={[Navigation, Pagination, Autoplay]}
//                             slidesPerView={1}
//                             loop={true}
//                             navigation={{
//                               nextEl: ".testimonial-button-next",
//                               prevEl: ".testimonial-button-prev",
//                             }}
//                             pagination={{
//                               el: ".swiper-pagination",
//                               clickable: true,
//                             }}
//                             autoplay={{
//                               delay: 2500,
//                               disableOnInteraction: false,
//                             }}
//                           >
//                             <SwiperSlide>
//                               <div className="testimonial-content">
//                                 <div className="icon">
//                                   <img
//                                    src="assets/imgs/icon/icon-s-29.png"
//                                     alt="icon"
//                                   />
//                                 </div>
//                                 <div className="meta">
//                                   <h3 className="name">Simple</h3>
//                                 </div>
//                                 <div className="text-wrapper">
//                                   <p className="text">
//                                     We built Axpert simple on purpose. Process
//                                     owners and business analysts can collaborate
//                                     with developers to create a culture of
//                                     innovation.
//                                   </p>
//                                 </div>
//                               </div>
//                             </SwiperSlide>
//                             <SwiperSlide>
//                               <div className="testimonial-content">
//                                 <div className="icon">
//                                   <img
//                                    src="assets/imgs/icon/icon-s-30.png"
//                                     alt="icon"
//                                   />
//                                 </div>
//                                 <div className="meta">
//                                   <h3 className="name">Faster</h3>
//                                 </div>
//                                 <div className="text-wrapper">
//                                   <p className="text">
//                                     No-code workflows can be up and running in
//                                     hours. Fully functional apps can be ready in
//                                     days. Launch new applications every week.
//                                   </p>
//                                 </div>
//                               </div>
//                             </SwiperSlide>
//                             <SwiperSlide>
//                               <div className="testimonial-content">
//                                 <div className="icon">
//                                   <img
//                                    src="assets/imgs/icon/icon-s-31.png"
//                                     alt="icon"
//                                   />
//                                 </div>
//                                 <div className="meta">
//                                   <h3 className="name">Flexible</h3>
//                                 </div>
//                                 <div className="text-wrapper">
//                                   <p className="text">
//                                     Build kanban boards, automated workflows,
//                                     custom pages, dashboards, and integrations,
//                                     all on the same platform.
//                                   </p>
//                                 </div>
//                               </div>
//                             </SwiperSlide>
//                             <SwiperSlide>
//                               <div className="swiper-slide">
//                                 <div className="testimonial-content">
//                                   <div className="icon">
//                                     <img
//                                      src="assets/imgs/icon/icon-s-32.png"
//                                       alt="icon image"
//                                     />
//                                   </div>
//                                   <div className="meta">
//                                     <h3 className="name"> Powerful </h3>
//                                   </div>
//                                   <div className="text-wrapper">
//                                     <p className="text">
//                                       Axpert has everything developers need to
//                                       build complete applications including
//                                       reusable custom components and API
//                                       endpoints.{" "}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </SwiperSlide>
//                           </Swiper>
//                           <div className="nav-wrapper">
//                             <div className="testimonial-button-prev">
//                               <img
//                                src="assets/imgs/icon/arrow-left-long.png"
//                                 alt="prev"
//                               />
//                             </div>
//                             <div className="testimonial-button-next">
//                               <img
//                                src="assets/imgs/icon/arrow-right-long.png"
//                                 alt="next"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 </div>

//                 {/* Registration Form */}
//                 <div className="col-md-6">
//                   <div className="form-box-wrapper">
//                     <div className="register-form-box">
//                       <div className="btn-wrapper">
//                         <button
//                           className="close-btn"
//                           data-bs-dismiss="modal"
//                           onClick={closeModal}
//                         >
//                           <img
//                            src="assets/imgs/icon/cross.png"
//                             alt="close"
//                           />
//                         </button>
//                       </div>
//                       <div className="form-wrapper">
//                         <form className="user-form">
//                           <div className="input-field mandatory">
//                             <input
//                               type="text"
//                               placeholder="Organisation Name"
//                             />
//                           </div>
//                           <div className="input-field">
//                             <input
//                               type="text"
//                               placeholder="Organisation Size"
//                             />
//                           </div>
//                           <div className="input-field mandatory">
//                             <input type="text" placeholder="Name" />
//                           </div>
//                           <div className="input-field">
//                             <input type="text" placeholder="Designation" />
//                           </div>
//                           <div className="input-field mandatory">
//                             <input type="email" placeholder="Email" />
//                           </div>
//                           <div className="text_area input-field mandatory">
//                             <textarea
//                               id="comments"
//                               className="input-field mandatory"
//                               placeholder="Specifics of the requirement"
//                             ></textarea>
//                           </div>

//                           {/* <div className="input-field mandatory">
//                               <input type="password" placeholder="Password" />
//                             </div>
//                             <div className="input-field mandatory">
//                               <input
//                                 type="password"
//                                 placeholder="Confirm Password"
//                               />
//                             </div> */}
//                           <div className="policy-field">
//                             <input
//                               type="checkbox"
//                               id="d-policy"
//                               name="d-policy"
//                             />
//                             <label htmlFor="d-policy">
//                               I agree to Axpert{" "}
//                               <span>
//                                 <a href="#">Terms of Service.</a>
//                               </span>
//                             </label>
//                           </div>
//                           <button
//                             type="submit"
//                             className="subscribe-btn wc-btn-primary btn-text-flip"
//                           >
//                             <span data-text="Register">Submit</span>
//                           </button>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* End Registration Form */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Register = ({ closeModal, isConfigLoaded, config }) => {
  const [loading, setLoading] = useState(false); // Loader state
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  const userSource = (source && source === "Partner") ? "Partner" : "User";

  const [secretKey, setSecretKey] = useState(""); // Store the SecretKey token
  const [formData, setFormData] = useState({
    orgname: "",
    orgsize: "",
    uname: "",
    designation: "",
    usermail: "",
    specsforreq: "",
    iagree: false, // Add this for checkbox state
    usersource:userSource
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
      "https://metaspeed.agilecloud.biz/MetaspeedARMTest/api/v1/ARMGetEncryptedSecret",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SecretKey: "1015937249433270", // Replace with the actual input key if needed
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
    // Check for missing or empty form fields
    if (!formData.orgname || !formData.uname || !formData.usermail || !formData.specsforreq || !formData.iagree) {
      setAlertInfo({
        show: true,
        type: "error",
        message: "Please fill in all required fields.",
      });
      setLoading(false);
      return;
    }
  
    // Fetch the encrypted secret first
    getEncryptedSecret()


      .then((encryptedSecret) => {
        // Build the data after receiving the encrypted secret
        var tfval;
if(formData.iagree){
  tfval = "T"
}else{
  tfval = "F"
}
        const submitData = {
          SecretKey: encryptedSecret,
          publickey: "AXPKEY000000010000",
          project: "metaspeed",
          submitdata: {
            username: "admin",
            trace: "false",
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
                    usersource:formData.usersource,
                    iagree: tfval,
                  },
                },
              },
            },
          },
        };
        console.log("Submit Data:", submitData); // Log the final payload for debugging
        // Submit the data to the endpoint
        return fetch("https://metaspeed.agilecloud.biz/MetaspeedARMTest/api/v1/ARMExecuteAPI", {
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
            console.error("Error Data:", errorData); // Log detailed error response
      
            const errorMessage = errorData.message || "Unknown error occurred.";
      
            // Ensure errorData.message exists and contains the expected text
            if (errorMessage.includes("Duplicate values are not allowed in User Mail ID")) {
              setAlertInfo({
                show: true,
                type: "error",
                message: `The email ID ${formData.usermail} is already registered.`,
              });
              setLoading(false);
              setTimeout(() => {
                window.location.href = "/"; // Redirect after 3 seconds
              }, 2000);
      
              return; // Stop further execution
            }
      
          })
        }
        return response.json(); // Parse JSON response if successful
      })
      
      .then((result) => {
        console.log("API Response:", result); // Log the response for debugging
        
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
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/"; // Redirect after success
          }, 2000);
          
        } else {
          // Handle duplicate email error when API returns success: false
          if (result.message.includes("Duplicate values are not allowed in User Mail ID")) {
            setAlertInfo({
              show: true,
              type: "error",
              message: `Error: The email ID ${formData.usermail} is already registered.`,
            });
            setLoading(false);
  
            setTimeout(() => {
              window.location.href = "/"; // Redirect after 2 seconds
            }, 2000);
          } else {
            setAlertInfo({
              show: true,
              type: "error",
              message: "Something went wrong. Please try again later.",
            });
          }
        }
      })
      // .catch((error) => {
      //   console.error("Error submitting data:", error);
      //   setAlertInfo({
      //     show: true,
      //     type: "error",
      //     message: "Something went wrong. Please try again later.",
      //   });
      // });
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
            <div className="container">
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
                                    src='assets/imgs/icon/icon-s-29.png'
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
                                    src='assets/imgs/icon/icon-s-30.png'
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
                                    src='assets/imgs/icon/icon-s-31.png'
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
                                      src='assets/imgs/icon/icon-s-32.png'
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
                          <img
                           src="assets/imgs/icon/cross.png"
                            alt="close"
                          />
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
                              <Alert variant="filled"
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

// const Register = ({ closeModal }) => {
//   const [secretKey, setSecretKey] = useState(""); // Store the SecretKey token
//   const [formData, setFormData] = useState({
//     orgname: "",
//     orgsize: "",
//     uname: "",
//     designation: "",
//     usermail: "",
//     upassword: "",
//     confirmupassword: "",
//   });
//    const config = useConfig()

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const getEncryptedSecret = async () => {
//     try {
//       const response = await fetch(
//         "https://metaspeed.agilecloud.biz/MetaspeedARM/api/v1/ARMGetEncryptedSecret",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             SecretKey: "1015937249433270", // Replace with the actual input key if needed
//           }),
//         }
//       );
//       const data = await response.json();
//       if (data && data.SecretKey) {
//         setSecretKey(data.SecretKey); // Update SecretKey in state
//       }
//     } catch (error) {
//       console.error("Error fetching encrypted secret:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     debugger;
//     e.preventDefault();
//     await getEncryptedSecret(); // Fetch encrypted secret token

//     const submitData = {
//       SecretKey: secretKey,
//       publickey: config.publickey,
//       project: config.project,
//       submitdata: {
//         username: "admin",
//         trace: "false",
//         keyfield: "",
//         dataarray: {
//           data: {
//             mode: "new",
//             keyvalue: "",
//             recordid: "0",
//             dc1: {
//               row1: {
//                 orgname: formData.orgname,
//                 orgsize: formData.orgsize,
//                 uname: formData.uname,
//                 designation: formData.designation,
//                 usermail: formData.usermail,
//                 upassword: formData.upassword,
//                 confirmupassword: formData.confirmupassword,
//               },
//             },
//           },
//         },
//       },
//     };

//     try {
//       const response = await fetch(
//         "https://metaspeed.agilecloud.biz/MetaspeedARM/api/v1/ARMExecuteAPI",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(submitData),
//         }
//       );
//       const result = await response.json();
//       console.log("API Response:", result);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Testimonial Slider Section */}
//       <div className="testimonial-slider">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           slidesPerView={1}
//           loop={true}
//           navigation={{
//             nextEl: ".testimonial-button-next",
//             prevEl: ".testimonial-button-prev",
//           }}
//           pagination={{
//             el: ".swiper-pagination",
//             clickable: true,
//           }}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//         >
//           <SwiperSlide>Slide 1</SwiperSlide>
//           <SwiperSlide>Slide 2</SwiperSlide>
//           <SwiperSlide>Slide 3</SwiperSlide>
//         </Swiper>

//         {/* Pagination */}
//         <div className="swiper-pagination"></div>

//         {/* Navigation buttons */}
//         <div className="testimonial-button-next">Next</div>
//         <div className="testimonial-button-prev">Prev</div>
//       </div>

//       {/* Modal for Registration */}
//       <div
//         className="modal fade show"
//         id="signupform"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-modal="true"
//         role="dialog"
//         style={{ display: "block" }}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-6">
//                   {/* Testimonial Section */}
//                   <section className="testimonial-area section-spacing">
//                     <div className="container">
//                       <div className="testimonial-area-inner">
//                         {/* Testimonial slider omitted for brevity */}
//                       </div>
//                     </div>
//                   </section>
//                 </div>

//                 <div className="col-md-6">
//                   <div className="form-box-wrapper">
//                     <div className="register-form-box">
//                       <div className="btn-wrapper">
//                         <button
//                           className="close-btn"
//                           data-bs-dismiss="modal"
//                           onClick={closeModal}
//                         >
//                           <img
//                            src="assets/imgs/icon/cross.png"
//                             alt="close"
//                           />
//                         </button>
//                       </div>
//                       <div className="form-wrapper">
//                         <form className="user-form" onSubmit={handleSubmit}>
//                           <div className="input-field mandatory">
//                             <input
//                               type="text"
//                               name="orgname"
//                               value={formData.orgname}
//                               onChange={handleInputChange}
//                               placeholder="Organisation Name"
//                             />
//                           </div>
//                           <div className="input-field">
//                             <input
//                               type="text"
//                               name="orgsize"
//                               value={formData.orgsize}
//                               onChange={handleInputChange}
//                               placeholder="Organisation Size"
//                             />
//                           </div>
//                           <div className="input-field mandatory">
//                             <input
//                               type="text"
//                               name="uname"
//                               value={formData.uname}
//                               onChange={handleInputChange}
//                               placeholder="Name"
//                             />
//                           </div>
//                           <div className="input-field">
//                             <input
//                               type="text"
//                               name="designation"
//                               value={formData.designation}
//                               onChange={handleInputChange}
//                               placeholder="Designation"
//                             />
//                           </div>
//                           <div className="input-field mandatory">
//                             <input
//                               type="email"
//                               name="usermail"
//                               value={formData.usermail}
//                               onChange={handleInputChange}
//                               placeholder="Email"
//                             />
//                           </div>
//                           <div className="text_area input-field mandatory">
//                             <textarea
//                               id="comments"
//                               name="specifics"
//                               className="input-field mandatory"
//                               value={formData.specifics}
//                               onChange={handleInputChange}
//                               placeholder="Specifics of the requirement"
//                             ></textarea>
//                           </div>
//                           <div className="policy-field">
//                             <input
//                               type="checkbox"
//                               id="d-policy"
//                               name="agreeToTerms"
//                               checked={formData.agreeToTerms}
//                               onChange={handleInputChange}
//                             />
//                             <label htmlFor="d-policy">
//                               I agree to Axpert{" "}
//                               <span>
//                                 <a href="#">Terms of Service.</a>
//                               </span>
//                             </label>
//                           </div>
//                           <button
//                             type="submit"
//                             className="subscribe-btn wc-btn-primary btn-text-flip"
//                           >
//                             <span data-text="Register">Submit</span>
//                           </button>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

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
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
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
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
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

const Offcanvas = () => {
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
          <a
            target="_blank"
            href="#"
            className="wc-btn wc-btn-default btn-hover-cropping"
          >
            SCHEDULE A FREE DEMO
          </a>
        </div>
      </div>
      <div className="offcanvas-area-menu-wrapper">
        <ul id="accordion" className="accordion">
          <li>
            <a href=""> Home</a>
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
              {/* <li>
                <a
                  href="https://agile-labs.com/axpert-in-action/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Axpert
                </a>
              </li> */}
              <li>
                <a
                  href="https://agile-labs.com/the-team/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="https://agile-labs.com/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Company
                </a>
              </li>
              {/* <li><a href="#">Axpert in Government</a></li> */}
            </ul>
          </li>
          {/* <li className=""><a href="#">App Store</a></li> */}
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <a
              href="https://agile-labs.com/partners/"
             
              target="_blank"
              rel="noopener noreferrer"
            >
              Partner with us
            </a>
          </li>
          <li>
            <a
              href="https://agile-labs.com/index.php/contact-us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SearchModal = () => (
  <div
    className="modal fade"
    id="search-template"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="search-template"
    aria-hidden="true"
  >
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <form action="#" className="form-search">
            <input type="text" placeholder="Search" />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const Header = () => {
  const [active, setActive] = useState("Home");
  const [isSticky, setIsSticky] = useState(false); 
  const handleLoad = (link) => {
    setActive(link); // Set the active link
  };
  const location = useLocation();

  const openSignInPage = () => {
    window.open(
      "https://metaspeed.agilecloud.biz/Metaspeed/aspx/signin.aspx",
      "_blank" // Opens in a new tab
    );
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
    <header className={`header-area style-1 pos-abs zi-9 ${isSticky ? "sticky" : ""}`}>
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
                    className={location.pathname.startsWith("/partner") ? "active" : ""}
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
            href="#"
            class="wc-btn wc-btn-primary btn-text-flip bordered video-popup"
            onClick={(e) => {
              e.preventDefault();
              openSignInPage(); // Call openModal function passed from Home
            }}
          >
            {" "}
            <span data-text="Sign In">Sign In</span>
          </a>
          <CountryDropdown/>
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
    </header>
  );
};
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
    <section
      id="carouselExampleDark"
      className="hero-area section-spacing pb-0 carousel carousel-dark slide"
      data-bs-ride="carousel"
      data-bs-wrap="true"
      data-bs-pause="hover"
    >
      <div className="hero-area-bg"></div>
      <div className="container">
        <div className="carousel-inner hero-area-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <div className="section-header">
              <div className="shape-1 wc-y-anim">
                <img
                 src="assets/imgs/shape/cube.png"
                  alt="shape image"
                />
              </div>
              <div className="shape-1 orange">
                <img
                 src="assets/imgs/shape/shape-s-1.png"
                  alt="shape image"
                />
              </div>
              {/* <div className="shape-1 Bfly">
                  <imgsrc="assets/imgs/shape/shape-s-28.png" alt="shape image" />
                </div> */}
              <div className="section-title-wrapper">
                {/* <div className="subtitle-wrapper">
                    <span className="section-subtitle has_fade_anim">Get 50 Hours free usage of AXO products</span>
                  </div> */}
                <img
                  className="patented"
                 src="assets/imgs/icon/patented.png"
                  alt="patented"
                />
                <div className="title-wrapper">
                  <h1 className="section-title has_fade_anim" data-delay="0.25">
                    Manage Your Business <br /> Online with ease
                  </h1>
                </div>
              </div>
              <div className="text-wrapper">
                <p className="text has_fade_anim" data-delay="0.35">
                  {/* Axpert is a unified and reliable software application platform across business functions and verticals */}
                  Experience a unified and reliable software application
                  platform that leverages the latest technologies. Achieve
                  vendor independence and gain the power to proactively shape
                  your business future.
                </p>
              </div>
              <div className="btn-wrapper has_fade_anim" data-delay="0.45">
                {/* <a href="#" className="wc-btn wc-btn-primary btn-text-flip" onClick={openModal}>
                              <span data-text="Get Started">Get Started</span>
                            </a> */}
                <a
                  href="#"
                  className="wc-btn wc-btn-primary btn-text-flip bordered video-popup"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    openModal(); // Call the openModal function
                  }}
                >
                  <span data-text="SCHEDULE A FREE DEMO">
                    SCHEDULE A FREE DEMO
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <div className="section-header">
              <div className="shape-1 wc-y-anim">
                <img
                 src="assets/imgs/shape/cube.png"
                  alt="shape image"
                />
              </div>
              <div className="shape-1 orange">
                <img
                 src="assets/imgs/shape/shape-s-1.png"
                  alt="shape image"
                />
              </div>
              {/* <div className="shape-1 Bfly">
                  <imgsrc="assets/imgs/shape/shape-s-28.png" alt="shape image" />
                </div> */}
              <div className="section-title-wrapper">
                <div className="subtitle-wrapper">
                  <span className="section-subtitle has_fade_anim">
                    Get 50 Hours free usage of Metaspeed products
                  </span>
                </div>
                <div className="title-wrapper">
                  <h1 className="section-title has_fade_anim" data-delay="0.25">
                    A global online <br /> business platform.
                  </h1>
                </div>
              </div>
              <div className="text-wrapper">
                <p className="text has_fade_anim" data-delay="0.35">
                  {/* Axpert is a unified and reliable software application platform across business functions and verticals */}
                  Experience a unified and reliable software application
                  platform that leverages the latest technologies. Achieve
                  vendor independence and gain the power to proactively shape
                  your business future.
                </p>
              </div>
              <div className="btn-wrapper has_fade_anim" data-delay="0.45">
                {/* <a
                              href="#"
                              className="wc-btn wc-btn-primary btn-text-flip"
                            >
                              <span data-text="Get Started">Get Started</span>
                            </a> */}
                <a
                  href=""
                  className="wc-btn wc-btn-primary btn-text-flip bordered video-popup"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    openModal(); // Call the openModal function
                  }}
                >
                  <span data-text="SCHEDULE A FREE DEMO">
                    SCHEDULE A FREE DEMO
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

const BrandArea = () => {
  return (
    <div className="brand-area section-spacing-bottom has_fade_anim">
      <div className="container">
        <div className="text-wrapper">
          <p className="text has_fade_anim">
            Axpert software trusted by the great companies
          </p>
        </div>
        <div className="brand-logos">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={4} // Adjust based on design
            autoplay={{
              delay: 200, // Set delay to 3 seconds
              disableOnInteraction: false,
            }}
            loop={true} // Infinite scrolling
            speed={4000} // Transition duration set to 300ms
            a11y={{ enabled: true }} // Enable accessibility
            spaceBetween={20} // Default space for larger screens
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
                slidesPerView: 4,
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
                   src="assets/imgs/partners/${logo}.png"
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
const ReviewArea = () => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".has_fade_anim");

    // Define the intersection observer to add the 'visible' class when the element is in view
    const observerOptions = {
      root: null, // Observe the viewport
      rootMargin: "0px",
      threshold: 0.5, // Trigger when the element is 50% in the viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing after the element is visible
        }
      });
    }, observerOptions);

    fadeElements.forEach((element) => observer.observe(element));

    return () => {
      fadeElements.forEach((element) => observer.unobserve(element)); // Cleanup observer on unmount
    };
  }, []);

  return (
    <div className="pt-4">
      <section
        className="review-area section-spacing pin__area"
        style={{ padding: "30px" }}
      >
        <div className="shape">
          <img
           src="assets/imgs/shape/shape-r-24.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="review-inner">
            <div className="section-heading pin__element">
              <div className="subtitle-wrapper">
                <p className="subtitle has_fade_anim">
                  <img
                   src="assets/imgs/icon/icon-r-17.png"
                    alt="icon"
                  />{" "}
                  User’s Feedback
                </p>
              </div>
              <div className="section-title-wrapper">
                <h2 className="section-title has_fade_anim">
                  Our happy users say
                </h2>
              </div>
              <div className="text-wrapper">
                <p className="text has_fade_anim">
                  Combine collaborative development with a lightning fast
                  platform
                  <br />
                  and start seeing the results of automated applications
                  immediately.
                </p>
              </div>
            </div>

            {/* <div className="review-list">
              {[1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className={`review-list-item r-${item} testimonial__item has_fade_anim`}
                >
                  <div className="content">
                    <img
                     src="assets/imgs/icon/icon-r-35.png"
                      className="quote-icon"
                      alt="icon"
                    />
                    <div className="text-wraper">
                      <p className="text">
                        Axpert on awesome websites in the past allowing you to
                        focus your not pretty simply website...
                      </p>
                    </div>
                    <div className="count-wrapper">
                      {[30, 25, 60].map((percentage, i) => (
                        <div key={i} className="count">
                          <h2 className="count-title">{percentage}%</h2>
                          <h3 className="count-defination">
                            {i === 0
                              ? "Improvement"
                              : i === 1
                              ? "Revenue"
                              : "Increase Sales"}
                          </h3>
                        </div>
                      ))}
                    </div>
                    <div className="meta-info">
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/imgs/icon/icon-r-${36 + item}.png"
                        alt="meta-icon"
                      />
                      <h3 className="name">
                        {item === 1
                          ? "Krista K. Monogram"
                          : item === 2
                          ? "Sergey K.Erdoğan"
                          : "Angela S.Shawver"}
                      </h3>
                    </div>
                  </div>
                  <div className="thumb">
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/assets/imgs/gallery/img-r-${35 + item}.png"
                      alt="thumb"
                    />
                  </div>
                </div>
              ))}
            </div> */}
            <div className="testimonial-wrapper-box">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={20}  // Default to 1 card on mobile view
                loop={true}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  768: {  // On screens 768px or larger, show 2 cards
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                }}
                navigation={{
                  nextEl: ".testimonial-button-next",  // Right arrow class
                  prevEl: ".testimonial-button-prev",  // Left arrow class
                }}
              >
                <SwiperSlide>
                  <div class="review-list-item r-1 testimonial__item">
                    <div class="content">
                      <img
                       src="assets/imgs/icon/icon-r-35.png"
                        class="quote-icon"
                        alt="icon"
                      />
                      <div class="text-wraper">
                        <p class="text">
                          Axpert on awesome websites in the past allowing you to
                          focus your not pretty simply website...
                        </p>
                      </div>
                      <div class="count-wrapper">
                        <div class="count">
                          <h2 class="count-title">30%</h2>
                          <h3 class="count-defination">Improvement</h3>
                        </div>
                        <div class="count">
                          <h2 class="count-title">25%</h2>
                          <h3 class="count-defination">Revenue</h3>
                        </div>
                        <div class="count">
                          <h2 class="count-title">60%</h2>
                          <h3 class="count-defination">Increase Sales</h3>
                        </div>
                      </div>
                      <div class="meta-info">
                        <img
                         src="assets/imgs/icon/icon-r-36.png"
                          alt="meta-icon"
                        />
                        <h3 class="name">Krista K. Monogram</h3>
                      </div>
                    </div>
                    <div class="thumb">
                      <img
                       src="assets/imgs/gallery/img-r-36.png"
                        alt="thumb"
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="review-list-item r-2 testimonial__item">
                    <div class="content">
                      <img
                       src="assets/imgs/icon/icon-r-41.png"
                        class="quote-icon"
                        alt="icon"
                      />
                      <div class="text-wraper">
                        <p class="text">
                          Axpert on awesome websites in the past allowing you to
                          focus your not pretty simply website...
                        </p>
                      </div>
                      <div class="count-wrapper">
                        <div class="count">
                          <h2 class="count-title">30%</h2>
                          <h3 class="count-defination">Improvement</h3>
                        </div>
                        <div class="count">
                          <h2 class="count-title">25%</h2>
                          <h3 class="count-defination">Revenue</h3>
                        </div>
                        <div class="count">
                          <h2 class="count-title">60%</h2>
                          <h3 class="count-defination">Increase Sales</h3>
                        </div>
                      </div>
                      <div class="meta-info">
                        <img
                         src="assets/imgs/icon/icon-r-37.png"
                          alt="meta-icon"
                        />
                        <h3 class="name">Sergey K.Erdoğan</h3>
                      </div>
                    </div>
                    <div class="thumb">
                      <img
                       src="assets/imgs/gallery/img-r-37.png"
                        alt="thumb"
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div class="review-list-item r-3 testimonial__item">
                    <div class="content">
                      <img
                       src="assets/imgs/icon/icon-r-42.png"
                        class="quote-icon"
                        alt="icon"
                      />
                      <div class="text-wraper">
                        <p class="text">
                          Axpert on awesome websites in the past allowing you to
                          focus your not pretty simply website...
                        </p>
                      </div>
                      <div class="count-wrapper">
                        <div class="count">
                          <h2 class="count-title">30%</h2>
                          <h3 class="count-defination">Improvement</h3>
                        </div>
                        <div class="count">
                          <h2 class="count-title">25%</h2>
                          <h3 class="count-defination">Revenue</h3>
                        </div>
                        <div class="count">
                          <h2 class="count-title">60%</h2>
                          <h3 class="count-defination">Increase Sales</h3>
                        </div>
                      </div>
                      <div class="meta-info">
                        <img
                         src="assets/imgs/icon/icon-r-38.png"
                          alt="meta-icon"
                        />
                        <h3 class="name">Angela S.Shawver</h3>
                      </div>
                    </div>
                    <div class="thumb">
                      <img
                       src="assets/imgs/gallery/img-r-38.png"
                        alt="thumb"
                      />
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
              {/* <div className="nav-wrapper">
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
                            </div> */}
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
};
const FeaturesArea = () => {
  return (
    <section className="features-area section-spacing pb-0">
      <div className="container">
        <div className="features-area-inner">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title has_fade_anim ">
                  See Agilecloud offerings
                </h2>
              </div>
            </div>
            <div className="text-wrapper">
              <p className="text has_fade_anim " data-delay="0.25">
                Create tasks with various custom statuses to keep track of the
                progress of each why in the process for your business
              </p>
            </div>
          </div>
          <div className="features-wrapper-box">
            <img
              className="shape-1"
             src="assets/imgs/shape/shape-06.png"
              alt="shape image"
            />
            <div className="shape-2 wc-y-anim">
              <img
               src="assets/imgs/shape/shape-07.png"
                alt="shape image"
              />
            </div>
            <div className="features-wrapper">
              <div className="has_fade_anim ">
                <a href=" ">
                  <div className="feature-box">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-s-1.png"
                        alt="feature icon"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">HR payroll</h3>
                      <p className="text">
                        Streamline your HR and payroll with our intuitive and{" "}
                        <br /> powerful software. Simplify compliance, boost
                        efficiency, and empower your workforce.
                      </p>
                      <a href="https://example.com" target="_blank">
                        <button class="wc-btn wc-btn-normal">
                          Explore More<i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </a>
              </div>
              <div className="has_fade_anim " data-delay="0.25">
                <a href=" " className="feature-link">
                  <div className="feature-box">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-s-2.png"
                        alt="feature icon"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">ERP</h3>
                      <p className="text">
                        Unlocking business potential with robust and
                        user-friendly ERP solutions. <br />
                        Increase efficiency, reduce costs, and drive growth.
                      </p>
                      <a
                        href={`${process.env.PUBLIC_URL}/ERPNew.html`}
                        target="_blank"
                      >
                        <button class="wc-btn wc-btn-normal">
                          Explore More<i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </a>
              </div>

              {/* <div className="has_fade_anim" data-delay="0.35">
  <div className="feature-box">
    <a href=" " className="feature-link">
      <div className="thumb">
        <img
         src="assets/imgs/icon/icon-s-3.png"
          alt="feature icon"
        />
      </div>
    </a>
    <div className="content">
      <h3 className="title">Hospital Management</h3>
      <p className="text">
        Build online communities with effective audience communication with various track
      </p>
      <a href=" " className="wc-btn wc-btn-normal">
        Try Now<i className="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  </div>
</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Integrationarea = () => {
  return (
    <div className="integration-area section-spacing ">
      <div className="container">
        <div className="integration-area-inner ">
          <div className="shape-1">
            <img
             src="assets/imgs/shape/shape-s-54.png"
              data-speed="0.8"
              alt="shape image"
            />
          </div>
          <div className="shape-2">
            <img
             src="assets/imgs/shape/shape-s-28.png"
              data-speed="0.8"
              alt="shape image"
            />
          </div>
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="title-wrapper has_fade_anim ">
                <h2 className="section-title has_fade_anim">
                  See Agilecloud offerings <br />
                </h2>
              </div>
            </div>
            <div className="text-wrapper has_fade_anim">
              <p className="text has_fade_anim">
                Winners never quit and quitters never win. Take all negative
                words out of your mental dictionary
              </p>
            </div>
          </div>
          <div className="integration-cards-wrapper">
            <ul
              className="nav nav-pills has_fade_anim"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-first-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-first"
                  type="button"
                  role="tab"
                  aria-controls="pills-first"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-second-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-second"
                  type="button"
                  role="tab"
                  aria-controls="pills-second"
                  aria-selected="false"
                >
                  Portal
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-third-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-third"
                  type="button"
                  role="tab"
                  aria-controls="pills-third"
                  aria-selected="false"
                >
                  CRM
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-fourth-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-fourth"
                  type="button"
                  role="tab"
                  aria-controls="pills-fourth"
                  aria-selected="false"
                >
                  Tools
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-fifth-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-fifth"
                  type="button"
                  role="tab"
                  aria-controls="pills-fifth"
                  aria-selected="false"
                >
                  Others
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-first"
                role="tabpanel"
                aria-labelledby="pills-first-tab"
                tabIndex="0"
              >
                <div className="integration-cards">
                  <div className="has_fade_anim">
                    <div className="integration-card">
                      <div className="thumb">
                        <img
                         src="assets/imgs/icon/icon-int-1.png"
                          alt="icon image"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Trading<span>ERP</span>
                        </h3>
                        <p className="text">
                          Build online forms and reports for every business
                          needs.
                        </p>
                        <a href=" " className="wc-btn wc-btn-normal">
                          Try Now
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="has_fade_anim" data-delay="0.25">
                    <div className="integration-card">
                      <div className="thumb">
                        <img
                         src="assets/imgs/icon/icon-int-2.png"
                          alt="icon image"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Asset Management<span>Tools</span>
                        </h3>
                        <p className="text">
                          Build online forms and reports for every business
                          needs.
                        </p>
                        <a href=" " className="wc-btn wc-btn-normal">
                          Try Now
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="has_fade_anim" data-delay="0.35">
                    <div className="integration-card">
                      <div className="thumb">
                        <img
                         src="assets/imgs/icon/icon-int-3.png"
                          alt="icon image"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Health<span>Portal</span>
                        </h3>
                        <p className="text">
                          Build online forms and reports for every business
                          needs.
                        </p>
                        <a href=" " className="wc-btn wc-btn-normal">
                          Try Now
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="has_fade_anim">
                    <div className="integration-card">
                      <div className="thumb">
                        <img
                         src="assets/imgs/icon/icon-int-4.png"
                          alt="icon image"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Helpdesk<span>Others</span>
                        </h3>
                        <p className="text">
                          Build online forms and reports for every business
                          needs.
                        </p>
                        <a href=" " className="wc-btn wc-btn-normal">
                          Try Now
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="has_fade_anim" data-delay="0.25">
                    <div className="integration-card">
                      <div className="thumb">
                        <img
                         src="assets/imgs/icon/icon-int-5.png"
                          alt="icon image"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          POS<span>ERP</span>
                        </h3>
                        <p className="text">
                          Build online forms and reports for every business
                          needs.
                        </p>
                        <a href=" " className="wc-btn wc-btn-normal">
                          Try Now
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="has_fade_anim" data-delay="0.35">
                    <div className="integration-card">
                      <div className="thumb">
                        <img
                         src="assets/imgs/icon/icon-int-6.png"
                          alt="icon image"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          HR & Payroll<span>ERP</span>
                        </h3>
                        <p className="text">
                          Build online forms and reports for every business
                          needs.
                        </p>
                        <a href=" " className="wc-btn wc-btn-normal">
                          Try Now
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="pills-second"
                role="tabpanel"
                aria-labelledby="pills-second-tab"
                tabIndex="0"
              >
                <div className="integration-cards">
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-1.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google
                        <span>CRM</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-2.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Spotify
                        <span>Online Platform</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-3.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Dropbox
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-4.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Zapier
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-5.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        MODX GPT
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-6.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google Photos
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-third"
                role="tabpanel"
                aria-labelledby="pills-third-tab"
                tabIndex="0"
              >
                <div className="integration-cards">
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-1.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google
                        <span>CRM</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-2.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Spotify
                        <span>Online Platform</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-3.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Dropbox
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-4.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Zapier
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-5.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        MODX GPT
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-6.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google Photos
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-fourth"
                role="tabpanel"
                aria-labelledby="pills-fourth-tab"
                tabIndex="0"
              >
                <div className="integration-cards">
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-1.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google
                        <span>CRM</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-2.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Spotify
                        <span>Online Platform</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-3.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Dropbox
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-4.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Zapier
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-5.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        MODX GPT
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-6.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google Photos
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-fifth"
                role="tabpanel"
                aria-labelledby="pills-fifth-tab"
                tabIndex="0"
              >
                <div className="integration-cards">
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-1.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google
                        <span>CRM</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-2.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Spotify
                        <span>Online Platform</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-3.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Dropbox
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-4.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Zapier
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-5.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        MODX GPT
                        <span>Streaming</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="integration-card">
                    <div className="thumb">
                      <img
                       src="assets/imgs/icon/icon-int-6.png"
                        alt="icon image"
                      />
                    </div>
                    <div className="content">
                      <h3 className="title">
                        Google Photos
                        <span>Social Media</span>
                      </h3>
                      <p className="text">
                        Build online forms for every business needs.
                      </p>
                      <a href=" " className="wc-btn wc-btn-normal">
                        Try Now<i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Choosearea = () => {
  return (
    <section className="choose-area">
      <div className="container">
        <div className="choose-area-inner">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div
                className="title-wrapper"
                style={{
                  position: "relative",
                  zIndex: "10",
                }}
              >
                <h2
                  className="section-title has_fade_anim"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                  }}
                >
                  Choose us to make your business easy
                </h2>
                <div className="meta">
                  <div className="text-wrapper">
                    <p
                      className="text has_fade_anim"
                      style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                        opacity: 1,
                      }}
                    >
                      Automation builder your performance and more-all from a
                      single platform.
                    </p>
                  </div>
                  <div
                    className="btn-wrapper has_fade_anim"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transform: "translate(0px, 0px)",
                      opacity: 1,
                    }}
                  >
                    {/* <a
              href="#"
              className="wc-btn wc-btn-underline btn-text-flip"
            >
              <span data-text="Book a demo">Book a demo</span>
            </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="choose-cards-wrapper">
            <div className="choose-cards">
              <div
                className="has_fade_anim"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
              >
                <a href="#">
                  <div className="choose-card-box">
                    <div className="title-wrapper">
                      <p className="title">Quick message reply in one click.</p>
                    </div>
                    <div className="text-wrapper">
                      <p className="text">24/7 hours available</p>
                    </div>
                    <div className="thumb-wrapper">
                      <img
                       src="assets/imgs/icon/icon-s-15.png"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </div>
              <div
                className="has_fade_anim"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
              >
                <a href="#">
                  <div className="choose-card-box">
                    <div className="title-wrapper">
                      <p className="title">
                        Fully responsive layout, work in multiple device
                      </p>
                    </div>
                    <div className="text-wrapper">
                      <p className="text">For all the device</p>
                    </div>
                    <div className="thumb-wrapper">
                      <img
                       src="assets/imgs/icon/icon-s-16.png"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </div>
              <div
                className="has_fade_anim"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
              >
                <a href="#">
                  <div className="choose-card-box">
                    <div className="title-wrapper">
                      <p className="title">Get instant support for all day.</p>
                    </div>
                    <div className="text-wrapper">
                      <p className="text">Getting ready</p>
                    </div>
                    <div className="thumb-wrapper">
                      <img
                       src="assets/imgs/icon/icon-s-17.png"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Performance = ({ openModal }) => {
  return (
    <section className="performance-area section-spacing pin__area">
      <div className="container">
        <div className="performance-area-inner">
          <div className="section-content pin__element">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <img
                  className="subtitle-img"
                 src="assets/imgs/shape/shape-27-01-2.png"
                  alt="subtitle"
                />
                <span className="section-subtitle has_fade_anim">
                  Why Axpert ?
                </span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title has_fade_anim">
                  Simple but powerful
                </h2>
              </div>
            </div>
            <div className="text-wrapper">
              <p className="text has_fade_anim">
                The only way you can clear your backlog is with a platform built
                for everyone
              </p>
            </div>
            <div className="btn-wrapper has_fade_anim">
              <a
                href=" "
                className="wc-btn wc-btn-primary btn-text-flip"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  openModal(); // Call the openModal function
                }}
              >
                <span data-text="SCHEDULE A FREE DEMO">
                  SCHEDULE A FREE DEMO
                </span>
              </a>
            </div>
          </div>
          <div className="performance-features-wrapper-box">
            <div className="performance-features-wrapper has_fade_anim">
              <div className="feature-box">
                <div className="thumb">
                  <img
                   src="assets/imgs/icon/icon-s-29.png"
                    alt="feature icon"
                  />
                </div>
                <div className="content">
                  <h3 className="title">Simple</h3>
                  <p className="text">
                    We built Axpert simple on purpose. Process owners and
                    business analysts can collaborate with developers to create
                    a culture of innovation.
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <div className="thumb">
                  <img
                   src="assets/imgs/icon/icon-s-30.png"
                    alt="feature icon"
                  />
                </div>
                <div className="content">
                  <h3 className="title">Fast</h3>
                  <p className="text">
                    No-code workflows can be up and running in hours. Fully
                    functional apps can be ready in days. Launch new
                    applications every week.
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <div className="thumb">
                  <img
                   src="assets/imgs/icon/icon-s-31.png"
                    alt="feature icon"
                  />
                </div>
                <div className="content">
                  <h3 className="title">Flexible</h3>
                  <p className="text">
                    Build kanban boards, automated workflows, custom pages,
                    dashboards, and integrations, all on the same platform.
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <div className="thumb">
                  <img
                   src="assets/imgs/icon/icon-s-32.png"
                    alt="feature icon"
                  />
                </div>
                <div className="content">
                  <h3 className="title">Powerful</h3>
                  <p className="text">
                    Axpert has everything developers need to build complete
                    applications including reusable custom components and API
                    endpoints.
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

const Rating = () => {
  return (
    <section className="rating-area section-spacing">
      <div className="container">
        <div className="rating-area-inner">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title has_fade_anim">
                  Highly rated software by customers
                </h2>
              </div>
            </div>
            <div className="text-wrapper">
              <p className="text has_fade_anim">
                Deliver happiness to your customers and get them to adore you!
                Desk helps you be more accessible
              </p>
            </div>
          </div>
          <div className="ratings-wrapper-box">
            <div className="ratings-wrapper has_fade_anim">
              <div className="rating-image">
                <img
                 src="assets/imgs/gallery/img-s-30.png"
                  alt="rating image"
                />
              </div>
              <div className="rating-image">
                <img
                 src="assets/imgs/gallery/img-s-31.png"
                  alt="rating image"
                />
              </div>
              <div className="rating-image">
                <img
                 src="assets/imgs/gallery/img-s-32.png"
                  alt="rating image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  {
    /* Rating Area End */
  }
};
const Footer = () => {
  return (
    <footer className="footer-area style-1">
      <div className="container">
        <div className="footer-area-inner">
          <div className="footer-widget-wrapper">
            <div className="footer-logo">
              <img
               src="assets/imgs/logo/logo-white.svg"
                alt="site-logo"
              />
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
                <a href="https://agile-labs.com/index.php/contact-us">Contact Us</a>
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
export {
  Preloader,
  ScrollToTop,
  Offcanvas,
  SearchModal,
  FirstSection,
  Header,
  BrandArea,
  ReviewArea,
  FeaturesArea,
  Integrationarea,
  Choosearea,
  Performance,
  Rating,
  Footer,
  Register
};
