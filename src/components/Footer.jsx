import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Github, Mail, MapPin, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setExpandedSection(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer className={`${isDark ? 'bg-dark text-light' : 'bg-light text-dark border-top'} mt-auto`} style={{ marginBottom: '100px', overflow: 'hidden' }}>
      <div className="container py-4 py-md-5">
        <div className="row g-3 g-md-4">
          {/* À propos du projet */}
          <div className="col-12 col-md-6 col-lg-4">
            {isMobile ? (
              <div 
                className="d-flex justify-content-between align-items-center mb-3"
                onClick={() => toggleSection('about')}
                style={{ cursor: 'pointer' }}
              >
                <h5 className="text-primary mb-0">
                  <Globe size={20} className="me-2" />
                  World Explorer
                </h5>
                {expandedSection === 'about' ? <ChevronUp /> : <ChevronDown />}
              </div>
            ) : (
              <h5 className="text-primary mb-3">
                <Globe size={20} className="me-2" />
                World Explorer
              </h5>
            )}
            
            <AnimatePresence>
              {(!isMobile || expandedSection === 'about') && (
                <motion.div
                  initial={isMobile ? { height: 0, opacity: 0 } : false}
                  animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                  exit={isMobile ? { height: 0, opacity: 0 } : false}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className={`${isDark ? 'text-muted' : 'text-secondary'} mb-3`}>
                      Explorez les pays du monde entier avec des informations en temps réel, 
                      des anecdotes générées par IA, et une expérience utilisateur moderne et intuitive.
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="badge bg-primary">React 19.1.1</span>
                      <span className="badge bg-secondary">Bootstrap 5</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fonctionnalités */}
          <div className="col-12 col-md-6 col-lg-4">
            {isMobile ? (
              <div 
                className="d-flex justify-content-between align-items-center mb-3"
                onClick={() => toggleSection('features')}
                style={{ cursor: 'pointer' }}
              >
                <h6 className={`${isDark ? 'text-white' : 'text-dark'} mb-0`}>Fonctionnalités</h6>
                {expandedSection === 'features' ? <ChevronUp /> : <ChevronDown />}
              </div>
            ) : (
              <h6 className={`${isDark ? 'text-white' : 'text-dark'} mb-3`}>Fonctionnalités</h6>
            )}
            
            <AnimatePresence>
              {(!isMobile || expandedSection === 'features') && (
                <motion.div
                  initial={isMobile ? { height: 0, opacity: 0 } : false}
                  animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                  exit={isMobile ? { height: 0, opacity: 0 } : false}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <MapPin size={16} className="text-primary me-2" />
                      <span className={`${isDark ? 'text-muted' : 'text-secondary'}`}>195+ pays référencés</span>
                    </li>
                    <li className="mb-2">
                      <Clock size={16} className="text-primary me-2" />
                      <span className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Horloges mondiales en temps réel</span>
                    </li>
                    <li className="mb-2">
                      <Users size={16} className="text-primary me-2" />
                      <span className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Système de favoris</span>
                    </li>
                    <li className="mb-2">
                      <Heart size={16} className="text-primary me-2" />
                      <span className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Anecdotes IA personnalisées</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-12 col-lg-4">
            {isMobile ? (
              <div 
                className="d-flex justify-content-between align-items-center mb-3"
                onClick={() => toggleSection('contact')}
                style={{ cursor: 'pointer' }}
              >
                <h6 className={`${isDark ? 'text-white' : 'text-dark'} mb-0`}>Contact</h6>
                {expandedSection === 'contact' ? <ChevronUp /> : <ChevronDown />}
              </div>
            ) : (
              <h6 className={`${isDark ? 'text-white' : 'text-dark'} mb-3`}>Contact</h6>
            )}
            
            <AnimatePresence>
              {(!isMobile || expandedSection === 'contact') && (
                <motion.div
                  initial={isMobile ? { height: 0, opacity: 0 } : false}
                  animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                  exit={isMobile ? { height: 0, opacity: 0 } : false}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <small className={`${isDark ? 'text-muted' : 'text-secondary'} d-block`}>Développeur</small>
                      <span className={`${isDark ? 'text-white' : 'text-dark'}`}>Soufiane HJ</span>
                    </div>
                    <div>
                      <small className={`${isDark ? 'text-muted' : 'text-secondary'} d-block`}>Email</small>
                      <a href="mailto:hjisfn@gmail.com" className={`${isDark ? 'text-light' : 'text-primary'} text-decoration-none`}>
                        hjisfn@gmail.com
                      </a>
                    </div>
                    <div className="d-flex gap-2 mt-2 justify-content-start">
                      <motion.a
                        href="https://github.com/suufiaane13"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: '40px', height: '40px' }}
                        aria-label="Profil GitHub de Soufiane HJ"
                      >
                        <Github size={18} />
                      </motion.a>
                      <motion.a
                        href="mailto:hjisfn@gmail.com"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: '40px', height: '40px' }}
                        aria-label="Envoyer un email à Soufiane HJ"
                      >
                        <Mail size={18} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Statistiques en temps réel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`row mt-3 mt-md-4 pt-3 pt-md-4 border-top ${isDark ? 'border-secondary' : 'border-light-subtle'}`}
        >
          <div className="col-12">
            <div className="row text-center g-2 g-md-3">
              <div className="col-6 col-md-3">
                <div className="text-primary h5 h4-md mb-1">195+</div>
                <small className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Pays</small>
              </div>
              <div className="col-6 col-md-3">
                <div className="text-success h5 h4-md mb-1">24/7</div>
                <small className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Horloges</small>
              </div>
              <div className="col-6 col-md-3">
                <div className="text-warning h5 h4-md mb-1">&infin;</div>
                <small className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Anecdotes IA</small>
              </div>
              <div className="col-6 col-md-3">
                <div className="text-info h5 h4-md mb-1">100%</div>
                <small className={`${isDark ? 'text-muted' : 'text-secondary'}`}>Gratuit</small>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`row mt-3 mt-md-4 pt-3 border-top ${isDark ? 'border-secondary' : 'border-light-subtle'}`}
        >
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <p className={`${isDark ? 'text-muted' : 'text-secondary'} mb-0 text-center text-md-start small`}>
              &copy; {currentYear} World Explorer. <br /> Créé par{' '}
              <span className="text-primary fw-medium">Soufiane HJ</span>{' '}
              avec{' '}
              <Heart size={12} className="text-danger mx-1" fill="currentColor" />
            </p>
          </div>
          <div className="col-12 col-md-6">
            <p className={`${isDark ? 'text-muted' : 'text-secondary'} mb-0 text-center text-md-end small`}>
              Données fournies par{' '}
              <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                REST Countries API
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bande décorative */}
      <div className="bg-primary" style={{ height: '4px' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="bg-gradient"
          style={{ 
            height: '100%',
            background: 'linear-gradient(90deg, #0d6efd 0%, #20c997 50%, #fd7e14 100%)'
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
