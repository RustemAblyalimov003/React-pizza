import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/FilterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/PizzasSlice";
export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
