import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold p-3 w-full rounded-lg shadow-lg transition duration-300">
          Register
        </button>
        <p className="mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;