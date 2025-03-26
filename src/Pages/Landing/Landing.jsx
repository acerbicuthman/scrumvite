import React, { useState } from 'react';

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className="from-cyan-100/70 via-blue-200/60 to-purple-300/80">
    //   <header className="absolute inset-x-0 top-0 z-50">
    //     <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    //       <div className="flex lg:flex-1">
    //         <a href="#" className="-m-1.5 p-1.5">
    //           <span className="sr-only">Scrum Consult</span>
    //           <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
    //         </a>
    //       </div>
    //       <div className="flex lg:hidden">
    //         <button
    //           type="button"
    //           className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    //           onClick={toggleMenu}
    //         >
    //           <span className="sr-only">Open main menu</span>
    //           <svg
    //             className="size-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             aria-hidden="true"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="hidden lg:flex lg:gap-x-12">
    //         <a href="#" className="text-sm font-semibold text-gray-900">Home</a>
    //         <a href="#about" className="text-sm font-semibold text-gray-900">About</a>
    //         <a href="#courses" className="text-sm font-semibold text-gray-900">Courses</a>
    //         <a href="#become-trainer" className="text-sm font-semibold text-gray-900">Become a Trainer</a>
    //         <a href="#contact" className="text-sm font-semibold text-gray-900">Contact</a>
    //       </div>
    //       <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    //         <a
    //           href="#login"
    //           className="text-sm font-semibold text-white bg-indigo-600 px-3.5 py-2.5 rounded-md hover:bg-indigo-500"
    //         >
    //           Log in
    //         </a>
    //       </div>
    //     </nav>

   
    //     {isOpen && (
    //       <div className="lg:hidden" role="dialog" aria-modal="true">
    //         <div className="fixed inset-0 z-50" onClick={toggleMenu}></div>
    //         <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    //           <div className="flex items-center justify-between">
    //             <a href="#" className="-m-1.5 p-1.5">
    //               <span className="sr-only">Scrum Consult</span>
    //               <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
    //             </a>
    //             <button
    //               type="button"
    //               className="-m-2.5 rounded-md p-2.5 text-gray-700"
    //               onClick={toggleMenu}
    //             >
    //               <span className="sr-only">Close menu</span>
    //               <svg
    //                 className="size-6"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M6 18L18 6M6 6l12 12"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //           <div className="mt-6 flow-root">
    //             <div className="-my-6 divide-y divide-gray-500/10">
    //               <div className="space-y-2 py-6">
    //                 <a href="#home" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Home</a>
    //                 <a href="#about" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">About</a>
    //                 <a href="#courses" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Courses</a>
    //                 <a href="#become-trainer" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Become a Trainer</a>
    //                 <a href="#contact" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Contact</a>
    //               </div>
    //               <div className="py-6">
    //                 <a href="#login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </header>
<div className='from-cyan-100/70 via-blue-200/60 to-purple-300/80'>
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-b">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Empower Your Learning Journey</h1>
          <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
            Join a community of learners and trainers shaping the future.
          </p>

          <div className="mt-10">
            <div className="flex items-center justify-center gap-x-6">
              <a
                href="#get-started-learner"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
              >
                Get Started as a Learner
              </a>
              <a
                href="#get-started-trainer"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
              >
                Get Started as a Trainer
              </a>
            </div>
            <div className="mt-4">
              <p>Already have an account? <a href="#login" className="text-blue-600">Login</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Why Choose Our Platform?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature">
              <h3 className="text-xl font-semibold">Interactive Courses</h3>
              <p>Engage with fun, interactive, and well-structured content.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold">Expert Trainers</h3>
              <p>Learn from experienced industry professionals.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold">Flexible Learning</h3>
              <p>Learn at your own pace from anywhere in the world.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold">Certification</h3>
              <p>Earn certificates that boost your career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section id="courses" className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Explore Popular Courses</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card (Repeat for each course) */}
            <div className="course-card">
              <img src="course-image.jpg" alt="Course" />
              <h3 className="text-xl font-semibold">Course Title</h3>
              <p className="text-gray-600">Short description of the course.</p>
              <a href="#" className="text-indigo-600">Enroll Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">How It Works</h2>
          <div className="mt-8">
            <ol className="list-decimal space-y-4 text-left max-w-3xl mx-auto">
              <li>Browse Courses / Create Course</li>
              <li>Enroll / Upload Content</li>
              <li>Learn at Your Pace / Engage with Learners</li>
              <li>Earn Certification / Track Progress</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">What Our Users Say</h2>
          <div className="mt-8">
            {/* Carousel of testimonials */}
            <div className="testimonial-carousel">
              {/* Add testimonials here */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-semibold">Ready to Start Your Journey?</h2>
        <div className="mt-8">
          <a href="#get-started-learner" className="text-white-600 font-semibold">Join as a Learner</a>
          <span className="mx-4">or</span>
          <a href="#get-started-trainer" className="text-white-600 font-semibold">Join as a Trainer</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="text-center">
          <div className="mb-4">
            <a href="#about" className="text-white">About</a> | 
            <a href="#courses" className="text-white"> Courses</a> | 
            <a href="#contact" className="text-white"> Contact</a> | 
            <a href="#privacy-policy" className="text-white"> Privacy Policy</a> | 
            <a href="#terms-of-service" className="text-white"> Terms of Service</a>
          </div>
          <div>
            <a href="#" className="text-white">Facebook</a> | 
            <a href="#" className="text-white">Twitter</a> | 
            <a href="#" className="text-white">LinkedIn</a>
          </div>
          <div className="mt-4 text-sm">
            &copy; 2025 Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
