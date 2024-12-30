import React, { useEffect, useState } from "react";
import Cards from "../../components/home/Cards";
import { LuSettings2 } from "react-icons/lu";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // loading data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProduct(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching the products", error);
      }
    };
    fetchData();
  }, []);

  // filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? product
        : product.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data function
  const showAll = () => {
    setFilteredItems(product);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting based on A-Z, Low-High pricing
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

  // Pagination logic:
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      {/* Product shop section */}
      <div className="section-container">
        {/* Filtering and sorting */}
        <div className="mt-24 flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
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

          {/* Sorting */}
          <div className="flex justify-end items-center mb-2 rounded-sm">
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
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
