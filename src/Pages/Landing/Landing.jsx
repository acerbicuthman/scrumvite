import React from "react";
import HEroLanding from "./HEroLanding";
import WhyChooseUs from "./WhyChooseUs";
import WhatOurUserSays from "./WhatOurUserSays";
import ReadyToLearn from "./ReadyToLearn";
import Navbar from "../../Components/student/Navbar";

const Landing = () => {
  return (
    <div className="mt-18 overflow-auto bg-black">
      <HEroLanding />
      <WhyChooseUs />
      <WhatOurUserSays />
      <ReadyToLearn />
    </div>
  );
};

export default Landing;
