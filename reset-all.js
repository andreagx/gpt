(()=>{
  const ID='reset-all-workouts';
  const ROW='reset-all-row';

  function install(){
    const nav=document.querySelector('nav');
    const header=document.querySelector('header');
    const intro=document.querySelector('.intro');
    const schedule=intro?.querySelector('.schedule');
    if(!nav||!header||!intro||!schedule) return;

    if(!document.getElementById('reset-all-style')){
      const s=document.createElement('style');
      s.id='reset-all-style';
      s.textContent=`
        [data-reset],[data-machine-reset],[data-pxreset]{display:none!important}
        .intro .schedule{display:flex!important;visibility:visible!important;opacity:1!important}
        #${ROW}{display:flex;justify-content:flex-end;margin:12px 0 0}
        #${ID}{border:1px solid #fecaca;background:#7f1d1d;color:#fff;border-radius:10px;padding:9px 13px;font:inherit;font-size:12px;font-weight:900;white-space:nowrap;cursor:pointer}
      `;
      document.head.appendChild(s);
    }

    // Mantieni il programma settimanale completo; rimuovi solo la descrizione testuale.
    const introText=intro.querySelector(':scope > p');
    if(introText) introText.remove();

    let row=document.getElementById(ROW);
    if(!row){
      row=document.createElement('div');
      row.id=ROW;
      const btn=document.createElement('button');
      btn.id=ID;
      btn.type='button';
      btn.textContent='Azzera tutto';
      row.appendChild(btn);

      btn.addEventListener('click',()=>{
        if(!confirm('Azzero tutti i dati degli allenamenti di questa scheda: spunte, pesi, ripetizioni e note? Gli orari Pilates modificabili restano invariati.')) return;

        for(let i=localStorage.length-1;i>=0;i--){
          const k=localStorage.key(i);
          if(k&&k.startsWith('gym-')) localStorage.removeItem(k);
        }

        document.querySelectorAll('[data-key],[data-machine-key],[data-pxkey]').forEach(el=>{
          if(el.type==='checkbox') el.checked=false;
          else if('value' in el) el.value='';
        });
        document.querySelectorAll('.exercise input[type="checkbox"]').forEach(x=>x.checked=false);

        const fill=document.getElementById('fill'),prog=document.getElementById('prog');
        if(fill) fill.style.width='0%';
        if(prog) prog.textContent='0% completato';

        btn.textContent='Azzerato ✓';
        setTimeout(()=>btn.textContent='Azzera tutto',1400);
      });
    }

    // Il pulsante globale va subito dopo la barra Lun/Mar/Mer/... .
    if(row.parentElement!==intro || row.previousElementSibling!==schedule){
      schedule.insertAdjacentElement('afterend',row);
    }

    // Navigazione robusta su iPhone/PWA anche per le schede Pilates aggiunte dinamicamente.
    if(!nav.dataset.scrollBound){
      nav.dataset.scrollBound='1';
      nav.addEventListener('click',e=>{
        const a=e.target.closest('a[href^="#w-"]');
        if(!a) return;
        const target=document.querySelector(a.getAttribute('href'));
        if(!target) return;
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        setTimeout(()=>{
          const h=header.getBoundingClientRect().height;
          window.scrollBy({top:-(h+8),left:0,behavior:'instant'});
        },280);
        try{history.replaceState(null,'',a.getAttribute('href'))}catch(_){ }
      });
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
