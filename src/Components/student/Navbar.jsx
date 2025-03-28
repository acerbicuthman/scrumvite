import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

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

  return (
    <div className="from-cyan-100/70 via-blue-200/60 to-purple-300/80 mb-8">
      <header className="fixed w-full bg-white p-4 inset-x-0 top-0 z-50 shadow-md">
        <nav className="flex items-center justify-between lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Scrum Consult</span>
              <Link to='/'>
             
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
              />
               </Link>
            </a>
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
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#home" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Home
            </a>
            <a href="#about" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              About
            </a>
            <a href="#courses" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Courses
            </a>
            <a href="#become-trainer" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Become a Trainer
            </a>
            <a href="#contact" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Contact
            </a>
            
            <a href="#contact" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
            <Link to='/emailverification'>
                 Verify Email
                 </Link> 
            </a>
           
           
          </div>
          {/* Login Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#login"
              className="text-sm font-semibold text-white bg-indigo-600 px-3.5 py-2.5 rounded-md hover:bg-indigo-500"
            >
              Log in
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" onClick={toggleMenu}></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Scrum Consult</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Logo"
                  />
                </a>
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
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a
                      href="#home"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </a>
                    <a
                      href="#about"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      About
                    </a>
                    <a
                      href="#courses"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Courses
                    </a>
                    <a
                      href="#become-trainer"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Become a Trainer
                    </a>
                    <a
                      href="#contact"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Contact
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
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
