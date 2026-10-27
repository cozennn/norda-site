(function(){
  var projects=window.NORDA_PROJECTS||[];
  var labels={
    ar:{title:'أعمالنا',intro:'نماذج من تصاميمنا في مجالات مختلفة',filter:'تصفية الأعمال',all:'كل الأعمال',land:'صفحات هبوط',shop:'تصوّرات واجهات المتاجر',pers:'مواقع شخصية',open:'عرض تفاصيل المشروع',cta:'هل لديك مشروع تود تنفيذه؟',start:'ابدأ الآن'},
    en:{title:'Our work',intro:'Selected NORDA concepts across different fields',filter:'Filter projects',all:'All projects',land:'Landing pages',shop:'Storefront concepts',pers:'Personal websites',open:'View project details',cta:'Have a project in mind?',start:'Get started'},
    fr:{title:'Nos réalisations',intro:'Une sélection de concepts NORDA dans différents domaines',filter:'Filtrer les projets',all:'Tous les projets',land:'Pages de présentation',shop:'Concepts de boutiques',pers:'Sites personnels',open:'Voir les détails du projet',cta:'Vous avez un projet en tête ?',start:'Commencer'}
  };
  function currentLang(){
    var value=document.documentElement.lang||'ar';
    return labels[value]?value:'ar';
  }
  function projectCopy(project,language){
    return ((window.NORDA_PROJECT_COPY||{})[language]||{})[project.id]||project;
  }
  function update(){
    var language=currentLang(),text=labels[language],hero=document.querySelector('main .ph');
    if(hero){
      var heading=hero.querySelector('h1'),intro=hero.querySelector('p');
      if(heading)heading.textContent=text.title;
      if(intro)intro.textContent=text.intro;
    }
    var filters=document.getElementById('pf');
    if(filters){
      filters.setAttribute('aria-label',text.filter);
      filters.querySelectorAll('button[data-f]').forEach(function(button){
        button.textContent=text[button.getAttribute('data-f')]||text.all;
      });
    }
    var grid=document.getElementById('wk');
    if(grid){
      grid.querySelectorAll('.wkc').forEach(function(card){
        var image=card.querySelector('img'),src=image&&image.getAttribute('src');
        var project=projects.find(function(item){return item.image===src});
        if(!project)return;
        var content=projectCopy(project,language);
        var title=content.title||project.title,type=content.type||project.type;
        var heading=card.querySelector('b');
        if(heading)heading.textContent=title;
        if(image)image.alt=title+' — '+type;
        var typeNode=heading&&heading.nextElementSibling;
        if(typeNode){typeNode.classList.add('portfolio-type-label');typeNode.textContent=type;}
        var link=card.querySelector('.project-open');
        if(!link){
          link=document.createElement('a');
          link.className='project-open';
          card.appendChild(link);
        }
        link.href='project.html?id='+encodeURIComponent(project.id);
        link.textContent=text.open+' ←';
        link.setAttribute('aria-label',text.open+': '+title);
      });
    }
    var band=document.querySelector('main>.band');
    if(band){
      var callout=band.querySelector('h3'),action=band.querySelector('a.btn');
      if(callout)callout.textContent=text.cta;
      if(action)action.textContent=text.start;
    }
  }
  update();
  if('MutationObserver' in window){
    new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
})();

