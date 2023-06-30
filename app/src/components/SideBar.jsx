import logo from "../assets/logo.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BsLungsFill } from "react-icons/bs";
import { PiPersonArmsSpreadFill, PiMoneyFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { AiFillSkin } from "react-icons/ai";

function SideBar() {
  return (
    <div className=" h-screen flex flex-row">
      <div className="flex flex-col justify-between bg-[#080957] h-full w-2/5 text-white">
        <div className="mt-2">
          <Link to={"/dashboard"} className="flex overflow-hidden  px-4 w-full items-center justify-center bg-[#080957]">
            <img className="" src={logo} alt="logo" />
          </Link>
          <div className="border-y-2 border-white my-4 ml-20" />
          <div className="font-bold pl-4">Cardiology features</div>
          <SideBarItem icon={<BsLungsFill />} title="Pneumonia Detection" to="/dashboard/pneumonia" />
          <div className="font-bold pl-4">Dermatology features</div>
          <SideBarItem icon={<AiFillSkin />} title="Melanoma Detection" to="/dashboard/melanoma" />
          <SideBarItem icon={<AiFillSkin />} title="Melanoma recurrence prediction" to="/dashboard/melanoma-recurrence" />
          <div className="font-bold pl-4">Administration</div>
          <SideBarItem icon={<PiPersonArmsSpreadFill />} title="Patients" to="/dashboard/patients" />
        </div>

        {/* Subscription and Settings */}
        <div>
          <Link to={"/dashboard/subscription"} className=" my-4 ml-2 flex flex-row items-center w-fit ">
            <PiMoneyFill />
            <div className="pl-2">Manage Subscription</div>
          </Link>
          <Link to={"/dashboard/settings"} className=" my-4 ml-2 flex flex-row items-center w-fit">
            <FiSettings />
            <div className="pl-2">Settings</div>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

const SideBarItem = ({ title, to, icon }) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`${
        location.pathname === to ? "text-black font-bold bg-white" : "text-white"
      } p-1 pl-10 flex flex-row items-center gap-2 hover:bg-[#24255e]`}>
      {icon}
      <div className={``}>{title}</div>
    </Link>
  );
};

export default SideBar;
