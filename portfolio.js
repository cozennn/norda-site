(function(){
  var section=document.querySelector('main>section');
  var projects=window.NORDA_PROJECTS||[];
  if(!section)return;
  var lang=document.documentElement.lang||'ar';
  var copy={
    ar:{intro:'نماذج تجريبية من نوردا. افتح أي مشروع لتتعرف على فكرته ونتيجته.',demo:'مشاريع تجريبية',real:'مشاريع حقيقية',soon:'قريبًا',kind:'نموذج تجريبي',open:'عرض تفاصيل المشروع',cta:'عندك فكرة لموقع؟'},
    en:{intro:'NORDA studio concepts. Open a project to explore its brief and result.',demo:'Concept projects',real:'Client projects',soon:'Coming soon',kind:'Studio concept',open:'View project details',cta:'Have a website idea?'},
    fr:{intro:'Concepts du studio NORDA. Ouvrez un projet pour découvrir son brief et son résultat.',demo:'Projets conceptuels',real:'Projets clients',soon:'Bientôt',kind:'Concept du studio',open:'Voir les détails du projet',cta:'Vous avez une idée de site ?'}
  }[lang]||{intro:'نماذج تجريبية من نوردا.',demo:'مشاريع تجريبية',real:'مشاريع حقيقية',soon:'قريبًا',kind:'نموذج تجريبي',open:'عرض تفاصيل المشروع',cta:'عندك فكرة لموقع؟'};
  function esc(value){return String(value||'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  section.innerHTML='<div class="w"><p class="portfolio-intro">'+copy.intro+'</p>'+ 
    '<div class="portfolio-switch" role="group" aria-label="نوع المشاريع">'+ 
      '<button class="portfolio-switch-on" type="button" aria-pressed="true">'+copy.demo+'</button>'+ 
      '<button class="portfolio-switch-locked" type="button" disabled aria-disabled="true">'+copy.real+' <span>'+copy.soon+'</span></button>'+ 
    '</div>'+ 
    '<div class="g4 works-grid portfolio-grid">'+projects.map(function(p){
      return '<a class="wkc project-card" href="projects/'+encodeURIComponent(p.id)+'.html">'+ 
        '<img class="cv" src="'+esc(p.image)+'" alt="'+esc(p.title)+'" loading="lazy" width="1280" height="769">'+ 
        '<span class="project-kind">'+copy.kind+'</span><b>'+esc(p.title)+'</b>'+ 
        '<div>'+esc(p.type)+'</div><span class="project-open">'+copy.open+' ←</span></a>';
    }).join('')+'</div></div>';
  var callout=document.querySelector('main>.band');
  if(callout){var heading=callout.querySelector('h3');if(heading)heading.textContent=copy.cta;}
})();

