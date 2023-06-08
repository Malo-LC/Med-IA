import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page content</p>
      <div>
      <Link to="/login">Login</Link>
      </div>
      <div>
      <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default HomePage;
