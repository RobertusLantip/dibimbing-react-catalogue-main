import React from 'react'

export default function HeroBanner({ imageSrc, title, subtitle }) {
  return (
    <div className="w-full bg-brown-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-xl overflow-hidden bg-amber-500">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 p-6 md:p-10">
              <div className="text-sm uppercase text-gray-500 mb-2">Promo</div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{title}</h1>
              <p className="mt-3 text-gray-600 max-w-xl">{subtitle} — Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
            </div>
            <div className="w-full md:w-1/3 h-44 md:h-48 bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
