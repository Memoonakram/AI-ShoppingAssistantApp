import React, { useState, useContext, useEffect } from "react";
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



export const Login = ({isLoggedIn}) => {
  const { login, user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user/profile");
    }
  }, [isLoggedIn, user]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <PageTitle title={`${APP_NAME} | Login`} />
      <div className="grid w-full grow grid-cols-1 place-items-center h-screen">
        <div className="w-full max-w-[26rem] sm:px-5 card rounded-lg p-5 lg:p-7">
          <div className="text-center">
            <Link to="/" exact="true">
              <Logo />
            </Link>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                Welcome Back
              </h2>
              <p className="text-slate-400 dark:text-navy-300">
                Please sign in to continue
              </p>
            </div>
          </div>
          <div className="space-y-4 ">

            <InputElement
              label="Username"
              placeholder="Enter Username"
              name="username"
              value={form.username}
              handleChange={handleFormChange}
              iconclassName={"fas fa-user"}
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

            <div className="mt-4 mb-2 flex items-center justify-between space-x-2">
              <CheckboxElement
                label="Remember Me"
                name="remember"
                checked={form.remember}
                handleChange={handleFormChange}
              />

              <Link
                to="/request-password-reset"
                className="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100"
              >
                Forgot Password?
              </Link>
            </div>

            <ButtonElement
              label="Login"
              primary
              onClick={handleFormSubmit}
              customClass={"w-full"}
            />
            

            <div className="text-center text-xs+">
              <p className="line-clamp-1">
                <span>Don't have Account? </span>

                <Link
                  className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent"
                  to="/signup"
                >
                  Create account
                </Link>
              </p>
            </div>
            {/* <div className="my-7 flex items-center space-x-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
            <p>OR</p>
            <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
          </div> */}
            {/* <div className="flex space-x-4">
            <button className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <img className="h-5.5 w-5.5" src={google_logo} alt="logo" />
              <span>Google</span>
            </button>
          </div> */}
          </div>
          {/* <div className="mt-8 flex justify-center text-xs text-slate-400 dark:text-navy-300">
            <Link to="#">Privacy Notice</Link>
            <div className="mx-3 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
            <Link to="#">Term of service</Link>
          </div> */}
        </div>
      </div>
    </>
  );
};
