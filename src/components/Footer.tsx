import React from "react";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 text-sm">
      <div className="px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo */}
          <div className="footer-logo">
            <Link to="/">
              <img src={Logo} alt="DriveSphere Logo" className="h-8 w-auto" />
            </Link>

            <p className="mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-black">
              Home
            </Link>
            <Link to="/terms" className="hover:text-black">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-black">
              Privacy Policy
            </Link>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col gap-2">
            <Link to="/about" className="hover:text-black">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-black">
              Contact Us
            </Link>
            <Link to="/faqs" className="hover:text-black">
              FAQs
            </Link>
          </div>

          {/* Column 4: Download + Social Icons */}
          <div className="flex flex-col items-start gap-4">
            <h3>Follow us on:</h3>

            {/* Social Icons */}
            <div className="flex gap-3 text-xl text-gray-500">
              <a href="#" className="text-blue-600">
                <FaFacebookSquare />
              </a>
              <a href="#" className="text-pink-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-900">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center text-xs lg:mt-8 py-5 bg-gray-900 text-white">
        © {new Date().getFullYear()} DriveSpare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
