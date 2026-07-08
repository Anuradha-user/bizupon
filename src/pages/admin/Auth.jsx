import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoWhite from "../../web-images/logo-white.svg";
import loginBG from '../../web-images/login-bg.jpg';
import '../../web-css/WebStyle.css';
import ApiLayout from "../../assets/Apilayout";

function Auth() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
      const response = await axios.post("https://jaishriganesha.com/authentication/api/Account/Account", {
        username: form.userName,
        password: form.password,
        mobileDeviceId: "web",
      });

      const data = response.data;
      console.log("Login API Response:", data);

      if (data?.auth?.authenticationResponse && data?.auth?.bizlogin === "1") {
        // save each field directly to localStorage
        const userSession = data.auth.userSession;
        Object.entries(userSession).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            localStorage.setItem(key, value);
          }
        });

        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server Error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="login-bg">
        <img className="login-bg-inner" src={loginBG} alt="" />
      </div>
      <main className="overflow-hidden">
        <div className="wrapper">
          <div className="main-inner">
            <div className="logo">
              <div className="logo-icon">
                <a href='/'><img src={logoWhite} alt="Bizupon Logo" /></a>
              </div>
            </div>

            <div className="row h-100 align-content-center">
              {/* LEFT SIDE */}
              <div className="col-lg-6 col-md-12 col-12 tab-100">
                <div className="side-text">
                  <article>
                    <h1 className="main-heading">Welcome Back</h1>
                    <p>Access 140,000+ Quality Vehicles at the Lowest Prices, Weekly through bizupon.</p>
                  </article>

                  <div className="logSign">
                    <button className={showLogin ? "active" : ""} onClick={() => setShowLogin(true)} type="button">Login</button>
                    <button className={!showLogin ? "active" : ""} onClick={() => setShowLogin(false)} type="button">Register</button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-6 col-md-12 col-12 tab-100">
                <div className="form">
                  {showLogin ? (
                    <>
                      <h2 className="form-title">User Login</h2>

                      {error && (
                        <p style={{ color: "red", marginBottom: 15 }}>
                          {error}
                        </p>
                      )}

                      <form onSubmit={handleLogin}>
                        <div className="input-field">
                          <input
                            type="text"
                            name="userName"
                            className="form-control"
                            value={form.userName}
                            onChange={handleChange}
                            required
                          />
                          <label>Email</label>
                        </div>

                        <div className="input-field">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                          />
                          <label>Password</label>
                        </div>

                        <div className="d-flex justify-content-end flex-wrap">
                          <a href="#" className="forget">Forget Password?</a>
                        </div>

                        <div className="login-btn">
                          <button
                            type="submit"
                            className={`login ${loading ? "loading" : ""}`}
                            disabled={loading}
                          >
                            {loading ? <span className="button-spinner" /> : "Login to your Account!"}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <h2 className="form-title">Create your Account!</h2>
                      <form>
                        <div className="d-flex gap-4">
                          <div className="input-field">
                            <input type="text" className="form-control" required />
                            <label>First Name</label>
                          </div>
                          <div className="input-field">
                            <input type="text" className="form-control" required />
                            <label>Last Name</label>
                          </div>
                        </div>

                        <div className="d-flex gap-4">
                          <div className="input-field">
                            <input type="text" className="form-control" required />
                            <label>Email</label>
                          </div>
                          <div className="input-field">
                            <input type="text" className="form-control" required />
                            <label>Phone</label>
                          </div>
                        </div>

                        <div className="d-flex gap-4">
                          <div className="input-field">
                            <select className="form-control">
                              <option>Select Country</option>
                              <option>India</option>
                              <option>China</option>
                              <option>Sri Lanka</option>
                            </select>
                            <label>Country</label>
                          </div>
                          <div className="input-field">
                            <input type="password" className="form-control" required />
                            <label>Password</label>
                          </div>
                        </div>

                        <div className="login-btn">
                          <button type="button" className="signup">Register Now!</button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Auth;