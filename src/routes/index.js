import { Suspense, lazy } from "react";// use to loading , loading screen until full page is load
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
//import Settings from "../pages/dashboard/Settings";

// import Home from '../pages/dashboard/Home';
// import Result from '../pages/dashboard/Result'

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}> 
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout/>,
      children:[
        {element: <LoginPage/>, path:'login'},
        {element: <RegisterPage/>, path:'register'},
        {element: <ResetPasswordPage/>, path:'reset-password'},
        {element: <NewPasswordPage/>, path:'new-password'},
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "index", element: <Home />},
        { path: "chat", element: <GeneralApp /> },
        { path: "result", element: <Result /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Home = Loadable(
  lazy(() => import("../pages/dashboard/Home")),
);

const Result = Loadable(
  lazy(() => import("../pages/dashboard/Result")),
);

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);

const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);

const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);

const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);

const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
