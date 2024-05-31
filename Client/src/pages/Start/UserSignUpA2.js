import React, { useEffect, useState, useRef } from "react";
import "./UserSignUpA2.css";
import HumanCityLogo from "../../assets/HumanCityLogo.png";
import sslogo from "../../assets/sslogo.png";
import orline from "../../assets/orline.png";

import holderimg from "../../assets/holderimg.png";
import googlesignin from "../../assets/googlesignin.png";
import facesignin from "../../assets/facesignin.png";
import projectsignin from "../../assets/projectsignin.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerData } from "../../features/User/registerSlice";
import { Overlay, Tooltip } from 'react-bootstrap';



const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matching, setMatching] = useState(true);
  const [valid, setValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerForm = useSelector((state) => state.register);
  /* based on login servers, Passwords must be between 8-10 characters long, 
        have at least one uppercase letter, lowercase letter, number and symbol */
  const check =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    if (check.test(password)) {
      setValid(true);
    } else {
      setValid(false);
    }

    if (password == confirmPassword) setMatching(true);
    else setMatching(false);
  }, [password, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    if (!matching || !acceptedTerms || !valid) return;
    dispatch(
      registerData({
        email: event.target.email.value,
        password: event.target.password.value,
      })
    );
    navigate("/accountsetup");
  };
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const target = useRef(null);
  return (
    <>
      <div className="boss">
        <div className="left">
          <img className="holderimg" src={holderimg} alt="holderimg" />
        </div>

        <div className="right">
          <div className="topspace"></div>
          <img className="sslogo" src={sslogo} alt="sslogo" />
          <div className="signuptitle">Let's get you stitched in!</div>
          <div className="signupdescription">
            We're designing and creating an open ecosystem; so innovative ideas
            can turn into world changing action.{" "}
          </div>

          <form className="formsignin" onSubmit={handleSubmit}>
            <input
              className="email"
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(event) => {
                // localStorage.setItem("email", event.target.value);
                // setEmail(event.target.value);
                if (check.test(event.target.value)) {
                  localStorage.setItem("email", event.target.value);
                  setEmail(event.target.value);
                } else {
                  console.log('Invalid email format');
                }
              }}
            />
            {/* <br /> */}
            {password && confirmPassword && !matching && (
              <>

              <p className="passwordMatch">
                passwords do not match
              </p>
              </>
            )}
            
            <input
            ref={target}
            className="password"
            type={showPassword ? "text" : "password"}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="Password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
            <Overlay target={target.current} show={isPasswordFocused} placement="left" >
              {(props) => (
                <Tooltip id="button-tooltip" {...props} className="password-tooltip">
                  <ul className="passwordRequirement">
                    <li>Passwords must be between 8-10 characters long</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One symbol</li>
                  </ul>
                </Tooltip>
              )}
            </Overlay>

            {/* <br/> */}
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              id="confirmpassword"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <br />
            {/* {!valid && isPasswordFocused && (
              <>
              <ul className="passwordRequirement">
                <li>Passwords must be between 8-10 characters long</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One symbol</li>
              </ul>
                <br />
              </>
            )} */}


            <br />
            <div className="checkarea">
              <input
                className="checkboxpolicy"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              <div className="policy">
                I accept Spotstitch's{" "}
                <span className="bold">Privacy Policy</span> and{" "}
                <span className="bold">Terms of Service</span>.
              </div>
            </div>
            <br />
            <input
              className="signup btn btn-primary"
              type="submit"
              value="Join Spotstitch"
            ></input>
          </form>
          <br />
          <img className="lineor" src={orline} alt="orline" />
          <br />
          <button className="googlebutton">
            <img src={googlesignin} alt="googlesignin" border="0" />
          </button>
          <br />
          <button className="facebookbutton">
            <img src={facesignin} alt="facebooksignin" border="0" />
          </button>
          <br />
          <button className="projectbutton">
            <img src={projectsignin} alt="projectsignin" border="0" />
          </button>
          <br />
          <div className="policy2">
            <span className="bold">Privacy Policy</span> and{" "}
            <span className="bold">Terms of Service</span> apply.
          </div>

          <div className="botspace"></div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
