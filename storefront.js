(function(){
  const pre=document.querySelector('.preload');
  window.addEventListener('load',()=>setTimeout(()=>pre&&pre.classList.add('hide'),3000));
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
  toggle&&toggle.addEventListener('click',()=>nav.classList.toggle('open'));
  let cart=[];try{cart=JSON.parse(localStorage.getItem('norda_cart')||'[]');if(!Array.isArray(cart))cart=[]}catch(e){}
  function refreshBag(){document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=cart.length)}
  function animateProduct(button,card){
    const image=card&&card.querySelector('.prod__img img, .product-visual img');
    const bag=document.querySelector('[data-bag]');
    if(!image||!bag)return;
    const from=image.getBoundingClientRect(),to=bag.getBoundingClientRect();
    const clone=image.cloneNode(true);
    Object.assign(clone.style,{position:'fixed',left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px',objectFit:'cover',zIndex:'9999',pointerEvents:'none',borderRadius:'8px',margin:'0'});
    document.body.appendChild(clone);
    const dx=to.left+to.width/2-(from.left+from.width/2),dy=to.top+to.height/2-(from.top+from.height/2);
    const animation=clone.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(.12)',opacity:.35}],{duration:850,easing:'cubic-bezier(.2,.75,.25,1)'});
    animation.onfinish=()=>clone.remove();
    button.classList.add('is-added');
    setTimeout(()=>button.classList.remove('is-added'),1400);
    bag.animate([{transform:'scale(1)'},{transform:'scale(1.16)'},{transform:'scale(1)'}],{duration:420,easing:'ease-out'});
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-add-to-cart]');
    if(!button)return;
    const card=button.closest('[data-product-card]');
    if(!card)return;
    const item={id:card.dataset.productId||'',title:card.dataset.title||card.querySelector('h3')?.textContent||'',price:card.dataset.price||''};
    if(!item.id||!item.price)return;
    if(!cart.some(x=>x.id===item.id)){cart.push(item);localStorage.setItem('norda_cart',JSON.stringify(cart));refreshBag()}
    animateProduct(button,card);
  });
  refreshBag();
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('[data-category]').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
  }));
})();