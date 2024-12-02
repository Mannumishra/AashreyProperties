import React, { useEffect, useState } from 'react';
import logo from './logo.png'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Footer = () => {

  const [propertyCategory, setPropertyCategory] = useState([]);

  const fetchPropertyCategories = async () => {
    try {
      const response = await axios.get(`https://api.aashreyrealtors.com/api/v1/get-property-category`);
      if (response.data.success) {
        setPropertyCategory(response.data.data);
      } else {
        console.error('Failed to load locations');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchPropertyCategories();
  }, [])

  return (
    <>
      <footer className="main-footer p_relative">
        <div className="footer-top p_relative d_block">
          <div className="icon-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-03.png)' }} />
          <div className="container">
            <div className="row clearfix">

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget left">
                  <div className="logo-widget">
                    <figure className="footer-logo"><Link to={`/`}><img src={logo} alt="logo" /></Link></figure>
                  </div>
                  <div className="widget-content">
                    <p style={{ color: 'white' }} >Aashrey Realtors is a trusted name in real estate, committed to helping you find your dream property. With a strong foundation built on honesty and integrity.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h4>Quick Links</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li><Link to={`/`}>Home</Link></li>
                      <li><Link to={`/about`}>About us</Link></li>
                      <li><Link to={`/properties`}>Property</Link></li>
                      {/* <li><Link to={`/blog`}>Blog</Link></li> */}
                      <li><Link to={`/contact`}>Contact Us</Link></li>
                      <li><Link to={`/termsandconditions`}>Terms & Conditions</Link></li>
                      <li><Link to={`/privacypolicy`}>Privacy Policy</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h4>Property </h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      {propertyCategory && propertyCategory.map((category, index) => (
                        <li><Link to={`/properties/${category.replace(/\s+/g, '-')}`} key={index}>{category}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget left">
                  <div className="widget-title">
                    <h4>Contact Details</h4>
                  </div>
                  <div className="widget-content pt-0">
                    <ul className="info-list clearfix">
                      <li><span className="icon-icon-31" /> GF, PKT 10, 152-153, Pocket 8, Sector-24, Rohini, New Delhi, Delhi, 110085</li>
                      <li><span className="icon-icon-35" /> <a href="tel:+919999030896">+91 9999030896</a></li>
                      <li><span className="icon-60" /> <a href="mailto:aashreyrealtors@gmail.com">aashreyrealtors@gmail.com</a></li>
                      <li>
                        <span className="social-icons">
                          <a href="https://www.facebook.com/profile.php?id=61568764097694" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', marginRight: '20px' ,fontSize:"40px" }}>
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="https://www.instagram.com/aashreyrealtors?igsh=MTlmMGV1eG16cjN6NQ==" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C' ,fontSize:"40px"}}>
                            <i className="fab fa-instagram"></i>
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div className="footer-bottom p_relative">
          <div className="container">
            <div className="bottom-inner p_relative">
              <div className="copyright"><p> Copyright © 2024 by <Link to={`/`}>Aashrey Realtors</Link>. All Rights Reserved By Aashrey Realtors Team</p></div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer