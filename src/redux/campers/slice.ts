import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./operations";
import { Camper, CampersState } from "../../interfaces/interfaces";
import { handlePending, handleRejected } from "../tools/tools";

const initialState: CampersState = {
  item: null,
  list: [],
  isLoading: false,
  error: null,
  filters: {
    location: "",
    equipment: [],
    form: "",
  },
  totalItems: 0,
  current: 1,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    clearCampers: (state) => {
      state.list = [];
      state.current = 1;
    },
    incrementPage: (state) => {
      state.current += 1;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCampers.pending, handlePending)
      .addCase(
        fetchCampers.fulfilled,
        (
          state,
          action: PayloadAction<{
            campers: Camper[];
            totalItems: number;
            totalPages: number;
          }>
        ) => {
          state.isLoading = false;
          state.list = [
            ...state.list,
            ...action.payload.campers.filter(
              (newCamper) =>
                !state.list.some(
                  (existingCamper) => existingCamper.id === newCamper.id
                )
            ),
          ];
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchCamperById.pending, handlePending)
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.item = action.payload;
      });
  },
});

export const { clearCampers, incrementPage } = campersSlice.actions;
export const CampersReducer = campersSlice.reducer;
