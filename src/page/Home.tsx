import React from "react";
import HeroSlider from "../components/HeroSlider";
import AboutUs from "../components/ShortAboutUs";
import Featured from "../components/Featured";
import Clients from "../components/Clients";
import Testimonials from "../components/Testimonials";

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
