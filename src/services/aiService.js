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

class AIService {
  constructor() {
    this.cache = new Map();
    this.isGenerating = new Set();
  }

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

  clearCache() {
    this.cache.clear();
  }

  getCacheSize() {
    return this.cache.size;
  }
}

export const aiService = new AIService();
export default aiService;
