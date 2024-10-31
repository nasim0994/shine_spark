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
          product.title.toLowerCase().includes(searchText.toLowerCase()),
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
        className="searchInput w-full border px-3 py-1.5 outline-none"
      />
      <div className="searchIcon flex items-center justify-center rounded-r bg-primary px-3 text-base-100 md:text-lg">
        <BsSearch />
      </div>

      {searchDropdown && (
        <div className="searchDropdown absolute top-full max-h-96 w-full overflow-y-auto bg-base-100 p-4 shadow-lg">
          <ul>
            {products?.map((product) => (
              <li
                key={product?._id}
                onClick={() => {
                  setSearchDropdown(false);
                  setSearchText("");
                }}
                className="p-1 hover:bg-gray-100"
              >
                <Link
                  to={`/product/${product?.slug}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                      product?.images[0]
                    }`}
                    alt=""
                    className="h-10 w-10 sm:h-12 sm:w-12"
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
