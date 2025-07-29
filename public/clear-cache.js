// Clear Cache Script - Emergency Service Worker Reset
// Run this in browser console to completely reset service workers

;(async function clearAllCaches() {
  console.log('🧹 Starting complete cache and service worker cleanup...')

  try {
    // 1. Unregister all service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      console.log(`Found ${registrations.length} service worker registrations`)

      for (const registration of registrations) {
        console.log('Unregistering service worker:', registration.scope)
        await registration.unregister()
      }
    }

    // 2. Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      console.log(`Found ${cacheNames.length} caches to delete`)

      for (const cacheName of cacheNames) {
        console.log('Deleting cache:', cacheName)
        await caches.delete(cacheName)
      }
    }

    // 3. Clear localStorage and sessionStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.clear()
      console.log('localStorage cleared')
    }

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear()
      console.log('sessionStorage cleared')
    }

    console.log('✅ All caches and service workers cleared successfully!')
    console.log('🔄 Please reload the page for a fresh start')
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
})()

// Instructions for manual execution:
// 1. Open browser DevTools (F12)
// 2. Go to Console tab
// 3. Copy and paste this entire script
// 4. Press Enter to execute
// 5. Reload the page
