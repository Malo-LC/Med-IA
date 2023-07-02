import Melanoma from "./Melanoma";
import Resume from "./Resume";
import { Route, Routes } from "react-router-dom";

const Index = () => {
  return (
    <Routes>
      <Route path="" element={<Melanoma />} />
      <Route path="/view/:id" element={<Resume />} />
    </Routes>
  );
};

export default Index;
