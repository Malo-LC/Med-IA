import { useNavigate } from "react-router-dom";
import api from "../../../API";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Add() {
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
    };

    const response = await api.post("/patient", newUser);
    if (!response.ok) return toast.error(response.error || "Error while adding patient");

    // Reset the form
    e.target.reset();
    toast.success("Patient added successfully");
    navigate("/dashboard/patients");
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="flex items-center mb-4">
        <button className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none" onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Add Patient</h2>
      </div>
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
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block mb-1 font-semibold">Age</label>
            <input type="number" id="age" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-semibold">Gender</label>

            <select id="gender" required className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
  );
}

export default Add;
