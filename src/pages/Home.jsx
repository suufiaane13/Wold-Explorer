<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, LayoutGrid, List, Grid3X3 } from 'lucide-react';
=======
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
import CountryCard from '../components/CountryCard';
import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import { countriesAPI } from '../utils/api';
import { useCountryFilters } from '../hooks/useCountryFilters';
import { usePagination } from '../hooks/usePagination';
<<<<<<< HEAD
import { COUNTRIES_SCROLL_POS_KEY } from '../constants/storageKeys';
=======
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
=======
  // Utiliser les hooks personnalisés pour les filtres et la pagination
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
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

<<<<<<< HEAD
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('viewMode') || 'grid');

=======
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    totalItems,
    goToPage,
    changeItemsPerPage,
    resetPagination
<<<<<<< HEAD
  } = usePagination(filteredCountries, viewMode === 'compact' ? 24 : 12);
  const pendingScrollRef = useRef(null);

  const changeViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
    changeItemsPerPage(mode === 'compact' ? 24 : 12);
  };
=======
  } = usePagination(filteredCountries, 12);


>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6

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

<<<<<<< HEAD
  // Restaurer la page au retour depuis une page pays
  useEffect(() => {
    if (loading) return;
    try {
      const saved = sessionStorage.getItem(COUNTRIES_SCROLL_POS_KEY);
      if (!saved) return;
      const data = JSON.parse(saved);
      const { y, path, page } = data;
      if (path !== '/') return;
      sessionStorage.removeItem(COUNTRIES_SCROLL_POS_KEY);
      const scrollY = Number(y) || 0;
      const pageToRestore = typeof page === 'number' && page >= 1
        ? Math.min(page, Math.max(1, totalPages))
        : 1;
      pendingScrollRef.current = { y: scrollY, targetPage: pageToRestore };
      if (pageToRestore !== currentPage) {
        goToPage(pageToRestore);
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (pendingScrollRef.current) {
              window.scrollTo({ top: pendingScrollRef.current.y, behavior: 'auto' });
              pendingScrollRef.current = null;
            }
          });
        });
      }
    } catch (_) {}
  }, [loading, currentPage, totalPages, goToPage]);

  // Appliquer le scroll une fois la bonne page affichée
  useEffect(() => {
    if (loading || !pendingScrollRef.current) return;
    if (currentPage !== pendingScrollRef.current.targetPage) return;
    const { y } = pendingScrollRef.current;
    pendingScrollRef.current = null;
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: 'auto' });
    });
  }, [loading, currentPage]);

  // Remonter vers la première country quand on change de page ou "X par page" (sauf au retour d'un pays)
  useEffect(() => {
    if (pendingScrollRef.current) return;
    const el = document.getElementById('countries-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage, itemsPerPage]);

=======
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6

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
<<<<<<< HEAD
          <p className="text-muted mb-4">{error}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setError(null);
              setLoading(true);
              countriesAPI.getAllCountries()
                .then(setCountries)
                .catch((err) => {
                  setError('Erreur lors du chargement des pays');
                  console.error(err);
                })
                .finally(() => setLoading(false));
            }}
          >
            Réessayer
          </button>
=======
          <p className="text-muted">{error}</p>
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
<<<<<<< HEAD
      {/* Hero Section — Professional Responsive */}
      <section className="hero-section" aria-label="Présentation">

        {/* Background */}
        <div className="hero-bg" aria-hidden="true" />

        {/* Overlay gradient */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* Content */}
        <div className="hero-content-wrapper w-100">
          <div className="container text-center text-white px-3 px-md-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', flexShrink: 0 }} />
                195+ pays disponibles
              </motion.div>

              {/* Heading */}
              <h1 className="hero-heading fw-bold mb-3">
                Explorez le{' '}
                <span
                  style={{ color: '#38bdf8', position: 'relative', display: 'inline-block' }}
                >
                  Monde
                  {/* Underline décoratif */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 8"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '100%',
                      height: 'auto',
                      overflow: 'visible'
                    }}
                  >
                    <path
                      d="M2 6 Q30 2 60 5 Q90 8 118 4"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <motion.p
                className="hero-subtitle text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                Découvrez 195+ pays, leurs cultures fascinantes,<br className="d-none d-md-inline" />
                leurs données uniques et leurs merveilles cachées
              </motion.p>

              {/* CTA */}
              <motion.div
                className="d-flex justify-content-center mb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={() =>
                    document.getElementById('countries-section')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Commencer l'exploration →
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                role="list"
                aria-label="Chiffres clés"
              >
                {[
                  { value: '7',   label: 'Continents' },
                  { value: '8B+', label: 'Habitants' },
                  { value: '∞',   label: 'Découvertes' }
                ].map((s) => (
                  <div key={s.label} className="hero-stat" role="listitem">
                    <span className="hero-stat-value">{s.value}</span>
                    <span className="hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="hero-scroll-hint"
                aria-hidden="true"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
=======
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
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
              </motion.div>
            </motion.div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Wave */}
        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
=======
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
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
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
<<<<<<< HEAD
            className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2"
=======
            className="mb-4 d-flex justify-content-between align-items-center flex-wrap"
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
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
<<<<<<< HEAD

            {/* View mode toggle */}
            <div className="btn-group btn-group-sm" role="group" aria-label="Mode d'affichage">
              {[
                { mode: 'grid', icon: LayoutGrid, label: 'Grille' },
                { mode: 'list', icon: List, label: 'Liste' },
                { mode: 'compact', icon: Grid3X3, label: 'Compact' },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  type="button"
                  className={`btn ${viewMode === mode ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => changeViewMode(mode)}
                  aria-label={label}
                  title={label}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Countries */}
=======
          </motion.div>

          {/* Countries Grid */}
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
          {paginatedData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
<<<<<<< HEAD
              className={
                viewMode === 'list'
                  ? 'cc-list-container'
                  : viewMode === 'compact'
                    ? 'row g-2 g-md-3'
                    : 'row g-4'
              }
            >
              {paginatedData.map((country, index) => (
                <div
                  key={country.cca3}
                  className={
                    viewMode === 'list'
                      ? ''
                      : viewMode === 'compact'
                        ? 'col-6 col-md-4 col-lg-2'
                        : 'col-sm-6 col-md-4 col-lg-3'
                  }
                >
                  <CountryCard
                    country={country}
                    index={index}
                    currentPage={currentPage}
                    viewMode={viewMode}
=======
              className="row g-4"
            >
              {paginatedData.map((country, index) => (
                <div key={country.cca3} className="col-sm-6 col-md-4 col-lg-3">
                  <CountryCard
                    country={country}
                    index={index}
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
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
