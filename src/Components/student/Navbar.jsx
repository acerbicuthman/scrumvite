import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import Logo from '../../Pages/Landing/LandingImg/Clip path group.png';
import UserNavImg from '../../assets/Ellipse 122.png';
import polygon from '../../assets/Polygon 2.png';
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import useHydratedProfileTutor from "../../hooks/useHydratedProfileTutor";
import { PiUserDuotone } from "react-icons/pi";
import useHydratedProfile from "../../hooks/useHydratedProfile";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  // const {user: learnerAuthUser, setUser} = useAuthenticatedUser
  const { formData,setFormData} = useHydratedProfile()
  const {user, setUser, logout, isLoading , setIsLoading, storedUser} = useContext(AuthContext);
  const {profile, profileId,} = useHydratedProfileTutor()
  const [profileImage, setProfileImage] = useState(null)
  const {user: AuthUser} = useAuthenticatedUser()
  const NavBarImg = AuthUser?.profile?.profile_picture

  // console.log("learnerID Learner Profile", user?.account_type)

  // Dynamically calculate the navbar height
  
  function ProfileImage ({imageUrl}) {
    return (
      <img
      src={imageUrl}
      alt="Profile"
      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', padding: "8px", marginTop: "5px"}}/>
    )
  }

  useEffect(() => {
    if(formData?.profilePicture || NavBarImg){
      setProfileImage(formData.profilePicture || NavBarImg)
    }else if (profile?.profile_picture || NavBarImg){
      setProfileImage(profile.profile_picture || NavBarImg)
    }
  }, [formData, profile])

  useEffect(() => {

    
    const navbar = document.querySelector("header");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
      setIsLoading(false)
    }
  }, []);

  if (isLoading) return null; // Early return for loading state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define links for signed-in users
  const signedInLinks = (
    <div className="hidden lg:flex flex-1 lg:gap-x-12 justify-center mx-auto items-center">
      {user?.account_type === "tutor" && (
        <div className="space-x-6">
  <Link to="/educator/tutor-dashboard" className="text-sm font-semibold text-white hover:text-indigo-600">Home</Link>
  <Link to="/educator/assignments" className="text-sm font-semibold text-white hover:text-indigo-600">Assignments</Link>
  <Link to="/educator/assignments" className="text-sm font-semibold text-white hover:text-indigo-600">Grades</Link>
  <Link to="/educator/assignments" className="text-sm font-semibold text-white hover:text-indigo-600">Calendar</Link>
  <Link to="/educator/tutor-dashboard" className="text-sm font-semibold text-white hover:text-indigo-600">Reources</Link>
</div>
      )}
      {user?.account_type === "learner" && (
        <div className="space-x-6">
          <Link to="/student-dashboard" className="text-sm font-semibold text-white hover:text-indigo-600">Home</Link>

      <Link to="/student-dashboard" className="text-sm font-semibold text-white hover:text-indigo-600">Find Tutors</Link>
      <Link to="/course-list" className="text-sm font-semibold text-white hover:text-indigo-600">Courses</Link>
      <Link to="/achievements" className="text-sm font-semibold text-white hover:text-indigo-600">Achievements</Link>
      </div>
      )}
    </div>
  );

  // Define links for non-signed-in users
  const signedOutLinks = (
    <div className="hidden lg:flex lg:gap-x-12">
      <Link to="/" className="text-sm font-semibold text-white hover:text-indigo-600">Home</Link>
      <a href="#about" className="text-sm font-semibold text-white hover:text-indigo-600">Find Tutors</a>
      <a href="#courses" className="text-sm font-semibold text-white hover:text-indigo-600">About Us</a>
    </div>
  );

  // Profile Menu for signed-in users
  const profileMenu = (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4 ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full  justify-center gap-x-1.5  bg-black px-3 text-sm font-semibold text-white shadow-xs  hover:bg-white/50 hover:border-l-indigo-300 hover:border-r-indigo-300
 border-0 border-l border-r border-l-white border-r-white
">    
          {profileImage ? (
          <ProfileImage
          alt="Default Profile"
           imageUrl={profileImage} />):(
            <PiUserDuotone 
            style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '50%',
                padding: "8px",
                marginTop: "5px"
              }}/> 
            )}
            <div className="py-3 flex">
              <p className=" pt-2 text-xl" >{user?.first_name}</p>
             
              <div className="mx-2 pt-4"><img src={polygon} alt="Polygon" /></div>
            </div>
          </MenuButton>
        </div>

        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5">
        <div className="py-1">
          {user?.account_type === "tutor" && (
            <div>
           <MenuItem>
           <Link to="/educator/tutor-profile" className="block px-4 py-2 text-sm text-gray-700">
             Tutor Profile
           </Link>
         </MenuItem>
         
         <MenuItem>
           <Link to="/educator/assignments" className="block px-4 py-2 text-sm text-gray-700">
             Assignments
           </Link>
         </MenuItem>
         </div>
           
          )}
          {user?.account_type === "learner" && (
  <MenuItem>
            
  <Link to="/learner-profile" className="block px-4 py-2 text-sm text-gray-700">Learner Profile</Link>
</MenuItem>
          )}
          
          </div>
        
          <div className="py-1">
            <MenuItem>
              <button onClick={logout} className="flex px-4 py-2 text-sm bg-red-500 rounded-lg justify-center items-center mx-auto my-3 text-white">Log Out</button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );

  // Auth Buttons for non-signed-in users
  const authButtons = (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-8">
      <Link to="/signin" className="text-sm font-semibold text-[#4318D1] bg-transparent px-3.5 py-2 rounded-md border-2 border-[#4318D1] hover:bg-indigo-500 hover:text-white">Log in</Link>
      <Link to="/" className="text-sm font-semibold rounded-md text-white bg-[#4318D1] px-5 py-2 hover:bg-indigo-500">Get Started</Link>
    </div>
  );

  return (
    <div className="mb-8 overflow-auto">
      <header className="fixed w-full bg-black p-2 inset-x-0 top-0 z-50 shadow-md">
        <nav className="flex items-center justify-between lg:px-8" aria-label="Global">
          <div className="flex lg:flex-col">
            

            {user?.account_type === "tutor" && (
               <Link to="/educator/tutor-dashboard" className="mr-20 p-2">

               <img src={Logo} alt="ScrumVite" className="h-[40px] rounded-full hover:scale-105 transition-transform duration-300" />
             </Link>
            )}
            {user?.account_type === "learner" && (
            <Link to="/student-dashboard" className="mr-20 p-2">

              <img src={Logo} alt="ScrumVite" className="h-[40px] rounded-full hover:scale-105 transition-transform duration-300" />
            </Link>
            )}
            {!user && (
            <Link to="/" className="mr-20 p-2">

              <img src={Logo} alt="ScrumVite" className="h-[40px] rounded-full hover:scale-105 transition-transform duration-300" />
            </Link>)}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={toggleMenu}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          {user ? signedInLinks : signedOutLinks}

          {/* Profile Menu for signed-in users */}
          {user ? profileMenu : authButtons}
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" onClick={toggleMenu}></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Scrum Consult</span>
                  <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                {user ? (
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Link to="/student-dashboard" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Dashboard</Link>
                      <Link to="/learner-profile" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Profile</Link>
                      {/* <Link to="/system-info" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">System Info</Link>
                      <Link to="/student-bg-info" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Student Background</Link> */}

                    </div>
                  </div>
                ) : (
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Link to="/" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Home</Link>
                      <Link to="#about" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">About</Link>
                      <Link to="#courses" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Courses</Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="py-6">
                {user ? (
                  <button onClick={logout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Log Out</button>
                ) : (
                  <Link to="/signin" onClick={toggleMenu} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Log In</Link>
                )}
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
