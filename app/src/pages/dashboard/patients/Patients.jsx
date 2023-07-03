import { useEffect, useState } from "react";
import api from "../../../API";
import { toast } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../../../components/Loader";

function Patients() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

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

  const deletePatient = async (id) => {
    // make a popup to confirm
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    if (!window.confirm("This will also delete all his previous analysis...")) return;
    const response = await api.delete(`/patient/${id}`);
    if (!response.ok) return toast.error(response.error || "Error while deleting patient");
    toast.success("Patient deleted successfully");
    getPatients();
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-2xl font-bold">Patient List</h2>
        <button className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none" onClick={() => navigate("/dashboard/patients/add")}>
          <AiOutlinePlus size={24} />
        </button>
      </div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search || ""}
        type="text"
        className="w-full border border-gray-200 p-4 rounded-lg shadow-md mb-4"
        placeholder="Search..."
      />
      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md overflow-y-scroll max-h-96">
        {!loading ? (
          patients.length !== 0 ? (
            patients.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => navigate(`/dashboard/patients/view/${user.id}`)}>
                <div className="flex items-center">
                  <RxAvatar />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AiOutlineEdit
                    size={24}
                    className="text-gray-600 hover:text-green-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/patients/edit/${user.id}`);
                    }}
                  />
                  <MdDeleteOutline
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePatient(user.id);
                    }}
                    size={24}
                    className="text-gray-600 hover:text-red-500 cursor-pointer ml-2"
                  />
                </div>
              </div>
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
      </div>
    </div>
  );
}

export default Patients;
