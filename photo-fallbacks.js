(()=>{
  const FALLBACKS={
    'chest press':[
      'https://prtimes.jp/i/9907/24/resize/d9907-24-408380-4.jpg'
    ],
    'pec deck':[
      'https://www.fabrykasily.pl/upload/gallery/2019/03/id_21258_1552923825_1260x840.jpg',
      'https://contents.mediadecathlon.com/s1172465/k%2414b328c4b352f22436359dd8d4e6ed14/1383pt660/1980xcr1320/kobieta-cwiczaca-rozpietki-na-maszynie.png?format=auto'
    ],
    'butterfly':[
      'https://www.fabrykasily.pl/upload/gallery/2019/03/id_21258_1552923825_1260x840.jpg',
      'https://contents.mediadecathlon.com/s1172465/k%2414b328c4b352f22436359dd8d4e6ed14/1383pt660/1980xcr1320/kobieta-cwiczaca-rozpietki-na-maszynie.png?format=auto'
    ],
    'leg press':[
      'https://cdn.diredonna.it/app/uploads/2016/01/shutterstock_187286369.jpg',
      'https://thecapitalfitnesscenter.me/wp-content/uploads/2019/05/Leg-press.jpg'
    ],
    'leg curl':[
      'https://cdn.svensktkosttillskott.se/images/artiklar/sittande%20l%C3%A5rcurl-3-892.jpg',
      'https://cdn.corenutrition.fi/images/artiklar/sittande%20l%C3%A5rcurl-4-892.jpg'
    ],
    'abductor':[
      'https://s3.amazonaws.com/prod.skimble/assets/2711002/image_iphone.jpg',
      'https://images.ctfassets.net/sby3b3ghdq6f/69gqEECa8zMnaSlLWScKsI/87e56e5e76d4f2e80f712c9189465c5a/Abductor.webp'
    ],
    'reverse crunch':["https://hips.hearstapps.com/hmg-prod/images/766/images/reverse-crunch-1492648561.jpg","https://hips.hearstapps.com/hmg-prod/images/766/images/reverse-crunch-1492648561.jpg?resize=640:*"],
    'dead bug':["https://cdn.mos.cms.futurecdn.net/5xT5c5rK7iQSQc73RKZysb-1827-80.jpg","https://www.racmn.com/wp-content/uploads/2025/09/wp-DeadBug.jpeg?width=640"],
    'plank':["https://bi.im-g.pl/im/24/0a/1a/z27305508IER%2CPlank-zrobimy-w-kilku-roznych-wersjach.jpg","https://medconsult.bg/media/k2/items/cache/21b5e729f134b63ab65dbce08097f32c_XL.jpg?width=640"],
    'side plank':["https://hips.hearstapps.com/hmg-prod/images/plank-forearm-side-plank-746-1653516947.jpg","https://hips.hearstapps.com/hmg-prod/images/plank-forearm-side-plank-746-1653516947.jpg?resize=640:*"],
    'bird dog':["https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2020/05/05122353/bird-dog.jpg","https://cdn.vidaativa.pt/uploads/2020/08/jovem-a-praticar-bird-dog.jpg?width=640"],
    'seated row':[
      'https://r2.ensana-media.twodo.cz/2ce1469e-dd6b-4f53-8693-06e4a6dd17dc/7b692c37-8277-4f29-9e91-c946296c48e1/25-08-2025_dcb77454-2be9-4375-80aa-5d4796841c53/file.jpg'
    ],
    'shoulder press':[
      'https://hips.hearstapps.com/hmg-prod/images/gym-machines-shoulder-press-machine-1660576228.jpg'
    ],
    'leg extension':[
      'https://v4excellencefitness.com.br/wp-content/uploads/2024/01/linda-mulher-trabalhando-seus-quadrilateros-na-maquina-prima-no-ginasio.jpg'
    ],
    'adductor':[
      'https://img-21.ccm2.net/m1PZNXnwXJc8ZVsOwQoJz7I87Ws%3D/bc8bd6cfa7804caaa96e691661315c16/ccm-faq/1071895.jpg'
    ],
    'kickback':[
      'https://cloudfront-us-east-1.images.arcpublishing.com/latribuna/VR5W7OHJE5GR5AK3G6DQJA7TEE.jpeg'
    ],
    'heel taps':["https://s3.dualstack.us-east-1.amazonaws.com/busites_www/deniseaustincom/pages/2025_04_28_00.59.05.jpeg?width=980","https://s3.dualstack.us-east-1.amazonaws.com/busites_www/deniseaustincom/pages/2025_04_28_00.59.05.jpeg?width=640"]
  };

  function listFor(img){
    const text=((img.alt||'')+' '+(img.closest('.exercise')?.querySelector('h3')?.textContent||'')).toLowerCase();
    for(const [key,urls] of Object.entries(FALLBACKS).sort((a,b)=>b[0].length-a[0].length)) if(text.includes(key)) return urls;
    return [];
  }

  function tryFallback(img){
    if(!(img instanceof HTMLImageElement)||!img.closest('.phase')) return;
    const urls=listFor(img);

    const tried=(img.dataset.photoTried||'').split('|').filter(Boolean);
    const current=img.src||'';
    if(current&&!tried.includes(current)) tried.push(current);
    const next=urls.find(u=>u!==current&&!tried.includes(u));
    img.dataset.photoTried=tried.join('|');
    if(!next){img.closest('.phase')?.classList.add('missing');return;}
    tried.push(next);
    img.dataset.photoTried=tried.join('|');
    img.closest('.phase')?.classList.remove('missing');
    img.src=next;
  }

  document.addEventListener('error',e=>{
    const img=e.target;
    if(img instanceof HTMLImageElement&&img.closest('.phase')) tryFallback(img);
  },true);

  document.addEventListener('load',e=>{
    const img=e.target;
    if(img instanceof HTMLImageElement&&img.closest('.phase')&&img.naturalWidth>0){
      img.closest('.phase')?.classList.remove('missing');
    }
  },true);

  function scan(){
    document.querySelectorAll('.phase img').forEach(img=>{
      if(img.complete&&img.naturalWidth===0) tryFallback(img);
    });
  }

  const mo=new MutationObserver(()=>setTimeout(scan,0));
  mo.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(scan,0),{once:true});
  else setTimeout(scan,0);
  setTimeout(scan,700);
  setTimeout(scan,1800);
})();
