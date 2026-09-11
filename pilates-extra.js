(()=>{
  const Y=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent('Pilates '+q+' tutorial');
  // Stable IDs retain saved entries for exercises from the previous equipment list.
  const groups=[
    {id:'w-PB',title:'Corpo libero',equipment:'Tappetino',note:'Parti da qui: respirazione, mobilità e controllo. Un giro richiede circa 10–15 minuti.',items:[
      ['breathing','Respirazione laterale','6–8 respiri','15 s','Supina, ginocchia piegate e mani sulle costole. Inspira allargando le costole ai lati; espira lentamente senza irrigidire il collo.','lateral breathing beginner'],
      ['pelvic-curl','Ponte articolato','2 × 8','30 s','Piedi a terra alla larghezza del bacino. Espira e solleva il bacino gradualmente; scendi lentamente mantenendo le ginocchia allineate.','pelvic curl beginner'],
      ['toe-taps','Toe taps alternati','2 × 8 / lato','30 s','Supina con gambe a tavolino, abbassa un piede alla volta e torna. Riduci il movimento se la schiena si inarca; per facilitare lascia un piede a terra.','toe taps beginner'],
      ['side-kick','Side kick preparatorio','2 × 8 / lato','30 s','Sul fianco, gamba inferiore piegata. Sposta lentamente la gamba superiore avanti e indietro senza ruotare il bacino.','side kick beginner'],
      ['cat','Cat stretch','6–8 movimenti','15 s','A quattro appoggi, espira arrotondando la schiena e inspira tornando neutra. Muoviti senza forzare collo o zona lombare.','cat stretch beginner']
    ]},
    {id:'w-PX',title:'Elastici',equipment:'Mini-band ed elastico lungo leggero',note:'Usa una resistenza che permetta un movimento fluido. Un giro richiede circa 12–18 minuti.',items:[
      ['2','Bridge con mini-band','2 × 12','30 s','Mini-band sopra le ginocchia, piedi a terra. Solleva il bacino mantenendo una leggera tensione verso l’esterno; evita di aprire troppo le ginocchia.','glute bridge mini band'],
      ['3','Clamshell con mini-band','2 × 12 / lato','30 s','Sul fianco con ginocchia piegate e talloni uniti. Apri il ginocchio superiore senza inclinare il busto all’indietro.','clamshell resistance band'],
      ['4','Side leg lift con elastico','2 × 10 / lato','30 s','Mini-band sopra le ginocchia, sdraiata sul fianco. Solleva poco la gamba superiore mantenendo il piede rivolto in avanti e il bacino fermo.','side lying leg lift mini band'],
      ['band-row','Remata seduta con elastico','2 × 12','30 s','Elastico lungo intorno alla parte centrale dei piedi, ginocchia morbide. Porta i gomiti indietro senza alzare le spalle; controlla che l’elastico non scivoli.','seated resistance band row'],
      ['band-open','Aperture delle braccia','2 × 10','30 s','Seduta alta, elastico leggero tra le mani davanti al petto. Allarga le braccia con gomiti morbidi, senza spingere le costole in avanti.','resistance band arm openings']
    ]},
    {id:'w-PBALL',title:'Palla piccola',equipment:'Soft ball Pilates morbida da circa 20–25 cm',note:'Gonfiala solo quanto basta per mantenerla morbida. Un giro richiede circa 10–15 minuti.',items:[
      ['ball-squeeze','Pressioni leggere tra le ginocchia','2 × 10','20 s','Supina con piedi a terra e palla tra le ginocchia. Espira stringendo delicatamente per 2 secondi, poi allenta senza perdere la palla.','small ball knee squeeze'],
      ['ball-bridge','Ponte con palla tra le ginocchia','2 × 8','30 s','Piedi a terra e palla tra le ginocchia. Solleva e abbassa il bacino con una pressione leggera e costante sulla palla.','small ball bridge between knees'],
      ['ball-curl','Curl up con palla tra le ginocchia','2 × 8','30 s','Supina, piedi a terra e mani dietro la testa. Espira sollevando appena testa e scapole, senza tirare il collo; torna giù lentamente.','small ball curl up knees'],
      ['ball-spine','Spine stretch con palla','2 × 6','20 s','Seduta con ginocchia leggermente piegate e palla davanti. Falla rotolare in avanti allungando la schiena, poi ritorna senza slanci.','small ball spine stretch forward'],
      ['ball-mermaid','Mermaid con palla','6 / lato','20 s','Seduta comoda, una mano sulla palla al tuo fianco. Falla rotolare poco verso l’esterno mentre allunghi il fianco opposto; mantieni il bacino appoggiato.','small ball mermaid']
    ]},
    {id:'w-PR',title:'Rullo',equipment:'Foam roller / rullo Pilates',note:'Movimenti piccoli su un tappetino stabile. Il rullo lungo serve solo per l’esercizio delle braccia. Un giro richiede circa 8–12 minuti.',items:[
      ['roller-arms','Aperture delle braccia sul rullo lungo','2 × 8','30 s','Rullo lungo lungo la colonna, con testa e bacino sostenuti e piedi larghi a terra. Apri lentamente le braccia; se hai un rullo corto esegui sul tappetino.','foam roller supine arm openings'],
      ['10','Spine stretch con rullo','2 × 6','20 s','Seduta con gambe comode e mani sul rullo davanti. Fallo scorrere avanti accompagnando il busto, poi ritorna senza spingere oltre il tuo allungamento.','foam roller spine stretch'],
      ['roller-cat','Cat stretch con mani sul rullo','6–8 movimenti','20 s','In ginocchio, mani sul rullo davanti. Arrotonda dolcemente la schiena e torna neutra facendo scorrere il rullo di pochi centimetri.','foam roller cat stretch'],
      ['roller-mermaid','Mermaid con rullo','6 / lato','20 s','Seduta comoda, una mano sul rullo al fianco. Allontanalo lentamente per allungare il lato opposto, poi torna al centro senza caricare il polso.','foam roller mermaid'],
      ['roller-calf','Rilascio dolce dei polpacci','30–45 s / lato','20 s','Seduta con un polpaccio sul rullo e l’altro piede a terra. Scorri lentamente sul muscolo con pressione leggera, evitando ginocchio e tendine d’Achille.','foam roller calf release gentle']
    ]}
  ];
  const style=document.createElement('style');
  style.textContent=`.pilates-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}.pilates-links a{display:block;padding:13px;border:1px solid var(--line);border-radius:11px;background:var(--app-soft);color:var(--app-dark);font-size:13px;font-weight:800;text-decoration:none}.pilates-group{scroll-margin-top:180px}.pilates-group .home-info{grid-column:1/-1}.pilates-cue{font-size:13px;line-height:1.55;color:#344054;margin:12px 0}.pilates-group .head small{font-size:10px}.pilates-progress{font-size:12px;margin:0 0 8px;color:var(--muted)}#w-P .list{display:block}.pilates-equipment{font-size:12px;line-height:1.5;color:var(--muted)}`;
  document.head.appendChild(style);
  const intro=document.querySelector('#w-P');if(!intro)return;
  intro.innerHTML=`<div class="head"><div><small>Pilates a casa</small><h2>Scegli il tuo allenamento</h2></div></div><div class="list"><div class="home-info">Inizia con respirazione e Cat stretch, poi scegli <b>un blocco</b> in base all’attrezzatura disponibile. Parti da un giro; aggiungi il secondo se mantieni controllo e respiro regolare. Recupera 30–60 secondi tra i blocchi. Interrompi il movimento se provoca dolore.</div><div class="pilates-links">${groups.map(g=>`<a href="#${g.id}">${g.title} · ${g.items.length} esercizi</a>`).join('')}</div><p class="pilates-equipment">Sessione breve: corpo libero. Sessione con attrezzi: riscaldamento + elastici oppure palla piccola; termina con mobilità sul rullo. Non occorre eseguire tutti e quattro i blocchi insieme.</p></div>`;
  function card(e,i,g){const key='gym-PX-'+e[0]+'-';return `<article class="exercise" data-workout="PX"><div class="body"><div class="top"><span class="num">${i+1}</span><div><h3>${e[1]}</h3><div class="meta">${e[2]} · Recupero ${e[3]}</div></div><label class="done"><input aria-label="Completa ${e[1]}" type="checkbox" data-pxkey="${key}done">✓</label></div><p class="pilates-cue">${e[4]}</p><div class="track"><label>Resistenza / attrezzo<input placeholder="es. leggera" data-pxkey="${key}load"></label><label>Rip. fatte<input inputmode="numeric" placeholder="es. 8" data-pxkey="${key}reps"></label></div><a class="video" href="${Y(e[5])}" target="_blank" rel="noopener">▶ Cerca tutorial dell’esercizio</a><details><summary>Note personali</summary><textarea rows="2" data-pxkey="${key}note" placeholder="Tecnica, sensazioni…"></textarea></details></div></article>`;}
  let anchor=intro;
  groups.forEach(g=>{document.getElementById(g.id)?.remove();const sec=document.createElement('section');sec.id=g.id;sec.className='workout pink pilates-group';sec.innerHTML=`<div class="head"><div><small>Pilates casa · ${g.equipment}</small><h2>${g.title}</h2></div></div><div class="list"><div class="home-info"><p class="pilates-progress" aria-live="polite"></p>${g.note}</div>${g.items.map((e,i)=>card(e,i,g)).join('')}</div>`;anchor.insertAdjacentElement('afterend',sec);anchor=sec;});
  // Let pilates-hours.js populate its existing timetable after all home groups.
  let hours=document.getElementById('w-PS');if(!hours){hours=document.createElement('section');hours.id='w-PS';hours.className='workout teal';}anchor.insertAdjacentElement('afterend',hours);
  document.querySelector('nav a[href="#w-PX"]')?.remove();
  function progress(){document.querySelectorAll('.pilates-group').forEach(s=>{const boxes=[...s.querySelectorAll('input[type="checkbox"]')];s.querySelector('.pilates-progress').textContent=boxes.filter(b=>b.checked).length+' / '+boxes.length+' completati';});}
  document.querySelectorAll('.pilates-group [data-pxkey]').forEach(el=>{const k=el.dataset.pxkey,v=localStorage.getItem(k);if(v!==null){if(el.type==='checkbox')el.checked=v==='1';else el.value=v;}el.addEventListener(el.type==='checkbox'?'change':'input',()=>{localStorage.setItem(k,el.type==='checkbox'?(el.checked?'1':'0'):el.value);progress();});});
  document.addEventListener('click',e=>{if(e.target.closest('#reset-all-workouts'))setTimeout(progress,0);});
  progress();
})();
