export const usePagination = () => {
  return {
    pagination: {
      itemsPerPage: 10,
      page: 1,
      pageCount: 2,
      pageStart: 10,
      pageStop: 12,
    },
    rowsPerPageItems: computed(() => {
      return [10, 20, 50, 100];
    }),
  };
};
