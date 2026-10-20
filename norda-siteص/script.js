/* NORDA - script.js: التفاعلات المشتركة بين كل الصفحات */
(function(){
"use strict";
/* ظهور الأقسام عند التمرير */
var io=("IntersectionObserver" in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.1}):null;
if(io){document.querySelectorAll("main h2.t,main p.st,main .card,main .pk,main .wkc,main .steps>div,main .vals>div,main .feat>div,main .faq details,main .split>*,main .tbl,main .dash,main .stats").forEach(function(el,i){el.classList.add("rv");el.style.animationDelay=(i%4)*90+"ms";io.observe(el)})}
/* فلترة الأعمال */
var pf=document.getElementById("pf");
if(pf)pf.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;pf.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");document.querySelectorAll("#wk .wkc").forEach(function(w){w.hidden=!(b.dataset.f==="all"||w.dataset.c===b.dataset.f)})});
/* صفحة الدفع */
var pay=document.getElementById("pay");
if(pay)pay.addEventListener("click",function(){document.getElementById("payok").style.display="block"});
/* صفحة التواصل */
var send=document.getElementById("send");
if(send)send.addEventListener("click",function(){document.getElementById("sok").style.display="block"});
/* زر الدعم + الدردشة */
const fb=document.getElementById("fb"),fp=document.getElementById("fp");
const setFab=o=>{fp.hidden=!o;fb.setAttribute("aria-expanded",o);if(o)setTimeout(()=>ci.focus(),60)};
/* ===== دردشة الدعم: عدّل رسالة الترحيب هنا، وارفع الملفات للخادم داخل attach ===== */
const WELCOME="مرحبًا بك في نوردا! اكتب رسالتك وسيرد عليك فريق الدعم.";
const MAX=10*1048576;
const cm=document.getElementById("cm"),ci=document.getElementById("ci"),fi=document.getElementById("cfile");
const say=(t,cls)=>{const d=document.createElement("div");d.className="m "+(cls||"");d.textContent=t;cm.appendChild(d);cm.scrollTop=cm.scrollHeight};
const attach=f=>{const d=document.createElement("div");d.className="m me fl";
  if(f.type.startsWith("image/")){const i=new Image();i.src=URL.createObjectURL(f);i.alt=f.name;d.appendChild(i)}
  const s=document.createElement("span");s.textContent=(f.type==="application/pdf"?"PDF: ":"صورة: ")+f.name;d.appendChild(s);cm.appendChild(d);cm.scrollTop=cm.scrollHeight};
const go=()=>{const t=ci.value.trim();if(t)say(t,"me");ci.value=""};
document.getElementById("cs").onclick=go;ci.onkeydown=e=>{if(e.key==="Enter")go()};
document.getElementById("at").onclick=()=>fi.click();
fi.onchange=()=>{[...fi.files].forEach(f=>{
  if(!(f.type==="application/pdf"||f.type.startsWith("image/")))return say("غير مسموح: "+f.name+". الملفات المقبولة: PDF وصور فقط.","err");
  if(f.size>MAX)return say("الملف "+f.name+" أكبر من 10 ميغابايت.","err");
  attach(f)});fi.value=""};
say(WELCOME);
fb.onclick=e=>{e.stopPropagation();setFab(fp.hidden)};
document.addEventListener("click",e=>{if(!fp.hidden&&!fp.contains(e.target))setFab(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&!fp.hidden){setFab(false);fb.focus()}});
})();
