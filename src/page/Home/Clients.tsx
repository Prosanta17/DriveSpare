import React from "react";
import ClientsLogo from "../../assets/clients.png";

/**
 * Clients component displays a grid of client logos
 * to showcase companies that trust our services
 */
const Clients: React.FC = () => {
  // Array of client logos (currently using placeholder images)
  const logos: string[] = [
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
  ];

  return (
    // Main section with white background and centered content
    <section className="py-12 bg-white text-center">
      {/* Section heading */}
      <h2 className="text-3xl font-oswald font-semibold mb-6">
        Trusted by Top Clients
      </h2>
      {/* Responsive grid layout for logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 justify-center flex-wrap gap-2 md:gap-8 px-6">
        {/* Map through logos array to render each client logo */}
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo}
            alt="Client Logo"
            className="h-12 object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default Clients;
