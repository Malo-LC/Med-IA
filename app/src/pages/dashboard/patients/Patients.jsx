import { useEffect, useState } from "react";
import api from "../../../API";
import { toast } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const response = await api.get("/patient");
    if (!response.ok) return toast.error(response.error || "Error while getting patients");
    setPatients(response.data);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-2xl font-bold">Patient List</h2>
        <button className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none" onClick={() => navigate("/dashboard/patients/add")}>
          <AiOutlinePlus size={24} />
        </button>
      </div>
      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md">
        {patients.map((user, index) => (
          <div key={index} className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-md">
            <div className="flex items-center">
              <RxAvatar />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div>
              <AiOutlineEdit
                size={24}
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => navigate(`/dashboard/patients/edit/${user.id}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;
