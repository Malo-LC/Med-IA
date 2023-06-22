import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/auth";
import API from "../../API";
import logo from "../../assets/logo.png";
import { toast } from "react-hot-toast";

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = await API.post("/user/login", { email, password });
    if (!data.isValid) return toast.error(data.error);

    dispatch(loginSuccess(data.user)); // Dispatch the login success action with the user data
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = await API.post("/user/signup", { firstName, lastName, email, password });
    if (!data.isValid) return console.log(data.error);
    dispatch(loginSuccess(data.user)); // Dispatch the login success action with the user data
  };

  const handleReturnToLogin = () => {
    setIsLoginForm((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex overflow-hidden  px-4 w-full items-center justify-center bg-[#080957]">
        <img className="h-48" src={logo} alt="logo" />
      </div>

      <div className="my-5">
        {isLoginForm ? (
          <button className="bg-[#7577CD] p-1 rounded text-white" onClick={handleReturnToLogin}>
            Sign up
          </button>
        ) : (
          <button className="bg-[#7577CD] p-1 rounded text-white" onClick={handleReturnToLogin}>
            Sign in
          </button>
        )}
      </div>

      <form onSubmit={isLoginForm ? handleLogin : handleSignUp} className="flex flex-col items-center justify-center gap-5">
        {isLoginForm ? (
          <>
            <input defaultValue="" className="p-2 bg-[#D9D9D9] rounded" id="email" placeholder="Email" type="email" required />
            <input defaultValue="" className="p-2 bg-[#D9D9D9] rounded" id="password" placeholder="Password" type="password" required />
          </>
        ) : (
          <>
            <input defaultValue="" className="p-2 bg-[#D9D9D9] rounded" id="firstName" placeholder="First Name" type="text" required />
            <input defaultValue="" className="p-2 bg-[#D9D9D9] rounded" id="lastName" placeholder="Last Name" type="text" required />
            <input defaultValue="" className="p-2 bg-[#D9D9D9] rounded" id="email" placeholder="Email" type="email" required />
            <input
              defaultValue=""
              className="p-2 bg-[#D9D9D9] rounded"
              id="password"
              placeholder="Password"
              type="password"
              required
              minLength={8} // Minimum password length requirement
            />
          </>
        )}

        <button className="bg-[#7577CD] p-3 px-6 rounded text-white font-black" type="submit">
          {isLoginForm ? "Login" : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
