(() => {
  "use strict";

  const translations = {
    en: {
      skip:"Skip to content",nav_services:"Services",nav_work:"Selected work",nav_pricing:"Pricing",nav_contact:"Contact",language_label:"Language",start_project:"Start a project",
      hero_eyebrow:"Independent web design studio",hero_title:"A better website<br><span>starts with a clear idea.</span>",
      hero_description:"NorDa designs and builds modern, responsive websites that help businesses present their value and turn visitors into customers.",
      hero_cta:'Tell us about your project <span aria-hidden="true">↗</span>',hero_secondary:'Explore our work <span aria-hidden="true">↓</span>',
      hero_note:"Thoughtful design. Practical development. No unnecessary complexity.",intro_text:"A focused digital partner for businesses ready to look their best online.",
      services_eyebrow:"What we do",services_title:"Digital work,<br>made <em>clear.</em>",services_intro:"From a first online presence to a sharper customer experience, we make the process straightforward and the result purposeful.",
      service_one_title:"Business websites",service_one_text:"Professional websites that explain what you do and make it easy for customers to reach you.",
      service_two_title:"Landing pages",service_two_text:"Focused pages for a product, campaign or offer, designed around one clear next step.",
      service_three_title:"Custom web experiences",service_three_text:"Purpose-built interfaces and lightweight web tools shaped around your workflow.",
      service_link:'Discuss this service <span>↗</span>',work_eyebrow:"Selected work",work_title:"Made to feel<br><em>distinct.</em>",work_cta:"Have something in mind? ↗",
      work_one_title:"Brand & business website",work_one_type:"Website design · Development",work_two_title:"Product landing page",work_two_type:"Art direction · Landing page",
      work_note:"Concept previews are illustrative. Project details will be added as work is published.",
      process_eyebrow:"How we work",process_title:"Simple steps.<br><em>Solid results.</em>",process_intro:"A clear process keeps the project moving and makes sure we stay aligned from the first message to delivery.",
      process_one_title:"Share your idea",process_one_text:"Tell us what you need, who it is for and what success should look like.",
      process_two_title:"Design & build",process_two_text:"We shape the visual direction, build the pages and keep you updated.",
      process_three_title:"Review & launch",process_three_text:"Review the result, request included revisions and receive your finished website files.",
      pricing_eyebrow:"Straightforward pricing",pricing_title:"The right scope.<br><em>Clear value.</em>",basic_name:"Basic",basic_title:"A clear start",basic_text:"A clean, focused website for a simple online presence.",
      basic_delivery:"Delivery in 5 days",standard_name:"Standard",standard_title:"Room to grow",standard_text:"A more complete website with extra sections and detail.",
      standard_delivery:"Delivery in 10 days",premium_name:"Premium",premium_title:"Built around you",premium_text:"A tailored experience for projects with broader requirements.",
      premium_delivery:"Delivery in 15 days",choose_plan:"Choose plan ↗",popular:"POPULAR",
      pricing_note:"Need a different scope? Custom packages are available. Additional revisions beyond the included allowance are charged separately.",
      contact_eyebrow:"Start a conversation",contact_title:"Have a project?<br><em>Let’s make it real.</em>",contact_text:"Tell us a little about what you have in mind. We’ll get back to you with the next steps.",
      form_name:"Your name",form_email:"Email address",form_service:"What do you need?",form_choose:"Choose a service",form_message:"A little about your project",
      privacy_consent:"I agree to the privacy policy.",send_message:"Send project request",rights:"All rights reserved.",privacy:"Privacy",terms:"Terms",back_top:"Back to top ↑",
      footer_line:"A thoughtful web presence for your next step.",form_sending:"Sending your request…",form_success:"Your request has been sent. We’ll be in touch soon.",
      form_error:"We couldn’t send your request. Please try again or email norda@duck.com.",form_network_error:"Connection error. Please try again or email norda@duck.com."
    },
    fr: {
      skip:"Aller au contenu",nav_services:"Services",nav_work:"Réalisations",nav_pricing:"Tarifs",nav_contact:"Contact",language_label:"Langue",start_project:"Démarrer un projet",
      hero_eyebrow:"Studio indépendant de création web",hero_title:"Un meilleur site web<br><span>commence par une idée claire.</span>",
      hero_description:"NorDa conçoit et développe des sites web modernes et adaptatifs qui aident les entreprises à présenter leur valeur et à convertir leurs visiteurs en clients.",
      hero_cta:'Parlez-nous de votre projet <span aria-hidden="true">↗</span>',hero_secondary:'Découvrir nos projets <span aria-hidden="true">↓</span>',
      hero_note:"Un design réfléchi. Un développement pratique. Sans complexité inutile.",intro_text:"Un partenaire digital engagé pour les entreprises qui veulent soigner leur présence en ligne.",
      services_eyebrow:"Nos services",services_title:"Le digital,<br>en toute <em>clarté.</em>",services_intro:"De votre première présence en ligne à une expérience client plus aboutie, nous simplifions le processus et donnons du sens au résultat.",
      service_one_title:"Sites web professionnels",service_one_text:"Des sites professionnels qui présentent votre activité et facilitent la prise de contact.",
      service_two_title:"Pages d’atterrissage",service_two_text:"Des pages ciblées pour un produit, une campagne ou une offre, avec un objectif clair.",
      service_three_title:"Expériences web sur mesure",service_three_text:"Des interfaces et outils web légers conçus selon votre façon de travailler.",
      service_link:'Parler de ce service <span>↗</span>',work_eyebrow:"Quelques projets",work_title:"Un style<br><em>distinctif.</em>",work_cta:"Une idée en tête ? ↗",
      work_one_title:"Site de marque et d’entreprise",work_one_type:"Design web · Développement",work_two_title:"Page de présentation produit",work_two_type:"Direction artistique · Landing page",
      work_note:"Les aperçus sont illustratifs. Les détails des projets seront ajoutés au fur et à mesure de leur publication.",
      process_eyebrow:"Notre méthode",process_title:"Des étapes simples.<br><em>Des résultats solides.</em>",process_intro:"Une méthode claire fait avancer le projet et nous permet de rester alignés du premier message à la livraison.",
      process_one_title:"Présentez votre idée",process_one_text:"Expliquez-nous votre besoin, votre public et le résultat que vous souhaitez obtenir.",
      process_two_title:"Conception et développement",process_two_text:"Nous définissons la direction visuelle, créons les pages et vous tenons informé.",
      process_three_title:"Validation et livraison",process_three_text:"Vérifiez le résultat, demandez les retouches incluses et recevez les fichiers de votre site.",
      pricing_eyebrow:"Des tarifs transparents",pricing_title:"Le bon périmètre.<br><em>La juste valeur.</em>",basic_name:"Basic",basic_title:"Bien commencer",basic_text:"Un site clair et ciblé pour établir votre présence en ligne.",
      basic_delivery:"Livraison en 5 jours",standard_name:"Standard",standard_title:"Pour évoluer",standard_text:"Un site plus complet avec davantage de sections et de détails.",
      standard_delivery:"Livraison en 10 jours",premium_name:"Premium",premium_title:"Pensé pour vous",premium_text:"Une expérience personnalisée pour les projets aux besoins plus larges.",
      premium_delivery:"Livraison en 15 jours",choose_plan:"Choisir cette offre ↗",popular:"POPULAIRE",
      pricing_note:"Besoin d’un autre périmètre ? Des offres personnalisées sont possibles. Les retouches supplémentaires sont facturées séparément.",
      contact_eyebrow:"Parlons de votre projet",contact_title:"Un projet en tête ?<br><em>Concrétisons-le.</em>",contact_text:"Présentez-nous brièvement votre idée. Nous vous répondrons avec les prochaines étapes.",
      form_name:"Votre nom",form_email:"Adresse e-mail",form_service:"De quoi avez-vous besoin ?",form_choose:"Choisir un service",form_message:"Quelques mots sur votre projet",
      privacy_consent:"J’accepte la politique de confidentialité.",send_message:"Envoyer la demande",rights:"Tous droits réservés.",privacy:"Confidentialité",terms:"Conditions",back_top:"Retour en haut ↑",
      footer_line:"Une présence web réfléchie pour votre prochaine étape.",form_sending:"Envoi de votre demande…",form_success:"Votre demande a été envoyée. Nous vous répondrons bientôt.",
      form_error:"Impossible d’envoyer votre demande. Réessayez ou écrivez à norda@duck.com.",form_network_error:"Erreur de connexion. Réessayez ou écrivez à norda@duck.com."
    },
    ar: {
      skip:"انتقل إلى المحتوى",nav_services:"الخدمات",nav_work:"أعمالنا",nav_pricing:"الأسعار",nav_contact:"اتصل بنا",language_label:"اللغة",start_project:"ابدأ مشروعك",
      hero_eyebrow:"استوديو مستقل لتصميم المواقع",hero_title:"موقع أفضل<br><span>يبدأ بفكرة واضحة.</span>",
      hero_description:"تصمم NorDa مواقع عصرية ومتجاوبة تساعد الشركات على إبراز قيمة خدماتها وتحويل الزوار إلى عملاء.",
      hero_cta:'أخبرنا عن مشروعك <span aria-hidden="true">↗</span>',hero_secondary:'اكتشف أعمالنا <span aria-hidden="true">↓</span>',
      hero_note:"تصميم مدروس. تطوير عملي. دون تعقيد غير ضروري.",intro_text:"شريك رقمي يساعد الشركات على تقديم أفضل صورة لها عبر الإنترنت.",
      services_eyebrow:"ماذا نقدم",services_title:"حلول رقمية<br><em>بوضوح.</em>",services_intro:"من أول حضور لك على الإنترنت إلى تحسين تجربة عملائك، نجعل العملية واضحة والنتيجة ذات هدف.",
      service_one_title:"مواقع الشركات",service_one_text:"مواقع احترافية تشرح نشاطك وتجعل تواصل العملاء معك أسهل.",
      service_two_title:"صفحات الهبوط",service_two_text:"صفحات مركزة لمنتج أو حملة أو عرض، مصممة لتوجيه الزائر إلى خطوة واضحة.",
      service_three_title:"تجارب ويب مخصصة",service_three_text:"واجهات وأدوات ويب خفيفة مصممة بما يناسب طريقة عملك.",
      service_link:'ناقش هذه الخدمة <span>↗</span>',work_eyebrow:"نماذج من أعمالنا",work_title:"تصميم له<br><em>طابع مميز.</em>",work_cta:"لديك فكرة؟ ↗",
      work_one_title:"موقع علامة تجارية وشركة",work_one_type:"تصميم مواقع · تطوير",work_two_title:"صفحة هبوط لمنتج",work_two_type:"توجيه فني · صفحة هبوط",
      work_note:"المعاينات الحالية تصورية. ستضاف تفاصيل المشاريع عند نشرها.",
      process_eyebrow:"طريقة العمل",process_title:"خطوات بسيطة.<br><em>نتائج متقنة.</em>",process_intro:"خطوات واضحة تحافظ على سير المشروع وتضمن توافقنا من أول رسالة حتى التسليم.",
      process_one_title:"شاركنا فكرتك",process_one_text:"أخبرنا بما تحتاجه، ولمن تقدم خدمتك، وما النتيجة التي تطمح إليها.",
      process_two_title:"التصميم والتطوير",process_two_text:"نحدد التوجه البصري، ونبني الصفحات، ونطلعك على تقدم العمل.",
      process_three_title:"المراجعة والتسليم",process_three_text:"راجع النتيجة، واطلب التعديلات المشمولة، واستلم ملفات موقعك النهائي.",
      pricing_eyebrow:"أسعار واضحة",pricing_title:"النطاق المناسب.<br><em>قيمة واضحة.</em>",basic_name:"Basic",basic_title:"بداية واضحة",basic_text:"موقع بسيط ومركز لتأسيس حضورك على الإنترنت.",
      basic_delivery:"التسليم خلال 5 أيام",standard_name:"Standard",standard_title:"مساحة للنمو",standard_text:"موقع أكثر تكاملاً مع أقسام وتفاصيل إضافية.",
      standard_delivery:"التسليم خلال 10 أيام",premium_name:"Premium",premium_title:"مصمم وفق احتياجك",premium_text:"تجربة مخصصة للمشاريع ذات المتطلبات الأوسع.",
      premium_delivery:"التسليم خلال 15 يومًا",choose_plan:"اختر الباقة ↗",popular:"الأكثر طلبًا",
      pricing_note:"تحتاج إلى نطاق مختلف؟ تتوفر باقات مخصصة. التعديلات الإضافية خارج العدد المشمول تُحتسب بشكل منفصل.",
      contact_eyebrow:"لنبدأ الحديث",contact_title:"لديك مشروع؟<br><em>لنحوّله إلى واقع.</em>",contact_text:"أخبرنا باختصار عما تفكر فيه، وسنرد عليك بالخطوات التالية.",
      form_name:"اسمك",form_email:"البريد الإلكتروني",form_service:"ما الخدمة التي تحتاجها؟",form_choose:"اختر الخدمة",form_message:"أخبرنا قليلًا عن مشروعك",
      privacy_consent:"أوافق على سياسة الخصوصية.",send_message:"إرسال طلب المشروع",rights:"جميع الحقوق محفوظة.",privacy:"الخصوصية",terms:"الشروط",back_top:"العودة للأعلى ↑",
      footer_line:"حضور رقمي مدروس لخطوتك القادمة.",form_sending:"جارٍ إرسال طلبك…",form_success:"تم إرسال طلبك. سنتواصل معك قريبًا.",
      form_error:"تعذر إرسال طلبك. حاول مجددًا أو راسلنا على norda@duck.com.",form_network_error:"حدث خطأ في الاتصال. حاول مجددًا أو راسلنا على norda@duck.com."
    }
  };

  const root = document.documentElement;
  const languageSelect = document.querySelector("#language-select");
  const themeButton = document.querySelector(".theme-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const currencyButtons = document.querySelectorAll("[data-currency]");
  const contactForm = document.querySelector("#contact-form");
  let currentLanguage = localStorage.getItem("norda-language") || "en";
  let currentCurrency = "DZD";

  function applyLanguage(language) {
    const lang = translations[language] ? language : "en";
    currentLanguage = lang;
    const dictionary = translations[lang];
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "NorDa — مواقع تصنع الفرق" : lang === "fr" ? "NorDa — Des sites web qui font la différence" : "NorDa — Websites made for what’s next";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key] !== undefined) element.innerHTML = dictionary[key];
    });
    const placeholders = {
      en: { "contact-name":"Name", "contact-email":"you@example.com", "contact-message":"Tell us about your idea..." },
      fr: { "contact-name":"Nom", "contact-email":"vous@exemple.com", "contact-message":"Parlez-nous de votre idée..." },
      ar: { "contact-name":"الاسم", "contact-email":"you@example.com", "contact-message":"أخبرنا عن فكرتك..." }
    };
    Object.entries(placeholders[lang]).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field) field.placeholder = value;
    });
    const serviceOptions = document.querySelectorAll("#contact-service option");
    const optionLabels = {
      en:["Choose a service","Business website","Landing page","Custom web experience","Something else"],
      fr:["Choisir un service","Site web professionnel","Page d’atterrissage","Expérience web sur mesure","Autre"],
      ar:["اختر الخدمة","موقع شركة","صفحة هبوط","تجربة ويب مخصصة","خدمة أخرى"]
    };
    serviceOptions.forEach((option, index) => { if (optionLabels[lang][index]) option.textContent = optionLabels[lang][index]; });
    if (languageSelect) languageSelect.value = lang;
    localStorage.setItem("norda-language", lang);
  }

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    if (themeButton) {
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      themeButton.innerHTML = dark ? '<span aria-hidden="true">☼</span>' : '<span aria-hidden="true">◐</span>';
    }
    localStorage.setItem("norda-theme", dark ? "dark" : "light");
  }

  function applyCurrency(currency) {
    currentCurrency = currency === "USD" ? "USD" : "DZD";
    document.querySelectorAll(".price-value[data-price-dzd]").forEach((element) => {
      const amount = Number(element.dataset[currentCurrency.toLowerCase()]);
      const formatted = new Intl.NumberFormat(currentLanguage === "ar" ? "en-US" : currentLanguage === "fr" ? "fr-FR" : "en-US").format(amount);
      element.innerHTML = currentCurrency === "DZD" ? formatted + " <small>DZD</small>" : "$" + formatted + " <small>USD</small>";
    });
    currencyButtons.forEach((button) => {
      const active = button.dataset.currency === currentCurrency;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  if (languageSelect) languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
    applyCurrency(currentCurrency);
  });
  if (themeButton) themeButton.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
  currencyButtons.forEach((button) => button.addEventListener("click", () => applyCurrency(button.dataset.currency)));

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }));
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const submitButton = contactForm.querySelector(".form-submit");
      const status = contactForm.querySelector(".form-status");
      const dictionary = translations[currentLanguage];
      const originalButton = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = dictionary.form_sending;
      status.textContent = "";
      const formData = new FormData(contactForm);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        privacy: formData.get("privacy") === "on"
      };
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Request failed");
        status.textContent = dictionary.form_success;
        contactForm.reset();
      } catch (error) {
        status.textContent = dictionary.form_error;
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButton;
      }
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("norda-theme");
  applyTheme(savedTheme || "light");
  applyLanguage(currentLanguage);
  applyCurrency("DZD");

  if ("IntersectionObserver" in window) {
    const revealItems = document.querySelectorAll(".service-card,.work-card,.process-list li,.price-card");
    revealItems.forEach((item) => item.classList.add("reveal-pending"));
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }
})();
