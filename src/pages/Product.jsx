import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

export default function Product({ id }) {
  const [product, setProduct] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [reviews, setReviews] = useState([])
  const [activeImage, setActiveImage] = useState(null)
  const [tab, setTab] = useState('details')
  const recRef = useRef(null)

  const normalize = (v) => {
    if (!v) return []
    if (v.reviews && Array.isArray(v.reviews)) return v.reviews
    if (typeof v === 'object') return Object.values(v).filter(x => x && typeof x === 'object')
    return []
  }

  useEffect(() => {
    if (!id) return
    let mounted = true
    ;(async () => {
      try {
        const r = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await r.json()
        if (!mounted) return
        
        setProduct(data)
        setActiveImage(data.images?.[0] ?? null)
        setReviews(normalize(data.reviews))

        if (data.category) {
          const recRes = await fetch(`https://dummyjson.com/products/category/${encodeURIComponent(data.category)}?limit=8`)
          const recData = await recRes.json()
          if (!mounted) return
          setRecommended((recData.products || []).filter(p => p.id !== data.id))
        }
      } catch (e) {
        console.error('Failed to load product:', e)
      }
    })()

    return () => { mounted = false }
  }, [id])

  const scrollNext = () => { if (recRef.current) recRef.current.scrollBy({ left: recRef.current.clientWidth * 0.8, behavior: 'smooth' }) }
  const scrollPrev = () => { if (recRef.current) recRef.current.scrollBy({ left: -recRef.current.clientWidth * 0.8, behavior: 'smooth' }) }

  if (!product) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">Loading...</main>
      <Footer />
    </div>
  )

  const price = product.price
  const originalPrice = product.discountPercentage ? Math.round(price / (1 - product.discountPercentage / 100)) : null

  const currentReviews = reviews.length ? reviews : normalize(product.reviews)
  const rating = currentReviews.length ? (currentReviews.reduce((s, r) => s + (r.rating || 0), 0) / currentReviews.length) : (product.rating || 0)

  const ratingCounts = [0,0,0,0,0]
  if (currentReviews.length) currentReviews.forEach(r => { const idx = Math.max(0, Math.min(4, Math.round((r.rating || 0) - 1))); ratingCounts[idx]++ })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">Home / Men / Tops / <span className="text-gray-700">{product.title}</span></nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg p-4">
              <img src={activeImage || product.images?.[0]} alt={product.title} className="w-full h-[520px] object-contain rounded-md bg-gray-50" />
              <div className="mt-4 flex items-center gap-3">
                {product.images?.slice(0,5).map((src, i) => (
                  <button key={i} onClick={() => setActiveImage(src)} className={`w-20 h-20 rounded-md overflow-hidden border ${activeImage===src ? 'ring-2 ring-green-400' : 'border-gray-200'}`}>
                    <img src={src} alt={`${product.title}-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="text-3xl font-bold text-gray-900">${price}</div>
                {originalPrice && <div className="text-sm text-gray-400 line-through">${originalPrice}</div>}
                <div className="ml-auto text-sm text-gray-600">{product.stock} in stock</div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-500 font-semibold">★ {rating.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">({currentReviews.length || '—'} reviews)</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-600">Color:</div>
                <div className="flex items-center gap-2 mt-2">
                  {(() => {
                    const palette = ['#111827','#FFFFFF','#F3F4F6','#E5E7EB','#FDE68A','#FCA5A5','#C7F9CC','#93C5FD','#D9A7FF']
                    const provided = product.colors && Array.isArray(product.colors) && product.colors.length ? product.colors : null
                    const chips = provided || (product.images || []).slice(0,3).map((_, i) => palette[(product.id + i) % palette.length])
                    return chips.map((color, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); if (product.images && product.images[i]) setActiveImage(product.images[i]) }}
                        title={color}
                        className="w-8 h-8 rounded-md border"
                        style={{ backgroundColor: color }}
                      />
                    ))
                  })()}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600">Size:</div>
                <div className="flex items-center gap-2 mt-2">
                  {['XS','S','M','L','XL','XXL'].map((s) => (
                    <button key={s} className={`px-3 py-1 border rounded text-sm ${s==='S' ? 'bg-gray-900 text-white' : 'bg-white'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-green-600 text-white px-4 py-3 rounded-md">Add to Cart</button>
                <button className="flex-1 border rounded-md px-4 py-3">Buy this Item</button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setTab('details')} className={`px-3 py-2 ${tab==='details' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}>Details</button>
            <button onClick={() => setTab('reviews')} className={`px-3 py-2 ${tab==='reviews' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}>Reviews</button>
            <button onClick={() => setTab('discussion')} className={`px-3 py-2 ${tab==='discussion' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}>Discussion</button>
          </div>

          <div className="mt-4">
            {tab === 'details' && (
              <div className="text-sm text-gray-700">
                <p>{product.description}</p>
                <ul className="mt-3 text-sm text-gray-600">
                  <li>Brand: {product.brand}</li>
                  <li>Category: {product.category}</li>
                  <li>SKU: {product.sku || '—'}</li>
                  <li>Stock: {product.stock}</li>
                </ul>
              </div>
            )}

            {tab === 'reviews' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {(currentReviews.length ? currentReviews : [{rating: rating, comment: 'No reviews available.'}]).map((r, i) => {
                    const name = r.reviewerName || r.name || r.username || (r.user && (r.user.username || r.user.name)) || 'Anonymous'
                    const comment = r.comment || r.body || r.text || r.message || '—'
                    const rRating = r.rating || r.stars || rating
                    return (
                      <div key={i} className="border-b py-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{name}</div>
                          <div className="text-sm text-yellow-500">★ {rRating}</div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{comment}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="md:col-span-1 bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-600 mb-2">Rating Breakdown</div>
                  { [5,4,3,2,1].map((star, idx) => (
                    <div key={star} className="flex items-center gap-3 text-sm mb-2">
                      <div className="w-6">{star}★</div>
                      <div className="flex-1 bg-white h-3 rounded overflow-hidden">
                        <div style={{ width: `${Math.min(100, (ratingCounts[idx] / Math.max(1, currentReviews.length || 1)) * 100)}%` }} className="bg-yellow-400 h-3"></div>
                      </div>
                      <div className="w-8 text-right">{ratingCounts[idx]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'discussion' && (
              <div className="text-sm text-gray-600">Discussion is not implemented yet.</div>
            )}
          </div>
        </div>
      </div>

      {recommended && recommended.length > 0 && (
        <main className="max-w-6xl mx-auto px-4 py-8">
          <section className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Recommended for you</h2>
            <div className="relative">

              {recommended.length > 4 && (
                <>
                  <button onClick={scrollPrev} aria-label="prev" className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-sm inline-flex">‹</button>
                  <button onClick={scrollNext} aria-label="next" className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-sm inline-flex">›</button>
                </>
              )}

              <div ref={recRef} className="flex gap-4 overflow-x-auto no-scrollbar py-2 flex-nowrap">
                {recommended.map((p) => (
                  <div key={p.id} className="min-w-[220px] flex-shrink-0">
                    <ProductCard product={p} compact />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  )
}
