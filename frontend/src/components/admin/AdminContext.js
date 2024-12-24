import axios from "axios";
import { apiService } from "../services/ApiService";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/AuthService";
import { use } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [FAQs, setFAQs] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [stockwatches, setStockwatches] = useState([]);
    const api = apiService();

    const getProfile = async () => {
        const res = await api.getProfile();
        setProfile(res[0]);
    }

    const getAllUsers = async () => {
        const res = await api.getAllUsers();
        setUsers(res);
    }

    const updateProfile = async (data) => {
        setIsLoading(true);
        console.log(data);
        const res = await api.updateProfile(data);
        const updatedUsers = users.map((user) => {
            if (user.profile?.id === data?.id) {
                return { ...user, profile: res };
            }
            return user;
        });
        setUsers(updatedUsers);
        setIsLoading(false);
    }

    const updateMeasurement = async (data) => {
        setIsLoading(true);
        const res = await api.updateMeasurement(data);
        const updatedUsers = users.map((user) => {
            if (user.measurement?.id === data?.id) {
                return { ...user, measurement: res };
            }
            return user;
        });
        setUsers(updatedUsers);


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

    const getFAQs = async () => {
        const res = await api.getFaqs();
        setFAQs(res);
    }

    const createFAQ = async (data) => {
        setIsLoading(true);
        await api.createFaq(data);
        getFAQs();
        setIsLoading(false);
    }

    const updateFAQ = async (data) => {
        setIsLoading(true);
        await api.updateFaq(data);
        getFAQs();
        setIsLoading(false);
    }

    const deleteFAQ = async (id) => {
        setIsLoading(true);
        await api.deleteFaq(id);
        getFAQs();
        setIsLoading(false);
    }

    const getContacts = async () => {
        const res = await api.getContacts();
        setContacts(res);
        console.log(res);
    }

    const replyContact = async (data) => {
        setIsLoading(true);
        const res = await api.handleReply(data);
        if (res?.id) {
            const updatedContacts = contacts.map((contact) => {
                if (contact.id === res.id) {
                    return { ...contact, status: 'Replied' };
                }
                return contact;
            });
            setContacts(updatedContacts);
        }
        setIsLoading(false);
    }

    const getStockwatches = async () => {
        const res = await api.getFavourites();
        console.log('stockwatches', res);
        setStockwatches(res);
    }

    const deleteStockwatch = async (id) => {
        setIsLoading(true);
        await api.deleteFavourite(id);
        getStockwatches();
        setIsLoading(false);
    }

    const stockReply = async (data) => {
        setIsLoading(true);
        const res = await api.stockReply(data);
        if (res?.id) {
            const updatedStockwatches = stockwatches.map((stockwatch) => {
                if (stockwatch.id === res.id) {
                    return { ...stockwatch, status: 'Replied' };
                }
                return stockwatch;
            });
            setStockwatches(updatedStockwatches);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getProfile();
        getNotifications();
        getAllUsers();
        getFAQs();
        getContacts();
        getStockwatches();
        setIsLoading(false);
    }, []);

    return (
        <AdminContext.Provider value={{
            isLoading,
            notifications,
            profile,
            getProfile,
            updateProfile,
            users,
            getNotifications,
            markNotificationRead,
            updateProfile,
            updateMeasurement,
            getFAQs,
            FAQs,
            createFAQ,
            updateFAQ,
            deleteFAQ,
            getContacts,
            contacts,   
            replyContact,
            stockwatches,
            getStockwatches,
            deleteStockwatch,
            stockReply
        }}>
            {children}
        </AdminContext.Provider>
    )
}