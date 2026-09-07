(()=>{
  const ID='reset-all-workouts';

  function install(){
    const nav=document.querySelector('nav');
    if(!nav) return;

    if(!document.getElementById('reset-all-style')){
      const s=document.createElement('style');
      s.id='reset-all-style';
      s.textContent=`
        [data-reset],[data-machine-reset],[data-pxreset]{display:none!important}
        #${ID}{flex:0 0 auto;border:1px solid #fecaca;background:#7f1d1d;color:#fff;border-radius:999px;padding:8px 11px;font:inherit;font-size:12px;font-weight:900;white-space:nowrap;cursor:pointer}
      `;
      document.head.appendChild(s);
    }

    if(document.getElementById(ID)) return;
    const btn=document.createElement('button');
    btn.id=ID;
    btn.type='button';
    btn.textContent='Azzera tutto';
    nav.appendChild(btn);

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

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
