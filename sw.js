const V='rr-48582be357',ARQ=["./", "index.html", "manifest.webmanifest", "icone-180.png", "icone-192.png", "icone-512.png", "midia/capa.webp", "midia/d_aero.webp", "midia/d_arpoador.webp", "midia/d_bondinho.webp", "midia/d_botafogo.webp", "midia/d_brasilia.webp", "midia/d_colombo.webp", "midia/d_cristo.webp", "midia/d_gabinete.webp", "midia/d_ipanema.webp", "midia/d_jb.webp", "midia/d_mureta.webp", "midia/d_pao.webp", "midia/d_selaron.webp", "midia/d_urca.webp", "midia/f_arpoador2.webp", "midia/f_calcada.webp", "midia/h_arpoador.webp", "midia/h_baia.webp", "midia/h_botafogo.webp", "midia/h_mureta.webp", "fonte/cabinet-400.woff2", "fonte/cabinet-500.woff2", "fonte/cabinet-800.woff2"],ESPERA=2500;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARQ.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('rr-')&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
function pagina(req){
 return new Promise(ok=>{
  let feito=false;
  const entrega=r=>{if(!feito&&r){feito=true;ok(r)}},guardada=()=>caches.match('index.html').then(r=>{entrega(r);return r});
  const t=setTimeout(guardada,ESPERA);
  fetch(req.url,{cache:'no-cache'}).then(r=>{clearTimeout(t);entrega(r)},()=>{clearTimeout(t);guardada().then(r=>{if(!r&&!feito){feito=true;ok(Response.error())}})});
 });
}
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(pagina(e.request));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
