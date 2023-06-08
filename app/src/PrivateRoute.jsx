import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, ...rest }) => {
  return <Route {...rest} render={(props) => (isLoggedIn ? <Outlet {...props} /> : <Navigate to="/" />)} />;
};

export default PrivateRoute;
