(()=>{
  const Y=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
  const PREFIX='gym-women-machines-v4-';

  const PHOTOS={
    chestpress:[
      'https://westwood.ie/img/asset/aW1hZ2VzL2NsdWJzL2R1bi1sYW9naGFpcmUtZ3ltLWNwLmpwZWc/dun-laoghaire-gym-cp.jpeg?h=4200&s=e5fb6da64680c4db435e40f465b63fc8&w=2800',
      'https://www.aprilyoungfitness.com/uploads/1/2/1/3/121349996/machine-chest-press_orig.jpg'
    ],
    chestpress2:[
      'https://westwood.ie/img/asset/aW1hZ2VzL2NsdWJzL2R1bi1sYW9naGFpcmUtZ3ltLWNwLmpwZWc/dun-laoghaire-gym-cp.jpeg?h=4200&s=e5fb6da64680c4db435e40f465b63fc8&w=2800',
      'https://static1.squarespace.com/static/5c641b18da50d324fa8e85f0/t/5d8f6bd4ec26e557b449f188/1571552239079/Screen%2BShot%2B2019-09-28%2Bat%2B15.18.30.png?format=1500w'
    ],
    pecdeck:[
      'https://img.championat.com/hksHWAAOXnfRfYUM8NMgqViOkRNQapvBV5x9ZndKLBk/p(w:1350/h:900)/news/big/l/w/svedenie-ruk-v-trenazhyore-dlya-prokachki-grudnyh-myshc_1700214736335708174.jpg',
      'https://www.fabrykasily.pl/upload/gallery/2019/03/id_21258_1552923825_1260x840.jpg'
    ],
    legpress:[
      'https://images.ctfassets.net/sby3b3ghdq6f/3crNdIx1z8SzXMIU4p86Ze/bf3136f8988f5f87aa9c6a2d3896782b/Seated_Leg_Press.webp',
      'https://www.projectinvictus.it/wp-content/uploads/2021/05/2102_AA_PROJECT21_01_641-scaled.jpg'
    ],
    legcurl:[
      'https://contents.mediadecathlon.com/s1197573/k%242f7d2a7af245a0a1e87c27ace25446ed/1800x0/600pt400/1200xcr800/kobieta-cwiczaca-uginanie-nog-na-maszynie-siedzac.jpg?format=auto',
      'https://cdn.corenutrition.fi/images/artiklar/sittande%20l%C3%A5rcurl-4-892.jpg'
    ],
    abductor:[
      'https://lafitness.files.wordpress.com/2014/05/abductor-machine-prop-up-and-lean-forward-progression-exercise-4.jpg?w=1576',
      'https://images.ctfassets.net/sby3b3ghdq6f/69gqEECa8zMnaSlLWScKsI/87e56e5e76d4f2e80f712c9189465c5a/Abductor.webp'
    ],
    reversecrunch:[
      'https://assets.bodyspec.com/master/static/dac437e15e29666740c2c5d6f7abc738/b4111/woman_doing_reverse_crunch_on_yoga_mat..jpg',
      'https://www.my-personaltrainer.it/2023/06/06/reverse-crunch-orig.jpeg'
    ],
    plank:['https://bi.im-g.pl/im/24/0a/1a/z27305508IER%2CPlank-zrobimy-w-kilku-roznych-wersjach.jpg'],
    lat:[
      'https://static.showit.co/400/Q6P8x8DKqu1DNp-wm6Fzng/142685/541c0dcf-5308-497b-8e17-8cc25ab77a23_1_201_a.jpg',
      'https://www.factoryfast.com.au/cdn/shop/files/cc7fe61a175eeb951f11a7d526732ae1_1400x.jpg?v=1762941359'
    ],
    row:[
      'https://www.titaniumstrength.it/media/catalog/product/cache/091edd3dd24f94ee9e594de8bb6fb808/d/s/dsc08645-min-min.jpg',
      'https://cdn.shopify.com/s/files/1/0754/7279/8002/files/BlogUpperBack-9.webp?v=1736317611'
    ],
    shoulderpress:[
      'https://cdn.shopify.com/s/files/1/0850/4147/9946/files/336_Shoulder_Front_Press_Framsida_Axelpress.jpg?v=1768383528&width=5000',
      'https://profi-fitness-shop.de/cdn/shop/products/schulterpresse-active-gym-usa-102420_1445x.jpg?v=1665429891'
    ],
    deadbug:[
      'https://cdn.mos.cms.futurecdn.net/5xT5c5rK7iQSQc73RKZysb-1827-80.jpg',
      'https://www.racmn.com/wp-content/uploads/2025/09/wp-DeadBug.jpeg'
    ],
    sideplank:['https://hips.hearstapps.com/hmg-prod/images/plank-forearm-side-plank-746-1653516947.jpg?crop=0.694xw:0.694xh;0.182xw,0.260xh&resize=980:*'],
    birddog:[
      'https://fitness-garage-blog.s3.eu-central-1.amazonaws.com/s3fs-public/inline-images/Bird%20dog%202.gif',
      'https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2020/05/05122353/bird-dog.jpg'
    ],
    legextension:[
      'https://saragepstein.wordpress.com/wp-content/uploads/2015/02/img_4724-2.jpg',
      'https://img.magnific.com/free-photo/pretty-woman-working-her-quads-machine-press-gym_231208-3396.jpg?q=80&semt=ais_hybrid&w=740'
    ],
    adductor:[
      'https://axgym.ru/sites/default/files/news5-1.jpg',
      'https://static.tildacdn.com/tild6232-6433-4234-a462-316262303637/nogi-4.jpg'
    ],
    kickback:[
      'https://admin.wellandgood.com/wp-content/uploads/sites/3/2024/09/Cable-glute-kickback.jpg?w=500',
      'https://media.bormm.com/wp-content/uploads/2024/09/cable-machine-glute-exercises.jpg'
    ],
    heeltaps:['https://i.pinimg.com/originals/7d/0c/df/7d0cdfdaef92632528d3802859f4c72f.jpg']
  };

  const PLANS={
    A:{title:'Petto + Glutei + Core',subtitle:'Allenamento A · guidato e facile',items:[
      ['Chest press guidata','Macchina chest press Matrix','3 × 10–12','60–75 s',Y('woman machine chest press proper form tutorial'),'MACCHINE','chestpress'],
      ['Pec Deck / Butterfly','Pec deck / butterfly machine','3 × 12–15','45–60 s',Y('woman pec deck machine proper form tutorial'),'MACCHINE','pecdeck'],
      ['Leg press guidata','Matrix Leg Press / pressa guidata','3 × 10–15','60–75 s',Y('woman leg press proper form tutorial'),'MACCHINE','legpress'],
      ['Leg curl guidato','Macchina leg curl seduto','3 × 12–15','60 s',Y('woman seated leg curl machine proper form tutorial'),'MACCHINE','legcurl'],
      ['Abductor machine','Macchina abduttori','3 × 15–20','45–60 s',Y('woman hip abductor machine proper form tutorial'),'MACCHINE','abductor'],
      ['Reverse crunch','Tappetino','3 × 12–15','30–45 s',Y('woman reverse crunch proper form tutorial'),'CORE','reversecrunch'],
      ['Dead bug','Tappetino','3 × 10 / lato','30 s',Y('woman dead bug proper form tutorial'),'CORE','deadbug'],
      ['Plank','Tappetino','3 × 35–50 s','45 s',Y('woman forearm plank proper form tutorial'),'CORE','plank']
    ]},
    B:{title:'Upper body + Petto + Core',subtitle:'Allenamento B · postura e parte alta',items:[
      ['Lat machine presa comoda','Lat machine / stazione guidata','3 × 10–12','60–75 s',Y('woman lat pulldown proper form tutorial'),'MACCHINE','lat'],
      ['Seated row al pulley','Pulley basso / row guidato','3 × 10–12','60–75 s',Y('woman seated cable row proper form tutorial'),'MACCHINE','row'],
      ['Shoulder press guidata','Macchina press spalle','3 × 10–12','60 s',Y('woman machine shoulder press proper form tutorial'),'MACCHINE','shoulderpress'],
      ['Chest press convergente leggera','Macchina chest press · carico moderato','3 × 12–15','60 s',Y('woman converging chest press machine proper form tutorial'),'MACCHINE','chestpress2'],
      ['Dead bug con estensione alternata','Tappetino','3 × 8–10 / lato','30 s',Y('woman dead bug alternating extension tutorial'),'CORE','deadbug'],
      ['Side plank','Tappetino','3 × 25–40 s / lato','30 s',Y('woman side plank proper form tutorial'),'CORE','sideplank'],
      ['Bird dog','Tappetino','3 × 10 / lato','30 s',Y('woman bird dog proper form tutorial'),'CORE','birddog'],
      ['Heel taps','Tappetino','3 × 16–20 totali','30 s',Y('woman heel taps abs proper form tutorial'),'CORE','heeltaps']
    ]},
    C:{title:'Gambe + Glutei + Petto + Core',subtitle:'Allenamento C · semplice e controllato',items:[
      ['Leg extension guidata','Macchina leg extension','3 × 12–15','60 s',Y('woman leg extension machine proper form tutorial'),'MACCHINE','legextension'],
      ['Leg press guidata','Matrix Leg Press / pressa guidata','3 × 10–15','60–75 s',Y('woman leg press proper form tutorial'),'MACCHINE','legpress'],
      ['Adductor machine','Macchina adduttori','3 × 12–15','45–60 s',Y('woman hip adductor machine proper form tutorial'),'MACCHINE','adductor'],
      ['Glute kickback al cavo','Cavo basso + cavigliera','3 × 12–15 / gamba','45 s',Y('woman cable glute kickback proper form tutorial'),'CAVI','kickback'],
      ['Chest press guidata','Macchina chest press Matrix','3 × 10–12','60–75 s',Y('woman machine chest press proper form tutorial'),'MACCHINE','chestpress'],
      ['Reverse crunch','Tappetino','3 × 12–15','30–45 s',Y('woman reverse crunch proper form tutorial'),'CORE','reversecrunch'],
      ['Heel taps','Tappetino','3 × 16–20 totali','30 s',Y('woman heel taps abs proper form tutorial'),'CORE','heeltaps'],
      ['Plank con appoggio avambracci','Tappetino','3 × 35–50 s','45 s',Y('woman forearm plank proper form tutorial'),'CORE','plank']
    ]}
  };

  if(!document.getElementById('women-machines-style')){
    const s=document.createElement('style');
    s.id='women-machines-style';
    s.textContent=`
      .group-label{margin:12px 0 7px;padding:7px 9px;border-radius:9px;background:#eef2f7;color:#344054;font-size:10px;font-weight:900;letter-spacing:.07em}
      .photo-note{margin:9px 0 12px;padding:10px 11px;border-radius:11px;background:#fff0f6;border:1px solid #f9a8d4;color:#9d174d;font-size:11px;line-height:1.45}
      .phase-pair{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 10px 2px}
      .phase-pair.single{grid-template-columns:1fr}
      .phase{margin:0;border:1px solid #e4e7ec;border-radius:12px;overflow:hidden;background:#f8fafc;min-width:0;position:relative}
      .phase img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#f8fafc}
      .phase figcaption{padding:7px;text-align:center;font-size:10px;font-weight:900;letter-spacing:.09em;background:#f8fafc;color:#475467;border-top:1px solid #eef1f4}
      .phase.missing{min-height:170px;display:flex;flex-direction:column;justify-content:flex-end}
      .phase.missing:before{content:'Foto non disponibile';margin:auto;padding:18px;color:#98a2b3;font-size:11px;text-align:center}
      .phase.missing img{display:none}
      .easy-badge{display:inline-block;margin-top:6px;background:#ecfdf3;color:#067647;border:1px solid #abefc6;border-radius:999px;padding:3px 7px;font-size:10px;font-weight:800}
    `;
    document.head.appendChild(s);
  }

  function phases(kind,name){
    const p=PHOTOS[kind]||[];
    if(p.length===1){
      return `<div class="phase-pair single"><figure class="phase"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${p[0]}" alt="${name} - donna"><figcaption>POSIZIONE</figcaption></figure></div>`;
    }
    return `<div class="phase-pair"><figure class="phase"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${p[0]||''}" alt="${name} - posizione iniziale - donna"><figcaption>INIZIO</figcaption></figure><figure class="phase"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${p[1]||p[0]||''}" alt="${name} - posizione finale - donna"><figcaption>FINE</figcaption></figure></div>`;
  }

  function card(day,i,e){
    const k=PREFIX+day+'-'+(i+1);
    return `<article class="exercise" data-machine-workout="${day}">${phases(e[6],e[0])}<div class="body"><div class="top"><span class="num">${i+1}</span><div><h3>${e[0]}</h3><div class="meta">🧰 ${e[1]}<br>🔁 ${e[2]} · ⏱ ${e[3]}<br><span class="easy-badge">Esecuzione semplice / controllata</span></div></div><label class="done"><input type="checkbox" data-machine-key="${k}-done">✓</label></div><div class="track"><label>Peso<input inputmode="decimal" placeholder="kg" data-machine-key="${k}-peso"></label><label>Rip. fatte<input inputmode="numeric" placeholder="es. 12" data-machine-key="${k}-reps"></label></div><a class="video" href="${e[4]}" target="_blank" rel="noopener">▶ Guarda esecuzione corretta</a><details><summary>Note personali</summary><textarea rows="2" data-machine-key="${k}-note" placeholder="Carico, regolazioni macchina, sensazioni…"></textarea></details></div></article>`;
  }

  function renderDay(day){
    const p=PLANS[day],sec=document.querySelector('#w-'+day);if(!sec)return;
    const head=sec.querySelector('.head');
    if(head)head.innerHTML=`<div><small>${p.subtitle}</small><h2>${p.title}</h2></div>`;
    let html='<div class="photo-note"><b>Foto donna INIZIO / FINE:</b> riferimento visivo del movimento. La macchina può avere un design diverso da quella presente in sala.</div>',last='';
    p.items.forEach((e,i)=>{if(e[5]!==last){last=e[5];html+=`<div class="group-label">${last}</div>`}html+=card(day,i,e)});
    const list=sec.querySelector('.list');if(list)list.innerHTML=html;
  }

  function updateSchedule(){
    const sched=document.querySelector('.schedule');
    if(sched){
      const byDay={};[...sched.children].forEach(c=>{const b=c.querySelector('b');if(b)byDay[b.textContent.trim().toLowerCase()]=c});
      if(byDay.lun)byDay.lun.innerHTML='<b>Lun</b><strong>A</strong><span>Petto + Glutei + Core</span>';
      if(byDay.mer)byDay.mer.innerHTML='<b>Mer</b><strong>B</strong><span>Upper body + Petto + Core</span>';
      if(byDay.gio)byDay.gio.innerHTML='<b>Gio</b><strong>Pilates Reformer</strong><span>19:00 · FitActive</span>';
      if(byDay.ven)byDay.ven.innerHTML='<b>Ven</b><strong>C</strong><span>Gambe + Glutei + Petto + Core</span>';
    }
    const nav=document.querySelector('nav');
    if(nav){
      const a=nav.querySelector('a[href="#w-A"]'),b=nav.querySelector('a[href="#w-B"]'),c=nav.querySelector('a[href="#w-C"]');
      if(a)a.textContent='A · Petto/Glutei';if(b)b.textContent='B · Upper/Core';if(c)c.textContent='C · Gambe/Petto';
    }
    const sub=document.querySelector('header p');if(sub)sub.textContent='Focus: Petto · Core · Glutei · Postura';
  }

  function refreshProgress(){
    const b=[...document.querySelectorAll('input[type=checkbox][data-machine-key]')],d=b.filter(x=>x.checked).length,p=b.length?Math.round(d*100/b.length):0;
    const fill=document.getElementById('fill'),prog=document.getElementById('prog');
    if(fill)fill.style.width=p+'%';if(prog)prog.textContent=p+'% completato · '+d+'/'+b.length+' esercizi';
  }

  function bind(){
    document.querySelectorAll('.phase img').forEach(img=>img.addEventListener('error',()=>img.closest('.phase')?.classList.add('missing'),{once:true}));
    document.querySelectorAll('[data-machine-key]').forEach(el=>{
      const k=el.dataset.machineKey,v=localStorage.getItem(k);
      if(v!==null)el.type==='checkbox'?el.checked=v==='1':el.value=v;
      el.addEventListener(el.type==='checkbox'?'change':'input',()=>{localStorage.setItem(k,el.type==='checkbox'?(el.checked?'1':'0'):el.value);refreshProgress()});
    });
    refreshProgress();
  }

  function run(){['A','B','C'].forEach(renderDay);updateSchedule();bind();setTimeout(updateSchedule,0)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
