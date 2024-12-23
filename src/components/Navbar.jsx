import React from "react";
import { logoImg } from "../utils";

const Navbar = () => {
  return (
    <header>
      <nav>
        <img src={logoImg} alt="Logo" width={150} height={120} />

        <div>
          {["Heavy Duty", "Wooden Shelf", "Nice Shelf"].map((nav, i) => (
            <div key={nav}>{nav}</div>
          ))}
        </div>

        <div>
            <img src="" alt="" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
