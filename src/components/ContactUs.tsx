import React from 'react';
import '../styles/ContactUsStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import phoneIcon from '../styles/img/phone.svg'
import faxIcon from '../styles/img/fax.svg'
import mailIcon from '../styles/img/mail.svg';
const ContactUs: React.FC = () => {
  return (
    <div className="contact-us-page">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="contactus-card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="headerr">Get in <span className="text-primary-custom">Touch</span></div>
                    <br />
                    <p className="flex">Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                    <br />
                    <form>
                      <div className="form-groupp d-flex">
                        <div className="input-fieldd">
                          <input type="text" className="form-controll" id="name" placeholder="Name" required />
                          <label htmlFor="name"></label>
                        </div>
                      </div>
                      <div className="form-groupp d-flex" id='contact'>
                      <div className="input-fieldd">
                        <input type="email" className="form-controll" id="email" placeholder="Email" />
                        </div>
                      </div>
                      <div className="form-groupp d-flex">
                        <div className="input-fieldd">
                          <input type="text" className="form-controll" id="phone" placeholder="Phone number" required />
                          <label htmlFor="phone"></label>
                        </div>
                      </div>
                      <button type="submit" className="btn-primaryy">SEND</button>
                    </form>
                    <br />
                    <div className="contact-info mt-4 text-start">
                      <div>
                        <img src={phoneIcon} alt="Phone Icon" />
                        <span><strong>PHONE </strong><span className="red-text"><br />0354321234</span></span>
                      </div>
                      <div>
                        <img src={faxIcon} alt="Fax Icon" />
                        <span><strong>FAX </strong><span className="red-text"><br />0354321234</span></span>
                      </div>
                      <div>
                        <img src={mailIcon} alt="Mail Icon" />
                        <span><strong>EMAIL </strong><span className="red-text"><br />info@marcc.com.au</span></span>
                      </div>
                    </div>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.602319207572!2d144.9555566151399!3d-37.8172094423685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2us!4v1600292986089!5m2!1sen!2us"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      aria-hidden="false"
                      tabIndex={0}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default ContactUs;
