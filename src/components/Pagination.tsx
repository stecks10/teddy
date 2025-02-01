import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  if (totalPages === 0) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        className="px-3 py-1 border rounded-md bg-white text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-3 py-1 border rounded-md ${
            currentPage === number
              ? "bg-orange-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded-md bg-white text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
