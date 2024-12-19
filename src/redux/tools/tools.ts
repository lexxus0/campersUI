import { PayloadAction } from "@reduxjs/toolkit";
import { CampersState } from "../../interfaces/interfaces";

export const handleError = (error: unknown, defaultMessage: string) => {
  return error instanceof Error ? error.message : defaultMessage;
};

export const handlePending = (state: CampersState) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: CampersState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? "An unknown error";
};
