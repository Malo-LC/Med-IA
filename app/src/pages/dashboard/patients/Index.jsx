import Patients from "./Patients";
import Add from "./Add";
import View from "./View";
import Edit from "./Edit";
import { Route, Routes } from "react-router-dom";

const Index = () => {
  return (
    <Routes>
      <Route path="" element={<Patients />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/view/:id" element={<View />} />
    </Routes>
  );
};

export default Index;
