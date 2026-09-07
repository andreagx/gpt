(()=>{
  const ID='reset-all-workouts';
  if(document.getElementById(ID)) return;

  function install(){
    const nav=document.querySelector('nav');
    if(!nav||document.getElementById(ID)) return;

    if(!document.getElementById('reset-all-style')){
      const s=document.createElement('style');
      s.id='reset-all-style';
      s.textContent=`#${ID}{flex:0 0 auto;border:1px solid #fecaca;background:#7f1d1d;color:#fff;border-radius:999px;padding:8px 11px;font:inherit;font-size:12px;font-weight:900;white-space:nowrap;cursor:pointer}`;
      document.head.appendChild(s);
    }

    const btn=document.createElement('button');
    btn.id=ID;
    btn.type='button';
    btn.textContent='Azzera tutto';
    nav.appendChild(btn);

    btn.addEventListener('click',()=>{
      if(!confirm('Azzero spunte, pesi, ripetizioni e note salvati su questo dispositivo? Gli orari Pilates e le altre impostazioni non verranno modificati.')) return;

      const remove=new Set();
      document.querySelectorAll('[data-key],[data-machine-key],[data-pxkey]').forEach(el=>{
        const raw=el.dataset.machineKey||el.dataset.pxkey||el.dataset.key;
        if(!raw) return;
        remove.add(raw);
        remove.add('pale-'+raw);
        remove.add('gym-'+raw);
        if(el.type==='checkbox') el.checked=false;
        else if('value' in el) el.value='';
      });

      for(let i=localStorage.length-1;i>=0;i--){
        const k=localStorage.key(i);
        if(!k) continue;
        if(k.startsWith('pale-')||k.startsWith('gym-women-machines-')||k.startsWith('gym-PX-')||/^gym-[ABCP]-/.test(k)) remove.add(k);
      }
      remove.forEach(k=>localStorage.removeItem(k));

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
