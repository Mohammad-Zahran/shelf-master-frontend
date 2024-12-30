import React, { useEffect, useState } from "react";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // loading data
  useEffect(() => {
    // fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/product.json");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Error fetching the products", error);
      }
    };
    // call the function
    fetchData();
  }, []);

  return (
    <div>
      {/* Product shop section */}
      <div className="section-container"></div>
    </div>
  );
};

export default Products;
