/**
 * Unregisters any leftover Service Worker from prior site versions and clears
 * its CacheStorage. The current site has no SW; this script protects users
 * who registered one in an older deploy from seeing stale, mismatched HTML.
 * No-op once caches and registrations are gone.
 */
const SW_CLEANUP = `(function(){try{if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister();});});}if(typeof caches!=='undefined'){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});});}}catch(e){}})();`;

export function SWCleanup() {
  return <script dangerouslySetInnerHTML={{ __html: SW_CLEANUP }} />;
}
