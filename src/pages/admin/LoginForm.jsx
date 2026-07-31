import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApiLayout from '../../api/ApiLayout';
import '../../web-css/WebStyle.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.userName || !form.password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(ApiLayout.login, {
        userName: form.userName,
        password: form.password,
        mobileDeviceId: "web",
      });

      const result = response.data;
      console.log("Login API Response:", result);

      if (result?.isSuccess && result?.statusCode === 200) {
        const session = result.data.userSession;
        const authRes = result.data.authenticationResponse;

        localStorage.setItem("fullName", session.fullName);
        localStorage.setItem("mobileDeviceId", session.mobileDeviceId);
        localStorage.setItem("senderID", session.senderID);
        localStorage.setItem("senderSocket", session.senderSocket);
        localStorage.setItem("userName", session.userName);
        localStorage.setItem("userType", session.userType);
        localStorage.setItem("role", session.role);
        localStorage.setItem("tokenId", authRes.tokenId);
        localStorage.setItem("refreshToken", authRes.refreshToken);
        localStorage.setItem("accessToken", authRes.accessToken);

        navigate("/", { replace: true });
      } else {
        setError(result?.message || "Invalid username or password");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server Error");
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-title">User Login</h2>

      {error && (
        <p style={{ color: "red", marginBottom: 15 }}>
          {error}
        </p>
      )}
 
      <form onSubmit={handleLogin}>
        <div className="input-field input-field-login">
          <input
            type="text"
            name="userName"
            placeholder=" "
            className={`form-control ${error ? "input-error-login" : ""}`}
            value={form.userName}
            onChange={handleLoginChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-field input-field-login">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder=" "
            className={`form-control ${error ? "input-error-login" : ""}`}
            value={form.password }
            onChange={handleLoginChange}
            required
          />
          <label>Password</label>
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="d-flex justify-content-end flex-wrap">
          <a href="#" className="forget">Forget Password?</a>
        </div>

        <div className="login-btn">
          <button
            // type="submit"
            className={`login ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? <span className="button-spinner" /> : "Login to your Account!"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;