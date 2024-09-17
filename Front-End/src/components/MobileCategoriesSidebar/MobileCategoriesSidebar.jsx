import React from "react";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import MobileCategoriesList from "./MobileCategoriesList";
import SideCategory from "../Skeleton/SideCategory/SideCategory";

export default function MobileCategoriesSidebar() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const categories = data?.data;

  let content = null;
  if (isLoading) {
    content = <SideCategory />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    content = categories?.map((category) => (
      <MobileCategoriesList key={category?._id} category={category} />
    ));
  }
  return (
    <ul className="w-full overflow-y-auto h-[83vh] mobile_categories">
      {content}
    </ul>
  );
}
