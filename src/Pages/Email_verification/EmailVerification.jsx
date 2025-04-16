import React, { useState } from 'react'
import OverlayEmailPage from './OverlayEmailPage';
import SignUp from '../Learner/SignUp';

const EmailVerification = () => {
  
  const [showOverLay, setShowOverLay] = useState(false);

  return (
  <div className='relative'>
    <div className={`bg-${showOverLay ? 'faded' : ''}`}>
      <SignUp />

    </div>
    <OverlayEmailPage/>
    </div>
  );
};

export default EmailVerification;
