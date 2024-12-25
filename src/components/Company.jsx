import React from "react";

const Company = () => {
  const stats = [
    {
      id: 1,
      icon: "/assets/images/exp1.svg",
      number: 123,
      label: "Shelves Inserted",
    },
    {
      id: 2,
      icon: "/assets/images/exp2.svg",
      number: 84,
      label: "Happy Clients",
    },
    {
      id: 3,
      icon: "/assets/images/exp3.svg",
      number: 37,
      label: "Awards Win",
    },
    {
      id: 4,
      icon: "/assets/images/exp4.svg",
      number: 15,
      label: "Years in Business",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white py-16 px-8 gap-16">
      {/* Left Section: Stats */}
      <div className="flex flex-col gap-8 w-full lg:w-1/2">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex items-center ${
              index % 2 === 0 ? "ml-auto" : "mr-auto"
            } bg-white shadow-md rounded-lg p-6 w-[280px]`}
          >
            <img
              src={stat.icon}
              alt={stat.label}
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-3xl font-bold text-steelBlue">{stat.number}</p>
              <p className="text-charcoal text-sm mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section: Experience Text */}
      <div className="flex flex-col items-start text-left w-full lg:w-1/2">
        <h1 className="text-4xl font-bold text-steelBlue mb-4">
          15 Years Experience
        </h1>
        <p className="text-charcoal text-lg mb-6">
          Our company has been the leading provider of construction services to
          clients throughout the Lebanon since 2015.
        </p>
        <button className="btn">Contact Us</button>
      </div>
    </div>
  );
};

export default Company;
