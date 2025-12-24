// FILE: src/pages/Login.jsx
/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import loginImage from "../assets/login.webp";

const BASE_URL = "https://shopit-56mz.onrender.com";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password }
      );

      console.log("LOGIN RESPONSE:", response.data);

      if (!response.data?.token) {
        toast.error("Unexpected response from server");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", response.data.token);

      // ✅ Save user
      setUser(response.data.user);

      toast.success("Login successful!");

      // ✅ Redirect after login
      navigate("/checkout");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
     
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      
      <div className="hidden md:block w-1/2 bg-gray-300">
        <img
          src={loginImage}
          alt="Login"
          className="h-[700px] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;*/
// FILE: src/pages/Login.jsx
 import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import loginImage from "../assets/login.webp";

const BASE_URL = "https://shopit-56mz.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: get redirect from state
  const redirectPath = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      toast.success("Login successful!");
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow border"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src={loginImage}
          alt="Login"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;


