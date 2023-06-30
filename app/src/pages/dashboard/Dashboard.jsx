import { Link } from "react-router-dom";
import api from "../../API";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
moment.locale("fr");

function Dashboard() {
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const response = await api.get("/analysis/history");
    if (!response?.ok) return toast.error(response.error || "Error while getting history");
    setHistory(response.data);
    console.log(response.data);
  };

  return (
    <div className=" h-screen flex flex-row">
      <div className="flex flex-col w-full h-full ">
        <h1 className="ml-10 text-4xl font-bold">Welcome {user.firstName} </h1>
        <div className="bg-[#D9D9D9] w-2/3 rounded-md ml-10 mt-10">
          <h1 className="ml-2 mt-2 font-bold">History</h1>
          <div className="flex flex-row w-fit">
            {history.map((item) => (
              <div className="flex flex-col items-center justify-start w-fit" key={item.id}>
                <p className="ml-2 mr-2 capitalize">{item.type}</p>
                <img src={item.image} alt="image" className="w-1/4 " />
                <p className="ml-2 mr-2">{moment(item.date).fromNow()}</p>
                <p className="ml-2 mr-2">{item.result ? "Positive" : "Negative"}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="bg-[#D9D9D9] w-2/5 h-5/6 rounded-md ml-10 mt-10 justify-center items-center">
            <h1 className="ml-2 mt-2 font-bold">Last features used</h1>
            <Link to="/dashboard/pneumonia" className="bg-[#4c4b4b] font-bold rounded-lg justify-center items-center hover:text-white">
              <p className="ml-2 mr-2">Pneumonia Detection</p>
            </Link>
          </div>
          <div className="bg-[#D9D9D9] w-2/5 h-5/6 rounded-md ml-10 mt-10 justify-center items-center truncate">
            <div className="ml-5">
              <h1 className="mt-2 font-bold">Agenda</h1>

              <ul className="font-bold">Today - {moment().format("dddd Do MMM")}</ul>
              <li>12h : RDV Madame Michu</li>
              <li>15h : RDV Monsieur Georges</li>
              <li>16h : RDV Madame Thomas</li>
              <ul className="font-bold">Tomorrow - {moment().add(1, "day").format("dddd Do MMM")}</ul>
              <li>Aucun événement à venir</li>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}

export default Dashboard;
