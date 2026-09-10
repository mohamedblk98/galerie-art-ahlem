export type Lang = 'fr' | 'en' | 'ar';

const translations = {
  fr: {
    // ── Navigation ──
    nav_home: 'Accueil',
    nav_artists: 'Artistes',
    nav_about: 'A propos',
    nav_exhibitions: 'Expositions',
    nav_visit: 'Lookbook',
    nav_gallery: 'Galerie',

    // ── Home Page ──
    home_eyebrow: "Galerie d'Art Contemporain",
    home_title_1: 'Atelier',
    home_title_2_dart: "D'Art",
    home_title_2_ahlem: 'Ahlem',
    home_subtitle:
      "Une expérience immersive où matière, lumière et mémoire se rejoignent pour célébrer l'art contemporain du monde arabe.",
    home_cta_discover: 'Découvrir les artistes',
    home_cta_enter: 'Entrer dans la galerie',
    home_scroll: 'Défiler',

    // ── Featured Section ──
    featured_eyebrow: 'Collection',
    featured_title: 'Artistes en vedette',
    featured_desc:
      "Découvrez les artistes qui façonnent la scène contemporaine à travers la peinture, la sculpture et l'installation.",
    featured_see_gallery: 'Voir la galerie →',
    featured_see_all: 'Tous les artistes',

    // ── About Section ──
    about_eyebrow: 'A propos',
    about_title: 'La galerie',
    about_p1:
      "Atelier Gallery est un espace d'exposition dédié à l'art contemporain du monde arabe. Nous révélons les voix créatives qui dialoguent entre traditions millénaires et expression moderne.",
    about_p2:
      "Chaque œuvre est une invitation au voyage — à travers les matières, les lumières et les mémoires qui façonnent l'identité artistique du Maghreb et du Moyen-Orient.",
    about_stat_artists: 'Artistes',
    about_stat_works: 'Œuvres',
    about_stat_cities: 'Villes',

    // ── Exhibitions Section ──
    expo_eyebrow: 'Programmation',
    expo_title: 'Expositions',
    expo_now: 'En cours',
    expo_coming: 'A venir',
    expo_1_title: 'Matière et Mémoire',
    expo_1_desc:
      'Une exploration sensorielle des textures et lumières du Maghreb à travers peinture et sculpture.',
    expo_1_artists: 'Khaled Sebaa · Mustapha Boucenna',
    expo_2_title: 'Formes Hybrides',
    expo_2_desc:
      'Sculptures contemporaines entre organique et minéral, résonances du bassin méditerranéen.',
    expo_2_artists: 'Amira Khelifi · Leila Zerhouni · Omar Benali',
    expo_3_title: 'Lumière Invisibles',
    expo_3_desc:
      'Installations immersives où son, lumière et espace se répondent pour transformer les galeries.',
    expo_3_artists: 'Nadia Khatib · Youssef El Mansouri',

    // ── Newsletter ──
    newsletter_eyebrow: 'Restez connecté',
    newsletter_title: 'Recevez nos actualités',
    newsletter_desc:
      'Expositions, nouvelles œuvres et événements exclusifs — directement dans votre boîte mail.',
    newsletter_placeholder: 'votre@email.com',
    newsletter_aria: 'Adresse email',
    newsletter_submit: "S'inscrire",

    // ── Footer ──
    footer_tagline: "Galerie d'art contemporain du monde arabe.",
    footer_nav: 'Navigation',
    footer_contact: 'Contact',
    footer_address_1: 'Paris, France',
    footer_address_2: 'Alger, Algérie',
    footer_address_3: 'Tunis, Tunisie',
    footer_follow: 'Suivez-nous',
    footer_copyright: '© 2026 Atelier Gallery. Tous droits réservés.',

    // ── Artists Page ──
    artists_title: 'Artistes',
    artists_subtitle:
      "Decouvrez les artistes — Une collection d'artistes contemporains, entre matiere, lumiere et memoire.",
    artists_aria: 'Carrousel des artistes',
    artists_prev: 'Artiste précédent',
    artists_next: 'Artiste suivant',
    artists_goto: 'Aller à l\'artiste',
    artists_infos: 'Infos',
    artists_gallery: 'Galerie',

    // ── Artist Info Page ──
    artist_not_found: 'Artiste introuvable',
    artist_back: 'Retour aux artistes',
    artist_back_short: 'Retour',
    artist_works: 'Oeuvres',
    artist_last_year: 'Derniere annee',
    artist_see_gallery: 'Voir la galerie →',
    artist_selected_works: 'Oeuvres selectionnees',

    // ── Gallery Controls ──
    gallery_back: 'Retour aux artistes',
    gallery_nav_aria: 'Navigation des oeuvres',
    gallery_prev: 'Oeuvre precedente',
    gallery_next: 'Oeuvre suivante',

    // ── Loading ──
    loading: 'Chargement',

    // ── WebGL Fallback ──
    fallback_prev: '← Precedent',
    fallback_next: 'Suivant →',

    // ── Artwork Info Panel ──
    panel_aria: "Informations sur l'oeuvre",
    panel_close: "Fermer le panneau d'informations",
    panel_details: "Details de l'oeuvre",
    panel_artist: 'Artiste',
    panel_hint:
      "Le cadre s'est écarté pour révéler cet espace — refermez pour le ramener au centre.",

    // ── Artist Card ──
    card_works: 'oeuvres',

    // ── Artist Carousel 3D ──
    carousel3d_info: 'Informations',
    carousel3d_drag: 'Glisser',

    // ── Discipline ──
    discipline_peinture: 'Peinture',
    discipline_sculpture: 'Sculpture',
    discipline_installation: 'Installation',
    discipline_photographie: 'Photographie',

    // ── Country ──
    country_algerie: 'Algérie',

    // ── About Page ──
    apropos_hero_eyebrow: 'Notre Histoire',
    apropos_hero_title: 'La Galerie',
    apropos_hero_subtitle:
      "Un espace dédié à l'art, à la créativité et à l'expression artistique.",
    apropos_mission_eyebrow: 'À propos',
    apropos_mission_title: 'À propos de Galerie Ahlem',
    apropos_mission_p1:
      "Galerie Ahlem est un espace dédié à l'art, à la créativité et à l'expression artistique. Notre mission est de mettre en lumière des artistes talentueux et de créer une rencontre entre leurs œuvres et un public passionné par l'art.",
    apropos_mission_p2:
      "À travers une sélection soigneusement choisie d'œuvres contemporaines et originales, Galerie Ahlem valorise la diversité des styles, des techniques et des univers artistiques.",
    apropos_mission_p3:
      "Nous croyons que chaque œuvre raconte une histoire, transmet une émotion et offre une nouvelle façon de regarder le monde.",
    apropos_mission_bold: 'Galerie Ahlem — Un espace où l\'art prend vie.',
    apropos_values_eyebrow: 'Nos Valeurs',
    apropos_values_title: 'Ce qui nous guide',
    apropos_value_1_title: 'Authenticité',
    apropos_value_1_desc: 'Chaque artiste est sélectionné pour la singularité de sa voix et la profondeur de sa démarche.',
    apropos_value_2_title: 'Dialogue',
    apropos_value_2_desc: 'Nous créons des ponts entre les cultures, les époques et les mediums pour enrichir le discours artistique.',
    apropos_value_3_title: 'Excellence',
    apropos_value_3_desc: 'Une curation rigoureuse et une présentation soignée pour sublimer chaque œuvre exposée.',
    apropos_stat_artists: 'Artistes',
    apropos_stat_works: 'Œuvres',
    apropos_stat_cities: 'Villes',
    apropos_stat_exhibitions: 'Expositions',
    apropos_cta_discover: 'Découvrir les artistes',
    apropos_cta_contact: 'Nous contacter',
  },

  en: {
    // ── Navigation ──
    nav_home: 'Home',
    nav_artists: 'Artists',
    nav_about: 'About',
    nav_exhibitions: 'Exhibitions',
    nav_visit: 'Lookbook',
    nav_gallery: 'Gallery',

    // ── Home Page ──
    home_eyebrow: 'Contemporary Art Gallery',
    home_title_1: 'Atelier',
    home_title_2_dart: "D'Art",
    home_title_2_ahlem: 'Ahlem',
    home_subtitle:
      'An immersive experience where matter, light, and memory come together to celebrate contemporary art from the Arab world.',
    home_cta_discover: 'Discover the artists',
    home_cta_enter: 'Enter the gallery',
    home_scroll: 'Scroll',

    // ── Featured Section ──
    featured_eyebrow: 'Collection',
    featured_title: 'Featured Artists',
    featured_desc:
      'Discover the artists shaping the contemporary scene through painting, sculpture, and installation.',
    featured_see_gallery: 'See gallery →',
    featured_see_all: 'All artists',

    // ── About Section ──
    about_eyebrow: 'About',
    about_title: 'The gallery',
    about_p1:
      'Atelier Gallery is an exhibition space dedicated to contemporary art from the Arab world. We reveal creative voices that dialogue between ancient traditions and modern expression.',
    about_p2:
      'Each work is an invitation to travel — through the materials, lights, and memories that shape the artistic identity of the Maghreb and the Middle East.',
    about_stat_artists: 'Artists',
    about_stat_works: 'Works',
    about_stat_cities: 'Cities',

    // ── Exhibitions Section ──
    expo_eyebrow: 'Programming',
    expo_title: 'Exhibitions',
    expo_now: 'Current',
    expo_coming: 'Coming',
    expo_1_title: 'Matter and Memory',
    expo_1_desc:
      'A sensory exploration of the textures and lights of the Maghreb through painting and sculpture.',
    expo_1_artists: 'Khaled Sebaa · Mustapha Boucenna',
    expo_2_title: 'Hybrid Forms',
    expo_2_desc:
      'Contemporary sculptures between organic and mineral, resonances of the Mediterranean basin.',
    expo_2_artists: 'Amira Khelifi · Leila Zerhouni · Omar Benali',
    expo_3_title: 'Invisible Light',
    expo_3_desc:
      'Immersive installations where sound, light, and space respond to each other to transform galleries.',
    expo_3_artists: 'Nadia Khatib · Youssef El Mansouri',

    // ── Newsletter ──
    newsletter_eyebrow: 'Stay connected',
    newsletter_title: 'Receive our news',
    newsletter_desc:
      'Exhibitions, new works, and exclusive events — delivered straight to your inbox.',
    newsletter_placeholder: 'your@email.com',
    newsletter_aria: 'Email address',
    newsletter_submit: 'Sign up',

    // ── Footer ──
    footer_tagline: 'Contemporary art gallery of the Arab world.',
    footer_nav: 'Navigation',
    footer_contact: 'Contact',
    footer_address_1: 'Paris, France',
    footer_address_2: 'Algiers, Algeria',
    footer_address_3: 'Tunis, Tunisia',
    footer_follow: 'Follow us',
    footer_copyright: '© 2026 Atelier Gallery. All rights reserved.',

    // ── Artists Page ──
    artists_title: 'Artists',
    artists_subtitle:
      'Discover the artists — A collection of contemporary artists, between matter, light, and memory.',
    artists_aria: 'Artists carousel',
    artists_prev: 'Previous artist',
    artists_next: 'Next artist',
    artists_goto: 'Go to artist',
    artists_infos: 'Info',
    artists_gallery: 'Gallery',

    // ── Artist Info Page ──
    artist_not_found: 'Artist not found',
    artist_back: 'Back to artists',
    artist_back_short: 'Back',
    artist_works: 'Works',
    artist_last_year: 'Last year',
    artist_see_gallery: 'See gallery →',
    artist_selected_works: 'Selected works',

    // ── Gallery Controls ──
    gallery_back: 'Back to artists',
    gallery_nav_aria: 'Artwork navigation',
    gallery_prev: 'Previous artwork',
    gallery_next: 'Next artwork',

    // ── Loading ──
    loading: 'Loading',

    // ── WebGL Fallback ──
    fallback_prev: '← Previous',
    fallback_next: 'Next →',

    // ── Artwork Info Panel ──
    panel_aria: 'Artwork information',
    panel_close: 'Close information panel',
    panel_details: 'Artwork details',
    panel_artist: 'Artist',
    panel_hint:
      'The frame has moved aside to reveal this space — close it to bring it back to the center.',

    // ── Artist Card ──
    card_works: 'works',

    // ── Artist Carousel 3D ──
    carousel3d_info: 'Information',
    carousel3d_drag: 'Drag',

    // ── Discipline ──
    discipline_peinture: 'Painting',
    discipline_sculpture: 'Sculpture',
    discipline_installation: 'Installation',
    discipline_photographie: 'Photography',

    // ── Country ──
    country_algerie: 'Algeria',

    // ── About Page ──
    apropos_hero_eyebrow: 'Our Story',
    apropos_hero_title: 'The Gallery',
    apropos_hero_subtitle:
      'A space dedicated to art, creativity, and artistic expression.',
    apropos_mission_eyebrow: 'About',
    apropos_mission_title: 'About Galerie Ahlem',
    apropos_mission_p1:
      "Galerie Ahlem is a space dedicated to art, creativity, and artistic expression. Our mission is to spotlight talented artists and create a meeting between their works and a public passionate about art.",
    apropos_mission_p2:
      'Through a carefully curated selection of contemporary and original works, Galerie Ahlem celebrates the diversity of styles, techniques, and artistic universes.',
    apropos_mission_p3:
      'We believe that every work tells a story, conveys an emotion, and offers a new way of seeing the world.',
    apropos_mission_bold: "Galerie Ahlem — A space where art comes to life.",
    apropos_values_eyebrow: 'Our Values',
    apropos_values_title: 'What guides us',
    apropos_value_1_title: 'Authenticity',
    apropos_value_1_desc: 'Each artist is selected for the singularity of their voice and the depth of their approach.',
    apropos_value_2_title: 'Dialogue',
    apropos_value_2_desc: 'We create bridges between cultures, eras, and mediums to enrich the artistic discourse.',
    apropos_value_3_title: 'Excellence',
    apropos_value_3_desc: 'Rigorous curation and careful presentation to sublimate every exhibited work.',
    apropos_stat_artists: 'Artists',
    apropos_stat_works: 'Works',
    apropos_stat_cities: 'Cities',
    apropos_stat_exhibitions: 'Exhibitions',
    apropos_cta_discover: 'Discover the artists',
    apropos_cta_contact: 'Contact us',
  },

  ar: {
    // ── Navigation ──
    nav_home: 'الرئيسية',
    nav_artists: 'الفنانون',
    nav_about: 'حول',
    nav_exhibitions: 'المعارض',
    nav_visit: 'Lookbook',
    nav_gallery: 'المعرض',

    // ── Home Page ──
    home_eyebrow: 'معرض الفن المعاصر',
    home_title_1: 'أتيليه',
    home_title_2_dart: 'فنّ',
    home_title_2_ahlem: 'أحمد',
    home_subtitle:
      'تجربة غامرة حيث تتلاقى المادة والضوء والذاكرة للاحتفال بالفن المعاصر من العالم العربي.',
    home_cta_discover: 'اكتشف الفنانون',
    home_cta_enter: 'ادخل المعرض',
    home_scroll: 'تمرير',

    // ── Featured Section ──
    featured_eyebrow: 'المجموعة',
    featured_title: 'فنانون مميزون',
    featured_desc:
      'اكتشف الفنانين الذين يشكلون المشهد المعاصر من خلال الرسم والنحت والتركيب.',
    featured_see_gallery: 'عرض المعرض ←',
    featured_see_all: 'جميع الفنانين',

    // ── About Section ──
    about_eyebrow: 'حول',
    about_title: 'المعرض',
    about_p1:
      'أتيليه جاليري هو معرض مخصص للفن المعاصر من العالم العربي. نكشف الأصوات الإبداعية التي تحت Dialog between التقاليد القديمة والتعبير الحديث.',
    about_p2:
      'كل عمل هو دعوة للسفر — عبر المواد والأضواء والذكريات التي تشكل الهوية الفنية للمغرب العربي والشرق الأوسط.',
    about_stat_artists: 'فنانون',
    about_stat_works: 'أعمال',
    about_stat_cities: 'مدن',

    // ── Exhibitions Section ──
    expo_eyebrow: 'البرنامج',
    expo_title: 'المعارض',
    expo_now: 'حالية',
    expo_coming: 'قريباً',
    expo_1_title: 'المادة والذاكرة',
    expo_1_desc:
      'استكشاف حسي لملمس وأضواء المغرب العربي من خلال الرسم والنحت.',
    expo_1_artists: 'خالد الزباعي · مصطفى بوعزه',
    expo_2_title: 'أشكال هجينة',
    expo_2_desc:
      'منحوتات معاصرة بين العضوي والمعادن، صدى حوض البحر الأبيض المتوسط.',
    expo_2_artists: 'أميرة خليفي · ليلى زرهوني عمر بن علي',
    expo_3_title: 'ضوء غير مرئي',
    expo_3_desc:
      'تركيبات غامرة حيث يتراس الصوت والضوء والمكان لتحويل المعارض.',
    expo_3_artists: 'نادية خاتيب · يوسف المنصوري',

    // ── Newsletter ──
    newsletter_eyebrow: 'ابق على تواصل',
    newsletter_title: 'تلقى أخبارنا',
    newsletter_desc:
      'المعارض والأعمال الجديدة والفعاليات الحصرية — مباشرة في بريدك الإلكتروني.',
    newsletter_placeholder: 'بريدك@الإلكتروني.com',
    newsletter_aria: 'البريد الإلكتروني',
    newsletter_submit: 'اشترك',

    // ── Footer ──
    footer_tagline: 'معرض فن معاصر من العالم العربي.',
    footer_nav: 'التنقل',
    footer_contact: 'اتصل بنا',
    footer_address_1: 'باريس، فرنسا',
    footer_address_2: 'الجزائر العاصمة',
    footer_address_3: 'تونس، تونس',
    footer_follow: 'تابعنا',
    footer_copyright: '© 2026 أتيليه جاليري. جميع الحقوق محفوظة.',

    // ── Artists Page ──
    artists_title: 'الفنانون',
    artists_subtitle:
      'اكتشف الفنانين — مجموعة من الفنانين المعاصرين، بين المادة والضوء والذاكرة.',
    artists_aria: 'كاروسيل الفنانين',
    artists_prev: 'الفنان السابق',
    artists_next: 'الفنان التالي',
    artists_goto: 'الانتقال إلى الفنان',
    artists_infos: 'معلومات',
    artists_gallery: 'المعرض',

    // ── Artist Info Page ──
    artist_not_found: 'الفنان غير موجود',
    artist_back: 'العودة للفنانين',
    artist_back_short: 'رجوع',
    artist_works: 'الأعمال',
    artist_last_year: 'العام الماضي',
    artist_see_gallery: 'عرض المعرض ←',
    artist_selected_works: 'أعمال مختارة',

    // ── Gallery Controls ──
    gallery_back: 'العودة للفنانين',
    gallery_nav_aria: 'تنقل بين الأعمال',
    gallery_prev: 'العمل السابق',
    gallery_next: 'العمل التالي',

    // ── Loading ──
    loading: 'جاري التحميل',

    // ── WebGL Fallback ──
    fallback_prev: '→ السابق',
    fallback_next: 'التالي ←',

    // ── Artwork Info Panel ──
    panel_aria: 'معلومات العمل',
    panel_close: 'إغلاق لوحة المعلومات',
    panel_details: 'تفاصيل العمل',
    panel_artist: 'الفنان',
    panel_hint:
      'انتقل الإطار جانباً للكشف عن هذه المساحة — أغلقه لإعادته إلى المركز.',

    // ── Artist Card ──
    card_works: 'أعمال',

    // ── Artist Carousel 3D ──
    carousel3d_info: 'معلومات',
    carousel3d_drag: 'اسحب',

    // ── Discipline ──
    discipline_peinture: 'الرسم',
    discipline_sculpture: 'النحت',
    discipline_installation: 'التركيب',
    discipline_photographie: 'التصوير',

    // ── Country ──
    country_algerie: 'الجزائر',

    // ── About Page ──
    apropos_hero_eyebrow: 'قصتنا',
    apropos_hero_title: 'المعرض',
    apropos_hero_subtitle:
      'مساحة مخصصة للفن والإبداع والتعبير الفني.',
    apropos_mission_eyebrow: 'حول',
    apropos_mission_title: 'عن غاليري أحمد',
    apropos_mission_p1:
      'غاليري أحمد هو مساحة مخصصة للفن والإبداع والتعبير الفني. مهمتنا هي إبراز الفنانين الموهوبين وإنشاء لقاء بين أعمالهم وجمهور شغوف بالفن.',
    apropos_mission_p2:
      'من خلال مجموعة منتقاة بعناية من الأعمال المعاصرة والأصلية، تُحيي غاليري أحمد تنوع الأساليب والتقنيات والعوالم الفنية.',
    apropos_mission_p3:
      'نؤمن بأن كل عمل يروي قصة، وينقل مشاعر، ويقدم طريقة جديدة للنظر إلى العالم.',
    apropos_mission_bold: 'غاليري أحمد — مساحة حيث ي الحياة للفن.',
    apropos_values_eyebrow: 'قيمنا',
    apropos_values_title: 'ما يوجهنا',
    apropos_value_1_title: 'الأصالة',
    apropos_value_1_desc: 'يتم اختيار كل فنان لفريدية صوته وعمق ممارسته.',
    apropos_value_2_title: 'الحوار',
    apropos_value_2_desc: 'نبني جسوراً بين الثقافات والعصور والأوساط لإثراء الخطاب الفني.',
    apropos_value_3_title: 'التميز',
    apropos_value_3_desc: 'عناية دقيقة بالاختيار وعرض أنيق لإبراز كل عمل معروض.',
    apropos_stat_artists: 'فنانون',
    apropos_stat_works: 'أعمال',
    apropos_stat_cities: 'مدن',
    apropos_stat_exhibitions: 'معارض',
    apropos_cta_discover: 'اكتشف الفنانين',
    apropos_cta_contact: 'اتصل بنا',
  },
} as const;

export default translations;
