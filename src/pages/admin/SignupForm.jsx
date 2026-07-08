import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'

const SignupForm = () => {
      const [errors, setErrors] = useState({});
      const [formError, setFormError] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        country: "India"
      });


      // Handle input changes
     const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      const response = await fetch(
        "http://192.168.10.199:8010/api/User/Registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            password: formData.password,
            mobileDeviceId: "web"
          })
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setFormError(data.message || "Registration failed");
        return;
      }

      setSuccessMessage("Registration successful. Please login.");

      setShowLogin(true);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        country: "India"
      });
      navigate("/auth");
      console.log("register data", data);

    } catch (err) {
      setFormError("Something went wrong. Please try again.");
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
  return (
    <>
     <h2 className="form-title">Create your Account!</h2>
                          <form onSubmit={handleRegisterSubmit}>
                            <div className="d-flex gap-4">
                              <div className="input-field">
                                <input
                                  type="text"
                                  className="form-control"
                                  required
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
                                  required
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
                                  required
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
                                  required
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
                                  required
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
                                  required
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
  )
}

export default SignupForm