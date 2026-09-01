(()=>{
  const DEFAULTS={
    lunedi:'',
    martedi:'11:15–12:00',
    mercoledi:'10:30–11:15\n12:45–13:30\n20:00–21:00',
    giovedi:'',
    venerdi:'09:00–09:45',
    sabato:''
  };
  const DAYS=[
    ['lunedi','Lunedì'],['martedi','Martedì'],['mercoledi','Mercoledì'],
    ['giovedi','Giovedì'],['venerdi','Venerdì'],['sabato','Sabato']
  ];
  const PREFIX='fitactive-castellanza-pilates-';

  const style=document.createElement('style');
  style.textContent=`
    #w-PS .head-actions{display:flex;gap:7px;align-items:center}
    #w-PS .head-actions button,#w-PS .edit-hours,#w-PS .save-hours,#w-PS .cancel-hours{border:1px solid #d0d5dd;border-radius:8px;background:#fff;color:#344054;padding:7px 9px;font-size:11px;font-weight:800;cursor:pointer}
    #w-PS .head-actions button{background:#ffffff18;border-color:#ffffff66;color:#fff}
    #w-PS .day-title{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}
    #w-PS .day-title h3{margin:0}
    #w-PS .hours-editor{display:none;margin-top:8px}
    #w-PS .hours-editor textarea{width:100%;min-height:78px;resize:vertical;margin:0 0 7px;padding:9px;border:1px solid #d0d5dd;border-radius:8px;font:inherit;font-size:12px;background:#fff}
    #w-PS .editor-actions{display:flex;gap:7px}
    #w-PS .save-hours{background:#067647;color:#fff;border-color:#067647}
    #w-PS .slot{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid #eef1f4;font-size:12px}
    #w-PS .slot:first-child{border-top:0}
    #w-PS .slot b{color:#172033}.no-class{color:#98a2b3;font-size:12px}
  `;
  document.head.appendChild(style);

  function getValue(day){
    const saved=localStorage.getItem(PREFIX+day);
    return saved===null?DEFAULTS[day]:saved;
  }
  function rows(text){
    return text.split(/\n+/).map(x=>x.trim()).filter(Boolean);
  }
  function displayHtml(text){
    const r=rows(text);
    return r.length?r.map(t=>`<div class="slot"><b>${t}</b><span>Pilates</span></div>`).join(''):'<div class="no-class">Nessun Pilates</div>';
  }
  function dayCard(day,label){
    const value=getValue(day);
    return `<div class="time-day" data-day="${day}">
      <div class="day-title"><h3>${label}</h3><button class="edit-hours" type="button">Modifica</button></div>
      <div class="hours-view">${displayHtml(value)}</div>
      <div class="hours-editor"><textarea aria-label="Orari ${label}" placeholder="Un orario per riga, es. 18:00–18:45">${value}</textarea><div class="editor-actions"><button class="save-hours" type="button">Salva</button><button class="cancel-hours" type="button">Annulla</button></div></div>
    </div>`;
  }

  function bind(sched){
    sched.querySelectorAll('.time-day').forEach(card=>{
      const day=card.dataset.day;
      const view=card.querySelector('.hours-view');
      const editor=card.querySelector('.hours-editor');
      const ta=card.querySelector('textarea');
      card.querySelector('.edit-hours').onclick=()=>{ta.value=getValue(day);view.style.display='none';editor.style.display='block';ta.focus()};
      card.querySelector('.cancel-hours').onclick=()=>{ta.value=getValue(day);editor.style.display='none';view.style.display='block'};
      card.querySelector('.save-hours').onclick=()=>{
        const val=ta.value.trim();
        localStorage.setItem(PREFIX+day,val);
        view.innerHTML=displayHtml(val);
        editor.style.display='none';view.style.display='block';
      };
    });
    const reset=sched.querySelector('[data-hours-reset]');
    if(reset) reset.onclick=()=>{
      DAYS.forEach(([day])=>localStorage.removeItem(PREFIX+day));
      renderPilatesHours();
    };
  }

  function renderPilatesHours(){
    const sched=document.querySelector('#w-PS');
    if(!sched) return false;
    sched.className='workout teal';
    sched.innerHTML=`<div class="head"><div><small>FitActive Castellanza</small><h2>Orari corsi Pilates</h2></div><div class="head-actions"><button type="button" data-hours-reset>Ripristina</button></div></div>
      <div class="timetable-wrap">
        <div class="timetable-note"><b>Palinsesto FitActive Castellanza</b><br>Gli orari qui sotto sono modificabili. Tocca <b>Modifica</b> sul giorno interessato; le variazioni vengono salvate solo su questo dispositivo. Usa <b>Ripristina</b> per tornare agli orari predefiniti.</div>
        <div class="timetable-grid">${DAYS.map(d=>dayCard(...d)).join('')}</div>
      </div>`;
    bind(sched);
    return true;
  }

  if(!renderPilatesHours()){
    let n=0;
    const t=setInterval(()=>{n++;if(renderPilatesHours()||n>80)clearInterval(t)},100);
  }
})();