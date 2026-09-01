(()=>{
  function renderPilatesHours(){
    const sched=document.querySelector('#w-PS');
    if(!sched) return false;
    sched.className='workout teal';
    sched.innerHTML=`<div class="head"><div><small>FitActive Castellanza</small><h2>Orari corsi Pilates</h2></div></div>
      <div class="timetable-wrap">
        <div class="timetable-note"><b>Palinsesto FitActive Castellanza</b><br>Orari Pilates della sede di Castellanza. Gli orari possono essere modificati dalla palestra.</div>
        <div class="timetable-grid">
          <div class="time-day"><h3>Lunedì</h3><div class="no-class">Nessun Pilates</div></div>
          <div class="time-day"><h3>Martedì</h3><div class="slot"><b>11:15–12:00</b><span>Pilates</span></div></div>
          <div class="time-day"><h3>Mercoledì</h3><div class="slot"><b>10:30–11:15</b><span>Pilates</span></div><div class="slot"><b>12:45–13:30</b><span>Pilates</span></div><div class="slot"><b>20:00–21:00</b><span>Pilates</span></div></div>
          <div class="time-day"><h3>Giovedì</h3><div class="no-class">Nessun Pilates</div></div>
          <div class="time-day"><h3>Venerdì</h3><div class="slot"><b>09:00–09:45</b><span>Pilates</span></div></div>
          <div class="time-day"><h3>Sabato</h3><div class="no-class">Nessun Pilates</div></div>
        </div>
      </div>`;
    return true;
  }
  if(!renderPilatesHours()){
    let n=0;
    const t=setInterval(()=>{n++; if(renderPilatesHours()||n>30) clearInterval(t)},100);
  }
})();