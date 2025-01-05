import { useState } from "react";

export const useFilter = (data, filterKey) => {
  const [filterValue, setFilterValue] = useState("");

  const filteredData = filterValue
    ? data.filter((item) => item[filterKey] === filterValue)
    : data;

  return { filterValue, setFilterValue, filteredData };
};
