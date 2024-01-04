import { useState } from "react";

import { authProvider } from "../../helpers/authProvider";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

import "../../css/Util.css";
import "../../css/SignIn.css";

function SignUp() {
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const from = params.get("from") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUpClick() {
    try {
      const isValidForm = validateForm();

      if (isValidForm) {
        const response = await authProvider.register(email, password);

        if (!response.data.success) alert(response.data.message);
        else {
          navigate(from);
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  function validateForm() {
    let check = true;
    const input = document.querySelectorAll(".validate-input .input100");
    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  }

  function validate(input) {
    if (input.type == "email" || input.name == "email") {
      if (
        input.value
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if (input.value.trim() == "") {
        return false;
      }
    }
  }

  function handleInputBlur(e) {
    const targetVal = e.target.value;
    if (targetVal.trim() !== "") {
      e.target.classList.add("has-val");
    } else {
      e.target.classList.remove("has-val");
    }
  }

  function showValidate(input) {
    var thisAlert = input.parentElement;
    thisAlert.classList.add("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = input.parentElement;
    thisAlert.classList.remove("alert-validate");
  }

  return (
    <div className="sign-in">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              className="login100-more"
              style={{ backgroundImage: `url("images/bg-07.jpg")` }}
            >
              <div className="login100-form validate-form">
                <span className="login100-form-title p-b-43">Register</span>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    onBlur={(e) => handleInputBlur(e)}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      hideValidate(e.target);
                    }}
                    className="input100"
                    type="text"
                    name="email"
                  ></input>
                  <span className="focus-input100"></span>
                  <span className="label-input100">Email</span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    onBlur={(e) => handleInputBlur(e)}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      hideValidate(e.target);
                    }}
                    className="input100"
                    type="password"
                    name="pass"
                  ></input>
                  <span className="focus-input100"></span>
                  <span className="label-input100">Password</span>
                </div>

                {/* <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                ></input>
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div> */}

                <div className="container-login100-form-btn">
                  <button
                    onClick={() => handleSignUpClick()}
                    className="login100-form-btn"
                  >
                    Register
                  </button>
                </div>

                <div className="text-center p-t-46 p-b-20">
                  <span className="txt2">
                    Already have an account? <Link to={"/login"}>Login</Link>{" "}
                  </span>
                </div>

                {/* <div className="login100-form-social flex-c-m">
              <a
                href="#"
                className="login100-form-social-item flex-c-m bg1 m-r-5"
              >
                <i className="fa fa-facebook-f" aria-hidden="true"></i>
              </a>

              <a
                href="#"
                className="login100-form-social-item flex-c-m bg2 m-r-5"
              >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
