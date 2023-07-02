import Pneumonia from "./Pneumonia";
import Resume from "./Resume";
import { Route, Routes } from "react-router-dom";

const Index = () => {
  return (
    <Routes>
      <Route path="" element={<Pneumonia />} />
      <Route path="/view/:id" element={<Resume />} />
    </Routes>
  );
};

export default Index;
