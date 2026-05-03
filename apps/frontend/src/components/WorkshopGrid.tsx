'use client';

import { useState, useEffect } from 'react';
import { WorkshopCard } from './WorkshopCard';
import { Workshop } from '@repo/ui';

interface WorkshopGridProps {
  initialWorkshops?: Workshop[];
  dataPath?: string;
}

const workshopsPerPage = 6;

export const WorkshopGrid = ({
  initialWorkshops,
  dataPath,
}: WorkshopGridProps) => {
  const [workshops, setWorkshops] = useState<Workshop[] | null>(
    initialWorkshops || null
  );
  const [isLoading, setIsLoading] = useState(!initialWorkshops);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWorkshops = async () => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let filteredWorkshops: Workshop[] = [];

      if (dataPath) {
        // Dynamically import the data file
        const data = await import(`../data/${dataPath}`);
        filteredWorkshops = data.default as Workshop[];
      } else {
        // Fallback for backward compatibility
        const data = await import('../data/mnh/mhn.json');
        filteredWorkshops = data.default as Workshop[];
      }

      // Sort workshops by date if date field exists
      filteredWorkshops = filteredWorkshops.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
      });

      setWorkshops(filteredWorkshops);
    } catch (error) {
      console.error('Failed to load workshops:', error);
      setWorkshops([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!initialWorkshops) {
      fetchWorkshops();
    }
  }, [dataPath]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentPageWorkshops = () => {
    if (!workshops) return [];

    const startIndex = (currentPage - 1) * workshopsPerPage;
    const endIndex = startIndex + workshopsPerPage;

    return workshops.slice(startIndex, endIndex);
  };

  const totalPages = workshops
    ? Math.ceil(workshops.length / workshopsPerPage)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-embroidery-primary"></div>
        </div>
      )}

      {/* Workshops grid */}
      {workshops && !isLoading && (
        <>
          {workshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentPageWorkshops().map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-embroidery-muted mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-embroidery-neutral mb-2">
                No workshops available
              </h3>
              <p className="text-embroidery-secondary">
                Check back later for new workshops.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-sm font-medium rounded-md border ${
                  currentPage === 1
                    ? 'text-embroidery-muted border-embroidery-muted bg-transparent cursor-not-allowed'
                    : 'text-embroidery-neutral border-embroidery-border hover:bg-embroidery-accent cursor-pointer'
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md border ${
                      page === currentPage
                        ? 'bg-embroidery-primary text-white border-embroidery-primary cursor-default'
                        : 'text-embroidery-neutral border-embroidery-border hover:bg-embroidery-accent cursor-pointer'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-sm font-medium rounded-md border ${
                  currentPage === totalPages
                    ? 'text-embroidery-muted border-embroidery-muted bg-transparent cursor-not-allowed'
                    : 'text-embroidery-neutral border-embroidery-border hover:bg-embroidery-accent cursor-pointer'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
