import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Globe, LayoutGrid, List, Grid3X3, Search, X, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { COUNTRIES_SCROLL_POS_KEY } from '../constants/storageKeys';

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Nom (A-Z)' },
  { value: 'name-desc', label: 'Nom (Z-A)' },
  { value: 'pop-desc', label: 'Population (décroissant)' },
  { value: 'pop-asc', label: 'Population (croissant)' },
];

const Favorites = () => {
  const { favorites } = useFavorites();
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('viewMode') || 'grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  const changeViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
  };

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(COUNTRIES_SCROLL_POS_KEY);
      if (!saved) return;
      const { y, path } = JSON.parse(saved);
      if (path !== '/favorites') return;
      sessionStorage.removeItem(COUNTRIES_SCROLL_POS_KEY);
      requestAnimationFrame(() => {
        window.scrollTo({ top: Number(y) || 0, behavior: 'auto' });
      });
    } catch (_) {}
  }, []);

  const filteredFavorites = useMemo(() => {
    let list = [...favorites];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(c =>
        c.name?.common?.toLowerCase().includes(term) ||
        c.translations?.fra?.common?.toLowerCase().includes(term) ||
        c.capital?.[0]?.toLowerCase().includes(term) ||
        c.region?.toLowerCase().includes(term)
      );
    }

    const [field, dir] = sortBy.split('-');
    list.sort((a, b) => {
      if (field === 'name') {
        const na = (a.translations?.fra?.common || a.name?.common || '').toLowerCase();
        const nb = (b.translations?.fra?.common || b.name?.common || '').toLowerCase();
        return dir === 'asc' ? na.localeCompare(nb) : nb.localeCompare(na);
      }
      const pa = a.population || 0;
      const pb = b.population || 0;
      return dir === 'asc' ? pa - pb : pb - pa;
    });

    return list;
  }, [favorites, searchTerm, sortBy]);

  return (
    <div className="min-vh-100" style={{ paddingTop: '80px', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link
            to="/"
            className="btn btn-outline-secondary d-flex align-items-center"
            style={{ width: 'fit-content' }}
          >
            <ArrowLeft size={20} className="me-2" />
            <span>Retour à l'accueil</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <div className="d-flex align-items-center justify-content-center mb-4">
            <div className="p-3 bg-danger rounded-3 text-white me-3">
              <Heart size={32} fill="currentColor" />
            </div>
            <h1 className="display-4 fw-bold text-primary mb-0">
              Mes Favoris
            </h1>
          </div>
          <p className="lead text-muted">
            Retrouvez tous vos pays préférés en un seul endroit.
          </p>
        </motion.div>

        {/* Search / Sort / View controls */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            {/* Search Bar — same as Home */}
            <div className="row g-3 mb-3">
              <div className="col-12">
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher un favori par nom, capitale ou région..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="form-control ps-5 pe-5 py-3 rounded-pill"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-1"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filters Row — same style as Home */}
            <div className="row g-3">
              {/* Sort Dropdown */}
              <div className="col-md-4">
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
                        {SORT_OPTIONS.find(s => s.value === sortBy)?.label || 'Trier par'}
                      </span>
                    </div>
                  </motion.button>
                  <ul className="dropdown-menu w-100 rounded-3 shadow">
                    {SORT_OPTIONS.map(option => (
                      <li key={option.value}>
                        <button
                          onClick={() => setSortBy(option.value)}
                          className={`dropdown-item py-2 ${option.value === sortBy ? 'active' : ''}`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="col-md-4">
                {(searchTerm || sortBy !== 'name-asc') && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setSearchTerm(''); setSortBy('name-asc'); }}
                    className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center"
                  >
                    <X size={16} className="me-2" />
                    <span>Effacer filtres</span>
                  </motion.button>
                )}
              </div>

              {/* View mode toggle */}
              <div className="col-md-4 d-flex align-items-center justify-content-md-end">
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
              </div>
            </div>

            {/* Results count */}
            <p className="text-muted mb-0 mt-3 small">
              {filteredFavorites.length} / {favorites.length} pays favori{favorites.length > 1 ? 's' : ''}
              {searchTerm && ` pour "${searchTerm}"`}
            </p>
          </motion.div>
        )}

        {/* Favorites */}
        {favorites.length > 0 ? (
          filteredFavorites.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={
                viewMode === 'list'
                  ? 'cc-list-container'
                  : viewMode === 'compact'
                    ? 'row g-2 g-md-3'
                    : 'row g-4'
              }
            >
              {filteredFavorites.map((country, index) => (
                <div
                  key={country.cca3}
                  className={
                    viewMode === 'list'
                      ? ''
                      : viewMode === 'compact'
                        ? 'col-6 col-md-4 col-lg-2'
                        : 'col-sm-6 col-lg-4 col-xl-3'
                  }
                >
                  <CountryCard country={country} index={index} viewMode={viewMode} />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-5">
              <Search size={48} className="text-muted mb-3" />
              <p className="text-muted">Aucun favori ne correspond à "{searchTerm}"</p>
            </div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-5"
          >
            <div className="text-muted mb-4">
              <Heart size={64} className="mx-auto" />
            </div>
            <h3 className="h4 mb-3">
              Aucun favori pour le moment
            </h3>
            <p className="text-muted mb-4">
              Explorez les pays du monde et ajoutez vos préférés en cliquant sur le cœur.
            </p>
            <Link
              to="/"
              className="btn btn-primary d-flex align-items-center mx-auto"
              style={{ width: 'fit-content' }}
            >
              <Globe size={20} className="me-2" />
              <span>Explorer les pays</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
