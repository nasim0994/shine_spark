import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wishlists: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const existItem = state?.wishlists?.find(
        (item) => item?._id === product?._id,
      );

      if (existItem) {
        toast.error("This product is already in your wishlist");
      } else {
        const newProduct = {
          _id: product?._id,
          slug: product?.slug,
          title: product?.title,
          thumbnail: product?.thumbnail,
          price: product?.sellingPrice,
          discount: product?.discount,
        };
        state.wishlists.push(newProduct);
        toast.success("Product added to wishlist");
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlists = state.wishlists.filter((item) => item._id !== id);
    },
    clearWishlist: (state) => {
      state.wishlists = [];
    },
  },
});

export const checkIsProductInWishlist = (state, _id) => {
  return state?.wishlist?.wishlists?.some((item) => item?._id === _id);
};

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
