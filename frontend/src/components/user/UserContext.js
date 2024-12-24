import axios from "axios";
import { apiService } from "../services/ApiService";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/AuthService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [profile, setProfile] = useState(null);
    const [measurement, setMeasurement] = useState(null);
    const api = apiService();

    const getProfile = async () => {
        const res = await api.getProfile();
        setProfile(res[0]);

    }

    const updateProfile = async (data) => {
        setIsLoading(true);
        const res = await api.updateProfile(data);
        setProfile(res);
        setIsLoading(false);
    }

    const getMeasurement = async () => {
        const res = await api.getMeasurement();
        setMeasurement(res[0]);
    }

    const updateMeasurement = async (data) => {
        setIsLoading(true);
        const res = await api.updateMeasurement(data);
        setMeasurement(res);
        setIsLoading(false);
    }

    const getNotifications = async () => {
        const res = await api.getNotifications();
        setNotifications(res);
    }

    const markNotificationRead = async () => {
        const res = await api.markedNotificationAsRead();
        const updatedNotifications = notifications.map((notification) => {
            if (!notification.read) {
                return { ...notification, read: true };
            }
            return notification;
        });
        setNotifications(updatedNotifications);
    }

    const getFavourites = async () => {
        const res = await api.getFavourites();
        setFavourites(res);
    }

    const deleteFavourite = async (id) => {
        setIsLoading(true);
        await api.deleteFavourite(id);
        getFavourites();
        setIsLoading(false);
    }


    useEffect(() => {
        setIsLoading(true);
        getProfile();
        getMeasurement();
        getNotifications();
        getFavourites();
        setIsLoading(false);
    }, []);
    const contextData = { 
        isLoading, 
        notifications,
        profile,
        measurement,
        updateMeasurement,
        updateProfile,
        markNotificationRead, 
        getNotifications, 
        favourites, 
        getFavourites, 
        deleteFavourite 
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}