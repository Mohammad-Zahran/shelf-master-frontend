import React, { useEffect, useState } from "react";
import Cards from "../../components/home/Cards";

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
        <div>filtering and sorting</div>

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
