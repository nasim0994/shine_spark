import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  return (
    <div className="relative flex">
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search Product..."
        className="searchInput border w-full px-3 py-1.5 outline-none placeholder:text-sm rounded-l bg-primary/5 text-[15px]"
      />
      <div className="searchIcon px-3 md:text-lg text-base-100 bg-primary flex justify-center items-center rounded-r">
        <BsSearch />
      </div>
    </div>
  );
}
