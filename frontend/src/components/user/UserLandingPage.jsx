import React, { useEffect, useContext } from 'react';
// import { SidebarUser } from './Sidebar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { LoadingScreen } from '../components/elements/LoadingScreen';
import { Sidebar } from '../components/common/Sidebar';
import { UserContext } from './UserContext';
import { AuthContext } from '../services/AuthService';
import { use } from 'react';

export const UserLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, notifications, markNotificationRead, profile } = useContext(UserContext);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === '/user') {
      navigate('profile');
    }
  }, [location, navigate]);

  useEffect(() => {
    if(user?.is_staff){
      navigate('/admin');
    }
  }, [user, navigate]);

  return (
    
      <>
      {isLoading && <LoadingScreen /> }
      <Header notifications={notifications} markNotificationRead={markNotificationRead} />
      <Sidebar user={profile} />
      <main className='main-content pb-8'>
        <Outlet />
      </main>
      </>
  );
};
