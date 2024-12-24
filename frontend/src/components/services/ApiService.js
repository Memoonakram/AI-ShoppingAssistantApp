import React, { useContext } from "react"
import { AuthContext } from "./AuthService";
import { API_URL } from "../../data/Variables";
import axios from "axios";
import { SwalAlert } from "../components/elements/SwalAlert";


export const apiService = () => {

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('remember');
    }

    const getAuthHeaders = () => {
        let token = JSON.parse(localStorage.getItem('userToken'));
        return token && token.access ? { Authorization: "Bearer " + token.access } : {};
    };

    const refreshToken = async () => {
        let token = JSON.parse(localStorage.getItem('userToken'))
        if (token && token.refresh) {
            try {
                const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
                        refresh: token.refresh
                });
                if (response.data.access) {
                    localStorage.setItem('userToken', JSON.stringify(response.data));
                return response.data.access;
                }
            } catch (error) {
                SwalAlert("Error", "Session Expired. Please login again.", 2000, "error", false);
                logout();
            }
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getUser();
            }
        }
    }

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/all/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getAllUsers();
            }
            console.error('Error getting all users:', error);
        }
    }

    const getProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getProfile();
            }
        }
    }

    const updateProfile = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/profile/${data.id}/`, data, {headers : getAuthHeaders()});
            SwalAlert("Success", "Profile Updated", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return updateProfile();
            } else {
                SwalAlert("Error", "Profile Update Failed", 2000, "error", false);
                console.error('Error updating profile:', error);
            }
        }
    }

    const getMeasurement = async () => {
        try {
            const response = await axios.get(`${API_URL}/measurement/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getMeasurement();
            }
        }
    }


    const updateMeasurement = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/measurement/${data.id}/`, data, {headers : getAuthHeaders()});
            SwalAlert("Success", "Measurements Updated", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return updateMeasurement();
            } else {
                SwalAlert("Error", "Measurements Update Failed", 2000, "error", false);
                console.error('Error updating measurements:', error);
            }
        }
    }

    const updateUser = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/user/${data.id}/`, data, {headers : getAuthHeaders()});
            SwalAlert("Success", "Profile Updated", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return updateUser();
            } else {
                SwalAlert("Error", "Profile Update Failed", 2000, "error", false);
                console.error('Error updating user:', error);
            }
        }
    }
    
    const getNotifications = async () => {
        try {
            const response = await axios.get(`${API_URL}/notification/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getNotifications();
            }
        }
        }

    const markedNotificationAsRead = async () => {
        try {
          const response = await axios.post(API_URL + "/notification/mark_read/", {}, { headers: getAuthHeaders() });
      }
        catch (error) {
          console.error('Error marking notifications as read:', error);
      }
    }

    const getFavourites = async () => {
        try {
            const response = await axios.get(`${API_URL}/favourite/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getFavourites();
            }
        } }

    const deleteFavourite = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/favourite/${id}/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return deleteFavourite(id);
            }
        }
    }

    const getFaqs = async () => {
        try {
            const response = await axios.get(`${API_URL}/faqs/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getFaqs();
            }
        }
    }
    
    const createFaq = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/faqs/`, data, {headers : getAuthHeaders()});
            SwalAlert("Success", "FAQ Created", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return createFaq();
            } else {
                SwalAlert("Error", "FAQ Creation Failed", 2000, "error", false);
                console.error('Error creating FAQ:', error);
            }
        }
    }

    const updateFaq = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/faqs/${data.id}/`, data, {headers : getAuthHeaders()});
            SwalAlert("Success", "FAQ Updated", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return updateFaq();
            } else {
                SwalAlert("Error", "FAQ Update Failed", 2000, "error", false);
                console.error('Error updating FAQ:', error);
            }
        }
    }

    const deleteFaq = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/faqs/${id}/`, {headers : getAuthHeaders()});
            SwalAlert("Success", "FAQ Deleted", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return deleteFaq(id);
            } else {
                SwalAlert("Error", "FAQ Deletion Failed", 2000, "error", false);
                console.error('Error deleting FAQ:', error);
            }
        }
    }


    const getContacts = async () => {
        try {
            const response = await axios.get(`${API_URL}/contact/`, {headers : getAuthHeaders()});
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return getContacts();
            }
        }
    }

    const replyToContact = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/contact/${data.id}/reply/`, {
                subject: data.subject,
                reply_message: data.reply_message
            }, {headers : getAuthHeaders()});
            SwalAlert("Success", "Reply Sent", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return replyToContact(data);
            } else {
                SwalAlert("Error", "Reply Failed", 2000, "error", false);
                console.error('Error replying to contact:', error);
            }
        }
    }

    const handleReply = async (data) => {
        try {
            const response = await replyToContact(data);
            return response;
        } catch (error) {
            console.error('Error handling reply:', error);
        }
    }

    const createContact = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/contact/`, data);
            SwalAlert("Success", "We'll Contact you soon!", 3000, "success", false);
            return response.data
        } catch (error) {
            SwalAlert("Error", "An Error Occurred! Please try again", 2000, "error", false);
            console.error('Error creating contact:', error);
        }
    }

    const stockReply = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/favourite/${data.id}/reply/`, data, {headers : getAuthHeaders()});
            SwalAlert("Success", "Reply Sent", 2000, "success", false);
            return response.data
        } catch (error) {
            if (error.response && error.response.data.code === "token_not_valid") {
                await refreshToken();
                return stockReply(data);
            } else {
                SwalAlert("Error", "Reply Failed", 2000, "error", false);
                console.error('Error replying to stock:', error);
            }
        }
    }



    return {
        getAuthHeaders,
        refreshToken,
        getProfile,
        updateProfile,
        getMeasurement,
        updateMeasurement,
        getUser,
        updateUser,
        getNotifications,
        markedNotificationAsRead,
        getFavourites,
        deleteFavourite,
        getFaqs,
        createFaq,
        updateFaq,
        deleteFaq,
        getAllUsers,
        logout,
        getContacts,
        handleReply,
        createContact,
        stockReply
        
    }
}
    
    


