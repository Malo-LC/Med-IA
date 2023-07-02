import { useEffect, useState } from "react";
import api from "../API";
import { toast } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import Loader from "./Loader";

function Patients({ setPatientId, patientId }) {
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
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <ul className="bg-white border border-gray-200 p-4 rounded-lg shadow-md overflow-y-scroll max-h-96">
        {patients.length ? (
          patients.map((user, index) => (
            <li
              onClick={() => setPatientId(user.id)}
              key={index}
              className={`flex cursor-pointer items-center py-2 px-4 hover:bg-gray-100 rounded-md ${patientId === user.id ? "bg-blue-100" : ""}`}>
              <RxAvatar />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}

export default Patients;
