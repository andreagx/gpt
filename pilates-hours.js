(()=>{
  const DEFAULTS={
    lunedi:'',
    martedi:'11:15–12:00',
    mercoledi:'10:30–11:15\n12:45–13:30\n20:00–21:00',
    giovedi:'',
    venerdi:'09:00–09:45',
    sabato:''
  };
  const DAYS=[['lunedi','Lunedì'],['martedi','Martedì'],['mercoledi','Mercoledì'],['giovedi','Giovedì'],['venerdi','Venerdì'],['sabato','Sabato']];
  const PREFIX='fitactive-castellanza-pilates-';

  if(!document.getElementById('pilates-hours-style')){
    const style=document.createElement('style');
    style.id='pilates-hours-style';
    style.textContent=`
      .teal .head{background:#2f7d78}
      #w-PS .timetable-wrap{padding:12px}
      #w-PS .timetable-note{background:#ecfdf3;border:1px solid #abefc6;border-radius:12px;padding:12px;color:#067647;font-size:12px;line-height:1.5}
      #w-PS .timetable-grid{display:grid;grid-template-columns:1fr;gap:9px;margin-top:10px}
      #w-PS .time-day{border:1px solid #e4e7ec;border-radius:12px;padding:11px;background:#fbfcfe}
      #w-PS .day-title{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}
      #w-PS .day-title h3{margin:0;font-size:14px}
      #w-PS .head-actions{display:flex;gap:7px;align-items:center}
      #w-PS .head-actions button,#w-PS .edit-hours,#w-PS .save-hours,#w-PS .cancel-hours{border:1px solid #d0d5dd;border-radius:8px;background:#fff;color:#344054;padding:7px 9px;font-size:11px;font-weight:800;cursor:pointer}
      #w-PS .head-actions button{background:#ffffff18;border-color:#ffffff66;color:#fff}
      #w-PS .hours-editor{display:none;margin-top:8px}
      #w-PS .hours-editor textarea{width:100%;min-height:78px;resize:vertical;margin:0 0 7px;padding:9px;border:1px solid #d0d5dd;border-radius:8px;font:inherit;font-size:12px;background:#fff}
      #w-PS .editor-actions{display:flex;gap:7px}
      #w-PS .save-hours{background:#067647;color:#fff;border-color:#067647}
      #w-PS .slot{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid #eef1f4;font-size:12px}
      #w-PS .slot:first-child{border-top:0}
      #w-PS .slot b{color:#172033}
      #w-PS .slot span{color:#667085;text-align:right}
      #w-PS .no-class{color:#98a2b3;font-size:12px}
      @media(min-width:700px){#w-PS .timetable-grid{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(style);
  }

  function ensureNav(){
    const nav=document.querySelector('nav');
    if(nav&&!nav.querySelector('a[href="#w-PS"]')) nav.insertAdjacentHTML('beforeend','<a href="#w-PS">Orari Pilates</a>');
  }

  function ensureSection(){
    let sched=document.querySelector('#w-PS');
    if(sched) return sched;
    sched=document.createElement('section');
    sched.id='w-PS';
    sched.className='workout teal';
    const anchor=document.querySelector('#w-PX')||document.querySelector('#w-P');
    if(anchor) anchor.insertAdjacentElement('afterend',sched);
    else document.querySelector('#app')?.appendChild(sched);
    return sched;
  }

  function getValue(day){const saved=localStorage.getItem(PREFIX+day);return saved===null?DEFAULTS[day]:saved}
  function rows(text){return text.split(/\n+/).map(x=>x.trim()).filter(Boolean)}
  function displayHtml(text){const r=rows(text);return r.length?r.map(t=>`<div class="slot"><b>${t}</b><span>Pilates</span></div>`).join(''):'<div class="no-class">Nessun Pilates</div>'}
  function dayCard(day,label){const value=getValue(day);return `<div class="time-day" data-day="${day}"><div class="day-title"><h3>${label}</h3><button class="edit-hours" type="button">Modifica</button></div><div class="hours-view">${displayHtml(value)}</div><div class="hours-editor"><textarea aria-label="Orari ${label}" placeholder="Un orario per riga, es. 18:00–18:45">${value}</textarea><div class="editor-actions"><button class="save-hours" type="button">Salva</button><button class="cancel-hours" type="button">Annulla</button></div></div></div>`}

  function bind(sched){
    sched.querySelectorAll('.time-day').forEach(card=>{
      const day=card.dataset.day,view=card.querySelector('.hours-view'),editor=card.querySelector('.hours-editor'),ta=card.querySelector('textarea');
      card.querySelector('.edit-hours').onclick=()=>{ta.value=getValue(day);view.style.display='none';editor.style.display='block';ta.focus()};
      card.querySelector('.cancel-hours').onclick=()=>{ta.value=getValue(day);editor.style.display='none';view.style.display='block'};
      card.querySelector('.save-hours').onclick=()=>{const val=ta.value.trim();localStorage.setItem(PREFIX+day,val);view.innerHTML=displayHtml(val);editor.style.display='none';view.style.display='block'};
    });
    sched.querySelector('[data-hours-reset]')?.addEventListener('click',()=>{DAYS.forEach(([day])=>localStorage.removeItem(PREFIX+day));render()});
  }

  function render(){
    ensureNav();
    const sched=ensureSection();
    if(!sched) return;
    sched.className='workout teal';
    sched.innerHTML=`<div class="head"><div><small>FitActive Castellanza</small><h2>Orari corsi Pilates</h2></div><div class="head-actions"><button type="button" data-hours-reset>Ripristina</button></div></div><div class="timetable-wrap"><div class="timetable-note"><b>Palinsesto FitActive Castellanza</b><br>Gli orari sono modificabili direttamente qui. Le variazioni vengono salvate solo su questo dispositivo; usa <b>Ripristina</b> per tornare agli orari predefiniti.</div><div class="timetable-grid">${DAYS.map(d=>dayCard(...d)).join('')}</div></div>`;
    bind(sched);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
})();