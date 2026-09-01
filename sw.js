const CACHE='scheda-palestra-github-v5';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./sprite.webp','./pilates-extra.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
async function withPilatesScript(resp){
  if(!resp) return resp;
  let html=await resp.text();
  if(!html.includes('pilates-extra.js')) html=html.replace('</body>','<script src="./pilates-extra.js"></script></body>');
  return new Response(html,{status:resp.status,statusText:resp.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}});
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/gpt/')){
    e.respondWith((async()=>{
      try{
        const net=await fetch(e.request,{cache:'no-store'});
        if(net.ok){const raw=net.clone();caches.open(CACHE).then(c=>c.put('./index.html',raw));return withPilatesScript(net)}
      }catch(_){ }
      return withPilatesScript(await caches.match('./index.html'));
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;})));
});
