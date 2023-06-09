import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../API";
import { toast } from "react-hot-toast";
import moment from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Loader from "../../../components/Loader";
import { MdDeleteOutline } from "react-icons/md";

function Resume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!id) return;
    getData();
  }, [id]);

  const getData = async () => {
    const result = await api.get(`/analysis/analysis/${id}`);
    if (!result.ok) return toast.error(result.error || "Error while getting data");
    setData(result.data);
  };

  const deleteAnalysis = async () => {
    if (!window.confirm("Are you sure you want to delete this analysis ?")) return;

    const result = await api.delete(`/analysis/analysis/${id}`);
    if (!result.ok) return toast.error(result.error || "Error while deleting analysis");
    toast.success("Analysis deleted successfully");
    navigate("/dashboard");
  };

  if (!data) return <Loader />;

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <button className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none" onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={24} />
        </button>

        <h2 className="text-2xl font-bold">melanoma Radiology Summary</h2>
        <MdDeleteOutline onClick={() => deleteAnalysis()} size={24} className="text-gray-600 hover:text-red-500 cursor-pointer ml-2" />
      </div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Patient Information</h3>
          <p className="text-gray-600">Date: {moment(data.date).format("DD/MM/YYYY")}</p>
        </div>
        <div className="flex items-center mb-4">
          <img
            src={data.image}
            alt="Melanoma Radiology Image"
            className="w-64 h-auto rounded-md cursor-pointer"
            onClick={() => window.open(data.image, "_blank")}
          />
        </div>
        <div className="mb-4">
          <p className="mt-2">
            <span className="font-semibold">Name:</span> {data.Patient?.first_name || "Not found"} {data.Patient?.last_name}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Email:</span> {data.Patient?.email || "Not found"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Age:</span> {data.Patient?.age || "Not found"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Gender:</span> {data.Patient?.gender || "Not found"}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Result</h4>
          <p className="mt-2 capitalize">{data.result}</p>
        </div>
      </div>
    </div>
  );
}

export default Resume;
