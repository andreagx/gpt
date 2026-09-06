(()=>{
  const Y=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
  const IMG='https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  const PREFIX='gym-women-machines-v2-';

  const PLANS={
    A:{title:'Petto + Glutei + Core',subtitle:'Allenamento A · facile esecuzione',items:[
      ['Chest press guidata','Macchina chest press Matrix','4 × 10–12','60–75 s',Y('machine chest press proper form tutorial'),'MACCHINE / CAVI','Machine_Bench_Press'],
      ['Croci ai cavi','Cavi regolati all’altezza del petto','3 × 12–15','45–60 s',Y('standing cable chest fly proper form tutorial'),'MACCHINE / CAVI','Cable_Crossover'],
      ['Leg press guidata','Matrix Leg Press / pressa guidata','3 × 10–15','60–75 s',Y('leg press proper form tutorial'),'MACCHINE / CAVI','Leg_Press'],
      ['Leg curl guidato','Macchina leg curl seduto','3 × 12–15','60 s',Y('seated leg curl machine proper form tutorial'),'MACCHINE / CAVI','Seated_Leg_Curl'],
      ['Abductor machine','Macchina abduttori','3 × 15–20','45–60 s',Y('thigh abductor machine proper form tutorial'),'MACCHINE / CAVI','Thigh_Abductor'],
      ['Cable crunch','Cavo alto + corda','3 × 12–15','45 s',Y('cable crunch proper form tutorial'),'CORE','Cable_Crunch'],
      ['Pallof press','Cavo regolabile','3 × 12 / lato','30–45 s',Y('Pallof press proper form tutorial'),'CORE','Pallof_Press'],
      ['Plank','Tappetino','3 × 40–60 s','45 s',Y('forearm plank proper form tutorial'),'CORE','Plank']
    ]},
    B:{title:'Petto + Schiena + Core',subtitle:'Allenamento B · guidato e stabile',items:[
      ['Chest press guidata','Macchina chest press Matrix','3 × 10–12','60–75 s',Y('machine chest press proper form tutorial'),'MACCHINE / CAVI','Machine_Bench_Press'],
      ['Croci ai cavi','Cavi regolati all’altezza del petto','3 × 12–15','45–60 s',Y('standing cable chest fly proper form tutorial'),'MACCHINE / CAVI','Cable_Crossover'],
      ['Lat machine','Lat machine / stazione cavi','3 × 10–12','60–75 s',Y('wide grip lat pulldown proper form tutorial'),'MACCHINE / CAVI','Wide-Grip_Lat_Pulldown'],
      ['Seated row al pulley','Pulley basso / row guidato','3 × 10–12','60–75 s',Y('seated cable row proper form tutorial'),'MACCHINE / CAVI','Seated_Cable_Rows'],
      ['Shoulder press guidata','Macchina press spalle','3 × 10–12','60 s',Y('machine shoulder press proper form tutorial'),'MACCHINE / CAVI','Machine_Shoulder_Military_Press'],
      ['Cable crunch','Cavo alto + corda','3 × 12–15','45 s',Y('cable crunch proper form tutorial'),'CORE','Cable_Crunch'],
      ['Dead bug','Tappetino','3 × 10 / lato','30 s',Y('dead bug proper form tutorial'),'CORE','Dead_Bug'],
      ['Side plank','Tappetino','3 × 30–45 s / lato','30 s',Y('side plank proper form tutorial'),'CORE','Side_Bridge']
    ]},
    C:{title:'Petto + Glutei + Core',subtitle:'Allenamento C · semplice e controllato',items:[
      ['Chest press guidata','Macchina chest press Matrix','3 × 10–12','60–75 s',Y('machine chest press proper form tutorial'),'MACCHINE / CAVI','Machine_Bench_Press'],
      ['Croci ai cavi','Cavi regolati all’altezza del petto','3 × 12–15','45–60 s',Y('standing cable chest fly proper form tutorial'),'MACCHINE / CAVI','Cable_Crossover'],
      ['Leg press guidata','Matrix Leg Press / pressa guidata','3 × 10–15','60–75 s',Y('leg press proper form tutorial'),'MACCHINE / CAVI','Leg_Press'],
      ['Leg extension guidata','Macchina leg extension','3 × 12–15','60 s',Y('leg extension machine proper form tutorial'),'MACCHINE / CAVI','Leg_Extensions'],
      ['Abductor machine','Macchina abduttori','3 × 15–20','45–60 s',Y('thigh abductor machine proper form tutorial'),'MACCHINE / CAVI','Thigh_Abductor'],
      ['Cable crunch','Cavo alto + corda','3 × 12–15','45 s',Y('cable crunch proper form tutorial'),'CORE','Cable_Crunch'],
      ['Reverse crunch','Tappetino','3 × 12–15','30–45 s',Y('reverse crunch proper form tutorial'),'CORE','Reverse_Crunch'],
      ['Plank','Tappetino','3 × 45–60 s','45 s',Y('forearm plank proper form tutorial'),'CORE','Plank']
    ]}
  };

  if(!document.getElementById('women-machines-style')){
    const s=document.createElement('style');
    s.id='women-machines-style';
    s.textContent=`
      .group-label{margin:12px 0 7px;padding:7px 9px;border-radius:9px;background:#eef2f7;color:#344054;font-size:10px;font-weight:900;letter-spacing:.07em}
      .photo-note{margin:9px 0 12px;padding:10px 11px;border-radius:11px;background:#eff8ff;border:1px solid #b2ddff;color:#175cd3;font-size:11px;line-height:1.45}
      .phase-pair{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 10px 2px}
      .phase{margin:0;border:1px solid #e4e7ec;border-radius:12px;overflow:hidden;background:#fff;min-width:0}
      .phase img{display:block;width:100%;aspect-ratio:1/1;object-fit:contain;background:#fff}
      .phase figcaption{padding:6px;text-align:center;font-size:10px;font-weight:900;letter-spacing:.09em;background:#f8fafc;color:#475467;border-top:1px solid #eef1f4}
      .phase.missing{min-height:135px;display:flex;flex-direction:column;justify-content:flex-end;background:#f8fafc}
      .phase.missing:before{content:'Foto non disponibile';margin:auto;padding:14px;text-align:center;color:#98a2b3;font-size:11px}
      .phase.missing img{display:none}
      .easy-badge{display:inline-block;margin-top:6px;background:#ecfdf3;color:#067647;border:1px solid #abefc6;border-radius:999px;padding:3px 7px;font-size:10px;font-weight:800}
    `;
    document.head.appendChild(s);
  }

  function phases(id,name){
    const base=IMG+id+'/';
    return `<div class="phase-pair">
      <figure class="phase"><img loading="lazy" src="${base}0.jpg" alt="${name} — posizione iniziale"><figcaption>INIZIO</figcaption></figure>
      <figure class="phase"><img loading="lazy" src="${base}1.jpg" alt="${name} — posizione finale"><figcaption>FINE</figcaption></figure>
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
    let html='<div class="photo-note"><b>Foto INIZIO / FINE:</b> mostrano il gesto tecnico. La forma della macchina fotografata può differire dalla Matrix presente in sala.</div>',last='';
    p.items.forEach((e,i)=>{if(e[5]!==last){last=e[5];html+=`<div class="group-label">${last}</div>`}html+=card(day,i,e)});
    const list=sec.querySelector('.list');if(list)list.innerHTML=html;
  }

  function updateSchedule(){
    const sched=document.querySelector('.schedule');
    if(sched){
      const byDay={};
      [...sched.children].forEach(c=>{const b=c.querySelector('b');if(b)byDay[b.textContent.trim().toLowerCase()]=c});
      if(byDay.lun)byDay.lun.innerHTML='<b>Lun</b><strong>A</strong><span>Petto + Glutei + Core</span>';
      if(byDay.mer)byDay.mer.innerHTML='<b>Mer</b><strong>B</strong><span>Petto + Schiena + Core</span>';
      if(byDay.gio)byDay.gio.innerHTML='<b>Gio</b><strong>Pilates Reformer</strong><span>19:00 · FitActive</span>';
      if(byDay.ven)byDay.ven.innerHTML='<b>Ven</b><strong>C</strong><span>Petto + Glutei + Core</span>';
    }
    const nav=document.querySelector('nav');
    if(nav){
      const a=nav.querySelector('a[href="#w-A"]'),b=nav.querySelector('a[href="#w-B"]'),c=nav.querySelector('a[href="#w-C"]');
      if(a)a.textContent='A · Petto/Glutei';if(b)b.textContent='B · Petto/Schiena';if(c)c.textContent='C · Petto/Glutei';
    }
    const sub=document.querySelector('header p');if(sub)sub.textContent='Focus: Petto · Core · Glutei';
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