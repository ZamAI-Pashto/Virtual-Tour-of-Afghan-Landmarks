<<<<<<< HEAD
// Landmark data for Virtual Tour of Afghan Landmarks
(function () {
  const landmarks = [
    {
      id: 'band-e-amir',
      name: {
        en: 'Band-e-Amir National Park',
        fa: 'پارک ملی بند امیر',
        ps: 'د بند امیر ملي پارک'
      },
      city: {
        en: 'Bamyan Province',
        fa: 'ولایت بامیان',
        ps: 'د بامیانو ولایت'
      },
      coordinates: [34.8167, 67.2167],
      description: {
        en: 'Band-e-Amir National Park features six stunning deep blue lakes surrounded by natural dams in the Hindu Kush mountains. Afghanistan\'s first national park, known for its breathtaking natural beauty.',
        fa: 'پارک ملی بند امیر شامل شش دریاچه زیبای آبی عمیق است که توسط سدهای طبیعی در کوه‌های هندوکش احاطه شده‌اند. اولین پارک ملی افغانستان که به خاطر زیبایی طبیعی خیره‌کننده‌اش شناخته می‌شود.',
        ps: 'د بند امیر ملي پارک شپږ په زړه پورې ژور آبي جهيلونه لري چې د هندوکش غرونو کې د طبيعي بندونو لخوا محاط دي. د افغانستان لومړی ملي پارک چې د خپل حیرانوونکي طبيعي ښکلا لپاره پیژندل کیږي.'
      },
      category: 'nature',
      image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1cdc?w=400&h=300&fit=crop'
    },
    {
      id: 'minaret-jam',
      name: {
        en: 'Minaret of Jam',
        fa: 'مناره جام',
        ps: 'د جام مناره'
      },
      city: {
        en: 'Ghor Province',
        fa: 'ولایت غور',
        ps: 'د غور ولایت'
      },
      coordinates: [34.3969, 64.5164],
      description: {
        en: 'The Minaret of Jam is a 65-meter tall brick tower dating from the 12th century, a UNESCO World Heritage Site representing the artistic and architectural achievements of the Ghurid dynasty.',
        fa: 'مناره جام برجی از آجر به ارتفاع ۶۵ متر از قرن دوازدهم است، یک میراث جهانی یونسکو که نشان‌دهنده دستاوردهای هنری و معماری سلسله غوریان است.',
        ps: 'د جام مناره د ۶۵ متره لوړوالي د خښتو برج دی چې د ۱۲ پیړۍ څخه دی، د یونسکو د نړیوال میراث ځای چې د غوري کورنۍ د هنري او معمارۍ لاسته راوړنې استازیتوب کوي.'
      },
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1571071718216-3d2b9d2a0e0b?w=400&h=300&fit=crop'
    },
    {
      id: 'babur-gardens',
      name: {
        en: 'Babur Gardens',
        fa: 'باغ بابر',
        ps: 'د بابر باغونه'
      },
      city: {
        en: 'Kabul',
        fa: 'کابل',
        ps: 'کابل'
      },
      coordinates: [34.5155, 69.1952],
      description: {
        en: 'Historical gardens in Kabul built by the Mughal emperor Babur in the early 16th century. The gardens contain Babur\'s tomb and represent a perfect example of Mughal landscape architecture.',
        fa: 'باغ‌های تاریخی در کابل که توسط شاه مغول بابر در اوایل قرن شانزدهم ساخته شد. این باغ‌ها حاوی مقبره بابر است و نمونه‌ای کامل از معماری منظر مغولی را نشان می‌دهد.',
        ps: 'په کابل کې تاریخي باغونه چې د شپاړسمې پیړۍ په پیل کې د مغولي امپراتور بابر لخوا جوړ شوي. دا باغونه د بابر مقبره لري او د مغولي منظرې معمارۍ بشپړ بیلګه استازیتوب کوي.'
      },
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1534050359320-02900022671e?w=400&h=300&fit=crop'
    },
    {
      id: 'herat-citadel',
      name: {
        en: 'Herat Citadel',
        fa: 'ارگ هرات',
        ps: 'د هرات کلا'
      },
      city: {
        en: 'Herat',
        fa: 'هرات',
        ps: 'هرات'
      },
      coordinates: [34.3487, 62.1997],
      description: {
        en: 'Also known as the Citadel of Alexander, this ancient fortress has served as a military base for over 2,500 years. It represents the rich history of Herat and the Silk Road trade routes.',
        fa: 'همچنین به نام ارگ اسکندر شناخته می‌شود، این قلعه باستانی بیش از ۲۵۰۰ سال به عنوان پایگاه نظامی خدمت کرده است. نشان‌دهنده تاریخ غنی هرات و مسیرهای تجاری جاده ابریشم است.',
        ps: 'د سکندر د کلا په نوم هم پیژندل کیږي، دا پخوانۍ کلا د ۲۵۰۰ کلونو څخه زیات د نظامي اډې په توګه دنده ترسره کړې. دا د هرات بډایه تاریخ او د وریښمو د سړک د سوداګرۍ لارو استازیتوب کوي.'
      },
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1564465732175-0ab53ad2f38c?w=400&h=300&fit=crop'
    },
    {
      id: 'blue-mosque',
      name: {
        en: 'Blue Mosque of Mazar-i-Sharif',
        fa: 'مسجد آبی مزار شریف',
        ps: 'د مزار شریف آبي جومات'
      },
      city: {
        en: 'Mazar-i-Sharif',
        fa: 'مزار شریف',
        ps: 'مزار شریف'
      },
      coordinates: [36.7081, 67.1109],
      description: {
        en: 'The stunning Blue Mosque, also known as the Shrine of Ali, is believed by many to house the tomb of Ali ibn Abi Talib. Famous for its brilliant blue tiles and spiritual significance.',
        fa: 'مسجد آبی خیره‌کننده که به مزار علی نیز معروف است، توسط بسیاری باور می‌شود که مقبره علی ابن ابی طالب را در خود جای داده است. به خاطر کاشی‌های آبی درخشان و اهمیت معنوی معروف است.',
        ps: 'حیرانوونکې آبي جومات چې د علي زیارت په نوم هم پیژندل کیږي، ډیری پدې باور لري چې د علي ابن ابي طالب مقبره پکې ده. د خپلو ښکلو آبو ټایلونو او روحاني اهمیت لپاره مشهوره ده.'
      },
      category: 'religious',
      image: 'https://images.unsplash.com/photo-1564465775880-91b7c956b7e4?w=400&h=300&fit=crop'
    },
    {
      id: 'bala-hissar',
      name: {
        en: 'Bala Hissar Fortress',
        fa: 'قلعه بالاحصار',
        ps: 'د بالا حصار کلا'
      },
      city: {
        en: 'Kabul',
        fa: 'کابل',
        ps: 'کابل'
      },
      coordinates: [34.5075, 69.1885],
      description: {
        en: 'Ancient fortress overlooking Kabul, dating back over 1,500 years. It has served as the royal residence and administrative center throughout Afghanistan\'s history.',
        fa: 'قلعه باستانی که بر کابل نظارت دارد و قدمتی بیش از ۱۵۰۰ سال دارد. در طول تاریخ افغانستان به عنوان اقامتگاه شاهی و مرکز اداری خدمت کرده است.',
        ps: 'پخوانۍ کلا چې په کابل باندې څارنه کوي، د ۱۵۰۰ کلونو څخه زیات زړه لري. د افغانستان د تاریخ په اوږدو کې د شاهي استوګنځي او اداري مرکز په توګه دنده ترسره کړې.'
      },
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    },
    {
      id: 'panjshir-valley',
      name: {
        en: 'Panjshir Valley',
        fa: 'دره پنجشیر',
        ps: 'د پنجشیر دره'
      },
      city: {
        en: 'Panjshir Province',
        fa: 'ولایت پنجشیر',
        ps: 'د پنجشیر ولایت'
      },
      coordinates: [35.3556, 69.4139],
      description: {
        en: 'The "Valley of Five Lions" is renowned for its dramatic mountain scenery, emerald mines, and resistance history. One of Afghanistan\'s most beautiful and strategically important valleys.',
        fa: 'دره "پنج شیر" به خاطر مناظر دراماتیک کوهستانی، معادن زمرد و تاریخ مقاومت مشهور است. یکی از زیباترین و از نظر استراتژیک مهم‌ترین دره‌های افغانستان.',
        ps: 'د "پنځو زمریانو دره" د خپل دراماتیک غرني منظرو، د زمردو د کانونو، او د مقاومت د تاریخ لپاره مشهوره ده. د افغانستان یوه له ښکلو او له ستراتیژیک پلوه مهمو درو څخه.'
      },
      category: 'nature',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      id: 'darul-aman',
      name: {
        en: 'Darul Aman Palace',
        fa: 'کاخ دارالامان',
        ps: 'د دارالامان ماڼۍ'
      },
      city: {
        en: 'Kabul',
        fa: 'کابل',
        ps: 'کابل'
      },
      coordinates: [34.4847, 69.1361],
      description: {
        en: 'European-style palace built in the 1920s by King Amanullah Khan as part of his modernization efforts. Though damaged by conflicts, it remains a symbol of Afghanistan\'s architectural heritage.',
        fa: 'کاخ به سبک اروپایی که در دهه ۱۹۲۰ توسط پادشاه امان‌الله خان به عنوان بخشی از تلاش‌های مدرنیزاسیون او ساخته شد. علی‌رغم آسیب‌هایی که از درگیری‌ها دیده، همچنان نمادی از میراث معماری افغانستان است.',
        ps: 'د اروپایي ډول ماڼۍ چې په ۱۹۲۰ لسیزه کې د پاچا امان الله خان لخوا د هغه د عصري کولو هڅو د یوې برخې په توګه جوړه شوه. که څه هم د جګړو له امله زیانمن شوې، مګر لاهم د افغانستان د معمارۍ میراث سمبول دی.'
      },
      category: 'historical',
      image: 'https://images.unsplash.com/photo-1566552781854-485a7f7ad911?w=400&h=300&fit=crop'
    }
  ];

  // Make landmarks data globally available
  window.LANDMARKS_DATA = {
    landmarks,
    getById: (id) => landmarks.find(landmark => landmark.id === id),
    getByCategory: (category) => landmarks.filter(landmark => landmark.category === category),
    getAll: () => [...landmarks],
    search: (query, locale = 'en') => {
      const searchTerm = query.toLowerCase().trim();
      if (!searchTerm) return landmarks;
      
      return landmarks.filter(landmark => 
        landmark.name[locale].toLowerCase().includes(searchTerm) ||
        landmark.city[locale].toLowerCase().includes(searchTerm) ||
        landmark.description[locale].toLowerCase().includes(searchTerm) ||
        landmark.category.toLowerCase().includes(searchTerm)
      );
    }
  };
})();
=======
(function () {
  const DATA_URL = './data/landmarks.json';

  const state = {
    landmarks: [],
    index: new Map(), // id -> record
  };

  async function load() {
    if (state.landmarks.length) return state.landmarks;
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error('Failed to load landmarks');
    const json = await res.json();
    state.landmarks = json;
    state.index = new Map(json.map((x) => [x.id, x]));
    return json;
  }

  function all() { return state.landmarks; }
  function getById(id) { return state.index.get(id); }
  function search(query, locale = 'en') {
    const q = (query || '').trim().toLowerCase();
    if (!q) return state.landmarks;
    return state.landmarks.filter((l) => {
      const title = l.title?.[locale] || l.title?.en || '';
      const city = l.city?.[locale] || l.city?.en || '';
      const desc = l.description?.[locale] || l.description?.en || '';
      return (
        title.toLowerCase().includes(q) ||
        city.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q)
      );
    });
  }

  window.Data = { load, all, getById, search };
})();
>>>>>>> 55c521f (Add README and implement core functionality for multilingual virtual tour app)
