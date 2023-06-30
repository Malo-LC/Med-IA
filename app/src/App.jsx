import { BrowserRouter as Router, Route, Routes, useLocation, Link, Navigate, Outlet } from "react-router-dom";
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
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    const response = await api.get("/user/me");
    if (!response.ok) return dispatch(logout());
  };

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<NavBar />}>
          {/* Not connected routes */}
          <Route path="" element={<HomePage />} />
          <Route element={<AnonymousLayout />}>
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
          </Route>
          {/* Connected routes */}
          <Route element={<AuthLayout />}>
            <Route path="" element={<SideBar />}>
              <Route path="dashboard/*" element={<Index />} />
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
    </Router>
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
