/**
 * Formate un nombre de population pour l'affichage.
 * @param {number} population - Nombre d'habitants
 * @param {'short'|'long'} style - 'short' pour "1.2M" / "500K", 'long' pour "1,2 million" / "500 mille"
 * @returns {string}
 */
export function formatPopulation(population, style = 'short') {
  if (population == null || Number.isNaN(Number(population))) return 'N/A';
  const n = Number(population);

  if (style === 'long') {
    if (n >= 1_000_000) {
      return `${(n / 1_000_000).toFixed(1).replace('.', ',')} million${n >= 2_000_000 ? 's' : ''} d'habitants`;
    }
    if (n >= 1_000) {
      return `${Math.round(n / 1_000)} mille habitants`;
    }
    return `${n.toLocaleString('fr-FR')} habitants`;
  }

  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(0)}K`;
  }
  return n.toLocaleString('fr-FR');
}
