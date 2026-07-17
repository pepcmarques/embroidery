'use client';

import { Button } from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    onPageChange(nextPage);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div
      className={`mt-8 flex w-full justify-around items-center gap-3 ${className}`}
    >
      <div className="flex items-center gap-2 sm:hidden">
        <div className="flex  items-center justify-center gap-2">
          <Button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="w-full min-w-16 sm:w-auto"
            aria-label="First page"
          >
            First
          </Button>
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="w-full min-w-16 sm:w-auto"
            aria-label="Previous page"
          >
            Prev
          </Button>
          <div className="flex flex-col justify-center items-center min-w-20 w-full sm:w-auto">
            <span className="text-sm font-medium text-embroidery-secondary">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="w-full min-w-16 sm:w-auto"
            aria-label="Next page"
          >
            Next
          </Button>
          <Button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="w-full min-w-16 sm:w-auto"
            aria-label="Last page"
          >
            Last
          </Button>
        </div>
      </div>

      <div className="hidden w-full flex-col items-center gap-3 sm:flex">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="min-w-16"
            aria-label="First page"
          >
            First
          </Button>
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="min-w-16"
            aria-label="Previous page"
          >
            Previous
          </Button>

          <div className="flex max-w-full flex-wrap items-center justify-center gap-2 px-1">
            {pageNumbers.map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                variant={page === currentPage ? 'primary' : 'outline'}
                size="sm"
                className="min-w-10"
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="min-w-16"
            aria-label="Next page"
          >
            Next
          </Button>
          <Button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="min-w-16"
            aria-label="Last page"
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};
