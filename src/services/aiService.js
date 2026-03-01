<<<<<<< HEAD
const WIKI_FR = 'https://fr.wikipedia.org/api/rest_v1/page/summary/';
const WIKI_EN = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

function truncate(text, maxSentences = 3) {
  if (!text) return '';
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;
  return sentences.slice(0, maxSentences).join(' ').trim();
}

async function fetchSummary(baseUrl, name) {
  const res = await fetch(`${baseUrl}${encodeURIComponent(name)}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.type === 'standard' && data.extract?.length > 60) {
    return { text: truncate(data.extract), lang: baseUrl === WIKI_FR ? 'fr' : 'en' };
  }
  return null;
}
=======
/**
 * Service pour intégrer Windsurf AI et générer des anecdotes sur les pays
 */
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6

class AIService {
  constructor() {
    this.cache = new Map();
    this.isGenerating = new Set();
  }

<<<<<<< HEAD
  async generateCountryFunFact(country) {
    const key = country.cca3;

    if (this.cache.has(key)) return this.cache.get(key);

    if (this.isGenerating.has(key)) {
      return new Promise((resolve) => {
        const poll = () => {
          if (this.cache.has(key)) resolve(this.cache.get(key));
          else setTimeout(poll, 100);
        };
        poll();
      });
    }

    this.isGenerating.add(key);

    try {
      const result = await this.fetchBestExtract(country);
      this.cache.set(key, result);
      return result;
    } catch {
      const fb = this.buildFromData(country);
      this.cache.set(key, fb);
      return fb;
    } finally {
      this.isGenerating.delete(key);
    }
  }

  async fetchBestExtract(country) {
    const frName = country.translations?.fra?.common;
    const enName = country.name?.common;

    const attempts = [
      frName && [WIKI_FR, frName],
      enName && [WIKI_FR, enName],
      enName && [WIKI_EN, enName],
    ].filter(Boolean);

    for (const [url, name] of attempts) {
      try {
        const result = await fetchSummary(url, name);
        if (result) return result.text;
      } catch { /* next */ }
    }

    throw new Error('No extract found');
  }

  buildFromData(country) {
    const name = country.translations?.fra?.common || country.name?.common || 'Ce pays';
    const parts = [];

    parts.push(`${name} est un pays`);

    if (country.subregion) parts[0] += ` situé en ${country.subregion}`;
    else if (country.region) parts[0] += ` situé en ${country.region}`;
    parts[0] += '.';

    if (country.capital?.[0]) {
      parts.push(`Sa capitale est ${country.capital[0]}.`);
    }

    if (country.languages) {
      const langs = Object.values(country.languages);
      if (langs.length === 1) parts.push(`La langue officielle est ${langs[0]}.`);
      else if (langs.length > 1) parts.push(`Les langues officielles sont ${langs.slice(0, 3).join(', ')}.`);
    }

    if (country.currencies) {
      const curr = Object.values(country.currencies);
      if (curr.length > 0 && curr[0].name) {
        parts.push(`La monnaie utilisée est ${curr[0].name}.`);
      }
    }

    return parts.join(' ');
  }

=======
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
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
  clearCache() {
    this.cache.clear();
  }

<<<<<<< HEAD
=======
  /**
   * Retourne la taille du cache
   * @returns {number} - Nombre d'entrées en cache
   */
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
  getCacheSize() {
    return this.cache.size;
  }
}

<<<<<<< HEAD
=======
// Export d'une instance singleton
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6
export const aiService = new AIService();
export default aiService;
