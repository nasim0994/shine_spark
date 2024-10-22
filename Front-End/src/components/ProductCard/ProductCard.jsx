import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { addToCart } from "../../Redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

export default function ProductCard({ product, discount: flashDiscount = 0 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const {
    slug,
    images,
    title,
    sellingPrice,
    discount,
    variants,
    rating,
    reviewer,
    category,
    subCategory,
    subSubCategory,
    quantity,
  } = product;

  const newDiscount = parseInt(flashDiscount) + discount;

  const carts = useSelector((state) => state.cart.carts);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [colors, setColors] = useState([]);
  const sizes = [
    ...new Set(variants?.map((size) => size.size !== undefined && size.size)),
  ];

  // Total Stock
  const totakStock = variants?.length
    ? variants?.reduce(
        (quantity, item) => parseInt(quantity) + parseInt(item.quantity),
        0,
      )
    : quantity;
  const price = variants?.length ? variants[0]?.sellingPrice : sellingPrice;

  const [selectedPrice, setSelectedPrice] = useState(price);
  const [availableStock, setAvailableStock] = useState(totakStock);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const uniqueSet = new Set();

    variants.forEach((item) => {
      const { color, colorCode } = item;
      const combinationKey = `${color}-${colorCode}`;
      uniqueSet.add(combinationKey);
    });

    const uniqueArray = Array.from(uniqueSet).map((combinationKey) => {
      const [color, colorCode] = combinationKey.split("-");
      return { color, colorCode };
    });

    setColors(uniqueArray);
  }, [variants]);

  useEffect(() => {
    const findVariant = variants?.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize,
    );

    if (findVariant) {
      setAvailableStock(findVariant?.quantity);
      setSelectedPrice(findVariant?.sellingPrice);
    } else {
      setAvailableStock(totakStock);
      setSelectedPrice(price);
    }
  }, [selectedSize, selectedColor, totakStock, price, variants]);

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

  const handleBuyNow = () => {
    if (variants?.length > 0 && sizes[0] && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    if (variants?.length > 0 && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    const cartProduct = {
      _id: product._id,
      title: title,
      slug: product.slug,
      image: images[0],
      discount: newDiscount,
      price: selectedPrice,
      quantity: selectedQuantity,
      size: selectedSize,
      color: selectedColor,
      stock: availableStock,
    };

    dispatch(addToCart([cartProduct]));
    navigate("/checkout");
  };

  const handelAddToCart = () => {
    if (variants?.length > 0 && sizes[0] && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    if (variants?.length > 0 && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    const cartProduct = {
      _id: product._id,
      title: title,
      slug: product.slug,
      image: images[0],
      discount: newDiscount,
      price: selectedPrice,
      quantity: selectedQuantity,
      size: selectedSize,
      color: selectedColor,
      stock: availableStock,
    };

    const findProduct = carts?.find(
      (product) =>
        product._id === cartProduct._id &&
        product.size === cartProduct.size &&
        product.color === cartProduct.color,
    );

    if (findProduct) {
      return Swal.fire("", "Product already added to cart", "warning");
    } else {
      dispatch(addToCart([...carts, cartProduct]));
      setModal(false);
      Swal.fire("", "Item added to cart successfully", "success");
    }
  };

  return (
    <>
      {modal ? (
        <div className="w-full p-1 shadow">
          {/* title  */}
          <div className="">
            <h1 className="text-lg font-medium text-neutral">{title}</h1>
            <div className="text-xs">
              <p>
                <span className="text-neutral/80">Category:</span>{" "}
                <span>
                  {category?.name}
                  {subCategory && ` - ${subCategory?.name}`}
                  {subSubCategory && ` - ${subSubCategory?.name}`}
                </span>
              </p>
              <p>
                <span className="text-neutral/80">Available Stock:</span>{" "}
                <span>{availableStock}</span>
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 border-y py-3">
            <div className="flex items-center gap-6">
              <p className="text-neutral opacity-70">Price: </p>

              <div className="flex items-end gap-2">
                <p className="text-base font-medium text-primary">
                  ৳ {parseInt(selectedPrice - (selectedPrice * discount) / 100)}
                </p>
                {discount > 0 && (
                  <del className="text-neutral/70">
                    ৳{(selectedPrice * discount) / 100}
                  </del>
                )}
              </div>
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
                    className={`scale-[.96] rounded-full border p-4 text-sm duration-300 hover:scale-[1]`}
                    style={{
                      backgroundColor: clr.colorCode,
                      borderColor:
                        clr.color === selectedColor ? "#f47c20" : "#DDD",
                    }}
                  ></button>
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
                    } scale-[.96] rounded border px-2.5 py-1.5 text-sm duration-300 hover:scale-[1] hover:border-primary`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 border-y py-3">
            <h3 className="text-sm">Quantity: </h3>

            <div className="flex gap-2">
              <button
                onClick={handelDecrease}
                className="duration-200 hover:text-neutral"
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
                className="duration-200 hover:text-neutral"
              >
                <FiPlusCircle />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 grid grid-cols-4 items-center gap-1">
            <button
              onClick={() => setModal(false)}
              className="flex scale-[.97] items-center justify-center rounded bg-red-500 px-1.5 py-2 text-lg text-base-100 duration-300 hover:scale-[1]"
            >
              <ImCross />
            </button>
            <button
              onClick={handelAddToCart}
              title="Add to Cart"
              className="flex scale-[.97] items-center justify-center rounded bg-accent px-1.5 py-2 text-xl text-base-100 duration-300 hover:scale-[1]"
            >
              <FaCartPlus />
            </button>
            <button
              onClick={handleBuyNow}
              className="col-span-2 flex w-full scale-[.97] items-center justify-center gap-1 rounded bg-primary px-1.5 py-2 text-sm text-base-100 duration-300 hover:scale-[1]"
            >
              <IoBagCheckOutline />
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <div className="product_card">
          <div className="flex h-full flex-col justify-between rounded shadow">
            <Link to={`/product/${slug}?discount=${newDiscount}`}>
              <div className="relative h-60 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/products/${images[0]}`}
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
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-primary sm:text-lg">
                    ৳
                    {variants?.length > 0
                      ? parseInt(
                          variants[0]?.sellingPrice -
                            (variants[0]?.sellingPrice * newDiscount) / 100,
                        )
                      : parseInt(
                          sellingPrice - (sellingPrice * newDiscount) / 100,
                        )}
                  </p>

                  {newDiscount > 0 && (
                    <del className="text-xs text-red-400 sm:text-sm">
                      ৳
                      {variants?.length > 0
                        ? parseInt(variants[0]?.sellingPrice)
                        : parseInt(sellingPrice)}
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

              <div className="grid grid-cols-2 gap-2 p-2">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
