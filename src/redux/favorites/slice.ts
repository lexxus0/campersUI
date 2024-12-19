import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoritesState } from "../../interfaces/interfaces";

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const isFavorite = state.favorites.includes(id);
      if (isFavorite) {
        state.favorites = state.favorites.filter(
          (favoriteId) => favoriteId !== id
        );
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
