import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Country } from '../models/Country';

interface FavoritesState {
  favorites: { [key: string]: Country };
  addFavorite: (country: Country) => void;
  removeFavorite: (countryId: string) => void;
  isFavorite: (countryId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      addFavorite: (country) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [country.cca3 ?? country.name]: country,
          },
        })),
      removeFavorite: (countryId) =>
        set((state) => {
          const newFavorites = { ...state.favorites };
          delete newFavorites[countryId];
          return { favorites: newFavorites };
        }),
      isFavorite: (countryId) => !!get().favorites[countryId],
    }),
    {
      name: 'country-favorites',
    }
  )
);