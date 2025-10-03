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
  // ✅ Ensure at least 1 page exists
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // ✅ Handle invalid currentPage gracefully
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const isFirstPage = safeCurrentPage <= 1;
  const isLastPage = safeCurrentPage >= totalPages;

  // ✅ Fix start/end items when total = 0
  const startItem = total === 0 ? 0 : (safeCurrentPage - 1) * perPage + 1;
  const endItem = Math.min(safeCurrentPage * perPage, total);

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page !== safeCurrentPage) {
      onPageChange?.(page);
    }
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFirstPage) {
      onPageChange?.(safeCurrentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLastPage) {
      onPageChange?.(safeCurrentPage + 1);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    // ✅ Only notify parent; don’t force reset page here

    onPerPageChange?.(newPerPage);
  };

  return (
    <>
      <div data-cy="info">
        Page {safeCurrentPage} (items {startItem} - {endItem} of {total})
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
          const isActive = page === safeCurrentPage;

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
