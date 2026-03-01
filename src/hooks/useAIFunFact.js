import { useState, useEffect } from 'react';
import aiService from '../services/aiService';

/**
 * Hook personnalisé pour gérer la génération de fun facts AI
 * @param {Object} country - Objet pays pour lequel générer un fun fact
 * @returns {Object} - État du fun fact (loading, data, error)
 */
export const useAIFunFact = (country) => {
  const [funFact, setFunFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) {
      setFunFact('');
      setLoading(false);
      setError(null);
      return;
    }

    const generateFunFact = async () => {
      setLoading(true);
      setError(null);

      try {
        const fact = await aiService.generateCountryFunFact(country);
        setFunFact(fact);
      } catch (err) {
        setError('Impossible de charger le résumé pour ce pays.');
        console.error('Erreur lors de la génération du fun fact:', err);
      } finally {
        setLoading(false);
      }
    };

    generateFunFact();
  }, [country?.cca3]); // Dépendance sur le code pays pour éviter les re-renders inutiles

  /**
   * Fonction pour régénérer un fun fact
   */
  const regenerateFunFact = async () => {
    if (!country) return;

    setLoading(true);
    setError(null);

    try {
      // Vider le cache pour ce pays pour forcer une nouvelle génération
      aiService.cache.delete(country.cca3);
      const fact = await aiService.generateCountryFunFact(country);
      setFunFact(fact);
    } catch (err) {
      setError('Impossible de charger un nouveau résumé.');
      console.error('Erreur lors de la régénération du fun fact:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    funFact,
    loading,
    error,
    regenerateFunFact
  };
};
