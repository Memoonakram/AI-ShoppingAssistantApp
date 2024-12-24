import axios from 'axios';
import { API_URL } from '../../data/Variables';
import { SwalAlert } from '../components/elements/SwalAlert';
import { createContext, useCallback, useEffect, useState } from 'react';
import { apiService } from './ApiService';
import { use } from 'react';

export const AuthContext = createContext();

export const AuthService = ({ children }) => {
    const api = apiService();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const register = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/register/`,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            );
            SwalAlert("Success", "Registration Successful", 2000, "success", false);
            // if (response && response.status === 201) {
            //     setTimeout(() => {
            //         login(data);
            //     }, 2000);
            // }
            return response;
        } catch (error) {
            let message = error.response?.data?.username || error.response?.data?.email || error.response?.data?.password || error.response?.data?.non_field_errors;
            SwalAlert("Error", message, 2000, "error", true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/login/`,
                {
                    username: data.username,
                    password: data.password
                }
            );
            if (response.data.access) {
                localStorage.setItem('userToken', JSON.stringify(response.data));
                localStorage.setItem('remember', data.remember);
            }
            setIsLoggedIn(true);
            SwalAlert("Success", "Login Successful", 2000, "success", false);
        } catch (error) {
            let msg = error
            let message = error.response?.data?.username || error.response?.data?.password || error.response?.data?.non_field_errors;
            SwalAlert("Error", message || msg, 2000, "error", false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoggedIn(false);
        setUser(null);
        await api.logout();
    }, []);

    // const getUser = useCallback(async () => {
    //     setIsLoading(true);
    //     if (!isLoggedIn) {
    //         setIsLoading(false);
    //         return;
    //     }
    //     let res = await api.getUser()
    //     setUser(res);
    //     console.log('res', res);
    //     setIsLoading(false);
    // }, [isLoggedIn]);

    const checkUser = useCallback( async () => {
        setIsLoading(true);
        setIsLoggedIn(false);
        let token = JSON.parse(localStorage.getItem('userToken'));
        let remember = JSON.parse(localStorage.getItem('remember'));
        if (token && token.access && remember) {
            setIsLoggedIn(true);
        } else {
            logout();
        }
        setIsLoading(false);
    }, []);

    const getUser = useCallback(async () => {
        setIsLoading(true);
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }
        let res = await api.getUser();
        setUser(res[0]);
        console.log('res', res[0]);
        setIsLoading(false);
    }, [isLoggedIn]);

    // try {
    //     const response = await axios.post(API_URL + 'request-reset-email/', { email });
    //     Swal.mixin({
    //         customClass: {
    //             popup: "bg-lightmode dark:bg-darkmode dark:text-navy-100",
    //         },
    //     }).fire({
    //         title: 'Success',
    //         text: response.data.success || 'Reset email request successful! Please check your email for further instructions.\nChack Spam folder if you do not see the email in your inbox.',
    //         timer: 2000,
    //         showConfirmButton: false,
    //         icon: 'success',
    //     });
    
    //     setMessage(response.data.success);
    
    // } catch (error) {
    //     Swal.mixin({
    //         customClass: {
    //             confirmButton: "btn bg-indigo-500 text-white",
    //             popup: "bg-lightmode dark:bg-darkmode dark:text-navy-100",
    //         },
    //     }).fire({
    //         title: 'Error',
    //         text: error.response?.data?.non_field_errors[0] || 'An error occurred, please try again.',
    //         icon: 'error',
    //     });
    
    //     // Optionally set an error message in your component state
    //     setMessage('An error occurred, please try again.');
    //     console.error('Error Reset Email', error);
    // }

    const requestPasswordReset = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(API_URL + '/request-reset-email/', data);
            if (response.data.success) {
                let msg = 'Reset email request successful! Please check your email for further instructions.\nChack Spam folder if you do not see the email in your inbox.'
                SwalAlert("Success", response.data.success, 3000, "success", false);
            }
        } catch (error) {
            let message = error.response?.data?.non_field_errors[0] || 'An error occurred, please try again.';
            SwalAlert("Error", message, 2000, "error", true);
            console.error('Error Reset Email', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkPassResetToken = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_URL + '/password-reset/' + data.uidb64 + '/' + data.token, { headers: { 'Content-Type': 'application/json' }});
            if (response.data.success) {
                return response.data.success;
            }
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(API_URL + '/password-reset-complete/', data);
            if (response.data.message) {
                SwalAlert("Success", response.data.message, 2000, "success", false);
                return true;
            }
        } catch (error) {
            let message = error.response?.data?.message || 'An error occurred, please try again.';
            SwalAlert("Error", message, 2000, "error", true);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

const changePassword = useCallback(async (data) => {
    setIsLoading(true);
    try {
        const response = await axios.post(API_URL + '/change-password/', data, {headers : api.getAuthHeaders()});
        if (response) {
            let msg = response.data.success || 'Password changed successfully!';
            SwalAlert("Success",msg , 2000, "success", false);
            return true;
        }
    } catch (error) {
        console.error('Error Change Password', error);
        let message = error.response?.data?.old_password || 'An error occurred, please try again.';
        SwalAlert("Error", message, 2000, "error", false);
        return false;
    } finally {
        setIsLoading(false);
    }
}
, []);



    const value = {
        isLoading,
        isLoggedIn,
        user,
        getUser,
        register,
        login,
        logout,
        checkUser,
        requestPasswordReset,
        checkPassResetToken,
        resetPassword,
        changePassword
    };



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

