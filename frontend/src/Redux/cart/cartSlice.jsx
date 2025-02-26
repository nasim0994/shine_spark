import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  carts: [],
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        product,
        selectedSize,
        selectedColor,
        quantity,
        price,
        discount,
      } = action.payload;

      // Check if the product is already in the cart
      const cartItem = state?.carts.find((item) => {
        if (selectedSize && selectedColor) {
          return (
            item._id === product._id &&
            item.size === selectedSize &&
            item.color === selectedColor
          );
        }
        return item._id === product._id;
      });

      if (cartItem) {
        toast.error("Product already in cart");
        return;
      }

      const cartProduct = {
        _id: product._id,
        slug: product?.slug,
        title: product.title,
        price,
        discount,
        thumbnail: product.thumbnail,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      };

      state.carts.push(cartProduct);
      // localStorage.setItem("cartState", JSON.stringify(state));
      toast.success("Product added to cart");
    },

    removeFromCart: (state, action) => {
      const { id, sku } = action.payload;

      const index = state.carts.findIndex((item) => {
        if (sku) {
          return item._id === id && item.sku == sku;
        }
        return item._id === id;
      });

      state.carts.splice(index, 1);

      localStorage.setItem("cartState", JSON.stringify(state));

      toast.success("Item removed from cart");
    },

    clearCart: (state) => {
      state.carts = [];

      localStorage.setItem("cartState", JSON.stringify(state));
      toast.success("Item removed from cart");
    },

    changeQuantity: (state, action) => {
      const { id, sku, quantity } = action.payload;

      const cartItem = state.carts.find((item) => {
        if (sku) {
          return item._id === id && item.sku == sku;
        }
        return item._id === id;
      });

      cartItem.quantity = quantity;

      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const subTotalSelector = (state) => {
  let subTotal = 0;
  state.cart.carts.forEach((item) => {
    if (item.discount > 0) {
      subTotal += item.price - (item.price * item.discount) / 100;
    } else {
      subTotal += item.price;
    }
  });

  return parseInt(subTotal);
};

export const { addToCart, removeFromCart, clearCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
