import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/auth";
import API from "../../API";
import "./Login.css";

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = await API.post("/user/login", { email, password });
    if (!data.isValid) return console.log(data.error);

    if (data.isValid) {
      console.log("Login successful");
      dispatch(loginSuccess(data.user)); // Dispatch the login success action with the user data
    } else {
      console.log("Invalid email or password");
      // Display an error message to the user
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(firstName, lastName, email, password);
    const data = await API.post("/user/signup", { firstName, lastName, email, password });
    if (!data.isValid) return console.log(data.error);
    console.log("Signup response:", data); // Add this line
    console.log("Signup successful");
    dispatch(loginSuccess(data.user)); // Dispatch the login success action with the user data
  };

  const handleReturnToLogin = () => {
    setIsLoginForm((prev) => !prev);
  };

  return (
    <div className="Login">
      <div className="top-of-page">
        <div className="logo-homepage"></div>
      </div>

      <div className="button-container">{isLoginForm ? <button onClick={handleReturnToLogin}>Sign up</button> : <button onClick={handleReturnToLogin}>Sign in</button>}</div>

      <form onSubmit={isLoginForm ? handleLogin : handleSignUp}>
        {isLoginForm ? (
          <div>
            <div>
              <input id="email" placeholder="Email" type="email" required />
            </div>
            <div>
              <input id="password" placeholder="Password" type="password" required />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <input id="firstName" placeholder="First Name" type="text" required />
            </div>
            <div>
              <input id="lastName" placeholder="Last Name" type="text" required />
            </div>
            <div>
              <input id="email" placeholder="Email" type="email" required />
            </div>
            <div>
              <input
                id="password"
                placeholder="Password"
                type="password"
                required
                minLength={8} // Minimum password length requirement
              />
            </div>
          </div>
        )}

        <button type="submit">{isLoginForm ? "Login" : "Sign up"}</button>
      </form>
    </div>
  );
}

export default Login;
