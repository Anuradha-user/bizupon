import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import logoWhite from "../../web-images/logo-white.svg";
import loginBG from '../../web-images/login-bg.jpg';
import '../../web-css/WebStyle.css';
import SignupForm from './SignupForm';
import LoginForm from './loginForm';
function Auth() {
  
  const [showLogin, setShowLogin] = useState(true);
 
  
  const location = useLocation();

<<<<<<< HEAD

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

=======
>>>>>>> 9ec27b22730bfe6b1fc0d495f28222a70e0a887a
  useEffect(() => {
    if (location.pathname === "/auth") {
      setShowLogin(true);
    } else if (location.pathname === "/register") {
      setShowLogin(false);
    }
  }, [location.pathname]);


  

  //Login form submit
  

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
                    <button
                      className={showLogin ? "active" : ""}
                      onClick={() => {
                        setShowLogin(true);
                        
                      }}
                      type="button"
                    >
                      Login
                    </button>
                    <button
                      className={!showLogin ? "active" : ""}
                      onClick={() => {
                        setShowLogin(false);
                      
                      }}
                      type="button"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-6 col-md-12 col-12 tab-100">
                <div className="form">
                  {showLogin ? (
                    <LoginForm />
                    
                  ) : (

                    <>
                     <SignupForm />
                      
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