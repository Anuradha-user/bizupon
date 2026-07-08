import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../api/authApi';
import OtpVerification from './OtpVerification';

const SignupForm = () => {
      const [errors, setErrors] = useState({});
      const [formError, setFormError] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        country: "India"
      });
const navigate = useNavigate();

      // Handle input changes


     const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Validate only this field
  const error = validateField(e.target.name, e.target.value);

  setErrors((prev) => ({
    ...prev,
    [e.target.name]: error,
  }));
  };


  //validate fields
const validateField = (name, value) => {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "First name is required.";
      if (value.trim().length < 2)
        return "First name must be at least 2 characters.";
      if (!/^[A-Za-z]+$/.test(value))
        return "Only letters are allowed";
      return "";

    case "lastName":
      if (!value.trim()) return "Last name is required.";
      if (!/^[A-Za-z]+$/.test(value))
        return "Only letters are allowed";
      return "";

    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
        return "Please enter a valid email address.";
      return "";

    case "phone":
      if (!value.trim()) return "Phone number is required.";
      if (!/^[0-9]{10}$/.test(value))
        return "Phone number must be 10 digits.";
      return "";

    case "country":
      if (!value) return "Please select a country.";
      return "";

    case "password":
      if (!value) return "Password is required.";
      if (value.length < 8)
        return "Password must be at least 8 characters.";
      return "";

    default:
      return "";
  }
};

  //register form validation
  const validateRegisterForm = () => {
    const newErrors = {};

    // First Name checks whether firstName is empty (or contains only spaces)
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";

    }
    else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only letters are allowed";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Only letters are allowed";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Country
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    // else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(formData.password)
    // ) {
    //   newErrors.password =
    //     "Password must contain uppercase, lowercase, number and special character.";
    // }

    return newErrors;
  };
const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setFormError("");
    setSuccessMessage("");

    const validationErrors = validateRegisterForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await registerApi({
        regid: "",
        fname: formData.firstName,
        lname: formData.lastName,
        countryId: 0,
        countryName: formData.country,
        cityName: "",
        contactNo: formData.phone,
        email: formData.email,
        password: formData.password,
        empid: 0,
        mobileDeviceId: "",
      });

      const data = response?.data;
      console.log("Registration API Response:", data);

      if (response?.status >= 400) {
        setFormError(data?.message || "Registration failed");
        return;
      }

      setSuccessMessage("Registration successful. Please enter the OTP sent to your email.");
      setShowOtp(true);
      console.log("register data", data);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setFormError(message);
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };


   useEffect(() => {
      if (Object.keys(errors).length === 0 && !formError) {
        return;
      }
  
      const timeoutId = setTimeout(() => {
        setErrors({});
        setFormError("");
      }, 5000);
  
      return () => clearTimeout(timeoutId);
    }, [errors, formError]);
  const handleOtpVerify = async (otp) => {
    console.log('Verify OTP', otp, formData.email);
    setFormError('');
    setSuccessMessage('OTP verified successfully. You can now log in.');
    setShowOtp(false);
    navigate('/auth');
  };

  const handleOtpResend = async () => {
    console.log('Resend OTP to', formData.email);
    setSuccessMessage('A new OTP has been sent to your email.');
  };

  return (
    <>
     <h2 className="form-title">Create your Account!</h2>
     {showOtp ? (
       <OtpVerification
         email={formData.email}
         loading={loading}
         onVerify={handleOtpVerify}
         onResend={handleOtpResend}
       />
     ) : (
       <form onSubmit={handleRegisterSubmit}>
                            <div className="d-flex gap-4">
                              <div className="input-field">
                                <input
                                  type="text"
                                  className="form-control"
                                  
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                />
                                <label>First Name</label>
                                {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                              </div>
                              <div className="input-field">
                                <input
                                  type="text"
                                  className="form-control"
                                  
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                />
                                <label>Last Name</label>
                                {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                              </div>
                            </div>
    
                            <div className="d-flex gap-4">
                              <div className="input-field">
                                <input
                                  type="email"
                                  className="form-control"
                                  
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                                <label>Email</label>
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                              </div>
                              <div className="input-field">
                                <input
                                  type="tel"
                                  className="form-control"
                                  
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                />
                                <label>Phone</label>
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                              </div>
                            </div>
    
                            <div className="d-flex gap-4">
                              <div className="input-field">
                                <select
                                  className="form-control"
                                  
                                  name="country"
                                  value={formData.country}
                                  onChange={handleChange}
                                >
                                  <option value="India">India</option>
                                  <option value="China">China</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                </select>
                                <label>Country</label>
                                {errors.country && <small className="text-danger">{errors.country}</small>}
                              </div>
                              <div className="input-field">
                                <input
                                  type="password"
                                  className="form-control"
                                  
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                                <label>Password</label>
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                              </div>
                            </div>
    
                            <div className="login-btn">
                              <button type="submit" className="signup" disabled={loading}>
                                {loading ? <CircularProgress color="white" size={26} /> : "Register Now!"}
                              </button>
    
                            </div>
                            {formError && <p className="text-danger">{formError}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                          </form>
     )}
                        </>
  )
}

export default SignupForm