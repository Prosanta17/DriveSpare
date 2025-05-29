import React from "react";
import "./App.css";
import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./page/Home/Home";
import CarLibrary from "./page/CarLibray/CarLibrary";
import Services from "./page/Services";
import Offers from "./page/Offers";
import RecycleBin from "./page/RecycleBin";
import Contact from "./page/Contact";
import AddCar from "./page/AddCar/AddCar";
import Footer from "./components/Footer";
import Terms from "./page/Terms";
import Privacy from "./page/Privacy";
import AboutUs from "./page/AboutUs";
import Faqs from "./page/Faqs";
import BackToTop from "./components/BackToTop";

const App: React.FC = () => {
  return (
    <div className="font-nunito min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car-library" element={<CarLibrary />} />
            <Route path="/services" element={<Services />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faqs" element={<Faqs />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      <BackToTop />
    </div>
  );
};

export default App;
