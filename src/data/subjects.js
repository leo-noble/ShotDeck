/* ============================================================
   SUBJECTS — single source of truth for the whole site.
   Edit chapters here; `npm run gen` regenerates every page.
   ============================================================ */

export const SUBJECTS = [
  {
    key: 'physics',
    name: 'Physics',
    bengali: 'পদার্থবিজ্ঞান',
    color: '#0d9488',
    soon: false,
    channel: 'ACS Future School',
    batch: 'SSC',
    type: 'One-Shot Class',
    playlist: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3',
    icon: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>',
    chapters: [
      { n: 1, title: 'ভৌত রাশি ও পরিমাপ', desc: 'মৌলিক ও লব্ধ রাশি, পরিমাপের এককের আন্তর্জাতিক পদ্ধতি (SI), পরিমাপে ত্রুটি ও বৈজ্ঞানিক স্বরলিপি।', video: 'D9GkI9EmJ5o', list: null },
      { n: 2, title: 'গতি', desc: 'স্থিতি ও গতি, দূরত্ব ও সরণ, দ্রুতি ও বেগ, ত্বরণ, গতির সমীকরণ ও গতি-সময় লেখচিত্র বিশ্লেষণ।', video: 'FHDmarOslJA', list: 'PLsRCKEpC3AenXTT5OIV5Dq1svplFWI_Q0' },
      { n: 3, title: 'বল', desc: 'নিউটনের গতিসূত্র তিনটি, জড়তা, ভরবেগ, মহাকর্ষ সূত্র, অভিকর্ষ, মুক্তপতন ও g-এর মান।', video: 'blsFbPgZ8JM', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 4, title: 'কাজ, শক্তি ও ক্ষমতা', desc: 'কাজের সংজ্ঞা ও সূত্র, গতিশক্তি ও বিভবশক্তি, শক্তির সংরক্ষণ নীতি, ক্ষমতা ও কর্মদক্ষতা।', video: 'SIwqGfdWWpM', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 5, title: 'পদার্থের অবস্থা ও চাপ', desc: 'পদার্থের তিন অবস্থা, স্থিতিস্থাপকতা, চাপের সংজ্ঞা, বায়ুমণ্ডলীয় চাপ, আর্কিমিডিসের নীতি ও প্লবতা।', video: 'BjvPa9JusV4', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 7, title: 'তরঙ্গ ও শব্দ', desc: 'তরঙ্গের প্রকারভেদ, কম্পাঙ্ক, বিস্তার ও তরঙ্গদৈর্ঘ্য, শব্দের প্রকৃতি, শব্দের বেগ ও প্রতিধ্বনি।', video: 'IFC9KEYCdbE', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 8, title: 'আলোর প্রতিফলন', desc: 'প্রতিফলনের সূত্র, সমতল ও গোলীয় দর্পণ, প্রতিবিম্বের প্রকৃতি, দর্পণ সমীকরণ ও আবর্ধন।', video: 'tyiaB96lgOE', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 9, title: 'আলোর প্রতিসরণ', desc: 'স্নেলের সূত্র, প্রতিসরাঙ্ক, পূর্ণ অভ্যন্তরীণ প্রতিফলন, লেন্সের প্রকারভেদ, লেন্স সমীকরণ ও আলোর বিচ্ছুরণ।', video: 'p8pAlMbZ5bc', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 10, title: 'স্থির তড়িৎ', desc: 'আধানের ধর্ম, কুলম্বের সূত্র, তড়িৎক্ষেত্র ও বিভব, ধারক ও বৈদ্যুতিক শক্তি সঞ্চয়।', video: 'bIZiYkNPKsw', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 12, title: 'বিদ্যুতের চৌম্বক ক্রিয়া', desc: 'চৌম্বকক্ষেত্র, তড়িৎবাহী তারে বল, গ্যালভানোমিটার, তড়িৎচুম্বকীয় আবেশ ও ট্রান্সফর্মার।', video: '8eylhscdWUw', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
      { n: 13, title: 'আধুনিক পদার্থবিজ্ঞান ও ইলেকট্রনিকস', desc: 'তেজস্ক্রিয়তা, নিউক্লিয় বিভাজন ও সংযোজন, অর্ধপরিবাহী, ডায়োড, ট্রানজিস্টার ও লজিক গেট।', video: 'aNzxFObO7oc', list: 'PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3' },
    ],
  },
  {
    key: 'chemistry',
    name: 'Chemistry',
    bengali: 'রসায়ন',
    color: '#059669',
    soon: false,
    channel: 'ACS Future School',
    batch: 'SSC',
    type: 'One-Shot Class',
    playlist: 'PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL',
    icon: '<path d="M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.07-10.12a2 2 0 0 1-.21-.9V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
    chapters: [
      { n: 1, title: 'রসায়নের ধারণা', desc: 'রসায়ন কী, বিজ্ঞান হিসেবে এর পরিধি, পদার্থ ও শক্তি, ভৌত ও রাসায়নিক পরিবর্তন, রসায়নের শাখা ও দৈনন্দিন জীবনে এর গুরুত্ব।', video: 'rI47tJ5osIM', list: 'PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL' },
      { n: 2, title: 'পদার্থের অবস্থা', desc: 'পদার্থের তিন অবস্থা — কঠিন, তরল ও বায়বীয়; অণুর গতি, গলনাঙ্ক ও স্ফুটনাঙ্ক, তরলের বাষ্পচাপ ও বিশেষ পরিবর্তন।', video: 'VZj8vI5iL6c', list: 'PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL' },
      { n: 3, title: 'পদার্থের গঠন', desc: 'পরমাণুর গঠন, মৌলিক কণা, বোর মডেল, পরমাণুর ইলেকট্রন বিন্যাস, আইসোটোপ ও পর্যায় সারণিতে স্থান।', video: 'IFWwApq7jyY', list: 'PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL' },
      { n: 4, title: 'পর্যায় সারণি', desc: 'পর্যায় সারণির সংজ্ঞা ও ইতিহাস, পর্যায় ও শ্রেণি, মৌলের শ্রেণিবিন্যাস, পর্যায়ভিত্তিক ধর্মের পরিবর্তন ও মৌলের প্রকারভেদ।', video: 'DdlPMYl91zA', list: null },
      { n: 5, title: 'রাসায়নিক বন্ধন', desc: 'যোজ্যতা ইলেকট্রন, আয়নীয় বন্ধন, সমযোজী বন্ধন, ধাতব বন্ধন, লুইস কাঠামো ও অণুর আকৃতি নির্ধারণ।', video: 'rXk4mB209gQ', list: null },
      { n: 6, title: 'এসিড, ক্ষারক ও লবণের ধারণা', desc: 'এসিড ও ক্ষারকের সংজ্ঞা ও ধর্ম, প্রশমন বিক্রিয়া, লবণের প্রকারভেদ, পি.এইচ মাপ ও দৈনন্দিন জীবনে এসিড-ক্ষারকের ব্যবহার।', video: '7-dlVI27jP0', list: 'PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL' },
      { n: 7, title: 'রাসায়নিক বিক্রিয়া', desc: 'রাসায়নিক বিক্রিয়ার সংজ্ঞা ও শ্রেণিবিন্যাস, যোজনী, প্রতিস্থাপন ও জারণ-বিজারণ বিক্রিয়া, সমীকরণ সমতা ও বিক্রিয়ার হার।', video: 'DG7W26oENN8', list: null },
      { n: 8, title: 'রসায়ন ও শক্তি', desc: 'রাসায়নিক বিক্রিয়ায় শক্তির পরিবর্তন, তাপ শোষণ ও নির্গমন বিক্রিয়া, জ্বালানি, দহন ও শক্তির সংরক্ষণ।', video: 'p2RLAOwuIBo', list: null },
      { n: 9, title: 'এসিড-ক্ষারক সমতা', desc: 'এসিড-ক্ষারক সমতা, প্রশমন বিক্রিয়ার পরিমাণগত বিশ্লেষণ, মোলারিটি ও সূচকের সাহায্যে সমতা বিন্দু নির্ণয়।', video: 'FlsJiOoV73M', list: null },
      { n: 10, title: 'খনিজ সম্পদ: ধাতু-অধাতু', desc: 'ধাতু ও অধাতুর ধর্ম, খনিজ ও আকরিক, ধাতু নিষ্কাশন, লোহা, তামা ও অ্যালুমিনিয়ামের ব্যবহার।', video: 'EQmgoIS6SJo', list: null },
      { n: 11, title: 'খনিজ সম্পদ: জীবাশ্ম', desc: 'জীবাশ্ম জ্বালানি — প্রাকৃতিক গ্যাস, পেট্রোলিয়াম ও কয়লা, এর সৃষ্টি, শোধন প্রক্রিয়া ও পরিবেশগত প্রভাব।', video: 'vfkHr9LGqJ4', list: 'PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL' },
    ],
  },
  {
    key: 'biology',
    name: 'Biology',
    bengali: 'জীববিজ্ঞান',
    color: '#d97706',
    soon: false,
    channel: 'ACS Future School',
    batch: 'SSC',
    type: 'One-Shot Class',
    playlist: null,
    icon: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    chapters: [
      { n: 1, title: 'ল্যাবরেটরি', desc: 'অণুবীক্ষণ যন্ত্রের ব্যবহার, স্লাইড তৈরি, ল্যাবরেটরির প্রধান সরঞ্জাম ও নিরাপদ কাজের পদ্ধতি।', classes: [
        { video: 'nbluTcJsh1o', list: 'PLsRCKEpC3AenlUtt29YnCud7j0yQdFCs4', label: 'ক্লাস ১' },
        { video: 'IzkzhfxNaZI', list: 'PLsRCKEpC3AenlUtt29YnCud7j0yQdFCs4', label: 'ক্লাস ২' },
      ] },
      { n: 2, title: 'কোষ ও এর গঠন', desc: 'প্রোক্যারিওটিক ও ইউক্যারিওটিক কোষ, কোষ ঝিল্লি, প্রোটোপ্লাজম ও প্রধান অঙ্গাণুসমূহের গঠন ও কাজ।', classes: [
        { video: 'v1gDcZg5FCk', list: 'PLsRCKEpC3AenlUtt29YnCud7j0yQdFCs4', label: 'ক্লাস ১' },
        { video: 'Cfm7ytqhhk4', list: 'PLsRCKEpC3AenlUtt29YnCud7j0yQdFCs4', label: 'ক্লাস ২' },
      ] },
      { n: 3, title: 'কোষ বিভাজন', desc: 'কোষচক্র, মাইটোসিস ও মায়োসিস কোষ বিভাজন, ক্রোমোসোম ও বংশগতির মৌলিক ধারণা।', classes: [
        { video: 'Bkr3eoohz4g', list: 'PLsRCKEpC3AenlUtt29YnCud7j0yQdFCs4', label: 'ক্লাস ১' },
        { video: 'I_3qDJWZxuo', list: null, label: 'ক্লাস ২' },
      ] },
      { n: 4, title: 'প্রাণীর শ্রেণিবিন্যাস', desc: 'জীবজগতের শ্রেণিবিন্যাসের ধারণা, পাঁচ রাজ্য শ্রেণিবিন্যাস পদ্ধতি ও জীবের বিভিন্ন গোষ্ঠী।', classes: [
        { video: 'aEx4tHTGuSk', list: null, label: 'ক্লাস ১' },
        { video: 'kwMo8-8YfCk', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW', label: 'ক্লাস ২' },
      ] },
      { n: 5, title: 'টিস্যু ও টিস্যুতন্ত্র', desc: 'উদ্ভিদ ও প্রাণীদেহের টিস্যুর প্রকারভেদ, গঠন, কাজ ও টিস্যুতন্ত্রের সামগ্রিক ধারণা।', video: 'H42pxKhjSFk', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW' },
      { n: 6, title: 'প্রাণীর বিভিন্ন তন্ত্রের গঠন ও কাজ', desc: 'প্রাণীদেহের প্রধান তন্ত্রসমূহের গঠন, কাজ ও তাদের পারস্পরিক সম্পর্ক।', video: 'BCd0-8NeWNI', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW' },
      { n: 7, title: 'উদ্ভিদের বহিরাঙ্গ গঠন ও কাজ', desc: 'সপুষ্পক উদ্ভিদের মূল, কাণ্ড, পত্র, পুষ্প ও ফলের বহিরাঙ্গ গঠন ও কাজ।', video: 'zj8n5vyHPbE', list: null },
      { n: 8, title: 'উদ্ভিদের অন্তরাঙ্গ গঠন ও কাজ', desc: 'উদ্ভিদের অন্তরাঙ্গ কলাসমূহের গঠন, পরিবহন তন্ত্র ও শ্বসন-সালোকসংশ্লেষণ প্রক্রিয়া।', video: 'Z5b-8vJ3gOE', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW' },
      { n: 11, title: 'বংশগতি ও বিবর্তন', desc: 'ডিএনএ, জিন, মেন্ডেলের সূত্র, যৌন জনন ও বিবর্তন তত্ত্বের মৌলিক ধারণা।', video: 'E2pi1AmJDDU', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW' },
      { n: 12, title: 'প্রাণীর জনন', desc: 'অঙ্গীয় ও অঙ্গীয়বিহীন জনন, মানব জননতন্ত্র, ভ্রূণ গঠন ও জন্ম প্রক্রিয়া।', classes: [
        { video: 'K215ijslzIg', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW', label: 'ক্লাস ১' },
        { video: 'qfd1_P_h-NU', list: null, label: 'ক্লাস ২' },
      ] },
      { n: 13, title: 'জীবপ্রযুক্তি', desc: 'জিনগত প্রকৌশল, প্লাজমিড, বায়োরিয়েক্টর ও জীবপ্রযুক্তির ব্যবহার ও নৈতিকতা।', video: 'nKrfVAnSP_0', list: 'PLsmWY_iJRQwyuq_LTmBAfYKW8l_MOrEiS' },
      { n: 14, title: 'রোগ প্রতিরোধ ব্যবস্থা', desc: 'মানবদেহে রোগ প্রতিরোধ ব্যবস্থা, অ্যান্টিবডি, টিকা ও প্রতিরোধ ক্ষমতার ধারণা।', video: '0UJe2X-iMPo', list: 'PLsRCKEpC3AekArP0cs7Z5wvfCzD5GRJkW' },
    ],
  },
  {
    key: 'math',
    name: 'General Math',
    bengali: 'সাধারণ গণিত',
    color: '#4f46e5',
    soon: false,
    channel: 'ACS Future School',
    batch: 'SSC',
    type: 'One-Shot Class',
    playlist: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR',
    icon: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    chapters: [
      { n: 1, title: 'বাস্তব সংখ্যা (Real Numbers)', desc: 'বাস্তব সংখ্যার ধারণা, পূর্ণ সংখ্যা ও মূলদ সংখ্যা, সংখ্যারেখা ও বাস্তব সংখ্যার শ্রেণিবিন্যাস।', video: '92AoXvTET6w', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 2, title: 'সেট ও ফাংশন (Set & Function)', desc: 'সেটের ধারণা, সেট প্রকাশের পদ্ধতি, উপসেট, সেটের সংযোগ ও ছেদ, ফাংশনের মৌলিক ধারণা ও ডোমেন-রেঞ্জ।', video: 'nfwZ7derrr4', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR', practice: { video: 'p3rlI9wYGuI', label: 'Practice (CQ/MCQ/SQ)' } },
      { n: 3, title: 'বীজগাণিতিক রাশি (Algebraic Expressions)', desc: 'বীজগাণিতিক রাশির প্রকারভেদ, যোগ-বিয়োগ-গুণ-ভাগ, উৎপাদক বিশ্লেষণ ও অভেদ।', video: 'HutjzjTsoR0', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR', practice: { video: 'hRFKZSVUeKc', label: 'Practice (CQ/MCQ/SQ)' } },
      { n: 4, title: 'সূচক ও লগারিদম (Exponents & Logarithms)', desc: 'সূচকের সূত্র, ঋণাত্মক ও ভগ্নাংশ সূচক, লগারিদমের ধারণা ও লগারিদমের সূত্রসমূহের প্রয়োগ।', video: 'SOcMESM_5Oo', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 5, title: 'এক চলকবিশিষ্ট সমীকরণ (Equations)', desc: 'এক চলকবিশিষ্ট সরল ও দ্বিঘাত সমীকরণ, সমীকরণ সমাধানের পদ্ধতি ও বাস্তব সমস্যার গাণিতিক সমাধান।', video: 'Hz3RlXkdgEg', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 6, title: 'সম্পাদ্য (Practical Geometry)', desc: 'জ্যামিতিক সম্পাদ্য — ত্রিভুজ ও চতুর্ভুজ অঙ্কন, কোণ সমদ্বিখণ্ডক ও বিভিন্ন সম্পাদ্য নির্মাণের প্রক্রিয়া।', video: 'i9SYp_WDitU', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 7, title: 'বৃত্ত (Circle)', desc: 'বৃত্তের ধারণা, কেন্দ্র, ব্যাসার্ধ, জ্যা ও বিপণ্য, বৃত্তের স্পর্শক ও বৃত্তীয় উপপাদ্য।', video: 'gmOaOIMcvUo', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 8, title: 'ত্রিকোণমিতি (Trigonometry)', desc: 'ত্রিকোণমিতিক অনুপাত, মান নির্ণয়, ত্রিকোণমিতিক অভেদ ও সূত্রসমূহের প্রয়োগ।', video: 'bF_UbL4HU2M', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR', practice: { video: 'eEb5WYjmAr4', label: 'Practice (CQ/MCQ/SQ)' } },
      { n: 9, title: 'দূরত্ব ও উচ্চতা (Distance & Elevation)', desc: 'উচ্চতা ও দূরত্ব নির্ণয়ে ত্রিকোণমিতির প্রয়োগ, কোণের মান ও বাস্তব জ্যামিতিক সমস্যা সমাধান।', video: 'bchlwIwsrY4', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 10, title: 'বীজগাণিতিক অনুপাত ও সমানুপাত', desc: 'অনুপাত ও সমানুপাতের ধারণা, বীজগাণিতিক অনুপাতের সূত্র ও বাস্তব সমস্যায় প্রয়োগ।', video: 'M7D6xQv3Wsg', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 11, title: 'দুই চলকবিশিষ্ট সরলরেখা (Calculator Hacks)', desc: 'দুই চলকবিশিষ্ট রৈখিক সমীকরণ ও সরলরেখা, ঢাল, ছেদক ও ক্যালকুলেটর হ্যাক্স সহ দ্রুত সমাধান।', video: 'p9aKNFd4GlE', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 12, title: 'সসীম ধারা (Finite Series)', desc: 'সসীম সমান্তর ও সমগু ধারা, পদ ও সমষ্টি নির্ণয়ের সূত্র ও প্রয়োগ।', video: 'sBvAE8XLKDY', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 13, title: 'ক্ষেত্রফল সংক্রান্ত উপপাদ্য (Theorems on Area)', desc: 'ত্রিভুজ ও চতুর্ভুজের ক্ষেত্রফল সংক্রান্ত উপপাদ্য ও তাদের প্রমাণ ও প্রয়োগ।', video: 'e8EN7OO8tNU', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
      { n: 14, title: 'পরিমিতি (Mensuration)', desc: 'ত্রিভুজ, চতুর্ভুজ ও বৃত্তের ক্ষেত্রফল, ঘনবস্তুর ক্ষেত্রফল ও আয়তন নির্ণয়।', video: 'ftoQ3-KmUaA', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR', practice: { video: 'NkgLHKRmaYM', label: 'Practice (CQ/MCQ/SQ)' } },
      { n: 15, title: 'পরিসংখ্যান (Statistics)', desc: 'পরিসংখ্যানের ধারণা, গড়, মধ্যমা, প্রচুরক ও তথ্যের লেখচিত্র বিশ্লেষণ।', video: 'SfPmd0Melz8', list: 'PLsmWY_iJRQwy1DrPA5zTNzRoYIaYLngcR' },
    ],
  },
  {
    key: 'ict',
    name: 'ICT',
    bengali: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    color: '#0891b2',
    soon: false,
    channel: 'ACS Future School',
    batch: 'SSC',
    type: 'One-Shot Class',
    playlist: null,
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    chapters: [
      { n: 1, title: 'তথ্য ও যোগাযোগ প্রযুক্তি ও আমাদের বাংলাদেশ', desc: 'তথ্য ও যোগাযোগ প্রযুক্তির ধারণা, প্রযুক্তির যুগান্তকারী পরিবর্তন, বাংলাদেশে আইসিটির বিকাশ ও MCQ + SQ প্রস্তুতি।', video: 'MAXG8jLResU', list: 'PLsRCKEpC3Aem40bZ6VQe-WgPBbeZLL4Nb' },
      { n: 2, title: 'কমিউনিকেশন সিস্টেম ও নেটওয়ার্কিং', desc: 'যোগাযোগ ব্যবস্থা, নেটওয়ার্ক টপোলজি, ট্রান্সমিশন মিডিয়া ও বেতার যোগাযোগ প্রযুক্তির ধারণা।', video: 'ZMSg0jRH7vM', list: 'PLsmWY_iJRQwwcdPUSv28W68SVFmjKZUYf' },
      { n: 3, title: 'ইন্টারনেট ও ওয়েব পরিচিতি', desc: 'ইন্টারনেটের ধারণা, আইপি ঠিকানা, ওয়েব ব্রাউজার, সার্চ ইঞ্জিন ও ই-কমার্স সহ ওয়েব প্রযুক্তি পরিচিতি।', video: '_QsBt-QnrrA', list: 'PLsRCKEpC3Aem40bZ6VQe-WgPBbeZLL4Nb' },
      { n: 4, title: 'কম্পিউটার হার্ডওয়্যার ও সফটওয়্যার', desc: 'কম্পিউটারের মূল উপাদান, ইনপুট-আউটপুট ডিভাইস, সিস্টেম ও অ্যাপ্লিকেশন সফটওয়্যারের ধারণা।', video: 'kL9GJNwuhDg', list: 'PLsmWY_iJRQwwcdPUSv28W68SVFmjKZUYf' },
      { n: 5, title: 'মাল্টিমিডিয়া ও গ্রাফিক্স', desc: 'মাল্টিমিডিয়ার উপাদান, গ্রাফিক্স ডিজাইন, ছবি ও অডিও-ভিডিও এডিটিং প্রযুক্তির ব্যবহার।', video: 'IkTa4ZjKApg', list: 'PLsmWY_iJRQwwcdPUSv28W68SVFmjKZUYf' },
      { n: 6, title: 'ওয়েব ডিজাইন ও HTML', desc: 'HTML এর ধারণা, ট্যাগ, ওয়েব পেজ তৈরি ও প্রাথমিক ওয়েব ডিজাইন প্রক্রিয়া।', video: '-FXjmwMWLw0', list: 'PLsmWY_iJRQwwcdPUSv28W68SVFmjKZUYf' },
    ],
  },
  {
    key: 'hmath',
    name: 'Higher Math',
    bengali: 'উচ্চতর গণিত',
    color: '#7c3aed',
    soon: false,
    channel: 'ACS Future School',
    batch: 'SSC',
    type: 'One-Shot Class',
    icon: '<path d="M3 12h4l3-9 4 18 3-9h4"/>',
    chapters: [
      { n: 1, title: 'সেট ও ফাংশন', desc: 'সেটের ধারণা, সেট প্রকাশের পদ্ধতি, সেটের সংযোগ ও ছেদ, ফাংশনের গ্রাফ ও ডোমেন-রেঞ্জ।', classes: [
        { video: 'ZpzXxZrX92Y', list: null, label: 'ক্লাস ১' },
        { video: 'NKVk_xBJSus', list: 'PLsRCKEpC3AekQGhUXlow2yyVYhEOijeAY', label: 'ক্লাস ২' },
        { video: 'c5tFijdDXP4', list: 'PLsRCKEpC3AekQGhUXlow2yyVYhEOijeAY', label: 'ক্লাস ৩' },
      ] },
      { n: 2, title: 'বীজগাণিতিক রাশির গুণ ও ভাগ', desc: 'বীজগাণিতিক রাশির গুণ, ভাগ, ভাগশেষ উপপাদ্য ও অনুশীলনী সমাধান।', classes: [
        { video: 'ERVCTT0vYb4', list: null, label: 'ক্লাস ১' },
        { video: 'EluLvCOrAOU', list: null, label: 'ক্লাস ২' },
      ], practice: { video: 'Hd7Qc-JOsnA', label: 'Practice' } },
      { n: 3, title: 'জ্যামিতি', desc: 'ত্রিভুজের সর্বসমতা, অনুরূপ ত্রিভুজ ও জ্যামিতিক উপপাদ্য ও প্রমাণ।', video: 'oxHvIqlpeEk', list: null },
      { n: 4, title: 'ত্রিকোণমিতিক অনুপাত', desc: 'ত্রিকোণমিতিক অনুপাত, অভেদ ও সূত্রসমূহের প্রয়োগ ও মান নির্ণয়।', video: 'tIuTXBpIV1E', list: null },
      { n: 5, title: 'সমতলীয় ভেক্টর', desc: 'ভেক্টরের ধারণা, যোগ ও বিয়োগ, ভেক্টরের উপাংশ, স্কেলার গুণ ও প্রয়োগ।', classes: [
        { video: 'pOim5St-u54', list: null, label: 'ক্লাস ১' },
        { video: 'kfjXrH78CgI', list: null, label: 'ক্লাস ২' },
      ] },
      { n: 6, title: 'সরলরেখার ঢাল ও সমীকরণ', desc: 'সরলরেখার ঢাল, বিভিন্ন আকারের সমীকরণ, দুই সরলরেখার ছেদক কোণ ও দূরত্ব।', classes: [
        { video: 'Y2MTUCLtyz8', list: null, label: 'ক্লাস ১' },
        { video: 'JH-v9_fdZbo', list: null, label: 'ক্লাস ২' },
        { video: 'dme6hVofi_w', list: null, label: 'ক্লাস ৩' },
        { video: 'oGQB13M_oWE', list: null, label: 'ক্লাস ৪' },
      ] },
      { n: 7, title: 'বৃত্ত', desc: 'বৃত্তের সমীকরণ, কেন্দ্র ও ব্যাসার্ধ, স্পর্শক ও বৃত্তীয় সমস্যা সমাধান।', classes: [
        { video: 'qIDiqdwCHNA', list: null, label: 'ক্লাস ১' },
        { video: 'Bw2fC_zORmg', list: null, label: 'ক্লাস ২' },
        { video: 'fbDG-0wq80U', list: null, label: 'ক্লাস ৩' },
        { video: 'JICgh1dm1Xo', list: null, label: 'ক্লাস ৪' },
      ] },
      { n: 8, title: 'পরিমিতি', desc: 'বিভিন্ন ঘনবস্তুর ক্ষেত্রফল ও আয়তন, গোলক, শঙ্কু ও সিলিন্ডারের পরিমিতি।', classes: [
        { video: 'r2YiKLSxiQ0', list: null, label: 'ক্লাস ১' },
        { video: '5CfUT4V0baE', list: null, label: 'ক্লাস ২' },
        { video: '30RKJelvEKs', list: null, label: 'ক্লাস ৩' },
        { video: 'hBHk7VjbREE', list: null, label: 'ক্লাস ৪' },
      ] },
      { n: 9, title: 'সম্ভাবনা', desc: 'সম্ভাবনার ধারণা, বিভিন্ন সম্ভাবনার সূত্র, নমুনা স্থান ও সম্ভাবনার প্রয়োগ।', video: 'xmxfGhzHaIA', list: null },
      { n: 10, title: 'সসীম ধারা', desc: 'সমান্তর ও সমগু ধারা, পদ ও সমষ্টি নির্ণয়, ধারার সংযোজন ও সমাধান।', classes: [
        { video: '281vRH0hMro', list: null, label: 'ক্লাস ১' },
        { video: '9J9F39Xx3vk', list: null, label: 'ক্লাস ২' },
        { video: 'F7sg78cwrlk', list: null, label: 'ক্লাস ৩' },
      ] },
      { n: 11, title: 'বীজগাণিতিক অনুপাত ও সমানুপাত', desc: 'অনুপাত ও সমানুপাতের সূত্র, ক্রমিক অনুপাত ও বাস্তব সমস্যায় প্রয়োগ।', classes: [
        { video: 'l_qTe1pbU9E', list: null, label: 'ক্লাস ১' },
        { video: 'JyI8pGTtonM', list: null, label: 'ক্লাস ২' },
      ] },
      { n: 12, title: 'কম্পাঙ্ক বিভাজক', desc: 'কম্পাঙ্ক বিভাজকের ধারণা, মান নির্ণয় ও সম্পর্কিত সমস্যা সমাধান।', classes: [
        { video: 'cbK5pjili3Q', list: null, label: 'ক্লাস ১' },
        { video: 'NCUieanlKHo', list: null, label: 'ক্লাস ২' },
      ] },
    ],
  },
];

/* ---- helpers (pure; safe to import in Node + browser) ---- */
export const slugify = (n) => `chapter-${n}`;
export const getSubject = (key) => SUBJECTS.find((s) => s.key === key);

export function getChapterByN(key, n) {
  const s = getSubject(key);
  if (!s || !Array.isArray(s.chapters)) return null;
  const i = s.chapters.findIndex((c) => String(c.n) === String(n));
  if (i < 0) return null;
  return { subject: s, chapter: s.chapters[i], index: i };
}

/* Normalizer: returns an array of {video, list, label} for any chapter.
   Supports the new `classes:[...]` format and the legacy `video`+`practice` format. */
export function getClasses(ch) {
  if (ch.classes && ch.classes.length) {
    return ch.classes.map((c) => ({ video: c.video, list: c.list, label: c.label || 'ক্লাস' }));
  }
  const list = [{ video: ch.video, list: ch.list, label: 'ক্লাস' }];
  if (ch.practice) list.push({ video: ch.practice.video, list: ch.list, label: ch.practice.label || 'Practice' });
  return list;
}

export const subjectUrl = (key) => `#/${key}`;
export const chapterUrl = (key, n) => `#/${key}/${n}`;
