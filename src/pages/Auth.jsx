import { useState } from 'react';
import logoWhite from '../web-images/logo-white.svg';
import loginBG from '../web-images/login-bg.jpg';

function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div class="login-bg">
        <img class="login-bg-inner" src={loginBG} alt="" />
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
                    <form>
                      <div className="input-field">
                        <input type="text" className="form-control" required />
                        <label>Email</label>
                      </div>

                      <div className="input-field">
                        <input type="password" className="form-control" required />
                        <label>Password</label>
                      </div>

                      <div className="d-flex justify-content-end flex-wrap">
                        <a href="#" className="forget">Forget Password?</a>
                      </div>

                      <div className="login-btn">
                        <button type="button" className="login">
                          Login to your Account!
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
