import { Route, Routes, useLocation, Link, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import SideBar from "./components/SideBar";
import Index from "./pages/dashboard/Index";
import { useEffect } from "react";
import api from "./API";
import { logout } from "./redux/actions/auth";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    getMe();
  }, [location.pathname]);

  const getMe = async () => {
    const response = await api.get("/user/me");
    if (!response.ok) return dispatch(logout());
  };

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<NavBar />}>
          {/* Not connected routes */}
          <Route element={<AnonymousLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="login" element={<Login />} />
          </Route>
          {/* Connected routes */}
          <Route element={<AuthLayout />}>
            <Route path="dashboard" element={<SideBar />}>
              <Route path="*" index element={<Index />} />
            </Route>
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="w-full h-screen gap-2 flex flex-col justify-center items-center">
              <div className="text-9xl font-black">404</div>
              <Link className="border border-black p-1" to="/">
                Retour à l&apos;accueil
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
};
const NavBar = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};
const AuthLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const location = useLocation();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

const AnonymousLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default App;
