/**
 * Utilitaires pour gérer les fuseaux horaires et les horloges mondiales
 */

/**
 * Obtient l'heure actuelle dans un fuseau horaire spécifique
 * @param {string} timezone - Fuseau horaire (ex: "Europe/Paris", "America/New_York")
 * @returns {Date} - Date dans le fuseau horaire spécifié
 */
export const getTimeInTimezone = (timezone) => {
  try {
    const now = new Date();
    console.log(`⏰ Getting time for timezone: ${timezone}`);
    
    // Méthode simple et fiable pour obtenir l'heure dans un fuseau horaire
    const timeString = now.toLocaleString('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    console.log(`⏰ Raw time string: ${timeString}`);
    
    // Parser le format "MM/DD/YYYY, HH:mm:ss"
    const [datePart, timePart] = timeString.split(', ');
    const [month, day, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');
    
    const result = new Date(
      parseInt(year),
      parseInt(month) - 1, // Les mois commencent à 0
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
    
    console.log(`⏰ Parsed result: ${result.toLocaleTimeString()}`);
    return result;
  } catch (error) {
    console.warn(`Fuseau horaire invalide: ${timezone}`);
    return new Date();
  }
};

/**
 * Formate l'heure pour l'affichage
 * @param {Date} date - Date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} - Heure formatée
 */
export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: options.showSeconds ? '2-digit' : undefined,
    hour12: options.format12h || false
  };

  return date.toLocaleTimeString('fr-FR', defaultOptions);
};

/**
 * Formate la date pour l'affichage
 * @param {Date} date - Date à formater
 * @returns {string} - Date formatée
 */
export const formatDate = (date) => {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Convertit un fuseau horaire de l'API REST Countries en fuseau horaire valide
 * @param {string} countryTimezone - Fuseau horaire du pays (ex: "UTC+01:00", "UTC-05:00")
 * @returns {string} - Fuseau horaire IANA valide ou fallback
 */
export const parseCountryTimezone = (countryTimezone) => {
  if (!countryTimezone) return 'UTC';

  // Si c'est déjà un fuseau horaire IANA valide
  if (countryTimezone.includes('/')) {
    return countryTimezone;
  }

  // Mapping amélioré des fuseaux horaires UTC vers des fuseaux IANA populaires
  const timezoneMap = {
    'UTC-12:00': 'Etc/GMT+12',
    'UTC-11:00': 'Pacific/Midway',
    'UTC-10:00': 'Pacific/Honolulu',
    'UTC-09:30': 'Pacific/Marquesas',
    'UTC-09:00': 'America/Anchorage',
    'UTC-08:00': 'America/Los_Angeles',
    'UTC-07:00': 'America/Denver',
    'UTC-06:00': 'America/Chicago',
    'UTC-05:00': 'America/New_York',
    'UTC-04:30': 'America/Caracas',
    'UTC-04:00': 'America/Halifax',
    'UTC-03:30': 'America/St_Johns',
    'UTC-03:00': 'America/Sao_Paulo',
    'UTC-02:00': 'Atlantic/South_Georgia',
    'UTC-01:00': 'Atlantic/Azores',
    'UTC+00:00': 'Europe/London',
    'UTC': 'UTC',
    'UTC+01:00': 'Europe/Paris',
    'UTC+02:00': 'Europe/Athens',
    'UTC+03:00': 'Europe/Moscow',
    'UTC+03:30': 'Asia/Tehran',
    'UTC+04:00': 'Asia/Dubai',
    'UTC+04:30': 'Asia/Kabul',
    'UTC+05:00': 'Asia/Karachi',
    'UTC+05:30': 'Asia/Kolkata',
    'UTC+05:45': 'Asia/Kathmandu',
    'UTC+06:00': 'Asia/Dhaka',
    'UTC+06:30': 'Asia/Yangon',
    'UTC+07:00': 'Asia/Bangkok',
    'UTC+08:00': 'Asia/Shanghai',
    'UTC+08:30': 'Asia/Pyongyang',
    'UTC+09:00': 'Asia/Tokyo',
    'UTC+09:30': 'Australia/Adelaide',
    'UTC+10:00': 'Australia/Sydney',
    'UTC+10:30': 'Australia/Lord_Howe',
    'UTC+11:00': 'Pacific/Noumea',
    'UTC+12:00': 'Pacific/Auckland',
    'UTC+12:45': 'Pacific/Chatham',
    'UTC+13:00': 'Pacific/Tongatapu',
    'UTC+14:00': 'Pacific/Kiritimati'
  };

  return timezoneMap[countryTimezone] || 'UTC';
};

/**
 * Obtient le fuseau horaire principal d'un pays
 * @param {Object} country - Objet pays de l'API REST Countries
 * @returns {string} - Fuseau horaire principal
 */
export const getCountryMainTimezone = (country) => {
  if (!country.timezones || country.timezones.length === 0) {
    console.log(`⚠️ No timezones for ${country?.name?.common}, using UTC`);
    return 'UTC';
  }

  // Prendre le premier fuseau horaire et le convertir
  const firstTimezone = country.timezones[0];
  const convertedTimezone = parseCountryTimezone(firstTimezone);
  console.log(`🌍 ${country?.name?.common}: ${firstTimezone} → ${convertedTimezone}`);
  return convertedTimezone;
};

/**
 * Calcule le décalage horaire par rapport à l'heure locale
 * @param {string} timezone - Fuseau horaire cible
 * @returns {string} - Décalage formaté (ex: "+2h", "-5h")
 */
export const getTimezoneOffset = (timezone) => {
  try {
    const now = new Date();
    
    // Obtenir l'offset en minutes pour le fuseau horaire local
    const localOffset = now.getTimezoneOffset();
    
    // Obtenir l'offset en minutes pour le fuseau horaire cible
    const targetDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    const utcTime = now.getTime() + (localOffset * 60000);
    const targetTime = targetDate.getTime();
    const targetOffset = (utcTime - targetTime) / 60000;
    
    // Calculer la différence en heures
    const offsetHours = Math.round((localOffset - targetOffset) / 60);
    
    if (offsetHours === 0) return 'Même heure';
    if (offsetHours > 0) return `+${offsetHours}h`;
    return `${offsetHours}h`;
  } catch (error) {
    return 'N/A';
  }
};

/**
 * Détermine si c'est le jour ou la nuit dans un fuseau horaire
 * @param {Date} date - Date dans le fuseau horaire
 * @returns {string} - 'day' ou 'night'
 */
export const getDayNightStatus = (date) => {
  const hour = date.getHours();
  return (hour >= 6 && hour < 20) ? 'day' : 'night';
};

/**
 * Obtient une icône appropriée pour l'heure
 * @param {Date} date - Date dans le fuseau horaire
 * @returns {string} - Emoji représentant l'heure
 */
export const getTimeIcon = (date) => {
  const hour = date.getHours();
  
  if (hour >= 6 && hour < 12) return '🌅'; // Matin
  if (hour >= 12 && hour < 17) return '☀️'; // Après-midi
  if (hour >= 17 && hour < 20) return '🌇'; // Soirée
  return '🌙'; // Nuit
};
