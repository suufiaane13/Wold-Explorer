import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
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

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
