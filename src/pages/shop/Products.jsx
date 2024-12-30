import React, { useState } from 'react'

const Products = () => {
    const [product, setProduct] = useState([]);
    const[filteredItem, setFilteredItem] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");

    // loading data
    

  return (
    <div>
        {/* Product shop section */}
        <div className='section-container'>

        </div>
    </div>
  )
}

export default Products