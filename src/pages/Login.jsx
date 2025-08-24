import React from 'react';
import { useState } from 'react';
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Sign up");
  const [formData, setFormData] = useState({ email: '', password: '',fullName:'' });
  const [errors, setErrors] = useState({});
  const [bio, setBio] = useState("");
  const [isDataSubmit, setIsDataSubmit] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};
  if (!formData.email) newErrors.email = 'Email is required';
  if (!formData.password) newErrors.password = 'Password is required';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  if (currentState === "Sign up") {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: "http://localhost:5173/Jumba", 
        data: {
          full_name: formData.fullName,
          bio: bio
        }
      }
    });
    if (error) {
      console.error("Sign up error:", error.message);
      alert(error.message);
    } else {
      console.log("User signed up:", data);
      alert("Check your email to confirm your account");
    }
  }
  else if (currentState === "login") {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    } else {
      console.log("User logged in:", data);
      navigate("/"); 
      alert("Login successful!");
    }
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white !p-8 rounded-xl shadow-lg w-full max-w-sm border border-green-100">
        <h2 className="text-2xl font-bold !mb-6 text-center text-green-800">{currentState}</h2>

        { isDataSubmit &&(
          
            <img onClick={()=>setIsDataSubmit(false)} className='!ml-74 cursor-pointer Arrowicon bottom-96 opacity-60 !mb-6 size-8 absolute' src={assets.arrow_icon} alt="" />
        
        )}

        {currentState=== "Sign up" && !isDataSubmit &&(
          <div>

            <label className="block !mb-1  font-medium text-green-700">fullName</label>
          <input value={formData.fullName} name='fullName' onChange={handleChange}  type="text" className='w-full text-black border border-green-300 rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' placeholder='' />
          </div>
        )}


        {/* when data is not submitted we will force to put email adn pss */}

        {!isDataSubmit&&(
          
          <div>
                    <div className="!mb-4">
          <label className="block !mb-1 font-medium text-green-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-green-300  text-black rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-sm !mt-1">{errors.email}</p>
          )}
        </div>

        <div className="!mb-6">
          <label className="block !mb-1 font-medium text-green-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border  text-black border-green-300 rounded !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {errors.password && (
            <p className="text-red-500 text-sm !mt-1">{errors.password}</p>
          )}
        </div>
          </div>
        
        )}

        {currentState==="Sign up" && isDataSubmit &&(
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
          rows={4} className="textarea bg-green-100 text-black !py-3" placeholder="Bio"></textarea>
        )}





        <div className='!py-3'>
                  <button
          onClick={handleSubmit}
          
          className="w-full bg-green-500 text-white !py-3 rounded hover:bg-green-600 transition-colors duration-200 font-medium"
        >
          {currentState==="Sign up"? "create account" : "Login now"}
        </button>

        <div className='flex flex-col gap-2'>
          {currentState==="Sign up" ?(
            <p className='text-sm text-gray-600'> Already have an account ? <span onClick={()=>{setCurrentState("login");isDataSubmit(false)}} className='font-medium text-green-500 cursor-pointer'>Login here</span></p>
          ): (
            <p className='text-sm text-gray-600 '>create ans account <span onClick={()=>{setCurrentState("Sign up");isDataSubmit(false)}} className='font-medium text-green-500 cursor-pointer'>Click here</span></p>
          )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginForm;