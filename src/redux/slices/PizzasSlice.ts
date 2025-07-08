import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type PizzaArrFromServerType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};
type pizzaType = {
  pizzas: PizzaArrFromServerType[];
  status: string;
};

export const fetchPizzas = createAsyncThunk<
  PizzaArrFromServerType[],
  Record<string, string | number>
>("pizza/fetchPizzasStatus", async (params) => {
  const { category, sortBy, order, search } = params;
  const response = await axios.get<PizzaArrFromServerType[]>(
    `https://679a59f6747b09cdccce9753.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return response.data;
});

const initialState: pizzaType = {
  pizzas: [],
  status: "",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.pizzas = [];
      });
  },
});
export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
