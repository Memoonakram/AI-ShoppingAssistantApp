import './index.css';
import "./static/css/app.css"
import "./static/css/custom.css"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LandingPage } from "./components/homepage/LandingPage";
import { Error404 } from "./components/errors/Error404";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/Signup";
import { AuthContext } from "./components/services/AuthService";
import { UserLandingPage } from "./components/user/UserLandingPage";
import { UserProfile } from "./components/user/pages/UserProfile";
import { UserChat } from "./components/user/pages/UserChat";
import {UserMeasurement} from "./components/user/pages/UserMeasurement";
import {UserFavourite} from "./components/user/pages/UserFavourite";
import { UserProvider } from "./components/user/UserContext";
import { useContext, useEffect } from "react";
import { RequestPasswordReset, ResetPassword } from "./components/auth/ResetPassword";
import { ChangePassword } from "./components/auth/ChangePassword";
import { AdminLandingPage } from "./components/admin/AdminLandingPage";
import { AdminDashboard } from "./components/admin/pages/AdminDashboard";
import { AdminProvider } from "./components/admin/AdminContext";
import { FAQsAdmin } from "./components/admin/pages/AdminFaqs";
import { AdminChat } from "./components/admin/pages/AdminChat";
import { AdminContact } from "./components/admin/pages/AdminContact";
import { AdminStockWatch } from './components/admin/pages/AdminStockWatch';


function App() {
  const {isLoggedIn, checkUser, user, getUser} = useContext(AuthContext);
  const publicRoutes = [
    {path: "/", element: <LandingPage isLoggedIn={isLoggedIn}/>},
    {path: "/login", element: <Login isLoggedIn={isLoggedIn}/>},
    {path: "/signup", element: <SignUp isLoggedIn={isLoggedIn}/>},
    {path: "/request-password-reset", element: <RequestPasswordReset isLoggedIn={isLoggedIn}/>},
    {path: "/reset-password/:uidb64/:token", element: <ResetPassword isLoggedIn={isLoggedIn}/>},
    {path: "/change-password", element: <ChangePassword isLoggedIn={isLoggedIn}/>},
    {path: "/logout", element: <Logout />}
  ]

  const UserRoutes = [
    {path: "/user", element: (
      isLoggedIn ?
      <UserProvider>
        <UserLandingPage />
      </UserProvider>
      :
      <Navigate to="/login" />
  ),
      children: [
        {path: "profile", element: <UserProfile />},
        {path: "chat", element: <UserChat />},
        {path: "measurement", element: <UserMeasurement />},
        {path: "saved", element: <UserFavourite />},

      ],
    },
  ]

  const AdminRoutes = [
    {path: "/admin", element: (
      isLoggedIn && user?.is_staff ?
      <AdminProvider>
        <AdminLandingPage />
      </AdminProvider>
      :
      <Navigate to="/login" />
    ),
      children: [
        {path: "dashboard", element: <AdminDashboard />},
        {path: "chats", element: <AdminChat />},
        {path: "faqs", element: <FAQsAdmin />},
        {path: "contacts", element: <AdminContact />},
        {path: "stockwatches", element: <AdminStockWatch />},
      ]
    }

  ]



  const errorRoutes = [
    { path: "/error", element: <Error404 /> },
    // { path: "*", element: <Navigate to="/error" /> },
  ];
  const routes = [
    ...publicRoutes,
    ...errorRoutes,
    ...UserRoutes,
    ...AdminRoutes,
    // ...(user?.is_admin ? AdminRoutes : []),
  ]

  const router = createBrowserRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  })

  useEffect(() => {
    let check = async () => {
      await checkUser();
    }
    check();
  }, []);

  useEffect(() => {
    let get = async () => {
      await getUser();
    }
    get();
  } , [isLoggedIn]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

const Logout  = () => {

  const {logout} = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, []);

  return (
    <Navigate to={'/login'} />
  )
}

export default App;
