import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { addToCart } from "../../Redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

export default function ProductCard({ product, discount: flashDiscount = 0 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const {
    slug,
    thumbnail,
    title,
    sellingPrice,
    discount,
    rating,
    reviewer,
    category,
    subCategory,
    subSubCategory,
    totalStock,
  } = product;

  const newDiscount = parseInt(flashDiscount) + discount;

  const carts = useSelector((state) => state.cart.carts);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState(sellingPrice);
  const [availableStock, setAvailableStock] = useState(totalStock);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // useEffect(() => {
  //   const findVariant = variants?.find(
  //     (variant) =>
  //       variant.color === selectedColor && variant.size === selectedSize,
  //   );

  //   if (findVariant) {
  //     setAvailableStock(findVariant?.quantity);
  //     setSelectedPrice(findVariant?.sellingPrice);
  //   } else {
  //     setAvailableStock(totakStock);
  //     setSelectedPrice(price);
  //   }
  // }, [selectedSize, selectedColor, totakStock, price, variants]);

  const handelColorSelect = (clr) => {
    if (selectedColor === clr.color) {
      setSelectedColor("");
    } else {
      setSelectedColor(clr.color);
    }
  };

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handelDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handelIncrease = () => {
    if (availableStock > selectedQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  // const handleBuyNow = () => {
  //   if (variants?.length > 0 && sizes[0] && !selectedSize) {
  //     return Swal.fire("", "Please Select Size", "warning");
  //   }

  //   if (variants?.length > 0 && !selectedColor) {
  //     return Swal.fire("", "Please Select Color", "warning");
  //   }

  //   const cartProduct = {
  //     _id: product._id,
  //     title: title,
  //     slug: product.slug,
  //     image: images[0],
  //     discount: newDiscount,
  //     price: selectedPrice,
  //     quantity: selectedQuantity,
  //     size: selectedSize,
  //     color: selectedColor,
  //     stock: availableStock,
  //   };

  //   dispatch(addToCart([cartProduct]));
  //   navigate("/checkout");
  // };

  // const handelAddToCart = () => {
  //   if (variants?.length > 0 && sizes[0] && !selectedSize) {
  //     return Swal.fire("", "Please Select Size", "warning");
  //   }

  //   if (variants?.length > 0 && !selectedColor) {
  //     return Swal.fire("", "Please Select Color", "warning");
  //   }

  //   const cartProduct = {
  //     _id: product._id,
  //     title: title,
  //     slug: product.slug,
  //     image: images[0],
  //     discount: newDiscount,
  //     price: selectedPrice,
  //     quantity: selectedQuantity,
  //     size: selectedSize,
  //     color: selectedColor,
  //     stock: availableStock,
  //   };

  //   const findProduct = carts?.find(
  //     (product) =>
  //       product._id === cartProduct._id &&
  //       product.size === cartProduct.size &&
  //       product.color === cartProduct.color,
  //   );

  //   if (findProduct) {
  //     return Swal.fire("", "Product already added to cart", "warning");
  //   } else {
  //     dispatch(addToCart([...carts, cartProduct]));
  //     setModal(false);
  //     Swal.fire("", "Item added to cart successfully", "success");
  //   }
  // };

  return (
    <>
      <div className="product_card">
        <div className="flex h-full flex-col justify-between rounded shadow">
          <Link to={`/product/${slug}?discount=${newDiscount}`}>
            <div className="relative h-56 overflow-hidden sm:h-60">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
                alt={title}
                className="product_img h-full w-full rounded"
                loading="lazy"
              />

              {newDiscount > 0 && (
                <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
                  <p>{newDiscount}%</p>
                </div>
              )}
            </div>

            <h1 className="title p-2 text-sm font-medium sm:text-base">
              {title.length > 25 ? `${title.slice(0, 25)}...` : title}
            </h1>
          </Link>

          <div>
            <div className="p-2 pt-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-primary sm:text-lg">
                  ৳{parseInt(sellingPrice - (sellingPrice * newDiscount) / 100)}
                </p>

                {newDiscount > 0 && (
                  <del className="text-xs text-red-400 sm:text-sm">
                    ৳{parseInt(sellingPrice)}
                  </del>
                )}
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Rating rating={rating || 0} />
                <p className="text-xs text-neutral-content">
                  ({reviewer ? reviewer : 0})
                </p>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-2 p-2">
                {variants?.length ? (
                  <button
                    onClick={() => setModal(true)}
                    className="rounded bg-primary/20 py-1.5 text-sm text-primary duration-300 hover:bg-primary hover:text-base-100"
                  >
                    Buy Now
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    className="rounded bg-primary/20 py-1.5 text-sm text-primary duration-300 hover:bg-primary hover:text-base-100"
                  >
                    Buy Now
                  </button>
                )}

                {variants?.length ? (
                  <button
                    onClick={() => setModal(true)}
                    className="flex items-center justify-center gap-2 rounded bg-gray-200 py-1.5 text-sm duration-300 hover:bg-gray-500 hover:text-base-100"
                  >
                    <span className="hidden sm:block">Add to Cart</span>
                    <FaCartPlus className="sm:hidden" />
                  </button>
                ) : (
                  <button
                    onClick={handelAddToCart}
                    className="flex items-center justify-center gap-2 rounded bg-gray-200 py-1.5 text-sm duration-300 hover:bg-gray-500 hover:text-base-100"
                  >
                    <span className="hidden sm:block">Add to Cart</span>
                    <FaCartPlus className="sm:hidden" />
                  </button>
                )}
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
