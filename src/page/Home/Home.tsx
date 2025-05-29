import React from "react";
import HeroSlider from "./HeroSlider";
import AboutUs from "./ShortAboutUs";
import Featured from "./Featured";
import Clients from "./Clients";
import Testimonials from "./Testimonials";

const Home: React.FC = () => {
  return (
    <>
      <HeroSlider />
      <AboutUs />
      <Featured />
      <Clients />
      <Testimonials />
    </>
  );
};

export default Home;
