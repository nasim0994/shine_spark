import ShopCategoriesList from "./ShopCategoriesList";

const categories = [
  {
    _id: "1",
    name: "Electronics",
    slug: "electronics",
    subCategories: [
      {
        _id: "2",
        name: "Mobiles",
        slug: "mobiles",
        subSubCategories: [
          {
            _id: "3",
            name: "Samsung",
            slug: "samsung",
          },
          {
            _id: "4",
            name: "Apple",
            slug: "apple",
          },
        ],
      },
    ],
  },
  {
    _id: "2",
    name: "Clothing",
    slug: "clothing",
    subCategories: [
      {
        _id: "2",
        name: "Saree",
        slug: "saree",
        subSubCategories: [
          {
            _id: "3",
            name: "Samsung",
            slug: "samsung",
          },
          {
            _id: "4",
            name: "Apple",
            slug: "apple",
          },
        ],
      },
    ],
  },
];

export default function ShopCategories() {
  return (
    <ul className="mobile_categories mt-2 w-full overflow-y-auto text-neutral">
      {categories?.map((category) => (
        <ShopCategoriesList key={category?._id} category={category} />
      ))}
    </ul>
  );
}
