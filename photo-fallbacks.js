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
    'reverse crunch':[
      'https://ss.sport-express.ru/userfiles/materials/177/1771548/large.jpg',
      'https://assets.bodyspec.com/master/static/dac437e15e29666740c2c5d6f7abc738/b4111/woman_doing_reverse_crunch_on_yoga_mat..jpg'
    ],
    'dead bug':[
      'https://hips.hearstapps.com/hmg-prod/images/dead-bug-67b779894fc50.jpeg?crop=0.917xw%3A0.612xh%3B0.0535xw%2C0.342xh',
      'https://www.racmn.com/wp-content/uploads/2025/09/wp-DeadBug.jpeg'
    ],
    'plank':[
      'https://yorkfitness.com/cdn/shop/files/86041-1_120x60.5cm.jpg?v=1697803504'
    ],
    'side plank':[
      'https://proworksbottles.com/cdn/shop/products/TPEYogaMat_Black_2_1200x.png?v=1607696097'
    ],
    'bird dog':[
      'https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2020/05/05122353/bird-dog.jpg',
      'https://img.vevorstatic.com/fr%2FDXYJD5YC8YC0VKN62V0%2Fgoods_img-v2%2Fexercise-mat-m100-1.12.jpg?format=webp&timestamp=1718763560000'
    ],
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
    'heel taps':[
      'https://images.squarespace-cdn.com/content/v1/5b397ebd5b409b31d6223601/1585013240654-QCYOXXCV4XCNL1KAW5JG/Heel%2BTaps.JPG',
      'https://i.ytimg.com/vi/w2Um9ULrcBI/maxresdefault.jpg'
    ]
  };

  function listFor(img){
    const text=((img.alt||'')+' '+(img.closest('.exercise')?.querySelector('h3')?.textContent||'')).toLowerCase();
    for(const [key,urls] of Object.entries(FALLBACKS)) if(text.includes(key)) return urls;
    return [];
  }

  function tryFallback(img){
    if(!(img instanceof HTMLImageElement)||!img.closest('.phase')) return;
    const urls=listFor(img);
    if(!urls.length) return;
    const tried=(img.dataset.photoTried||'').split('|').filter(Boolean);
    const current=img.currentSrc||img.src||'';
    const next=urls.find(u=>u!==current&&!tried.includes(u));
    if(!next) return;
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