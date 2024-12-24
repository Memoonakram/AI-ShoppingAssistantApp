import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";

export const NotificationBtn = ({ notifications, markNotificationRead }) => {
  const [showPopper, setShowPopper] = useState(false);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const unreadNotifications = (notifications?.filter((notification) => !notification.read).length) || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            popperRef.current &&
            !popperRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            if (unreadNotifications) {
                markNotificationRead().then(() => {
                    setShowPopper(false);
                });
            } else {
                setShowPopper(false);
            }
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [unreadNotifications]);

  useEffect(() => {
    if (buttonRef.current && popperRef.current) {
      createPopper(buttonRef.current, popperRef.current, {
        placement: "bottom-end",
      });
    }
  }, [showPopper]);

  

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="btn relative h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
        onClick={() => {
          setShowPopper(!showPopper);
          if (unreadNotifications && showPopper) {
            markNotificationRead();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-500 dark:text-navy-100"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15.375 17.556h-6.75m6.75 0H21l-1.58-1.562a2.254 2.254 0 01-.67-1.596v-3.51a6.612 6.612 0 00-1.238-3.85 6.744 6.744 0 00-3.262-2.437v-.379c0-.59-.237-1.154-.659-1.571A2.265 2.265 0 0012 2c-.597 0-1.169.234-1.591.65a2.208 2.208 0 00-.659 1.572v.38c-2.621.915-4.5 3.385-4.5 6.287v3.51c0 .598-.24 1.172-.67 1.595L3 17.556h12.375zm0 0v1.11c0 .885-.356 1.733-.989 2.358A3.397 3.397 0 0112 22a3.397 3.397 0 01-2.386-.976 3.313 3.313 0 01-.989-2.357v-1.111h6.75z"
          />
        </svg>
        {unreadNotifications? <span className="absolute -top-px -right-px flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-80"></span>
          <span className="inline-flex h-2 w-2 rounded-full bg-secondary"></span>
        </span>: null}
      </button>
      {showPopper && <NotificationPopper notifications={notifications} popperRef={popperRef} />}
    </div>
  );
};

const NotificationPopper = ({ notifications ,popperRef }) => {
  return (
    <>
      <div
        ref={popperRef}
        className="popper-root show"
        style={{
          position: "fixed",
          inset: "0px 0px auto auto",
          margin: "0px",
          transform: "translate3d(-98.4px, 58.4px, 0px)",
        }}
        data-popper-placement="bottom-end"
      >
        <div className="popper-box mx-4 mt-1 flex max-h-50vh w-[calc(100vw-2rem)] flex-col rounded-lg border border-slate-150 bg-white shadow-soft dark:border-navy-800 dark:bg-navy-700 dark:shadow-soft-dark sm:m-0 sm:w-80">
          <div className="rounded-t-lg bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-navy-200">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-slate-700 dark:text-navy-100">
                  Notifications
                </h3>
                <div className="badge h-5 rounded-full bg-primary/10 px-1.5 text-primary dark:bg-accent-light/15 dark:text-accent-light">
                  {/*Check for the read status of notifications list*/}
                  { notifications ? notifications.filter((notification) => !notification.read).length : 0}
                </div>
              </div>
            </div>
          </div>
          <div className="tab-content flex flex-col overflow-hidden">
            <div className="is-scrollbar-hidden space-y-4 overflow-y-auto px-4 py-4">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    title={notification.title}
                    message={notification.message}
                    read={notification.read}
                  />
                ))
              ) : (
                <div className="text-center text-slate-400 dark:text-navy-300">
                  No notifications
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NotificationRow = ({ title, message, read }) => {
  return (
    <div>
      <p className={`font-medium text-slate-600 dark:text-navy-100 ${read ? "" : "font-bold text-black"}`}>
        {title}
      </p>
      <div className={`mt-1 text-xs text-slate-400 line-clamp-1 dark:text-navy-300 ${read ? "" : "font-bold text-black"}`}>
        {message}
      </div>
    </div>
  );
};

export default NotificationBtn;
