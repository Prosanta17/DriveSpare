import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

// Interface defining the structure of navigation items
interface NavItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  // State for controlling mobile menu drawer
  const [open, setOpen] = useState<boolean>(false);
  // Hook to get current route location
  const location = useLocation();

  // Array of navigation items with their names and paths
  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Car Library", path: "/car-library" },
    { name: "Services", path: "/services" },
    { name: "Special Offers", path: "/offers" },
    { name: "Recycle Bin", path: "/recycle-bin" },
  ];

  return (
    // Main header container with styling
    <header className="sticky top-0 z-10 w-full bg-white shadow-nav px-6 py-4 flex items-center justify-between">
      {/* Logo section with link to homepage */}
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="DriveSphere Logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex gap-8 text-sm">
        {navItems.map((item: NavItem) => (
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

      {/* Desktop Contact Button - Hidden on mobile */}
      <Link
        to="/contact"
        className="hidden md:inline-block bg-primary text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
      >
        Contact Us
      </Link>

      {/* Mobile Menu Toggle Button - Visible only on mobile */}
      <Button
        className="md:hidden border-none"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
      />

      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-4 text-base">
          {navItems.map((item: NavItem) => (
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
          {/* Mobile Contact Button */}
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
