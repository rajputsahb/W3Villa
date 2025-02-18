import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 w-full rounded-lg shadow-lg transition duration-300">
          Login
        </button>
        <p className="mt-4 text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;