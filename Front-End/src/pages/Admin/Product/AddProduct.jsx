import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Select from "react-select";
import { AiFillDelete } from "react-icons/ai";
import JoditEditor from "jodit-react";
import ImageUploading from "react-images-uploading";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Swal from "sweetalert2";

import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../Redux/category/categoryApi";
import { useAddProductMutation } from "../../../Redux/product/productApi";

import { useGetSubCategoryQuery } from "../../../Redux/subCategory/subCategoryApi";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";
import { useAllColorsQuery } from "../../../Redux/color/colorApi";

export default function AddProduct() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const { data: brands } = useAllBrandsQuery();
  const { data: color } = useAllColorsQuery();
  const colorOptions = color?.data?.map((item) => ({
    label: item?.name,
    value: item?.code,
  }));

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [featured, setFeatured] = useState(false);
  const [details, setDetails] = useState("");

  const [variant, setVariant] = useState("no");
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  // Function to handle changes in input fields
  const handleInputChange = (colorIndex, sizeIndex, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];

      if (!updatedVariants[colorIndex]) {
        updatedVariants[colorIndex] = [];
      }

      // if (!updatedVariants[colorIndex][sizeIndex]) {
      //   updatedVariants[colorIndex][sizeIndex] = {};
      // }

      // Store all information (color, size, quantity, price) in each entry
      updatedVariants[colorIndex][sizeIndex] = {
        ...updatedVariants[colorIndex][sizeIndex],
        colorName: colors[colorIndex].label,
        colorCode: colors[colorIndex].value,
        size: sizes[sizeIndex],
        [field]: value,
      };

      return updatedVariants;
    });
  };

  // arranged right array
  const variantsArray = () => {
    const result = [];

    variants.forEach((colorData, colorIndex) => {
      const color = colors[colorIndex].label;
      const colorCode = colors[colorIndex].value;

      // eslint-disable-next-line no-unused-vars
      colorData.forEach((sizeData, sizeIndex) => {
        const { size, quantity, sellingPrice, purchasePrice } = sizeData;
        result.push({
          color,
          colorCode,
          size,
          quantity,
          sellingPrice,
          purchasePrice,
        });
      });
    });

    return result;
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (images?.length <= 0)
      return Swal.fire("", "Image is required", "warning");
    if (!title) return Swal.fire("", "Title is required", "warning");
    if (!categoryId) return Swal.fire("", "Category is required", "warning");
    if (!brand) return Swal.fire("", "Brand is required", "warning");
    if (!details) return Swal.fire("", "Details is required", "warning");
    if (variant == "yes" && variants?.length <= 0) {
      return Swal.fire("", "Variants is required", "warning");
    }
    if (variant == "no" && !sellingPrice) {
      return Swal.fire("", "sellingPrice is required", "warning");
    }
    if (variant == "no" && !purchasePrice) {
      return Swal.fire("", "purchasePrice is required", "warning");
    }
    if (variant == "no" && !quantity) {
      return Swal.fire("", "quantity is required", "warning");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categoryId);
    if (subSubCategoryId) formData.append("subCategory", subSubCategoryId);
    if (subSubCategoryId) formData.append("subSubCategory", subSubCategoryId);
    formData.append("brand", brand);
    formData.append("discount", discount);
    formData.append("featured", featured);
    formData.append("description", details);
    formData.append("sellingPrice", sellingPrice);
    formData.append("purchasePrice", purchasePrice);
    formData.append("quantity", quantity);
    images?.map((image) => {
      formData.append("images", image?.file);
    });
    if (variants?.length > 0)
      formData.append("variants", JSON.stringify(variantsArray()));

    const res = await addProduct(formData);

    if (res?.error) {
      Swal.fire("", "Product add Fail, please try again", "error");
    }

    if (res?.data?.success) {
      Swal.fire("", "Product add success", "success");
      setImages([]);
      setTitle("");
      setCategoryId("");
      setSubCategoryId("");
      setSubSubCategoryId("");
      setBrand("");
      setDiscount("");
      setSellingPrice("");
      setPurchasePrice("");
      setQuantity("");
      setFeatured(false);
      setVariants("");
      setDetails("");
      navigate("/admin/product/all-products");
    } else {
      Swal.fire("", "Product add Fail, please try again", "error");
      console.log(res);
    }
  };

  return (
    <div className="add_product  bg-base-100 rounded shadow p-4">
      <h3 className="text-lg text-neutral font-medium mb-4">Add Product</h3>
      <div className="text-neutral-content">
        <div className="mb-5 border rounded p-4">
          <p className="text-sm mb-2">Add Images (max 5 images select)</p>
          <ImageUploading
            value={images}
            onChange={(img) => setImages(img)}
            dataURLKey="data_url"
            multiple={true}
            maxNumber={5}
          >
            {({ onImageUpload, onImageRemove, dragProps }) => (
              <div className="grid sm:grid-cols-2 gap-4" {...dragProps}>
                <div className="flex flex-col items-center justify-center gap-2 border rounded border-dashed p-3">
                  <span
                    onClick={onImageUpload}
                    className="px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                  >
                    Choose Image
                  </span>

                  <p className="text-neutral-content">or Drop here</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border rounded border-dashed p-3">
                  {images?.map((img, index) => (
                    <div key={index} className="image-item relative">
                      <img
                        src={img["data_url"]}
                        alt=""
                        className="w-full h-20"
                      />
                      <div
                        onClick={() => onImageRemove(index)}
                        className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                      >
                        <AiFillDelete />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        <div className="form_group">
          <div className="border rounded p-4  flex flex-col gap-3 mb-5">
            <div>
              <p className="text-sm">Product Title</p>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                <p className="text-sm">Discount %</p>
                <input
                  type="number"
                  name="discount"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="mt-4 border rounded p-4">
            <div className="flex items-center gap-3">
              <p>Variant: </p>

              <div className="flex items-center">
                <input
                  defaultChecked={variant == "no" && true}
                  id="variant-1"
                  type="radio"
                  value="no"
                  name="variant"
                  className="cursor-pointer"
                  onClick={(e) => setVariant(e.target.value)}
                />
                <label
                  htmlFor="variant-1"
                  className="pl-1 text-sm font-medium mt-[3px] cursor-pointer"
                >
                  No
                </label>
              </div>

              <div className="flex items-center">
                <input
                  defaultChecked={variant == "yes" && true}
                  id="variant-2"
                  type="radio"
                  value="yes"
                  name="variant"
                  onClick={(e) => setVariant(e.target.value)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="variant-2"
                  className="pl-1 text-sm font-medium mt-[3px] cursor-pointer"
                >
                  Yes
                </label>
              </div>
            </div>

            <div className="mt-2 border rounded p-3">
              {variant === "no" && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm">Selling Price</p>
                    <input
                      type="number"
                      name="selling_price"
                      required
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-sm">Purchase Price</p>
                    <input
                      type="number"
                      name="purchase_price"
                      required
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-sm">Quantity</p>
                    <input
                      type="number"
                      name="quantity"
                      required
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {variant === "yes" && (
                <div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">Colors</p>
                      <Select
                        options={colorOptions}
                        onChange={(color) => setColors(color)}
                        values={colorOptions}
                        isMulti
                      />
                    </div>

                    <div>
                      <p className="text-sm">Sizes</p>
                      <TagsInput
                        value={sizes}
                        onChange={(tags) => setSizes(tags)}
                        onlyUnique
                      />
                    </div>
                  </div>

                  <div className="border rounded p-4 mt-5">
                    <p className="mb-2 text-neutral-content text-sm">
                      Variants
                    </p>
                    <div className="relative overflow-x-auto">
                      <table className="border_table">
                        <thead>
                          <tr>
                            <th className="w-1/5">Color</th>
                            <th className="w-1/5">Size</th>
                            <th className="w-1/5">Quantity</th>
                            <th className="w-1/5">Selling Price</th>
                            <th className="w-1/5">Purchase Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {colors?.length > 0 &&
                            colors?.map((color, colorIndex) => (
                              <tr key={colorIndex}>
                                <td>{color?.label}</td>
                                <td>
                                  {sizes?.map((size, sizeIndex) => (
                                    <input
                                      key={sizeIndex}
                                      type="text"
                                      disabled
                                      defaultValue={size}
                                    />
                                  ))}
                                </td>
                                <td>
                                  {sizes?.length > 0 ? (
                                    sizes?.map((size, sizeIndex) => (
                                      <input
                                        key={sizeIndex}
                                        type="number"
                                        required
                                        onChange={(e) =>
                                          handleInputChange(
                                            colorIndex,
                                            sizeIndex,
                                            "quantity",
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))
                                  ) : (
                                    <input
                                      type="number"
                                      required
                                      onChange={(e) =>
                                        handleInputChange(
                                          colorIndex,
                                          0,
                                          "quantity",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  {sizes?.length > 0 ? (
                                    sizes?.map((size, sizeIndex) => (
                                      <input
                                        key={sizeIndex}
                                        type="number"
                                        required
                                        onChange={(e) =>
                                          handleInputChange(
                                            colorIndex,
                                            sizeIndex,
                                            "sellingPrice",
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))
                                  ) : (
                                    <input
                                      type="number"
                                      required
                                      onChange={(e) =>
                                        handleInputChange(
                                          colorIndex,
                                          0,
                                          "sellingPrice",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  {sizes?.length > 0 ? (
                                    sizes?.map((size, sizeIndex) => (
                                      <input
                                        key={sizeIndex}
                                        type="number"
                                        required
                                        onChange={(e) =>
                                          handleInputChange(
                                            colorIndex,
                                            sizeIndex,
                                            "purchasePrice",
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))
                                  ) : (
                                    <input
                                      type="number"
                                      required
                                      onChange={(e) =>
                                        handleInputChange(
                                          colorIndex,
                                          0,
                                          "purchasePrice",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/*  Featured */}
          <div className="mt-6 border rounded p-4">
            <p className="text-sm">Featured Product</p>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <p>Status:</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    onChange={() => setFeatured(!featured)}
                    type="checkbox"
                    value={featured}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-[23px] bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 add_product_details border rounded p-4">
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
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAddProduct}
              type="submit"
              disabled={isLoading && "disabled"}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              {isLoading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
