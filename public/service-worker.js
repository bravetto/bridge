// JAHmere Webb Freedom Portal - Service Worker (Temporarily Disabled)
// Disabling service worker to fix hydration issues first

console.log('Service Worker: Temporarily disabled for hydration debugging')

// Skip installation and activation
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event - skipping')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event - skipping')
  self.clients.claim()
})

// Skip all fetch events to prevent interference
self.addEventListener('fetch', (event) => {
  // Do nothing - let browser handle all requests normally
  return
})

console.log('Service Worker: Disabled - all requests handled by browser')
