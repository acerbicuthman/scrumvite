import React, { useState } from 'react'
import welcomeImg from '../../assets/rafiki.png'
import { Link } from 'react-router-dom';


const ScrumLanding = () => {

        const [selectedOption, setSelectedOption] = useState('');
      
        const handleChange = (e) => {
          setSelectedOption(e.target.value);
        };
  return (
    <div className='flex flex-col lg:flex-row mt-12 p-4 lg:p-'>
      <div className='flex-1 bg-gray-200 p-8 lg:p-12 flex justify-center items-center'>
        <img src={welcomeImg} alt="Welcome" className='max-w-full h-auto' />
      </div>
      <div className='flex-1 p-12 lg:p-6 flex flex-col justify-center text-center'>
        <h1 className='text-3xl lg:text-3xl font-semibold text-gray-800 mb-4'>
          Create Your Account on Scrum Consult
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          Welcome to Scrum Consult! Join as a Learner or Tutor and start Your 
          Journey today.
        </p>
        <div className='w-full max-w-md mx-auto'>
          <form className='space-y-6'>
            <div className='flex flex-col'>
              <label htmlFor="dropdown" className='text-sm font-medium text-gray-700'>
                Choose Your Account Type
              </label>
              <select
              id="dropdown" 
              value={selectedOption} onChange={handleChange}
                name="accountType"
                className='w-full mt-2 p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                defaultValue="default"
              >
                  <option value="">--Please choose an option--</option>
                <option value="learner">Learner</option>
                <option value="educator">Educator</option>
              </select>
              {selectedOption && (
        <p>
          <a href='/signup' target="_blank" rel="noopener noreferrer">
             {/* {selectedOption} */}
          </a>
        </p>
      )}
            </div>
            <Link to='/signup'>
            <button
              type="submit"
              className='w-full py-3 mt-6 bg-indigo-900 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition duration-300'
            >
              Continue
            </button>
            </Link>
            <Link>
            <button className='my-4 text-blue-600 hover:bg-blue-900 rounded-lg p-2 hover:text-white'>Already a member? Log in </button></Link>
           
          </form>
        </div>
      </div>
    </div>
  )
}

export default ScrumLanding
