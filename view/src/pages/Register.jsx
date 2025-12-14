/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authAPI } from '../utils/api';
import register from '../assets/register.webp';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.register({ name, email, password });
      localStorage.setItem('token', response.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
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
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>


          
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p className='mt-6 text-center text-sm'>
            Don't Have an account?{" "}<Link to="/login" className='text-blue-500'>
            Login
            </Link>

          </p>

        </form>

      </div>

      <div className='hidden md:block w-1/2 bg-gray-300'>
      <div className='h-full flex flex-col justify-center items-center'>
        <img src={register} alt='Login to image' className='h-[750px] w-full object-cover'/>

      </div>

      </div>
    </div>
  );
}

export default Register;*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import registerImage from '../assets/register.webp';

function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      console.log("REGISTER RESPONSE:", response.data);

      toast.success("Registration successful!");

      // Redirect to Login instead of Home
      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">

          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-medium">ShopIt</h2>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Hey there!</h2>
          <p className="text-center text-gray-600 mb-6">Enter your details to Register</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Email"
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
              placeholder="Enter your Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>

        </form>
      </div>

      {/* Image */}
      <div className="hidden md:block w-1/2 bg-gray-300">
        <div className="h-full flex justify-center items-center">
          <img src={registerImage} alt="Register" className="h-[750px] w-full object-cover"/>
        </div>
      </div>
    </div>
  );
}

export default Register;
