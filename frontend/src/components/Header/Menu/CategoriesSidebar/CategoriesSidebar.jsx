import MobileCategoriesList from "./CategoriesList";

export default function CategoriesSidebar({ categories, categorySidebar }) {
  return (
    <div
      className={`category_sidebar ${categorySidebar && "category_sidebar_show"}`}
    >
      <ul className="mobile_categories text-neutral">
        {categories?.map((category) => (
          <MobileCategoriesList key={category?._id} category={category} />
        ))}
      </ul>
    </div>
  );
}
