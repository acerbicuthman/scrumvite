import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import {  SignedIn, SignedOut, SignInButton,useClerk, UserButton, useUser } from '@clerk/clerk-react'
import google from "../../assets/googleIcon.png";
import { AuthContext } from "../../context/Authcontext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { user, logout, isLoading } = useContext(AuthContext);

  console.log("user in Navbar:", user); 
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Dynamically calculate the navbar height
  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);
  //   const {openSignIn} = useClerk()
  //   const {user} = useUser()
  if (isLoading) return null; 
  return (
    <div className="from-cyan-100/70 via-blue-200/60 to-purple-300/80 mb-4">
      <header className="fixed w-full bg-white p-2 inset-x-0 top-0 z-50 shadow-md">
        <nav
          className="flex items-center justify-between lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Scrum Consult</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          {user !== null && user !== undefined ?
          (<div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
      to="/student-dashboard"
      className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
    >
      Dashboard
    </Link>
            <a
              href="#courses"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              My Courses
            </a>
            <a
              href="#become-trainer"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              Reports
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
             Settings
            </a>
          </div>)
          :
         ( <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              Home
            </Link>
            <a
              href="#about"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              About
            </a>
            <a
              href="#courses"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              Courses
            </a>
            <a
              href="#become-trainer"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              Become a Trainer
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              Contact
            </a>
          </div>)
}

          {/* Login Button */}
          
          {user !== null && user !== undefined  ? (
  <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
  
    {/* <Link 
     className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
    Change Password
    </Link> */}
    <button
      onClick={logout}
      className="text-sm font-semibold text-white bg-red-500 px-3.5 py-2 rounded-md hover:bg-red-400"
    >
      Log Out
    </button>
  </div>
) : (
  <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    <Link
      to="/signin"
      className="text-sm font-semibold text-white bg-indigo-600 px-3.5 py-2 rounded-md hover:bg-indigo-500"
    >
      Log in
    </Link>
  </div>
)}




          
          <div className="hidden lg:block ml-6">
            {/* {user ? ( */}
            <header className="flex justify-center  border-b">
              {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
            </header>
            {/* ) : ( */}
            <div className="flex justify-center m border-b">
              {/* <SignedOut>
            <SignInButton mode="modal"> */}

              <button
              // onClick={openSignIn}
              >
                {/* <img
                  src={google}
                  alt="Sign in with Google"
                  className="w-10 h-10 object-contain"
                /> */}
              </button>
              {/* </SignInButton>
          </SignedOut> */}
            </div>
            {/* )} */}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" onClick={toggleMenu}></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Scrum Consult</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Logo"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
              {user !== null && user !== undefined ?
              (
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      to="/student-dashboard"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </Link>
                    <a
                      href="#about"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#courses"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      My Courses
                    </a>
                    <a
                      href="#become-trainer"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Schedule
                    </a>
                    <a
                      href="#contact"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </div>
                  </div>)
                  :
             ( 
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      to="/"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </Link>
                    <a
                      href="#about"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      About
                    </a>
                    <a
                      href="#courses"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Courses
                    </a>
                    <a
                      href="#become-trainer"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Become a Trainer
                    </a>
                    <a
                      href="#contact"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Contact
                    </a>
                  </div>
                  </div>
                  )
}
                  
              
                  {user  !== null && user !== undefined  ?(
                  <div className="py-6">
                  <Link
                    to="/signin"
                    onClick={logout}
                    className="-mx-3 block rounded-l px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <button className="p-2 bg-red-700 text-white">
                    Log Out
                    </button>
                  
                  </Link> 
                  </div>)
                  :
                 ( <div className="py-6">
                    <Link
                      to="/signin"
                      onClick={toggleMenu}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>)
}
                  <div>
                
                    {/* {user ? ( */}
                    <header className="flex justify-center p-4 border-b">
                      {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
                    </header>
                    {/* ) : ( */}
                    <div className="flex justify-center p-4 border-b">
                      {/* <SignedOut>
            <SignInButton mode="modal"> */}

                      <button
                      // onClick={openSignIn}
                      >
                        {/* <img
                          src={google}
                          alt="Sign in with Google"
                          className="w-10 h-10 object-contain"
                        /> */}
                      </button>
                      {/* </SignInButton>
          </SignedOut> */}
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
          
        )}
      </header>

      {/* Add space for sections below */}
      <div className={`mt-[${navbarHeight}px]`}>
        {/* Your sections content */}
      </div>
    </div>
  );
};

export default Navbar;
