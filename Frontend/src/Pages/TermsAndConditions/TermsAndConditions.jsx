import React, { useEffect } from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    },[])
    return (
        <div className="terms-container">
            <h1>Terms and Conditions</h1>
            <p>
                Welcome to <strong>Aashrey Realtors</strong>. These terms and conditions
                outline the rules and regulations for the use of our services. By
                accessing or using our services, you accept these terms in full. If you
                do not agree with any part of these terms, you must not use our
                services.
            </p>

            <h2>1. Introduction</h2>
            <p>
                Aashrey Realtors specializes in property-related transactions,
                including:
            </p>
            <ul>
                <li>Buying properties</li>
                <li>Selling properties</li>
                <li>Renting properties</li>
            </ul>

            <h2>2. Services Offered</h2>
            <p>Our services include but are not limited to:</p>
            <ul>
                <li>Assisting in property sales and purchases</li>
                <li>Facilitating rental agreements</li>
                <li>Providing consultations for real estate investments</li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <p>By engaging with Aashrey Realtors, you agree to:</p>
            <ul>
                <li>Provide accurate and complete information during transactions</li>
                <li>Comply with all legal obligations related to property transactions</li>
                <li>Not misuse the platform or services provided by Aashrey Realtors</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <ul>
                <li>Payments for services must be made as per the agreed schedule.</li>
                <li>Refunds or cancellations are subject to company policies.</li>
                <li>
                    Aashrey Realtors reserves the right to charge additional fees for
                    delayed payments.
                </li>
            </ul>

            <h2>5. Limitation of Liability</h2>
            <p>
                Aashrey Realtors will not be held responsible for losses or damages
                resulting from unforeseen circumstances. We act solely as a facilitator
                and are not liable for disputes between buyers and sellers or tenants
                and landlords.
            </p>

            <h2>6. Confidentiality</h2>
            <p>
                All client information is handled with the utmost confidentiality.
                Aashrey Realtors will not share your data with third parties without
                your consent, except where required by law.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
                Aashrey Realtors reserves the right to update or change these terms at
                any time. Users are encouraged to review the terms periodically.
            </p>

            <h2>8. Governing Law</h2>
            <p>
                These terms are governed by and construed in accordance with the laws
                of India. Any disputes will be subject to the exclusive jurisdiction of
                the courts in [Your City].
            </p>

            <h2>Contact Us</h2>
            <p>
                For any queries or concerns regarding these terms, please contact us:
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

export default TermsAndConditions;
