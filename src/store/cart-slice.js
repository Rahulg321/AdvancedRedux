import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find((item) => {
        return item.id === newItem.id;
      });
      
      console.log("existing item", existingItem);
      state.totalQuantity += 1;
      state.changed = true;

      if (existingItem) {
        
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
      state.changed = true;

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
