export const API_URL = 'http://127.0.0.1:8000/api/';
export const FRONTEND_URL = 'http://localhost:3000/';

export const apiService = () => {
    const logout = async () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('remember');
    }

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
                chrome.storage.local.remove('userToken');
                chrome.storage.local.remove('userData');
                return null;
            });
      };

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

      const createUserFav = (fav) => {
        return chrome.storage.local.get('userToken')
          .then((storedToken) => {
            const token = JSON.parse(storedToken.userToken);
            if (!token || !token.access) {
              console.error('No valid token found');
              return null;
            }
      
            return fetch(API_URL + 'favourite/', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(fav)
            });
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 'token_not_valid') {
              return refreshToken().then((newAccessToken) => {
                if (newAccessToken) {
                  return fetch(API_URL + 'favourite/', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${newAccessToken}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fav)
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
              return { success: true, data };
            } else {
              console.error('Failed to create favourite:', data);
              return { success: false, data };
            }
          })
          .catch((error) => {
            console.error('Error creating favourite:', error);
            return { success: false, error };
          });
      };

      const deleteUserFav = (favId) => {
        return chrome.storage.local.get('userToken')
          .then((storedToken) => {
            const token = JSON.parse(storedToken.userToken);
            if (!token || !token.access) {
              console.error('No valid token found');
              return null;
            }
      
            return fetch(API_URL + `favourite/${favId}/`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token.access}`
              }
            });
          })
          .then((response) => {
            // Check for 204 status explicitly
            if (response.status === 204) {
              return { success: true, data: null };
            }
            // Handle other responses that may contain JSON
            return response.json();
          })
          .then((data) => {
            if (data && data.code === 'token_not_valid') {
              return refreshToken().then((newAccessToken) => {
                if (newAccessToken) {
                  return fetch(API_URL + `favourite/${favId}/`, {
                    method: 'DELETE',
                    headers: {
                      'Authorization': `Bearer ${newAccessToken}`
                    }
                  });
                } else {
                  console.error('Unable to refresh token');
                  return null;
                }
              }).then((response) => {
                if (response.status === 204) {
                  return { success: true, data: null };
                }
                return response.json();
              });
            } else {
              return { success: true, data };
            }
          })
          .catch((error) => {
            console.error('Error deleting favourite:', error);
            return { success: false, error };
          });
      };
      

      const fetchDataFromChromeStorage = (key) => {
        return new Promise((resolve, reject) => {
          chrome.storage.local.get(key, (data) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(data[key]);
            }
          });
        });
      };
      

    return {
        logout,
        refreshToken,
        fetchUserData,
        fetchUserFavs,
        createUserFav,
        deleteUserFav,
        fetchDataFromChromeStorage
    }

    
}