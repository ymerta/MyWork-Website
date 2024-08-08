import React from 'react';
import '../styles/ContactUsStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import exitImage from '../styles/img/exit.svg'

const Info: React.FC = () => {
  return (
    <div>
     

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="flex">Get in <span className="text-primary-custom">Touch</span></h2>
                    <br />
                    <p className="flex">Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                    <br />
                    <form>
                      <div className="form-group d-flex">
                        <div className="input-field">
                          <input type="text" className="form-control" id="name" placeholder="Name" required />
                          <label htmlFor="name"></label>
                        </div>
                      </div>
                      <div className="form-group d-flex">
                        <input type="email" className="form-control" id="email" placeholder="Email" />
                        <label htmlFor="email"></label>
                      </div>
                      <div className="form-group d-flex">
                        <div className="input-field">
                          <input type="text" className="form-control" id="phone" placeholder="Phone number" required />
                          <label htmlFor="phone"></label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">SEND</button>
                    </form>
                    <br />
                    <div className="contact-info mt-4 text-start">
                      <div>
                        <img src="img/phone.png" alt="Phone Icon" />
                        <span><strong>PHONE </strong><span className="red-text"><br />0354321234</span></span>
                      </div>
                      <div>
                        <img src="img/fax.png" alt="Fax Icon" />
                        <span><strong>FAX </strong><span className="red-text"><br />0354321234</span></span>
                      </div>
                      <div>
                        <img src="img/mail.png" alt="Mail Icon" />
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
    </div>
  );
};

export default Info;
