(()=>{
  const Y=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
  const style=document.createElement('style');
  style.textContent=`
    .pink .head{background:#b4558c}.teal .head{background:#2f7d78}
    .tool-art{min-height:118px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#faf7fb;border-bottom:1px solid var(--line);padding:16px;color:#5f3c58}
    .tool-art .ico{font-size:38px;line-height:1}.tool-art b{margin-top:7px;font-size:13px}.tool-art small{margin-top:4px;color:var(--muted);font-size:11px;line-height:1.4}
    .home-info{grid-column:1/-1;background:#fff7fb;border:1px solid #f2d4e5;border-radius:12px;padding:12px;font-size:12px;line-height:1.5;color:#713d5f}
    .timetable-wrap{padding:12px}.timetable-note{background:#ecfdf3;border:1px solid #abefc6;border-radius:12px;padding:12px;color:#067647;font-size:12px;line-height:1.5}
    .timetable-grid{display:grid;grid-template-columns:1fr;gap:9px;margin-top:10px}.time-day{border:1px solid var(--line);border-radius:12px;padding:11px;background:#fbfcfe}.time-day h3{margin:0 0 7px;font-size:14px}.time-day p{margin:0;color:var(--muted);font-size:12px}.slot{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid #eef1f4;font-size:12px}.slot:first-of-type{border-top:0}.slot b{color:#172033}.slot span{color:var(--muted);text-align:right}.no-class{color:#98a2b3;font-size:12px}
    @media(min-width:700px){.timetable-grid{grid-template-columns:repeat(2,1fr)}}
  `;
  document.head.appendChild(style);

  const nav=document.querySelector('nav');
  if(nav){
    if(!nav.querySelector('a[href="#w-PX"]')) nav.insertAdjacentHTML('beforeend','<a href="#w-PX">Pilates + attrezzi</a>');
    if(!nav.querySelector('a[href="#w-PS"]')) nav.insertAdjacentHTML('beforeend','<a href="#w-PS">Orari Pilates</a>');
  }

  const exercises=[
    ['Mobilità toracica sul rullo','Foam roller / rullo Pilates','2–3 min','—',Y('Pilates foam roller thoracic mobility tutorial'),'🧘','RULLO'],
    ['Bridge con mini-band','Mini-band sopra le ginocchia','3 × 15','30 s',Y('Pilates glute bridge mini band proper form'),'🟣','ELASTICO'],
    ['Clamshell con mini-band','Mini-band','3 × 12–15 / lato','30 s',Y('Pilates clamshell resistance band proper form'),'🟣','ELASTICO'],
    ['Side leg lift con elastico','Mini-band o elastico corto','3 × 12–15 / lato','30 s',Y('Pilates side leg lift resistance band tutorial'),'🟣','ELASTICO'],
    ['Roll down assistito con elastico','Elastico lungo','3 × 8–10','30 s',Y('Pilates roll down resistance band tutorial'),'🟣','ELASTICO'],
    ['Hundred con pesi leggeri','2 manubri da 0,5–2 kg','1 × 100 pulsazioni','—',Y('Pilates hundred with light weights tutorial'),'🏋️','PESI LEGGERI'],
    ['Chest press sul rullo','Rullo + 2 manubri leggeri','3 × 10–12','30–45 s',Y('foam roller dumbbell chest press core stability tutorial'),'🏋️','PESI + RULLO'],
    ['Dead bug con reach dei pesi','Tappetino + 1–2 manubri leggeri','3 × 8–10 / lato','30 s',Y('dead bug dumbbell reach proper form'),'🏋️','PESI LEGGERI'],
    ['Bridge con piedi sul rullo','Foam roller / rullo Pilates','3 × 10–12','30–45 s',Y('Pilates bridge feet on foam roller tutorial'),'🧘','RULLO'],
    ['Spine stretch con rullo','Foam roller / rullo Pilates','2 × 8–10','30 s',Y('Pilates spine stretch foam roller tutorial'),'🧘','RULLO'],
    ['Mermaid con elastico','Elastico lungo','2 × 8 / lato','30 s',Y('Pilates mermaid resistance band tutorial'),'🟣','ELASTICO'],
    ['Defaticamento e rilascio','Rullo Pilates','3–5 min','—',Y('Pilates foam roller cool down mobility'),'🧘','RULLO']
  ];

  function key(i,s){return 'gym-PX-'+(i+1)+'-'+s}
  function card(e,i){
    return `<article class="exercise" data-workout="PX"><div class="tool-art"><div class="ico">${e[5]}</div><b>${e[6]}</b><small>Sessione Pilates a casa · esecuzione controllata</small></div><div class="body"><div class="top"><span class="num">${i+1}</span><div><h3>${e[0]}</h3><div class="meta">🧰 ${e[1]}<br>🔁 ${e[2]} · ⏱ ${e[3]}</div></div><label class="done"><input type="checkbox" data-pxkey="${key(i,'done')}">✓</label></div><div class="track"><label>Peso / resistenza<input placeholder="es. 1 kg / band media" data-pxkey="${key(i,'load')}"></label><label>Rip. fatte<input inputmode="numeric" placeholder="es. 12" data-pxkey="${key(i,'reps')}"></label></div><a class="video" href="${e[4]}" target="_blank" rel="noopener">▶ Guarda esecuzione corretta</a><details><summary>Note personali</summary><textarea rows="2" data-pxkey="${key(i,'note')}" placeholder="Tecnica, resistenza, sensazioni…"></textarea></details></div></article>`;
  }

  const sec=document.createElement('section');
  sec.className='workout pink'; sec.id='w-PX';
  sec.innerHTML=`<div class="head"><div><small>Pilates a casa</small><h2>Elastici + pesi leggeri + rullo · 45–55 min</h2></div><button data-pxreset>Azzera</button></div><div class="list"><div class="home-info"><b>Attrezzatura:</b> tappetino, mini-band/elastico lungo, 2 manubri leggeri (indicativamente 0,5–2 kg) e foam roller/rullo Pilates. Mantieni movimenti lenti e controllo del core; non serve aumentare molto il carico.</div>${exercises.map(card).join('')}</div>`;
  const p=document.querySelector('#w-P');
  if(p) p.insertAdjacentElement('afterend',sec); else document.querySelector('#app')?.appendChild(sec);

  const sched=document.createElement('section');
  sched.className='workout teal'; sched.id='w-PS';
  sched.innerHTML=`<div class="head"><div><small>FitActive Castellanza</small><h2>Orari corsi Pilates</h2></div></div><div class="timetable-wrap"><div class="timetable-note"><b>Palinsesto verificato.</b><br>Orari Pilates della sede FitActive Castellanza, Via Asti 5. Gli orari dei corsi possono essere modificati dalla palestra: controlla sempre il palinsesto FitActive prima di partire.</div><div class="timetable-grid">
    <div class="time-day"><h3>Lunedì</h3><div class="no-class">Nessun Pilates in palinsesto</div></div>
    <div class="time-day"><h3>Martedì</h3><div class="slot"><b>11:15–12:00</b><span>Pilates · Sala corsi</span></div></div>
    <div class="time-day"><h3>Mercoledì</h3><div class="slot"><b>10:30–11:15</b><span>Pilates · Sala corsi</span></div><div class="slot"><b>12:45–13:30</b><span>Pilates · Sala corsi</span></div><div class="slot"><b>20:00–21:00</b><span>Pilates · Sala corsi</span></div></div>
    <div class="time-day"><h3>Giovedì</h3><div class="no-class">Nessun Pilates in palinsesto</div></div>
    <div class="time-day"><h3>Venerdì</h3><div class="slot"><b>09:00–09:45</b><span>Pilates · Sala corsi</span></div></div>
    <div class="time-day"><h3>Sabato</h3><div class="no-class">Nessun Pilates in palinsesto</div></div>
  </div></div>`;
  sec.insertAdjacentElement('afterend',sched);

  document.querySelectorAll('[data-pxkey]').forEach(el=>{
    const k=el.dataset.pxkey,v=localStorage.getItem(k);
    if(v!==null) el.type==='checkbox'?el.checked=(v==='1'):el.value=v;
    el.addEventListener(el.type==='checkbox'?'change':'input',()=>{
      localStorage.setItem(k,el.type==='checkbox'?(el.checked?'1':'0'):el.value;
    });
  });
  sec.querySelector('[data-pxreset]')?.addEventListener('click',()=>{
    sec.querySelectorAll('[data-pxkey]').forEach(el=>{localStorage.removeItem(el.dataset.pxkey);el.type==='checkbox'?el.checked=false:el.value=''});
  });

  const th=document.querySelectorAll('.schedule>div')[3];
  if(th){const s=th.querySelector('span');if(s)s.textContent='Casa o corso palestra';}
})();
