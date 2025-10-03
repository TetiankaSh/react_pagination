import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFirstPage) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLastPage) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);

    onPerPageChange?.(newPerPage);
    onPageChange?.(1); // Reset to first page after changing perPage
  };

  return (
    <>
      <div data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </div>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={handlePerPageChange}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#"
            aria-disabled={isFirstPage ? 'true' : undefined}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <li key={page} className={`page-item ${isActive ? 'active' : ''}`}>
              <a
                data-cy="pageLink"
                className="page-link"
                href="#"
                onClick={e => handlePageClick(page, e)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#"
            aria-disabled={isLastPage ? 'true' : undefined}
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
