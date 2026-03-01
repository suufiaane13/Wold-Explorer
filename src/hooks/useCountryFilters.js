import { useState, useMemo } from 'react';

/**
 * Hook personnalisé pour gérer le filtrage et le tri des pays
 * @param {Array} countries - Liste des pays
 * @returns {Object} - État et fonctions de filtrage
 */
export const useCountryFilters = (countries) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [populationFilter, setPopulationFilter] = useState(null);
  const [sortBy, setSortBy] = useState('name-asc');

  // Définir les plages de population
  const populationRanges = {
    small: { min: 0, max: 1000000 },
    medium: { min: 1000000, max: 10000000 },
    large: { min: 10000000, max: 50000000 },
    huge: { min: 50000000, max: Infinity }
  };

  // Filtrer et trier les pays
  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries.filter(country => {
      // Filtre par terme de recherche (nom EN, nom FR, nom officiel, capitale)
      const term = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        country.name?.common?.toLowerCase().includes(term) ||
        country.name?.official?.toLowerCase().includes(term) ||
        country.translations?.fra?.common?.toLowerCase().includes(term) ||
        country.translations?.fra?.official?.toLowerCase().includes(term) ||
        country.capital?.[0]?.toLowerCase().includes(term);

      // Filtre par région
      const matchesRegion = !selectedRegion || country.region === selectedRegion;

      // Filtre par population
      const matchesPopulation = !populationFilter || (
        populationRanges[populationFilter] &&
        country.population >= populationRanges[populationFilter].min &&
        country.population < populationRanges[populationFilter].max
      );

      return matchesSearch && matchesRegion && matchesPopulation;
    });

    // Trier les résultats
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.name?.common || '').localeCompare(b.name?.common || '');
        case 'name-desc':
          return (b.name?.common || '').localeCompare(a.name?.common || '');
        case 'population-asc':
          return (a.population || 0) - (b.population || 0);
        case 'population-desc':
          return (b.population || 0) - (a.population || 0);
        case 'area-asc':
          return (a.area || 0) - (b.area || 0);
        case 'area-desc':
          return (b.area || 0) - (a.area || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [countries, searchTerm, selectedRegion, populationFilter, sortBy]);

  // Fonction pour effacer tous les filtres
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setPopulationFilter(null);
    setSortBy('name-asc');
  };

  // Statistiques des filtres
  const filterStats = useMemo(() => {
    return {
      totalCountries: countries.length,
      filteredCountries: filteredAndSortedCountries.length,
      hasActiveFilters: searchTerm || selectedRegion || populationFilter || sortBy !== 'name-asc'
    };
  }, [countries.length, filteredAndSortedCountries.length, searchTerm, selectedRegion, populationFilter, sortBy]);

  return {
    // États
    searchTerm,
    selectedRegion,
    populationFilter,
    sortBy,
    
    // Données filtrées
    filteredCountries: filteredAndSortedCountries,
    filterStats,
    
    // Fonctions de mise à jour
    setSearchTerm,
    setSelectedRegion,
    setPopulationFilter,
    setSortBy,
    clearFilters
  };
};
