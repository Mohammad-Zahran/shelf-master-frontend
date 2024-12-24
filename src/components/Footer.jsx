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
      </div>
    </footer>
  );
};

export default Footer;
