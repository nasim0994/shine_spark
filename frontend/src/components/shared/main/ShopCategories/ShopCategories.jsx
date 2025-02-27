import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import ShopCategoriesList from "./ShopCategoriesList";

export default function ShopCategories() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  return (
    <ul className="mobile_categories mt-2 w-full overflow-y-auto text-neutral">
      {categories?.map((category) => (
        <ShopCategoriesList key={category?._id} category={category} />
      ))}
    </ul>
  );
}
