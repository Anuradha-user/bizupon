import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../api/authApi';
import OtpVerification from './OtpVerification';
import Swal from 'sweetalert2';
import { registerValidateField, validateRegisterForm } from '../../helpers/validation';

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
    const error = registerValidateField(e.target.name, e.target.value);

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: error,
    }));
  };




  //handle register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setFormError("");
    setSuccessMessage("");

    const validationErrors = validateRegisterForm(formData);
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

      // Show a success alert using SweetAlert2 to inform the user that the OTP has been sent
      // Swal.fire({
      //   icon: "success",
      //   title: "OTP Sent",
      //   text: "A verification code has been sent to your email address. Please check your inbox and enter the OTP to continue.",
      //   confirmButtonText: "OK",
      // });
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

  // Clear errors and formError after 5 seconds
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

  // Handle OTP verification
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