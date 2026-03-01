import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, LayoutGrid, List, Grid3X3 } from 'lucide-react';
import CountryCard from '../components/CountryCard';
import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import { countriesAPI } from '../utils/api';
import { useCountryFilters } from '../hooks/useCountryFilters';
import { usePagination } from '../hooks/usePagination';
import { COUNTRIES_SCROLL_POS_KEY } from '../constants/storageKeys';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [viewMode, setViewMode] = useState(() => localStorage.getItem('viewMode') || 'grid');

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    totalItems,
    goToPage,
    changeItemsPerPage,
    resetPagination
  } = usePagination(filteredCountries, viewMode === 'compact' ? 24 : 12);
  const pendingScrollRef = useRef(null);

  const changeViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
    changeItemsPerPage(mode === 'compact' ? 24 : 12);
  };

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
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
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
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
            className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2"
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
          {paginatedData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
