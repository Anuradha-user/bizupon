import React, { useState } from 'react'


const LoginForm = () => {
      const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

       const [form, setForm] = useState({
          userName: "",
          password: "",
        });
    
 const handleLoginChange = (e) => {
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
      const response = await axios.post(ApiLayout.login, {
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
   <>
                      <h2 className="form-title">User Login</h2>

                      {error && (
                        <p style={{ color: "red", marginBottom: 15 }}>
                          {error}
                        </p>
                      )}

                      
                    </>
   <form onSubmit={handleLogin}>
                        <div className="input-field">
                          <input
                            type="text"
                            name="userName"
                            className="form-control"
                            value={form.userName}
                            onChange={handleLoginChange}
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
                            onChange={handleLoginChange}
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
  )
}

export default LoginForm