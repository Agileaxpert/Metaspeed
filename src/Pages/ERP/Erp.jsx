import React,{useState,useEffect} from 'react'
// import { Footer, Header } from './Sample'
import '../ERP/Erp.css'

const Erp = ({ openModal }) => {

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
      {/* <Header/> */}
      <section className="header24">
      <div className="container">
        <div>
          <img
            className="header24-img d-none d-md-block img-fluid"
            src="assets/imgs/gallery/proud-you-did-great-portrait-happy.png"
            alt=""
          />
        </div>
        <svg
          className="header24-svg-sm"
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="52" cy="52" r="52" fill="rgba(var(--ezy-svg-color),1)" />
        </svg>

        <svg
          className="header24-svg"
          width="710"
          height="458"
          viewBox="0 0 710 458"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="355" cy="355" r="355" fill="rgba(var(--ezy-svg-color),.75)" />
          <defs>
            <linearGradient
              id="paint0_linear_1_4250"
              x1="355"
              y1="0"
              x2="355"
              y2="710"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#303741" />
              <stop offset="1" stopColor="#0E1115" />
            </linearGradient>
          </defs>
        </svg>

        <div className="row text-center text-md-start">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="header24-wrapper position-relative">
              <h1
                className="header24-heading has_fade_anim"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
              >
                Let's Reveal Something New!
              </h1>
              <p
                className="header24-sub-heading my-4 has_fade_anim"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 0.8,
                }}
              >
                Metaspeed ERP, powered by low-code platform, streamlines
                enterprise management across industries, supporting multi-company,
                branch, and currency operations.
              </p>
              <button
                className="btn header24-btn fs-5 mt-2 has_fade_anim"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#signupform"
                style={{
                  translate: "none",
                  rotate: "none",
                  scale: "none",
                  transform: "translate(0px, 0px)",
                  opacity: 1,
                }}
                onClick={openModal}
              >
                Schedule a free session
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="featured49">
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-md-5">
            <h1
              className="featured49-heading mb-5 mb-md-0 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              Metaspeed ERP: The Future-Ready Business Solution
            </h1>
          </div>
          <div className="col-12 col-md-5 featured49-cards-wrapper">
            <div
              className="d-flex align-items-center featured49-card mt-5 mt-md-0 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="me-3">
                <span className="featured49-icon">
                  <i className="fas fa-code"></i>
                </span>
              </div>
              <div>
                <p className="featured49-content mb-0">
                  Built on the Axpert low-code platform, delivers a flexible and
                  scalable solution, aligning with the industry's shift—where 75% of
                  large enterprises are expected to adopt low-code platforms.
                </p>
              </div>
            </div>
            <div
              className="d-flex align-items-center featured49-card mt-5 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="me-3">
                <span className="featured49-icon">
                  <i className="fas fa-globe"></i>
                </span>
              </div>
              <div>
                <p className="featured49-content mb-0">
                  Axpert powers Metaspeed ERP across 500+ customer locations
                  worldwide, supporting critical applications in government, defence,
                  metro rail, manufacturing, banking, and more.
                </p>
              </div>
            </div>
            <div
              className="d-flex align-items-center featured49-card mt-5 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="me-3">
                <span className="featured49-icon">
                  <i className="fas fa-server"></i>
                </span>
              </div>
              <div>
                <p className="featured49-content mb-0">
                  Metaspeed ERP efficiently manages multi-company, multi-branch,
                  multi-currency, and multi-UOM operations, ensuring seamless business
                  process management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="service12">
      <div className="container">
        <div className="row justify-content-center mb-0 mb-md-4">
          <div className="col-lg-6 text-center">
            <h2
              className="service12-heading mb-4 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              Unlocking Processes with Metaspeed
            </h2>
            <p
              className="service12-sub-heading mb-0 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 0.8,
              }}
            >
              Streamline operations with ERP—automating procurement, sales,
              inventory, finance, payroll, and employee management, ensuring
              efficiency and compliance. Get real-time insights with powerful
              reports and analytics!
            </p>
          </div>
        </div>
        <div className="row service12-card">
          {[
            {
              icon: "fas fa-shopping-cart",
              title: "Procure to Pay",
              content: "Manages purchasing, supplier data, and materials.",
            },
            {
              icon: "fas fa-shopping-bag",
              title: "Order to Cash",
              content: "Manages the sales process from order receipt to cash collection.",
            },
            {
              icon: "fas fa-boxes",
              title: "Inventory Control",
              content:
                "Tracks inventory across locations, using FIFO, weighted average, or batch-wise valuation.",
            },
            {
              icon: "fas fa-book",
              title: "Financial Accounting",
              content:
                "Includes a chart of accounts, sub-ledgers, general ledger, and multi-currency support.",
            },
            {
              icon: "fas fa-money-check-alt",
              title: "Payroll",
              content: "Configurable payroll and HR system with statutory compliance.",
            },
            {
              icon: "fas fa-box",
              title: "Fixed Assets Tracking",
              content: "Tracks asset purchases, depreciation, AMC, and warranty.",
            },
            {
              icon: "fas fa-user-plus",
              title: "Employee Management",
              content:
                "Handles employee onboarding, attendance, leave, payroll, and claims.",
            },
            {
              icon: "fas fa-chart-line",
              title: "Reports & Analysis",
              content: "Includes various financial, sales, and inventory reports.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="col-md-6 col-lg-6 mt-5 has_fade_anim"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
              }}
            >
              <div className="d-flex">
                <div className="me-3">
                  <span className="service12-icon mb-4">
                    <i className={item.icon}></i>
                  </span>
                </div>
                <div>
                  <h4 className="service12-title fs-4 mb-3">{item.title}</h4>
                  <p className="service12-content mb-0">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="faq9">
  <div className="container">
    <div className="row">
      <div className="col-lg-8 mb-5">
        <h2 className="faq9-heading mb-4 has_fade_anim" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          Unmatched Benefits of Metaspeed
        </h2>
        <p className="faq9-sub-heading mb-0 has_fade_anim" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 0.7 }}>
          Meta ERP offers a user-friendly, mobile-accessible, and fully integrated system with powerful
          analytics, seamless customization, and flexible deployment. Secure, scalable, and
          cost-effective—built for your business growth!
        </p>
      </div>
    </div>
    <div className="row justify-content-between">
      <div className="col-md-4 mb-4 mb-md-0">
        <div className="ezy__faq10_SkV8lFPL-bg-holder h-100 has_fade_anim" style={{ backgroundImage: 'url("assets/imgs/gallery/vertical-low-angle-shot-ceiling-white-geometrical-buildings.jpg")', backgroundSize: '128%', backgroundPosition: 'center center', translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
        </div>
      </div>
      <div className="col-md-8 ps-lg-5">
        {[
          { title: "User-Friendly", content: "Easy to use. A user who can use Google Search can use Agile ERP." },
          { title: "Mobile Accessibility", content: "Use Agile ERP on mobile." },
          { title: "Accessibility", content: "Use Agile ERP on mobile." },
          { title: "Powerful Analytics", content: "Gain critical business insights through widgets, charts, and drill-down capabilities." },
          { title: "Fully Integrated", content: "Completely integrated ERP" },
          { title: "Effortless Customization", content: "Adapt the system to your needs within a few days" },
          { title: "Deployment Flexibility", content: "Available both on the cloud and on-premises." },
          { title: "Flexible Pricing", content: "Choose between pay-as-you-use or a one-time license purchase." }
        ].map((item, index) => (
          <div className="faq9-item has_fade_anim" key={index} style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
            <h5 className="p-3 p-lg-4 mb-0 w-100 text-start d-flex justify-content-between align-items-center faq9-btn-collapse">
              <span>{`0${index + 1}. ${item.title}`}</span>
            </h5>
            <div className="faq9-content px-3 px-lg-4 pb-lg-4">
              <p className="opacity-50 mb-0">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


<section className="featured1">
  <div className="container">
    <div className="row justify-content-center mb-0 mb-md-4">
      <div className="col-lg-6 text-center">
        <h2 className="service12-heading mb-4 has_fade_anim" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          Metaspeed's Game-Changing Features
        </h2>
      </div>
    </div>
    <div className="row text-center">
      {[
        {
          icon: "fas fa-rocket",
          title: "Accelerated Development",
          content: "Reduces the time and effort to create custom applications by 50% compared to traditional programming methods."
        },
        {
          icon: "fas fa-mobile-alt",
          title: "Mobile-Ready",
          content: "Every Axpert app is instantly accessible on mobile devices with native mobile capabilities."
        },
        {
          icon: "fas fa-network-wired",
          title: "Supports Distributed Computing",
          content: "Apps can be deployed in remote locations, even where internet connectivity is a challenge."
        },
        {
          icon: "fas fa-hdd",
          title: "Flexible Deployment",
          content: "Available for on-premise deployment, making it suitable for private cloud implementations as well."
        },
        {
          icon: "fas fa-lock",
          title: "Secure",
          content: "Trusted by numerous data centers, thoroughly tested, and certified safe for hosting."
        },
        {
          icon: "fas fa-cogs",
          title: "Proven Reliability",
          content: "Successfully deployed at over 500 locations across 10+ countries."
        }
      ].map((item, index) => (
        <div className="col-md-4 mt-5 mt-md-0 has_fade_anim" key={index} style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          <div className="p-xl-4">
            <div className="featured1-icon mb-4"><i className={item.icon}></i></div>
            <h4 className="featured1-title fs-4 fw-bold mb-3">{item.title}</h4>
            <p className="featured1-content mb-0">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



<section className="featured14">
  <div className="container">
    <div className="row">
      <div className="col-lg-7 mb-4">
        <h2 className="featured14-heading mb-4 has_fade_anim" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          The Heart of Metaspeed
        </h2>
        <p className="featured14-sub-heading mb-0 has_fade_anim" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          Axpert empowers you to build enterprise-grade apps quickly by defining forms, reports, and widgets,
          while using powerful tools and scripts to handle complex tasks effortlessly. Create high-quality
          solutions on the fly!
        </p>
      </div>
    </div>
    <div className="row">
      {[...Array(12)].map((_, index) => (
        <div className={`col-md-6 col-lg-4 mt-4 has_fade_anim`} key={index} style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          <div className="featured14-item d-flex">
            <div className="featured14-icon mb-4">{index + 1}</div>
            <div className="ms-3">
              <h4 className="featured14-title fs-4 fw-bold mb-3">
                {[
                  'Form Builder',
                  'List & Chart Configurator',
                  'Widget & HTML Plugin',
                  'Report Generator',
                  'User Access Control',
                  'Workflow Configuration',
                  'Script Engine',
                  'API for Data Exchange',
                  'Job Scheduler & Console',
                  'Import & Export Wizards',
                  'Usage Audits & Consoles',
                  'Desktop & Mobile Clients'
                ][index]}
              </h4>
              <p className="featured14-content mb-0">
                {[
                  'Easily design and customize forms to capture and manage data with precision and ease.',
                  'Create dynamic lists and interactive charts to display your data in an insightful and user-friendly way.',
                  'Enhance your app’s functionality with customizable widgets and HTML plugins for seamless integration.',
                  'Craft detailed and professional reports to deliver actionable insights at a glance.',
                  'Securely manage user permissions and ensure appropriate access with robust control features.',
                  'Define and streamline processes with flexible workflow configuration for maximum efficiency.',
                  'Automate complex tasks and operations with Axpert’s powerful script engine.',
                  'Easily send and receive data with Axpert’s API, ensuring smooth communication between systems.',
                  'Schedule and manage tasks effortlessly with Axpert’s job scheduler and console for smooth operations.',
                  'Simplify data migration with intuitive import and export wizards for seamless transitions.',
                  'Track activity and monitor system usage with detailed audits and comprehensive consoles.',
                  'Access your applications anytime, anywhere, with responsive desktop and mobile thin clients.'
                ][index]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* <Footer/> */}
    </div>
  )
}

export default Erp

