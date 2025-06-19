const CACHE_NAME = 'taskmaster-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Установка service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Уведомления
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'complete') {
    // Логика завершения задачи
    console.log('Task completed via notification');
  } else if (event.action === 'snooze') {
    // Логика отложения задачи
    console.log('Task snoozed via notification');
  }
  
  // Открыть приложение
  event.waitUntil(
    clients.openWindow('/')
  );
});
