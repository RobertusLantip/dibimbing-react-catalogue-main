import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold text-white">Shopz</div>
          <p className="mt-3 text-sm text-gray-400">Online brand clothing founded in 2006 in Japan. Heavenly focuses on selling only quality and branded items, limited edition collections by best fashion designer.</p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">About Us</h4>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>Information</li>
            <li>Store Locator</li>
            <li>Bulk Purchase</li>
            <li>Gift Delivery Service</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Help</h4>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>FAQ</li>
            <li>Online Shopping Guide</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Account</h4>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>Membership</li>
            <li>Profile</li>
            <li>Coupons</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500 flex items-center justify-between">
          <div>© Shopz 2023. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white">Privacy Policy</a>
            <span className="text-gray-700">•</span>
            <a className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
