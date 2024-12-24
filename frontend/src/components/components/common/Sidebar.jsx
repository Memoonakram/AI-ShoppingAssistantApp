import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../../../data/logo';
import { avatars, avatars2 } from '../../../static/images/avater/avatar';

// i will be using this component to show all the navigation links but this same sidebar can be used by admin too, with different links
//i want to use this sidebar as a component line <Sidebar> <navlink> </navlink> </Sidebar>

export const Sidebar = ({ user, admin }) => {
  const [profileavatar, setProfileAvatar] = useState(avatars['B']);

  useEffect(() => {
    if (user) {
      setProfileAvatar(avatars2[user.profile_pic]);
    }
  }, [user]);

  return (
    <div className="main-sidebar">
      <div className=" rounded-lg flex h-full w-full flex-col items-center border-r border-slate-150 bg-white dark:border-navy-700 dark:bg-navy-800">
        <div className="flex pt-4">
          <Link to="/">
            <Logo size={10} />
          </Link>
        </div>

        <div id="sidebar" className="flex grow flex-col space-y-4 pt-6">
          {admin ? adminNavitems() : userNavitems()}
        </div>
        <div className="flex flex-col items-center space-y-3 py-3">
          <div
            x-data="usePopper({placement:'right-end',offset:12})"
            className="flex"
          >
            <button x-ref="popperRef" className="avatar h-12 w-12">
              <img className="rounded-full" src={
                profileavatar
              } alt="avatar" />
              <span className="absolute right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-success dark:border-navy-700"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



const userNavitems = () => {
  return (
    <>
      <NavLink
        exact="true"
        to="/user/profile"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle cx="12" cy="6" r="4" fill="currentcolor"></circle>{" "}
            <path
              opacity="0.5"
              d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
              fill="currentcolor"
            ></path>{" "}
          </g>
        </svg>
      </NavLink>

      <NavLink
        exact="true"
        to="/user/measurement"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentcolor"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <style type="text/css"> </style>{" "}
            <g>
              {" "}
              <path
                className="st0"
                d="M180.365,271.776c-39.859-0.008-76.916-5.275-107.957-14.441c-31.032-9.206-56.113-22.114-72.078-38.516 L0,218.456v112.696c0.008,8.671,3.948,17.392,12.463,26.235c8.473,8.779,21.405,17.219,37.774,24.356 c19.056,8.34,42.794,14.852,69.309,18.89v-70.001h16.88v72.178c12.008,1.286,24.463,2.044,37.28,2.242v-40.239h16.88v40.388h37.271 v-74.568h16.88v74.568h37.271v-40.388h16.88v40.388h37.28v-74.568h16.88v74.568h37.28v-40.388h16.88v40.388h37.271v-74.568h16.88 v74.568H512V271.776H180.365z"
              ></path>{" "}
              <path
                className="st0"
                d="M295.774,254.896h64.948v-36.439l-0.33,0.362c-10.64,10.963-25.353,20.292-43.148,28.082 C310.56,249.818,303.298,252.438,295.774,254.896z"
              ></path>{" "}
              <path
                className="st0"
                d="M50.237,231.438c32.738,14.324,78.993,23.474,130.128,23.458c38.352,0,73.942-5.11,103.169-13.748 c29.235-8.58,52.033-20.87,64.726-34.066c8.514-8.843,12.454-17.564,12.462-26.235c-0.008-8.679-3.948-17.391-12.462-26.235 c-8.473-8.778-21.405-17.218-37.774-24.356c-32.738-14.334-78.993-23.482-130.12-23.457c-38.351-0.008-73.949,5.11-103.176,13.74 c-29.234,8.58-52.033,20.87-64.726,34.073C3.948,163.456,0.008,172.168,0,180.847c0.008,8.671,3.948,17.392,12.463,26.235 C20.936,215.86,33.868,224.3,50.237,231.438z M121.879,174.814c3.684-3.898,11.431-8.258,21.71-11.242 c10.27-3.034,23.021-4.888,36.776-4.88c18.331-0.024,34.898,3.314,46.149,8.258c5.621,2.44,9.866,5.292,12.322,7.864 c2.505,2.629,3.124,4.516,3.132,6.033c-0.008,1.508-0.627,3.404-3.132,6.034c-3.676,3.89-11.424,8.259-21.702,11.242 c-10.27,3.033-23.013,4.879-36.769,4.879c-18.338,0.017-34.906-3.314-46.156-8.259c-5.621-2.44-9.866-5.291-12.33-7.863 c-2.506-2.63-3.116-4.526-3.125-6.034C118.763,179.33,119.373,177.443,121.879,174.814z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </NavLink>

      <NavLink
        exact="true"
        to="/user/chat"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="0.4"
            d="M499.884 479.3c-20.4-5-35.8-19.9-46.6-34.7 37.5-29.4 58.8-69.9 58.8-113 0-36-15-69.2-40.1-95.7-28.7 92.2-129.1 161-247.9 161-15.9 0-31.6-1.2-46.9-3.6-8.9 4.3-18.2 8.4-26.7 11.8 32.3 49.6 96.2 83.4 169.6 83.4 15 0 29.6-1.4 43.4-4.1 45.9 23.4 87.8 27.7 112.4 27.7 13.5 0 21.8-1.3 22.8-1.4 7.5-1.2 13.1-7.6 13.4-15.1.3-7.8-4.8-14.5-12.2-16.3z"
            fill="currentcolor"
          ></path>
          <path
            d="M224.084 0c-123.5 0-224 81.8-224 182.4 0 50.9 25.6 98.7 70.8 133.1-14.9 23.3-34.3 46.9-58.7 53-7.7 1.9-12.9 9.2-12.1 17.1s7.3 14 15.3 14.4c.4 0 1.7.1 4 .1 16.5 0 80.4-2.7 152.9-40.3 16.6 3.4 34 5 51.7 5 123.5 0 224-81.8 224-182.4S347.584 0 224.084 0z"
            fill="currentcolor"
          ></path>
        </svg>
      </NavLink>

      <NavLink
        exact="true"
        to="/user/saved"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M18.5 18.8637V8.07579C18.5 5.99472 17.0378 4.20351 15.0077 3.7977C13.022 3.40077 10.978 3.40077 8.99225 3.7977C6.96219 4.20351 5.5 5.99472 5.5 8.07579V18.8637C5.5 20.1258 6.8627 20.9113 7.94601 20.2737L10.9053 18.5317C11.5814 18.1337 12.4186 18.1337 13.0947 18.5317L16.054 20.2737C17.1373 20.9113 18.5 20.1258 18.5 18.8637Z"
              fill="currentcolor"
              stroke="currentcolor"
            ></path>{" "}
          </g>
        </svg>
      </NavLink></>
  )
}

const adminNavitems = () => {
  return (
    <>
      <NavLink
        exact="true"
        to="/admin/dashboard"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.85714 3H4.14286C3.51167 3 3 3.51167 3 4.14286V9.85714C3 10.4883 3.51167 11 4.14286 11H9.85714C10.4883 11 11 10.4883 11 9.85714V4.14286C11 3.51167 10.4883 3 9.85714 3Z"
            fill="currentColor"
          ></path>
          <path
            d="M9.85714 12.8999H4.14286C3.51167 12.8999 3 13.4116 3 14.0428V19.757C3 20.3882 3.51167 20.8999 4.14286 20.8999H9.85714C10.4883 20.8999 11 20.3882 11 19.757V14.0428C11 13.4116 10.4883 12.8999 9.85714 12.8999Z"
            fill="currentColor"
            fillOpacity="0.3"
          ></path>
          <path
            d="M19.757 3H14.0428C13.4116 3 12.8999 3.51167 12.8999 4.14286V9.85714C12.8999 10.4883 13.4116 11 14.0428 11H19.757C20.3882 11 20.8999 10.4883 20.8999 9.85714V4.14286C20.8999 3.51167 20.3882 3 19.757 3Z"
            fill="currentColor"
            fillOpacity="0.3"
          ></path>
          <path
            d="M19.757 12.8999H14.0428C13.4116 12.8999 12.8999 13.4116 12.8999 14.0428V19.757C12.8999 20.3882 13.4116 20.8999 14.0428 20.8999H19.757C20.3882 20.8999 20.8999 20.3882 20.8999 19.757V14.0428C20.8999 13.4116 20.3882 12.8999 19.757 12.8999Z"
            fill="currentColor"
            fillOpacity="0.3"
          ></path>
        </svg>
      </NavLink>

      <NavLink
        exact="true"
        to="/admin/chats"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="0.4"
            d="M499.884 479.3c-20.4-5-35.8-19.9-46.6-34.7 37.5-29.4 58.8-69.9 58.8-113 0-36-15-69.2-40.1-95.7-28.7 92.2-129.1 161-247.9 161-15.9 0-31.6-1.2-46.9-3.6-8.9 4.3-18.2 8.4-26.7 11.8 32.3 49.6 96.2 83.4 169.6 83.4 15 0 29.6-1.4 43.4-4.1 45.9 23.4 87.8 27.7 112.4 27.7 13.5 0 21.8-1.3 22.8-1.4 7.5-1.2 13.1-7.6 13.4-15.1.3-7.8-4.8-14.5-12.2-16.3z"
            fill="currentcolor"
          ></path>
          <path
            d="M224.084 0c-123.5 0-224 81.8-224 182.4 0 50.9 25.6 98.7 70.8 133.1-14.9 23.3-34.3 46.9-58.7 53-7.7 1.9-12.9 9.2-12.1 17.1s7.3 14 15.3 14.4c.4 0 1.7.1 4 .1 16.5 0 80.4-2.7 152.9-40.3 16.6 3.4 34 5 51.7 5 123.5 0 224-81.8 224-182.4S347.584 0 224.084 0z"
            fill="currentcolor"
          ></path>
        </svg>
      </NavLink>

      {/* <NavLink exact="true"
            to="/admin/users"
            className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M19.5 7.5C19.5 8.88071 18.3807 10 17 10C15.6193 10 14.5 8.88071 14.5 7.5C14.5 6.11929 15.6193 5 17 5C18.3807 5 19.5 6.11929 19.5 7.5Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M4.5 7.5C4.5 8.88071 5.61929 10 7 10C8.38071 10 9.5 8.88071 9.5 7.5C9.5 6.11929 8.38071 5 7 5C5.61929 5 4.5 6.11929 4.5 7.5Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M18 16.5C18 18.433 15.3137 20 12 20C8.68629 20 6 18.433 6 16.5C6 14.567 8.68629 13 12 13C15.3137 13 18 14.567 18 16.5Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M22 16.5C22 17.8807 20.2091 19 18 19C15.7909 19 14 17.8807 14 16.5C14 15.1193 15.7909 14 18 14C20.2091 14 22 15.1193 22 16.5Z"
                  fill="currentColor"
                ></path>
                <path
                  opacity="0.4"
                  d="M2 16.5C2 17.8807 3.79086 19 6 19C8.20914 19 10 17.8807 10 16.5C10 15.1193 8.20914 14 6 14C3.79086 14 2 15.1193 2 16.5Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </NavLink> */}

      <NavLink
        exact="true"
        to="/admin/faqs"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              opacity="0.5"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              fill="currentcolor"
            ></path>
            <path
              d="M12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75Z"
              fill="currentcolor"
            ></path>
            <path
              d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
              fill="currentcolor"
            ></path>
          </g>
        </svg>
      </NavLink>
      <NavLink
        exact="true"
        to="/admin/contacts"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z"
              fill="currentcolor"
            ></path>
          </g>
        </svg>
      </NavLink>

      <NavLink
        exact="true"
        to="/admin/stockwatches"
        className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
      >
        {/* make a time watch icon */}

        <svg className='h-7 w-7'
         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentcolor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#1C274C"></path> </g></svg>


      </NavLink>



    </>
  )
}

