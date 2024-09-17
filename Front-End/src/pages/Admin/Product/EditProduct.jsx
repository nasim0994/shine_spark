import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../Redux/category/categoryApi";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../Redux/product/productApi";
import { useGetSubCategoryQuery } from "../../../Redux/subCategory/subCategoryApi";
import Spinner from "../../../components/Spinner/Spinner";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";

export default function EditProduct() {
  const navigate = useNavigate();

  const editor = useRef(null);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(id);
  const product = data?.data;
  const isVariants = product?.variants?.length > 0;

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const { data: brands } = useAllBrandsQuery();

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [details, setDetails] = useState("");
  useEffect(() => {
    if (product?.featured) setFeatured(product?.featured);
  }, [product]);

  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setVariants(product?.variants);
    }
  }, [product]);

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  // Function to handle changes in input fields
  const handleInputChange = (colorIndex, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];

      if (!updatedVariants[colorIndex]) {
        updatedVariants[colorIndex] = [];
      }

      // Store all information (color, size, quantity, price) in each entry
      updatedVariants[colorIndex] = {
        ...updatedVariants[colorIndex],
        colorName: product?.variants[colorIndex].color,
        colorCode: product?.variants[colorIndex].colorCode,
        size: product?.variants[colorIndex].size,
        [field]: value,
      };

      return updatedVariants;
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const subCategory = form.sub_category.value;
    const subSubCategory = form.sub_subCategory.value;
    const brand = form.brand.value;
    const discount = form.discount.value;
    const sellingPrice = form.selling_price ? form.selling_price.value : "";
    const purchasePrice = form.purchase_price ? form.purchase_price.value : "";
    const quantity = form.quantity ? form.quantity.value : "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (subCategory) formData.append("subCategory", subCategory);
    if (subSubCategory) formData.append("subSubCategory", subSubCategory);
    formData.append("brand", brand);
    formData.append("discount", discount);
    formData.append("featured", featured);
    formData.append(
      "description",
      details.length > 0 ? details : product?.description
    );

    formData.append("sellingPrice", sellingPrice);
    formData.append("purchasePrice", purchasePrice);
    formData.append("quantity", quantity);

    if (images && images.length > 0) {
      images?.map((image) => {
        formData.append("images", image?.file);
      });
    }

    formData.append("variants", JSON.stringify(variants));

    const res = await updateProduct({ id, formData });
    // console.log(res);

    if (res?.error) {
      Swal.fire("", "Product update Fail, please try again", "error");
    }

    if (res?.data?.success) {
      Swal.fire("", "Product update success", "success");
      form.reset();
      navigate("/admin/product/all-products");
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <h3 className="text-lg text-neutral font-medium mb-4">Edit Product</h3>
        <form onSubmit={handleUpdateProduct} className="text-neutral-content">
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

                    {product?.images?.length &&
                      !images?.length &&
                      product?.images?.map((img) => (
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/products/${img}`}
                          alt=""
                          className="w-full h-20"
                        />
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
                  required
                  defaultValue={product?.title}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm">Category *</p>
                  <select
                    name="category"
                    required
                    onChange={(e) => setCategoryId(e.target.value)}
                    defaultValue={product?.category?._id}
                  >
                    <option value={product?.category?._id}>
                      {product?.category?.name}
                    </option>
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
                    defaultValue={product?.subCategory?._id}
                  >
                    <option value={product?.subCategory?._id}>
                      {product?.subCategory?.name}
                    </option>
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
                    defaultValue={product?.subSubCategory?._id}
                  >
                    <option value={product?.subSubCategory?._id}>
                      {product?.subSubCategory?.name}
                    </option>
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
                  <select name="brand" defaultValue={product?.brand}>
                    <option value="">Select Brand</option>
                    <option value="No Brand">No Brand</option>
                    {brands?.data?.length > 0 &&
                      brands?.data?.map((brand) => (
                        <option key={brand?._id} value={brand?.name}>
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
                    defaultValue={product?.discount}
                  />
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="mt-4 border rounded p-4">
              <div className="mt-2 border rounded p-3">
                {!isVariants && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm">Selling Price</p>
                      <input
                        type="number"
                        name="selling_price"
                        required
                        defaultValue={product?.sellingPrice}
                      />
                    </div>
                    <div>
                      <p className="text-sm">Purchase Price</p>
                      <input
                        type="number"
                        name="purchase_price"
                        required
                        defaultValue={product?.purchasePrice}
                      />
                    </div>
                    <div>
                      <p className="text-sm">Quantity</p>
                      <input
                        type="number"
                        name="quantity"
                        required
                        defaultValue={product?.quantity}
                      />
                    </div>
                  </div>
                )}

                {isVariants && (
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
                          {product?.variants &&
                            product?.variants?.map((variant, colorIndex) => (
                              <tr key={colorIndex}>
                                <td>{variant?.color}</td>
                                <td>{variant?.size}</td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    defaultValue={variant?.quantity}
                                    onChange={(e) =>
                                      handleInputChange(
                                        colorIndex,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    defaultValue={variant?.sellingPrice}
                                    onChange={(e) =>
                                      handleInputChange(
                                        colorIndex,
                                        "sellingPrice",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    defaultValue={variant?.purchasePrice}
                                    onChange={(e) =>
                                      handleInputChange(
                                        colorIndex,
                                        "purchasePrice",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
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
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      onChange={() => setFeatured(!featured)}
                      type="checkbox"
                      value={featured}
                      class="sr-only peer"
                      checked={product?.featured && featured}
                    />
                    <div class="w-11 h-[23px] bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
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
                  value={
                    details ||
                    product?.description ||
                    "Enter Product Description"
                  }
                  onBlur={(text) => setDetails(text)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={updateLoading && "disabled"}
                className="bg-primary text-base-100 px-10 py-2 rounded"
              >
                {updateLoading ? "Loading..." : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }

  return <div className="add_product text-neutral-content">{content}</div>;
}
