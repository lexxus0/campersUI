import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Camper, filterParams } from "../../interfaces/interfaces";

const initialState: { filters: filterParams; filteredList: Camper[] } = {
  filters: { location: "", equipment: [], form: "" },
  filteredList: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<filterParams>) => {
      state.filters = action.payload;
    },
    setFilteredList: (state, action: PayloadAction<Camper[]>) => {
      state.filteredList = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setFilters, setFilteredList, resetFilters } =
  filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
