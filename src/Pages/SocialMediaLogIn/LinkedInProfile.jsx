// import React, { useState, useEffect } from 'react';

// const LinkedDashboard = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Retrieve the access token from localStorage (or from React state)
//     const accessToken = localStorage.getItem('linkedin_access_token');
    
//     if (accessToken) {
//       // Fetch LinkedIn profile data
//       fetch('https://api.linkedin.com/v2/me', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setProfile(data); // Set the profile data to state
//         })
//         .catch((error) => {
//           setError('Failed to fetch LinkedIn profile');
//           console.error(error);
//         });
//     } else {
//       setError('Access token is missing');
//     }
//   }, []); // This runs only once when the component is mounted

//   if (error) return <p>{error}</p>;
//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div className='h-screen'>
//       <h1>{profile.localizedFirstName} {profile.localizedLastName}</h1>
//       <p>{profile.headline}</p>
//       <img
//         src={profile.profilePicture['displayImage~'].elements[0].identifiers[0].identifier}
//         alt="Profile"
//       />
//     </div>
//   );
// };

// export default LinkedDashboard;
