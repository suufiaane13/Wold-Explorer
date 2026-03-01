import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (country) => {
    setFavorites(prev => {
      if (!prev.find(fav => fav.cca3 === country.cca3)) {
        return [...prev, country];
      }
      return prev;
    });
  };

  const removeFromFavorites = (countryCode) => {
    setFavorites(prev => prev.filter(fav => fav.cca3 !== countryCode));
  };

  const isFavorite = (countryCode) => {
    return favorites.some(fav => fav.cca3 === countryCode);
  };

  const toggleFavorite = (country) => {
    if (isFavorite(country.cca3)) {
      removeFromFavorites(country.cca3);
    } else {
      addToFavorites(country);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};
