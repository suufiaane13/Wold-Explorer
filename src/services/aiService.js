/**
 * Service pour intégrer Windsurf AI et générer des anecdotes sur les pays
 */

class AIService {
  constructor() {
    this.cache = new Map();
    this.isGenerating = new Set();
  }

  /**
   * Génère une anecdote/fun fact pour un pays donné
   * @param {Object} country - Objet pays de l'API REST Countries
   * @returns {Promise<string>} - Anecdote générée
   */
  async generateCountryFunFact(country) {
    const cacheKey = country.cca3;
    
    // Vérifier le cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Éviter les appels multiples simultanés pour le même pays
    if (this.isGenerating.has(cacheKey)) {
      return new Promise((resolve) => {
        const checkCache = () => {
          if (this.cache.has(cacheKey)) {
            resolve(this.cache.get(cacheKey));
          } else {
            setTimeout(checkCache, 100);
          }
        };
        checkCache();
      });
    }

    this.isGenerating.add(cacheKey);

    try {
      const prompt = this.buildPrompt(country);
      const funFact = await this.callWindsurfAI(prompt);
      
      // Mettre en cache le résultat
      this.cache.set(cacheKey, funFact);
      
      return funFact;
    } catch (error) {
      console.error('Erreur lors de la génération du fun fact:', error);
      // Retourner un fun fact par défaut en cas d'erreur
      return this.getFallbackFunFact(country);
    } finally {
      this.isGenerating.delete(cacheKey);
    }
  }

  /**
   * Construit le prompt pour l'IA basé sur les informations du pays
   * @param {Object} country - Objet pays
   * @returns {string} - Prompt formaté
   */
  buildPrompt(country) {
    const countryName = country.name?.common || 'ce pays';
    const capital = country.capital?.[0] || 'sa capitale';
    const region = country.region || 'sa région';
    const population = country.population ? this.formatPopulation(country.population) : 'sa population';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'ses langues';

    return `Génère une anecdote fascinante et peu connue sur ${countryName}. 
    Voici quelques informations sur ce pays :
    - Capitale : ${capital}
    - Région : ${region}  
    - Population : ${population}
    - Langues : ${languages}
    
    L'anecdote doit être :
    - Authentique et vérifiable
    - Surprenante ou peu connue
    - Engageante pour un public curieux
    - Entre 2-3 phrases maximum
    - En français
    
    Ne commence pas par "Le saviez-vous" ou "Anecdote", va directement au fait intéressant.`;
  }

  /**
   * Appelle l'API Windsurf AI (simulation pour l'instant)
   * @param {string} prompt - Le prompt à envoyer
   * @returns {Promise<string>} - Réponse de l'IA
   */
  async callWindsurfAI(prompt) {
    // Pour l'instant, on simule l'appel à Windsurf AI
    // Dans une vraie implémentation, on ferait un appel HTTP à l'API Windsurf
    
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Retourner une anecdote générée de manière procédurale
    // En attendant l'intégration réelle de Windsurf AI
    return this.generateProcedural(prompt);
  }

  /**
   * Génère une anecdote de manière procédurale (temporaire)
   * @param {string} prompt - Le prompt original
   * @returns {string} - Anecdote générée
   */
  generateProcedural(prompt) {
    // Extraire le nom du pays du prompt
    const countryMatch = prompt.match(/sur (.+?)\./);
    const countryName = countryMatch ? countryMatch[1] : 'ce pays';
    
    const funFacts = [
      `${countryName} possède une biodiversité exceptionnelle avec des espèces endémiques uniques au monde. Les traditions locales incluent des festivals colorés qui attirent des visiteurs du monde entier.`,
      
      `L'architecture traditionnelle de ${countryName} reflète des siècles d'histoire et d'influences culturelles diverses. Le pays est également reconnu pour ses innovations dans le domaine de l'énergie renouvelable.`,
      
      `${countryName} abrite des sites naturels d'une beauté à couper le souffle, classés au patrimoine mondial. La gastronomie locale est réputée pour ses saveurs authentiques et ses techniques culinaires ancestrales.`,
      
      `Les artisans de ${countryName} perpétuent des savoir-faire traditionnels transmis de génération en génération. Le pays joue un rôle important dans la préservation d'écosystèmes rares et fragiles.`,
      
      `${countryName} est pionnier dans plusieurs domaines technologiques et scientifiques. Les habitants sont connus pour leur hospitalité légendaire et leurs traditions musicales riches.`
    ];
    
    return funFacts[Math.floor(Math.random() * funFacts.length)];
  }

  /**
   * Retourne un fun fact par défaut en cas d'erreur
   * @param {Object} country - Objet pays
   * @returns {string} - Fun fact par défaut
   */
  getFallbackFunFact(country) {
    const countryName = country.name?.common || 'Ce pays';
    return `${countryName} est un pays fascinant avec une riche histoire culturelle et des paysages diversifiés. Chaque région offre des expériences uniques aux visiteurs curieux de découvrir ses traditions et sa beauté naturelle.`;
  }

  /**
   * Formate la population pour l'affichage
   * @param {number} population - Nombre d'habitants
   * @returns {string} - Population formatée
   */
  formatPopulation(population) {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)} millions d'habitants`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)} mille habitants`;
    }
    return `${population} habitants`;
  }

  /**
   * Vide le cache (utile pour les tests ou le rafraîchissement)
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Retourne la taille du cache
   * @returns {number} - Nombre d'entrées en cache
   */
  getCacheSize() {
    return this.cache.size;
  }
}

// Export d'une instance singleton
export const aiService = new AIService();
export default aiService;
