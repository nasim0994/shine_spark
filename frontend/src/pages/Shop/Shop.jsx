import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";

import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/product/productApi";

import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCards from "../../components/Skeleton/ProductCards/ProductCards";
import Pagination from "../../components/Pagination/Pagination";
import PriceRangeSlider from "../../components/PriceRange/PriceRange";
import MobileCategoriesSidebar from "../../components/MobileCategoriesSidebar/MobileCategoriesSidebar";
import usePageView from "../../hooks/usePageView";

export default function Shop() {
  usePageView("Shop");
  window.scrollTo(0, 0);

  const queryParams = new URLSearchParams(location.search);
  let search = queryParams.get("search");

  const params = useParams();
  let category = params?.category ? params?.category : "";
  let subCategory = params?.subCategory ? params?.subCategory : "";
  let subSubCategory = params?.subSubCategory ? params?.subSubCategory : "";
  let brand = params?.brand ? params?.brand : "";

  const [sort, setSort] = useState(0);
  const STEP = 100;
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([MIN, MAX]);

  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 8;
  query["category"] = category;
  query["subCategory"] = subCategory;
  query["subSubCategory"] = subSubCategory;
  query["brand"] = brand;
  query["range"] = JSON.stringify(values);
  query["sort"] = sort;
  if (search) query["search"] = search;
  const { data, isLoading, isFetching, isError, error } =
    useGetAllProductsQuery({
      ...query,
    });

  let content = null;

  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  }

  if (!isLoading && !isError && data?.data?.length == 0) {
    content = (
      <div className="col-span-4 flex h-[70vh] w-full flex-col items-center justify-center gap-2 p-4 text-red-500">
        <CiNoWaitingSign className="text-xl" />
        No Product available
      </div>
    );
  }

  return (
    <section className="min-h-[70vh] bg-gray-50 py-5">
      <div className="container">
        <ul className="flex items-center gap-2 text-sm text-neutral-content">
          <li>
            <Link to="/" className="text-primary">
              Home
            </Link>
          </li>
          <li>
            <MdKeyboardArrowRight />
          </li>
          {category ? (
            <>
              <li>
                <Link to="/shops" className="text-primary">
                  Shops
                </Link>
              </li>
            </>
          ) : (
            <li>Shops</li>
          )}

          {subCategory ? (
            <>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>
                <Link to={`/shops/${category?.slug}`} className="text-primary">
                  {category.split("_")[0]}
                </Link>
              </li>
            </>
          ) : (
            category && (
              <>
                <li>
                  <MdKeyboardArrowRight />
                </li>
                <li>{category.split("_")[0]}</li>
              </>
            )
          )}

          {subSubCategory ? (
            <>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>
                <Link
                  to={`/shops/${category}/${subCategory}`}
                  className="text-primary"
                >
                  {subCategory.split("_")[0]}
                </Link>
              </li>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>{subSubCategory.split("_")[0]}</li>
            </>
          ) : (
            subCategory && (
              <>
                <li>
                  <MdKeyboardArrowRight />
                </li>
                <li>{subCategory.split("_")[0]}</li>
              </>
            )
          )}
        </ul>

        <div className="mt-4 gap-4 md:flex">
          <div className="shop_categories hidden h-full md:block">
            <h3 className="border-b pb-1 font-medium text-neutral">
              Categories
            </h3>
            <div className="mt-2 text-[15px]">
              <MobileCategoriesSidebar />
            </div>

            <br />

            <PriceRangeSlider
              values={values}
              setValues={setValues}
              MIN={MIN}
              MAX={MAX}
              STEP={STEP}
            />
          </div>

          <div className="shop_products min-h-[70vh]">
            <div className="my-2 flex justify-between">
              <div>
                {category && (
                  <>
                    <p className="font-semibold">
                      {category.charAt(0).toUpperCase() +
                        category.slice(1).toLowerCase()}
                    </p>
                  </>
                )}
                <p className="text-sm font-normal text-neutral">
                  {isFetching
                    ? "Loading..."
                    : `${data?.meta?.total} items found in ${
                        category.charAt(0).toUpperCase() +
                        category.slice(1).toLowerCase()
                      }`}
                </p>
              </div>
              <div className="w-48 text-neutral/50">
                <select
                  id="sort-by"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white p-1 focus:border-blue-500 focus:outline-none"
                >
                  <option value={0}>Sort by</option>
                  <option className="text-black" value={1}>
                    Price Low to High
                  </option>
                  <option className="text-black" value={-1}>
                    Price High to Low
                  </option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading || isFetching ? <ProductCards /> : content}
            </div>

            {data?.meta?.pages > 1 && (
              <Pagination
                pages={data?.meta?.pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
