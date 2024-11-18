import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import aboutImage from "./about.jpg";
import "./AboutPage.css"; // Make sure to import the stylesheet
import MetaTag from "../../components/Meta/MetaTags";
import fatherImg from "./father.jpeg";
import sonImg from "./son.jpeg";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <MetaTag
        title="About Us - Aashrey Realtors"
        description="Discover the story of Aashrey Realtors, founded in 2017 by Kailash Chand Khandelwal. Learn about our vision, mission, and the leadership of Grovin Khandelwal as we continue to excel in the real estate industry."
        keyword="Aashrey Realtors, real estate history, Aashrey Realtors mission, Aashrey Realtors vision, Kailash Chand Khandelwal, Grovin Khandelwal, real estate leaders, company history Aashrey Realtors"
      />

      {/* ----- BreadCrumb ---- */}
      <section className="page__title p_relative">
        <div
          className="bg-layer parallax-bg"
          style={{
            backgroundImage: "url(assets/images/resource/page-title.png)",
          }}
        ></div>
        <div className="container">
          <div className="content-box p_relative text-center">
            <h1 className="title text-uppercase">About Us</h1>
            <ul className="bread-crumb d-flex justify-content-center">
              <li>
                <Link to={`/`}>
                  <span className="icon-icon-16" />
                  Home
                </Link>
              </li>
              <li>
                <span className="icon-57" />
                About Us
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----- Introduction Section ---- */}
      <section className="about-intro-section mt-40">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">
                Welcome to &nbsp;
                <span className="text-uppercase">Aashrey Realtors</span>
              </h2>
              <p className="intro-text">
              Welcome to Aashrey Realtors, where we bring exceptional real estate experiences. With 10 years of industry expertise and a deep commitment to client satisfaction, we’re your trusted partner in navigating the world of residential and commercial properties.
              </p>
              <p>Whether you’re buying, selling, or investing, our dedicated team is here to guide you every step of the way. We believe that every client deserves personalized attention, transparent communication, and a customized strategy that fits their unique goals.</p>
              <p>Our approach combines in-depth market knowledge, advanced technology, and an unwavering focus on results. 
              At Aashrey Realtors we understand that real estate isn’t just about transactions—it’s about building futures. From finding your dream home to growing your investment plans, we make it our mission to exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ----- History Section ---- */}
      <section className="company-history-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="section-subtitle">Our History</h3>
              <p>
                Aashrey Realtors began its journey in 2017, with a vision to
                make property dealing simple and accessible for everyone. Our
                founder, <strong>Neeraj Tayal</strong>, established the company
                with strong values and a customer-first approach. Over the
                years, we have grown significantly, expanding our services and
                our reach.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={aboutImage}
                alt="Office"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----- Vision & Mission Section ---- */}
      <section className="vision-mission-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="section-subtitle">Our Vision</h3>
              <p>
                Our vision is to be the leading real estate company that
                provides outstanding services and helps clients achieve their
                property goals with ease and satisfaction.
              </p>
            </div>
            <div className="col-md-6">
              <h3 className="section-subtitle">Our Mission</h3>
              <p>
                We aim to deliver high-quality real estate services through
                honesty, integrity, and customer-centric practices. Our mission
                is to create lasting relationships with our clients by ensuring
                their property needs are met with professionalism and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----- Team Section ---- */}
      <section className="team-section py-5">
        <div className="container">
          <h3 className="section-title mb-40">Meet Our Team</h3>
          <div className="row">
            <div className="col-md-6 team-member">
              <img
                src={fatherImg}
                alt="Neeraj Tayal"
                className="team-img mb-3"
              />
              <h4>Neeraj Tayal</h4>
              <p className="position">Founder, Aashrey Realtors</p>
              <p>
                Neeraj Tayal is the visionary who laid the foundation of Aashrey
                Realtors. With his extensive knowledge and experience in real
                estate, he has built the company from the ground up.
              </p>
            </div>
            <div className="col-md-6 team-member">
              <img src={sonImg} alt="Ritesh Tayal" className="team-img mb-3" />
              <h4>Ritesh Tayal</h4>
              <p className="position">Co founder</p>
              <p>
                {/* , son of Kailash Chand Khandelwal, */}
                Ritesh Tayal, now leads Aashrey Realtors. Under his guidance,
                the company continues to thrive and achieve new milestones in
                the real estate market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
