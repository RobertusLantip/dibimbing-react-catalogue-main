import React, { useEffect, useState } from 'react'
import Catalogue from './pages/Catalogue'
import Product from './pages/Product'

export default function Router() {
  const [route, setRoute] = useState('home')
  const [routeId, setRouteId] = useState(null)

  useEffect(() => {
    const parseHash = () => {
      const h = typeof window !== 'undefined' ? window.location.hash || '' : ''
      if (h.startsWith('#/product/')) {
        const id = h.replace('#/product/', '')
        setRoute('product')
        setRouteId(id)
      } else {
        setRoute('home')
        setRouteId(null)
      }
    }

    parseHash()
    window.addEventListener('hashchange', parseHash)
    return () => window.removeEventListener('hashchange', parseHash)
  }, [])

  return route === 'product' ? <Product id={routeId} /> : <Catalogue />
}
