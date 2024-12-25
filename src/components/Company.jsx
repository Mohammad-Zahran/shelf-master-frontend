import React from "react";

const Company = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white py-16 px-8 gap-16">
      {/* Left Section: Stats */}
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        {/* Stat 1 */}
        <div className="flex items-center ml-auto bg-white shadow-md rounded-lg p-6 w-[300px] h-[140px]">
          <img
            src="/assets/images/exp1.svg"
            alt="Shelves Inserted"
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-3xl font-bold text-steelBlue">123</p>
            <p className="text-charcoal text-sm mt-1">Shelves Inserted</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center ml-52 bg-white shadow-md rounded-lg p-6 w-[300px] h-[140px]">
          <img
            src="/assets/images/exp2.svg"
            alt="Happy Clients"
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-3xl font-bold text-steelBlue">84</p>
            <p className="text-charcoal text-sm mt-1">Happy Clients</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center ml-auto bg-white shadow-md rounded-lg p-6 w-[300px] h-[140px]">
          <img
            src="/assets/images/exp3.svg"
            alt="Awards Win"
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-3xl font-bold text-steelBlue">37</p>
            <p className="text-charcoal text-sm mt-1">Awards Win</p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center ml-52 bg-white shadow-md rounded-lg p-6 w-[300px] h-[140px]">
          <img
            src="/assets/images/exp4.svg"
            alt="Years in Business"
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-3xl font-bold text-steelBlue">15</p>
            <p className="text-charcoal text-sm mt-1">Years in Business</p>
          </div>
        </div>
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
