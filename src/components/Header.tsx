import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Car Library", path: "/car-library" },
    { name: "Services", path: "/services" },
    { name: "Special Offers", path: "/offers" },
    { name: "Recycle Bin", path: "/recycle-bin" },
  ];

  return (
    <header className="w-full bg-white shadow-nav px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="DriveSphere Logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`hover:text-primary ${
              location.pathname === item.path
                ? "text-primary font-semibold active"
                : "text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Desktop Contact Button */}
      <Link
        to="/contact"
        className="hidden md:inline-block bg-primary text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
      >
        Contact Us
      </Link>

      {/* Mobile Menu Icon */}
      <Button
        className="md:hidden border-none"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
      />

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <nav className="flex flex-col gap-4 text-base">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary font-semibold"
                  : "text-gray-700"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-primary text-white px-5 py-2 rounded-full text-center hover:bg-purple-700 transition"
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
