import { useState, useMemo, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer la pagination
 * @param {Array} data - Données à paginer
 * @param {number} initialItemsPerPage - Nombre d'éléments par page initial
 * @returns {Object} - État et fonctions de pagination
 */
export const usePagination = (data, initialItemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(data.length / itemsPerPage));
  }, [data.length, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    totalItems: data.length,
    goToPage,
    changeItemsPerPage,
    resetPagination: () => setCurrentPage(1)
  };
};
