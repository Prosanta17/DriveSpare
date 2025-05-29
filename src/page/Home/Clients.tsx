import React from "react";
import ClientsLogo from "../../assets/clients.png";

const Clients: React.FC = () => {
  const logos: string[] = [
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
    ClientsLogo,
  ];

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-oswald font-semibold mb-6">
        Trusted by Top Clients
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 justify-center flex-wrap gap-2 md:gap-8 px-6">
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
