import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page content</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
