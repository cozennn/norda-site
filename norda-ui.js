/* NORDA appearance controls */
(function(){
  var root=document.documentElement;
  var button=document.getElementById('themeToggle');
  var saved='light';
  try{saved=localStorage.getItem('norda_theme')||'light'}catch(e){}

  function localize(){
    var lang=root.lang||'ar';
    var labels={
      ar:['تفعيل الوضع الليلي','تفعيل الوضع النهاري'],
      en:['Enable dark mode','Enable light mode'],
      fr:['Activer le mode sombre','Activer le mode clair']
    };
    var pair=labels[lang]||labels.ar;
    if(button){
      var label=root.dataset.theme==='dark'?pair[1]:pair[0];
      button.setAttribute('aria-label',label);
      button.setAttribute('title',label);
    }
  }

  function apply(theme){
    theme=theme==='dark'?'dark':'light';
    root.dataset.theme=theme;
    root.style.colorScheme=theme;
    var themeMeta=document.querySelector('meta[name=theme-color]');
    if(themeMeta)themeMeta.setAttribute('content',theme==='dark'?'#171615':'#f0eee9');
    if(!button)return;
    button.setAttribute('aria-pressed',theme==='dark'?'true':'false');
    localize();
    button.innerHTML=theme==='dark'
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.7 8.7 0 1 0 20.2 15.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }

  apply(saved);
  document.addEventListener('norda:language',localize);
  if(button){
    button.addEventListener('click',function(){
      var next=root.dataset.theme==='dark'?'light':'dark';
      try{localStorage.setItem('norda_theme',next)}catch(e){}
      apply(next);
    });
  }
})();
