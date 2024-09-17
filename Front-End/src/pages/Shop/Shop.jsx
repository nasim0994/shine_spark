import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/product/productApi";
import MobileCategoriesSidebar from "../../components/MobileCategoriesSidebar/MobileCategoriesSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCards from "../../components/Skeleton/ProductCards/ProductCards";
import Pagination from "../../components/Pagination/Pagination";

export default function Shop() {
  window.scroll(0, 0);
  const params = useParams();
  let category = params?.category ? params?.category : "";
  let subCategory = params?.subCategory ? params?.subCategory : "";
  let subSubCategory = params?.subSubCategory ? params?.subSubCategory : "";
  let brand = params?.brand ? params?.brand : "";

  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 8;
  query["category"] = category;
  query["subCategory"] = subCategory;
  query["subSubCategory"] = subSubCategory;
  query["brand"] = brand;
  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    ...query,
  });

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  }
  if (!isLoading && !isError && data?.data?.length == 0) {
    content = <div className="text-red-500 p-4">No Product available</div>;
  }

  return (
    <section className="py-5 bg-gray-50 min-h-[70vh]">
      <div className="container">
        <ul className="flex gap-2 items-center text-neutral-content text-sm">
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

        <div className="md:flex gap-4 mt-4">
          <div className="hidden md:block shop_categories h-full">
            <h3 className="font-medium pb-1 border-b text-neutral">
              Categories
            </h3>
            <div className="mt-2 text-[15px]">
              <MobileCategoriesSidebar />
            </div>
          </div>

          <div className="shop_products min-h-[70vh]">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {content}
            </div>

            <Pagination
              pages={data?.meta?.pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
