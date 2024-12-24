import React from "react";

const Footer = () => {
  return (
    <footer className="bg-steelBlue text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Product Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Product</h3>
          <ul className="space-y-2">
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
          <h3 className="font-bold text-lg mb-4">Information</h3>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Blog</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Column 3: Company Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Lift Media</li>
          </ul>
        </div>

        {/* Column 4: Subscribe Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe</h3>
          <p className="mb-4">
            Hello, we are Lift Media. Our goal is to translate the positive
            effects from revolutionizing how companies engage with their clients
            & their team.
          </p>
          <form>
            <div className="flex items-center">
              <input
                type="email"
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

      {/* Footer Bottom Section */}
      <div>
        <div>
          <p>&copy; 2024 Shelf Master. All Rights Reserved.</p>
          <div>
            <a href="">Terms</a>
            <a href="">Privacy</a>
            <a href="">Cookies</a>
          </div>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
