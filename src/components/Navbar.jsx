import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Navbar = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const { favorites } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed-top ${isDark ? 'bg-dark/90' : 'bg-white/90'} backdrop-blur-md border-bottom`}
      style={{ 
        zIndex: 1050,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
      }}
    >
      <div className="container-fluid px-3 px-md-4">
        <div className="d-flex align-items-center justify-content-between py-3">
          
          {/* Brand */}
          <Link to="/" className="text-decoration-none">
            <motion.div 
              className="d-flex align-items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="me-2"
              >
                <Globe 
                  size={32} 
                  className="text-primary" 
                  style={{ strokeWidth: 2 }}
                />
              </motion.div>
              <div>
                <h1 className={`h4 mb-0 fw-bold ${isDark ? 'text-white' : 'text-dark'}`}>
                  World Explorer
                </h1>
                <small className={`${isDark ? 'text-white/70' : 'text-muted'}`}>
                  Découvrez le monde
                </small>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="d-none d-md-flex align-items-center gap-3">
            
            {/* Favorites Link */}
            <Link to="/favorites" className="text-decoration-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`d-flex align-items-center px-3 py-2 rounded-pill position-relative ${
                  location.pathname === '/favorites'
                    ? 'bg-primary text-white shadow-sm'
                    : isDark ? 'text-white/80 hover:text-white' : 'text-dark/80 hover:text-dark'
                }`}
                style={{
                  background: location.pathname === '/favorites' 
                    ? 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)'
                    : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Heart size={18} className="me-2" />
                <span className="fw-medium">Favoris</span>
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="badge bg-danger ms-2"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </motion.div>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="btn d-md-none p-2 border-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu de navigation"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={isDark ? 'text-white' : 'text-dark'} />
              ) : (
                <Menu size={24} className={isDark ? 'text-white' : 'text-dark'} />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="d-md-none overflow-hidden border-top"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              <div className="py-3">
                
                {/* Mobile Favorites */}
                <Link to="/favorites" className="text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`d-flex align-items-center justify-content-between p-3 rounded-3 mb-2 ${
                      location.pathname === '/favorites'
                        ? 'bg-primary text-white'
                        : isDark ? 'bg-white/5 text-white' : 'bg-black/5 text-dark'
                    }`}
                    style={{
                      background: location.pathname === '/favorites' 
                        ? 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)'
                        : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <Heart size={20} className="me-3" />
                      <span className="fw-medium">Mes Favoris</span>
                    </div>
                    {favorites.length > 0 && (
                      <span className="badge bg-danger">
                        {favorites.length}
                      </span>
                    )}
                  </motion.div>
                </Link>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
