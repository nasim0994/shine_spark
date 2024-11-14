import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { FiHeart, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAddCall } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { addToCart } from "../../Redux/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/wishlist/wishlistSlice";
import Rating from "../../components/Rating/Rating";
import ProductImage from "./ProductImage";

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const wishlists = useSelector((state) => state.wishlist.wishlists);

  const discount = sessionStorage.getItem("discount");

  const {
    title,
    thumbnail,
    brand,
    category,
    rating,
    reviewer,
    sellingPrice,
    totalStock,
    galleries,
    variant,
  } = product;

  const { colors, sizes, variants } = variant || {};

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStock, setSelectedStock] = useState(totalStock);
  const [selectedPrice, setSelectedPrice] = useState(sellingPrice);
  const [selectedSku, setSelectedSku] = useState();

  const [selectedQuantity, setSelectedQuantity] = useState(1);

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

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handelColorSelect = (clr) => {
    if (selectedColor === clr) {
      setSelectedColor("");
    } else {
      setSelectedColor(clr);
    }
  };

  useEffect(() => {
    let sku = "";
    let color = "";
    let size = "";

    if (selectedColor) {
      color = selectedColor?.label.split(" ").join("");
    }

    if (selectedSize) {
      size = selectedSize;
    }

    if (color && size) {
      sku = `${color}-${size}`;
    } else if (color) {
      sku = `${color}`;
    } else if (size) {
      sku = `${size}`;
    }

    const findVariant = variants?.find((item) => item.sku === sku);

    if (findVariant) {
      setSelectedSku(findVariant.sku);
      setSelectedStock(findVariant.stock);
      setSelectedPrice(findVariant?.sellingPrice);
    }
  }, [selectedSize, selectedColor, variants]);

  const handleBuyNow = () => {
    if (variants?.length > 0 && sizes[0] && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    if (variants?.length > 0 && colors[0] && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    const cartProduct = {
      _id: product._id,
      discount: discount,
      price: selectedPrice,
      thumbnail,
      title,
      quantity: selectedQuantity,
      sku: selectedSku,
      stock: selectedStock,
    };

    dispatch(addToCart([cartProduct]));
    navigate("/checkout");
  };

  const handelAddToCart = () => {
    if (variants?.length > 0 && sizes[0] && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    if (variants?.length > 0 && colors[0] && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    const cartProduct = {
      _id: product._id,
      discount: discount,
      price: selectedPrice,
      thumbnail,
      title,
      quantity: selectedQuantity,
      sku: selectedSku,
      stock: selectedStock,
    };

    if (carts?.length > 0) {
      const findProduct = carts?.find(
        (p) => p._id === cartProduct._id && selectedSku == p.sku,
      );

      if (findProduct) {
        return toast.error("Product already added to cart");
      } else {
        dispatch(addToCart([...carts, cartProduct]));
        toast.success("Item added to cart successfully");
      }
    } else {
      dispatch(addToCart([cartProduct]));
      toast.success("Item added to cart successfully");
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currencyCode: "BDT",
        add: {
          products: [
            {
              item_id: product._id,
              item_name: product.title,
              price: selectedPrice,
              discount: discount,
              brand: brand,
              category: category?.name,
              variant: selectedSku,
              quantity: selectedQuantity || 0,
            },
          ],
        },
      },
    });
  };

  const handelAddToWishlist = (product) => {
    const findProduct = wishlists?.find((item) => item._id === product._id);

    if (findProduct) {
      dispatch(removeFromWishlist(product));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "remove_to_wishlist",
        ecommerce: {
          currencyCode: "BDT",
          add: {
            products: [
              {
                item_id: product._id,
                item_name: product.title,
                price: selectedPrice,
                discount: discount,
                brand: brand,
                category: category?.name,
                variant: selectedSku,
              },
            ],
          },
        },
      });
      return Swal.fire("", "Product removed from wishlist", "warning");
    } else {
      dispatch(addToWishlist([...wishlists, product]));
      Swal.fire("", "Product added to wishlist successfully", "success");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "add_to_wishlist",
        ecommerce: {
          currencyCode: "BDT",
          add: {
            products: [
              {
                item_id: product._id,
                item_name: product.title,
                price: selectedPrice,
                discount: discount,
                brand: brand,
                category: category?.name,
                variant: selectedSku,
              },
            ],
          },
        },
      });
    }
  };

  const isWishlist = wishlists?.find((item) => item._id === product._id);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Image */}
      <div className="lg:w-[42%]">
        <ProductImage
          discount={discount}
          galleries={galleries}
          thumbnail={thumbnail}
        />
      </div>

      {/* Details */}
      <div className="lg:w-[58%]">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-content">
            <p className="rounded bg-primary/10 px-2 py-1 text-primary">
              {category?.name}
            </p>
          </div>

          <h1 className="mt-2 text-2xl font-medium text-neutral">{title}</h1>
          {selectedStock > 0 ? (
            <p className="text-xs text-primary">In Stock</p>
          ) : (
            <p className="text-xs text-red-500">Out of Stock</p>
          )}

          <div className="mt-2 flex items-center gap-1 text-[13px]">
            <Rating rating={rating || 0} />
            <p className="text-xs text-neutral-content">
              ({reviewer ? reviewer : 0})
            </p>
          </div>

          <div className="text-[13px] text-neutral-content">
            {brand && (
              <p>
                <span className="text-neutral/80">Brand:</span>{" "}
                <span>{brand}</span>
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between py-3 pr-2">
          <div className="flex items-center gap-6">
            <p className="text-neutral-content">Price: </p>

            <div className="flex items-end gap-2">
              <p className="text-2xl font-medium text-primary">
                ৳ {parseInt(selectedPrice - (selectedPrice * discount) / 100)}
              </p>
              {discount > 0 && (
                <del className="text-red-400">৳{selectedPrice}</del>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => handelAddToWishlist(product)}
              className={`rounded-full p-3 shadow-lg ${
                isWishlist && "bg-primary text-base-100"
              }`}
            >
              <FiHeart />
            </button>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 border-y py-3">
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

        {colors?.length > 0 && (
          <div className="my-4 flex items-center gap-4">
            <p>Color :</p>

            <div className="flex items-center gap-2">
              {colors?.map((clr) => (
                <button
                  key={clr._id}
                  onClick={() => handelColorSelect(clr)}
                  className={`scale-[.96] rounded-lg border-2 px-2 py-1 text-sm duration-300 hover:scale-[1]`}
                  style={{
                    borderColor:
                      clr.value === selectedColor?.value && clr.value,
                    color: clr.value === selectedColor?.value && clr?.value,
                  }}
                >
                  {clr?.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes?.length > 0 && sizes[0] && (
          <div className="my-4 flex items-center gap-4">
            <p>Size :</p>

            <div className="flex items-center gap-2">
              {sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => handelSelectSize(size)}
                  className={`${
                    size === selectedSize && "bg-primary text-base-100"
                  } scale-[.96] rounded border px-2.5 py-1.5 text-[15px] duration-300 hover:scale-[1] hover:border-primary`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 items-center gap-2 sm:grid-cols-3">
          <button
            onClick={handleBuyNow}
            className="flex scale-[.97] items-center justify-center gap-1 rounded bg-primary px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
          >
            <IoBagCheckOutline />
            Buy Now
          </button>

          <button
            onClick={handelAddToCart}
            className="flex scale-[.97] items-center justify-center gap-1 rounded bg-accent px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
          >
            <FaOpencart />
            Add To Cart
          </button>

          <Link
            to=""
            className="flex scale-[.97] items-center justify-center gap-1 rounded bg-secondary px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
          >
            <MdAddCall />
            Call Now
          </Link>
        </div>
      </div>
    </div>
  );
}
