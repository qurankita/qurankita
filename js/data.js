/* ============================================
   QURAN KITA — Data
   js/data.js
   ============================================ */

'use strict';

/* ── 114 SURAH [num, nameId, nameAr, ayat, type, arti] ── */
const SURAH_DATA = [
  [1,"Al-Fatihah","الفاتحة",7,"Makkiyyah","Pembukaan"],
  [2,"Al-Baqarah","البقرة",286,"Madaniyyah","Sapi Betina"],
  [3,"Ali 'Imran","آل عمران",200,"Madaniyyah","Keluarga Imran"],
  [4,"An-Nisa","النساء",176,"Madaniyyah","Wanita"],
  [5,"Al-Ma'idah","المائدة",120,"Madaniyyah","Hidangan"],
  [6,"Al-An'am","الأنعام",165,"Makkiyyah","Binatang Ternak"],
  [7,"Al-A'raf","الأعراف",206,"Makkiyyah","Tempat Tertinggi"],
  [8,"Al-Anfal","الأنفال",75,"Madaniyyah","Rampasan Perang"],
  [9,"At-Taubah","التوبة",129,"Madaniyyah","Pengampunan"],
  [10,"Yunus","يونس",109,"Makkiyyah","Nabi Yunus"],
  [11,"Hud","هود",123,"Makkiyyah","Nabi Hud"],
  [12,"Yusuf","يوسف",111,"Makkiyyah","Nabi Yusuf"],
  [13,"Ar-Ra'd","الرعد",43,"Madaniyyah","Guruh"],
  [14,"Ibrahim","إبراهيم",52,"Makkiyyah","Nabi Ibrahim"],
  [15,"Al-Hijr","الحجر",99,"Makkiyyah","Al-Hijr"],
  [16,"An-Nahl","النحل",128,"Makkiyyah","Lebah"],
  [17,"Al-Isra","الإسراء",111,"Makkiyyah","Perjalanan Malam"],
  [18,"Al-Kahf","الكهف",110,"Makkiyyah","Gua"],
  [19,"Maryam","مريم",98,"Makkiyyah","Maryam"],
  [20,"Ta Ha","طه",135,"Makkiyyah","Ta Ha"],
  [21,"Al-Anbiya","الأنبياء",112,"Makkiyyah","Para Nabi"],
  [22,"Al-Hajj","الحج",78,"Madaniyyah","Haji"],
  [23,"Al-Mu'minun","المؤمنون",118,"Makkiyyah","Orang Beriman"],
  [24,"An-Nur","النور",64,"Madaniyyah","Cahaya"],
  [25,"Al-Furqan","الفرقان",77,"Makkiyyah","Pembeda"],
  [26,"Asy-Syu'ara","الشعراء",227,"Makkiyyah","Para Penyair"],
  [27,"An-Naml","النمل",93,"Makkiyyah","Semut"],
  [28,"Al-Qasas","القصص",88,"Makkiyyah","Cerita"],
  [29,"Al-'Ankabut","العنكبوت",69,"Makkiyyah","Laba-laba"],
  [30,"Ar-Rum","الروم",60,"Makkiyyah","Bangsa Romawi"],
  [31,"Luqman","لقمان",34,"Makkiyyah","Luqman"],
  [32,"As-Sajdah","السجدة",30,"Makkiyyah","Sujud"],
  [33,"Al-Ahzab","الأحزاب",73,"Madaniyyah","Golongan Bersekutu"],
  [34,"Saba'","سبأ",54,"Makkiyyah","Kaum Saba"],
  [35,"Fatir","فاطر",45,"Makkiyyah","Pencipta"],
  [36,"Ya Sin","يس",83,"Makkiyyah","Ya Sin"],
  [37,"As-Saffat","الصافات",182,"Makkiyyah","Yang Bershaf-shaf"],
  [38,"Sad","ص",88,"Makkiyyah","Sad"],
  [39,"Az-Zumar","الزمر",75,"Makkiyyah","Rombongan"],
  [40,"Gafir","غافر",85,"Makkiyyah","Yang Maha Pengampun"],
  [41,"Fussilat","فصلت",54,"Makkiyyah","Yang Dijelaskan"],
  [42,"Asy-Syura","الشورى",53,"Makkiyyah","Musyawarah"],
  [43,"Az-Zukhruf","الزخرف",89,"Makkiyyah","Perhiasan"],
  [44,"Ad-Dukhan","الدخان",59,"Makkiyyah","Kabut"],
  [45,"Al-Jasiyah","الجاثية",37,"Makkiyyah","Yang Berlutut"],
  [46,"Al-Ahqaf","الأحقاف",35,"Makkiyyah","Bukit Pasir"],
  [47,"Muhammad","محمد",38,"Madaniyyah","Nabi Muhammad"],
  [48,"Al-Fath","الفتح",29,"Madaniyyah","Kemenangan"],
  [49,"Al-Hujurat","الحجرات",18,"Madaniyyah","Kamar-kamar"],
  [50,"Qaf","ق",45,"Makkiyyah","Qaf"],
  [51,"Az-Zariyat","الذاريات",60,"Makkiyyah","Angin yang Menerbangkan"],
  [52,"At-Tur","الطور",49,"Makkiyyah","Bukit Sinai"],
  [53,"An-Najm","النجم",62,"Makkiyyah","Bintang"],
  [54,"Al-Qamar","القمر",55,"Makkiyyah","Bulan"],
  [55,"Ar-Rahman","الرحمن",78,"Madaniyyah","Yang Maha Pengasih"],
  [56,"Al-Waqi'ah","الواقعة",96,"Makkiyyah","Hari Kiamat"],
  [57,"Al-Hadid","الحديد",29,"Madaniyyah","Besi"],
  [58,"Al-Mujadilah","المجادلة",22,"Madaniyyah","Wanita yang Mengajukan Gugatan"],
  [59,"Al-Hasyr","الحشر",24,"Madaniyyah","Pengusiran"],
  [60,"Al-Mumtahanah","الممتحنة",13,"Madaniyyah","Wanita yang Diuji"],
  [61,"As-Saf","الصف",14,"Madaniyyah","Barisan"],
  [62,"Al-Jumu'ah","الجمعة",11,"Madaniyyah","Hari Jumat"],
  [63,"Al-Munafiqun","المنافقون",11,"Madaniyyah","Orang Munafik"],
  [64,"At-Tagabun","التغابن",18,"Madaniyyah","Hari Ditampakkan Kesalahan"],
  [65,"At-Talaq","الطلاق",12,"Madaniyyah","Talak"],
  [66,"At-Tahrim","التحريم",12,"Madaniyyah","Mengharamkan"],
  [67,"Al-Mulk","الملك",30,"Makkiyyah","Kerajaan"],
  [68,"Al-Qalam","القلم",52,"Makkiyyah","Pena"],
  [69,"Al-Haqqah","الحاقة",52,"Makkiyyah","Hari Kiamat"],
  [70,"Al-Ma'arij","المعارج",44,"Makkiyyah","Tempat Naik"],
  [71,"Nuh","نوح",28,"Makkiyyah","Nabi Nuh"],
  [72,"Al-Jin","الجن",28,"Makkiyyah","Jin"],
  [73,"Al-Muzzammil","المزمل",20,"Makkiyyah","Orang Berselimut"],
  [74,"Al-Muddassir","المدثر",56,"Makkiyyah","Orang Berkemul"],
  [75,"Al-Qiyamah","القيامة",40,"Makkiyyah","Hari Kiamat"],
  [76,"Al-Insan","الإنسان",31,"Madaniyyah","Manusia"],
  [77,"Al-Mursalat","المرسلات",50,"Makkiyyah","Malaikat yang Diutus"],
  [78,"An-Naba","النبأ",40,"Makkiyyah","Berita Besar"],
  [79,"An-Nazi'at","النازعات",46,"Makkiyyah","Malaikat yang Mencabut"],
  [80,"'Abasa","عبس",42,"Makkiyyah","Bermuka Masam"],
  [81,"At-Takwir","التكوير",29,"Makkiyyah","Menggulung"],
  [82,"Al-Infitar","الانفطار",19,"Makkiyyah","Terbelah"],
  [83,"Al-Mutaffifin","المطففين",36,"Makkiyyah","Orang yang Curang"],
  [84,"Al-Insyiqaq","الانشقاق",25,"Makkiyyah","Terbelah"],
  [85,"Al-Buruj","البروج",22,"Makkiyyah","Gugusan Bintang"],
  [86,"At-Tariq","الطارق",17,"Makkiyyah","Yang Datang di Malam Hari"],
  [87,"Al-A'la","الأعلى",19,"Makkiyyah","Yang Paling Tinggi"],
  [88,"Al-Gasyiyah","الغاشية",26,"Makkiyyah","Hari Pembalasan"],
  [89,"Al-Fajr","الفجر",30,"Makkiyyah","Fajar"],
  [90,"Al-Balad","البلد",20,"Makkiyyah","Negeri"],
  [91,"Asy-Syams","الشمس",15,"Makkiyyah","Matahari"],
  [92,"Al-Lail","الليل",21,"Makkiyyah","Malam"],
  [93,"Ad-Duha","الضحى",11,"Makkiyyah","Waktu Duha"],
  [94,"Al-Insyirah","الانشراح",8,"Makkiyyah","Melapangkan"],
  [95,"At-Tin","التين",8,"Makkiyyah","Buah Tin"],
  [96,"Al-'Alaq","العلق",19,"Makkiyyah","Segumpal Darah"],
  [97,"Al-Qadr","القدر",5,"Makkiyyah","Kemuliaan"],
  [98,"Al-Bayyinah","البينة",8,"Madaniyyah","Bukti Nyata"],
  [99,"Az-Zalzalah","الزلزلة",8,"Madaniyyah","Kegoncangan"],
  [100,"Al-'Adiyat","العاديات",11,"Makkiyyah","Kuda Perang"],
  [101,"Al-Qari'ah","القارعة",11,"Makkiyyah","Hari Kiamat"],
  [102,"At-Takasur","التكاثر",8,"Makkiyyah","Bermegah-megahan"],
  [103,"Al-'Asr","العصر",3,"Makkiyyah","Masa"],
  [104,"Al-Humazah","الهمزة",9,"Makkiyyah","Pengumpat"],
  [105,"Al-Fil","الفيل",5,"Makkiyyah","Gajah"],
  [106,"Quraisy","قريش",4,"Makkiyyah","Suku Quraisy"],
  [107,"Al-Ma'un","الماعون",7,"Makkiyyah","Barang yang Berguna"],
  [108,"Al-Kausar","الكوثر",3,"Makkiyyah","Nikmat yang Berlimpah"],
  [109,"Al-Kafirun","الكافرون",6,"Makkiyyah","Orang Kafir"],
  [110,"An-Nasr","النصر",3,"Madaniyyah","Pertolongan"],
  [111,"Al-Lahab","المسد",5,"Makkiyyah","Gejolak Api"],
  [112,"Al-Ikhlas","الإخلاص",4,"Makkiyyah","Ikhlas"],
  [113,"Al-Falaq","الفلق",5,"Makkiyyah","Waktu Subuh"],
  [114,"An-Nas","الناس",6,"Makkiyyah","Manusia"]
];

