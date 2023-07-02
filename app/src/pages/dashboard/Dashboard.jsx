import { Link, useNavigate } from "react-router-dom";
import api from "../../API";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const response = await api.get("/analysis/history");
    if (!response?.ok) return toast.error(response.error || "Error while getting history");
    setHistory(response.data);
  };

  return (
    <div className="flex flex-col w-full h-full p-8 pt-4">
      <h1 className="text-4xl font-bold">Welcome Dr {user.firstName} </h1>
      <div className="border-y-2 border-[#080957] my-4 w-1/4" />
      <div className="bg-slate-200 w-full rounded-md p-5">
        <h1 className="font-bold mb-4">History</h1>
        <div className="flex flex-row gap-3">
          {history.map((item) => (
            <div
              onClick={() => navigate(`/dashboard/pneumonia/view/${item.id}`)}
              className="flex flex-col justify-center items-center bg-slate-300 rounded overflow-hidden w-[15vw] cursor-pointer"
              key={item.id}>
              <img src={item.image} alt="image" className="w-full " />
              <div className="">{moment(item.date).fromNow()}</div>
              <div className="">{item?.Patient?.first_name || "deleted"}</div>
              <div className={`rounded-full p-2 mb-2 ${item.result ? "bg-red-500" : "bg-green-500"}`}>{item.result ? "Positive" : "Negative"}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row mt-8 gap-8">
        <div className="bg-slate-200 w-2/5 rounded-md justify-center items-center p-5">
          <h1 className="font-bold mb-4">Last features used</h1>
          <Link to="/dashboard/pneumonia" className="bg-slate-400 font-bold rounded-lg p-3 hover:text-white">
            Pneumonia Detection
          </Link>
        </div>
        <div className="bg-slate-200 w-2/5 rounded-md justify-center items-center p-5">
          <h1 className="font-bold">Agenda</h1>

          <ul className="font-bold">Today - {moment().format("dddd Do MMM")}</ul>
          <li>12h : RDV Madame Mich</li>
          <li>15h : RDV Monsieur Georges</li>
          <li>16h : RDV Madame Thomas</li>
          <ul className="font-bold">Tomorrow - {moment().add(1, "day").format("dddd Do MMM")}</ul>
          <li>Aucun événement à venir</li>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
