import React, { useState, useEffect } from "react";
// import { BrandArea, ScrollToTop } from "./Sample";
import "../Pricing/Pricing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Box, TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Accordion } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import { useCountry } from "../../Context/Countrycontext";
//import TextSpinnerLoader from "../../Components/TextSpinner";
import { useConfig } from "../../Context/ConfigContext";

const Pricing = () => {
  const config = useConfig();

  const { selectedCountry } = useCountry();
  console.log(selectedCountry);
  const [pricingData, setPricingData] = useState([]);

  const [loading, setLoading] = useState(false); // Loader state

  const [lastScrollY, setLastScrollY] = useState(0);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // Only run the animation logic if the user is scrolling down
    if (currentScrollY > lastScrollY) {
      const elements = document.querySelectorAll(".has_fade_anim");
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

  const [open, setOpen] = useState(false);

  const [textInput, setTextInput] = useState(""); // Extra textarea field
  const [showTextArea, setShowTextArea] = useState(false); // Determine if textarea should be visible

  const [errorMessage, setErrorMessage] = useState("");
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

  const handleOpen = (particularsValue, showTextAreaField = false) => {
    setParticulars(particularsValue);
    setShowTextArea(showTextAreaField); // Set the state for whether to show the textarea field
    setOpen(true);
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

    const finalParticulars = showTextArea ? textInput : particulars;
    if (contactNum.length !== 10) {
      setErrorMessage("Invalid mobile number");
      return;
    }
    try {
      setLoading(true);
      // 1. First API Call to get the token
      const getEncryptedSecret = () => {
        return fetch(config.fetchSecretKeyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SecretKey: config.pricingConfig.secretKey, // Replace with actual key if needed
          }),
        })
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
                      particulars: finalParticulars,
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
              const errorMessage =
                errorData.message ||
                "Something went wrong. Please try again later.";
              throw new Error(errorMessage); // Throwing the error directly
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
              message: `Thank you for subscribing!`,
            });
            setLoading(false);
            // Close the modal here if applicable (e.g., by calling a function or state update)
            handleClose(); // Add your modal closing logic here

            setTimeout(() => {
              setAlertInfo({ show: false, type: "", message: "" }); // Hide the alert after some time
            }, 3000); // Adjust timeout duration as needed
          } else {
            throw new Error(
              result.message || "Something went wrong. Please try again later."
            );
          }
        });
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
      setAlertInfo({
        show: true,
        type: "error",
        message: error.message,
      });
      setLoading(false);
    }
  };

  const currencyLocaleMap = {
    AED: "ar-AE", // United Arab Emirates Dirham
    AUD: "en-AU", // Australian Dollar
    CAD: "en-CA", // Canadian Dollar
    CHF: "de-CH", // Swiss Franc
    CNY: "zh-CN", // Chinese Yuan
    EUR: "de-DE", // Euro (Germany)
    GBP: "en-GB", // British Pound Sterling
    HKD: "zh-HK", // Hong Kong Dollar
    IDR: "id-ID", // Indonesian Rupiah
    INR: "en-IN", // Indian Rupee
    JPY: "ja-JP", // Japanese Yen
    KRW: "ko-KR", // South Korean Won
    MYR: "ms-MY", // Malaysian Ringgit
    NZD: "en-NZ", // New Zealand Dollar
    PHP: "en-PH", // Philippine Peso
    RUB: "ru-RU", // Russian Ruble
    SAR: "ar-SA", // Saudi Riyal
    SGD: "en-SG", // Singapore Dollar
    THB: "th-TH", // Thai Baht
    TRY: "tr-TR", // Turkish Lira
    USD: "en-US", // United States Dollar
    ZAR: "en-ZA", // South African Rand
  };

  const formatCurrency = (amount, currencyCode, showSymbol = true) => {
    if (amount === null || amount === undefined) return "";

    // Get the locale based on the currencyCode, default to "en-US" if not found
    const locale = currencyLocaleMap[currencyCode] || "en-IN";

    return Number(amount).toLocaleString(locale, {
      style: showSymbol ? "currency" : "decimal",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

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
  // const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Allow only digits and ensure length does not exceed 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setContactNum(value);
      setErrorMessage(""); // Clear error when valid
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!selectedCountry) return; // ✅ Prevent unnecessary API calls
    setIsLoading(true); // Start loading
    // First API: Get Encrypted SecretKey
    fetch(config.fetchSecretKeyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SecretKey: config.pricingDataConfig.secretKey }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`SecretKey API Error: ${res.status}`);
        return res.text();
      })
      .then((secretKey) => {
        if (!secretKey.trim()) throw new Error("SecretKey not received");
        //  console.log("Received SecretKey:", secretKey);

        // Second API: Get Pricing Data
        return fetch(config.fetchApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            SecretKey: secretKey,
            publickey: config.pricingDataConfig.publicKey,
            Project: config.project,
            getsqldata: { trace: config.trace },
            sqlparams: { pcountrycode: selectedCountry },
          }),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Pricing API Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Pricing Data:", data);
        setPricingData(data["ds_pricing"]["rows"]);
      })
      .catch((err) => {
        console.error("Error fetching pricing data:", err);
        setErrorMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [selectedCountry]); // ✅ Dependencies added

  return (
    <div>
      <div className="variation-2">
        <section className="pricing-area  section-spacing">
          <div className="container-fluid">
            <div className="pricing-area-inner">
              <div className="section-header">
                <div className="section-title-wrapper">
                  <div className="title-wrapper">
                    <h2
                      className="section-title has_fade_anim"
                      style={{ color: "#0f2552" }}
                    >
                      "Empower Your Business."
                    </h2>
                  </div>
                </div>
                <div className="text-wrapper">
                  <p className="text has_fade_anim">
                    Build, adapt, and grow with complete customization.
                  </p>
                </div>
              </div>
              <div className="wcf__toggle_switcher style-2">
                <div className="toggle-content">
                  <div className="toggle-pane show">
                    <div className="pricing-wrapper-box">
                      {/* <div className="pricing-wrapper">
                        <div className="pricing-box basic has_fade_anim">
                          <p className="pricing-card-title" title="Essentials">Essentials </p>
                          <p className="description">
                            Core features and seamless functionality, perfect
                            for startups and small businesses.
                          </p>
                          <h3 className="price">₹25,000 </h3>
                          <a href="#" className="custom-btn" onClick={(e) => { 
                            e.preventDefault(); 
                           handleOpen("Essentials",false); 
                           }}>
                            <span className="icon">→</span>
                            <span className="btn-text">Contact Sales</span>
                          </a>

                          <div className="feature-list">
                            <ul>
                            <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                <span className="highlight-glow">Unlimited users</span>
                              </li>
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                2,500 Active hours
                              </li>
                              
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                Up to 600 transactions
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div  className="pricing-box standard enterprise has_fade_anim"
                          data-delay="0.25">
                          <p className="pricing-card-title" title="Pro">Pro</p>
                          <p className="description">
                          Enhanced capabilities and automation to accelerate business growth efficiently.
                          </p>
                          <h3 className="price">₹55,000 </h3>
                          <a href="#" className="custom-btn" onClick={(e) => {e.preventDefault();handleOpen("Pro",false)}}>
                            <span className="icon">→</span>
                            <span className="btn-text">Contact Sales</span>
                          </a>
                          <div className="feature-list">
                            <ul>
                            <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                               <span className="highlight-glow">Unlimited users</span>
                              </li>
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                5,000 Active hours
                              </li>
                             
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                Up to 1,800 transactions
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div  className="pricing-box standard enterprise has_fade_anim"
                          data-delay="0.25">
                          <p className="pricing-card-title" title="ProEdge">ProEdge</p>
                          <p className="description">
                            Advanced tools and integrations, designed for
                            growing businesses aiming for scalability.
                          </p>
                          <h3 className="price">₹95,500 </h3>
                          <a href="#" className="custom-btn" onClick={(e) => {e.preventDefault();handleOpen("ProEdge",false)}}>
                            <span className="icon">→</span>
                            <span className="btn-text">Contact Sales</span>
                          </a>
                          <div className="feature-list">
                            <ul>
                            <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                               <span className="highlight-glow">Unlimited users</span>
                              </li>
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                7,500 Active hours
                              </li>
                             
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                Up to 6,000 transactions
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="pricing-box premium  has_fade_anim"
                          data-delay="0.35"
                        >
                          <p className="pricing-card-title" title="Elite">Elite</p>
                          <p className="description">
                          Premium features, and priority support for high-performance businesses.
                          </p>
                          <h3 className="price">₹1,45,000 </h3>
                          <a href="#" className="custom-btn" onClick={(e) =>{e.preventDefault(); handleOpen("Elite",false)}}>
                            <span className="icon">→</span>
                            <span className="btn-text">Contact Sales</span>
                          </a>
                          <div className="feature-list">
                            <ul>
                            <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                              <span className="highlight-glow">Unlimited users</span>
                              </li>
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                10,000 Active hours
                              </li>
                              
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                Up to 15,000 transactions
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="pricing-box popular  has_fade_anim"
                          data-delay="0.45" > 
                          <p className="pricing-card-title" title="EliteX">EliteX</p>
                          <p className="description">
                          Designed to meet your enterprise’s needs, aligning seamlessly with your goals.
                          </p>
                          <h3 className="price">₹2,25,000 </h3>
                          <a href="#" className="custom-btn-flexpro" onClick={(e) =>{e.preventDefault(); handleOpen("EliteX",false)}}>
                            <span className="icon">→</span>
                            <span className="btn-text">Contact Sales</span>
                          </a>
                          <div className="feature-list">
                            <ul>
                            <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                <span className="highlight-glow">Unlimited users</span>
                              </li>
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                15,000 Active hours
                              </li>
                              
                              <li>
                                <img
                                  src="assets/imgs/icon/checkPricing.png"
                                  alt="icon image"
                                />
                                Up to 25,000 transactions
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                      {isLoading ? (
                        <p class="pricingdetails">
                          Loading Pricing Details........
                        </p>
                      ) : (
                        <div className="pricing-wrapper">
                          {pricingData?.length > 0 ? (
                            pricingData.map((plan, index) => {
                              const planClassMap = {
                                Essentials: "basic",
                                Pro: "standard",
                                ProEdge: "standard",
                                Elite: "premium",
                                EliteX: "popular",
                              };

                              return (
                                <div
                                  key={index}
                                  className={`pricing-box ${
                                    planClassMap[plan.pricing_name] || ""
                                  } has_fade_anim`}
                                  data-delay={`0.${index + 2}`}
                                >
                                  <p
                                    className="pricing-card-title"
                                    title={plan.pricing_name}
                                  >
                                    {plan.pricing_name}
                                  </p>
                                  <p className="description">
                                    {plan.pricing_name === "Essentials"
                                      ? "Core features and seamless functionality, perfect for startups and small businesses."
                                      : plan.pricing_name === "Pro"
                                      ? "Enhanced capabilities and automation to accelerate business growth efficiently."
                                      : plan.pricing_name === "ProEdge"
                                      ? "Advanced tools and integrations, designed for growing businesses aiming for scalability."
                                      : plan.pricing_name === "Elite"
                                      ? "Premium features, and priority support for high-performance businesses."
                                      : "Designed to meet your enterprise’s needs, aligning seamlessly with your goals."}
                                  </p>
                                  <h3 className="price">
                                    {/* {currencySymbols[plan.currency_code] || "₹"} */}
                                    {plan.rate &&
                                      formatCurrency(
                                        plan.rate,
                                        plan.currency_code,
                                        true
                                      )}
                                  </h3>
                                  <a
                                    href="#"
                                    className="custom-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleOpen(plan.pricing_name, false);
                                    }}
                                  >
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
                                        <span className="highlight-glow">
                                          Unlimited users
                                        </span>
                                      </li>
                                      <li>
                                        <img
                                          src="assets/imgs/icon/checkPricing.png"
                                          alt="icon image"
                                        />
                                        {plan.tot_hours &&
                                          formatCurrency(
                                            plan.tot_hours,
                                            plan.currency_code,
                                            false
                                          )}{" "}
                                        Active hours
                                      </li>
                                      <li>
                                        <img
                                          src="assets/imgs/icon/checkPricing.png"
                                          alt="icon image"
                                        />
                                        Up to{" "}
                                        {plan.tot_transactions &&
                                          formatCurrency(
                                            plan.tot_transactions,
                                            plan.currency_code,
                                            false
                                          )}{" "}
                                        transactions
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="pricingdetails">
                              No pricing data available.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="faq16" id="faq16">
        <div className="container-fluid">
          {/* Section Heading */}
          <div className="row">
            <div className="col-12 col-lg-7 text-center text-md-start ps-4 ps-lg-5">
              <h2 className="faq16-heading has_fade_anim">
                Your Questions, Answered!
              </h2>
              <p className="faq16-sub-heading has_fade_anim">
                Dive into this section to get quick insights about our plans and
                how they can help your business thrive.
              </p>
            </div>
          </div>
          {/* FAQ Cards */}
          <div className="row text-center text-md-start">
            {[
              {
                title: "How do Active hours work and how are they deducted?",
                content: [
                  {
                    label: "Pay-As-You-Go",
                    text: "Active hours are deducted according to your actual usage. Each transaction will be accounted for in the pricing usage metrics.",
                  },
                  {
                    label: "Scalable",
                    text: "As your business grows, you can add more Active hours or even upgrade your plan to suit your increasing needs.",
                  },
                  {
                    label: "Transparent Billing",
                    text: "Track your usage with detailed reports, ensuring you never lose sight of your consumption.",
                  },
                ],
              },
              {
                title: "Which plan should I choose?",
                content: [
                  {
                    text: 'If you’re a startup or small business, <span class="highlight">Essentials </span> offers a solid foundation.',
                  },
                  {
                    text: '<span class="highlight"> Pro </span> strikes the perfect balance between affordability and advanced features, empowering businesses to scale efficiently.',
                  },
                  {
                    text: 'For growing businesses aiming for scalability, <span class="highlight"> ProEdge </span> is your go-to plan.',
                  },
                  {
                    text: '<span class="highlight">Elite </span> provides the best value for high-performance businesses with additional features and priority support.',
                  },
                  {
                    text: '<span class="highlight">EliteX </span> Designed to meet your enterprise’s needs, aligning seamlessly with your goals.',
                  },
                ],
              },
              {
                title: "Can I upgrade or downgrade my plan anytime?",
                content: [
                  {
                    text: "Absolutely! Our plans are designed to be flexible. You can easily upgrade or downgrade as your business needs evolve without any long-term commitments.",
                  },
                ],
              },
              {
                title:
                  "Is there any additional support for enterprise clients?",
                content: [
                  {
                    text: 'Yes, with <span class="highlight">Elite </span> and <span class="highlight">EliteX </span>, you receive priority support and dedicated assistance, ensuring your business gets the attention it deserves.',
                  },
                ],
              },
              {
                title: "What if I need a customized plan?",
                content: [
                  {
                    text: "If our standard plans don’t fit your needs, feel free to reach out! We offer custom solutions that can be tailored to your specific requirements.",
                  },
                ],
              },
              {
                title: "Are there any hidden fees?",
                content: [
                  {
                    text: "No hidden fees! The cost you see for each plan is what you’ll pay. We believe in transparent billing so that you can plan your budget without surprises.",
                  },
                ],
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-4 has_fade_anim"
              >
                <div className="card">
                  <div className="card-body d-flex flex-column align-items-center align-items-md-start p-4 p-lg-5">
                    <div className="faq16-card-icon d-flex justify-content-center align-items-center mb-4">
                      <i className="fa-solid fa-question"></i>
                    </div>
                    <h5 className="faq16-card-title mb-3">{faq.title}</h5>
                    <ul className="faq16-card-text mb-0">
                      {faq.content.map((item, idx) => (
                        <li key={idx}>
                          {item.label && (
                            <strong className="highlight">
                              {item.label}:{" "}
                            </strong>
                          )}
                          <span
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* FAQ Footer */}
          <div className="row mt-4">
            <div className="col-12 text-center has_fade_anim">
              <div className="faq16-footer p-3 py-md-4 py-lg-5">
                <h4 style={{ color: "#0f2552" }}>
                  Have any additional questions?
                </h4>
                <p>
                  Got more questions? We're happy to assist you with anything
                  you need!
                </p>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen("Get in Touch", true); // Show textarea for "Get in Touch"
                  }}
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="faq16-footer-bg"></div>
      </section>

      <section className="clients9">
        <div className="container-fluid">
          <div className="row align-items-md-end text-center">
            <div className="col-md-9 mb-4 mb-sm-5 text-start">
              <div className="row">
                <div className="col-xl-9">
                  <h2
                    className="clients9-heading mb-4 has_fade_anim"
                    style={{ fontSize: "45px", fontWeight: "700" }}
                  >
                    Our Trusted Clients
                  </h2>
                  <p className="clients9-sub-heading mb-0 has_fade_anim">
                    We collaborate with industry leaders to deliver innovative
                    solutions that drive global success and foster growth.
                  </p>
                </div>
              </div>
            </div>
            {[
              "Government-of-Rajasthan",
              "quess",
              "BMRCL",
              "Kauvery-Hospital",
              "sts",
              "GI",
              "BNB",
              "Al-Turki",
              "Assurant",
            ].map((client, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 col-xl-3 mt-3 mt-sm-4 has_fade_anim"
              >
                <div className="clients9-item p-3 p-lg-5">
                  <img
                    src={`assets/imgs/partners/${client}.png`}
                    alt={client}
                    className="clients9-img img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <ScrollToTop /> */}

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
          <h2>Contact Us</h2>
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
              onChange={handleInputChange}
              required
              margin="normal"
              inputProps={{
                maxLength: 10,
              }}
              error={Boolean(errorMessage)} // Display error state if errorMessage is set
              helperText={errorMessage} // Default message or error message
            />

            {showTextArea && (
              <TextField
                label="Additional Details"
                multiline
                rows={4}
                fullWidth
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                required
                margin="normal"
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Displaying the alert */}
      {alertInfo.show && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity={alertInfo.type}>
            {alertInfo.message}
          </Alert>
        </Stack>
      )}
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

export default Pricing;
