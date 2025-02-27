import "@/assets/css/shop.css";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import ProductCard from "@/components/shared/main/ProductCard";
import ShopCategories from "@/components/shared/main/ShopCategories/ShopCategories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "@/Redux/product/productApi";
import ProductCards from "@/components/shared/Skeleton/ProductCards/ProductCards";

export default function Shop() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const subCategory = queryParams.get("subCategory");
  const subSubCategory = queryParams.get("subSubCategory");
  const brand = queryParams.get("brand");
  const search = queryParams.get("search");
  const sort = queryParams.get("sort");

  let query = {};
  if (category) query.category = category;
  if (subCategory) query.subCategory = subCategory;
  if (subSubCategory) query.subSubCategory = subSubCategory;
  if (brand) query.brand = brand;
  if (search) query.search = search;
  if (sort) query.sort = sort;

  const { data, isLoading } = useGetAllProductsQuery(query);
  const products = data?.data;
  const meta = data?.meta;

  return (
    <section className="py-2">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-2 flex items-start gap-4 md:mt-4">
          <>
            <div
              className={`shop_sidebar ${sidebar && "shop_sidebar_show"}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg uppercase">Filter</h2>
                <button className="md:hidden" onClick={() => setSidebar(false)}>
                  <AiOutlineClose className="opacity-60" />
                </button>
              </div>

              <div className="mt-3">
                <p>Price</p>
                <div className="mt-2 flex items-center gap-2">
                  $
                  <input type="text" className="w-20 py-1" placeholder="From" />
                  -
                  <input type="text" className="w-20 py-1" placeholder="To" />
                </div>
              </div>

              <div className="mt-4">
                <p>Category</p>

                <ShopCategories />
              </div>
            </div>

            <button
              onClick={() => setSidebar(!sidebar)}
              className="fixed bottom-1 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-6 py-2 text-base-100 md:hidden"
            >
              <BiFilterAlt /> Filter
            </button>
          </>

          <div className="shop_content">
            <div className="flex items-center justify-between">
              <div className="items-end gap-2 sm:flex">
                <p>Ready to Ship</p>
                <p className="text-sm text-neutral-content opacity-60">
                  {meta?.total} items
                </p>
              </div>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={1}>Price Low to High</SelectItem>
                  <SelectItem value={-1}>Price High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
              {isLoading && <ProductCards />}
              {!isLoading &&
                products?.length > 0 &&
                products?.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
