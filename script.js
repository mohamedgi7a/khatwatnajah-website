const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const langToggle = document.querySelector("[data-lang-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector("[data-form-note]");
const journeySection = document.querySelector("[data-journey-section]");
const journeyTrack = document.querySelector("[data-journey-track]");
const journeyProgress = document.querySelector("[data-journey-progress]");
let currentLanguage = localStorage.getItem("successStepLanguage") || "ar";

const translations = {
  ar: {
    "meta.title": "خطوة نجاح | خدمات التشغيل والصيانة في الرياض",
    "meta.description": "خطوة نجاح تقدم خدمات تشغيل وصيانة ونظافة وضيافة ومكافحة حشرات للمنشآت التجارية والطبية والتعليمية والترفيهية في الرياض.",
    "brand.name": "خطوة نجاح",
    "brand.tagline": "تشغيل وصيانة مرافق",
    "nav.label": "روابط الموقع",
    "nav.services": "الخدمات",
    "nav.method": "آلية العمل",
    "nav.sectors": "القطاعات",
    "nav.contact": "التواصل",
    "actions.openMenu": "فتح القائمة",
    "actions.whatsapp": "واتساب",
    "actions.whatsappLong": "تواصل واتساب",
    "actions.quote": "اطلب عرض سعر",
    "hero.eyebrow": "شريكك الموثوق لإدارة المرافق والتشغيل",
    "hero.title": "حلول تشغيل وصيانة متكاملة للمنشآت في الرياض.",
    "hero.copy": "نوفر فرقاً مدربة وخدمات منظمة تشمل التشغيل، النظافة، الصيانة، الضيافة، مكافحة الحشرات، وتوفير المواد والأدوات للقطاعات التجارية والطبية والتعليمية والترفيهية.",
    "hero.metricsLabel": "مؤشرات الشركة",
    "hero.metricWorkforce": "فرد من القوة العاملة",
    "hero.metricExperience": "سنوات خبرة تشغيلية",
    "hero.metricSupport": "إشراف واستجابة للطلبات",
    "about.eyebrow": "من نحن",
    "about.title": "خطوة نجاح شريك تشغيلي يساعد المنشآت على العمل بثبات وجودة.",
    "about.copy": "نحن شركة متخصصة في خدمات إدارة المرافق والتشغيل والصيانة، نقدم حلولاً عملية للمنشآت التي تحتاج إلى فرق موثوقة، إشراف يومي، واستجابة سريعة. نعمل في الرياض مع قطاعات متعددة تشمل التجاري، التعليمي، الطبي، والضيافة، ونركز على تقديم خدمة منظمة تقلل العبء التشغيلي عن العميل.",
    "about.highlightsLabel": "مميزات خطوة نجاح",
    "about.highlight1Title": "فرق مدربة",
    "about.highlight1Copy": "اختيار وتجهيز العمالة حسب طبيعة الموقع ونطاق الخدمة.",
    "about.highlight2Title": "إشراف واضح",
    "about.highlight2Copy": "متابعة تشغيلية وملاحظات دورية للحفاظ على جودة الخدمة.",
    "about.highlight3Title": "حلول مرنة",
    "about.highlight3Copy": "خدمات قابلة للتخصيص حسب حجم المنشأة واحتياجها اليومي.",
    "journey.eyebrow": "رحلة التشغيل",
    "journey.title": "من أول طلب إلى تشغيل مستقر، كل خطوة لها نظام.",
    "journey.step1Title": "فهم الاحتياج",
    "journey.step1Copy": "نحدد نوع المنشأة، عدد المواقع، نطاق الخدمة، وساعات التشغيل المطلوبة.",
    "journey.step2Title": "تجهيز الفريق",
    "journey.step2Copy": "نختار العمالة المناسبة، المشرفين، والمواد أو المعدات المطلوبة لكل موقع.",
    "journey.step3Title": "بدء التشغيل",
    "journey.step3Copy": "نوزع المهام، نضبط الجدول، ونبدأ الخدمة في الموقع بوضوح من اليوم الأول.",
    "journey.step4Title": "الإشراف والمتابعة",
    "journey.step4Copy": "نتابع الجودة، الحضور، الملاحظات، وسرعة الاستجابة لأي احتياج تشغيلي.",
    "journey.step5Title": "تحسين مستمر",
    "journey.step5Copy": "نراجع الأداء ونعدل الخطة حسب تغير احتياج العميل أو توسع نطاق الخدمة.",
    "identity.eyebrow": "الهوية الجديدة",
    "identity.title": "تصميم أوضح مستوحى من ألوان الشعار ويخدم قرار العميل بسرعة.",
    "identity.card1Title": "ألوان من الشعار",
    "identity.card1Copy": "أزرق كهربائي، سماوي، أخضر ليموني، وخلفيات داكنة هادئة تعكس هوية الشركة.",
    "identity.card2Title": "الخدمات مرتبة حسب الاحتياج",
    "identity.card2Copy": "الخدمات الناعمة والثقيلة مع وصف مباشر يساعد العميل على طلب العرض المناسب.",
    "identity.card3Title": "لغتان وتجربة واحدة",
    "identity.card3Copy": "يمكن للزائر التبديل بين العربية والإنجليزية مع الحفاظ على نفس المحتوى والروابط.",
    "services.eyebrow": "خدماتنا",
    "services.title": "كل ما تحتاجه المنشأة للتشغيل اليومي.",
    "services.filterLabel": "فلترة الخدمات",
    "filters.all": "الكل",
    "filters.soft": "خدمات ناعمة",
    "filters.hard": "خدمات صلبة",
    "filters.support": "دعم وتشغيل",
    "services.cleaningAlt": "فريق تنظيف من خطوة نجاح",
    "services.cleaningTitle": "خدمات النظافة",
    "services.cleaningCopy": "نظافة دورية وعميقة للمنشآت بمواد آمنة وإشراف منظم.",
    "services.hospitalityAlt": "فريق ضيافة من خطوة نجاح",
    "services.hospitalityTitle": "خدمات الضيافة",
    "services.hospitalityCopy": "طاقم مدرب لخدمة المكاتب، الفعاليات، والمراكز التجارية.",
    "services.maintenanceAlt": "فريق تشغيل داخل منشأة",
    "services.maintenanceTitle": "الصيانة والتشغيل",
    "services.maintenanceCopy": "صيانة دورية وطارئة تشمل الكهرباء، السباكة، والتكييف.",
    "services.supplyAlt": "معدات ومواد تشغيل",
    "services.supplyTitle": "توفير العمالة والمواد",
    "services.supplyCopy": "عمالة مدربة ومواد وأدوات نظافة وضيافة حسب احتياج المنشأة.",
    "method.imageAlt": "فريق خطوة نجاح داخل منشأة",
    "method.eyebrow": "آلية العمل",
    "method.title": "نبدأ بفهم الاحتياج، ثم نوفر الفريق والخطة.",
    "method.step1Title": "استلام الطلب",
    "method.step1Copy": "نراجع نوع المنشأة، نطاق الخدمة، وعدد الأفراد أو الزيارات المطلوبة.",
    "method.step2Title": "عرض سعر مخصص",
    "method.step2Copy": "نحدد الموارد، الجدول، المشرفين، والمواد المطلوبة لكل موقع.",
    "method.step3Title": "تنفيذ ومتابعة",
    "method.step3Copy": "فريق مدرب، إشراف دوري، واستجابة سريعة لأي ملاحظات تشغيلية.",
    "sectors.educationTitle": "تعليمي",
    "sectors.educationCopy": "مدارس ومنشآت تدريب",
    "sectors.medicalTitle": "طبي",
    "sectors.medicalCopy": "مراكز صحية وعيادات",
    "sectors.commercialTitle": "تجاري",
    "sectors.commercialCopy": "مكاتب، مطاعم، فنادق ومراكز ترفيه",
    "sectors.quote": "\"نبحث عن شريك لا يقدم عمالة فقط، بل يشرف ويتابع ويجعل التشغيل اليومي أسهل.\"",
    "sectors.quoteBy": "صياغة تسويقية مقترحة لقيمة خطوة نجاح",
    "clients.eyebrow": "{ عملاؤنا }",
    "clients.title": "شركاء وثقوا في خطوة نجاح",
    "clients.note": "وشركات وعملاء آخرون من مختلف القطاعات.",
    "clients.marqueeLabel": "شعارات العملاء",
    "clients.federationChambers": "اتحاد الغرف",
    "clients.investSaudi": "استثمار السعودية",
    "clients.alsulaiman": "السليمان العقارية",
    "clients.jasadHawaa": "جسد حواء",
    "clients.expertsCircle": "دائرة الخبراء",
    "clients.agriculturalFund": "صندوق التنمية الزراعية",
    "clients.princeMohammed": "مؤسسة الأمير محمد بن فهد",
    "clients.madrasati": "مدرستي",
    "clients.fitnessPlace": "مكان الرشاقة",
    "clients.manaratAlameed": "منارات العميد",
    "clients.hopLand": "هوب لاند",
    "testimonials.eyebrow": "آراء العملاء",
    "testimonials.title": "ما يقوله شركاؤنا عن تجربة العمل معنا.",
    "testimonials.review1": "وفرت خطوة نجاح حلاً متكاملاً وموثوقاً لاحتياجات التشغيل والصيانة، مع فريق سريع الاستجابة واحترافي في المتابعة.",
    "testimonials.name1": "أحمد الخالد",
    "testimonials.role1": "مدير تطوير عقاري",
    "testimonials.review2": "نعتمد عليهم في خدمات النظافة والتشغيل. الجودة ممتازة، والتنسيق واضح، والتعامل مع الفريق سهل جداً.",
    "testimonials.name2": "فاطمة الدعيع",
    "testimonials.role2": "مديرة إدارية",
    "testimonials.review3": "الشركة توفر فريقاً مدرباً وملتزماً بالجودة والدقة، وكانت الاستجابة للملاحظات التشغيلية سريعة ومنظمة.",
    "testimonials.name3": "محمد القحطاني",
    "testimonials.role3": "صاحب مشروع ترفيهي",
    "faq.eyebrow": "الأسئلة الشائعة",
    "faq.title": "قبل طلب عرض السعر.",
    "faq.q1": "هل توفرون عمالة مع إشراف؟",
    "faq.a1": "نعم، الخدمة تشمل توفير فريق مناسب مع متابعة تشغيلية حسب نطاق العقد.",
    "faq.q2": "هل تغطون أكثر من قطاع؟",
    "faq.a2": "نعم، تشمل الخبرة قطاعات تعليمية وطبية وتجارية وسكنية وترفيهية.",
    "faq.q3": "هل يمكن طلب عرض سعر سريع؟",
    "faq.a3": "نعم، يمكن إرسال النموذج أو التواصل مباشرة عبر واتساب على الرقم الموجود بالموقع.",
    "contact.eyebrow": "تواصل معنا",
    "contact.title": "احصل على عرض سعر مخصص لاحتياج منشأتك.",
    "contact.emailLabel": "البريد:",
    "contact.phoneLabel": "الهاتف:",
    "contact.address": "الرياض - العليا، طريق الملك فهد",
    "form.name": "الاسم",
    "form.namePlaceholder": "اكتب اسمك الكامل",
    "form.company": "اسم الشركة",
    "form.companyPlaceholder": "اسم المنشأة أو الشركة",
    "form.phone": "رقم الجوال",
    "form.service": "نوع الخدمة",
    "form.servicePlaceholder": "اختر نوع الخدمة",
    "form.serviceManpower": "توفير الموارد البشرية",
    "form.serviceCleaning": "خدمات النظافة",
    "form.serviceMaintenance": "خدمات الصيانة",
    "form.serviceHospitality": "خدمات الضيافة",
    "form.servicePest": "مكافحة الحشرات",
    "form.serviceMaterials": "توفير المواد والأدوات",
    "form.message": "الرسالة",
    "form.messagePlaceholder": "اكتب احتياجك أو عدد المواقع أو نوع المنشأة",
    "form.submit": "إرسال الطلب",
    "form.note": "سيتم إرسال الطلب عبر Formspree إلى القناة المرتبطة بالموقع الأصلي.",
    "form.sending": "جاري الإرسال...",
    "form.sendingNote": "نرسل طلبك الآن...",
    "form.success": "تم إرسال طلبك بنجاح. سيتواصل معك فريق خطوة نجاح قريباً.",
    "form.error": "تعذر إرسال الطلب. يمكنك التواصل مباشرة عبر واتساب أو البريد.",
    "footer.about": "حلول تشغيل وصيانة ونظافة وضيافة للمنشآت في الرياض، بخدمات منظمة وفرق مدربة.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "التواصل",
    "footer.follow": "تابعنا",
    "footer.socialLabel": "روابط التواصل الاجتماعي",
    "footer.map": "موقعنا على خرائط Google",
    "footer.copy": "خطوة نجاح © 2026",
    "footer.rights": "جميع الحقوق محفوظة",
  },
  en: {
    "meta.title": "Khatwat Najah | Facilities Maintenance in Riyadh",
    "meta.description": "Khatwat Najah provides facilities management, maintenance, cleaning, hospitality, pest control, manpower, and supply services for organizations in Riyadh.",
    "brand.name": "Khatwat Najah",
    "brand.tagline": "Facilities Maintenance",
    "nav.label": "Site navigation",
    "nav.services": "Services",
    "nav.method": "Process",
    "nav.sectors": "Sectors",
    "nav.contact": "Contact",
    "actions.openMenu": "Open menu",
    "actions.whatsapp": "WhatsApp",
    "actions.whatsappLong": "Contact on WhatsApp",
    "actions.quote": "Request a Quote",
    "hero.eyebrow": "Your trusted partner in facilities management",
    "hero.title": "Integrated operations and maintenance solutions in Riyadh.",
    "hero.copy": "We provide trained teams and organized services covering operations, cleaning, maintenance, hospitality, pest control, and supplies for commercial, medical, educational, and entertainment sectors.",
    "hero.metricsLabel": "Company metrics",
    "hero.metricWorkforce": "Workforce members",
    "hero.metricExperience": "Years of operational experience",
    "hero.metricSupport": "Supervision and response",
    "about.eyebrow": "About Us",
    "about.title": "Khatwat Najah is an operations partner that helps facilities run with consistency and quality.",
    "about.copy": "We specialize in facilities management, operations, and maintenance services, delivering practical solutions for organizations that need reliable teams, daily supervision, and fast response. Based in Riyadh, we serve commercial, educational, medical, and hospitality sectors with organized services that reduce the operational load on our clients.",
    "about.highlightsLabel": "Khatwat Najah strengths",
    "about.highlight1Title": "Trained Teams",
    "about.highlight1Copy": "Manpower is selected and prepared based on each site and service scope.",
    "about.highlight2Title": "Clear Supervision",
    "about.highlight2Copy": "Operational follow-up and regular notes help maintain service quality.",
    "about.highlight3Title": "Flexible Solutions",
    "about.highlight3Copy": "Services can be customized around facility size and daily operational needs.",
    "journey.eyebrow": "Operations Journey",
    "journey.title": "From first request to stable operations, every step has a system.",
    "journey.step1Title": "Understand the Need",
    "journey.step1Copy": "We define the facility type, number of locations, service scope, and required operating hours.",
    "journey.step2Title": "Prepare the Team",
    "journey.step2Copy": "We select the right manpower, supervisors, materials, and equipment for each location.",
    "journey.step3Title": "Start Operations",
    "journey.step3Copy": "Tasks are assigned, schedules are set, and service begins clearly from day one.",
    "journey.step4Title": "Supervise and Follow Up",
    "journey.step4Copy": "We track quality, attendance, feedback, and response speed for every operational need.",
    "journey.step5Title": "Continuous Improvement",
    "journey.step5Copy": "We review performance and adjust the plan as client needs or service scope changes.",
    "identity.eyebrow": "New Visual Identity",
    "identity.title": "A clearer design inspired by the logo colors and built for faster client decisions.",
    "identity.card1Title": "Logo-led palette",
    "identity.card1Copy": "Electric blue, cyan, lime green, and calm dark backgrounds now define the brand system.",
    "identity.card2Title": "Services by need",
    "identity.card2Copy": "Soft and hard services are grouped with direct copy that helps clients request the right offer.",
    "identity.card3Title": "Two languages, one experience",
    "identity.card3Copy": "Visitors can switch between Arabic and English while keeping the same content, links, and form flow.",
    "services.eyebrow": "Our Services",
    "services.title": "Everything a facility needs for daily operations.",
    "services.filterLabel": "Filter services",
    "filters.all": "All",
    "filters.soft": "Soft Services",
    "filters.hard": "Solid Services",
    "filters.support": "Support",
    "services.cleaningAlt": "Khatwat Najah cleaning team",
    "services.cleaningTitle": "Cleaning Services",
    "services.cleaningCopy": "Daily and deep cleaning for facilities using safe materials and organized supervision.",
    "services.hospitalityAlt": "Khatwat Najah hospitality team",
    "services.hospitalityTitle": "Hospitality Services",
    "services.hospitalityCopy": "Trained teams for offices, events, reception areas, and commercial centers.",
    "services.maintenanceAlt": "Operations team inside a facility",
    "services.maintenanceTitle": "Maintenance and Operations",
    "services.maintenanceCopy": "Scheduled and emergency maintenance covering electrical, plumbing, and HVAC needs.",
    "services.supplyAlt": "Operations materials and supplies",
    "services.supplyTitle": "Manpower and Supplies",
    "services.supplyCopy": "Trained manpower plus cleaning and hospitality materials based on facility needs.",
    "method.imageAlt": "Khatwat Najah team inside a facility",
    "method.eyebrow": "How We Work",
    "method.title": "We understand the need, then provide the team and plan.",
    "method.step1Title": "Request Review",
    "method.step1Copy": "We review the facility type, service scope, and required headcount or visit schedule.",
    "method.step2Title": "Custom Quote",
    "method.step2Copy": "We define resources, schedules, supervisors, and required materials for each location.",
    "method.step3Title": "Delivery and Follow-up",
    "method.step3Copy": "A trained team, regular supervision, and fast response to operational feedback.",
    "sectors.educationTitle": "Education",
    "sectors.educationCopy": "Schools and training facilities",
    "sectors.medicalTitle": "Medical",
    "sectors.medicalCopy": "Healthcare centers and clinics",
    "sectors.commercialTitle": "Commercial",
    "sectors.commercialCopy": "Offices, restaurants, hotels, and entertainment centers",
    "sectors.quote": "\"We need a partner that does more than supply manpower; one that supervises, follows up, and makes daily operations easier.\"",
    "sectors.quoteBy": "Suggested positioning statement for Khatwat Najah",
    "clients.eyebrow": "{ Our Clients }",
    "clients.title": "Partners who trust Khatwat Najah",
    "clients.note": "Along with many more clients from a wide range of sectors.",
    "clients.marqueeLabel": "Client logos",
    "clients.federationChambers": "Federation of Saudi Chambers",
    "clients.investSaudi": "Invest Saudi",
    "clients.alsulaiman": "Al Sulaiman Real Estate",
    "clients.jasadHawaa": "Jasad Hawaa",
    "clients.expertsCircle": "Experts Circle",
    "clients.agriculturalFund": "Agricultural Development Fund",
    "clients.princeMohammed": "Prince Mohammed Bin Fahd Foundation",
    "clients.madrasati": "Madrasati",
    "clients.fitnessPlace": "Fitness Place",
    "clients.manaratAlameed": "Manarat Al Ameed",
    "clients.hopLand": "Hop Land",
    "testimonials.eyebrow": "Client Testimonials",
    "testimonials.title": "What our partners say about working with us.",
    "testimonials.review1": "Khatwat Najah provided an integrated and reliable solution for our operations and maintenance needs, with a responsive and professional team.",
    "testimonials.name1": "Ahmed Al Khalid",
    "testimonials.role1": "Real Estate Development Manager",
    "testimonials.review2": "We rely on them for cleaning and operations services. The quality is excellent, coordination is clear, and the team is easy to work with.",
    "testimonials.name2": "Fatimah Al Duai",
    "testimonials.role2": "Administrative Manager",
    "testimonials.review3": "The company provides a trained team committed to quality and accuracy, with fast and organized responses to operational notes.",
    "testimonials.name3": "Mohammed Al Qahtani",
    "testimonials.role3": "Entertainment Project Owner",
    "faq.eyebrow": "Frequently Asked Questions",
    "faq.title": "Before requesting a quote.",
    "faq.q1": "Do you provide manpower with supervision?",
    "faq.a1": "Yes. The service includes the right team and operational follow-up based on the contract scope.",
    "faq.q2": "Do you cover multiple sectors?",
    "faq.a2": "Yes. Our experience covers educational, medical, commercial, residential, and entertainment sectors.",
    "faq.q3": "Can I request a quick quote?",
    "faq.a3": "Yes. You can submit the form or contact us directly through the WhatsApp number on the site.",
    "contact.eyebrow": "Contact Us",
    "contact.title": "Get a custom quote for your facility needs.",
    "contact.emailLabel": "Email:",
    "contact.phoneLabel": "Phone:",
    "contact.address": "Riyadh - Al Olaya, King Fahd Road",
    "form.name": "Name",
    "form.namePlaceholder": "Enter your full name",
    "form.company": "Company Name",
    "form.companyPlaceholder": "Facility or company name",
    "form.phone": "Mobile Number",
    "form.service": "Service Type",
    "form.servicePlaceholder": "Select a service",
    "form.serviceManpower": "Manpower Supply",
    "form.serviceCleaning": "Cleaning Services",
    "form.serviceMaintenance": "Maintenance Services",
    "form.serviceHospitality": "Hospitality Services",
    "form.servicePest": "Pest Control",
    "form.serviceMaterials": "Materials and Tools Supply",
    "form.message": "Message",
    "form.messagePlaceholder": "Share your need, number of locations, or facility type",
    "form.submit": "Send Request",
    "form.note": "The request will be sent through the Formspree channel connected to the original website.",
    "form.sending": "Sending...",
    "form.sendingNote": "Sending your request now...",
    "form.success": "Your request was sent successfully. The Khatwat Najah team will contact you soon.",
    "form.error": "Could not send the request. You can contact us directly through WhatsApp or email.",
    "footer.about": "Operations, maintenance, cleaning, and hospitality solutions for facilities in Riyadh, delivered through organized services and trained teams.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.follow": "Follow Us",
    "footer.socialLabel": "Social media links",
    "footer.map": "Find us on Google Maps",
    "footer.copy": "Khatwat Najah © 2026",
    "footer.rights": "All rights reserved",
  },
};

const translate = (key) => translations[currentLanguage][key] || translations.ar[key] || key;

const applyLanguage = (language) => {
  currentLanguage = language;
  localStorage.setItem("successStepLanguage", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  langToggle.textContent = language === "ar" ? "EN" : "AR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = translate(element.dataset.i18nAlt);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.setAttribute("content", translate(element.dataset.i18nContent));
  });
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

const updateJourney = () => {
  if (!journeySection || !journeyTrack || window.matchMedia("(max-width: 980px)").matches) return;

  const rect = journeySection.getBoundingClientRect();
  const scrollable = journeySection.offsetHeight - window.innerHeight;
  const rawProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
  const distance = journeyTrack.scrollWidth - window.innerWidth;
  const direction = currentLanguage === "ar" ? 1 : -1;

  journeyTrack.style.transform = `translateX(${direction * distance * rawProgress}px)`;

  if (journeyProgress) {
    journeyProgress.style.transform = `scaleX(${rawProgress})`;
  }
};

menuButton.addEventListener("click", () => {
  header.classList.toggle("is-open");
});

document.addEventListener("click", (event) => {
  const clickedInsideHeader = header.contains(event.target);
  if (!clickedInsideHeader) {
    header.classList.remove("is-open");
  }
});

header.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
  });
});

langToggle.addEventListener("click", () => {
  applyLanguage(currentLanguage === "ar" ? "en" : "ar");
  updateJourney();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.filter;
    cards.forEach((card) => {
      const visible = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);

  submitButton.disabled = true;
  submitButton.textContent = translate("form.sending");
  formNote.textContent = translate("form.sendingNote");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    form.reset();
    formNote.textContent = translate("form.success");
  } catch {
    formNote.textContent = translate("form.error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = translate("form.submit");
  }
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateJourney();
});
window.addEventListener("resize", updateJourney);
updateHeader();
applyLanguage(currentLanguage);
updateJourney();
