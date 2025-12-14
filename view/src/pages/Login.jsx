/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authAPI } from '../utils/api';
import login from '../assets/login.webp';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">

         
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-medium">ShopIt</h2>
          </div>

        
          <h2 className="text-3xl font-bold text-center mb-2">Hey there!</h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your Username and Password to Login
          </p>

        
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Email"
            />
          </div>

          
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Password"
            />
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p className='mt-6 text-center text-sm'>
            Don't Have an account?{" "}<Link to="/register" className='text-blue-500'>
            register
            </Link>

          </p>

        </form>

      </div>

      <div className='hidden md:block w-1/2 bg-gray-800'>
      <div className='h-full flex flex-col justify-center items-center'>
        <img src={login} alt='Login to image' className='h-[600px] w-full object-cover'/>

      </div>

      </div>
    </div>
  );
}

export default Login;
*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import loginImage from '../assets/login.webp';

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
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log("LOGIN RESPONSE:", response.data);

      if (!response.data || !response.data.token) {
        toast.error("Unexpected response from server");
        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE USER IN STATE
      setUser(response.data.user);

      toast.success("Login successful!");

      // ⭐ IMPORTANT — THIS WAS MISSING
      navigate("/checkout");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-black text-white py-2 rounded">
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-300">
        <img src={loginImage} className="h-[700px] w-full object-cover" />
      </div>
    </div>
  );
}

export default Login;
