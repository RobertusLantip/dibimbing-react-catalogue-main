import React from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)

  return (
    <nav className="mt-8 flex items-center justify-center" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="px-3 py-1 rounded-md mr-3 text-sm border bg-white hover:bg-gray-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <ul className="flex items-center gap-2">
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md text-sm ${p === currentPage ? 'bg-green-600 text-white' : 'bg-white border hover:bg-gray-50'}`}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 rounded-md ml-3 text-sm border bg-white hover:bg-gray-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}
