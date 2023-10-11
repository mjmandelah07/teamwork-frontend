import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import loginImage from "../assests/images/pexels-tranmautritam.jpg";
import logo from "../assests/images/logo.png"
import vd from "../assests/videos/8.mp4";
import "../css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const auth = useAuth();
  const naviagte = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError("");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signIn(email, password);

      if (result.userToken) {
        setEmail(""); // clear email input field
        setPassword(""); // clear password input field
        alert(result.message);
        naviagte("/");
      } else if (result.error) {
        setLoginError(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="layout-full h-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="video-container">
              <video
                src={vd}
                autoPlay
                muted
                loop
                id="myVideo"
                className="html5-video background-video-hosted "
              />
            </div>
            <div className="background-overlay"></div>
            <div className="elementor-container h-100">
              <div className="elementor-row row">
                <div className="col-md-2 elementor-column logo-container">
                  <div className="elementor-column-wrap">
                    <div className="elementor-widget-wrap">
                      <img src={logo} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="elementor-column col-md-8">
                  <div className="elementor-container">
                    <div className="login-content elementor-container d-flex align-items-md-center h-100 w-100">
                      <div className="row elementor-row  content-container">
                        <div className="left-side elementor-column col-md-6 order-two">
                          <img
                            src={loginImage}
                            alt="login"
                            className="img-fluid"
                          />
                        </div>

                        <div className="form-container col-md-6 order-one elementor-column">
                          <div className="elementor-column-wrap elementor-element-populated">
                            <div className="elementor-widget-wrap">
                              <div className="elementor-wrapper animate__animated animate__bounce w-100">
                                <h2 className="elementor-heading-title">
                                  Welcome
                                </h2>
                              </div>
                              <div className="elementor-para w-100 animate__animated animate__fadeIn">
                                <p>Welcome back you've been missed</p>
                              </div>

                              <div className="form-div animate__animated animate__bounceInUp elementor-widget-container w-100">
                                <div className="login-form-wrapper">
                                  {loginError && (
                                    <div
                                      className="alert-danger login-error mt-1"
                                      role="alert"
                                    >
                                      {loginError}
                                    </div>
                                  )}
                                  <form onSubmit={handleSubmit}>
                                    <div className="mb-3 email form-group ">
                                      <label
                                        htmlFor="email"
                                        className="form-label screen-reader-text"
                                      >
                                        Email address
                                      </label>
                                      <span className="icon">
                                        <i className="fa-solid fa-envelope"></i>
                                      </span>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Email Address"
                                      />
                                    </div>
                                    <div className="mb-3 form-group ">
                                      <label
                                        htmlFor="password"
                                        className="form-label screen-reader-text"
                                      >
                                        Password
                                      </label>
                                      <span className="icon">
                                        <i class="fa-solid fa-key"></i>
                                      </span>
                                      <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="form-control"
                                        aria-describedby="passwordHelpBlock"
                                        placeholder="Password"
                                      />
                                    </div>
                                    <div className="login-button submit mt-4">
                                      <button
                                        type="submit"
                                        className="btn ellipsis w-100"
                                      >
                                        Log into your account
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2  elementor-column"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
