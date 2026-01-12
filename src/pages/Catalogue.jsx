import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import FilterBar from '../components/FilterBar'
import heroBannerImage from '../assets/hand-embroidered_clothing_for_women.webp'

export default function Catalogue() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState('')

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortOption, setSortOption] = useState('')

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 12
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))

  // Fetch products from API when filters/pagination change
  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const skip = (currentPage - 1) * itemsPerPage

        let url = ''
        if (query && query.trim().length > 0) {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${itemsPerPage}&skip=${skip}`
        } else if (selectedCategory) {
          url = `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory)}?limit=${itemsPerPage}&skip=${skip}`
        } else {
          url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`
        }

        if (sortOption) {
          const [field, order] = sortOption.split(':')
          url += `&sortBy=${field}&order=${order}`
        }

        const res = await fetch(url, { signal: controller.signal })
        const data = await res.json()
        setProducts(data.products || [])
        setTotal(data.total)
      } catch (err) {
        throw new Error('Failed to load products')
      }
    }

    load()

    return () => controller.abort()
  }, [currentPage, selectedCategory, query, sortOption])

  const paginated = products

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner imageSrc={heroBannerImage} title={"Get 25% Cash Back"} subtitle={"On $200"} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Women</h2>
            <span className="text-sm text-gray-500">{total}</span>
          </div>
        </div>

        <FilterBar selectedCategory={selectedCategory} onCategoryChange={(c) => { setSelectedCategory(c); setCurrentPage(1) }} onSortChange={(val) => { setSortOption(val); setCurrentPage(1) }} />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>
      <Footer />
    </div>
  )
}
