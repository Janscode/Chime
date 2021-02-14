import React from 'react';
import './Homepage.scss';

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__demo">
        <iframe
          allowFullScreen
          className="homepage__demo-video"
          frameBorder="0"
          src="https://youtube.com/embed/ieD6xP5efnY"
          title="This is a demo video for what Chime has to offer."
        ></iframe>
      </div>
      <link
        href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="homepage__form">
        <p style={{ paddingBottom: 15 }}>
          {/* eslint-disable-next-line */}
          Chime is currently in the test phase. If you are intrested, please give us your contact information and we will reach out with updates on availibility.
        </p>
        <div id="mc_embed_signup" className="text">
          <h3 className="sign-up" style={{ textAlign: 'center' }}>Sign up for alerts</h3>
          <form
            action="https://digital.us2.list-manage.com/subscribe/post?u=836af7ddf847d4c8fe3052def&amp;id=af686395a7"
            className="validate"
            id="mc-embedded-subscribe-form"
            method="post"
            name="mc-embedded-subscribe-form"
            noValidate
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address </label>
                <input
                  className="required email"
                  id="mce-EMAIL"
                  name="EMAIL"
                  type="email"
                  defaultValue=""
                />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-FNAME">First Name </label>
                <input
                  type="text"
                  defaultValue=""
                  name="FNAME"
                  className="required"
                  id="mce-FNAME"
                />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-LNAME">Last Name </label>
                <input
                  type="text"
                  defaultValue=""
                  name="LNAME"
                  className="required"
                  id="mce-LNAME"
                />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-COMPANY">Company </label>
                <input
                  type="text"
                  defaultValue=""
                  name="COMPANY"
                  className="required"
                  id="mce-COMPANY"
                />
              </div>
              <div id="mce-responses" className="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: 'none' }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: 'none' }}
                ></div>
              </div>
              <div
                style={{ position: 'absolute', left: -5000 }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_836af7ddf847d4c8fe3052def_af686395a7"
                  tabIndex="-1"
                  value=""
                />
              </div>
              <div className="clear">
                <input type="submit" value="Subscribe" name="subscribe"
                  id="mc-embedded-subscribe" className="button" />
              </div>
            </div>
          </form>
        </div>
        <script
          src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'
          type='text/javascript'
        ></script>
        <script type='text/javascript'>
          {/* eslint-disable-next-line */}
          {`function ($) {window.fnames = new Array(); window.ftypes = new Array(); fnames[0] = 'EMAIL'; ftypes[0] = 'email'; fnames[1] = 'FNAME'; ftypes[1] = 'text'; fnames[2] = 'LNAME'; ftypes[2] = 'text'; fnames[3] = 'COMPANY'; ftypes[3] = 'text'; }(jQuery)); var $mcj = jQuery.noConflict(true);`}
        </script>
      </div>
    </div>
  );
}

export default Homepage;
