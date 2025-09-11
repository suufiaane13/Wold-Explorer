import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems,
  onItemsPerPageChange 
}) => {
  const { isDark } = useTheme();


  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Nombre de pages à afficher

    if (totalPages <= showPages) {
      // Si peu de pages, les afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour pages avec ellipses
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      {/* Version Mobile */}
      <div className="d-block d-md-none">
        <div 
          className="d-flex flex-column gap-3 p-3 rounded-4"
          style={{
            background: isDark 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.03)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          {/* Info et sélecteur mobile */}
          <div className="d-flex justify-content-between align-items-center">
            <span className={`${isDark ? 'text-white/70' : 'text-muted'} small`}>
              {startItem}-{endItem} / {totalItems}
            </span>
            <select
              className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              style={{ 
                width: 'auto', 
                minWidth: '100px',
                fontSize: '12px',
                background: isDark ? '#2d3748' : 'white'
              }}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={96}>96</option>
            </select>
          </div>

          {/* Navigation mobile simplifiée */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center">
              {/* Bouton précédent mobile */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`btn d-flex align-items-center gap-2 px-3 py-2 ${
                  currentPage === 1 
                    ? 'btn-outline-secondary disabled' 
                    : isDark ? 'btn-outline-light' : 'btn-outline-primary'
                }`}
                style={{ borderRadius: '20px', fontSize: '14px' }}
                aria-label="Page précédente"
              >
                <ChevronLeft size={14} />
                <span className="d-none d-sm-inline">Précédent</span>
              </motion.button>

              {/* Indicateur de page mobile */}
              <div className="d-flex align-items-center gap-2">
                <span className={`${isDark ? 'text-white' : 'text-dark'} fw-semibold`}>
                  {currentPage}
                </span>
                <span className={isDark ? 'text-white/50' : 'text-muted'}>
                  sur {totalPages}
                </span>
              </div>

              {/* Bouton suivant mobile */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`btn d-flex align-items-center gap-2 px-3 py-2 ${
                  currentPage === totalPages 
                    ? 'btn-outline-secondary disabled' 
                    : isDark ? 'btn-outline-light' : 'btn-outline-primary'
                }`}
                style={{ borderRadius: '20px', fontSize: '14px' }}
                aria-label="Page suivante"
              >
                <span className="d-none d-sm-inline">Suivant</span>
                <ChevronRight size={14} />
              </motion.button>
            </div>
          )}

          {/* Barre de progression mobile */}
          {totalPages > 1 && (
            <div className="position-relative">
              <div 
                className="w-100 rounded-pill"
                style={{ 
                  height: '4px', 
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentPage / totalPages) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-100 rounded-pill"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Version Desktop */}
      <div 
        className="d-none d-md-flex flex-column flex-lg-row justify-content-between align-items-center gap-3 p-3 rounded-4"
        style={{
          background: isDark 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.03)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
        }}
      >
        {/* Informations desktop */}
        <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
          <span className={`${isDark ? 'text-white/70' : 'text-muted'} small`}>
            {startItem}-{endItem} sur {totalItems} pays
          </span>
          
          {/* Sélecteur d'éléments par page desktop */}
          <select
            className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            style={{ 
              width: 'auto', 
              minWidth: '120px',
              background: isDark ? '#2d3748' : 'white'
            }}
          >
            <option value={12}>12 par page</option>
            <option value={24}>24 par page</option>
            <option value={48}>48 par page</option>
            <option value={96}>96 par page</option>
          </select>
        </div>

        {/* Navigation desktop */}
        {totalPages > 1 && (
          <div className="d-flex align-items-center gap-1">
            {/* Bouton précédent desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`btn btn-sm d-flex align-items-center justify-content-center ${
                currentPage === 1 
                  ? 'btn-outline-secondary disabled' 
                  : isDark ? 'btn-outline-light' : 'btn-outline-primary'
              }`}
              style={{ 
                width: '36px', 
                height: '36px',
                borderRadius: '50%'
              }}
              aria-label="Page précédente"
            >
              <ChevronLeft size={16} />
            </motion.button>

            {/* Numéros de pages desktop */}
            <div className="d-flex align-items-center gap-1 mx-2">
              {pageNumbers.map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <div className="d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                      <MoreHorizontal size={16} className={isDark ? 'text-white/50' : 'text-muted'} />
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onPageChange(page)}
                      className={`btn btn-sm d-flex align-items-center justify-content-center ${
                        page === currentPage
                          ? 'btn-primary text-white'
                          : isDark ? 'btn-outline-light' : 'btn-outline-primary'
                      }`}
                      style={{ 
                        width: '36px', 
                        height: '36px',
                        borderRadius: '50%',
                        background: page === currentPage 
                          ? 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)'
                          : 'transparent'
                      }}
                      aria-label={`Page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </motion.button>
                  )}
                </div>
              ))}
            </div>

            {/* Bouton suivant desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`btn btn-sm d-flex align-items-center justify-content-center ${
                currentPage === totalPages 
                  ? 'btn-outline-secondary disabled' 
                  : isDark ? 'btn-outline-light' : 'btn-outline-primary'
              }`}
              style={{ 
                width: '36px', 
                height: '36px',
                borderRadius: '50%'
              }}
              aria-label="Page suivante"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Pagination;
