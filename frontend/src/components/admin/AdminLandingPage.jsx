import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { AdminContext } from './AdminContext'
import { Sidebar } from '../components/common/Sidebar'
import { Header } from '../components/common/Header'
import { LoadingScreen } from '../components/elements/LoadingScreen';


export const AdminLandingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile, isLoading, notifications, markNotificationRead } = useContext(AdminContext);
    // const profile = { profile_pic: 'm1'}

    useEffect(() => {
        if (location.pathname === '/admin') {
          navigate('dashboard');
        }
      }, [location, navigate]);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <Header notifications={[]} markNotificationRead={()=>{}} />
            <Sidebar user={profile} admin={true} />
            <main className='main-content pb-8'>
                <Outlet />
            </main>
        </>
    )
}
