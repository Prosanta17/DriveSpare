import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./page/Home";
import CarLibrary from "./page/CarLibrary";
import Services from "./page/Services";
import Offers from "./page/Offers";
import RecycleBin from "./page/RecycleBin";
import "@ant-design/v5-patch-for-react-19";
import Contact from "./page/Contact";
import AddCar from "./page/AddCar";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-library" element={<CarLibrary />} />
          <Route path="/services" element={<Services />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/recycle-bin" element={<RecycleBin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-car" element={<AddCar />} />
        </Routes>
      </BrowserRouter>
      <BackToTop />
    </div>
  );
}

export default App;
