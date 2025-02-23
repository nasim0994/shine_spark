import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { AiFillDelete } from "react-icons/ai";
import JoditEditor from "jodit-react";
import ImageUploading from "react-images-uploading";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Redux/product/productApi";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "@/Redux/category/categoryApi";
import { useGetSubCategoryQuery } from "@/Redux/subCategory/subCategoryApi";
import { useAllBrandsQuery } from "@/Redux/brand/brandApi";
import { useAllColorsQuery } from "@/Redux/color/colorApi";

export default function EditProduct() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [thumbnail, setThumbnail] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [galleriesUrl, setGalleriesUrl] = useState([]);
  const [sizechart, setSizechart] = useState([]);

  const [title, setTitle] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);

  const [featured, setFeatured] = useState(false);
  const [details, setDetails] = useState("");

  const [sellingPrice, setSellingPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [variant, setVariant] = useState(false);
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const { data, isLoading: pLoading } = useGetProductByIdQuery(id);
  const product = data?.data;

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

  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setCategoryId(product?.category?._id);
      setSubCategoryId(product?.subCategory?._id);
      setSubSubCategoryId(product?.subSubCategory?._id);
      setBrand(product?.brand);
      setDiscount(product?.discount);
      setFeatured(product?.featured);
      setDetails(product?.description);
      setSellingPrice(product?.sellingPrice);
      setPurchasePrice(product?.purchasePrice);
      setStock(product?.totalStock);

      if (product?.galleries?.length > 0) {
        setGalleriesUrl(product?.galleries);
      }

      if (product?.isVariant) {
        setVariant(product?.isVariant);
        setVariants(product?.variants);

        if (product?.variants?.length > 0) {
          const colors =
            product?.variants
              ?.map((variant) =>
                variant?.color?.label && variant?.color?.value
                  ? { label: variant.color.label, value: variant.color.value }
                  : null,
              )
              .filter(Boolean) || [];

          const sizes = product?.variants
            ?.map((variant) => variant?.size)
            .filter((size) => size !== undefined);

          if (colors.length > 0) setColors(colors);
          if (sizes.length > 0) setSizes(sizes);
        }
      }
    }
  }, [product]);

  const handleFileChange = (event) => {
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

  const removeGalleryUrl = (index) => {
    const updatedGallery = galleriesUrl?.filter((_, i) => i !== index);
    setGalleriesUrl(updatedGallery);
  };

  const makeVariants = (colors, sizes) => {
    let variants = [];
    let index = 0;

    if (colors?.length && sizes?.length) {
      colors?.forEach((color) => {
        sizes?.forEach((size) => {
          variants.push({
            sku: `${color.label.split(" ").join("")}-${size}`,
            index: index++,
            color,
            size,
          });
        });
      });
    } else if (colors?.length) {
      colors?.forEach((color) => {
        variants.push({
          sku: color.label.split(" ").join(""),
          index: index++,
          color,
        });
      });
    } else if (sizes?.length) {
      sizes?.forEach((size) => {
        variants.push({
          sku: size,
          index: index++,
          size,
        });
      });
    }

    return variants;
  };

  useEffect(() => {
    if (variant) {
      const generatedVariants = makeVariants(colors, sizes);

      setVariants((prevVariants) => {
        let index = prevVariants?.length + 1;

        // Filter out existing variants based on the current selections
        const filteredVariants = prevVariants?.filter((variant) => {
          const skuParts = variant.sku.split("-");
          let color = "";
          let size = "";

          // Assign based on how many parts are in sku
          if (skuParts.length === 2) {
            [color, size] = skuParts; // both color and size present
          } else if (colors.length && skuParts.length === 1) {
            color = skuParts[0]; // only color present
          } else if (sizes.length && skuParts.length === 1) {
            size = skuParts[0]; // only size present
          }

          const colorExists = color
            ? colors.some(
                (selectedColor) =>
                  selectedColor.label.replace(/\s+/g, "") === color,
              )
            : true;

          const sizeExists = size ? sizes.includes(size) : true;

          return colorExists && sizeExists;
        });

        // Map the generated variants to add additional properties
        const newVariants = generatedVariants?.map((generatedVariant) => {
          const existingVariant = filteredVariants?.find((variant) => {
            return variant?.index === generatedVariant?.index;
          });

          const colorImage = existingVariant
            ? existingVariant.colorImage
            : (filteredVariants?.find(
                (variant) =>
                  variant?.color?.label == generatedVariant?.color?.label,
              )?.colorImage ?? null);

          const colorImageShow = existingVariant
            ? existingVariant.colorImageShow
            : (filteredVariants?.find(
                (variant) =>
                  variant?.color?.label == generatedVariant?.color?.label,
              )?.colorImageShow ?? null);

          return {
            index: existingVariant ? existingVariant.index : index++,
            sku: generatedVariant?.sku,
            color: generatedVariant?.color,
            size: generatedVariant?.size,
            colorImage,
            colorImageShow,
            sellingPrice: existingVariant?.sellingPrice ?? "",
            purchasePrice: existingVariant?.purchasePrice ?? "",
            stock: existingVariant?.stock ?? "",
          };
        });

        return newVariants;
      });
    }
  }, [colors, sizes, variant]);

  const handleVariantChange = (e, sku, field) => {
    const value = e.target.value;

    if (value < 0) return toast.warning("Value can't be negative");

    setVariants((prevVariants) => {
      const existingVariantIndex = prevVariants.findIndex(
        (variant) => variant.sku === sku,
      );

      if (value === "000") {
        return prevVariants.filter((variant) => variant.sku !== sku);
      }

      if (existingVariantIndex >= 0) {
        const updatedVariants = [...prevVariants];
        updatedVariants[existingVariantIndex] = {
          ...updatedVariants[existingVariantIndex],
          [field]: value,
        };
        return updatedVariants;
      } else {
        return [
          ...prevVariants,
          {
            sku,
            [field]: value,
          },
        ];
      }
    });
  };

  const handleVariantImageChange = (e, sku) => {
    const file = e.target.files[0];

    // check file size
    if (file.size > 1024 * 1024) {
      return toast.error("You can't upload more than 1MB file size");
    }

    if (file && file.size <= 1024 * 1024) {
      setVariants((prevVariants) => {
        return prevVariants.map((variant) =>
          variant.sku === sku ? { ...variant, colorImage: file } : variant,
        );
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setVariants((prevVariants) =>
          prevVariants.map((variant) =>
            variant.sku === sku
              ? { ...variant, colorImageShow: reader.result }
              : variant,
          ),
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Edit product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!title) return toast.warning("Title is required");
    if (!categoryId) return toast.warning("Category is required");

    if (!sellingPrice) return toast.warning("Selling Price is required");
    if (!purchasePrice) return toast.warning("Purchase Price is required");
    if (!variant && !stock) return toast.warning("Stock is required");

    if (!details) return toast.warning("Description is required");
    if (variant && variants?.length <= 0) {
      return toast.warning("Variant is required");
    }

    const totalStock =
      variant && variants?.length > 0
        ? variants?.reduce(
            (acc, curr) => parseInt(acc) + parseInt(curr?.stock),
            0,
          )
        : stock;

    const formData = new FormData();

    formData.append("thumbnail", thumbnail[0]?.file);
    if (sizechart?.length > 0) formData.append("sizechart", sizechart[0]?.file);

    if (galleries?.length > 0)
      galleries.forEach((gallery) => formData.append("gallery", gallery.file));

    if (galleriesUrl?.length > 0)
      formData.append("galleriesUrl", JSON.stringify(galleriesUrl));

    formData.append("title", title);
    formData.append("category", categoryId);
    if (subCategoryId) formData.append("subCategory", subCategoryId);
    if (subSubCategoryId) formData.append("subSubCategory", subSubCategoryId);
    if (brand) formData.append("brand", brand);

    formData.append("sellingPrice", sellingPrice);
    formData.append("purchasePrice", purchasePrice);
    formData.append("totalStock", totalStock);
    formData.append("discount", discount);

    formData.append("featured", featured);
    formData.append("description", details);

    formData.append("isVariant", variant);
    if (variant && variants?.length > 0) {
      const formatVariants = variants?.map((variant) => {
        const {
          color,
          size,
          sku,
          colorImage,
          sellingPrice,
          purchasePrice,
          stock,
        } = variant;

        return {
          color,
          size,
          sku,
          colorImage,
          sellingPrice,
          purchasePrice,
          stock,
        };
      });

      formData.append("variants", JSON.stringify(formatVariants));

      variants?.map((variant) => {
        if (variant?.colorImage instanceof File) {
          formData.append("colorImage", variant?.colorImage);
          formData.append("colorImageSku", variant?.sku);
        }
      });
    }

    const res = await updateProduct({ id, formData });

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
      navigate("/admin/product/all-products");
    } else {
      toast.error(res?.data?.message || "Failed to add product");
      console.log(res);
    }
  };

  if (pLoading) return <p>Loading...</p>;

  return (
    <div className="add_product rounded bg-base-100 shadow">
      <h3 className="border-b p-4 text-lg font-medium text-neutral">
        Edit Product
      </h3>

      <div className="grid items-start gap-4 p-4 xl:grid-cols-4">
        <div className="text-neutral-content xl:col-span-3">
          <div className="rounded border p-4">
            <p className="mb-2 text-sm">Edit Thumbnail</p>
            <ImageUploading
              value={thumbnail}
              onChange={(img) => setThumbnail(img)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div className="grid gap-4 sm:grid-cols-2" {...dragProps}>
                  <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed p-3">
                    <span
                      onClick={onImageUpload}
                      className="cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded border border-dashed p-3 lg:grid-cols-3 xl:grid-cols-4">
                    {thumbnail?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt="thumbnail"
                          className="h-20 w-full"
                        />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
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

          {/* gallery */}
          <div className="mt-3 rounded border p-4">
            <p className="mb-2 text-sm">
              Edit Gallery <small>(optional - max 10 images)</small>
            </p>

            <div className="mt-2 text-sm">
              <div className="flex flex-wrap space-x-2">
                {galleriesUrl?.length > 0 &&
                  galleriesUrl?.map((img, index) => (
                    <div
                      key={index}
                      className="relative mb-2 h-14 w-20 overflow-hidden rounded object-cover"
                    >
                      <img
                        src={
                          import.meta.env.VITE_BACKEND_URL +
                          "/products/" +
                          img?.url
                        }
                        alt={img?.name}
                        className="h-full w-full rounded border object-cover"
                      />

                      <button
                        onClick={() => removeGalleryUrl(index)}
                        className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 text-base-100 opacity-0 duration-300 hover:text-red-500 hover:opacity-100"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </div>
                  ))}

                {galleries?.length > 0 &&
                  galleries?.map((img, index) => (
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

                <div className="relative flex h-14 w-32 cursor-pointer items-center justify-center rounded border-2 border-dashed border-primary bg-primary/10">
                  <input
                    type="file"
                    multiple
                    className="absolute z-50 h-full w-full cursor-pointer"
                    style={{ opacity: 0, top: 0, left: 0, cursor: "pointer" }}
                    onChange={handleFileChange}
                  />

                  <span className="text-primary">+ Add more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form_group mt-3">
            {/* product info , category & brand */}
            <div className="mb-5 flex flex-col gap-3 rounded border p-4">
              <div>
                <p className="text-sm">Product Title</p>
                <input
                  type="text"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  defaultValue={title}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">Category *</p>
                  <select
                    name="category"
                    required
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
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
                    value={subCategoryId}
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
                    value={subSubCategoryId}
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
                  <select
                    name="brand"
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                  >
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
                    value={sellingPrice}
                  />
                </div>

                <div>
                  <p className="text-sm">Base Purchase Price *</p>
                  <input
                    type="number"
                    name="purchasePrice"
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    required
                    value={purchasePrice}
                  />
                </div>

                <div>
                  <p className="text-sm">Discount %</p>
                  <input
                    type="number"
                    name="discount"
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                  />
                </div>

                <div>
                  <p className="text-sm">Stock *</p>
                  <input
                    type="number"
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                    required
                    value={stock}
                    disabled={variant && "disabled"}
                  />
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="mt-4 rounded border p-4">
              <div className="flex items-center gap-3">
                <p>Variant: </p>

                <label className="relative flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    value={variant}
                    onChange={() => {
                      setVariant(!variant);
                    }}
                    checked={variant}
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>

              {variant && (
                <>
                  <div className="mt-2 rounded border p-3">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm">Colors</p>

                        <Select
                          defaultValue={colors}
                          onChange={setColors}
                          options={colorOptions}
                          isMulti={true}
                          classNamePrefix="custom-select"
                          getOptionLabel={(option) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{
                                  width: 13,
                                  height: 13,
                                  backgroundColor: option.value,
                                  marginRight: 6,
                                  borderRadius: "50%",
                                }}
                              ></div>
                              <span>{option.label}</span>
                            </div>
                          )}
                          getOptionValue={(option) => option.value}
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

                    <div className="relative mt-3 overflow-x-auto">
                      <table className="border_table">
                        <thead>
                          <tr>
                            <th>SKU</th>
                            {colors?.length > 0 && <th>Color Image</th>}
                            <th>Selling Price</th>
                            <th>Purchase Price</th>
                            <th>Stock</th>
                          </tr>
                        </thead>

                        <tbody>
                          {variants?.map((variant, i) => (
                            <tr key={i}>
                              <td className="whitespace-nowrap">
                                {variant?.sku}
                              </td>
                              {colors?.length > 0 && (
                                <td>
                                  <button className="relative h-8 w-full rounded border border-dashed p-1">
                                    <input
                                      type="file"
                                      className="absolute -top-1 left-0 h-full w-full opacity-0"
                                      onChange={(e) =>
                                        handleVariantImageChange(
                                          e,
                                          variant?.sku,
                                        )
                                      }
                                    />
                                    {variant?.colorImageShow ? (
                                      <img
                                        src={variant?.colorImageShow}
                                        alt="Color Preview"
                                        className="mx-auto h-full w-10 rounded"
                                      />
                                    ) : variant?.colorImage &&
                                      !variant?.colorImageShow ? (
                                      <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}/products/${variant?.colorImage}`}
                                        alt="Color Preview"
                                        className="mx-auto h-full w-10 rounded"
                                      />
                                    ) : (
                                      "Add Image"
                                    )}
                                  </button>
                                </td>
                              )}
                              <td>
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleVariantChange(
                                      e,
                                      variant?.sku,
                                      "sellingPrice",
                                    )
                                  }
                                  required
                                  defaultValue={variant?.sellingPrice}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleVariantChange(
                                      e,
                                      variant?.sku,
                                      "purchasePrice",
                                    )
                                  }
                                  required
                                  defaultValue={variant?.purchasePrice}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleVariantChange(
                                      e,
                                      variant?.sku,
                                      "stock",
                                    )
                                  }
                                  required
                                  defaultValue={variant?.stock}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* sizechart */}
                  <div className="mt-4 rounded border p-4">
                    <p className="mb-2 text-sm">Add Sizechart </p>
                    <ImageUploading
                      value={thumbnail}
                      onChange={(img) => setSizechart(img)}
                      dataURLKey="data_url"
                    >
                      {({ onImageUpload, onImageRemove, dragProps }) => (
                        <div
                          className="grid gap-4 sm:grid-cols-2"
                          {...dragProps}
                        >
                          <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed p-3">
                            <span
                              onClick={onImageUpload}
                              className="cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                            >
                              Choose Image
                            </span>

                            <p className="text-neutral-content">or Drop here</p>
                          </div>

                          <div className="grid gap-4 rounded border border-dashed p-3">
                            {sizechart?.map((img, index) => (
                              <div key={index} className="image-item relative">
                                <img
                                  src={img["data_url"]}
                                  alt="thumbnail"
                                  className="h-20 w-full"
                                />
                                <div
                                  onClick={() => onImageRemove(index)}
                                  className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                                >
                                  <AiFillDelete />
                                </div>
                              </div>
                            ))}

                            {sizechart?.length <= 0 && product?.sizechart && (
                              <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.sizechart}`}
                                alt="sizechart"
                                className="h-20 w-full"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                </>
              )}
            </div>

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
                      checked={featured}
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
                disabled={isLoading && "disabled"}
                className="rounded bg-primary px-10 py-2 text-base-100"
              >
                {isLoading ? "Loading..." : "Edit Product"}
              </button>
            </div>
          </div>
        </div>

        {/* preview */}
        <div className="sticky top-2 hidden rounded border xl:block">
          <div className="relative h-60 overflow-hidden">
            {thumbnail?.length > 0 ? (
              thumbnail?.map((img, index) => (
                <div key={index} className="image-item relative">
                  <img
                    src={img["data_url"]}
                    alt="image"
                    className="h-60 w-full rounded"
                  />
                </div>
              ))
            ) : (
              <img
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  "/products/" +
                  product?.thumbnail
                }
                alt="image"
                className="h-60 w-full rounded object-cover"
              />
            )}

            {discount > 0 && (
              <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
                <p>{discount}%</p>
              </div>
            )}
          </div>

          <h1 className="title p-2 text-sm font-medium sm:text-base">
            {title
              ? title.length > 25
                ? `${title.slice(0, 25)}...`
                : title
              : "Product Title Demo"}
          </h1>

          <div>
            <div className="p-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-primary sm:text-lg">
                  ৳
                  {variants?.length > 0
                    ? parseInt(
                        variants[0]?.sellingPrice -
                          (variants[0]?.sellingPrice * discount) / 100,
                      )
                    : parseInt(sellingPrice - (sellingPrice * discount) / 100)}
                </p>

                {discount > 0 && (
                  <del className="text-xs text-red-400 sm:text-sm">
                    ৳
                    {variants?.length > 0
                      ? parseInt(variants[0]?.sellingPrice)
                      : parseInt(sellingPrice)}
                  </del>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-300">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar /> (0)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2">
              <button className="rounded bg-primary/20 py-1.5 text-sm text-primary duration-300 hover:bg-primary hover:text-base-100">
                Buy Now
              </button>

              <button className="flex items-center justify-center gap-2 rounded bg-gray-200 py-1.5 text-sm duration-300 hover:bg-gray-500 hover:text-base-100">
                <span className="hidden sm:block">Add to Cart</span>
                <FaCartPlus className="sm:hidden" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
