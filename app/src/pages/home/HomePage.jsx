import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Page d&apos;acceuil</h1>
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
