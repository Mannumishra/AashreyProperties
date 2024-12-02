import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import sideBg from './sideBg.jpg'

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const response = await axios.post(`https://api.aashreyrealtors.com/api/v1/login`, formData);
            setLoading(false)
            console.log(response.data);
            toast.success('Login SuccessFull')
            sessionStorage.setItem('hansBuilderToken', response.data.token);
            sessionStorage.setItem('hansBuilderUser', JSON.stringify(response.data.user));
            navigate('/profile')

        } catch (error) {
            console.log("Error While Login", error)
            if (error.response && error.response.data) {
                console.log("error.response", error)
                console.log(error.response.data);
                toast.error(error.response.data.msg);
            } else {
                console.log(error.response);  // Fallback to the error's message if no response
                toast.error('An unexpected error occurred');
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <>

            <section className="my-3 login-page">
                <div className="container">
                    <div className="row login">
                        <div className="col-md-6 d-none d-md-block">
                            <img src={sideBg} alt="laboratry Image" />
                        </div>
                        <div className="col-md-6 form-div text-center">
                            <div className="headings">
                                <h1>Welcome Back !</h1>
                                <p>Please login with your personal Details</p>
                            </div>
                            <div className="form" onSubmit={handleSubmit}>
                                <form>
                                    <div className="input-field">
                                        <i className="fa-solid fa-envelope"></i>
                                        <input type="email" value={formData.email} name='email' onChange={handleChange} placeholder="Enter Email" required />
                                    </div>
                                    <div className="input-field password-field">
                                        <i className="fa-solid fa-lock"></i>
                                        <input
                                            type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                                            value={formData.password}
                                            name="password"
                                            onChange={handleChange}
                                            placeholder="Enter Password"
                                            required
                                        />
                                        <i
                                            className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} // Dynamic icon
                                            onClick={() => setShowPassword(!showPassword)} // Toggle state
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>


                                    <div className="">
                                        <Link to="/login/forget-password">Forget Password?</Link>
                                        <div></div>
                                    </div>

                                    <button type='submit' disabled={loading} className={`${loading ? 'not-allowed' : 'allowed'}`}>
                                        {loading ? "Please Wait ..." : "Login"}
                                    </button>
                                </form>

                                <div className="tagline">
                                    Don't have an Account? <Link to="/sign-up">Sign-Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login