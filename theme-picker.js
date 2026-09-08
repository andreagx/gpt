(()=>{
  const KEY='ui-theme-women';
  const THEMES={
    viola:{label:'Viola',accent:'#7c3aed',dark:'#3b1d67',soft:'#ede9fe'},
    rosa:{label:'Rosa',accent:'#db2777',dark:'#7a173f',soft:'#fce7f3'},
    petrolio:{label:'Petrolio',accent:'#0f766e',dark:'#134e4a',soft:'#ccfbf1'},
    blu:{label:'Blu notte',accent:'#1d4ed8',dark:'#172554',soft:'#dbeafe'},
    salvia:{label:'Salvia',accent:'#5f7f69',dark:'#334c3b',soft:'#e7efe9'}
  };

  function applyTheme(name){
    const t=THEMES[name]||THEMES.viola;
    const r=document.documentElement;
    r.style.setProperty('--app-accent',t.accent);
    r.style.setProperty('--app-dark',t.dark);
    r.style.setProperty('--app-soft',t.soft);
    let style=document.getElementById('women-theme-style');
    if(!style){
      style=document.createElement('style');
      style.id='women-theme-style';
      style.textContent=`
        header{background:var(--app-dark)!important}
        #fill{background:var(--app-accent)!important}
        nav a{background:color-mix(in srgb,var(--app-dark) 78%,white)!important}
        .workout .head{background:var(--app-accent)!important}
        .group-label{background:var(--app-soft)!important;color:var(--app-dark)!important}
        .theme-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:8px 0 2px}
        .theme-toggle{border:1px solid #ffffff55;background:#ffffff12;color:#fff;border-radius:9px;padding:7px 10px;font-size:11px;font-weight:900}
        .theme-panel{display:none;gap:7px;flex-wrap:wrap;width:100%;padding-top:2px}
        .theme-panel.open{display:flex}
        .theme-chip{border:1px solid #ffffff55;background:#ffffff12;color:#fff;border-radius:999px;padding:6px 9px;font-size:10px;font-weight:800;display:flex;align-items:center;gap:6px}
        .theme-chip::before{content:'';width:12px;height:12px;border-radius:50%;background:var(--chip);border:1px solid #ffffffaa}
        .theme-chip.active{outline:2px solid #fff;outline-offset:1px}
      `;
      document.head.appendChild(style);
    }
    document.querySelectorAll('.theme-chip').forEach(b=>b.classList.toggle('active',b.dataset.theme===name));
  }

  function install(){
    const header=document.querySelector('header');
    if(!header||document.getElementById('women-theme-row')) return;
    const row=document.createElement('div');
    row.id='women-theme-row';
    row.className='theme-row';
    row.innerHTML=`<button type="button" class="theme-toggle">🎨 Colore app</button><div class="theme-panel" aria-label="Colori app">${Object.entries(THEMES).map(([k,t])=>`<button type="button" class="theme-chip" data-theme="${k}" style="--chip:${t.accent}">${t.label}</button>`).join('')}</div>`;
    const nav=header.querySelector('nav');
    if(nav) header.insertBefore(row,nav); else header.appendChild(row);
    const panel=row.querySelector('.theme-panel');
    row.querySelector('.theme-toggle').onclick=()=>panel.classList.toggle('open');
    row.querySelectorAll('.theme-chip').forEach(btn=>btn.onclick=()=>{
      localStorage.setItem(KEY,btn.dataset.theme);
      applyTheme(btn.dataset.theme);
      panel.classList.remove('open');
    });
    applyTheme(localStorage.getItem(KEY)||'viola');
  }

  applyTheme(localStorage.getItem(KEY)||'viola');
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();