/* ── QARI CONFIG ── */
const QARI_LIST = [
  {
    id: 'mishary',
    name: 'Mishary Rasyid',
    baseUrl: 'https://archive.org/download/MisharyRasyidTerjemahBahasaIndonesia/',
    getFile: (n) => `${String(n).padStart(3,'0')}.mp3`
  },
  {
    id: 'sudais',
    name: 'Abdurrahman As-Sudais',
    baseUrl: 'https://archive.org/download/Abdurrahman-Sudais-Terjemah-Bahasa-Indonesia/',
    getFile: (n) => `${String(n).padStart(3,'0')}.mp3`
  },
  {
    id: 'ghamidi',
    name: 'Saad Al-Ghamidi',
    baseUrl: 'https://archive.org/download/MurottaldanTerjemahanAlQuran-SyeikhAlGhomidi/',
    getFile: (n) => encodeURIComponent(`♪ ${String(n).padStart(3,'0')} ~ ${GHAMIDI_FILES[n]}.mp3`)
  }
];

/* ── GHAMIDI FILE NAME MAP ── */
const GHAMIDI_FILES = {
  1:'Al Fatihah', 2:'Al Baqarah', 3:'Al Imran', 4:'An Nisaa',
  5:'Al Maidah', 6:'Al Anaam', 7:'Al Araaf', 8:'Al Anfaal',
  9:'At Taubah', 10:'Yunus', 11:'Huud', 12:'Yusuf',
  13:'Ar-Raad', 14:'Ibrohim', 15:'Al Hijr', 16:'An Nahl',
  17:'Al Israa', 18:'Al Kahfi', 19:'Maryam', 20:'Thaahaa',
  21:'Al Anbiya', 22:'Al Hajj', 23:'Al Muminun', 24:'An Nuur',
  25:'Al Furqaan', 26:'Asy Syuara', 27:'An Naml', 28:'Al Qashash',
  29:'Al Ankabut', 30:'Ar Ruum', 31:'Luqman', 32:'As-Sajdah',
  33:'Al Ahzab', 34:'Saba', 35:'Faathir', 36:'Yaa Siin',
  37:'Ash Shaaffaat', 38:'Shaad', 39:'Az Zumar', 40:'Al Mumin',
  41:'Fushshilat', 42:'Asy Syuura', 43:'Az Zukhruf', 44:'Ad-Dukhon',
  45:'Al Jatsiyah', 46:'Al Ahqof', 47:'Muhammad', 48:'Al Fath',
  49:'Al Hujurot', 50:'Qoof', 51:'Adz Dzariyat', 52:'Ath Thuur',
  53:'An Najm', 54:'Al Qomar', 55:'Ar Rahman', 56:'Al Waqiah',
  57:'Al Hadid', 58:'Al Mujadilah', 59:'Al Hasyr', 60:'Al Mumtahanah',
  61:'Ash Shoff', 62:'Al Jumuah', 63:'Al Munafiqun', 64:'At Taghabun',
  65:'Ath-Thalaq', 66:'At Tahrim', 67:'Al Mulk', 68:'Al Qolam',
  69:'Al Haaqqah', 70:'Al Maarij', 71:'Nuh', 72:'Al Jin',
  73:'Al Muzzammil', 74:'Al Muddatstsir', 75:'Al Qiyaamah', 76:'Al Insaan',
  77:'Al Mursalaat', 78:'An Naba', 79:'An Naziat', 80:'Abasa',
  81:'At Takwir', 82:'Al Infithor', 83:'Al Muthaffifiin', 84:'Al Insyiqoq',
  85:'Al Buruj', 86:'Ath Thoriq', 87:'Al Alaa', 88:'Al Ghasyiah',
  89:'Al Fajr', 90:'Al Balad', 91:'Asy Syams', 92:'Al Lail',
  93:'Adh Dhuha', 94:'Al Insyiroh', 95:'At Tiin', 96:'Al Alaq',
  97:'Al Qadr', 98:'Al Bayyinah', 99:'Az Zalzalah', 100:'Al Adiyat',
  101:'Al Qoriah', 102:'At Takatsur', 103:'Al Ashr', 104:'Al Humazah',
  105:'Al Fiil', 106:'Quraisy', 107:'Al Maun', 108:'Al Kautsar',
  109:'Al Kafirun', 110:'An Nashr', 111:'Al Lahab', 112:'Al Ikhlas',
  113:'Al Falaq', 114:'An Naas'
};

/* ── HELPERS ── */
function getSurah(num) {
  return SURAH_DATA.find(s => s[0] === num) || null;
}

function getAudioUrl(qariId, surahNum) {
  const qari = QARI_LIST.find(q => q.id === qariId);
  if (!qari) return null;
  return qari.baseUrl + qari.getFile(surahNum);
}
