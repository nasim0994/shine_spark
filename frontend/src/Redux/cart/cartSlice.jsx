import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartValue = {
  carts: [],
};

const loadState = () => {
  const storedState = localStorage.getItem("cartState");

  return storedState ? JSON.parse(storedState) : cartValue;
};

const initialState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.carts = action.payload;

      localStorage.setItem("cartState", JSON.stringify(state));
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

export const { addToCart, removeFromCart, clearCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
