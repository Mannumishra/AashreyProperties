import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const PopupBox = () => {
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

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8000/api/v1/popup", data);
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your Query Sent Successfully',
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
                sessionStorage.setItem("formSubmitted", "true");
                setShowModal(false); // Close the modal
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
        const formSubmitted = sessionStorage.getItem("formSubmitted");

        if (!formSubmitted) {
            const intervalId = setInterval(() => {
                setShowModal(true);
            }, 10000);

            return () => clearInterval(intervalId);
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div
                    className={`modal ${showModal ? "fade show" : ""}`}
                    style={{ display: showModal ? 'block' : 'none' }}
                    id="enquiryModal"
                    aria-hidden={!showModal}
                    aria-labelledby="enquiryModalLabel"
                    tabIndex="-1"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="enquiryModalLabel">
                                    Enquiry Form
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control modalInput mb-3"
                                    placeholder="Enter Name"
                                    name="name"
                                    value={data.name}
                                    onChange={getInputdata}
                                    required
                                />
                                <input
                                    type="email"
                                    className="form-control modalInput mb-3"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={data.email}
                                    onChange={getInputdata}
                                    required
                                />
                                <input
                                    type="tel"
                                    className="form-control modalInput mb-3"
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    value={data.phone}
                                    onChange={getInputdata}
                                    required
                                />
                                <select
                                    name="lookingfor"
                                    className="form-control modalInput mb-3"
                                    onChange={getInputdata}
                                    value={data.lookingfor}
                                >
                                    <option value="" disabled>Please Select Looking For</option>
                                    <option value="Buying a Property">Buying a Property</option>
                                    <option value="Selling a Property">Selling a Property</option>
                                    <option value="Renting a Property">Renting a Property</option>
                                    <option value="Leasing a Property">Leasing a Property</option>
                                    <option value="Investing in Real Estate">Investing in Real Estate</option>
                                    <option value="Property Management Services">Property Management Services</option>
                                </select>
                                <textarea
                                    className="form-control modalInput"
                                    rows="3"
                                    placeholder="Enter Your Message (Optional)"
                                    name="message"
                                    value={data.message}
                                    onChange={getInputdata}
                                ></textarea>
                            </div>
                            <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                                <button
                                    type="button"
                                    style={{ backgroundColor: "#654321", color: "white" }}
                                    className="btn w-100"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupBox;
