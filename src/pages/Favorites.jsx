import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Globe, LayoutGrid, List, Grid3X3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { COUNTRIES_SCROLL_POS_KEY } from '../constants/storageKeys';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('viewMode') || 'grid');

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

  return (
    <div className="min-vh-100" style={{ paddingTop: '80px', paddingBottom: '3rem' }}>
      <div className="container-fluid">
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

        {/* Favorites Count + View toggle */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2"
          >
            <p className="text-muted mb-0">
              {favorites.length} pays favori{favorites.length > 1 ? 's' : ''}
            </p>
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
        )}

        {/* Favorites */}
        {favorites.length > 0 ? (
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
            {favorites.map((country, index) => (
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
