import React, { useState } from 'react'

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold text-green-600">Shopz</div>
          <nav className="hidden md:flex gap-6 text-gray-600">
            <a href="#/" className="hover:text-gray-900 cursor-pointer">Home</a>
            <a className="hover:text-gray-900">Men</a>
            <a className="text-green-600 font-medium">Women</a>
            <a className="hover:text-gray-900">Kids</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <input
              aria-label="search"
              className="border rounded-md px-3 py-2 w-64 text-sm"
              placeholder="Search products"
            />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <button className="p-2 rounded-full hover:bg-gray-100">🔍</button>
            <button className="p-2 rounded-full hover:bg-gray-100">♡</button>
            <button className="p-2 rounded-full hover:bg-gray-100">🛒</button>
          </div>

          {/* Profile avatar (uses /avatar.png from public/, fallback shown on error) */}
          <ProfileAvatar />
        </div>
      </div>
    </header>
  )
}

function ProfileAvatar() {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">RL</div>
    )
  }

  return (
    <img
      src="/avatar.png"
      alt="profile"
      onError={() => setErrored(true)}
      className="w-8 h-8 rounded-full border object-cover"
    />
  )
}
