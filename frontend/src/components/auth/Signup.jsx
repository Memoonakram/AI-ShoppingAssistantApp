import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../data/logo";
import {
  InputElement,
  CheckboxElement,
  ButtonElement,
} from "../components/elements/FormElements";
import { PageTitle } from "../components/elements/PageTitle";
import { APP_NAME } from "../../data/Variables";
import { AuthContext } from "../services/AuthService";
import { LoadingScreen } from "../components/elements/LoadingScreen";
import { apiService } from "../services/ApiService";

export const SignUp = ({isLoggedIn}) => {
  const { register, user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    agree: false,
  });
  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    if (name === "password") {
      validatePassword(e.target.value);
    }
    if (message && name === "password") {
      setMessage("");
    }
  };

  const [message, setMessage] = useState("");
  const [passManage, setPassManage] = useState({
    length: false,
    specialChar: false,
    capitalLetter: false,
    number: false,
  });

  const validatePassword = (password) => {
    const minLength = password.length >= 12;
    const hasSpecialChar = /[&@#[\]()*^$?;:'"<>,.!]/.test(password);
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    setPassManage({
      length: minLength,
      specialChar: hasSpecialChar,
      capitalLetter: hasCapitalLetter,
      number: hasNumber,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setMessage("Passwords do not match");
      return;
    }
    if (
      !passManage.length ||
      !passManage.specialChar ||
      !passManage.capitalLetter ||
      !passManage.number
    ) {
      setMessage("Password does not meet the requirements");
      return;
    }
    if (!form.agree) {
      setMessage("Please agree to the terms and conditions");
      return;
    }
      const res = await register(form);
      if (res && res.status === 201) {
          setTimeout(() => {
              navigate('/login');
          }, 2000);
      }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user/profile");
    }
  }, [isLoggedIn, user]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <PageTitle title={`${APP_NAME} | Sign Up`} />
      <form
        className="grid w-full grow grid-cols-1 place-items-center h-100vh"
        autocomplete="off"
      >
        <div className="w-full max-w-[26rem] sm:px-5 card rounded-lg p-5 lg:p-7">
          <div className="text-center">
            <Link to="/" exact="true">
              <Logo />
            </Link>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                Welcome To {APP_NAME}
              </h2>
              <p className="text-slate-400 dark:text-navy-300">
                Please sign up to continue
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <InputElement
              label="Username"
              placeholder="Enter Username"
              name="username"
              value={form.username}
              handleChange={handleFormChange}
              iconclassName={"fas fa-user"}
            />

            <InputElement
              label="Email"
              placeholder="Enter Email"
              name="email"
              value={form.email}
              handleChange={handleFormChange}
              iconclassName={"fas fa-envelope"}
            />

            <InputElement
              label="Password"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              handleChange={handleFormChange}
              type="password"
              iconclassName={"fas fa-lock"}
            />

            <InputElement
              label="Confirm Password"
              placeholder="Confirm Password"
              name="password2"
              value={form.password2}
              handleChange={handleFormChange}
              type="password"
              iconclassName={"fas fa-lock"}
            />

            {message && <p className="text-xs mt-2 text-red-600">{message}</p>}
            <p className="text-xs mt-4">
              Password must contain:
              <ul className="list-none ml-2">
                <li className={`${passManage.length ? "text-green-600" : "text-red-600"}`}>
                  <i className={`fa-solid fa-${passManage.length ? "check" : "times"}`}></i>
                  &#160;&#160;At least 12 characters
                </li>
                <li className={`${passManage.specialChar ? "text-green-600" : "text-red-600"}`}>
                  <i className={`fa-solid fa-${passManage.specialChar ? "check" : "times"}`}></i>
                  &#160;&#160;At least one special character
                </li>
                <li className={`${passManage.capitalLetter ? "text-green-600" : "text-red-600"}`}>
                  <i className={`fa-solid fa-${passManage.capitalLetter ? "check" : "times"}`} ></i>
                  &#160;&#160;At least one capital letter
                </li>
                <li className={`${passManage.number ? "text-green-600" : "text-red-600"}`} >
                  <i className={`fa-solid fa-${passManage.number ? "check" : "times"}`} ></i>
                  &#160;&#160;At least one number
                </li>
              </ul>
            </p>
            <p className="my-3 items-center">
              <CheckboxElement
                label={
                  <>
                    I agree to the
                    <Link to="/terms"className="text-primary dark:text-accent-light">
                      {" "}Terms of Service
                    </Link>
                      {" "}and
                    <Link to="/privacy" className="text-primary dark:text-accent-light">
                      {" "}Privacy Policy
                    </Link>
                  </>
                }
                name="agree"
                checked={form.agree}
                handleChange={handleFormChange}
              />
            </p>

            <ButtonElement
              label="Sign Up"
              primary
              onClick={handleRegister}
              customClass={'w-full'}
            />
            <div className="mt-4 text-center text-xs+">
              <p className="line-clamp-1">
                <span>Already have an account? </span>
                <Link
                  className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent"
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
            {/* <div className="my-7 flex items-center space-x-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
              <p className="text-tiny+ uppercase">or sign up with email</p>
              <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
            </div>
            <div className="flex space-x-4">
              <button className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
                <img className="h-5.5 w-5.5" src={google_logo} alt="logo" />
                <span>Google</span>
              </button>
            </div> */}
          </div>
        </div>
      </form>
    </>
  );
};
