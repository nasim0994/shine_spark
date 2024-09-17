import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { FiHeart, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAddCall } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart } from "../../Redux/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/wishlist/wishlistSlice";
import ReactShare from "./ReactShare/ReactShare";

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const wishlists = useSelector((state) => state.wishlist.wishlists);

  const {
    slug,
    title,
    images,
    discount,
    brand,
    category,
    subCategory,
    subSubCategory,
    sellingPrice,
    quantity,
    variants,
  } = product;

  // Total Stock
  const totakStock = variants?.length
    ? variants?.reduce(
        (quantity, item) => parseInt(quantity) + parseInt(item.quantity),
        0
      )
    : quantity;
  const price = variants?.length ? variants[0]?.sellingPrice : sellingPrice;

  const [showImage, setShowImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [availableStock, setAvailableStock] = useState(totakStock);
  const [selectedPrice, setSelectedPrice] = useState(price);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});

  const [colors, setColors] = useState([]);
  const sizes = [
    ...new Set(variants?.map((size) => size.size !== undefined && size.size)),
  ];

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
        variant.color === selectedColor && variant.size === selectedSize
    );
    setSelectedVariant(findVariant);

    if (findVariant) {
      setAvailableStock(findVariant?.quantity);
      setSelectedPrice(findVariant?.sellingPrice);
    } else {
      setAvailableStock(totakStock);
      setSelectedPrice(price);
    }
  }, [selectedSize, selectedColor, totakStock, price, variants]);

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handelColorSelect = (clr) => {
    if (selectedColor === clr.color) {
      setSelectedColor("");
    } else {
      setSelectedColor(clr.color);
    }
  };

  useEffect(() => {
    if (availableStock < selectedQuantity) {
      setSelectedQuantity(1);
    }
  }, [availableStock, selectedQuantity]);

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
      discount: discount,
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
      discount: discount,
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
        product.color === cartProduct.color
    );

    if (findProduct) {
      return Swal.fire("", "Product already added to cart", "warning");
    } else {
      dispatch(addToCart([...carts, cartProduct]));
      Swal.fire("", "Item added to cart successfully", "success");
    }
  };

  const handelAddToWishlist = (product) => {
    const findProduct = wishlists?.find((item) => item._id === product._id);

    if (findProduct) {
      dispatch(removeFromWishlist(product));
      return Swal.fire("", "Product removed from wishlist", "warning");
    } else {
      dispatch(addToWishlist([...wishlists, product]));
      Swal.fire("", "Product added to wishlist successfully", "success");
    }
  };
  const isWishlist = wishlists?.find((item) => item._id === product._id);

  // const img = `${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`;

  return (
    <div className="lg:flex gap-6">
      {/* Image */}
      <div className="lg:w-[42%]">
        <div className="relative">
          {/* <img src={img} alt="" className="w-full h-[350px] rounded" /> */}
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
            alt=""
            className="w-full h-[350px] rounded"
          />

          {/* Discount */}
          {discount > 0 && (
            <div className="absolute top-1 text-base-100 right-0 bg-red-600 w-max rounded-l-full px-2 py-px">
              <p>{discount}%</p>
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <div key={index} onClick={() => setShowImage(img)}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${img}`}
                alt=""
                className="w-full h-12 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="lg:w-[58%] mt-4 lg:mt-0">
        {/* title  */}
        <div>
          <h1 className="text-2xl font-medium text-neutral">{title}</h1>
          <div className="text-sm">
            <p>
              <span className="text-neutral/80">Brand:</span>{" "}
              <span>{brand ? brand : "No Brand"}</span>
            </p>
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

        {/*  wishlist */}
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={() => handelAddToWishlist(product)}
            className={`shadow-lg p-3 rounded-full ${
              isWishlist && "bg-primary text-base-100"
            }`}
          >
            <FiHeart />
          </button>
        </div>

        {/* Price */}
        <div className="py-3 border-y mt-3">
          <div className="flex gap-6 items-center">
            <p className="text-neutral opacity-70">Price: </p>

            <div className="flex items-end gap-2">
              <p className="text-primary text-2xl font-medium">
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
          <div className="flex gap-4 items-center my-4">
            <p>Color :</p>

            <div className="flex gap-2 items-center">
              {colors?.map((clr) => (
                <button
                  key={clr._id}
                  onClick={() => handelColorSelect(clr)}
                  className={`text-sm p-4 rounded-full border scale-[.96] hover:scale-[1] duration-300`}
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
          <div className="flex gap-4 items-center my-4">
            <p>Size :</p>

            <div className="flex gap-2 items-center">
              {sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => handelSelectSize(size)}
                  className={`${
                    size === selectedSize && "bg-primary text-base-100"
                  } text-[15px] py-1.5 px-2.5 rounded border scale-[.96] hover:scale-[1] hover:border-primary duration-300`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="py-3 flex gap-4 items-center border-y">
          <h3>Quantity: </h3>

          <div className="flex gap-2">
            <button
              onClick={handelDecrease}
              className="text-2xl hover:text-neutral duration-200"
            >
              <FiMinusCircle />
            </button>
            <div>
              <p className="w-10 font-semibold text-center">
                {selectedQuantity}
              </p>
            </div>
            <button
              onClick={handelIncrease}
              className="text-2xl hover:text-neutral duration-200"
            >
              <FiPlusCircle />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center mt-6">
          <button
            onClick={handleBuyNow}
            className="bg-primary text-base-100 px-2 py-1.5 rounded scale-[.97] hover:scale-[1] duration-300 flex items-center justify-center gap-1"
          >
            <IoBagCheckOutline />
            Buy Now
          </button>

          <button
            onClick={handelAddToCart}
            className="bg-accent text-base-100 px-2 py-1.5 rounded flex items-center gap-1 justify-center scale-[.97] hover:scale-[1] duration-300"
          >
            <FaOpencart />
            Add To Cart
          </button>

          <Link
            to=""
            className="bg-secondary text-base-100 px-2 py-1.5 rounded flex items-center gap-1 justify-center scale-[.97] hover:scale-[1] duration-300"
          >
            <MdAddCall />
            Call Now
          </Link>
        </div>

        {/* Share */}
        <div className="mt-4 flex items-center gap-3">
          <p className="text-gray-500">Share: </p>
          <ReactShare slug={slug} />
        </div>
      </div>
    </div>
  );
}
