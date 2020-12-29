import React from 'react'
import './Homepage.scss';

function Homepage(props) {
    return (
        <div className="homepage">
            <div className="homepage__demo">
                <iframe className="homepage__demo-video" title="This is a demo video for what Chime has to offer." frameborder="0" allowfullscreen src="https://youtube.com/embed/ieD6xP5efnY"></iframe>
            </div>
            <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
            <div className="homepage__form">
                <p>Chime is currently in the test phase. If you are intrested, please give us your contact information and we will reach out with updates on availibility.</p>
                <div id="mc_embed_signup" className="text">
                    <h3 className="sign-up" style={{textAlign: "center"}}>Sign up for alerts</h3>
                    <form
                        action="https://digital.us2.list-manage.com/subscribe/post?u=836af7ddf847d4c8fe3052def&amp;id=af686395a7"
                        method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                        target="_blank" novalidate>
                        <div id="mc_embed_signup_scroll">
                            <div className="mc-field-group">
                                <label for="mce-EMAIL">Email Address </label>
                                <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL" />
                            </div>
                            <div className="mc-field-group">
                                <label for="mce-FNAME">First Name </label>
                                <input type="text" value="" name="FNAME" className="required" id="mce-FNAME" />
                            </div>
                            <div className="mc-field-group">
                                <label for="mce-LNAME">Last Name </label>
                                <input type="text" value="" name="LNAME" className="required" id="mce-LNAME" />
                            </div>
                            <div className="mc-field-group">
                                <label for="mce-COMPANY">Company </label>
                                <input type="text" value="" name="COMPANY" className="required" id="mce-COMPANY" />
                            </div>
                            <div id="mce-responses" className="clear">
                                <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                                <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                            </div>
                            <div style={{ position: "absolute", left: -5000 }} aria-hidden="true"><input type="text"
                                name="b_836af7ddf847d4c8fe3052def_af686395a7" tabindex="-1" value="" /></div>
                            <div className="clear">
                                <input type="submit" value="Subscribe" name="subscribe"
                                    id="mc-embedded-subscribe" className="button" />
                            </div>
                        </div>
                    </form>
                </div>
                <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
                <script type='text/javascript'>
                    {
                        `function ($) {window.fnames = new Array(); window.ftypes = new Array(); fnames[0] = 'EMAIL'; ftypes[0] = 'email'; fnames[1] = 'FNAME'; ftypes[1] = 'text'; fnames[2] = 'LNAME'; ftypes[2] = 'text'; fnames[3] = 'COMPANY'; ftypes[3] = 'text'; }(jQuery)); var $mcj = jQuery.noConflict(true);`
                    }
                </script>
            </div>
        </div>
    )
}

export default Homepage
