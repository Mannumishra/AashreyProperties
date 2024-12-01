import React, { useEffect } from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    },[])
    return (
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p>
                At <strong>Aashrey Realtors</strong>, your privacy is of utmost
                importance to us. This Privacy Policy explains how we collect, use, and
                protect your personal information. By using our services, you agree to
                the terms outlined in this policy.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li>
                    **Personal Information**: Name, contact details (phone number, email
                    address), and property preferences.
                </li>
                <li>
                    **Transaction Information**: Details of property purchases, sales, or
                    rental agreements.
                </li>
                <li>
                    **Website Usage Information**: Data collected through cookies and
                    analytics tools to improve user experience.
                </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
                The information we collect is used for the following purposes:
            </p>
            <ul>
                <li>To provide and improve our real estate services.</li>
                <li>To communicate with you about your inquiries or transactions.</li>
                <li>
                    To send you updates, promotional offers, or newsletters (with your
                    consent).
                </li>
                <li>To ensure compliance with legal and regulatory obligations.</li>
            </ul>

            <h2>3. Sharing Your Information</h2>
            <p>We do not share your personal information with third parties except:</p>
            <ul>
                <li>When required by law or legal processes.</li>
                <li>
                    To trusted partners assisting us in delivering our services (e.g.,
                    payment processors or property consultants).
                </li>
                <li>With your explicit consent.</li>
            </ul>

            <h2>4. Data Protection</h2>
            <p>
                We take appropriate measures to protect your data from unauthorized
                access, alteration, disclosure, or destruction. Our security measures
                include:
            </p>
            <ul>
                <li>Using secure servers and encryption for sensitive data.</li>
                <li>Regularly updating our systems to prevent vulnerabilities.</li>
                <li>
                    Limiting access to personal information to authorized personnel only.
                </li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access the personal information we hold about you.</li>
                <li>
                    Request corrections or updates to your personal information.
                </li>
                <li>Request the deletion of your personal information (subject to legal obligations).</li>
                <li>Opt-out of receiving promotional communications.</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
                Our website uses cookies to enhance your browsing experience. By
                continuing to use our website, you consent to the use of cookies. You
                can adjust your browser settings to disable cookies if you prefer.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
                Aashrey Realtors reserves the right to update this Privacy Policy at
                any time. Changes will be communicated through our website or other
                appropriate channels.
            </p>

            <h2>8. Contact Us</h2>
            <p>
                For any questions or concerns regarding our Privacy Policy, please
                contact us:
            </p>
            <address>
                <strong>Aashrey Realtors</strong> <br />
                Phone: 9999030896 <br />
                Email: aashreyrealtors@gmail.com <br />
                Address: GF, PKT 10, 152-153, Pocket 8, Sector-24, Rohini, New Delhi, Delhi, 110085
            </address>
        </div>
    );
};

export default PrivacyPolicy;
