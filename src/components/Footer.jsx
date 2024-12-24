import React from "react";

const Footer = () => {
  return (
    <footer>
      <div>
        {/* Column 1: Product Section */}
        <div>
          <h3>Product</h3>
          <ul>
            <li>Employee database</li>
            <li>Payroll</li>
            <li>Absences</li>
            <li>Time tracking</li>
            <li>Shift planner</li>
            <li>Recruiting</li>
          </ul>
        </div>

        {/* Column 2: Information Section */}
        <div>
          <h3>Information</h3>
          <ul>
            <li>FAQ</li>
            <li>Blog</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Column 3: Company Section */}
        <div>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Lift Media</li>
          </ul>
        </div>

        {/* Column 4: Subscribe Section */}
        <div>
          <h3>Subscribe</h3>
          <p>
            Hello, we are Shelf Master. Our goal is to make a positive effects
            from revolutionizing how companies engage with our shelfs for all
            the companies.
          </p>
          <form>
            <div>
              <input
                type="text"
                placeholder="Email address"
                className="px-4 py-2 rounded-l-md border-none w-full"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-r-md text-white"
              >
                →
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
