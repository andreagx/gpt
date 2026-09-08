(()=>{
  const Y=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
  const PREFIX='gym-women-machines-v3-';

  const PLANS={
    A:{title:'Petto + Glutei + Core',subtitle:'Allenamento A · guidato e facile',items:[
      ['Chest press guidata','Macchina chest press Matrix','3 × 10–12','60–75 s',Y('woman machine chest press proper form tutorial'),'MACCHINE','chestpress'],
      ['Pec Deck / Butterfly','Pec deck / butterfly machine','3 × 12–15','45–60 s',Y('woman pec deck machine proper form tutorial'),'MACCHINE','pecdeck'],
      ['Leg press guidata','Matrix Leg Press / pressa guidata','3 × 10–15','60–75 s',Y('woman leg press proper form tutorial'),'MACCHINE','legpress'],
      ['Leg curl guidato','Macchina leg curl seduto','3 × 12–15','60 s',Y('woman seated leg curl machine proper form tutorial'),'MACCHINE','legcurl'],
      ['Abductor machine','Macchina abduttori','3 × 15–20','45–60 s',Y('woman hip abductor machine proper form tutorial'),'MACCHINE','abductor'],
      ['Pallof press','Cavo regolabile','3 × 12 / lato','30–45 s',Y('woman Pallof press proper form tutorial'),'CORE','pallof'],
      ['Reverse crunch','Tappetino','3 × 12–15','30–45 s',Y('woman reverse crunch proper form tutorial'),'CORE','reversecrunch'],
      ['Plank','Tappetino','3 × 35–50 s','45 s',Y('woman forearm plank proper form tutorial'),'CORE','plank']
    ]},
    B:{title:'Upper body + Petto + Core',subtitle:'Allenamento B · postura e parte alta',items:[
      ['Lat machine presa comoda','Lat machine / stazione guidata','3 × 10–12','60–75 s',Y('woman lat pulldown proper form tutorial'),'MACCHINE','lat'],
      ['Seated row al pulley','Pulley basso / row guidato','3 × 10–12','60–75 s',Y('woman seated cable row proper form tutorial'),'MACCHINE','row'],
      ['Shoulder press guidata','Macchina press spalle','3 × 10–12','60 s',Y('woman machine shoulder press proper form tutorial'),'MACCHINE','shoulderpress'],
      ['Chest press convergente leggera','Macchina chest press · carico moderato','3 × 12–15','60 s',Y('woman converging chest press machine proper form tutorial'),'MACCHINE','chestpress2'],
      ['Face pull','Cavo alto + corda','3 × 12–15','45 s',Y('woman face pull proper form tutorial'),'CAVI','facepull'],
      ['Dead bug','Tappetino','3 × 10 / lato','30 s',Y('woman dead bug proper form tutorial'),'CORE','deadbug'],
      ['Side plank','Tappetino','3 × 25–40 s / lato','30 s',Y('woman side plank proper form tutorial'),'CORE','sideplank'],
      ['Bird dog','Tappetino','3 × 10 / lato','30 s',Y('woman bird dog proper form tutorial'),'CORE','birddog']
    ]},
    C:{title:'Gambe + Glutei + Petto + Core',subtitle:'Allenamento C · semplice e controllato',items:[
      ['Leg extension guidata','Macchina leg extension','3 × 12–15','60 s',Y('woman leg extension machine proper form tutorial'),'MACCHINE','legextension'],
      ['Leg press guidata','Matrix Leg Press / pressa guidata','3 × 10–15','60–75 s',Y('woman leg press proper form tutorial'),'MACCHINE','legpress'],
      ['Adductor machine','Macchina adduttori','3 × 12–15','45–60 s',Y('woman hip adductor machine proper form tutorial'),'MACCHINE','adductor'],
      ['Glute kickback al cavo','Cavo basso + cavigliera','3 × 12–15 / gamba','45 s',Y('woman cable glute kickback proper form tutorial'),'CAVI','kickback'],
      ['Chest press guidata','Macchina chest press Matrix','3 × 10–12','60–75 s',Y('woman machine chest press proper form tutorial'),'MACCHINE','chestpress'],
      ['Pallof press','Cavo regolabile','3 × 10–12 / lato','30–45 s',Y('woman Pallof press proper form tutorial'),'CORE','pallof'],
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
      .phase{margin:0;border:1px solid #e4e7ec;border-radius:12px;overflow:hidden;background:#fff;min-width:0}
      .phase svg{display:block;width:100%;aspect-ratio:1/1;background:#fff}
      .phase figcaption{padding:6px;text-align:center;font-size:10px;font-weight:900;letter-spacing:.09em;background:#f8fafc;color:#475467;border-top:1px solid #eef1f4}
      .easy-badge{display:inline-block;margin-top:6px;background:#ecfdf3;color:#067647;border:1px solid #abefc6;border-radius:999px;padding:3px 7px;font-size:10px;font-weight:800}
    `;
    document.head.appendChild(s);
  }

  function femaleSvg(kind,phase,name){
    const end=phase==='end';
    const accent='var(--app-accent,#8b3fa8)';
    const machine={
      chestpress:`<rect x="15" y="70" width="32" height="72" rx="8" fill="#d0d5dd"/><rect x="44" y="82" width="12" height="60" rx="5" fill="#98a2b3"/>`,
      chestpress2:`<rect x="15" y="70" width="32" height="72" rx="8" fill="#d0d5dd"/><rect x="44" y="82" width="12" height="60" rx="5" fill="#98a2b3"/>`,
      pecdeck:`<rect x="18" y="72" width="30" height="70" rx="8" fill="#d0d5dd"/><path d="M45 83 L75 63 M45 100 L76 120" stroke="#98a2b3" stroke-width="6"/>`,
      legpress:`<path d="M24 138 L72 82 L121 82 L78 146 Z" fill="#d0d5dd"/><rect x="115" y="54" width="16" height="82" rx="5" fill="#98a2b3" transform="rotate(18 123 95)"/>`,
      legcurl:`<rect x="16" y="95" width="66" height="18" rx="7" fill="#d0d5dd"/><rect x="68" y="107" width="14" height="40" rx="6" fill="#98a2b3"/>`,
      legextension:`<rect x="16" y="90" width="66" height="20" rx="7" fill="#d0d5dd"/><rect x="70" y="106" width="15" height="36" rx="6" fill="#98a2b3"/>`,
      abductor:`<rect x="14" y="90" width="48" height="54" rx="10" fill="#d0d5dd"/><rect x="64" y="96" width="10" height="22" rx="4" fill="#98a2b3"/><rect x="64" y="124" width="10" height="22" rx="4" fill="#98a2b3"/>`,
      adductor:`<rect x="14" y="90" width="48" height="54" rx="10" fill="#d0d5dd"/><rect x="64" y="96" width="10" height="22" rx="4" fill="#98a2b3"/><rect x="64" y="124" width="10" height="22" rx="4" fill="#98a2b3"/>`,
      lat:`<rect x="20" y="25" width="8" height="125" rx="3" fill="#98a2b3"/><path d="M28 35 H122" stroke="#667085" stroke-width="6"/><path d="M112 35 V72" stroke="#667085" stroke-width="4"/>`,
      row:`<rect x="20" y="112" width="75" height="16" rx="6" fill="#d0d5dd"/><path d="M108 70 V135" stroke="#98a2b3" stroke-width="6"/>`,
      shoulderpress:`<rect x="16" y="88" width="42" height="56" rx="8" fill="#d0d5dd"/><path d="M58 65 V110 M58 65 H84" stroke="#98a2b3" stroke-width="6"/>`,
      facepull:`<path d="M128 30 V145" stroke="#98a2b3" stroke-width="6"/><path d="M126 60 H96" stroke="#667085" stroke-width="3"/>`,
      pallof:`<path d="M128 30 V145" stroke="#98a2b3" stroke-width="6"/><path d="M126 82 H95" stroke="#667085" stroke-width="3"/>`,
      kickback:`<path d="M128 30 V145" stroke="#98a2b3" stroke-width="6"/><path d="M126 122 H94" stroke="#667085" stroke-width="3"/>`
    }[kind]||'';

    let cx=84,cy=58,torsoX=75,torsoY=75;
    let arm1='M78 82 L59 103',arm2='M91 82 L108 104',leg1='M78 115 L65 143',leg2='M91 115 L104 143';
    if(['chestpress','chestpress2','pecdeck'].includes(kind)){arm1=end?'M78 82 L48 82':'M78 82 L58 101';arm2=end?'M91 82 L121 82':'M91 82 L112 101';}
    if(kind==='legpress'){cy=70;torsoX=60;torsoY=88;arm1='M65 95 L45 115';arm2='M78 95 L94 111';leg1=end?'M70 118 L112 91':'M70 118 L91 100';leg2=end?'M82 118 L121 94':'M82 118 L101 103';}
    if(['legcurl','legextension','abductor','adductor'].includes(kind)){cx=59;cy=58;torsoX=50;torsoY=75;arm1='M54 83 L38 105';arm2='M67 83 L78 104';leg1=(kind==='legextension'&&end)?'M54 116 L87 116':'M54 116 L52 144';leg2=(kind==='abductor'&&end)?'M66 116 L95 140':(kind==='adductor'&&end)?'M66 116 L78 140':'M66 116 L70 144';}
    if(kind==='lat'){arm1=end?'M78 82 L61 70':'M78 82 L56 43';arm2=end?'M91 82 L108 70':'M91 82 L114 43';}
    if(kind==='row'){arm1=end?'M78 82 L61 84':'M78 82 L49 84';arm2=end?'M91 82 L108 84':'M91 82 L120 84';}
    if(kind==='shoulderpress'){arm1=end?'M78 82 L69 46':'M78 82 L61 67';arm2=end?'M91 82 L100 46':'M91 82 L108 67';}
    if(kind==='facepull'){arm1=end?'M78 82 L96 71':'M78 82 L104 82';arm2=end?'M91 82 L101 71':'M91 82 L116 82';}
    if(kind==='pallof'){arm1=end?'M78 82 L106 82':'M78 82 L92 82';arm2=end?'M91 82 L106 82':'M91 82 L94 82';}
    if(kind==='kickback'){leg1=end?'M78 115 L48 134':'M78 115 L70 143';leg2='M91 115 L98 143';}
    if(kind==='reversecrunch'){cx=80;cy=88;torsoX=70;torsoY=101;arm1='M74 108 L52 121';arm2='M87 108 L108 121';leg1=end?'M76 129 L71 104':'M76 129 L62 145';leg2=end?'M88 129 L93 104':'M88 129 L103 145';}
    if(kind==='plank'){cx=45;cy=93;torsoX=57;torsoY=103;arm1='M60 110 L45 132';arm2='M70 110 L58 132';leg1='M80 116 L118 132';leg2='M88 116 L128 132';}
    if(kind==='sideplank'){cx=48;cy=87;torsoX=61;torsoY=101;arm1='M64 108 L47 132';arm2=end?'M70 104 L78 65':'M70 104 L82 86';leg1='M79 116 L119 132';leg2='M84 120 L125 137';}
    if(kind==='deadbug'){cx=80;cy=91;torsoX=71;torsoY=104;arm1=end?'M75 108 L52 82':'M75 108 L64 88';arm2='M87 108 L102 88';leg1=end?'M77 129 L55 145':'M77 129 L68 145';leg2='M89 129 L102 145';}
    if(kind==='birddog'){cx=55;cy=91;torsoX=66;torsoY=104;arm1=end?'M68 108 L38 96':'M68 108 L50 128';arm2='M80 108 L66 130';leg1='M83 120 L76 143';leg2=end?'M91 120 L126 108':'M91 120 L103 143';}
    if(kind==='heeltaps'){cx=79;cy=86;torsoX=70;torsoY=100;arm1=end?'M74 108 L50 126':'M74 108 L59 126';arm2=end?'M87 108 L111 126':'M87 108 L102 126';leg1='M76 129 L56 145';leg2='M89 129 L109 145';}

    return `<svg viewBox="0 0 150 160" role="img" aria-label="${name} ${phase==='end'?'posizione finale':'posizione iniziale'} - donna">
      <rect width="150" height="160" fill="#fff"/>
      ${machine}
      <circle cx="${cx}" cy="${cy}" r="11" fill="#f2c5a0"/>
      <circle cx="${cx+9}" cy="${cy-4}" r="4" fill="#4b2e2a"/>
      <path d="M${cx-10} ${cy-6} Q${cx} ${cy-19} ${cx+10} ${cy-7}" fill="#4b2e2a"/>
      <rect x="${torsoX}" y="${torsoY}" width="20" height="41" rx="9" fill="${accent}"/>
      <path d="${arm1}" stroke="#f2c5a0" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="${arm2}" stroke="#f2c5a0" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="${leg1}" stroke="#263244" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="${leg2}" stroke="#263244" stroke-width="8" stroke-linecap="round" fill="none"/>
      <text x="75" y="153" text-anchor="middle" font-size="8" font-family="system-ui" fill="#667085">ILLUSTRAZIONE DONNA</text>
    </svg>`;
  }

  function phases(kind,name){
    return `<div class="phase-pair">
      <figure class="phase">${femaleSvg(kind,'start',name)}<figcaption>INIZIO</figcaption></figure>
      <figure class="phase">${femaleSvg(kind,'end',name)}<figcaption>FINE</figcaption></figure>
    </div>`;
  }

  function card(day,i,e){
    const k=PREFIX+day+'-'+(i+1);
    return `<article class="exercise" data-machine-workout="${day}">${phases(e[6],e[0])}<div class="body"><div class="top"><span class="num">${i+1}</span><div><h3>${e[0]}</h3><div class="meta">🧰 ${e[1]}<br>🔁 ${e[2]} · ⏱ ${e[3]}<br><span class="easy-badge">Esecuzione semplice / controllata</span></div></div><label class="done"><input type="checkbox" data-machine-key="${k}-done">✓</label></div><div class="track"><label>Peso<input inputmode="decimal" placeholder="kg" data-machine-key="${k}-peso"></label><label>Rip. fatte<input inputmode="numeric" placeholder="es. 12" data-machine-key="${k}-reps"></label></div><a class="video" href="${e[4]}" target="_blank" rel="noopener">▶ Guarda esecuzione corretta</a><details><summary>Note personali</summary><textarea rows="2" data-machine-key="${k}-note" placeholder="Carico, regolazioni macchina, sensazioni…"></textarea></details></div></article>`;
  }

  function renderDay(day){
    const p=PLANS[day],sec=document.querySelector('#w-'+day);if(!sec)return;
    const head=sec.querySelector('.head');
    if(head)head.innerHTML=`<div><small>${p.subtitle}</small><h2>${p.title}</h2></div><button type="button" data-machine-reset="${day}">Azzera</button>`;
    let html='<div class="photo-note"><b>Immagini INIZIO / FINE:</b> da questa versione le visualizzazioni sono riferite esclusivamente a una figura femminile. Gli esercizi sono stati riprogettati per ridurre i doppioni e privilegiare macchine/cavi semplici presenti in sala.</div>',last='';
    p.items.forEach((e,i)=>{if(e[5]!==last){last=e[5];html+=`<div class="group-label">${last}</div>`}html+=card(day,i,e)});
    const list=sec.querySelector('.list');if(list)list.innerHTML=html;
  }

  function updateSchedule(){
    const sched=document.querySelector('.schedule');
    if(sched){
      const byDay={};
      [...sched.children].forEach(c=>{const b=c.querySelector('b');if(b)byDay[b.textContent.trim().toLowerCase()]=c});
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
    const sub=document.querySelector('header p');if(sub)sub.textContent='Focus: Petto · Core · Glutei';
  }

  function refreshProgress(){
    const b=[...document.querySelectorAll('input[type=checkbox][data-machine-key]')],d=b.filter(x=>x.checked).length,p=b.length?Math.round(d*100/b.length):0;
    const fill=document.getElementById('fill'),prog=document.getElementById('prog');
    if(fill)fill.style.width=p+'%';if(prog)prog.textContent=p+'% completato · '+d+'/'+b.length+' esercizi';
  }

  function bind(){
    document.querySelectorAll('[data-machine-key]').forEach(el=>{
      const k=el.dataset.machineKey,v=localStorage.getItem(k);
      if(v!==null)el.type==='checkbox'?el.checked=v==='1':el.value=v;
      el.addEventListener(el.type==='checkbox'?'change':'input',()=>{localStorage.setItem(k,el.type==='checkbox'?(el.checked?'1':'0'):el.value);refreshProgress()});
    });
    document.querySelectorAll('[data-machine-reset]').forEach(btn=>btn.onclick=()=>{
      const day=btn.dataset.machineReset;
      document.querySelectorAll(`#w-${day} [data-machine-key]`).forEach(el=>{localStorage.removeItem(el.dataset.machineKey);el.type==='checkbox'?el.checked=false:el.value=''});
      refreshProgress();
    });
    refreshProgress();
  }

  function run(){
    ['A','B','C'].forEach(renderDay);
    updateSchedule();
    bind();
    setTimeout(updateSchedule,0);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();