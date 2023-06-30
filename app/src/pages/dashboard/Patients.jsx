import { useEffect, useState } from "react";
import api from "../../API";
import { toast } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";

function Patients() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const response = await api.get("/patient");
    if (!response.ok) return toast.error(response.error || "Error while getting patients");
    setPatients(response.data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Add the new user to the array
    const newUser = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
    };
    console.log("New user:", newUser);

    const response = await api.post("/patient", newUser);
    if (!response.ok) return toast.error(response.error || "Error while adding patient");

    // Reset the form
    e.target.reset();
    getPatients();
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add Patient</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block mb-1 font-semibold">First Name</label>
              <input
                type="text"
                id="firstName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block mb-1 font-semibold">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-1/2 mb-2">
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Add Patient
          </button>
        </form>
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-4">Patient List</h2>
      <ul className="bg-white border border-gray-200 p-4 rounded-lg shadow-md">
        {patients.map((user, index) => (
          <li key={index} className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md">
            <RxAvatar />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
