import { BrowserRouter as Router, Route, Routes, useLocation, Link, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import HomePage from "./pages/home/HomePage.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import { useSelector } from "react-redux";

const App = () => {
  console.log(useSelector((state) => state.auth.isLoggedIn));
  return (
    <Router>
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
            <Route path="dashboard" element={<Dashboard />} />
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
      <div className="flex overflow-hidden my-2 px-4 w-full items-center justify-between">
        <>
          <Link className="border border-black p-1" to="/search">
            Recherche
          </Link>
          <Link className="border border-black p-1" to="/account">
            Mon compte
          </Link>
        </>
      </div>

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
