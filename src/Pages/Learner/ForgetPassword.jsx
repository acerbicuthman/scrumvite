import React, { useState } from 'react'
import axios from 'axios'
import { base_url } from '../../library/api'

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage]= useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const req = await axios.post(`${base_url}api/auth/password/reset`, {email})
            setMessage(req.data.message)
        } catch (err) {
            console.error("Error:", err);
            if (err.response && err.response.data) {
              setMessage(err.response.data.message || "Something went wrong");
            } else {
              setMessage("An unexpected error occurred.");
            }
          }
          
       
    }
  return (
    <div className='h-screen flex items-center justify-center text-center'>
       
       <div className='flex flex-col md:w-full w-1/2 h-1/2 '>
       <h2 className='text-xl font-bold mt-20 mb-4'>Forgot Password</h2>
        <form 
        onSubmit={handleSubmit}
        action="">
            <input type="email" 
            className='w-full md:w-1/3 px-3 border-2'
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
            <div>

            
           <button type='submit' className='bg-blue-800 w-full md:w-1/3 mt-4 px-2 py-2 rounded-lg text-white'>Send Reset Link
           </button>
           </div>
        </form>
        {message && <p className='mt-4 text-sm'>{message}</p>}
        </div> 
    </div>
  )
}

export default ForgetPassword
