import React, { useEffect, useState } from 'react'

export default function FilterBar({ selectedCategory, onCategoryChange, onSortChange }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then((r) => r.json())
      .then((list) => setCategories(list || []))
      .catch(() => setCategories([]))
  }, [])

  return (
    <div className="my-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white border rounded-lg px-3 py-3 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-3 whitespace-nowrap">
                <button
                  onClick={() => onCategoryChange(null)}
                  className={`text-sm px-3 py-2 rounded-md ${!selectedCategory ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-white border hover:bg-gray-50'}`}>
                  All
                </button>

                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => onCategoryChange(c)}
                    className={`text-sm px-3 py-2 rounded-md ${selectedCategory === c ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-white border hover:bg-gray-50'}`}>
                    {c.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 ml-6">
              <button className="text-sm text-gray-600 hover:text-gray-900">More Filter +</button>
              <select
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
                className="text-sm border rounded-md px-3 py-2">
                <option value="">Recommended</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="rating:desc">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
