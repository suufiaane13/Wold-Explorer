const BASE_URL = 'https://restcountries.com/v3.1';

export const countriesAPI = {
  getAllCountries: async () => {
    try {
      const response = await fetch(`${BASE_URL}/all?fields=name,capital,population,flags,region,cca3,cca2,area`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      return await response.json();
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  getCountryByCode: async (code) => {
    try {
      const response = await fetch(`${BASE_URL}/alpha/${code}`);
      if (!response.ok) throw new Error('Failed to fetch country');
      return await response.json();
    } catch (error) {
      console.error('Error fetching country:', error);
      throw error;
    }
  },

  searchCountries: async (name) => {
    try {
      const response = await fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,region,cca3,cca2`);
      if (!response.ok) throw new Error('Failed to search countries');
      return await response.json();
    } catch (error) {
      console.error('Error searching countries:', error);
      throw error;
    }
  },

  getCountriesByCodes: async (codes) => {
    if (!codes?.length) return [];
    try {
      const codesParam = codes.slice(0, 20).join(',');
      const response = await fetch(`${BASE_URL}/alpha?codes=${codesParam}&fields=name,cca3`);
      if (!response.ok) throw new Error('Failed to fetch countries by codes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching countries by codes:', error);
      return [];
    }
  },

  getCountriesByRegion: async (region) => {
    try {
      const response = await fetch(`${BASE_URL}/region/${region}?fields=name,capital,population,flags,region,cca3,cca2`);
      if (!response.ok) throw new Error('Failed to fetch countries by region');
      return await response.json();
    } catch (error) {
      console.error('Error fetching countries by region:', error);
      throw error;
    }
  }
};
