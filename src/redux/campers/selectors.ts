import { RootState } from "../store";

export const selectCampers = (state: RootState) => state.campers.list;
export const selectCamper = (state: RootState) => state.campers.item;
export const selectIsLoading = (state: RootState) => state.campers.isLoading;
export const selectError = (state: RootState) => state.campers.error;
export const selectTotalItems = (state: RootState) => state.campers.totalItems;
