import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTag from '../../components/Meta/MetaTags';
import Swal from 'sweetalert2';
import axios from 'axios';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    lookingfor: ""
  });

  const getInputdata = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/popup", data);
      if (res.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Your query has been sent successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setData({
          name: "",
          email: "",
          phone: "",
          message: "",
          lookingfor: ""
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your query. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <MetaTag
        title="Contact Us - Aashrey Realtors"
        description="Get in touch with Aashrey Realtors for your real estate needs. Located at RZF-904/14, Raj Nagar Part-II, Palam Colony, N.D-45. Call us at +91 9999030896 or email aashreyrealtors@gmail.com."
        keyword="Aashrey Realtors contact, real estate contact, Aashrey Realtors address, contact Aashrey Realtors, real estate inquiries, Aashrey Realtors phone number, Aashrey Realtors email"
      />

      {/* BreadCrumb */}
      <section className="page__title p_relative">
        <div className="bg-layer parallax-bg" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }} />
        <div className="container">
          <div className="content-box p_relative">
            <h1 className="title">Contact Us</h1>
            <ul className="bread-crumb">
              <li><Link to="/"><span className="icon-icon-16" />Home</Link></li>
              <li><span className="icon-57" />Contact Us</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact__style__one see__pad">
        <div className="container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 info-column">
              <div className="contact-info mr_70">
                <h3>Lets talk!</h3>
                <p>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out. We're here to help and answer any questions you may have. Let's connect and discuss how we can assist you.</p>
                <div className="contact__info__block">
                  <div className="left__site__info">
                    <div className="contact__icon one">
                      <span className="icon-56" />
                    </div>
                  </div>
                  <div className="right__site__info one">
                    <h5>Call us</h5>
                    <a href="tel:+919999030896">+91 9999030896</a>
                  </div>
                </div>
                <div className="contact__info__block">
                  <div className="left__site__info">
                    <div className="contact__icon two">
                      <span className="icon-55" />
                    </div>
                  </div>
                  <div className="right__site__info two">
                    <h5>E-mail Address</h5>
                    <a href="mailto:aashreyrealtors@gmail.com">aashreyrealtors@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-column">
              <div className="form-inner">
                <div className="contact___title">
                  <h3>Send us a message</h3>
                  <p>If you have any questions, inquiries, or feedback, we’re here to help. Reach out to us by filling out the form below, and our team will get back to you as soon as possible. We value your input and look forward to assisting you.</p>
                </div>

                <form onSubmit={handleSubmit} id="contact-form">
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input type="text" name="name" placeholder="Your Name" required value={data.name} onChange={getInputdata} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ps-xl-0 form-group">
                      <input type="email" name="email" placeholder="Your Email" required value={data.email} onChange={getInputdata} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input type="text" name="phone" placeholder="Your Phone Number" required value={data.phone} onChange={getInputdata} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ps-xl-0 form-group">
                      <input type="text" name="lookingfor" placeholder="Looking For (e.g., Services)" required value={data.lookingfor} onChange={getInputdata} />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <textarea name="message" placeholder="Message" required value={data.message} onChange={getInputdata} />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn mr-0">
                      <div className="more__buttons">
                        <button className="common-btn btn__two" type="submit" name="submit-form">
                          {loading ? "Please wait..." : "Send Your Message"} <i className="icon-icon-51" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="google-map-section">
        <div className="container">
          <h3>Our Location</h3>
          <div className="google-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3498.6208682765246!2d77.08407007550436!3d28.730874375611183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQzJzUxLjIiTiA3N8KwMDUnMTEuOSJF!5e0!3m2!1sen!2sin!4v1733118157453!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
