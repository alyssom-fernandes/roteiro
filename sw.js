const V='rr-629d4ca107',ARQ=["./", "index.html", "manifest.webmanifest", "icone-180.png", "icone-192.png", "icone-512.png", "midia/d_aero.webp", "midia/d_arpoador.webp", "midia/d_bondinho.webp", "midia/d_botafogo.webp", "midia/d_brasilia.webp", "midia/d_colombo.webp", "midia/d_cristo.webp", "midia/d_gabinete.webp", "midia/d_ipanema.webp", "midia/d_jb.webp", "midia/d_mureta.webp", "midia/d_pao.webp", "midia/d_selaron.webp", "midia/d_urca.webp", "midia/f_arpoador2.webp", "midia/f_calcada.webp", "midia/h_arpoador.webp", "midia/h_baia.webp", "midia/h_botafogo.webp", "midia/h_mureta.webp", "fonte/cabinet-400.woff2", "fonte/cabinet-500.woff2", "fonte/cabinet-800.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
