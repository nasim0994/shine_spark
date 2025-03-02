import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  carts: [],
  subTotal: 0,
  discountAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    buyNow: (state, action) => {
      const {
        product,
        selectedSize,
        selectedColor,
        quantity,
        price,
        discount,
        stock,
        sku,
      } = action.payload;

      const cartProduct = {
        _id: product._id,
        slug: product?.slug,
        title: product?.title,
        price,
        discount,
        thumbnail: product?.thumbnail,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        stock: stock,
        sku,
      };

      state.carts = [cartProduct];
      toast.success("Product added to cart");
    },

    addToCart: (state, action) => {
      const {
        product,
        selectedSize,
        selectedColor,
        quantity,
        price,
        discount,
        stock,
        sku,
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
        title: product?.title,
        price,
        discount,
        thumbnail: product?.thumbnail,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        stock: stock,
        sku,
      };

      state.carts.push(cartProduct);
      toast.success("Product added to cart");
    },

    removeFromCart: (state, action) => {
      const { _id, color, size } = action.payload;
      const targetIndex = state.carts.findIndex((item) => {
        if (size && color) {
          return item._id === _id && item.size === size && item.color === color;
        } else if (size) {
          return item._id === _id && item.size === size;
        } else if (color) {
          return item._id === _id && item.color === color;
        }
        return item._id === _id;
      });

      const newCarts = state.carts.filter(
        (item, index) => index !== targetIndex,
      );
      state.carts = newCarts;
      toast.success("Item removed from cart");
    },

    clearCart: (state) => {
      state.carts = [];
      toast.success("Item removed from cart");
    },

    changeQuantity: (state, action) => {
      const { id, color, size, quantity } = action.payload;

      const cartItem = state.carts.find((item) => {
        if (size && color) {
          return item._id === id && item.size == size && item.color == color;
        } else if (size) {
          return item._id === id && item.size == size;
        } else if (color) {
          return item._id === id && item.color == color;
        }
        return item._id === id;
      });

      if (cartItem.stock < quantity) {
        toast.error(
          "Sorry! We have only " + cartItem.stock + " items in stock.",
        );
        return;
      }

      cartItem.quantity = quantity;
    },
  },
});

export const subTotalSelector = (state) => {
  let subTotal = 0;
  state.cart.carts.forEach((item) => {
    if (item.discount > 0) {
      subTotal +=
        (item.price - (item.price * item.discount) / 100) * item?.quantity;
    } else {
      subTotal += item.price * item?.quantity;
    }
  });

  return subTotal;
};

export const discountAmountSelector = (state) => {
  let discountAmount = 0;
  state.cart.carts.forEach((item) => {
    if (item.discount > 0) {
      discountAmount += ((item.price * item.discount) / 100) * item?.quantity;
    }
  });

  return discountAmount;
};

export const { addToCart, removeFromCart, clearCart, changeQuantity, buyNow } =
  cartSlice.actions;

export default cartSlice.reducer;
