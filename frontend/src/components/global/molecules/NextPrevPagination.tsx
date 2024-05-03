import React from 'react'
import Button from '../atoms/Button'

/**
 * | Author- Sanjiv Kumar
 * | Created On- 04-02-2024
 * | Created for- Reusable Pagination
 * | Status: Done
 */

interface NextPrevPaginationProps{
    page: number;
    pageCount: number;
    handlePageChange: (direction: "prev" | "next") => void;
}

const NextPrevPagination: React.FC<NextPrevPaginationProps> = (props) => {
    const {page, pageCount, handlePageChange} = props;
  return (
    <div className="flex items-center justify-between mt-5 gap-5">
    <div>
      Showing {page} out of {pageCount} pages
    </div>
    <div className="flex items-center justify-end mt-5 gap-5">
      {page > 1 && (
        <Button
          variant="primary"
          onClick={() => handlePageChange("prev")}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
            >
              <path
                d="M7.72461 0.999692L0.999246 7.83822L7.72461 14.6768"
                stroke="white"
                strokeWidth="1.97006"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Previous
        </Button>
      )}

      {page < pageCount && (
        <Button
          variant="primary"
          onClick={() => handlePageChange("next")}
        >
          Next
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
            >
              <path
                d="M1 14.6771L7.64894 7.83853L1 1"
                stroke="white"
                strokeWidth="1.97006"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Button>
      )}
    </div>
  </div>
  )
}

export default NextPrevPagination