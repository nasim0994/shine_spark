import "@/assets/css/shop.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import ProductCard from "@/components/shared/main/ProductCard";
import ShopCategories from "@/components/shared/main/ShopCategories/ShopCategories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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

export default function Shop() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <section className="py-2">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-2 flex items-start gap-4 md:mt-4">
          <>
            <div className={`shop_sidebar ${sidebar && "shop_sidebar_show"}`}>
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
                <p>Ready to Ship Men&apos;s Wear</p>
                <p className="text-sm text-neutral-content opacity-60">
                  1461 items
                </p>
              </div>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
