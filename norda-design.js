/* NORDA theme control and Kofra-inspired interaction polish. */
(function(){
  var root=document.documentElement;
  var tools=document.querySelector('.tools');
  if(!tools)return;
  var btn=document.createElement('button');
  btn.type='button';btn.className='theme-toggle';btn.id='themeToggle';
  btn.setAttribute('aria-label','Switch colour theme');
  btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z"/></svg>';
  var lang=document.getElementById('langBtn');
  tools.insertBefore(btn,lang||tools.firstChild);
  function sync(){
    var dark=root.dataset.theme==='dark';
    btn.setAttribute('aria-pressed',dark?'true':'false');
    btn.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
    btn.innerHTML=dark
      ?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
      :'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z"/></svg>';
  }
  btn.addEventListener('click',function(){
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    try{localStorage.setItem('norda_theme',root.dataset.theme)}catch(e){}
    sync();
  });
  sync();
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var nodes=document.querySelectorAll('main section,main .card,main .pk,main .wkc,main .dash,main .faq details');
    nodes.forEach(function(node){node.classList.add('rv')});
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}});
    },{threshold:.08});
    nodes.forEach(function(node){io.observe(node)});
  }
})();