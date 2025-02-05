import React, { useState } from 'react'
import { useFirebase } from '../context/FirebaseProvider'

const Login = () => {
   const userDetails=useFirebase();
   const [email,setEmail]=useState("");
   const [pass,setPass]=useState("");

   const handleLogin=()=>{
    userDetails.login(email,pass)
   }
  return (
    <div>
      <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required onChange={(e)=>setPass(e.target.value)} value={pass}  type="password" className="w-full p-2 border rounded-lg" />
          </div>
          <button
            type="button"
            onClick={() => handleLogin()}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
    </div>
  )
}

export default Login
