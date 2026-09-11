(()=>{
  const CORE_PHOTOS={
  "reverse crunch": [
    "https://hips.hearstapps.com/hmg-prod/images/766/images/reverse-crunch-1492648561.jpg?resize=980%3A%2A",
    "https://hips.hearstapps.com/hmg-prod/images/766/images/reverse-crunch-1492648561.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/766/images/reverse-crunch-1492648561.jpg?resize=640:*"
  ],
  "dead bug": [
    "https://www.racmn.com/wp-content/uploads/2025/09/wp-DeadBug.jpeg",
    "https://cdn.mos.cms.futurecdn.net/5xT5c5rK7iQSQc73RKZysb-1827-80.jpg",
    "https://www.racmn.com/wp-content/uploads/2025/09/wp-DeadBug.jpeg?width=640"
  ],
  "side plank": [
    "https://hips.hearstapps.com/hmg-prod/images/plank-forearm-side-plank-746-1653516947.jpg?resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/plank-forearm-side-plank-746-1653516947.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/plank-forearm-side-plank-746-1653516947.jpg?resize=640:*"
  ],
  "bird dog": [
    "https://cdn.vidaativa.pt/uploads/2020/08/jovem-a-praticar-bird-dog.jpg",
    "https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2020/05/05122353/bird-dog.jpg",
    "https://cdn.vidaativa.pt/uploads/2020/08/jovem-a-praticar-bird-dog.jpg?width=640"
  ],
  "heel taps": [
    "https://s3.dualstack.us-east-1.amazonaws.com/busites_www/deniseaustincom/pages/2025_04_28_00.59.05.jpeg",
    "https://s3.dualstack.us-east-1.amazonaws.com/busites_www/deniseaustincom/pages/2025_04_28_00.59.05.jpeg?width=980",
    "https://s3.dualstack.us-east-1.amazonaws.com/busites_www/deniseaustincom/pages/2025_04_28_00.59.05.jpeg?width=640"
  ],
  "plank": [
    "https://medconsult.bg/media/k2/items/cache/21b5e729f134b63ab65dbce08097f32c_XL.jpg",
    "https://bi.im-g.pl/im/24/0a/1a/z27305508IER%2CPlank-zrobimy-w-kilku-roznych-wersjach.jpg",
    "https://medconsult.bg/media/k2/items/cache/21b5e729f134b63ab65dbce08097f32c_XL.jpg?width=640"
  ]
};

  const style=document.createElement('style');
  style.id='core-static-photos-style';
  style.textContent=`
    .core-demo img:not([data-core-photo-ready="1"]){visibility:hidden}
    .core-demo img[data-core-photo-ready="1"]{visibility:visible;object-fit:cover!important;background:#f8fafc!important}
  `;
  document.head.appendChild(style);

  function keyFor(img){
    const exercise=img.closest('.exercise');
    if(!exercise) return '';
    const title=(exercise.querySelector('h3')?.textContent||'').trim().toLowerCase();
    if(title.includes('reverse crunch')) return 'reverse crunch';
    if(title.includes('dead bug')) return 'dead bug';
    if(title.includes('side plank')) return 'side plank';
    if(title.includes('bird dog')) return 'bird dog';
    if(title.includes('heel taps')) return 'heel taps';
    if(title.includes('plank')) return 'plank';
    return '';
  }

  function apply(img,force=false){
    if(!(img instanceof HTMLImageElement)||!img.closest('.core-demo')) return;
    const key=keyFor(img);
    const urls=CORE_PHOTOS[key];
    if(!urls?.length) return;

    if(force||img.dataset.corePhotoKey!==key){
      img.dataset.corePhotoKey=key;
      img.dataset.corePhotoIndex='0';
      img.dataset.corePhotoReady='1';
      img.referrerPolicy='no-referrer';
      img.alt=(img.closest('.exercise')?.querySelector('h3')?.textContent||key)+' - foto donna';
      img.src=urls[0];
      const cap=img.closest('figure')?.querySelector('figcaption');
      if(cap) cap.textContent='FOTO DONNA';
      img.closest('.phase')?.classList.remove('missing');
    }
  }

  function scan(root=document){
    root.querySelectorAll?.('.core-demo img').forEach(img=>apply(img));
  }

  document.addEventListener('error',e=>{
    const img=e.target;
    if(!(img instanceof HTMLImageElement)||!img.closest('.core-demo')) return;
    const key=keyFor(img),urls=CORE_PHOTOS[key];
    if(!urls?.length) return;
    e.stopImmediatePropagation();
    const next=(Number(img.dataset.corePhotoIndex||'0')+1);
    if(next<urls.length){
      img.dataset.corePhotoIndex=String(next);
      img.dataset.corePhotoReady='1';
      img.closest('.phase')?.classList.remove('missing');
      img.src=urls[next];
    }else{
      img.dataset.corePhotoReady='0';
      img.removeAttribute('src');
      img.closest('.phase')?.classList.add('missing');
    }
  },true);

  const mo=new MutationObserver(mutations=>{
    for(const m of mutations){
      for(const n of m.addedNodes){
        if(!(n instanceof Element)) continue;
        if(n.matches?.('.core-demo img')) apply(n,true);
        scan(n);
      }
    }
  });
  mo.observe(document.documentElement,{childList:true,subtree:true});

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>scan(),{once:true});
  else scan();
})();
