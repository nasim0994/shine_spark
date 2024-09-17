import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function SearchBox() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/product/all-products`)
      .then((res) => res.json())
      .then((data) => {
        const product = data?.data?.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts(product);
      });
  }, [searchText]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".searchInput") &&
        !e.target.closest(".searchIcon")
      ) {
        setSearchDropdown(false);
        setSearchText("");
      }
    });
  }, []);

  return (
    <div className="relative flex">
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        onClick={() => setSearchDropdown(true)}
        placeholder="search Product..."
        className="searchInput border w-full px-3 py-1.5 outline-none"
      />
      <div className="searchIcon px-3 md:text-lg text-base-100 bg-primary flex justify-center items-center rounded-r">
        <BsSearch />
      </div>

      {searchDropdown && (
        <div className="searchDropdown absolute w-full bg-base-100 p-4 shadow-lg max-h-96 overflow-y-auto top-full">
          <ul>
            {products?.map((product) => (
              <li
                onClick={() => {
                  setSearchDropdown(false);
                  setSearchText("");
                }}
                className="hover:bg-gray-100 p-1"
              >
                <Link
                  to={`/product/${product?.slug}`}
                  className="flex gap-2 items-center"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                      product?.images[0]
                    }`}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                  <h6 className="text-sm sm:text-base">{product?.title}</h6>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
