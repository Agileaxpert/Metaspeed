import React, { useState, useEffect } from "react";
import { BrandArea, ScrollToTop } from "./Sample";
import "../Pages/Pricing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Box, TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Accordion } from "react-bootstrap";

const Pricing = () => {
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

  const [open, setOpen] = useState(false);
// modalpopup get in touch open
  const [selectedPlan, setSelectedPlan] = useState("");
  const [extraField, setExtraField] = useState(false);
  const [textInput, setTextInput] = useState("");
// modalpopup get in touch close

  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [particulars, setParticulars] = useState("");
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
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
  const handleOpen = (particularsValue,showExtraField = false) => {
    let finalParticulars = particularsValue;

  // If "Get in Touch" is clicked, append `textInput`
  if (showExtraField) {
    finalParticulars += ` - ${textInput}`;
  }
    setParticulars(finalParticulars); // Set the selected plan
    setExtraField(showExtraField)
    setOpen(true); // Open the modal
  };
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setContactNum("");
    setParticulars("");
    setTextInput("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // 1. First API Call to get the token
      const getEncryptedSecret = () => {
        return fetch(
          "https://metaspeed.agilecloud.biz/MetaspeedARMTest/api/v1/ARMGetEncryptedSecret",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              SecretKey: "7063739255674100", // Replace with actual key if needed
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Use `.text()` for the token response
          })
          .catch((error) => {
            console.error("Error fetching encrypted secret:", error);
            throw error; // Propagate the error
          });
      };

      getEncryptedSecret()
        .then((token) => {
          console.log("Encrypted Secret (Token):", token); // Log for debugging

          // 2. Second API Call to submit the form data
          const submitData = {
            SecretKey: token, // Use the token from the first API call
            publickey: "AXPKEYUSERQ0000001",
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
                      contactno: contactNum,
                      contactname: email, // Pass email here
                      particulars: particulars,
                    },
                  },
                },
              },
            },
          };

          return fetch(
            "https://metaspeed.agilecloud.biz/MetaspeedARMTest/api/v1/ARMExecuteAPI",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(submitData),
            }
          );
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              console.error(errorData);
              throw new Error("API call failed");
            });
          }
          return response.json(); // Parse JSON response if successful
        })
        .then((result) => {
          console.log("API Response:", result);

          if (result.success) {
            // Close the modal and hide the alert
            setAlertInfo({
              show: true,
              type: "success",
              message: `Data save is successful`,
            });

            // Close the modal here if applicable (e.g., by calling a function or state update)
            handleClose(); // Add your modal closing logic here

            setTimeout(() => {
              setAlertInfo({ show: false, type: "", message: "" }); // Hide the alert after some time
            }, 3000); // Adjust timeout duration as needed
          } else {
            // Handle error if save was not successful
            setAlertInfo({
              show: true,
              type: "error",
              message: "Something went wrong. Please try again later.",
            });
          }
        });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setAlertInfo({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  //     const submitResponse = await fetch(
  //       "https://metaspeed.agilecloud.biz/MetaspeedARMTest/api/v1/ARMExecuteAPI",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(submitData),
  //       }
  //     );

  //     const submitResult = await submitResponse.json();
  //     console.log("API response:", submitResult);

  //     // Show success alert
  //     setAlertInfo({
  //       show: true,
  //       type: "success",
  //       message: "Data submitted successfully!",
  //     });

  //     // Close the modal
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error during API calls:", error);
  //     setAlertInfo({
  //       show: true,
  //       type: "error",
  //       message: "There was an error, please try again later.",
  //     });
  //   }
  // };

  return (
    <div>
      {/* <section className="pricing-area section-spacing">
        <div className="container">
          <div className="pricing-area-inner">
            <div className="section-header">
              <div className="section-title-wrapper">
                <div className="title-wrapper">
                  <h2 className="section-title has_fade_anim ">
                    "Flexible 50-Hours Free Trial."
                  </h2>
                </div>
              </div>
              <div className="text-wrapper">
                <p className="text has_fade_anim ">
                  Empower your business for the digital age with Axpert low-code
                  and reap tangible results
                </p>
              </div>
            </div>
            <div className="wcf__toggle_switcher style-2">
              <div className="toggle-content">
                <div className="toggle-pane show">
                  <div className="pricing-wrapper-box">
                    <div className="pricing-wrapper">
                      <div className="pricing-box basic has_fade_anim ">
                        <p className="title">Basic</p>
                        <div className="cardInfo">
                          <p>
                            <span className="highlight">600 credits</span>{" "}
                            (deducted based on usage)
                          </p>
                          <p>
                            <span className="highlight">Price:</span> ₹42,000
                          </p>
                          <p>
                            <span className="highlight">Ideal For:</span> Small
                            teams or startups.
                          </p>
                        </div>
                        <a
                          href="#"
                          className="wc-btn wc-btn-primary btn-text-flip"
                          onClick={() => handleOpen("Basic")}
                        >
                          <span
                            data-text="Contact us for pricing"
                            data-particulars="Basic"
                          >
                            Contact us for pricing
                          </span>
                        </a>
                        <div className="feature-list">
                          <ul>
                            <li>
                              <span> Up to </span>{" "}
                              <span className="highlight">3 users</span>.
                            </li>
                            <li>
                              <span>
                                Supports{" "}
                                <label className="highlight">
                                  over 4,000 transactions
                                </label>
                                credit usage varies per transaction).
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="pricing-box standard enterprise has_fade_anim "
                        data-delay="0.25"
                      >
                        <p className="title">Standard</p>
                        <div className="cardInfo">
                          <p>
                            <span className="highlight">1,500 credits</span>{" "}
                            (deducted based on usage)
                          </p>
                          <p>
                            <span className="highlight">Price:</span> ₹97,500
                          </p>
                          <p>
                            <span className="highlight">Ideal For:</span>{" "}
                            Growing businesses.
                          </p>
                        </div>
                        <a
                          href="#"
                          className="wc-btn wc-btn-primary btn-text-flip"
                          onClick={() => handleOpen("Standard")}
                        >
                          <span
                            data-text="Contact us for pricing"
                            data-particulars="Standard"
                          >
                            Contact us for pricing
                          </span>
                        </a>
                        <div className="feature-list">
                          <ul>
                            <li>
                              <span> Up to </span>{" "}
                              <span className="highlight">8 users</span>.
                            </li>
                            <li>
                              <span>
                                Supports{" "}
                                <label className="highlight">
                                  over 9,000 transactions
                                </label>{" "}
                                (credit usage varies per transaction).
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="pricing-box premium has_fade_anim "
                        data-delay="0.35"
                      >
                        <p className="title">Premium</p>
                        <div className="cardInfo">
                          <p>
                            <span className="highlight">3,000 credits</span>{" "}
                            (deducted based on usage)
                          </p>
                          <p>
                            <span className="highlight">Price:</span> ₹1,65,000
                          </p>
                          <p
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Medium to
          large businesses"
                          >
                            <span className="highlight">Ideal For:</span> Medium
                            to large businesses.
                          </p>
                        </div>
                        <a
                          href="#"
                          className="wc-btn wc-btn-primary btn-text-flip"
                          onClick={() => handleOpen("Premium")}
                        >
                          <span
                            data-text="Contact us for pricing"
                            data-particulars="Premium"
                          >
                            Contact us for pricing
                          </span>
                        </a>
                        <div className="feature-list">
                          <ul>
                            <li>
                              <span> Up to </span>{" "}
                              <span className="highlight">15 users</span>.
                            </li>
                            <li>
                              <span>
                                Supports
                                <label className="highlight">
                                  over 25,000 transactions
                                </label>{" "}
                                (credit usage varies per transaction).
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div
                        className="pricing-box premium has_fade_anim "
                        data-delay="0.35"
                      >
                        <p className="title">Enterprise</p>
                        <div className="cardInfo">
                          <p>
                            <span className="highlight">8,000 credits</span>{" "}
                            (deducted based on usage)
                          </p>
                          <p>
                            <span className="highlight">Price:</span> ₹4,00,000
                          </p>
                          <p
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Large
          enterprises with extensive needs"
                          >
                            <span className="highlight">Ideal For:</span> Large
                            enterprises with extensive needs.
                          </p>
                        </div>
                        <a
                          href="#"
                          className="wc-btn wc-btn-primary btn-text-flip"
                          onClick={() => handleOpen("Enterprise")}
                        >
                          <span
                            data-text="Contact us for pricing"
                            data-particulars="Enterprise"
                          >
                            Contact us for pricing
                          </span>
                        </a>
                        <div className="feature-list">
                          <ul>
                            <li>
                              <span> Up to </span>{" "}
                              <span className="highlight">50 users</span>.
                            </li>
                            <li>
                              <span>
                                Supports{" "}
                                <label className="highlight">
                                  over 60,000 transactions
                                </label>{" "}
                                (credit usage varies per transaction).
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <div className="pricing-box popular has_fade_anim " data-delay="0.45">
                      <span className="tag">Popular</span>
                      <p className="title">Custom</p>
                      <p className="description">A short description about the plan goes here...</p>
                      <h3 className="price">$49</h3>
                      <span>/user/month billed annually</span>
                      <a href="#" className="wc-btn wc-btn-primary btn-text-flip">
                        <span data-text="Start Now">Start Now</span>
                      </a>
                      <div className="feature-list">
                        <ul>
                          <li>
                            <img src={`${process.env.PUBLIC_URL}/assets/imgs/icon/check-3.png`} alt="icon" />
                            Unlimited cards
                          </li>
                          <li>
                            <img src={`${process.env.PUBLIC_URL}/assets/imgs/icon/check-3.png`} alt="icon" />
                            Automated management
                          </li>
                          <li>
                            <img src={`${process.env.PUBLIC_URL}/assets/imgs/icon/check-3.png`} alt="icon" />
                            SOX compliance
                          </li>
                          <li>
                            <img src={`${process.env.PUBLIC_URL}/assets/imgs/icon/check-3.png`} alt="icon" />
                            Enterprise ERP integrations
                          </li>
                          <li>
                            <img src={`${process.env.PUBLIC_URL}/assets/imgs/icon/check-3.png`} alt="icon" />
                            Limited tools
                          </li>
                          <li>
                            <img src={`${process.env.PUBLIC_URL}/assets/imgs/icon/check-3.png`} alt="icon" />
                            Local video issuance
                          </li>
                        </ul>
                      </div>
                    </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="variation-2">
                  <section className="pricing-area  section-spacing">
                    <div className="container">
                      <div className="pricing-area-inner">
                        <div className="section-header">
                          <div className="section-title-wrapper">
                            <div className="title-wrapper">
                              <h2 className="section-title has_fade_anim ">
                                "Empower Your Business."
                              </h2>
                            </div>
                          </div>
                          <div className="text-wrapper">
                            <p className="text has_fade_anim ">
                              Leverage a <b>Flexible 50-Hour Free Trial</b> of
                              Low-Code platform to innovate and grow.
                            </p>
                          </div>
                        </div>
                        <div className="wcf__toggle_switcher style-2">
                          <div className="toggle-content">
                            <div className="toggle-pane show">
                              <div className="pricing-wrapper-box">
                                <div className="pricing-wrapper">
                                  <div className="pricing-box basic has_fade_anim ">
                                    <p className="pricing-card-title">
                                      Essentials{" "}
                                    </p>
                                    <p className="description">
                                      Core features and seamless functionality,
                                      perfect for startups and small businesses.
                                    </p>
                                    <h3 className="price">₹42,000 </h3>
                                    <a className="custom-btn" onClick={() => handleOpen("Essentials")}>
                                      <span className="icon">→</span>
                                      <span className="btn-text">
                                        Contact Sales
                                      </span>
                                    </a>

                                    <div className="feature-list">
                                      <ul>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          600 credits
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Up to 3 users
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Handles 4,000+ transactions
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="pricing-box standard enterprise has_fade_anim "
                                    data-delay="0.25"
                                  >
                                    <p className="pricing-card-title">
                                      ProEdge
                                    </p>
                                    <p className="description">
                                      Advanced tools and integrations, designed
                                      for growing businesses aiming for
                                      scalability.
                                    </p>
                                    <h3 className="price">₹97,500 </h3>
                                    <a className="custom-btn" onClick={() => handleOpen("ProEdge")}>
                                      <span className="icon">→</span>
                                      <span className="btn-text">
                                        Contact Sales
                                      </span>
                                    </a>
                                    <div className="feature-list">
                                      <ul>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          1,500 credits
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Up to 8 users
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Supports 9,000+ transactions
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="pricing-box premium  has_fade_anim "
                                    data-delay="0.35"
                                  >
                                    <p className="pricing-card-title">EliteX</p>
                                    <p className="description">
                                      Premium features, enhanced security, and
                                      priority support for high-performance
                                      businesses.
                                    </p>
                                    <h3 className="price">₹1,65,000 </h3>
                                    <a className="custom-btn" onClick={() => handleOpen("EliteX")}>
                                      <span className="icon">→</span>
                                      <span className="btn-text">
                                        Contact Sales
                                      </span>
                                    </a>
                                    <div className="feature-list">
                                      <ul>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          3,000 credits
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Up to 15 users
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Handles 25,000+ transactions
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div
                                    className="pricing-box popular  has_fade_anim "
                                    data-delay="0.45"
                                  >
                                    <p className="pricing-card-title">
                                      FlexPro
                                    </p>
                                    <p className="description">
                                      Tailored to your enterprise’s needs, with
                                      full customization to align with your
                                      goals and vision.
                                    </p>
                                    <h3 className="price">₹4,00,000 </h3>
                                    <a className="custom-btn-flexpro" onClick={() => handleOpen("FlexPro")}>
                                      <span className="icon">→</span>
                                      <span className="btn-text">
                                        Contact Sales
                                      </span>
                                    </a>
                                    <div className="feature-list">
                                      <ul>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          8,000 credits
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Up to 50 users
                                        </li>
                                        <li>
                                          <img
                                            src="assets/imgs/icon/checkPricing.png"
                                            alt="icon image"
                                          />
                                          Supports 60,000+ transactions
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <section
                  className="ezy__faq16_gtQBrPjb"
                  id="ezy__faq16_gtQBrPjb"
                >
                  <div className="container">
                    {/* <!-- Start: Section Heading --> */}
                    <div className="row">
                      <div className="col-12 col-lg-7 text-center text-md-start ps-4 ps-lg-5">
                        <h2 className="ezy__faq16_gtQBrPjb-heading has_fade_anim ">
                          Your Questions, Answered!
                        </h2>
                        <p className="ezy__faq16_gtQBrPjb-sub-heading has_fade_anim ">
                          Dive into this section to Get quick insights about our
                          plans and how they can help your business thrive.
                        </p>
                      </div>
                    </div>
                    {/* <!-- End: Section Heading --> */}

                    {/* <!-- faqs --> */}
                    <div className="row text-center text-md-start">
                      {/* <!-- card starts --> */}
                      <div className="col-12 col-md-6 col-lg-4 has_fade_anim ">
                        <div className="card">
                          <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                            <div className="ezy__faq16_gtQBrPjb-card-icon d-flex justify-content-center align-items-center mb-4">
                              <i className="fa-solid fa-question"></i>
                            </div>

                            <h5 className="ezy__faq16_gtQBrPjb-card-title mb-3">
                              How do credits work and how are they deducted?
                            </h5>
                            <p className="ezy__faq16_gtQBrPjb-card-text mb-0">
                              <ul>
                                <li>
                                  <strong className="highlight">
                                    Pay-As-You-Go:{" "}
                                  </strong>
                                  Credits are consumed based on your actual
                                  usage. For each transaction, a small amount of
                                  credits is deducted.
                                </li>
                                <li>
                                  <strong className="highlight">
                                    Scalable:{" "}
                                  </strong>
                                  As your business grows, you can add more
                                  credits or even upgrade your plan to suit your
                                  increasing needs.
                                </li>
                                <li>
                                  <strong className="highlight">
                                    Transparent Billing:{" "}
                                  </strong>
                                  Track your credit usage with detailed reports,
                                  ensuring you never lose sight of your
                                  consumption.
                                </li>
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- card ends --> */}
                      <div className="col-12 col-md-6 col-lg-4 has_fade_anim ">
                        <div className="card">
                          <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                            <div className="ezy__faq16_gtQBrPjb-card-icon d-flex justify-content-center align-items-center mb-4">
                              <i className="fa-solid fa-question"></i>
                            </div>

                            <h5 className="ezy__faq16_gtQBrPjb-card-title mb-3">
                              Which plan should I choose?
                            </h5>
                            <p className="ezy__faq16_gtQBrPjb-card-text mb-0">
                              <ul>
                                <li>
                                  If you’re a startup or small business,
                                  <strong className="highlight">
                                    {" "}
                                    Essentials{" "}
                                  </strong>
                                  offers a solid foundation.
                                </li>
                                <li>
                                  For growing businesses aiming for scalability,
                                  <strong className="highlight">
                                    {" "}
                                    ProEdge{" "}
                                  </strong>{" "}
                                  is your go-to plan.
                                </li>
                                <li>
                                  <strong className="highlight">EliteX </strong>
                                  provides the best value for high-performance
                                  businesses with additional features and
                                  priority support.
                                </li>
                                <li>
                                  <strong className="highlight">
                                    FlexPro{" "}
                                  </strong>
                                  is fully customizable for large enterprises
                                  seeking tailored solutions.
                                </li>
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- card ends --> */}
                      <div className="col-12 col-md-6 col-lg-4 has_fade_anim ">
                        <div className="card">
                          <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                            <div className="ezy__faq16_gtQBrPjb-card-icon d-flex justify-content-center align-items-center mb-4">
                              <i className="fa-solid fa-question"></i>
                            </div>

                            <h5 className="ezy__faq16_gtQBrPjb-card-title mb-3">
                              Can I upgrade or downgrade my plan anytime?
                            </h5>
                            <p className="ezy__faq16_gtQBrPjb-card-text mb-0">
                              Absolutely! Our plans are designed to be flexible.
                              You can easily upgrade or downgrade as your
                              business needs evolve without any long-term
                              commitments.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- card ends --> */}
                      <div className="col-12 col-md-6 col-lg-4 has_fade_anim ">
                        <div className="card">
                          <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                            <div className="ezy__faq16_gtQBrPjb-card-icon d-flex justify-content-center align-items-center mb-4">
                              <i className="fa-solid fa-question"></i>
                            </div>

                            <h5 className="ezy__faq16_gtQBrPjb-card-title mb-3">
                              Is there any additional support for enterprise
                              clients?
                            </h5>
                            <p className="ezy__faq16_gtQBrPjb-card-text mb-0">
                              Yes, with{" "}
                              <strong className="highlight">
                                {" "}
                                FlexPro and EliteX{" "}
                              </strong>
                              , you receive priority support and dedicated
                              assistance, ensuring your business gets the
                              attention it deserves.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- card ends --> */}
                      <div className="col-12 col-md-6 col-lg-4 has_fade_anim ">
                        <div className="card">
                          <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                            <div className="ezy__faq16_gtQBrPjb-card-icon d-flex justify-content-center align-items-center mb-4">
                              <i className="fa-solid fa-question"></i>
                            </div>

                            <h5 className="ezy__faq16_gtQBrPjb-card-title mb-3">
                              What if I need a customized plan?
                            </h5>
                            <p className="ezy__faq16_gtQBrPjb-card-text mb-0">
                              If our standard plans don’t fit your needs, feel
                              free to reach out! We offer custom solutions that
                              can be tailored to your specific requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- card ends --> */}
                      <div className="col-12 col-md-6 col-lg-4 has_fade_anim ">
                        <div className="card">
                          <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                            <div className="ezy__faq16_gtQBrPjb-card-icon d-flex justify-content-center align-items-center mb-4">
                              <i className="fa-solid fa-question"></i>
                            </div>

                            <h5 className="ezy__faq16_gtQBrPjb-card-title mb-3">
                              Are there any hidden fees?
                            </h5>
                            <p className="ezy__faq16_gtQBrPjb-card-text mb-0">
                              No hidden fees! The cost you see for each plan is
                              what you’ll pay. We believe in transparent billing
                              so that you can plan your budget without
                              surprises.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- card ends --> */}
                    </div>
                    {/* <!-- /.faqs --> */}

                    <div className="row mt-4">
                      <div className="col-12 text-center has_fade_anim ">
                        <div className="ezy__faq16_gtQBrPjb-footer p-3 py-md-4 py-lg-5">
                          <h4 style={{color:"#252d39"}}>Have any additional questions?</h4>
                          <p>
                            Got more questions? We're happy to assist you with
                            anything you need!
                          </p>
                          <button className="btn btn-primary" onClick={() => handleOpen("Some Particulars", true)}>
                            Get in touch
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ezy__faq16_gtQBrPjb-footer-bg"></div>
                </section>
                <section className="ezy__clients9_zeLKl55v">
                  <div className="container">
                    <div className="row align-items-md-end text-center">
                      <div className="col-md-9 mb-4 mb-sm-5 text-start">
                        <div className="row">
                          <div className="col-xl-9">
                            <h2 className="ezy__clients9_zeLKl55v-heading mb-4 has_fade_anim ">
                              Our Trusted Clients
                            </h2>
                            <p className="ezy__clients9_zeLKl55v-sub-heading mb-0 has_fade_anim ">
                              We collaborate with industry leaders to deliver
                              innovative solutions that drive global success and
                              foster growth.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/Government-of-Rajasthan.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/quess.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/BMRCL.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/Kauvery-Hospital.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/sts.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/GI.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/BNB.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/Al-Turki.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim ">
                        <div className="ezy__clients9_zeLKl55v-item p-3 p-lg-5">
                          <img
                            src="assets/imgs/partners/Assurant.png"
                            alt=""
                            className="ezy__clients9_zeLKl55v-img img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

      {/* 
      <section className="faq-area section-spacing">
        <div className="container" >
          <div className="faq-area-inner">
            <div className="shape-1">
              <img src={`${process.env.PUBLIC_URL}/assets/imgs/shape/shape-s-60.png`}  alt="shape image" />
            </div>
            <div className="section-content">
              <div className="section-title-wrapper">
                <div className="title-wrapper">
                  <h2 className="section-title has_fade_anim ">
                    Frequently Asked Questions
                  </h2>
                </div>
              </div>
              <div className="text-wrapper">
                <p className="text has_fade_anim ">
                  Explore this section to learn more about our AI chatbots and
                  find answers to your questions.
                </p>
              </div>
            </div>

            <div className="faq-wrapper">
              <div className="accordion-wrapper">
                <Accordion flush>
                  {/* First Accordion Item 
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      How Credit Deduction Works
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <strong className="highlight">Pay-As-You-Go:</strong> Credits are deducted
                          based on actual usage (e.g., each transaction consumes
                          a certain number of credits).
                        </li>
                        <li>
                          <strong className="highlight">Flexible Scaling:</strong> Add more credits or
                          upgrade your plan as your business grows.
                        </li>
                        <li>
                          <strong className="highlight">Transparent Billing:</strong> Detailed usage
                          reports to help you track credit consumption.
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Second Accordion Item 
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      Why Choose Usage-Based Pricing?
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <strong className="highlight">Cost-Effective:</strong> Pay only for what you
                          use.
                        </li>
                        <li>
                          <strong className="highlight">Scalable:</strong> Easily adjust your plan as
                          your business needs evolve.
                        </li>
                        <li>
                          <strong className="highlight">Flexible:</strong> No long-term commitments;
                          upgrade or downgrade as needed.
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Third Accordion Item 
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Need More?</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <strong className="highlight">Custom Plans:</strong> Contact us for tailored
                          solutions if your needs exceed our standard plans.
                        </li>
                        <li>
                          <strong className="highlight">Dedicated Support:</strong> Enterprise plans
                          include priority support and custom integrations.
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="brand-area-page">
      <BrandArea />
      </section>
      
      <section className="Pricing cta-area">
        <div className="container-fluid">
          <div className="cta-area-wrapper">
            <div className="shape-1">
              <img
                src={`${process.env.PUBLIC_URL}/assets/imgs/shape/shape-r-33.png`}
                alt="shape-1"
              />
            </div>
            <div className="shape-2">
              <img
                src={`${process.env.PUBLIC_URL}/assets/imgs/shape/shape-r-34.png`}
                alt="shape-1"
              />
            </div>
            <div className="section-heading">
              <div className="title-wrapper">
                <h2 className="section-title has_fade_anim ">
                  Start Your 14 Days Free Trial
                </h2>
              </div>
              <div className="text-wrapper">
                <p className="text has_fade_anim ">
                  Optimize your impact this holiday season with an AI-driven,
                  multichannel marketing strategy.
                </p>
              </div>
              <div className="btn-wrap has_fade_anim " style={{color:"white"}}>
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#signupform"
                  className="wc-btn-primary"
                >
                  Signup now
                </a>
                <a href="#" className="wc-btn-primary bordered">
                  Request for demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      <ScrollToTop />

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className="modal-box"
          sx={{
            width: 600, // Fixed width
            backgroundColor: "white", // White background
            padding: "40px", // Reduced padding
            borderRadius: 10, // Rounded corners
            boxShadow: 24, // Shadow effect
            boxSizing: "border-box", // Ensure padding is included in the width
          }}
        >
          <h2>Contact Us for Pricing</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="Contact Number"
              type="tel"
              fullWidth
              value={contactNum}
              onChange={(e) => setContactNum(e.target.value)}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Displaying the alert */}
      {alertInfo.show && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity={alertInfo.type}>{alertInfo.message}</Alert>
        </Stack>
      )}
    </div>
  );
};

export default Pricing;
