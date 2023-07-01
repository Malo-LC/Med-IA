import { Navigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pneumonia from "./Pneumonia/Pneumonia";
// import Melanoma from "./Melanoma";
// import MelanomaRecurrence from "./MelanomaRecurrence";
import Settings from "./Settings";
import Subscription from "./Subscription";
import Patients from "./Patients";

const Index = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/dashboard":
      return <Dashboard />;
    case "/dashboard/pneumonia":
      return <Pneumonia />;
    // case "/dashboard/melanoma":
    //   return <Melanoma />;
    // case "/dashboard/melanoma-recurrence":
    //   return <MelanomaRecurrence />;
    case "/dashboard/settings":
      return <Settings />;
    case "/dashboard/subscription":
      return <Subscription />;
    case "/dashboard/patients":
      return <Patients />;
    default:
      return <Navigate to="/dashboard" replace />;
  }
};

export default Index;
