import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Med-IA</h1>
      </div>
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-700">Please log in to continue.</p>
        <Link to="/login" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
