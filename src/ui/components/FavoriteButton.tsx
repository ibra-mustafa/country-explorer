import React from 'react';
import { useFavoritesStore } from '../../core/store/favoritesStore';
import type { Country } from '../../core/models/Country';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  country: Country;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ country }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const countryId = country.cca3 ?? country.name;
  const favorite = isFavorite(countryId);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(countryId);
    } else {
      addFavorite(country);
    }
  };

  return (
    <button
      className={`${styles.favoriteButton} ${favorite ? styles.active : ''}`}
      onClick={toggleFavorite}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;