import React, { useEffect, useState } from "react";
import Cards from "../../components/home/Cards";
import { LuSettings2 } from "react-icons/lu";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // loading data
  useEffect(() => {
    // fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        setProduct(data);
        setFilteredItems(data); // Fix: Changed setFilteredItem to setFilteredItems
      } catch (error) {
        console.log("Error fetching the products", error);
      }
    };

    // call the function
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
  };

  // show all data function
  const showAll = () => {
    setFilteredItems(product);
    setSelectedCategory("all");
  };

  // sorting based on A-Z, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
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
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
  };

  return (
    <div>
      {/* Product shop section */}
      <div className="section-container">
        {/* filtering and sorting */}
        <div className="mt-24 flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* All Category btns */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex=wrap">
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

          {/* sorting base Filtering */}
          <div className="flex justify-end items-center mb-2 rounded-sm">
            {/* Sorting Dropdown with Icon */}
            <div className="relative">
              <LuSettings2 className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
              <select
                name="sort"
                id="sort"
                onClick={(e) => handleSortChange(e.target.value)}
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

        {/* Product card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
