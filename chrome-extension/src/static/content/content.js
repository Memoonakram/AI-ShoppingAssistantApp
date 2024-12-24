/* global chrome */

// Content script to check if the user is logged in by looking for a token in localStorage
(function() {
    const token = localStorage.getItem('userToken');
    if (token) {
      chrome.runtime.sendMessage({ type: 'USER_LOGGED_IN', token });
    } else {
      chrome.runtime.sendMessage({ type: 'USER_LOGGED_OUT' });
    }
  })();