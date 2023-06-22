import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import logo from "../assets/logo.png";
import { Link, Outlet, useLocation } from "react-router-dom";

function SideBar() {
  const dispatch = useDispatch();

  return (
    <div className=" h-screen flex flex-row">
      <div className="flex flex-col bg-[#080957] h-full w-2/5 text-white">
        <div className="mt-2">
          <Link to={"/dashboard"} className="flex overflow-hidden  px-4 w-full items-center justify-center bg-[#080957]">
            <img className="" src={logo} alt="logo" />
          </Link>
          <div className="border-y-2 border-white my-4 ml-20" />
          <div className="font-bold pl-4">Cardiology features</div>
          <SideBarItem title="Pneumonia Detection" to="/dashboard/pneumonia" />
          <div className="font-bold pl-4">Dermatology features</div>
          <SideBarItem title="Melanoma Detection" to="/dashboard/melanoma" />
          <SideBarItem title="Melanoma recurrence prediction" to="/dashboard/melanoma-recurrence" />

          <button className="bg-[#4c4b4b] mt-10 text-white rounded-lg justify-center items-center " onClick={() => dispatch(logout())}>
            <p className="mx-2">disconnect</p>
          </button>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

const SideBarItem = ({ title, to }) => {
  const location = useLocation();
  console.log(location.pathname, to);
  return (
    <Link to={to} className={`${location.pathname === to ? "" : ""}`}>
      <div className={`p-1 pl-10 ${location.pathname === to ? "text-black font-bold bg-white" : "text-white"}`}>{title}</div>
    </Link>
  );
};

export default SideBar;
