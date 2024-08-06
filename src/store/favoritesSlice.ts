// store/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types/character.types';

interface FavoritesState {
  items: Character[];
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Character>) => {
      if (state.items.length < 5) {
        state.items.push(action.payload);
        state.error = null;
      } else {
        state.error = 'You can only have 5 favorites';
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(character => character.id !== action.payload);
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addFavorite, removeFavorite, clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
