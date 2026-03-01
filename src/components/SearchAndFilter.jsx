import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Users, MapPin, SlidersHorizontal } from 'lucide-react';

const SearchAndFilter = ({ 
  onSearch, 
  onFilterRegion, 
  onFilterPopulation,
  onSortBy,
  searchTerm, 
  selectedRegion,
  populationFilter,
  sortBy,
  onClearFilters 
}) => {
  const regions = [
    'All',
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania'
  ];

  const populationRanges = [
    { label: 'Toutes populations', value: 'all' },
    { label: 'Moins de 1M', value: 'small', min: 0, max: 1000000 },
    { label: '1M - 10M', value: 'medium', min: 1000000, max: 10000000 },
    { label: '10M - 50M', value: 'large', min: 10000000, max: 50000000 },
    { label: 'Plus de 50M', value: 'huge', min: 50000000, max: Infinity }
  ];

  const sortOptions = [
    { label: 'Nom (A-Z)', value: 'name-asc' },
    { label: 'Nom (Z-A)', value: 'name-desc' },
    { label: 'Population (croissant)', value: 'population-asc' },
    { label: 'Population (décroissant)', value: 'population-desc' },
    { label: 'Superficie (croissant)', value: 'area-asc' },
    { label: 'Superficie (décroissant)', value: 'area-desc' }
  ];

  const handleRegionSelect = (region) => {
    onFilterRegion(region === 'All' ? '' : region);
  };

  const handlePopulationSelect = (range) => {
    onFilterPopulation(range === 'all' ? null : range);
  };

  const handleSortSelect = (sort) => {
    onSortBy(sort);
  };

  const hasActiveFilters = searchTerm || selectedRegion || populationFilter || sortBy !== 'name-asc';

  return (
    <div className="mb-4">
      {/* Search Bar */}
      <div className="row g-3 mb-3">
        <div className="col-12">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
            <input
              type="text"
              placeholder="Rechercher un pays par nom ou capitale..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="form-control ps-5 pe-5 py-3 rounded-pill"
            />
            {searchTerm && (
              <button
                onClick={() => onSearch('')}
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-1"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="row g-3">
        {/* Region Filter */}
        <div className="col-md-3">
          <div className="dropdown">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline-primary dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between"
              type="button"
              data-bs-toggle="dropdown"
            >
              <div className="d-flex align-items-center">
                <MapPin size={16} className="me-2" />
                <span className="text-truncate">{selectedRegion || 'Continent'}</span>
              </div>
            </motion.button>
            
            <ul className="dropdown-menu w-100 rounded-3 shadow">
              {regions.map((region) => (
                <li key={region}>
                  <button
                    onClick={() => handleRegionSelect(region)}
                    className={`dropdown-item py-2 ${
                      (region === 'All' && !selectedRegion) || region === selectedRegion
                        ? 'active'
                        : ''
                    }`}
                  >
                    {region === 'All' ? 'Tous les continents' : region}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Population Filter */}
        <div className="col-md-3">
          <div className="dropdown">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline-secondary dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between"
              type="button"
              data-bs-toggle="dropdown"
            >
              <div className="d-flex align-items-center">
                <Users size={16} className="me-2" />
                <span className="text-truncate">
                  {populationRanges.find(r => r.value === populationFilter)?.label || 'Population'}
                </span>
              </div>
            </motion.button>
            
            <ul className="dropdown-menu w-100 rounded-3 shadow">
              {populationRanges.map((range) => (
                <li key={range.value}>
                  <button
                    onClick={() => handlePopulationSelect(range.value)}
                    className={`dropdown-item py-2 ${
                      (range.value === 'all' && !populationFilter) || range.value === populationFilter
                        ? 'active'
                        : ''
                    }`}
                  >
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="col-md-3">
          <div className="dropdown">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline-info dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between"
              type="button"
              data-bs-toggle="dropdown"
            >
              <div className="d-flex align-items-center">
                <SlidersHorizontal size={16} className="me-2" />
                <span className="text-truncate">
                  {sortOptions.find(s => s.value === sortBy)?.label || 'Trier par'}
                </span>
              </div>
            </motion.button>
            
            <ul className="dropdown-menu w-100 rounded-3 shadow">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    onClick={() => handleSortSelect(option.value)}
                    className={`dropdown-item py-2 ${
                      option.value === sortBy ? 'active' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="col-md-3">
          {hasActiveFilters && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClearFilters}
              className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center"
            >
              <X size={16} className="me-2" />
              <span>Effacer filtres</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
