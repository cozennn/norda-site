(function(){
  var id=new URLSearchParams(location.search).get('id');
  var p=(window.NORDA_PROJECTS||[]).find(function(item){return item.id===id;});
  var root=document.getElementById('projectDetail');
  if(!root)return;
  var lang=document.documentElement.lang||'ar';
  function esc(value){return String(value||'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  document.title=p?p.title+' | NORDA':document.title;
  var descriptionMeta=document.querySelector('meta[name="description"]');
  if(p&&descriptionMeta)descriptionMeta.setAttribute('content',p.siteDescription||p.summary||'');
  function render(language){
    var c={
      ar:{back:'العودة إلى المعرض',label:'مشروع تجريبي من نوردا',description:'وصف الموقع',request:'طلب العميل',requestNote:'طلب تخيلي أُعدّ لهذا النموذج، ولا يمثّل عميلًا أو مشروعًا حقيقيًا.',result:'النتيجة',challenge:'التحدي',features:'الميزات الرئيسية',design:'ملاحظات التصميم',details:'تفاصيل المشروع',demo:'لايف ديمو',demoHint:'سيُتاح العرض المباشر لاحقًا',contact:'ناقش مشروعك معنا',ask:'هل تريد موقعًا بفكرة مشابهة؟',unknown:'المشروع غير موجود',backHome:'العودة للأعمال'},
      en:{back:'Back to portfolio',label:'NORDA studio concept',description:'Website description',request:'Project brief',requestNote:'A fictional brief created for this concept; it does not represent a real client or project.',result:'Outcome',challenge:'The challenge',features:'Key features',design:'Design notes',details:'Project details',demo:'Live demo',demoHint:'The live preview will be available later',contact:'Discuss your project',ask:'Planning a similar website?',unknown:'Project not found',backHome:'Back to portfolio'},
      fr:{back:'Retour au portfolio',label:'Concept du studio NORDA',description:'Description du site',request:'Brief du projet',requestNote:'Brief fictif créé pour ce concept ; il ne représente aucun client ni projet réel.',result:'Résultat',challenge:'Le défi',features:'Fonctionnalités clés',design:'Notes de design',details:'Détails du projet',demo:'Démo en direct',demoHint:'La démo sera disponible ultérieurement',contact:'Parlons de votre projet',ask:'Vous préparez un site similaire ?',unknown:'Projet introuvable',backHome:'Retour au portfolio'}
    }[language]||null;
    if(!p){
      root.innerHTML='<section class="project-missing"><div class="w"><h1>'+c.unknown+'</h1><a class="btn" href="portfolio.html">'+c.backHome+'</a></div></section>';
      return;
    }
    var copy=Object.assign({},p,((window.NORDA_PROJECT_COPY||{})[language]||{})[p.id]||{});
    copy.siteDescription=copy.summary||copy.siteDescription;
    copy.clientRequest=copy.brief||copy.clientRequest;
    copy.result=copy.solution||copy.result;
    var textDir=language==='ar'?'rtl':'ltr';
    var features=Array.isArray(copy.features)?copy.features:[];
    root.innerHTML=
      '<section class="project-hero"><div class="w">'+
        '<a class="project-back" href="portfolio.html">← '+c.back+'</a>'+
        '<span class="project-kind">'+c.label+'</span>'+
        '<div class="project-heading"><p class="project-type">'+esc(copy.type)+'</p><h1>'+esc(copy.title||p.title)+'</h1>'+
          '<h2>'+c.description+'</h2><p class="project-summary">'+esc(copy.siteDescription||copy.summary)+'</p>'+
          '<button class="project-demo-button" type="button" disabled aria-disabled="true"><span>'+c.demo+'</span><small>'+c.demoHint+'</small></button>'+
        '</div>'+
      '</div></section>'+
      '<section class="project-story"><div class="w">'+
        '<div class="project-overview">'+
          '<article><h2>'+c.request+'</h2><p>'+esc(copy.clientRequest||copy.brief)+'</p><p class="project-disclosure">'+c.requestNote+'</p></article>'+
          '<article><h2>'+c.result+'</h2><p>'+esc(copy.result||copy.solution)+'</p></article>'+
        '</div>'+
        '<h2 class="project-details-title">'+c.details+'</h2>'+
        '<div class="project-details-grid" dir="'+textDir+'">'+
          '<article class="project-detail-card"><h3>'+c.challenge+'</h3><p>'+esc(copy.challenge)+'</p></article>'+
          '<article class="project-detail-card"><h3>'+c.features+'</h3><ul class="project-feature-list">'+features.map(function(feature){return '<li>'+esc(feature)+'</li>';}).join('')+'</ul></article>'+
          '<article class="project-detail-card project-design-card"><h3>'+c.design+'</h3><p>'+esc(copy.design)+'</p></article>'+
        '</div>'+
      '</div></section>'+
      '<section class="project-cta"><div class="w"><h2>'+c.ask+'</h2><a class="btn" href="contact.html">'+c.contact+'</a></div></section>';
  }
  render(lang);
  if('MutationObserver' in window){
    new MutationObserver(function(){
      var next=document.documentElement.lang||'ar';
      if(next!==lang){lang=next;render(lang);}
    }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
})();

