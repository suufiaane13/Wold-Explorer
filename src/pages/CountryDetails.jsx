import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, MapPin, Globe, DollarSign, Clock, Languages, Lightbulb, Loader2, RefreshCw } from 'lucide-react';
import { countriesAPI } from '../utils/api';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAIFunFact } from '../hooks/useAIFunFact';
import WorldClock from '../components/WorldClock';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { funFact, loading: funFactLoading, error: funFactError, regenerateFunFact } = useAIFunFact(country);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await countriesAPI.getCountryByCode(code);
        setCountry(data[0]);
      } catch (err) {
        setError('Pays non trouvé');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountry();
    }
  }, [code]);

  const formatPopulation = (population) => {
    return population?.toLocaleString('fr-FR') || 'N/A';
  };

  const formatLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };

  const formatCurrencies = (currencies) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ');
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ paddingTop: '80px' }}>
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

  if (error || !country) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ paddingTop: '80px' }}>
        <div className="text-center">
          <h2 className="h4 mb-3">
            {error || 'Pays non trouvé'}
          </h2>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const isCountryFavorite = isFavorite(country.cca3);

  return (
    <div className="min-vh-100" style={{ paddingTop: '20px', paddingBottom: '120px' }}>
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
            aria-label="Retourner à la liste des pays"
          >
            <ArrowLeft size={20} className="me-2" />
            <span>Retour aux pays</span>
          </Link>
        </motion.div>

        <div className="row g-3 g-lg-4 mb-4">
          {/* Flag Section */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="position-relative"
            >
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-lg">
                <img
                  src={country.flags?.svg || country.flags?.png}
                  alt={`Flag of ${country.name?.common}`}
                  className="object-fit-cover"
                />
              </div>
              
              {/* Favorite Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(country)}
                className={`btn position-absolute top-0 end-0 m-3 rounded-circle ${
                  isCountryFavorite 
                    ? 'btn-danger' 
                    : 'btn-light'
                }`}
                aria-label={isCountryFavorite ? `Retirer ${country.name?.common} des favoris` : `Ajouter ${country.name?.common} aux favoris`}
                style={{ width: '50px', height: '50px' }}
              >
                <Heart size={20} fill={isCountryFavorite ? 'currentColor' : 'none'} />
              </motion.button>
            </motion.div>
          </div>

          {/* Country Info */}
          <div className="col-12 col-lg-6 mt-3 mt-lg-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-3 mb-md-4">
                <h1 className="display-6 fw-bold text-primary mb-1">
                  {country.name?.common}
                </h1>
                {country.name?.official && country.name.official !== country.name.common && (
                  <p className="lead text-muted mb-0">
                    {country.name.official}
                  </p>
                )}
              </div>

              <div className="row g-2 g-sm-3">
                <div className="col-12 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="p-2 bg-primary bg-opacity-10 rounded me-2">
                          <MapPin className="text-primary" size={18} />
                        </div>
                        <h6 className="card-title mb-0 fw-medium">Capitale</h6>
                      </div>
                      <p className="card-text text-muted mb-0 small">
                        {country.capital?.[0] || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="p-2 bg-success bg-opacity-10 rounded me-2">
                          <Users className="text-success" size={18} />
                        </div>
                        <h6 className="card-title mb-0 fw-medium">Population</h6>
                      </div>
                      <p className="card-text text-muted mb-0 small">
                        {formatPopulation(country.population)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="p-2 bg-info bg-opacity-10 rounded me-2">
                          <Globe className="text-info" size={18} />
                        </div>
                        <h6 className="card-title mb-0 fw-medium">Région</h6>
                      </div>
                      <p className="card-text text-muted mb-0 small">
                        {country.region} - {country.subregion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="p-2 bg-warning bg-opacity-10 rounded me-2">
                          <Languages className="text-warning" size={18} />
                        </div>
                        <h6 className="card-title mb-0 fw-medium">Langues</h6>
                      </div>
                      <p className="card-text text-muted mb-0 small">
                        {formatLanguages(country.languages)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="p-2 bg-success bg-opacity-10 rounded me-2">
                          <DollarSign className="text-success" size={18} />
                        </div>
                        <h6 className="card-title mb-0 fw-medium">Monnaie</h6>
                      </div>
                      <p className="card-text text-muted mb-0 small">
                        {formatCurrencies(country.currencies)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="p-2 bg-primary bg-opacity-10 rounded me-2">
                          <Clock className="text-primary" size={18} />
                        </div>
                        <h6 className="card-title mb-0 fw-medium">Heure locale</h6>
                      </div>
                      <div className="mb-2">
                        <WorldClock country={country} size="md" showDate={true} />
                      </div>
                      <small className="text-muted d-block">
                        Fuseau: {country.timezones?.[0] || 'N/A'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* AI Fun Fact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card border-primary mb-4 mt-3 shadow-sm"
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-primary bg-opacity-10 rounded me-3">
                  <Lightbulb size={20} className="text-primary" />
                </div>
                <h2 className="h5 mb-0 fw-bold">
                  Le saviez-vous ?
                </h2>
              </div>
              {!funFactLoading && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={regenerateFunFact}
                  className="btn btn-outline-primary btn-sm p-1 p-sm-2"
                  title="Générer une nouvelle anecdote"
                  aria-label="Générer une nouvelle anecdote pour ce pays"
                  style={{ minWidth: '32px' }}
                >
                  <RefreshCw size={16} />
                  <span className="d-none d-sm-inline ms-1">Nouveau</span>
                </motion.button>
              )}
            </div>
            
            {funFactLoading ? (
              <div className="d-flex align-items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-primary me-2"
                >
                  <Loader2 size={18} />
                </motion.div>
                <span className="text-muted small">Génération d'une anecdote fascinante...</span>
              </div>
            ) : funFactError ? (
              <div className="alert alert-warning py-2 mb-0" role="alert">
                <small className="d-flex align-items-center">
                  <span className="me-2">⚠️</span>
                  <span>{funFactError}</span>
                </small>
              </div>
            ) : (
              <p className="card-text small mb-0 lh-base">
                {funFact}
              </p>
            )}
          </div>
        </motion.div>

        {/* Neighboring Countries */}
        {country.borders && country.borders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <div className="d-flex align-items-center mb-3">
              <div className="p-2 bg-primary bg-opacity-10 rounded me-2">
                <MapPin className="text-primary" size={18} />
              </div>
              <h2 className="h5 mb-0 fw-bold">
                Pays frontaliers
              </h2>
              <span className="badge bg-primary ms-2">
                {country.borders.length}
              </span>
            </div>
            <div className="row g-2">
              {country.borders.map((border) => (
                <div key={border} className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-100"
                  >
                    <Link
                      to={`/country/${border}`}
                      className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                      style={{ height: '100%' }}
                    >
                      {border}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
