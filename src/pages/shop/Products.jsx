import React, { useEffect, useRef, useState } from "react";
import Cards from "../../components/home/Cards";
import { LuSettings2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import AIPopUp from "./../../components/chatbot/AIPopUp";
import popupSoundFile from "../../../public/assets/audios/popup.mp3"; // Import the popup sound file
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Import custom Axios hook

const Products = () => {
  const axiosPublic = useAxiosPublic(); // Use centralized Axios instance
  const [product, setProduct] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showPopupButton, setShowPopupButton] = useState(false);

  const popupSound = useRef(null); // Ref for the popup sound

  // Initialize the popup sound
  useEffect(() => {
    popupSound.current = new Audio(popupSoundFile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopupButton(true);

      // Play popup sound when the button spawns
      if (popupSound.current) {
        popupSound.current.play();
      }
    }, 10000); // Show button after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/products"); // Use Axios instance
        setProduct(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching the products", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? product
        : product.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(product);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = product.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="mb-12">
      <div className="section-container">
        <div className="mt-16 flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Category Buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("Heavy-Duty")}
              className={selectedCategory === "Heavy-Duty" ? "active" : ""}
            >
              Heavy-Duty
            </button>
            <button
              onClick={() => filterItems("Adjustable")}
              className={selectedCategory === "Adjustable" ? "active" : ""}
            >
              Adjustable
            </button>
            <button
              onClick={() => filterItems("Modern")}
              className={selectedCategory === "Modern" ? "active" : ""}
            >
              Modern
            </button>
            <button
              onClick={() => filterItems("Rustic")}
              className={selectedCategory === "Rustic" ? "active" : ""}
            >
              Rustic
            </button>
            <button
              onClick={() => filterItems("Industrial")}
              className={selectedCategory === "Industrial" ? "active" : ""}
            >
              Industrial
            </button>
            <button
              onClick={() => filterItems("Decorative")}
              className={selectedCategory === "Decorative" ? "active" : ""}
            >
              Decorative
            </button>
            <button
              onClick={() => filterItems("Kids")}
              className={selectedCategory === "Kids" ? "active" : ""}
            >
              Kids
            </button>
            <button
              onClick={() => filterItems("Luxury")}
              className={selectedCategory === "Luxury" ? "active" : ""}
            >
              Luxury
            </button>
          </div>

          {/* Sorting and Search */}
          <div className="flex justify-end items-center space-x-4">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8 pr-2 py-1 rounded-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <IoSearch className="absolute left-2 text-gray-500 h-4 w-4 pointer-events-none" />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
              <LuSettings2 className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
              <select
                name="sort"
                id="sort"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                className="pl-8 pr-2 py-1 rounded-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-steelBlue text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showPopupButton && <AIPopUp />}
    </div>
  );
};

export default Products;
