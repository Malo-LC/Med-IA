import { useNavigate, useParams } from "react-router-dom";
import api from "../../../API";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/Loader";
import moment from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await api.get(`/patient/${id}`);
    if (!response.ok) return toast.error(response.error || "Error while getting user");
    setUser(response.data);
    setHistory(response.analysis || []);
  };

  if (!user) return <Loader />;

  return (
    <div className="flex flex-row w-full pt-8 items-start justify-center">
      <button className="p-2 mr-4 rounded-full hover:bg-gray-200 focus:outline-none" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={24} />
      </button>
      <div className="max-w-lg flex-1">
        <div className="w-full mx-auto border border-gray-500 rounded p-5">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="flex flex-col space-y-2">
            <div>
              <span className="font-bold">Name:</span> {user.first_name} {user.last_name}
            </div>
            <div>
              <span className="font-bold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-bold">Age:</span> {user.age}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">Sex:</span> <div className="capitalize">{user.gender}</div>
            </div>
          </div>
        </div>
        {history.length !== 0 ? (
          <div className="w-full mx-auto mt-8 border border-gray-500 rounded p-5">
            <h2 className="text-xl font-semibold">User Medical History</h2>
            <div className="w-full rounded-md p-3">
              <div className="flex flex-row gap-3">
                {history.map((item) => (
                  <div
                    onClick={() => navigate(`/dashboard/pneumonia/view/${item.id}`)}
                    className="flex flex-col justify-center items-center gap-2 bg-slate-300 rounded overflow-hidden w-[10vw] cursor-pointer"
                    key={item.id}>
                    <img src={item.image} alt="image" className="w-full" />
                    <div className="">{moment(item.date).format("DD MMMM YYYY")}</div>
                    <div className={`rounded-full p-2 mb-2 ${item.result ? "bg-red-500" : "bg-green-500"}`}>
                      {item.result ? "Positive" : "Negative"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mx-auto mt-8 border border-gray-500 rounded p-5">
            <h2 className="text-xl font-semibold"> No Medical History</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
