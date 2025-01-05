import { useState } from "react";

export const useSearch = (data, searchKey) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item[searchKey].toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, filteredData };
};
