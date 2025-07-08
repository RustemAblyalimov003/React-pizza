import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
export type sort = {
  id: number;
  name: string;
  sortProperty: string;
};
export type filtrsType = {
  categoryId: number;
  sort: sort;
  sortOrder: string;
  searchValue?: string;
};
const initialState: filtrsType = {
  categoryId: 0,
  sort: {
    id: 1,
    name: "популярности",
    sortProperty: "rating",
  },
  sortOrder: "",
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<sort>) {
      state.sort = action.payload;
    },
    setSortOrder(state, action: PayloadAction<string>) {
      state.sortOrder = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<{ sort: sort; params: filtrsType }>
    ) {
      const { params, sort } = action.payload;
      state.categoryId = params.categoryId;
      state.sortOrder = params.sortOrder;
      state.sort = sort;
      state.searchValue = params.searchValue ?? "";
    },
    setsearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});
export const {
  setCategoryId,
  setSort,
  setSortOrder,
  setFilters,
  setsearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
