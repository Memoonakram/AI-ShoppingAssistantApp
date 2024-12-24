/* global chrome */

const API_URL = 'http://127.0.0.1:8000/api/';

// Function to refresh the access token
const refreshToken = () => {
  return chrome.storage.local.get('userToken')
      .then((storedData) => {
          const token = storedData.userToken ? JSON.parse(storedData.userToken) : null;
          if (token && token.refresh) {
              return fetch(`${API_URL}/auth/token/refresh/`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ refresh: token.refresh })
              });
          } else {
              return Promise.reject('No refresh token found');
          }
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Failed to refresh token');
          }
          return response.json();
      })
      .then((data) => {
          if (data.access) {
              return chrome.storage.local.get('userToken').then((storedData) => {
                  const token = storedData.userToken ? JSON.parse(storedData.userToken) : {};
                  const updatedToken = { ...token, access: data.access };
                  return chrome.storage.local.set({ userToken: JSON.stringify(updatedToken) })
                      .then(() => data.access);
              });
          } else {
              throw new Error('Invalid response data');
          }
      })
      .catch((error) => {
          console.error('Error refreshing token:', error);
          return null;
      });
};

  

// Function to fetch user data
const fetchUserData = () => {
    return chrome.storage.local.get('userToken')
      .then((storedToken) => {
        const token = JSON.parse(storedToken.userToken);
        if (!token || !token.access) {
          console.error('No valid token found');
          return null;
        }
        return fetch(API_URL + 'user/', {
          headers: {
            'Authorization': `Bearer ${token.access}`
          }
        });
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 'token_not_valid') {
          return refreshToken().then((newAccessToken) => {
            if (newAccessToken) {
              return fetch(API_URL + 'profile/', {
                headers: {
                  'Authorization': `Bearer ${newAccessToken}`
                }
              }).then((response) => response.json());
            } else {
              console.error('Unable to refresh token');
              return null;
            }
          });
        } else {
          return data;
        }
      })
      .then((data) => {
        if (data && !data.code) {
          chrome.storage.local.set({ userData: data });
          return { success: true, data };
        } else {
          console.error('Failed to fetch user data:', data);
          chrome.storage.local.remove('userToken');
          chrome.storage.local.remove('userData');
          return { success: false, data };
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        chrome.storage.local.remove('userToken');
        chrome.storage.local.remove('userData');
        return { success: false, error };
      });
  };
  

  const fetchUserFavs = () => {
    return chrome.storage.local.get('userToken')
      .then((storedToken) => {
        const token = JSON.parse(storedToken.userToken);
        if (!token || !token.access) {
          console.error('No valid token found');
          return null;
        }
  
        return fetch(API_URL + 'favourite/', {
          headers: {
            'Authorization': `Bearer ${token.access}`
          }
        });
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 'token_not_valid') {
          return refreshToken().then((newAccessToken) => {
            if (newAccessToken) {
              return fetch(API_URL + 'favourite/', {
                headers: {
                  'Authorization': `Bearer ${newAccessToken}`
                }
              }).then((response) => response.json());
            } else {
              console.error('Unable to refresh token');
              return null;
            }
          });
        } else {
          return data;
        }
      })
      .then((data) => {
        if (data && !data.code) {
          chrome.storage.local.set({ userFavs: data });
          return { success: true, data };
        } else {
          console.error('Failed to fetch user data:', data);
          chrome.storage.local.remove('userToken');
          chrome.storage.local.remove('userData');
          return { success: false, data };
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        chrome.storage.local.remove('userToken');
        chrome.storage.local.remove('userData');
        return { success: false, error };
      });
  };
  

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'USER_LOGGED_IN') {
        const token = JSON.parse(message.token);
        // Store the token in Chrome's local storage
        await chrome.storage.local.set({ userToken: message.token });

        const userData = await fetchUserData();
        const userFavs = await fetchUserFavs();

        await chrome.storage.local.set({ userData: userData });
        await chrome.storage.local.set({ userFavs: userFavs });

        sendResponse({ userData, userFavs });

    } else if (message.type === 'USER_LOGGED_OUT') {
        await chrome.storage.local.remove('userToken');
        await chrome.storage.local.remove('userData');
    } else {
        console.error('Unknown message type:', message.type);
    }

    return true; // Keeps the message channel open for sendResponse
});
