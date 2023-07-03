import { useEffect, useState } from "react";
import api from "../API";
import { toast } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import Loader from "./Loader";

function Patients({ setPatientId, patientId }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPatients();
  }, [search]);

  const getPatients = async () => {
    setLoading(true);
    const response = await api.get(`/patient?search=${search || ""}`);
    setLoading(false);
    if (!response.ok) return toast.error(response.error || "Error while getting patients");
    setPatients(response.data);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search || ""}
        type="text"
        className="w-full border border-gray-200 p-4 rounded-lg shadow-md mb-4"
        placeholder="Search..."
      />
      <ul className="bg-white border border-gray-200 p-4 rounded-lg shadow-md overflow-y-scroll max-h-96">
        {!loading ? (
          patients.length !== 0 ? (
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
            <div>
              <h3 className="text-lg font-semibold">No user found</h3>
              <button onClick={() => setSearch("")} className="text-blue-500">
                Reset search
              </button>
            </div>
          )
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}

export default Patients;
