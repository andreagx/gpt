const CACHE='scheda-palestra-github-v18';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./gym-women-machines.js','./photo-fallbacks.js','./pilates-extra.js','./pilates-hours.js','./reset-all.js','./theme-picker.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  await caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))));
  await self.clients.claim();
  const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  await Promise.all(clients.map(c=>c.navigate(c.url).catch(()=>{})));
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/gpt/')){
    e.respondWith((async()=>{
      try{
        const net=await fetch(e.request,{cache:'no-store'});
        if(net.ok){caches.open(CACHE).then(c=>c.put('./index.html',net.clone()));return net;}
      }catch(_){ }
      return (await caches.match('./index.html'))||Response.error();
    })());
    return;
  }
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(resp=>{
      if(resp&&resp.ok)caches.open(CACHE).then(c=>c.put(e.request,resp.clone()));
      return resp;
    }).catch(()=>caches.match(e.request).then(r=>r||Response.error())));
  }
});