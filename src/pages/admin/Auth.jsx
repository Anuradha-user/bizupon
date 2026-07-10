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

            <div className="row h-100 align-content-center ">
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