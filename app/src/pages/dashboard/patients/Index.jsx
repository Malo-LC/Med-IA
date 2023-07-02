import Patients from "./Patients";
import Add from "./Add";
import Edit from "./Edit";
import { Route, Routes } from "react-router-dom";

const Index = () => {
  return (
    <Routes>
      <Route path="" element={<Patients />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default Index;
