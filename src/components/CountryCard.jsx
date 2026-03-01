<<<<<<< HEAD
import { motion } from 'framer-motion';
import { Heart, Users, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { COUNTRIES_SCROLL_POS_KEY } from '../constants/storageKeys';
import { formatPopulation } from '../utils/formatters';

const CountryCard = ({ country, index, currentPage, viewMode = 'grid' }) => {
  const { pathname } = useLocation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(country.cca3);

  const saveScroll = () => {
    try {
      const payload = { y: window.scrollY, path: pathname };
      if (currentPage != null) payload.page = currentPage;
      sessionStorage.setItem(COUNTRIES_SCROLL_POS_KEY, JSON.stringify(payload));
    } catch (_) {}
  };

  const flagSrc = country.flags?.svg || country.flags?.png;
  const name = country.name?.common;
  const capital = country.capital?.[0] || 'N/A';
  const pop = formatPopulation(country.population, 'short');
  const link = `/country/${country.cca3}`;

  const favBtn = (size = 16, cls = '') => (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => { e.preventDefault(); toggleFavorite(country); }}
      className={`btn p-0 d-flex align-items-center justify-content-center cc-fav-btn ${fav ? 'cc-fav-active' : ''} ${cls}`}
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      style={{ width: size + 14, height: size + 14 }}
    >
      <Heart size={size} fill={fav ? 'currentColor' : 'none'} />
    </motion.button>
  );

  /* ========== LIST MODE ========== */
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.02 }}
        className="cc-list-row"
      >
        <Link to={link} onClick={saveScroll} className="cc-list-link">
          <img src={flagSrc} alt={name} className="cc-list-flag" loading="lazy" />
          <div className="cc-list-name fw-semibold">{name}</div>
          <div className="cc-list-cell text-muted">
            <MapPin size={14} className="me-1 text-primary" />{capital}
          </div>
          <div className="cc-list-cell text-muted">
            <Users size={14} className="me-1 text-success" />{pop}
          </div>
          <span className="badge bg-primary bg-opacity-10 text-primary cc-list-badge">{country.region}</span>
        </Link>
        {favBtn(16, 'cc-list-fav')}
      </motion.div>
    );
  }

  /* ========== COMPACT MODE ========== */
  if (viewMode === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.02 }}
        className="cc-compact"
      >
        <Link to={link} onClick={saveScroll} className="text-decoration-none d-block">
          <img src={flagSrc} alt={name} className="cc-compact-flag" loading="lazy" />
          <div className="cc-compact-body">
            <div className="cc-compact-name fw-semibold text-truncate">{name}</div>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted text-truncate"><MapPin size={12} className="me-1" />{capital}</small>
              <small className="text-muted"><Users size={12} className="me-1" />{pop}</small>
            </div>
          </div>
        </Link>
        {favBtn(14, 'cc-compact-fav')}
      </motion.div>
    );
  }

  /* ========== GRID MODE (default) ========== */
=======
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useState, useEffect } from 'react';

const CountryCard = ({ country, index }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(country.cca3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatPopulation = (population) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)}K`;
    }
    return population?.toLocaleString() || 'N/A';
  };

>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="card country-card h-100 overflow-hidden"
    >
      <div className="position-relative">
        <Link to={link} className="text-decoration-none" onClick={saveScroll}>
          <div className="cc-grid-flag-wrap">
            <img src={flagSrc} alt={name} loading="lazy" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            <div className="cc-grid-flag-overlay">
              <h5 className="text-white mb-0 fw-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{name}</h5>
            </div>
          </div>
        </Link>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.preventDefault(); toggleFavorite(country); }}
          className={`btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center cc-fav-btn ${fav ? 'cc-fav-active' : ''}`}
          aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          style={{ width: 40, height: 40, zIndex: 2 }}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} className={fav ? 'text-white' : 'text-danger'} />
        </motion.button>

        <span className="position-absolute top-0 start-0 m-3 badge bg-primary" style={{ zIndex: 2 }}>{country.region}</span>
      </div>

=======
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: isMobile ? 0 : -5, scale: isMobile ? 1 : 1.02 }}
      className="card country-card h-100 overflow-hidden"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="position-relative">
        {/* Flag Image */}
        <Link to={`/country/${country.cca3}`} className="text-decoration-none">
          <div style={{
            height: isMobile ? '160px' : '180px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <motion.img 
              src={country.flags?.svg || country.flags?.png} 
              alt={`Drapeau de ${country.name?.common}`}
              loading="lazy"
              className="w-100 h-100"
              style={{ 
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px'
            }}>
              <h5 className="text-white mb-0 fw-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {country.name?.common}
              </h5>
            </div>
          </div>
        </Link>
        
        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(country);
          }}
          className={`btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center ${
            isCountryFavorite 
              ? 'btn-danger' 
              : 'btn-light shadow-sm'
          }`}
          aria-label={isCountryFavorite ? `Retirer ${country.name?.common} des favoris` : `Ajouter ${country.name?.common} aux favoris`}
          style={{ 
            width: '40px', 
            height: '40px',
            zIndex: 2
          }}
        >
          <Heart 
            size={18} 
            fill={isCountryFavorite ? 'currentColor' : 'none'} 
            className={isCountryFavorite ? 'text-white' : 'text-danger'} 
          />
        </motion.button>

        {/* Region Badge */}
        <span className="position-absolute top-0 start-0 m-3 badge bg-primary" style={{ zIndex: 2 }}>
          {country.region}
        </span>
      </div>

      {/* Country Info */}
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <MapPin size={16} className="text-primary me-2" />
<<<<<<< HEAD
            <small className="text-muted">{capital}</small>
          </div>
          <div className="d-flex align-items-center">
            <Users size={16} className="text-success me-2" />
            <small className="text-muted">{pop}</small>
          </div>
        </div>
        <div className="border-top pt-3">
          <Link to={link} className="btn btn-outline-primary btn-sm w-100" onClick={saveScroll}>Explorer ce pays</Link>
=======
            <small className="text-muted">{country.capital?.[0] || 'N/A'}</small>
          </div>
          
          <div className="d-flex align-items-center">
            <Users size={16} className="text-success me-2" />
            <small className="text-muted">{formatPopulation(country.population)}</small>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-top pt-3">
          <Link 
            to={`/country/${country.cca3}`} 
            className="btn btn-outline-primary btn-sm w-100"
          >
            {isMobile ? 'Voir les détails' : 'Explorer ce pays'}
          </Link>
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
        </div>
      </div>
    </motion.div>
  );
};

export default CountryCard;
