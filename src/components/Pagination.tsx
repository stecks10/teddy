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
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null; // Não exibe paginação se houver apenas uma página

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      {/* Botão Anterior */}
      <button
        className="px-3 py-1 border rounded-md bg-white text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Números das Páginas */}
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

      {/* Botão Próximo */}
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
