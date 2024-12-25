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
    <div className="flex flex-col items-center bg-white py-16 px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-steelBlue">
          15 Years Experience
        </h1>
        <p className="text-charcoal mt-4 max-w-md">
          Our company has been the leading provider of construction services to
          clients throughout the Lebanon since 2015.
        </p>
        <button className="btn mt-6">Contact Us</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center text-center shadow-md rounded-lg p-6 bg-white border border-gray-200"
          >
            <img src={stat.icon} alt={stat.label} className="w-20 h-20 mb-4" />
            <p className="text-3xl font-bold text-steelBlue">{stat.number}</p>
            <p className="text-charcoal mt-2 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Company;
