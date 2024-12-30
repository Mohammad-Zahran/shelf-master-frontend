import React, { useEffect, useState } from "react";

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
        // console.log(data);
        setProduct(data);
        setFilteredItem(data);
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

  return (
    <div>
      {/* Product shop section */}
      <div className="section-container"></div>
    </div>
  );
};

export default Products;
