import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../../web-images/logo.svg';
import { IconLogin } from "@tabler/icons-react";
import "../../admin-css/Login.css";
import ApiLayout from "../../api/ApiLayout";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Please enter email";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Please enter password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post(ApiLayout.login, {
        userName: form.email,
        password: form.password,
        mobileDeviceId: "",
      });

      const result = response.data;
      console.log("API Response:", result);

      if (result?.isSuccess && result?.statusCode === 200) {
        const session = result.data.userSession;
        const authRes = result.data.authenticationResponse;

        localStorage.setItem("fullName", session.fullName);
        localStorage.setItem("mobileDeviceId", session.mobileDeviceId);
        localStorage.setItem("senderID", session.senderID);
        localStorage.setItem("senderSocket", session.senderSocket);
        localStorage.setItem("userName", session.userName);
        localStorage.setItem("role", session.role);
        localStorage.setItem("userType", session.userType);
        localStorage.setItem("tokenId", authRes.tokenId);
        localStorage.setItem("refreshToken", authRes.refreshToken);
        localStorage.setItem("accessToken", authRes.accessToken);

        navigate("/admin/dashboard");
      } else {
        setErrorMsg("Invalid email or password");
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
      const status = error.response?.status;
      if (status === 404 || status === 401) {
        setErrorMsg("Invalid email or password");
      } else if (!error.response) {
        setErrorMsg("Unable to reach the server. Check your connection.");
      } else {
        setErrorMsg("Please try again");
      }
      setLoading(false);
    }
  };

return (
    <div className="admin-auth">
      <div className="container-xxl">
        <div className="row vh-100 d-flex justify-content-center">
          <div className="col-lg-4 mx-auto align-self-center">
            <div className="card">
              <div className="card-body p-0 bg-black auth-header-box rounded-top">
                <div className="text-center p-3">
                  <Link to="/">
                    <img src={logo} alt="logo" className="auth-logo" />
                  </Link>
                  <h5 className="mt-3 fw-medium text-white">
                    Sign in to continue to Bizupon.
                  </h5>
                </div>
              </div>

              <div className="card-body p-4 pt-0">
                <form className="mt-4 mb-2" onSubmit={handleSubmit}>
                  
                  {errorMsg && <p className="error-message">{errorMsg}</p>}

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      type="text"
                      className={`form-control ${errors.email ? "error" : ""}`}
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "error" : ""}`}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}
                  </div>

                  <div className="forgotPassword">  
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>

                  <div className="form-group mb-0 row">
                    <div className="col-12">
                      <div className="d-grid mt-2">
                        <button className="btn btn-md btn-primary" type="submit" disabled={loading}>
                          {loading ? "Logging in..." : "Login"}
                          <IconLogin />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;