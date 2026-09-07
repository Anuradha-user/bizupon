import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { emailResendOtpApi, emailVerificationApi, registerApi } from '../../api/authApi';
import Swal from 'sweetalert2';
import { registerValidateField, validateRegisterForm } from '../../helpers/validation';
import OtpVerification from './OtpVerification';
import countries from '../../data/countries';

const SignupForm = ({ setShowLogin }) => {
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

     

      if (data.isSuccess) {
        setSuccessMessage(data.message) 


        console.log("setSuccessMessage", successMessage)
      }
      if (data.isSuccess && data.data.isEmailExists === false) {
        setShowOtp(true)
      }
      if (data.isSuccess && data.data.isEmailExists === true && data.data.is_EmailVerified === false) {

        await handleOtpResend();
      }
      if (data.isSuccess && data.data.isEmailExists === true && data.data.is_EmailVerified === true) {
        Swal.fire({
          icon: "info",
          title: "Info",
          text: "Email is already registered and verified. Please login.",
          confirmButtonColor: "#2AAA31",
        });
        setShowLogin(true);

      }

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.message ||
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
    setLoading(true);
    setFormError('');
    setSuccessMessage('');
    try {
      const response = await emailVerificationApi({ email: formData.email, otp });
      const data =response?.data;
      setFormError('');
      if (data.isSuccess) {
        setSuccessMessage(data?.message || 'Email verified successfully.');

        Swal.fire({
          icon: "success",
          title: "Email Verified",
          text: "Your email has been successfully verified. You can now log in.",
          confirmButtonColor: "#2AAA31",
        });
      }

    setShowOtp(false);
    navigate('/auth');
  }
  catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.message ||
      "Failed to verify OTP. Please try again.";
      setFormError(message);
    }
    finally {
      setLoading(false);
    }
  };

  const handleOtpResend = async () => {
    setLoading(true);
    setFormError("");
    setSuccessMessage("");
    try {
      const response = await emailResendOtpApi(formData.email);

      if (response.data.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "OTP Resent",
          text: "A new verification code has been sent to your email address.",
          confirmButtonColor: "#2AAA31",
        });
        setSuccessMessage(response?.data?.message || 'A new OTP has been sent to your email.');

        setShowOtp(true);



      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message ||
        "Failed to resend OTP. Please try again.";

      setFormError(message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>

      {showOtp ? (
        <OtpVerification
          email={formData.email}
          loading={loading}
          onVerify={handleOtpVerify}
          onResend={handleOtpResend}
        />
      )
        :
        (
          <>
            <h2 className="form-title">Create your Account!</h2>
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
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>{country.name}</option>
                    ))}
                    {/* <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Sri Lanka">Sri Lanka</option> */}
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
          </>
        )}
    </>
  )
}

export default SignupForm