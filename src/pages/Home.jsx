import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import CountryCard from '../components/CountryCard';
import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import { countriesAPI } from '../utils/api';
import { useCountryFilters } from '../hooks/useCountryFilters';
import { usePagination } from '../hooks/usePagination';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliser les hooks personnalisés pour les filtres et la pagination
  const {
    searchTerm,
    selectedRegion,
    populationFilter,
    sortBy,
    filteredCountries,
    filterStats,
    setSearchTerm,
    setSelectedRegion,
    setPopulationFilter,
    setSortBy,
    clearFilters
  } = useCountryFilters(countries);

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    totalItems,
    goToPage,
    changeItemsPerPage,
    resetPagination
  } = usePagination(filteredCountries, 12);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await countriesAPI.getAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Erreur lors du chargement des pays');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Réinitialiser la pagination seulement si on dépasse le nombre de pages disponibles
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      resetPagination();
    }
  }, [currentPage, totalPages, resetPagination]);


  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-primary"
        >
          <Loader2 size={48} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <AlertCircle className="mx-auto text-danger mb-4" size={48} />
          <h2 className="h4 mb-2">Erreur de chargement</h2>
          <p className="text-muted">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="position-relative overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
        {/* Background Image */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.8) 0%, rgba(16, 185, 129, 0.7) 100%)',
              backdropFilter: 'blur(1px)'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="position-relative d-flex align-items-center justify-content-center h-100" style={{ paddingTop: '80px' }}>
          <div className="container text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="display-2 display-md-1 fw-bold mb-4" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                Explorez le{' '}
                <span className="text-warning">Monde</span>
              </h1>
              <p className="lead fs-4 fs-md-3 mb-5 mx-auto" style={{ 
                maxWidth: '700px',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                lineHeight: '1.6'
              }}>
                Découvrez 195+ pays, leurs cultures fascinantes, leurs données uniques et leurs merveilles cachées
              </p>
              
              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-light btn-lg px-5 py-3 fw-semibold"
                  style={{ 
                    borderRadius: '50px',
                    boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
                    border: 'none'
                  }}
                  onClick={() => document.getElementById('countries-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  Commencer l'exploration
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                  style={{ 
                    borderRadius: '50px',
                    borderWidth: '2px'
                  }}
                >
                  En savoir plus
                </motion.button>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="row g-4 justify-content-center"
              >
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <h3 className="display-6 fw-bold mb-1">195+</h3>
                    <p className="mb-0 opacity-90">Pays</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <h3 className="display-6 fw-bold mb-1">7</h3>
                    <p className="mb-0 opacity-90">Continents</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <h3 className="display-6 fw-bold mb-1">8B+</h3>
                    <p className="mb-0 opacity-90">Habitants</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <h3 className="display-6 fw-bold mb-1">∞</h3>
                    <p className="mb-0 opacity-90">Découvertes</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        >
          <div className="text-white text-center">
            <div className="mb-2">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
            <small className="opacity-75">Scroll</small>
          </div>
        </motion.div>
      </section>

      {/* Countries Section */}
      <div id="countries-section" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div className="container-fluid">

        {/* Search and Filter */}
        <div className="container mb-4">
          <SearchAndFilter
            onSearch={setSearchTerm}
            onFilterRegion={setSelectedRegion}
            onFilterPopulation={setPopulationFilter}
            onSortBy={setSortBy}
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            populationFilter={populationFilter}
            sortBy={sortBy}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results Count and Stats */}
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 d-flex justify-content-between align-items-center flex-wrap"
          >
            <div>
              <p className="text-muted mb-1">
                {filterStats.filteredCountries} pays trouvé{filterStats.filteredCountries > 1 ? 's' : ''}
                {filterStats.totalCountries !== filterStats.filteredCountries && 
                  ` sur ${filterStats.totalCountries}`}
                {searchTerm && ` pour "${searchTerm}"`}
                {selectedRegion && ` en ${selectedRegion}`}
              </p>
              {filterStats.hasActiveFilters && (
                <small className="text-primary">
                  Filtres actifs • Page {currentPage} sur {totalPages}
                </small>
              )}
            </div>
          </motion.div>

          {/* Countries Grid */}
          {paginatedData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="row g-4"
            >
              {paginatedData.map((country, index) => (
                <div key={country.cca3} className="col-sm-6 col-md-4 col-lg-3">
                  <CountryCard
                    country={country}
                    index={index}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-5"
            >
              <div className="text-muted mb-4">
                <svg className="mx-auto" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="h5 mb-2">Aucun pays trouvé</h3>
              <p className="text-muted">
                Essayez de modifier vos critères de recherche ou de filtre.
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onItemsPerPageChange={changeItemsPerPage}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
