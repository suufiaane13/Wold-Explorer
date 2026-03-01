import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ paddingTop: '80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4"
        >
          <Globe size={80} className="text-primary" strokeWidth={1.2} />
        </motion.div>

        <h1 className="display-1 fw-bold text-primary mb-2">404</h1>
        <h2 className="h4 mb-3">Page introuvable</h2>
        <p className="text-muted mb-4" style={{ maxWidth: 400, margin: '0 auto' }}>
          Cette page n'existe pas ou a été déplacée. Retournez explorer les pays du monde.
        </p>

        <Link to="/" className="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={18} />
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
