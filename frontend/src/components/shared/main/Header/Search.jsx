import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    if (search) {
      navigate(`/shops?search=${search}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowSearch(true)}
        className="hidden overflow-hidden rounded-lg md:flex"
      >
        <div className="bg-gray-200 px-8 py-2">
          <p className="text-xs text-neutral-content opacity-50">
            search product...
          </p>
        </div>
        <div className="flex w-8 items-center justify-center bg-primary px-3 text-base-100">
          <p>
            <BiSearch />
          </p>
        </div>
      </button>

      {showSearch && (
        <div className="absolute left-0 top-0 z-50 h-full w-full bg-base-100 p-10">
          <form onSubmit={handleSearch} className="relative xl:mx-48">
            <input
              type="text"
              name="search"
              className="w-full py-3"
              placeholder="Search for Styles, Collection & more..."
            />

            <button className="absolute right-3 top-5">
              <BiSearch className="text-xl" />
            </button>
          </form>

          <button
            onClick={() => setShowSearch(false)}
            className="absolute right-5 top-3"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>
      )}
    </>
  );
}
