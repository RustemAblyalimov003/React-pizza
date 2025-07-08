import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPizzaCartPropsFromLS } from "../../utils/getPizzaArrFromLS";

let { pizzaArrFromLS, pizzaCountFromLS, pizzaFullPriceFromLS } =
  getPizzaCartPropsFromLS();

export type Pizaa = {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  fullPrice: number;
};
type PizzaState = {
  items: Pizaa[];
  itemsCount: number;
  priceOfAllItems: number;
};
const initialState: PizzaState = {
  items: pizzaArrFromLS ? pizzaArrFromLS : [],
  itemsCount: pizzaCountFromLS ? pizzaCountFromLS : 0,
  priceOfAllItems: pizzaFullPriceFromLS ? pizzaFullPriceFromLS : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPizza(state, action: PayloadAction<Pizaa>) {
      let obj = action.payload;
      let equel = state.items.find((item) => {
        return (
          item.title === obj.title &&
          item.type === obj.type &&
          item.size === obj.size
        );
      });
      if (equel !== undefined) {
        equel.count += 1;
        equel.fullPrice += obj.price;
        state.priceOfAllItems += obj.price;
        state.itemsCount += 1;
      } else {
        obj.id = Math.random();
        obj.fullPrice += obj.price;
        state.items.push(obj);
        state.itemsCount += 1;
        state.priceOfAllItems += obj.price;
      }
    },
    incrementCount(
      state,
      action: PayloadAction<{ price: number; id: number }>
    ) {
      const { id, price } = action.payload;
      let neededItem = state.items.find((item) => {
        return item.id === id;
      });
      neededItem.count += 1;
      neededItem.fullPrice += price;
      state.priceOfAllItems += price;
      state.itemsCount += 1;
    },
    dicrementCount(
      state,
      action: PayloadAction<{ price: number; id: number }>
    ) {
      let { id, price } = action.payload;
      let neededItem = state.items.find((item) => {
        return item.id === id;
      });

      neededItem.count -= 1;
      neededItem.fullPrice -= price;
      state.priceOfAllItems -= price;
      state.itemsCount -= 1;

      if (neededItem.count < 1) {
        const index = state.items.indexOf(neededItem);
        state.items.splice(index, 1);
      }
    },
    itemRemove(state, action: PayloadAction<number>) {
      const id = action.payload;
      let neededItem = state.items.find((item) => {
        return item.id === id;
      });
      const indexOfneededItem = state.items.indexOf(neededItem);
      state.itemsCount -= neededItem.count;
      state.priceOfAllItems -= neededItem.fullPrice;
      state.items.splice(indexOfneededItem, 1);
    },
    removeAllItems(state) {
      state.items.splice(0, state.items.length);
      state.itemsCount = 0;
      state.priceOfAllItems = 0;
    },
  },
});
export const {
  setPizza,
  incrementCount,
  dicrementCount,
  itemRemove,
  removeAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;
