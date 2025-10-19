// Cache ရဲ့ version နာမည်ပါ။ နောက်ပိုင်း app ကို update လုပ်ရင် ဒီနာမည်ပြောင်းပေးရုံပဲ။
const CACHE_NAME = 'ot-tracker-cache-v1';

// Offline အလုပ်လုပ်ဖို့ သိမ်းထားရမယ့် ဖိုင်တွေရဲ့ list ပါ။
// တို့တွေမှာ HTML ဖိုင်တစ်ခုပဲရှိတော့ ဒါပဲထည့်ရင် လုံလောက်တယ်။
const urlsToCache = [
  '/',
  'index.html' 
];

// Service Worker ကို install လုပ်တဲ့အချိန်မှာ အလုပ်လုပ်မယ့်အပိုင်း
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ကိုဖွင့်လိုက်ပြီ');
        // အပေါ်က list ထဲက ဖိုင်တွေကို download ဆွဲပြီး သိမ်းထားလိုက်မယ်
        return cache.addAll(urlsToCache);
      })
  );
});

// App ကနေ file တစ်ခုခုတောင်းဆိုတိုင်း (ဥပမာ- page refresh လုပ်ရင်) အလုပ်လုပ်မယ့်အပိုင်း
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // တောင်းဆိုတဲ့ဖိုင်က cache ထဲမှာ ရှိ၊ မရှိ စစ်မယ်
        if (response) {
          // ရှိနေရင် internet ဆီမသွားတော့ဘဲ cache ထဲကဟာကိုပဲ ပြန်ပေးလိုက်မယ် (ဒါကြောင့် offline ရတာ)
          return response;
        }
        // cache ထဲမှာမရှိမှ internet ကနေ သွားယူမယ်
        return fetch(event.request);
      }
    )
  );
});