import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "@/Redux/category/categoryApi";
import { useGetSubCategoryQuery } from "@/Redux/subCategory/subCategoryApi";
import { useAllBrandsQuery } from "@/Redux/brand/brandApi";
import { useAddProductMutation } from "@/Redux/product/productApi";
import VariantCom from "@/components/AdminComponents/Product/AddProduct/VariantCom";

export default function AddProduct() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const { data: brands } = useAllBrandsQuery();

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [sizeChart, setSizeChart] = useState(null);
  const [code, setCode] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files[0].size > 1024 * 1024) {
      return toast.warning("File size is too large. Max 1mb is allowed");
    }
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      file: file,
    }));

    setGalleries((prevGalleries) => [...prevGalleries, ...newImages]);
  };

  // Remove image from the gallery
  const removeImage = (index) => {
    const updatedGallery = galleries.filter((_, i) => i !== index);
    setGalleries(updatedGallery);
  };

  const [title, setTitle] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);

  const [featured, setFeatured] = useState(false);
  const [details, setDetails] = useState("");

  const [sellingPrice, setSellingPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [stock, setStock] = useState(0);

  // Variant
  const [isVariant, setIsVariant] = useState(false);
  const [isColor, setIsColor] = useState(false);
  const [isSize, setIsSize] = useState(false);

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([
    {
      color: "",
      imageFile: "",
      imageShow: "",
    },
  ]);
  const [sizes, setSizes] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!thumbnail) return toast.warning("Thumbnail is required");

    if (!title) return toast.warning("Title is required");
    if (!categoryId) return toast.warning("Category is required");

    if (!sellingPrice) return toast.warning("Selling Price is required");
    if (!purchasePrice) return toast.warning("Purchase Price is required");
    if (!isVariant && !stock) return toast.warning("Stock is required");

    if (!details) return toast.warning("Description is required");
    if (isVariant && variants?.length <= 0) {
      return toast.warning("Variant is required");
    }

    if (galleries?.length > 10)
      return toast.warning("Maximum 10 images are allowed in gallery");

    const totalStock =
      isVariant && variants?.length > 0
        ? variants?.reduce((acc, curr) => acc + parseInt(curr?.stock), 0)
        : stock;

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    if (galleries?.length > 0)
      galleries.forEach((gallery) => formData.append("gallery", gallery.file));

    formData.append("title", title);
    formData.append("category", categoryId);
    if (subCategoryId) formData.append("subCategory", subCategoryId);
    if (subSubCategoryId) formData.append("subSubCategory", subSubCategoryId);
    if (brand) formData.append("brand", brand);

    formData.append("sellingPrice", sellingPrice);
    formData.append("purchasePrice", purchasePrice);
    formData.append("totalStock", totalStock);
    formData.append("discount", discount);
    formData.append("code", code);

    formData.append("featured", featured);
    formData.append("description", details);

    formData.append("isVariant", isVariant);

    if (isVariant && variants?.length > 0) {
      formData.append("variants", JSON.stringify(variants));
    }

    if (isSize && sizes?.length > 0) {
      formData.append("sizes", JSON.stringify(sizes));
    }
    if (isColor && colors?.length > 0) {
      formData.append(
        "colors",
        JSON.stringify(colors?.map((color) => color.color)),
      );

      colors?.map((color) => {
        formData.append("colorImages", color?.imageFile);
      });
    }
    if (sizeChart) formData.append("sizeChart", sizeChart);

    const res = await addProduct(formData);

    if (res?.data?.success) {
      toast.success("Product added successfully");
      setThumbnail([]);
      setTitle("");
      setCategoryId("");
      setSubCategoryId("");
      setSubSubCategoryId("");
      setBrand("");
      setDiscount("");
      setSellingPrice("");
      setPurchasePrice("");
      setStock("");
      setFeatured(false);
      setVariants("");
      setDetails("");
      navigate("/admin/product/all");
    } else {
      toast.error(res?.data?.message || "Failed to add product");
      console.log(res);
    }
  };

  return (
    <div className="add_product rounded bg-base-100 shadow">
      <h3 className="border-b p-4 text-lg font-medium text-neutral">
        Add Product
      </h3>

      <div className="p-2 text-neutral-content">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Thumbnail */}
          <div className="rounded border p-4">
            <p className="mb-2 text-sm">Add Thumbnail </p>

            <button className="relative h-20 w-full rounded border border-dashed bg-base-100">
              <input
                type="file"
                className="absolute -top-1 left-0 h-full w-full opacity-0"
                onChange={(e) => {
                  if (e.target.files[0].size > 1024 * 1024) {
                    return toast.warning(
                      "File size is too large. Max 1mb is allowed",
                    );
                  }
                  setThumbnail(e.target.files[0]);
                  setThumbnailUrl(URL.createObjectURL(e.target.files[0]));
                }}
              />
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="thumbnail Preview"
                  className="mx-auto h-[90%] w-20 rounded"
                />
              ) : (
                <small>
                  upload image <br /> (max size 1mb)
                </small>
              )}
            </button>
          </div>

          {/* Gallery */}
          <div className="rounded border p-4">
            <p className="mb-2 text-sm">
              Add Gallery <small>(optional - max 10 images)</small>
            </p>

            <div className="mt-2 text-sm">
              <div className="flex flex-wrap space-x-2">
                {galleries?.map((img, index) => (
                  <div
                    key={index}
                    className="relative mb-2 h-14 w-20 overflow-hidden rounded object-cover"
                  >
                    <img
                      src={URL.createObjectURL(img?.file)}
                      alt={img?.name}
                      className="h-full w-full rounded border object-cover"
                    />

                    <button
                      onClick={() => removeImage(index)}
                      className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 text-base-100 opacity-0 duration-300 hover:text-red-500 hover:opacity-100"
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </div>
                ))}

                <div className="relative flex h-14 w-32 cursor-pointer items-center justify-center rounded border-2 border-dashed border-primary/50 bg-primary/5">
                  <input
                    type="file"
                    multiple
                    className="gallery_input absolute z-50 h-full w-full cursor-pointer"
                    style={{ opacity: 0, top: 0, left: 0, cursor: "pointer" }}
                    onChange={handleFileChange}
                  />

                  <span className="text-primary">+ Add image</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="mb-5 flex flex-col gap-3 rounded border p-4">
            <div>
              <p className="text-sm">Product Title</p>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Category *</p>
                <select
                  name="category"
                  required
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.data?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Sub Category</p>
                <select
                  name="sub_category"
                  onChange={(e) => setSubCategoryId(e.target.value)}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories?.length > 0 &&
                    subCategories?.map((subCategory) => (
                      <option key={subCategory?._id} value={subCategory?._id}>
                        {subCategory?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Sub SubCategory</p>
                <select
                  name="sub_subCategory"
                  onChange={(e) => setSubSubCategoryId(e.target.value)}
                >
                  <option value="">Select Sub SubCategory</option>
                  {subSubCategories?.length > 0 &&
                    subSubCategories?.map((subSubCategory) => (
                      <option
                        key={subSubCategory?._id}
                        value={subSubCategory?._id}
                      >
                        {subSubCategory?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Brand</p>
                <select name="brand" onChange={(e) => setBrand(e.target.value)}>
                  <option value="">Select Brand</option>
                  <option value="No Brand">No Brand</option>
                  {brands?.data?.length > 0 &&
                    brands?.data?.map((brand) => (
                      <option key={brand?._id} value={brand?.slug}>
                        {brand?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Code No</p>
                <input
                  type="text"
                  name="code"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Price & Discount & stock  */}
          <div className="mt-4 rounded border p-4">
            <p>Price & Discount </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm">Base Selling Price *</p>
                <input
                  type="number"
                  name="sellingPrice"
                  onChange={(e) => setSellingPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="text-sm">Base Purchase Price *</p>
                <input
                  type="number"
                  name="purchasePrice"
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="text-sm">Discount %</p>
                <input
                  type="number"
                  name="discount"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>

              <div>
                <p className="text-sm">Stock *</p>
                <input
                  type="number"
                  name="stock"
                  onChange={(e) => setStock(e.target.value)}
                  required
                  defaultValue={stock}
                  disabled={isVariant}
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <VariantCom
            isVariant={isVariant}
            setIsVariant={setIsVariant}
            isColor={isColor}
            setIsColor={setIsColor}
            isSize={isSize}
            setIsSize={setIsSize}
            colors={colors}
            setColors={setColors}
            sizes={sizes}
            setSizes={setSizes}
            variants={variants}
            setVariants={setVariants}
            setSizeChart={setSizeChart}
          />

          {/*  Featured */}
          <div className="mt-6 rounded border p-4">
            <p className="text-sm">Featured Product</p>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <p>Status:</p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    onChange={() => setFeatured(!featured)}
                    type="checkbox"
                    value={featured}
                    className="peer sr-only"
                  />
                  <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="add_product_details mt-6 rounded border p-4">
            <p className="text-sm">Description</p>

            <div className="mt-2">
              <JoditEditor
                ref={editor}
                value={details}
                onBlur={(text) => setDetails(text)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <button
              onClick={handleAddProduct}
              type="submit"
              disabled={isLoading}
              className="rounded bg-primary px-10 py-2 text-base-100"
            >
              {isLoading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
