import React from 'react'

export default function ProductCard({ product, compact = false }) {
  const originalPrice = product?.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null

  return (
    <article onClick={() => (window.location.hash = `#/product/${product.id}`)} className={`group relative bg-white border rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 transform hover:scale-105 hover:shadow-md cursor-pointer flex flex-col ${compact ? 'text-sm' : ''}`}>
      <div className={`relative w-full ${compact ? 'h-44' : 'h-64'} bg-gray-100`}>
        {product?.images?.[0] ? (
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-600 shadow">❤</button>
      </div>

      

      <div className={`${compact ? 'p-2' : 'p-3'}`}>
        <h3 className={`font-medium text-gray-900 truncate ${compact ? 'text-sm' : 'text-sm'}`}>{product.title}</h3>
        {!compact && (
          <p className="text-xs text-gray-500 mt-1 h-10 overflow-hidden text-ellipsis">{product.description}</p>
        )}

        <div className={`mt-3 flex items-center justify-between ${compact ? '' : ''}`}>
          <div>
            <div className={`${compact ? 'text-sm font-semibold' : 'text-sm font-semibold'} text-gray-900`}>${product.price}</div>
            {originalPrice && (
              <div className="text-xs text-gray-400 line-through">${originalPrice}</div>
            )}
          </div>
          <div className="text-xs text-yellow-500">★ {product.rating}</div>
        </div>
      </div>

      <div className={`px-3 pb-3`}> 
        <div className="h-12 flex items-center">
          <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className={`w-full bg-green-600 text-white ${compact ? 'py-2 text-sm' : 'py-2'} rounded-md`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
