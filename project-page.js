(function(){
  var id=window.NORDA_PROJECT_PAGE_ID||new URLSearchParams(location.search).get('id');
  var p=(window.NORDA_PROJECTS||[]).find(function(item){return item.id===id;});
  var root=document.getElementById('projectDetail');
  if(!root)return;
  var lang=document.documentElement.lang||'ar';
  var textDir=lang==='ar'?'rtl':'ltr';
  var c={
    ar:{back:'العودة إلى المعرض',label:'مشروع تجريبي من نوردا',description:'وصف الموقع',request:'طلب العميل',requestNote:'طلب تخيلي أُعدّ لهذا النموذج، ولا يمثّل عميلًا أو مشروعًا حقيقيًا.',result:'النتيجة',excerpts:'مقتطفات من الموقع',demo:'لايف ديمو',demoHint:'سيُتاح العرض المباشر لاحقًا',contact:'ناقش مشروعك معنا',ask:'هل تريد موقعًا بفكرة مشابهة؟',unknown:'المشروع غير موجود',backHome:'العودة للأعمال',excerptFallback:'مقتطف تجريبي من تصميم الموقع.',placeholder:'صورة مؤقتة · 800 × 600'},
    en:{back:'Back to portfolio',label:'NORDA studio concept',description:'Website description',request:'Client request',requestNote:'A fictional brief created for this concept; it does not represent a real client or project.',result:'Result',excerpts:'Website excerpts',demo:'Live demo',demoHint:'The live preview will be available later',contact:'Discuss your project',ask:'Planning a similar website?',unknown:'Project not found',backHome:'Back to portfolio',excerptFallback:'A temporary excerpt from the website concept.',placeholder:'Temporary image · 800 × 600'},
    fr:{back:'Retour au portfolio',label:'Concept du studio NORDA',description:'Description du site',request:'Demande client',requestNote:'Brief fictif créé pour ce concept ; il ne représente aucun client ni projet réel.',result:'Résultat',excerpts:'Extraits du site',demo:'Démo en direct',demoHint:'La démo sera disponible ultérieurement',contact:'Parlons de votre projet',ask:'Vous préparez un site similaire ?',unknown:'Projet introuvable',backHome:'Retour au portfolio',excerptFallback:'Extrait temporaire du concept de site.',placeholder:'Image temporaire · 800 × 600'}
  }[lang]||{};
  function esc(value){return String(value||'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  if(!p){
    root.innerHTML='<section class="project-missing"><div class="w"><h1>'+c.unknown+'</h1><a class="btn" href="portfolio.html">'+c.backHome+'</a></div></section>';
    return;
  }
  var excerpts=Array.isArray(p.excerpts)?p.excerpts:[];
  document.title=p.title+' | NORDA';
  var descriptionMeta=document.querySelector('meta[name="description"]');
  if(descriptionMeta)descriptionMeta.setAttribute('content',p.siteDescription||p.summary||'');
  function upsertMeta(attribute,key,value){
    var selector='meta['+attribute+'="'+key+'"]';
    var element=document.querySelector(selector);
    if(!element){element=document.createElement('meta');element.setAttribute(attribute,key);document.head.appendChild(element);}
    element.setAttribute('content',value);
  }
  var canonicalUrl='https://norda-site.pages.dev/projects/'+encodeURIComponent(p.id)+'.html';
  var projectTitle=p.title+' | NORDA';
  var projectDescription=p.siteDescription||p.summary||'';
  var projectImage=p.image||'https://norda-site.pages.dev/og.png';
  var canonical=document.querySelector('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.setAttribute('rel','canonical');document.head.appendChild(canonical);}
  canonical.setAttribute('href',canonicalUrl);
  upsertMeta('property','og:type','website');
  upsertMeta('property','og:site_name','NORDA');
  upsertMeta('property','og:title',projectTitle);
  upsertMeta('property','og:description',projectDescription);
  upsertMeta('property','og:image',projectImage);
  upsertMeta('property','og:image:alt',p.title);
  upsertMeta('property','og:image:alt',p.title);
  upsertMeta('property','og:url',canonicalUrl);
  upsertMeta('property','og:locale','ar_DZ');
  upsertMeta('name','twitter:card','summary_large_image');
  upsertMeta('name','twitter:title',projectTitle);
  upsertMeta('name','twitter:description',projectDescription);
  upsertMeta('name','twitter:image',projectImage);
  upsertMeta('name','twitter:image:alt',p.title);
  upsertMeta('name','twitter:image:alt',p.title);
  root.innerHTML=
    '<section class="project-hero"><div class="w">'+
      '<a class="project-back" href="portfolio.html">← '+c.back+'</a>'+ 
      '<span class="project-kind">'+c.label+'</span>'+ 
      '<div class="project-heading"><p class="project-type">'+esc(p.type)+'</p><h1>'+esc(p.title)+'</h1>'+ 
        '<h2>'+c.description+'</h2><p class="project-summary">'+esc(p.siteDescription||p.summary)+'</p>'+ 
        '<button class="project-demo-button" type="button" disabled aria-disabled="true"><span>'+c.demo+'</span><small>'+c.demoHint+'</small></button>'+ 
      '</div>'+ 
    '</div></section>'+ 
    '<section class="project-story"><div class="w">'+ 
      '<div class="project-overview">'+ 
        '<article><h2>'+c.request+'</h2><p>'+esc(p.clientRequest||p.brief)+'</p><p class="project-disclosure">'+c.requestNote+'</p></article>'+ 
        '<article><h2>'+c.result+'</h2><p>'+esc(p.result||p.solution)+'</p></article>'+ 
      '</div>'+ 
      '<h2 class="project-excerpts-title">'+c.excerpts+'</h2>'+ 
      '<div class="project-excerpts">'+excerpts.map(function(item,index){
        var image=item.image||'';
        var placeholder=!image||image===p.image;
        var caption=item.caption||c.excerptFallback;
        var alt=item.alt||p.title+' — '+caption;
        var visual=placeholder
          ? '<div class="project-excerpt-image project-excerpt-placeholder" role="img" aria-label="'+esc(c.placeholder)+'" style="--shot-hue:'+((index*53+p.title.length*19)%360)+'"><div class="project-shot-window"><span class="project-shot-dots"><i></i><i></i><i></i></span><span class="project-shot-content"><span class="project-shot-lines"><i></i><i></i><i></i><b></b></span><span class="project-shot-art"></span></span></div><small class="project-shot-label">'+esc(c.placeholder)+'</small></div>'
          : '<img class="project-excerpt-image" src="'+esc(image)+'" alt="'+esc(alt)+'" loading="lazy" width="1280" height="769">';
        return '<article class="project-excerpt'+(index%2?' is-reversed':'')+'">'+ 
          visual+ 
          '<div class="project-excerpt-copy" dir="'+textDir+'"><span>'+String(index+1).padStart(2,'0')+'</span><h3>'+esc(caption)+'</h3></div>'+ 
        '</article>';
      }).join('')+'</div>'+ 
    '</div></section>'+ 
    '<section class="project-cta"><div class="w"><h2>'+c.ask+'</h2><a class="btn" href="contact.html">'+c.contact+'</a></div></section>';
})();

