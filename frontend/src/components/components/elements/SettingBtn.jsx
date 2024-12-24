import React, { useState, useRef, useEffect, useContext } from 'react';
import { createPopper } from '@popperjs/core';
import { Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../services/AuthService';
import { SwalAlert } from './SwalAlert';

const SettingBtn = () => {
  const [showPopper, setShowPopper] = useState(false);
  const {logout} = useContext(AuthContext);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popperRef.current && !popperRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setShowPopper(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current && popperRef.current) {
      createPopper(buttonRef.current, popperRef.current, {
        placement: 'bottom-end',
      });
    }
  }, [showPopper]);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    // SwalAlert("Success", "Login Successful", 2000, "success", false);
    SwalAlert("Succesfully Logout", "You are being redirected to Login Page", 2000, "success", false);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };


  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="btn relative h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
        onClick={() => setShowPopper((prev) => !prev)}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillOpacity="0.3" fill="currentColor" d="M2 12.947v-1.771c0-1.047.85-1.913 1.899-1.913 1.81 0 2.549-1.288 1.64-2.868a1.919 1.919 0 0 1 .699-2.607l1.729-.996c.79-.474 1.81-.192 2.279.603l.11.192c.9 1.58 2.379 1.58 3.288 0l.11-.192c.47-.795 1.49-1.077 2.279-.603l1.73.996a1.92 1.92 0 0 1 .699 2.607c-.91 1.58-.17 2.868 1.639 2.868 1.04 0 1.899.856 1.899 1.912v1.772c0 1.047-.85 1.912-1.9 1.912-1.808 0-2.548 1.288-1.638 2.869.52.915.21 2.083-.7 2.606l-1.729.997c-.79.473-1.81.191-2.279-.604l-.11-.191c-.9-1.58-2.379-1.58-3.288 0l-.11.19c-.47.796-1.49 1.078-2.279.605l-1.73-.997a1.919 1.919 0 0 1-.699-2.606c.91-1.58.17-2.869-1.639-2.869A1.911 1.911 0 0 1 2 12.947Z"></path>
          <path fill="currentColor" d="M11.995 15.332c1.794 0 3.248-1.464 3.248-3.27 0-1.807-1.454-3.272-3.248-3.272-1.794 0-3.248 1.465-3.248 3.271 0 1.807 1.454 3.271 3.248 3.271Z"></path>
        </svg>
      </button>
      {showPopper && (
        <div ref={popperRef} className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
          <ul className='whitespace-nowrap'>
            <li>
              <Link to='/change-password' className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Change Password</Link>
            </li>
            <li>
              <a 
              onClick={handleLogout}
               className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 cursor-pointer">Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingBtn;
