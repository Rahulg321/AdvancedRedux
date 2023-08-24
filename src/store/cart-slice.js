import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  // [ {name:"",price:00,quantity:12,totalPrice:123} ]
  items: [],
  totalQuantity: 0,
  //   totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log("newItem", newItem);

      const existingItem = state.items.find((item) => {
        return item.id === newItem.id;
      });

      state.totalQuantity += 1;

      if (existingItem) {
        console.log("existing Item -> ", existingItem);
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      } else {
        state.items.push({
          title: newItem.title,
          quantity: 1,
          totalPrice: newItem.price,
          id: newItem.id,
          price: newItem.price,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => {
        return item.id === id;
      });
      state.totalQuantity -= 1;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    clearCartItems(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
