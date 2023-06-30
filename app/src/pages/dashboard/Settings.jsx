import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { toast } from "react-hot-toast";

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      <div className="mt-8 bg-white border border-gray-200 p-6 rounded-lg">
        <div className="flex gap-3 items-center mb-4">
          <h3 className="text-lg font-semibold">{user.firstName}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-end">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
