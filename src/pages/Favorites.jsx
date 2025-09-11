import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '../contexts/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

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

        {/* Favorites Count */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <p className="text-muted">
              {favorites.length} pays favori{favorites.length > 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="row g-4"
          >
            {favorites.map((country, index) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="col-sm-6 col-lg-4 col-xl-3"
              >
                <CountryCard country={country} />
              </motion.div>
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
