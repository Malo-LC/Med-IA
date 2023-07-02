import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import PneumoniaIndex from "./Pneumonia/Index.jsx";
// import Melanoma from "./Melanoma";
// import MelanomaRecurrence from "./MelanomaRecurrence";
import Settings from "./Settings";
import Subscription from "./Subscription";
import PatientsIndex from "./patients/Index";

const Index = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="/pneumonia/*" element={<PneumoniaIndex />} />
      {/* <Route path="/melanoma/*" element={<Melanoma />} />
    <Route path="/melanoma-recurrence/*" element={<MelanomaRecurrence />} /> */}
      <Route path="/settings/*" element={<Settings />} />
      <Route path="/subscription/*" element={<Subscription />} />
      <Route path="/patients/*" element={<PatientsIndex />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default Index;
