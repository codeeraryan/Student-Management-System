import React, { useState } from "react";

import Login from "../components/Login";
import Register from "../components/Register";
export const LoginView = () =>{
const [activeSignup,setActiveSignup]=useState(false);

return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {activeSignup?<Register/>:<Login/>}
        <button style={{padding:"10px"}} onClick={()=>setActiveSignup(prev=>!prev)}>{activeSignup?"Already have an account , Login":" Create new account , SignUp"}</button>
      </div>
    </div>
  );}