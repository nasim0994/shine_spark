import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetProductBySlugQuery } from "@/Redux/product/productApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parser from "html-react-parser";
import SimilarProducts from "@/components/shared/main/ProductDetails/SimilarProducts";
import BreadcrumbCom from "@/components/shared/main/ProductDetails/BreadcrumbCom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart, buyNow } from "@/Redux/cart/cartSlice";
import { currencyFormatter } from "@/lib/currencyFormatter";
import WishlistBtn from "@/components/shared/main/WishlistBtn";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

export default function ProductDetails() {
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const { data, isLoading } = useGetProductBySlugQuery(slug);
  const product = data?.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const discount = sessionStorage.getItem("discount");

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(product?.sellingPrice);
  const [showImage, setShowImage] = useState(product?.thumbnail);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedStock, setSelectedStock] = useState(product?.totalStock);
  const [selectedSku, setSelectedSku] = useState("");

  useEffect(() => {
    setSelectedPrice(product?.sellingPrice);
    setShowImage(product?.thumbnail);
    setSelectedStock(product?.totalStock);
  }, [product]);

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handelColorSelect = (clr) => {
    if (selectedColor === clr?.color) {
      setSelectedColor("");
      setShowImage(product?.thumbnail);
    } else {
      setSelectedColor(clr?.color);
      setShowImage(clr?.image);
    }
  };

  useEffect(() => {
    let sku = "";
    let color = "";
    let size = "";

    if (selectedColor) color = selectedColor;
    if (selectedSize) size = selectedSize;

    if (color && size) {
      sku = `${color}-${size}`.toLowerCase();
    } else if (color) {
      sku = `${color}`.toLowerCase();
    } else if (size) {
      sku = `${size}`.toLowerCase();
    }

    const findVariant = product?.variants?.find((item) => item.sku == sku);

    if (findVariant) {
      setSelectedSku(findVariant?.sku);
      setSelectedPrice(findVariant?.sellingPrice);
      setSelectedStock(findVariant?.stock);
    } else {
      setSelectedPrice(product?.sellingPrice);
    }
  }, [selectedSize, selectedColor, product]);

  const handleAddToCart = (product) => {
    const isSizes = product?.sizes?.length > 0;
    const isColors = product?.colors?.length > 0;

    if (isSizes && !selectedSize) return toast.error("Please select a size");
    if (isColors && !selectedColor) return toast.error("Please select a color");

    dispatch(
      addToCart({
        product,
        selectedSize,
        selectedColor,
        quantity: selectedQuantity || 1,
        price: selectedPrice,
        discount,
        stock: selectedStock,
        sku: selectedSku,
      }),
    );
  };

  const handelDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    } else {
      toast.error("Minimum quantity is 1");
    }
  };

  const handelIncrease = () => {
    if (selectedStock > selectedQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    } else {
      toast.error("Maximum quantity reached");
    }
  };

  const handleBuyNow = () => {
    const isSizes = product?.sizes?.length > 0;
    const isColors = product?.colors?.length > 0;

    if (isSizes && !selectedSize) return toast.error("Please select a size");
    if (isColors && !selectedColor) return toast.error("Please select a color");

    dispatch(
      buyNow({
        product,
        selectedSize,
        selectedColor,
        quantity: selectedQuantity || 1,
        price: selectedPrice,
        discount,
        stock: selectedStock,
        sku: selectedSku,
      }),
    );
    navigate("/checkout");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-2">
      <div className="container">
        <BreadcrumbCom title={product?.title} />

        <div className="mt-4 grid gap-10 lg:grid-cols-5">
          {/* left-images */}
          <div className="grid gap-3 md:grid-cols-7 md:gap-4 lg:col-span-3">
            <div className="order-2 flex gap-2 md:order-1 md:flex-col md:gap-3">
              {product?.galleries?.length > 0
                ? product?.galleries?.map((gallery, i) => (
                    <img
                      key={i}
                      src={`${import.meta.env.VITE_BACKEND_URL}/products/${gallery?.url}`}
                      onClick={() => setShowImage(gallery?.url)}
                      alt={product?.title}
                      width={100}
                      height={60}
                      className="w-12 cursor-pointer md:h-32 md:w-full"
                    />
                  ))
                : product?.colors?.map((color, i) => (
                    <img
                      key={i}
                      src={`${import.meta.env.VITE_BACKEND_URL}/products/${color?.image}`}
                      onClick={() => setShowImage(color?.image)}
                      alt={product?.title}
                      width={100}
                      height={60}
                      className="w-12 cursor-pointer md:h-32 md:w-full"
                    />
                  ))}
            </div>

            <div className="order-1 md:order-2 md:col-span-6">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
                alt={product?.title}
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          </div>

          {/* right-info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-medium">{product?.title}</h2>
            <div className="flex items-center justify-between">
              <p className="text-neutral">
                {product?.code && `Style No ${product?.code}`}
              </p>
              <WishlistBtn product={product} />
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-lg">
                {discount > 0 ? (
                  <>
                    <p className="text-lg">
                      {currencyFormatter(
                        selectedPrice - (selectedPrice * discount) / 100,
                      )}
                    </p>
                    <del className="text-[15px] text-neutral-content opacity-80">
                      {currencyFormatter(selectedPrice)}
                    </del>
                    <p className="text-[15px] text-red-500">{discount}% off</p>
                  </>
                ) : (
                  <p>{currencyFormatter(selectedPrice)}</p>
                )}
              </div>

              <small className="block text-xs text-neutral-content opacity-60">
                Inclusive of all taxes
              </small>
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center gap-4 border-y py-3">
              <h3 className="text-neutral-content">Quantity: </h3>

              <div className="flex gap-2">
                <button
                  onClick={handelDecrease}
                  className="text-2xl duration-200 hover:text-neutral"
                >
                  <FiMinusCircle />
                </button>
                <div>
                  <p className="w-10 text-center font-semibold">
                    {selectedQuantity}
                  </p>
                </div>
                <button
                  onClick={handelIncrease}
                  className="text-2xl duration-200 hover:text-neutral"
                >
                  <FiPlusCircle />
                </button>
              </div>
            </div>

            {/* Sizes */}
            {product?.sizes?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg">Select Size</p>
                  <button className="text-primary hover:underline">
                    Size Guide
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap items-start gap-2">
                  {product?.sizes?.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => handelSelectSize(size)}
                      className={`${size === selectedSize && "bg-primary text-base-100"} rounded-xl border px-4 py-1.5 duration-300 ${size !== selectedSize && "hover:bg-gray-100 hover:text-primary"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product?.colors?.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg">Select Color</p>
                </div>

                <div className="mt-2 flex flex-wrap items-start gap-2">
                  {product?.colors?.map((color, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="h-13 relative w-12 cursor-pointer">
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/products/${color?.image}`}
                              alt={color?.color}
                              onClick={() => handelColorSelect(color)}
                              width={20}
                              height={20}
                              className="h-full w-full rounded"
                            />

                            {selectedColor === color?.color && (
                              <p className="absolute bottom-0 w-full bg-gray-100/80 text-center text-xs">
                                {color?.color}
                              </p>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color?.color}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 uppercase">
              <button
                onClick={() => handleAddToCart(product)}
                className="rounded border border-primary py-2 text-primary duration-300 hover:bg-primary hover:text-base-100"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="rounded border border-primary bg-primary py-2 text-base-100 duration-300 hover:bg-transparent hover:text-primary"
              >
                Buy Now
              </button>
            </div>

            {/* details */}
            <div className="mt-5">
              <p className="text-lg">Product Details</p>

              <div className="mt-2 opacity-80">
                {product?.description && parser(product?.description)}
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts
          category={product?.category?.slug}
          currentProduct={product?._id}
        />
      </div>
    </section>
  );
}
