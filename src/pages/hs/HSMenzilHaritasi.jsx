import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as d3 from "d3";
import { C, FONT, MONO, glow } from "../../theme";
import { Panel } from "../../components";
import { turkeyBorder, neighborCountries } from "../../data/turkeyGeo";

/* ═══════════════════ 81 İL KOORDİNATLARI ═══════════════════ */
const iller = [
  { ad: "Adana", lat: 37.00, lon: 35.32, rak: 23 },
  { ad: "Adıyaman", lat: 37.76, lon: 38.27, rak: 672 },
  { ad: "Afyonkarahisar", lat: 38.73, lon: 30.54, rak: 1021 },
  { ad: "Ağrı", lat: 39.72, lon: 43.05, rak: 1640 },
  { ad: "Amasya", lat: 40.65, lon: 35.83, rak: 412 },
  { ad: "Ankara", lat: 39.93, lon: 32.86, rak: 938 },
  { ad: "Antalya", lat: 36.89, lon: 30.71, rak: 30 },
  { ad: "Artvin", lat: 41.18, lon: 41.82, rak: 255 },
  { ad: "Aydın", lat: 37.85, lon: 27.85, rak: 68 },
  { ad: "Balıkesir", lat: 39.65, lon: 27.89, rak: 130 },
  { ad: "Bilecik", lat: 40.05, lon: 30.00, rak: 539 },
  { ad: "Bingöl", lat: 38.88, lon: 40.50, rak: 1153 },
  { ad: "Bitlis", lat: 38.40, lon: 42.11, rak: 1545 },
  { ad: "Bolu", lat: 40.73, lon: 31.61, rak: 725 },
  { ad: "Burdur", lat: 37.72, lon: 30.29, rak: 967 },
  { ad: "Bursa", lat: 40.18, lon: 29.06, rak: 100 },
  { ad: "Çanakkale", lat: 40.15, lon: 26.41, rak: 3 },
  { ad: "Çankırı", lat: 40.60, lon: 33.62, rak: 751 },
  { ad: "Çorum", lat: 40.55, lon: 34.95, rak: 801 },
  { ad: "Denizli", lat: 37.77, lon: 29.09, rak: 354 },
  { ad: "Diyarbakır", lat: 37.92, lon: 40.23, rak: 660 },
  { ad: "Edirne", lat: 41.68, lon: 26.56, rak: 42 },
  { ad: "Elazığ", lat: 38.67, lon: 39.22, rak: 1067 },
  { ad: "Erzincan", lat: 39.75, lon: 39.49, rak: 1185 },
  { ad: "Erzurum", lat: 39.90, lon: 41.27, rak: 1853 },
  { ad: "Eskişehir", lat: 39.77, lon: 30.52, rak: 788 },
  { ad: "Gaziantep", lat: 37.06, lon: 37.38, rak: 855 },
  { ad: "Giresun", lat: 40.91, lon: 38.39, rak: 4 },
  { ad: "Gümüşhane", lat: 40.46, lon: 39.48, rak: 1219 },
  { ad: "Hakkâri", lat: 37.58, lon: 43.74, rak: 1720 },
  { ad: "Hatay", lat: 36.20, lon: 36.16, rak: 88 },
  { ad: "Isparta", lat: 37.76, lon: 30.55, rak: 1049 },
  { ad: "Mersin", lat: 36.81, lon: 34.63, rak: 22 },
  { ad: "İstanbul", lat: 41.01, lon: 28.98, rak: 39 },
  { ad: "İzmir", lat: 38.42, lon: 27.13, rak: 29 },
  { ad: "Kars", lat: 40.60, lon: 43.10, rak: 1775 },
  { ad: "Kastamonu", lat: 41.39, lon: 33.78, rak: 775 },
  { ad: "Kayseri", lat: 38.73, lon: 35.48, rak: 1054 },
  { ad: "Kırklareli", lat: 41.73, lon: 27.23, rak: 203 },
  { ad: "Kırşehir", lat: 39.15, lon: 34.17, rak: 1007 },
  { ad: "Kocaeli", lat: 40.77, lon: 29.92, rak: 76 },
  { ad: "Konya", lat: 37.87, lon: 32.49, rak: 1016 },
  { ad: "Kütahya", lat: 39.42, lon: 29.98, rak: 960 },
  { ad: "Malatya", lat: 38.35, lon: 38.31, rak: 964 },
  { ad: "Manisa", lat: 38.61, lon: 27.43, rak: 71 },
  { ad: "Kahramanmaraş", lat: 37.58, lon: 36.92, rak: 568 },
  { ad: "Mardin", lat: 37.31, lon: 40.74, rak: 1083 },
  { ad: "Muğla", lat: 37.22, lon: 28.36, rak: 660 },
  { ad: "Muş", lat: 38.74, lon: 41.49, rak: 1350 },
  { ad: "Nevşehir", lat: 38.63, lon: 34.71, rak: 1224 },
  { ad: "Niğde", lat: 37.97, lon: 34.69, rak: 1211 },
  { ad: "Ordu", lat: 40.98, lon: 37.88, rak: 4 },
  { ad: "Rize", lat: 41.02, lon: 40.52, rak: 7 },
  { ad: "Sakarya", lat: 40.69, lon: 30.40, rak: 31 },
  { ad: "Samsun", lat: 41.29, lon: 36.33, rak: 4 },
  { ad: "Siirt", lat: 37.93, lon: 41.94, rak: 894 },
  { ad: "Sinop", lat: 42.03, lon: 35.15, rak: 32 },
  { ad: "Sivas", lat: 39.75, lon: 37.01, rak: 1275 },
  { ad: "Tekirdağ", lat: 41.00, lon: 27.52, rak: 3 },
  { ad: "Tokat", lat: 40.31, lon: 36.55, rak: 623 },
  { ad: "Trabzon", lat: 41.00, lon: 39.72, rak: 39 },
  { ad: "Tunceli", lat: 39.11, lon: 39.55, rak: 978 },
  { ad: "Şanlıurfa", lat: 37.17, lon: 38.79, rak: 518 },
  { ad: "Uşak", lat: 38.67, lon: 29.41, rak: 919 },
  { ad: "Van", lat: 38.49, lon: 43.38, rak: 1727 },
  { ad: "Yozgat", lat: 39.82, lon: 34.80, rak: 1301 },
  { ad: "Zonguldak", lat: 41.46, lon: 31.80, rak: 134 },
  { ad: "Aksaray", lat: 38.37, lon: 34.03, rak: 970 },
  { ad: "Bayburt", lat: 40.26, lon: 40.23, rak: 1550 },
  { ad: "Karaman", lat: 37.19, lon: 33.23, rak: 1025 },
  { ad: "Kırıkkale", lat: 39.85, lon: 33.51, rak: 749 },
  { ad: "Batman", lat: 37.89, lon: 41.13, rak: 610 },
  { ad: "Şırnak", lat: 37.42, lon: 42.46, rak: 1350 },
  { ad: "Bartın", lat: 41.64, lon: 32.34, rak: 25 },
  { ad: "Ardahan", lat: 41.11, lon: 42.70, rak: 1829 },
  { ad: "Iğdır", lat: 39.92, lon: 44.05, rak: 840 },
  { ad: "Yalova", lat: 40.65, lon: 29.27, rak: 2 },
  { ad: "Karabük", lat: 41.20, lon: 32.62, rak: 380 },
  { ad: "Kilis", lat: 36.72, lon: 37.12, rak: 638 },
  { ad: "Osmaniye", lat: 37.07, lon: 36.25, rak: 118 },
  { ad: "Düzce", lat: 40.84, lon: 31.16, rak: 165 },
];

/* ═══════════════════ RADAR / SİSTEM VERİTABANI ═══════════════════ */
const radarSystems = [
  { name: "EIRS", detRange: 470, trkRange: 400, guidRange: 0, antH: 25, type: "Erken Uyarı", color: C.purple },
  { name: "ALP 300-G", detRange: 400, trkRange: 350, guidRange: 0, antH: 20, type: "Erken Uyarı", color: C.purple },
  { name: "ÇAFRAD", detRange: 400, trkRange: 300, guidRange: 200, antH: 30, type: "Çok Fonksiyonlu", color: C.cyan },
  { name: "SİPER Radar", detRange: 300, trkRange: 250, guidRange: 180, antH: 20, type: "Çok Fonksiyonlu", color: C.cyan },
  { name: "KALKAN", detRange: 120, trkRange: 100, guidRange: 0, antH: 10, type: "Arama/Takip", color: C.amber },
  { name: "KALKAN-050G", detRange: 25, trkRange: 20, guidRange: 15, antH: 8, type: "Ateş Kontrol", color: C.amber },
  { name: "HİSAR-O+ Radar", detRange: 80, trkRange: 60, guidRange: 40, antH: 12, type: "Ateş Kontrol", color: C.cyan },
  { name: "HİSAR-A+ Radar", detRange: 50, trkRange: 30, guidRange: 15, antH: 10, type: "Ateş Kontrol", color: C.amber },
  { name: "KORKUT KKA", detRange: 70, trkRange: 40, guidRange: 4, antH: 8, type: "Ateş Kontrol", color: C.amber },
  { name: "GÖKDENİZ Radar", detRange: 40, trkRange: 25, guidRange: 4, antH: 15, type: "Deniz CIWS", color: C.deniz },
  { name: "GÜRZ Radar", detRange: 50, trkRange: 30, guidRange: 15, antH: 10, type: "SHORAD", color: C.red },
];

/* ═══════════════════ TÜRKİYE SINIR POLİGONU (394 nokta — kaynak: georgique/world-geojson) ═══════════════════ */


/* ═══════════════════ 973 İLÇE KOORDİNATLARI ═══════════════════ */
const ilceData = [
  /* Adana */ [37.547,35.395,"Aladağ"],[37.029,35.818,"Ceyhan"],[37.048,35.281,"Çukurova"],[37.815,35.913,"Feke"],[37.257,35.662,"İmamoğlu"],[37.257,35.059,"Karaisalı"],[36.563,35.385,"Karataş"],[37.464,35.826,"Kozan"],[37.423,34.872,"Pozantı"],[37.991,36.09,"Saimbeyli"],[37.033,35.412,"Sarıçam"],[36.998,35.301,"Seyhan"],[38.261,36.221,"Tufanbeyli"],[36.767,35.792,"Yumurtalık"],[36.997,35.358,"Yüreğir"],
  /* Adıyaman */ [37.694,37.862,"Besni"],[38.033,38.242,"Çelikhan"],[38.029,39.033,"Gerger"],[37.785,37.644,"Gölbaşı"],[37.786,38.621,"Kahta"],[37.764,38.277,"Merkez"],[37.579,38.483,"Samsat"],[38.029,38.619,"Sincik"],[37.795,37.914,"Tut"],
  /* Afyonkarahisar */ [37.897,30.01,"Başmakçı"],[38.984,30.924,"Bayat"],[38.711,31.048,"Bolvadin"],[38.593,31.027,"Çay"],[38.702,30.782,"Çobanlar"],[37.919,29.861,"Dazkırı"],[38.067,30.168,"Dinar"],[39.02,31.15,"Emirdağ"],[38.039,29.888,"Evciler"],[38.573,29.967,"Hocalar"],[39.032,30.417,"İhasaniye"],[38.862,30.751,"İscehisar"],[38.258,30.149,"Kızılören"],[38.757,30.539,"Merkez"],[38.465,30.269,"Sandıklı"],[38.745,30.245,"Sinanpaşa"],[38.536,30.55,"Şuhut"],[38.53,31.229,"Sultandağı"],
  /* Aksaray */ [38.87,33.918,"Ağaçören"],[38.401,33.413,"Eskil"],[38.394,34.347,"Gülağaç"],[38.274,34.371,"Güzelyurt"],[38.371,34.027,"Merkez"],[38.737,34.039,"Ortaköy"],[38.98,33.843,"Sarıyahşi"],[38.247,33.549,"Sultanhanı"],
  /* Amasya */ [40.398,35.524,"Göynücek"],[40.874,35.216,"Gümüşhacıköy"],[40.783,35.023,"Hamamözü"],[40.652,35.834,"Merkez"],[40.873,35.464,"Merzifon"],[40.834,35.645,"Suluova"],[40.76,36.322,"Taşova"],
  /* Ankara */ [40.131,33.087,"Akyurt"],[39.935,32.852,"Altındağ"],[40.02,32.333,"Ayaş"],[39.553,33.124,"Bala"],[40.168,31.921,"Beypazarı"],[40.491,32.476,"Çamlıdere"],[39.92,32.853,"Çankaya"],[40.239,33.033,"Çubuk"],[39.923,33.227,"Elmadağ"],[39.947,32.66,"Etimesgut"],[39.023,33.807,"Evren"],[39.79,32.804,"Gölbaşı"],[40.21,32.243,"Güdül"],[39.434,32.501,"Haymana"],[40.205,32.681,"Kahramankazan"],[40.097,33.409,"Kalecik"],[39.978,32.868,"Keçiören"],[40.472,32.648,"Kızılcahamam"],[39.935,32.895,"Mamak"],[40.189,31.35,"Nallıhan"],[39.585,32.142,"Polatlı"],[40.105,32.884,"Pursaklar"],[38.939,33.544,"Şereflikoçhisar"],[39.962,32.58,"Sincan"],[39.962,32.81,"Yenimahalle"],
  /* Antalya */ [37.046,31.79,"Akseki"],[36.949,30.847,"Aksu"],[36.536,31.999,"Alanya"],[36.242,29.986,"Demre"],[37.023,30.601,"Döşemealtı"],[36.738,29.917,"Elmalı"],[36.298,30.147,"Finike"],[36.268,32.315,"Gazipaşa"],[36.813,32.0,"Gündoğmuş"],[37.096,31.596,"İbradı"],[36.199,29.641,"Kaş"],[36.602,30.559,"Kemer"],[36.915,30.716,"Kepez"],[36.865,30.642,"Konyaaltı"],[37.065,30.196,"Korkuteli"],[36.367,30.286,"Kumluca"],[36.786,31.447,"Manavgat"],[36.852,30.757,"Muratpaşa"],[36.917,31.104,"Serik"],
  /* Ardahan */ [41.129,43.133,"Çıldır"],[41.342,42.841,"Damal"],[40.793,42.609,"Göle"],[41.233,42.848,"Hanak"],[41.113,42.702,"Merkez"],[41.51,42.728,"Posof"],
  /* Artvin */ [41.121,42.067,"Ardanuç"],[41.35,41.305,"Arhavi"],[41.358,41.676,"Borçka"],[41.392,41.423,"Hopa"],[41.481,41.526,"Kemalpaşa"],[41.182,41.816,"Merkez"],[41.278,41.562,"Murgul"],[41.253,42.356,"Şavşat"],[40.811,41.527,"Yusufeli"],
  /* Aydın */ [37.671,28.309,"Bozdağan"],[37.965,28.742,"Buharkent"],[37.611,28.059,"Çine"],[37.355,27.277,"Didim"],[37.868,27.9,"Efeler"],[37.873,27.598,"Germencik"],[37.853,27.724,"İncirliova"],[37.727,28.604,"Karacasu"],[37.561,27.837,"Karpuzlu"],[37.761,27.706,"Koçarlı"],[37.853,28.052,"Köşk"],[37.87,27.265,"Kuşadası"],[37.914,28.46,"Kuyucak"],[37.91,28.324,"Nazilli"],[37.75,27.411,"Söke"],[37.89,28.154,"Sultanhisar"],[37.823,28.196,"Yenipazar"],
  /* Ağrı */ [39.54,43.671,"Diyadin"],[39.548,44.081,"Doğubayazit"],[39.798,42.677,"Eleşkirt"],[39.609,42.988,"Hamur"],[39.708,43.049,"Merkez"],[39.239,42.863,"Patnos"],[39.635,43.376,"Taşlıçay"],[39.539,42.773,"Tutak"],
  /* Balıkesir */ [39.632,27.888,"Altıeylül"],[39.318,26.692,"Ayvalık"],[39.75,27.579,"Balya"],[40.288,27.962,"Bandırma"],[39.393,28.131,"Bigadiç"],[39.503,26.98,"Burhaniye"],[39.585,28.627,"Dursunbey"],[39.592,27.02,"Edremit"],[40.395,27.791,"Erdek"],[39.365,26.869,"Gömeç"],[40.105,27.652,"Gönen"],[39.559,27.097,"Havran"],[39.582,27.485,"İvrindi"],[39.661,27.885,"Karesi"],[39.685,28.16,"Kepsut"],[40.047,27.97,"Manyas"],[40.587,27.553,"Marmara"],[39.383,27.65,"Savaştepe"],[39.239,28.175,"Sındırgı"],[39.919,28.158,"Susurluk"],
  /* Bartın */ [41.747,32.386,"Amasra"],[41.844,32.721,"Kurucaşile"],[41.632,32.336,"Merkez"],[41.583,32.639,"Ulus"],
  /* Batman */ [37.917,41.292,"Beşiri"],[37.566,41.385,"Gercüş"],[37.731,41.418,"Hasankeyf"],[38.193,41.49,"Kozluk"],[37.88,41.124,"Merkez"],[38.334,41.415,"Sason"],
  /* Bayburt */ [40.389,40.147,"Aydıntepe"],[40.164,39.892,"Demirözü"],[40.253,40.225,"Merkez"],
  /* Bilecik */ [39.907,30.035,"Bozüyük"],[40.284,30.316,"Gölpazarı"],[40.05,30.385,"İnhisar"],[40.139,29.976,"Merkez"],[40.358,30.015,"Osmaneli"],[39.995,29.903,"Pazaryeri"],[40.015,30.182,"Söğüt"],[40.177,30.519,"Yenipazar"],
  /* Bingöl */ [39.229,40.483,"Adaklı"],[38.748,40.553,"Genç"],[39.294,41.01,"Karlıova"],[39.31,40.349,"Kiğı"],[38.885,40.498,"Merkez"],[38.967,41.054,"Solhan"],[39.227,40.069,"Yayladere"],[39.434,40.545,"Yedisu"],
  /* Bitlis */ [38.795,42.751,"Adilcevaz"],[38.752,42.494,"Ahlat"],[38.574,42.025,"Güroymak"],[38.221,42.424,"Hizan"],[38.397,42.107,"Merkez"],[38.41,41.918,"Mutki"],[38.504,42.28,"Tatvan"],
  /* Bolu */ [40.721,32.063,"Dörtdivan"],[40.797,32.202,"Gerede"],[40.399,30.786,"Göynük"],[40.41,31.848,"Kıbrıscık"],[40.939,32.073,"Mengen"],[40.733,31.608,"Merkez"],[40.466,31.211,"Mudurnu"],[40.412,31.573,"Seben"],[40.771,32.03,"Yeniçağa"],
  /* Burdur */ [37.649,30.534,"Ağlasun"],[36.998,29.547,"Altınyayla"],[37.456,30.588,"Bucak"],[37.156,29.691,"Çavdır"],[37.534,30.483,"Çeltikçi"],[37.151,29.511,"Gölhisar"],[37.373,29.828,"Karamanlı"],[37.353,30.061,"Kemer"],[37.715,30.283,"Merkez"],[37.308,29.772,"Tefenni"],[37.506,29.753,"Yeşilova"],
  /* Bursa */ [39.771,28.886,"Büyükorhan"],[40.434,29.152,"Gemlik"],[40.218,29.192,"Gürsu"],[39.677,29.155,"Harmancık"],[40.08,29.51,"İnegöl"],[40.429,29.72,"İznik"],[40.216,28.359,"Karacabey"],[39.913,29.233,"Keles"],[40.201,29.213,"Kestel"],[40.373,28.888,"Mudanya"],[40.038,28.408,"Mustafakemalpaşa"],[40.216,28.977,"Nilüfer"],[39.904,28.987,"Orhaneli"],[40.491,29.308,"Orhangazi"],[40.196,29.06,"Osmangazi"],[40.264,29.651,"Yenişehir"],[40.191,29.127,"Yıldırım"],
  /* Denizli */ [37.427,29.349,"Acıpayam"],[37.808,28.857,"Babadağ"],[37.977,29.607,"Baklan"],[38.227,29.422,"Bekilli"],[37.236,28.896,"Beyağaç"],[37.824,29.608,"Bozkurt"],[38.047,28.826,"Buldan"],[38.082,29.397,"Çal"],[37.076,29.344,"Çameli"],[37.829,29.662,"Çardak"],[38.301,29.739,"Çivril"],[38.154,29.064,"Güney"],[37.755,29.267,"Honaz"],[37.443,28.845,"Kale"],[37.787,29.037,"Merkezefendi"],[37.763,29.103,"Pamukkale"],[37.924,28.925,"Sarayköy"],[37.581,29.264,"Serinhisar"],[37.573,29.071,"Tavas"],
  /* Diyarbakır */ [37.923,40.194,"Bağlar"],[37.852,40.664,"Bismil"],[38.136,39.45,"Çermik"],[37.724,40.413,"Çınar"],[38.212,39.288,"Çüngüş"],[38.368,40.072,"Dicle"],[38.258,40.084,"Eğil"],[38.265,39.759,"Ergani"],[38.41,40.398,"Hani"],[38.254,40.782,"Hazro"],[37.94,40.181,"Kayapınar"],[38.29,40.503,"Kocaköy"],[38.502,41.012,"Kulp"],[38.46,40.648,"Lice"],[38.142,41.001,"Silvan"],[37.911,40.237,"Sur"],[37.941,40.226,"Yenişehir"],
  /* Düzce */ [41.088,31.117,"Akçakoca"],[40.895,31.046,"Çilimli"],[40.873,30.951,"Cumayeri"],[40.775,30.998,"Gölyaka"],[40.846,30.938,"Gümüşova"],[40.773,31.319,"Kaynaşlı"],[40.839,31.161,"Merkez"],[40.961,31.444,"Yığılca"],
  /* Edirne */ [40.725,26.084,"Enez"],[41.549,26.822,"Havsa"],[40.922,26.384,"İpsala"],[40.855,26.63,"Keşan"],[41.839,26.736,"Lalapaşa"],[41.191,26.42,"Meriç"],[41.677,26.556,"Merkez"],[41.765,26.907,"Süloğlu"],[41.267,26.688,"Uzunköprü"],
  /* Elâzığ */ [38.944,38.714,"Ağın"],[38.453,39.851,"Alacakaya"],[38.564,40.139,"Arıcak"],[38.569,38.825,"Baskil"],[38.954,40.037,"Karakoçan"],[38.794,38.74,"Keban"],[38.721,39.872,"Kovancılar"],[38.394,39.674,"Maden"],[38.675,39.212,"Merkez"],[38.695,39.931,"Palu"],[38.449,39.307,"Sivrice"],
  /* Erzincan */ [39.804,40.037,"Çayırlı"],[39.456,38.565,"İliç"],[39.602,39.035,"Kemah"],[39.262,38.496,"Kemaliye"],[39.746,39.49,"Merkez"],[39.974,40.023,"Otlukbeli"],[39.9,38.768,"Refahiye"],[39.776,40.383,"Tercan"],[39.71,39.701,"Üzümlü"],
  /* Erzurum */ [39.921,40.697,"Aşkale"],[39.943,41.112,"Aziziye"],[39.612,40.977,"Çat"],[39.358,41.702,"Hınıs"],[40.043,42.174,"Horasan"],[40.483,41.0,"İspir"],[39.347,42.103,"Karaçoban"],[39.703,42.145,"Karayazı"],[39.902,41.92,"Köprüköy"],[40.345,41.871,"Narman"],[40.546,41.996,"Oltu"],[40.828,42.129,"Olur"],[39.889,41.272,"Palandöken"],[39.979,41.673,"Pasinler"],[40.417,40.772,"Pazaryolu"],[40.56,42.342,"Şenkaya"],[39.646,41.505,"Tekman"],[40.297,41.551,"Tortum"],[40.533,41.548,"Uzundere"],[39.907,41.273,"Yakutiye"],
  /* Eskişehir */ [39.766,30.959,"Alpu"],[39.687,31.207,"Beylikova"],[39.377,31.038,"Çifteler"],[39.384,31.809,"Günyüzü"],[39.159,30.862,"Han"],[39.816,30.143,"İnönü"],[39.494,30.986,"Mahmudiye"],[40.026,30.577,"Mihalgazi"],[39.866,31.495,"Mihalıççık"],[39.767,30.543,"Odunpazarı"],[40.038,30.621,"Sarıcakaya"],[39.444,30.696,"Seyitgazi"],[39.447,31.536,"Sivrihisar"],[39.784,30.501,"Tepebaşı"],
  /* Gaziantep */ [37.425,37.688,"Araban"],[37.023,36.63,"İslahiye"],[36.834,37.998,"Karkamış"],[37.01,37.797,"Nizip"],[37.176,36.741,"Nurdağı"],[36.962,37.515,"Oğuzeli"],[37.046,37.37,"Şahinbey"],[37.088,37.391,"Şehitkamil"],[37.316,37.566,"Yavuzeli"],
  /* Giresun */ [40.32,38.764,"Alucra"],[40.938,38.232,"Bulancak"],[40.134,38.735,"Çamoluk"],[40.917,39.01,"Çanakçı"],[40.738,38.451,"Dereli"],[40.81,38.916,"Doğankent"],[40.949,38.706,"Espiye"],[41.064,39.14,"Eynesil"],[41.032,39.002,"Görele"],[40.893,38.807,"Güce"],[40.917,38.513,"Keşap"],[40.917,38.382,"Merkez"],[40.953,38.125,"Piraziz"],[40.288,38.421,"Şebinkarahisar"],[41.007,38.814,"Tirebolu"],[40.862,38.625,"Yağlıdere"],
  /* Gümüşhane */ [40.129,39.436,"Kelkit"],[40.212,39.653,"Köse"],[40.702,39.086,"Kürtün"],[40.459,39.478,"Merkez"],[40.19,39.127,"Şiran"],[40.557,39.293,"Torul"],
  /* Hakkari */ [37.247,43.611,"Çukurca"],[37.082,44.311,"Derecik"],[37.574,43.735,"Merkez"],[37.304,44.575,"Şemdinli"],[37.573,44.281,"Yüksekova"],
  /* Hatay */ [36.116,36.248,"Altınözü"],[36.203,36.16,"Antakya"],[36.416,35.897,"Arsuz"],[36.491,36.196,"Belen"],[36.195,36.148,"Defne"],[36.84,36.222,"Dörtyol"],[36.952,36.198,"Erzin"],[36.799,36.522,"Hassa"],[36.585,36.176,"İskenderun"],[36.498,36.362,"Kırıkhan"],[36.365,36.454,"Kumlu"],[36.761,36.227,"Payas"],[36.269,36.567,"Reyhanlı"],[36.084,35.977,"Samandağ"],[35.903,36.064,"Yayladağı"],
  /* Isparta */ [37.799,31.071,"Aksu"],[37.951,30.637,"Atabey"],[37.874,30.848,"Eğirdir"],[38.121,31.015,"Gelendost"],[37.955,30.515,"Gönen"],[37.946,30.297,"Keçiborlu"],[37.764,30.555,"Merkez"],[38.079,31.358,"Şarkikaraağaç"],[38.108,30.55,"Senirkent"],[37.495,30.981,"Sütçüler"],[38.078,30.448,"Uluborlu"],[38.297,31.179,"Yalvaç"],[37.71,31.39,"Yenişarbademli"],
  /* Iğdır */ [39.874,44.516,"Aralık"],[39.972,44.172,"Karakoyunlu"],[39.92,44.044,"Merkez"],[40.04,43.663,"Tuzluca"],
  /* Kahramanmaraş */ [38.244,36.915,"Afşin"],[37.573,36.354,"Andırın"],[37.749,37.292,"Çağlayancerit"],[37.582,36.946,"Dulkadiroğlu"],[38.059,37.189,"Ekinözü"],[38.206,37.188,"Elbistan"],[38.022,36.504,"Göksun"],[37.966,37.446,"Nurhak"],[37.587,36.898,"Onikişubat"],[37.489,37.292,"Pazarcık"],[37.385,36.846,"Türkoğlu"],
  /* Karabük */ [41.423,32.956,"Eflani"],[40.943,32.531,"Eskipazar"],[41.206,32.623,"Merkez"],[41.075,32.92,"Ovacık"],[41.249,32.683,"Safranbolu"],[41.203,32.321,"Yenice"],
  /* Karaman */ [37.362,33.689,"Ayrancı"],[36.753,32.682,"Başyayla"],[36.639,32.89,"Ermenek"],[37.227,32.959,"Kazımkarabekir"],[37.181,33.222,"Merkez"],[36.697,32.615,"Sarıveliler"],
  /* Kars */ [40.742,43.624,"Akyaka"],[40.848,43.331,"Arpaçay"],[40.378,43.415,"Digor"],[40.141,43.12,"Kağızman"],[40.601,43.1,"Merkez"],[40.334,42.59,"Sarıkamış"],[40.464,42.791,"Selim"],[40.78,43.128,"Susuz"],
  /* Kastamonu */ [41.979,34.008,"Abana"],[41.687,33.554,"Ağlı"],[41.245,33.329,"Araç"],[41.642,33.302,"Azdavay"],[41.958,34.011,"Bozkurt"],[41.953,34.217,"Çatalzeytin"],[41.898,32.985,"Cide"],[41.477,33.464,"Daday"],[41.599,33.838,"Devrekani"],[42.004,33.46,"Doğanyurt"],[41.626,34.463,"Hanönü"],[41.204,33.554,"İhsangazi"],[41.979,33.76,"İnebolu"],[41.806,33.71,"Küre"],[41.376,33.777,"Merkez"],[41.604,33.111,"Pınarbaşı"],[41.808,33.233,"Şenpazar"],[41.619,33.718,"Seydiler"],[41.505,34.213,"Taşköprü"],[41.017,34.038,"Tosya"],
  /* Kayseri */ [39.002,36.172,"Akkışla"],[38.846,35.858,"Bünyan"],[38.389,35.492,"Develi"],[39.091,35.566,"Felahiye"],[38.644,35.451,"Hacılar"],[38.623,35.184,"İncesu"],[38.75,35.471,"Kocasinan"],[38.712,35.499,"Melikgazi"],[39.102,35.698,"Özvatan"],[38.725,36.394,"Pınarbaşı"],[39.073,35.964,"Sarıoğlan"],[38.48,36.498,"Sarız"],[38.693,35.55,"Talas"],[38.448,35.798,"Tomarza"],[38.108,35.361,"Yahyalı"],[38.349,35.093,"Yeşilhisar"],
  /* Kilis */ [36.675,37.467,"Elbeyli"],[36.717,37.114,"Merkez"],[36.885,36.918,"Musabeyli"],[36.841,37.143,"Polateli"],
  /* Kocaeli */ [40.717,29.921,"Başiskele"],[40.831,29.38,"Çayırova"],[40.781,29.385,"Darıca"],[40.758,29.831,"Derince"],[40.785,29.542,"Dilovası"],[40.799,29.432,"Gebze"],[40.664,29.792,"Gölcük"],[40.766,29.941,"İzmit"],[41.069,30.153,"Kandıra"],[40.692,29.617,"Karamürsel"],[40.743,30.022,"Kartepe"],[40.769,29.768,"Körfez"],
  /* Konya */ [37.239,32.12,"Ahırlı"],[37.451,32.37,"Akören"],[38.359,31.412,"Akşehir"],[38.308,32.869,"Altınekin"],[37.679,31.728,"Beyşehir"],[37.189,32.245,"Bozkır"],[39.024,31.791,"Çeltik"],[38.656,32.923,"Cihanbeyli"],[37.573,32.78,"Çumra"],[38.016,32.019,"Derbent"],[37.391,31.511,"Derebucak"],[38.145,31.677,"Doğanhisar"],[37.904,33.835,"Emirgazi"],[37.517,34.046,"Ereğli"],[37.298,32.718,"Güneysınır"],[36.986,32.456,"Hadim"],[37.434,34.187,"Halkapınar"],[37.952,31.598,"Hüyük"],[38.28,31.915,"Ilgın"],[38.239,32.213,"Kadınhanı"],[37.716,33.551,"Karapınar"],[37.87,32.526,"Karatay"],[39.09,33.08,"Kulu"],[37.861,32.474,"Meram"],[38.264,32.407,"Sarayönü"],[37.892,32.477,"Selçuklu"],[37.419,31.852,"Seydişehir"],[36.924,32.493,"Taşkent"],[38.475,31.629,"Tuzlukçu"],[37.3,32.085,"Yalıhüyük"],[38.814,31.735,"Yunak"],
  /* Kütahya */ [39.059,30.109,"Altıntaş"],[39.215,29.87,"Aslanapa"],[39.2,29.613,"Çavdarhisar"],[39.802,29.613,"Domaniç"],[38.852,29.98,"Dumlupınar"],[39.34,29.257,"Emet"],[38.99,29.393,"Gediz"],[39.25,29.231,"Hisarcık"],[39.419,29.985,"Merkez"],[38.995,29.123,"Pazarlar"],[39.025,29.22,"Şaphane"],[39.089,28.977,"Simav"],[39.547,29.487,"Tavşanlı"],
  /* Kırklareli */ [41.43,27.092,"Babaeski"],[41.825,27.766,"Demirköy"],[41.943,27.157,"Kofçaz"],[41.402,27.355,"Lüleburgaz"],[41.735,27.226,"Merkez"],[41.347,26.924,"Pehlivanköy"],[41.624,27.519,"Pınarhisar"],[41.573,27.767,"Vize"],
  /* Kırıkkale */ [39.813,33.472,"Bahşılı"],[39.91,33.721,"Balışeyh"],[39.465,33.526,"Çelebi"],[39.944,34.033,"Delice"],[39.593,33.378,"Karakeçili"],[39.673,33.614,"Keskin"],[39.839,33.506,"Merkez"],[40.158,33.717,"Sulakyurt"],[39.852,33.453,"Yahşihan"],
  /* Kırşehir */ [39.625,34.096,"Akçakent"],[39.451,33.963,"Akpınar"],[39.269,34.261,"Boztepe"],[39.603,34.417,"Çiçekdağı"],[39.359,33.724,"Kaman"],[39.146,34.16,"Merkez"],[39.06,34.378,"Mucur"],
  /* Malatya */ [38.344,37.968,"Akçadağ"],[39.039,38.489,"Arapgir"],[38.783,38.264,"Arguvan"],[38.355,38.334,"Battalgazi"],[38.547,37.512,"Darende"],[38.095,37.879,"Doğanşehir"],[38.31,39.036,"Doğanyol"],[38.816,37.931,"Hekimhan"],[38.401,38.746,"Kale"],[38.885,37.67,"Kuluncak"],[38.197,38.869,"Pütürge"],[38.596,38.18,"Yazıhan"],[38.347,38.286,"Yeşilyurt"],
  /* Manisa */ [38.514,27.938,"Ahmetli"],[38.925,27.834,"Akhisar"],[38.355,28.516,"Alaşehir"],[39.047,28.658,"Demirci"],[38.714,27.918,"Gölmarmara"],[38.935,28.29,"Gördes"],[39.115,27.686,"Kırkağaç"],[38.747,28.403,"Köprübaşı"],[38.54,28.642,"Kula"],[38.486,28.139,"Salihli"],[38.237,28.699,"Sarıgöl"],[38.733,27.559,"Saruhanlı"],[38.615,27.43,"Şehzadeler"],[38.743,28.87,"Selendi"],[39.185,27.609,"Soma"],[38.499,27.7,"Turgutlu"],[38.617,27.403,"Yunusemre"],
  /* Mardin */ [37.322,40.722,"Artuklu"],[37.545,41.722,"Dargeçit"],[37.367,40.269,"Derik"],[37.188,40.584,"Kızıltepe"],[37.478,40.486,"Mazıdağı"],[37.42,41.353,"Midyat"],[37.078,41.215,"Nusaybin"],[37.403,40.954,"Ömerli"],[37.536,40.888,"Savur"],[37.339,40.82,"Yeşilli"],
  /* Mersin */ [36.823,34.655,"Akdeniz"],[36.07,32.867,"Anamur"],[36.153,33.338,"Aydıncık"],[36.102,32.976,"Bozyazı"],[37.167,34.593,"Çamlıyayla"],[36.606,34.31,"Erdemli"],[36.338,33.401,"Gülnar"],[36.746,34.523,"Mezitli"],[36.645,33.437,"Mut"],[36.376,33.925,"Silifke"],[36.917,34.896,"Tarsus"],[36.829,34.61,"Toroslar"],[36.786,34.565,"Yenişehir"],
  /* Muğla */ [37.035,27.43,"Bodrum"],[36.766,28.807,"Dalaman"],[36.726,27.688,"Datça"],[36.623,29.113,"Fethiye"],[37.446,28.363,"Kavaklıdere"],[36.956,28.689,"Köyceğiz"],[36.853,28.271,"Marmaris"],[37.217,28.365,"Menteşe"],[37.314,27.784,"Milas"],[36.844,28.769,"Ortaca"],[36.647,29.362,"Seydikemer"],[37.101,28.418,"Ula"],[37.342,28.145,"Yatağan"],
  /* Muş */ [39.098,42.272,"Bulanık"],[38.682,41.687,"Hasköy"],[38.742,41.785,"Korkut"],[39.146,42.541,"Malazgirt"],[38.738,41.495,"Merkez"],[39.169,41.455,"Varto"],
  /* Nevşehir */ [38.55,34.509,"Acıgöl"],[38.719,34.847,"Avanos"],[38.369,34.736,"Derinkuyu"],[38.74,34.616,"Gülşehir"],[38.944,34.563,"Hacıbektaş"],[39.21,34.851,"Kozaklı"],[38.627,34.72,"Merkez"],[38.633,34.912,"Ürgüp"],
  /* Niğde */ [37.996,34.368,"Altunhisar"],[37.894,34.563,"Bor"],[37.837,34.99,"Çamardı"],[38.175,34.485,"Çiftlik"],[37.969,34.676,"Merkez"],[37.548,34.485,"Ulukışla"],
  /* Ordu */ [40.792,37.018,"Akkuş"],[40.979,37.896,"Altınordu"],[40.684,37.4,"Aybastı"],[40.903,37.527,"Çamaş"],[40.879,37.453,"Çatalpınar"],[41.017,37.099,"Çaybaşı"],[41.031,37.501,"Fatsa"],[40.687,37.618,"Gölkoy"],[40.966,38.061,"Gülyalı"],[40.789,37.6,"Gürgentepe"],[41.053,37.078,"İkizce"],[40.859,37.89,"Kabadüz"],[40.751,37.451,"Kabataş"],[40.829,37.344,"Korgan"],[40.874,37.264,"Kumru"],[40.462,37.773,"Mesudiye"],[41.067,37.774,"Perşembe"],[40.873,37.759,"Ulubey"],[41.132,37.287,"Ünye"],
  /* Osmaniye */ [37.203,36.582,"Bahçe"],[37.24,36.453,"Düziçi"],[37.131,36.556,"Hasanbeyli"],[37.367,36.097,"Kadirli"],[37.074,36.245,"Merkez"],[37.454,36.025,"Sumbas"],[37.068,36.144,"Toprakkale"],
  /* Rize */ [41.194,40.983,"Ardeşen"],[41.049,41.004,"Çamlıhemşin"],[41.087,40.723,"Çayeli"],[41.025,40.422,"Derepazarı"],[41.273,41.143,"Fındıklı"],[40.977,40.613,"Güneysu"],[41.048,40.899,"Hemşin"],[40.779,40.56,"İkizdere"],[41.016,40.367,"İyidere"],[40.929,40.442,"Kalkandere"],[41.025,40.517,"Merkez"],[41.18,40.884,"Pazar"],
  /* Sakarya */ [40.779,30.399,"Adapazarı"],[40.683,30.625,"Akyazı"],[40.715,30.362,"Arifiye"],[40.758,30.404,"Erenler"],[40.939,30.487,"Ferizli"],[40.509,30.29,"Geyve"],[40.797,30.746,"Hendek"],[40.642,30.538,"Karapürçek"],[41.11,30.693,"Karasu"],[41.034,30.305,"Kaynarca"],[41.054,30.851,"Kocaali"],[40.507,30.169,"Pamukova"],[40.697,30.269,"Sapanca"],[40.772,30.363,"Serdivan"],[40.906,30.474,"Söğütlü"],[40.397,30.493,"Taraklı"],
  /* Samsun */ [41.462,36.046,"19 Mayıs"],[41.612,35.604,"Alaçam"],[41.036,36.234,"Asarcık"],[41.322,36.287,"Atakum"],[40.99,36.633,"Ayvacık"],[41.56,35.907,"Bafra"],[41.268,36.359,"Canik"],[41.198,36.723,"Çarşamba"],[40.968,35.665,"Havza"],[41.279,36.328,"İlkadım"],[41.07,36.029,"Kavak"],[40.912,35.895,"Ladik"],[41.082,36.825,"Salıpazarı"],[41.22,36.453,"Tekkeköy"],[41.209,36.972,"Terme"],[41.143,35.461,"Vezirköprü"],[41.631,35.53,"Yakakent"],
  /* Siirt */ [38.163,41.784,"Baykan"],[37.749,42.184,"Eruh"],[37.926,41.7,"Kurtalan"],[37.925,41.941,"Merkez"],[37.932,42.548,"Pervari"],[38.062,42.03,"Şirvan"],[37.95,42.012,"Tillo"],
  /* Sinop */ [41.94,34.588,"Ayancık"],[41.464,34.778,"Boyabat"],[41.651,35.264,"Dikmen"],[41.42,35.056,"Durağan"],[41.88,34.907,"Erfelek"],[41.804,35.195,"Gerze"],[42.026,35.151,"Merkez"],[41.329,34.847,"Saraydüzü"],[41.948,34.339,"Türkeli"],
  /* Sivas */ [40.082,38.347,"Akıncılar"],[39.273,36.748,"Altınyayla"],[39.368,38.114,"Divriği"],[40.215,37.533,"Doğanşar"],[39.185,36.072,"Gemerek"],[40.061,38.608,"Gölova"],[38.722,37.278,"Gürün"],[39.855,37.389,"Hafik"],[39.874,38.112,"Imranlı"],[39.236,37.391,"Kangal"],[40.301,37.832,"Koyulhisar"],[39.75,37.015,"Merkez"],[39.35,36.41,"Şarkışla"],[40.175,38.085,"Suşehri"],[39.443,37.041,"Ulaş"],[39.872,36.6,"Yıldızeli"],[39.897,37.759,"Zara"],
  /* Tekirdağ */ [41.286,28.0,"Çerkezköy"],[41.161,27.801,"Çorlu"],[41.239,27.711,"Ergene"],[41.214,27.107,"Hayrabolu"],[41.331,27.987,"Kapaklı"],[40.894,26.904,"Malkara"],[40.969,27.955,"Marmaraereğlisi"],[41.173,27.496,"Muratlı"],[41.441,27.921,"Saray"],[40.61,27.112,"Şarköy"],[40.977,27.516,"Süleymanpaşa"],
  /* Tokat */ [40.376,36.903,"Almus"],[40.116,36.3,"Artova"],[40.547,37.168,"Başçiftlik"],[40.672,36.568,"Erbaa"],[40.309,36.553,"Merkez"],[40.59,36.951,"Niksar"],[40.276,36.283,"Pazar"],[40.393,37.339,"Reşadiye"],[39.998,36.084,"Sulusaray"],[40.388,36.083,"Turhal"],[40.007,36.218,"Yeşilyurt"],[40.303,35.887,"Zile"],
  /* Trabzon */ [41.016,39.594,"Akçaabat"],[40.939,40.054,"Araklı"],[40.953,39.935,"Arsin"],[41.054,39.228,"Beşikdüzü"],[41.084,39.379,"Çarşıbaşı"],[40.746,40.242,"Çaykara"],[40.799,40.248,"Dernekpazarı"],[40.874,39.425,"Düzköy"],[40.889,40.368,"Hayrat"],[40.809,40.123,"Köprübaşı"],[40.814,39.611,"Maçka"],[40.949,40.27,"Of"],[41.003,39.724,"Ortahisar"],[40.941,39.193,"Şalpazarı"],[40.913,40.115,"Sürmene"],[40.886,39.291,"Tonya"],[41.048,39.279,"Vakfıkebir"],[40.959,39.851,"Yomra"],
  /* Tunceli */ [39.061,38.912,"Çemişgezek"],[39.108,39.219,"Hozat"],[39.02,39.604,"Mazgirt"],[39.106,39.548,"Merkez"],[39.18,39.829,"Nazımiye"],[39.358,39.216,"Ovacık"],[38.868,39.325,"Pertek"],[39.486,39.898,"Pülümür"],
  /* Uşak */ [38.74,29.753,"Banaz"],[38.398,28.969,"Eşme"],[38.319,29.529,"Karahallı"],[38.674,29.406,"Merkez"],[38.5,29.684,"Sivaslı"],[38.417,29.291,"Ulubey"],
  /* Van */ [38.123,42.807,"Bahçesaray"],[38.043,44.019,"Başkale"],[39.137,43.913,"Çaldıran"],[38.007,43.059,"Çatak"],[38.414,43.262,"Edremit"],[39.029,43.359,"Erciş"],[38.295,43.111,"Gevaş"],[38.323,43.409,"Gürpınar"],[38.496,43.393,"İpekyolu"],[38.99,43.761,"Muradiye"],[38.658,43.99,"Özalp"],[38.649,44.17,"Saray"],[38.525,43.354,"Tuşba"],
  /* Yalova */ [40.694,29.509,"Altınova"],[40.519,28.826,"Armutlu"],[40.665,29.323,"Çiftlikköy"],[40.647,29.117,"Çınarcık"],[40.657,29.284,"Merkez"],[40.606,29.174,"Termal"],
  /* Yozgat */ [39.66,35.883,"Akdağmadeni"],[40.129,35.286,"Aydıncık"],[39.193,35.246,"Boğazlıyan"],[39.243,35.514,"Çandır"],[39.305,35.645,"Çayıralan"],[40.069,35.495,"Çekerek"],[39.995,35.791,"Kadışehri"],[39.819,34.805,"Merkez"],[39.691,35.511,"Saraykent"],[39.494,35.375,"Sarıkaya"],[39.5,34.759,"Şefaatli"],[39.809,35.185,"Sorgun"],[39.211,35.002,"Yenifakılı"],[39.642,34.47,"Yerköy"],
  /* Zonguldak */ [41.18,31.386,"Alaplı"],[41.423,32.082,"Çaycuma"],[41.219,31.956,"Devrek"],[41.284,31.413,"Ereğli"],[41.306,32.143,"Gökçebey"],[41.492,31.839,"Kilimli"],[41.435,31.744,"Kozlu"],[41.452,31.788,"Merkez"],
  /* Çanakkale */ [39.602,26.4,"Ayvacık"],[39.809,26.612,"Bayramiç"],[40.226,27.247,"Biga"],[39.822,26.032,"Bozcaada"],[40.028,27.049,"Çan"],[40.184,26.359,"Eeceabat"],[39.787,26.335,"Ezine"],[40.414,26.67,"Gelibolu"],[40.161,25.84,"Gökçeada"],[40.344,26.683,"Lapseki"],[40.147,26.409,"Merkez"],[39.93,27.259,"Yenice"],
  /* Çankırı */ [40.816,33.075,"Atkaracalar"],[40.943,33.204,"Bayramören"],[40.812,32.892,"Çerkeş"],[40.53,33.497,"Eldivan"],[40.925,33.625,"Ilgaz"],[40.344,33.985,"Kızılırmak"],[40.735,33.518,"Korgun"],[40.843,33.263,"Kurşunlu"],[40.597,33.615,"Merkez"],[40.627,33.108,"Orta"],[40.483,33.282,"Şabanözü"],[40.757,33.779,"Yapraklı"],
  /* Çorum */ [40.168,34.841,"Alaca"],[40.642,34.258,"Bayat"],[40.022,34.608,"Boğazkale"],[40.858,34.811,"Dodurga"],[40.729,34.475,"İskilip"],[41.135,34.487,"Kargı"],[40.772,34.886,"Laçin"],[40.521,35.295,"Mecitözü"],[40.55,34.954,"Merkez"],[40.756,34.704,"Oğuzlar"],[40.273,35.251,"Ortaköy"],[40.971,34.801,"Osmancık"],[40.167,34.375,"Sungurlu"],[40.446,34.452,"Uğurludağ"],
  /* İstanbul */ [40.873,29.127,"Adalar"],[41.183,28.74,"Arnavutköy"],[40.997,29.099,"Ataşehir"],[40.98,28.722,"Avcılar"],[41.034,28.857,"Bağcılar"],[40.998,28.858,"Bahçelievler"],[40.981,28.874,"Bakırköy"],[41.118,28.807,"Başakşehir"],[41.035,28.911,"Bayrampaşa"],[41.043,29.006,"Beşiktaş"],[41.126,29.098,"Beykoz"],[41.0,28.645,"Beylikdüzü"],[41.037,28.985,"Beyoğlu"],[41.017,28.589,"Büyükçekmece"],[41.144,28.461,"Çatalca"],[41.016,29.191,"Çekmeköy"],[41.038,28.882,"Esenler"],[41.035,28.679,"Esenyurt"],[41.048,28.934,"Eyüpsultan"],[41.02,28.949,"Fatih"],[41.057,28.916,"Gaziosmanpaşa"],[41.016,28.877,"Güngören"],[40.99,29.029,"Kadıköy"],[41.086,28.982,"Kağıthane"],[40.888,29.186,"Kartal"],[41.006,28.797,"Küçükçekmece"],[40.925,29.131,"Maltepe"],[40.876,29.234,"Pendik"],[40.99,29.229,"Sancaktepe"],[41.167,29.057,"Sarıyer"],[41.178,29.613,"Şile"],[41.072,28.256,"Silivri"],[41.061,28.988,"Şişli"],[40.969,29.255,"Sultanbeyli"],[41.094,28.903,"Sultangazi"],[40.812,29.308,"Tuzla"],[41.026,29.097,"Ümraniye"],[41.026,29.014,"Üsküdar"],[40.995,28.911,"Zeytinburnu"],
  /* İzmir */ [38.801,26.973,"Aliağa"],[38.394,27.046,"Balçova"],[38.222,27.649,"Bayındır"],[38.465,27.168,"Bayraklı"],[39.119,27.177,"Bergama"],[38.087,28.21,"Beydağ"],[38.467,27.22,"Bornova"],[38.388,27.174,"Buca"],[38.323,26.302,"Çeşme"],[38.49,27.068,"Çiğli"],[39.075,26.889,"Dikili"],[38.669,26.755,"Foça"],[38.323,27.131,"Gaziemir"],[38.377,26.884,"Güzelbahçe"],[38.383,27.12,"Karabağlar"],[38.647,26.515,"Karaburun"],[38.463,27.108,"Karşıyaka"],[38.428,27.416,"Kemalpaşa"],[39.089,27.385,"Kınık"],[38.232,28.206,"Kiraz"],[38.423,27.142,"Konak"],[38.252,27.133,"Menderes"],[38.609,27.072,"Menemen"],[38.396,26.997,"Narlıdere"],[38.228,27.975,"Ödemiş"],[38.195,26.834,"Seferihisar"],[37.948,27.369,"Selçuk"],[38.089,27.732,"Tire"],[38.155,27.361,"Torbalı"],[38.324,26.765,"Urla"],
  /* Şanlıurfa */ [36.714,38.948,"Akçakale"],[37.024,37.99,"Birecik"],[37.362,38.523,"Bozova"],[36.847,40.049,"Ceylanpınar"],[37.148,38.783,"Eyyübiye"],[37.244,37.87,"Halfeti"],[37.167,38.795,"Haliliye"],[36.859,39.033,"Harran"],[37.588,38.954,"Hilvan"],[37.216,38.797,"Karaköprü"],[37.755,39.316,"Siverek"],[36.974,38.423,"Suruç"],[37.227,39.761,"Viranşehir"],
  /* Şırnak */ [37.57,43.166,"Beytüşşebap"],[37.332,42.185,"Cizre"],[37.471,41.916,"Güçlükonak"],[37.343,41.888,"Idil"],[37.518,42.462,"Merkez"],[37.247,42.469,"Silopi"],[37.447,42.847,"Uludere"],
];

/* ═══════════════════ YARDIMCI FONKSİYONLAR ═══════════════════ */
const EARTH_R = 6371; // km
const K_REFR = 4 / 3; // standart atmosfer kırılma faktörü

function destPoint(lat, lon, bearing, distKm) {
  const R = EARTH_R;
  const d = distKm / R;
  const brng = (bearing * Math.PI) / 180;
  const lat1 = (lat * Math.PI) / 180;
  const lon1 = (lon * Math.PI) / 180;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
  const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return { lat: (lat2 * 180) / Math.PI, lon: (lon2 * 180) / Math.PI };
}

function calcLOS(radarH, targetH, distKm) {
  // Dünya eğrilik düzeltmesi (4/3 model)
  const curv = (distKm * distKm) / (2 * K_REFR * EARTH_R);
  return targetH - radarH + curv;
}

const NUM_AZ = 24;
const AZ_STEP = 360 / NUM_AZ;
const NUM_RANGE = 16;

/* ═══════════════════ POLAR PLOT BOYUTLARI ═══════════════════ */
const PW = 460, PH = 460, PC = PW / 2;

/* ═══════════════════ ANA BİLEŞEN ═══════════════════ */
export default function HSMenzilHaritasi() {
  const [selIl, setSelIl] = useState(null);
  const [selSys, setSelSys] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState("");
  const [elevData, setElevData] = useState(null);
  const [coverage, setCoverage] = useState(null);
  const [error, setError] = useState(null);
  const [ilSearch, setIlSearch] = useState("");
  const [hovIl, setHovIl] = useState(null);
  const cacheRef = useRef({});

  // Harita referansı ve zoom/pan
  const mapRef = useRef(null);
  const [mZoom, setMZoom] = useState(1);
  const [mPan, setMPan] = useState({ x: 0, y: 0 });
  const [mDrag, setMDrag] = useState(false);
  const [mDragS, setMDragS] = useState({ x: 0, y: 0 });
  const [mPanS, setMPanS] = useState({ x: 0, y: 0 });

  const MW = 520, MH = 340;
  const mProj = useMemo(() => d3.geoMercator().center([35, 39.5]).scale(2800).translate([MW / 2, MH / 2]), []);
  const mPath = useMemo(() => d3.geoPath().projection(mProj), [mProj]);

  const borderGeoJSON = useMemo(() => ({
    type: "Feature",
    geometry: { type: "Polygon", coordinates: [turkeyBorder] },
  }), []);

  const neighborGeoJSONs = useMemo(() => neighborCountries.map(c => ({
    label: c.label,
    center: c.center,
    features: c.polys.map(ring => ({
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [ring] },
    })),
  })), []);

  // Filtrelenmiş iller
  const filteredIller = useMemo(() => {
    if (!ilSearch) return iller;
    const q = ilSearch.toLocaleLowerCase("tr-TR");
    return iller.filter(il => il.ad.toLocaleLowerCase("tr-TR").includes(q));
  }, [ilSearch]);

  /* ── Yükseklik verisi çekme ── */
  const fetchElevation = useCallback(async (il, sys) => {
    const key = `${il.ad}_${sys.name}`;
    if (cacheRef.current[key]) {
      setElevData(cacheRef.current[key]);
      return cacheRef.current[key];
    }

    setLoading(true);
    setError(null);

    const maxRange = sys.detRange;
    const rangeStep = maxRange / NUM_RANGE;
    const points = [];

    for (let az = 0; az < NUM_AZ; az++) {
      const bearing = az * AZ_STEP;
      for (let ri = 1; ri <= NUM_RANGE; ri++) {
        const dist = ri * rangeStep;
        const pt = destPoint(il.lat, il.lon, bearing, dist);
        points.push({ az, ri, ...pt });
      }
    }

    const delay = (ms) => new Promise(r => setTimeout(r, ms));

    const fetchBatch = async (batch, attempt = 0) => {
      const lats = batch.map(p => p.lat.toFixed(4)).join(",");
      const lons = batch.map(p => p.lon.toFixed(4)).join(",");
      const resp = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lons}`);
      if (resp.status === 429) {
        if (attempt >= 6) throw new Error("API hız limiti aşıldı, lütfen 30 saniye bekleyip tekrar deneyin");
        const wait = Math.pow(2, attempt + 2) * 1000; // 4s, 8s, 16s, 32s, 64s, 128s
        await delay(wait);
        return fetchBatch(batch, attempt + 1);
      }
      if (!resp.ok) throw new Error(`API hatası: ${resp.status}`);
      return resp.json();
    };

    try {
      const elevations = [];
      const batchSize = 100;
      const batches = [];
      for (let i = 0; i < points.length; i += batchSize) {
        batches.push(points.slice(i, i + batchSize));
      }

      for (let b = 0; b < batches.length; b++) {
        setLoadProgress(`Yükseklik verisi: ${b + 1}/${batches.length}`);
        if (b > 0) await delay(2000);
        const data = await fetchBatch(batches[b]);
        elevations.push(...data.elevation);
      }

      const result = points.map((p, i) => ({ ...p, elev: elevations[i] }));
      cacheRef.current[key] = result;
      setElevData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(`Yükseklik verisi alınamadı: ${err.message}`);
      setLoading(false);
      return null;
    }
  }, []);

  /* ── LOS hesaplama & kapsama alanı ── */
  useEffect(() => {
    if (!elevData || !selIl || !selSys) { setCoverage(null); return; }

    const radarH = selIl.rak + selSys.antH;
    const maxRange = selSys.detRange;
    const rangeStep = maxRange / NUM_RANGE;

    const azData = [];
    for (let az = 0; az < NUM_AZ; az++) {
      let maxAngle = -Infinity;
      const detR = [], trkR = [], guidR = [];
      let detMax = 0, trkMax = 0, guidMax = 0;

      for (let ri = 1; ri <= NUM_RANGE; ri++) {
        const idx = az * NUM_RANGE + (ri - 1);
        const pt = elevData[idx];
        if (!pt) continue;
        const dist = ri * rangeStep;
        const curvDrop = calcLOS(0, 0, dist);
        const effTargetH = pt.elev - radarH + curvDrop;
        const angle = Math.atan2(effTargetH, dist * 1000);

        const visible = angle >= maxAngle;
        if (angle > maxAngle) maxAngle = angle;

        if (visible) {
          if (dist <= selSys.detRange) { detR.push(ri); detMax = ri; }
          if (dist <= selSys.trkRange) { trkR.push(ri); trkMax = ri; }
          if (selSys.guidRange > 0 && dist <= selSys.guidRange) { guidR.push(ri); guidMax = ri; }
        }
      }

      azData.push({
        az: az * AZ_STEP,
        detVisible: detR,
        trkVisible: trkR,
        guidVisible: guidR,
        detMax, trkMax, guidMax,
      });
    }

    setCoverage({ azData, rangeStep, maxRange });
  }, [elevData, selIl, selSys]);

  /* ── İl ve sistem seçimi ── */
  const handleSelect = async (il, sys) => {
    setSelIl(il);
    setSelSys(sys);
    if (il && sys) {
      await fetchElevation(il, sys);
    }
  };

  /* ── Harita zoom/pan ── */
  const mWheel = useCallback((e) => {
    e.preventDefault();
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = (e.clientX - rect.left) / rect.width * MW;
    const my = (e.clientY - rect.top) / rect.height * MH;
    const f = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nz = Math.max(0.5, Math.min(10, mZoom * f));
    const r = nz / mZoom;
    setMPan(p => ({ x: mx - (mx - p.x) * r, y: my - (my - p.y) * r }));
    setMZoom(nz);
  }, [mZoom]);

  const mMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setMDrag(true);
    setMDragS({ x: e.clientX, y: e.clientY });
    setMPanS({ ...mPan });
  }, [mPan]);

  const mMouseMove = useCallback((e) => {
    if (!mDrag) return;
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMPan({
      x: mPanS.x + (e.clientX - mDragS.x) * (MW / rect.width),
      y: mPanS.y + (e.clientY - mDragS.y) * (MH / rect.height),
    });
  }, [mDrag, mDragS, mPanS]);

  const mMouseUp = useCallback(() => setMDrag(false), []);
  const mReset = () => { setMZoom(1); setMPan({ x: 0, y: 0 }); };

  /* ── Polar plot SVG path oluşturucu ── */
  const polarArc = useCallback((azIdx, riFrom, riTo, maxRi) => {
    const scale = (PC - 30) / NUM_RANGE;
    const a1 = ((azIdx * AZ_STEP - 90 - AZ_STEP / 2) * Math.PI) / 180;
    const a2 = ((azIdx * AZ_STEP - 90 + AZ_STEP / 2) * Math.PI) / 180;
    const r1 = riFrom * scale;
    const r2 = riTo * scale;
    const x1 = PC + r2 * Math.cos(a1), y1 = PC + r2 * Math.sin(a1);
    const x2 = PC + r2 * Math.cos(a2), y2 = PC + r2 * Math.sin(a2);
    const x3 = PC + r1 * Math.cos(a2), y3 = PC + r1 * Math.sin(a2);
    const x4 = PC + r1 * Math.cos(a1), y4 = PC + r1 * Math.sin(a1);
    return `M${x1},${y1} A${r2},${r2} 0 0,1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 0,0 ${x4},${y4} Z`;
  }, []);

  /* ── Polar plot hücreleri oluştur ── */
  const polarCells = useMemo(() => {
    if (!coverage) return [];
    const cells = [];

    coverage.azData.forEach((azD, azIdx) => {
      for (let ri = 1; ri <= NUM_RANGE; ri++) {
        const isGuid = azD.guidVisible.includes(ri);
        const isTrk = azD.trkVisible.includes(ri);
        const isDet = azD.detVisible.includes(ri);

        if (!isDet) continue;

        let fill, opacity;
        if (isGuid) {
          fill = C.green; opacity = 0.65;
        } else if (isTrk) {
          fill = C.amber; opacity = 0.45;
        } else {
          fill = C.red; opacity = 0.3;
        }

        cells.push(
          <path
            key={`${azIdx}-${ri}`}
            d={polarArc(azIdx, ri - 1, ri, NUM_RANGE)}
            fill={fill}
            opacity={opacity}
            stroke={fill}
            strokeWidth={0.3}
            strokeOpacity={0.2}
          />
        );
      }
    });

    return cells;
  }, [coverage, polarArc]);

  /* ── Polar plot ızgara çizgileri ── */
  const polarGrid = useMemo(() => {
    const scale = (PC - 30) / NUM_RANGE;
    const items = [];
    const ringCounts = [4, 8, 12, 16];
    const maxRange = selSys?.detRange || 100;

    ringCounts.filter(r => r <= NUM_RANGE).forEach(ri => {
      const r = ri * scale;
      items.push(
        <circle key={`ring-${ri}`} cx={PC} cy={PC} r={r} fill="none" stroke={C.border} strokeWidth={0.5} strokeDasharray="3,3" />
      );
      items.push(
        <text key={`rl-${ri}`} x={PC + 4} y={PC - r + 10} fill={C.textDim} fontSize={13} fontFamily="Inter, sans-serif">
          {Math.round(ri / NUM_RANGE * maxRange)} km
        </text>
      );
    });

    // Azimut çizgileri (her 30°)
    for (let a = 0; a < 360; a += 30) {
      const rad = ((a - 90) * Math.PI) / 180;
      const r = (PC - 30);
      items.push(
        <line key={`az-${a}`} x1={PC} y1={PC} x2={PC + r * Math.cos(rad)} y2={PC + r * Math.sin(rad)} stroke={C.border} strokeWidth={0.3} />
      );
    }

    // Yön etiketleri
    const dirs = [
      { l: "K", a: -90 }, { l: "KD", a: -45 }, { l: "D", a: 0 }, { l: "GD", a: 45 },
      { l: "G", a: 90 }, { l: "GB", a: 135 }, { l: "B", a: 180 }, { l: "KB", a: -135 },
    ];
    dirs.forEach(d => {
      const rad = (d.a * Math.PI) / 180;
      const r = PC - 14;
      items.push(
        <text key={`dir-${d.l}`} x={PC + r * Math.cos(rad)} y={PC + r * Math.sin(rad) + 3}
          textAnchor="middle" fill={C.textDim} fontSize={9} fontWeight="700" fontFamily="Inter, sans-serif">{d.l}</text>
      );
    });

    return items;
  }, [selSys]);

  const selectedIl = selIl || (hovIl !== null ? iller[hovIl] : null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, animation: "fadeUp 0.35s ease-out" }}>
      {/* Üst seçim barı */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        <Panel title="İL SEÇİMİ" glow={C.amber}>
          <input
            type="text"
            value={ilSearch}
            onChange={e => setIlSearch(e.target.value)}
            placeholder="İl adı ara..."
            style={{
              width: "100%", padding: "6px 10px", background: C.bg, border: `1px solid ${C.border}`,
              borderRadius: 5, color: C.white, fontSize: 13, fontFamily: FONT, outline: "none",
              marginBottom: 6, boxSizing: "border-box",
            }}
          />
          <div style={{ maxHeight: 120, overflowY: "auto", display: "flex", flexWrap: "wrap", gap: 3 }}>
            {filteredIller.map((il, i) => {
              const origIdx = iller.indexOf(il);
              const isSel = selIl?.ad === il.ad;
              return (
                <button key={origIdx} onClick={() => handleSelect(il, selSys)}
                  style={{
                    padding: "3px 7px", borderRadius: 5, fontSize: 11, fontWeight: isSel ? 800 : 600,
                    fontFamily: FONT, cursor: "pointer", border: `1px solid ${isSel ? C.amber : C.border}`,
                    background: isSel ? `${C.amber}20` : C.bg, color: isSel ? C.amber : C.text,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={() => setHovIl(origIdx)}
                  onMouseLeave={() => setHovIl(null)}
                >{il.ad}</button>
              );
            })}
          </div>
        </Panel>

        <Panel title="RADAR / SİSTEM SEÇİMİ" glow={C.cyan}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {radarSystems.map((sys, i) => {
              const isSel = selSys?.name === sys.name;
              return (
                <button key={i} onClick={() => handleSelect(selIl, sys)}
                  style={{
                    padding: "5px 10px", borderRadius: 5, fontSize: 12, fontWeight: isSel ? 800 : 600,
                    fontFamily: FONT, cursor: "pointer", border: `1px solid ${isSel ? sys.color : C.border}`,
                    background: isSel ? `${sys.color}20` : C.bg, color: isSel ? sys.color : C.text,
                    transition: "all 0.15s",
                  }}
                >
                  <div>{sys.name}</div>
                  <div style={{ fontSize: 10, color: C.textDim, marginTop: 1 }}>{sys.type} · {sys.detRange} km</div>
                </button>
              );
            })}
          </div>
        </Panel>
      </div>

      {/* Ana içerik */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {/* Sol: Türkiye haritası */}
        <Panel title="TÜRKİYE HARİTASI" sub={selectedIl ? `Seçili: ${selectedIl.ad} (${selectedIl.rak}m)` : "Bir il seçin"} glow={C.amber} noPad>
          <svg
            ref={mapRef} viewBox={`0 0 ${MW} ${MH}`}
            style={{ width: "100%", height: "auto", background: C.bg, cursor: mDrag ? "grabbing" : "grab", display: "block" }}
            onWheel={mWheel} onMouseDown={mMouseDown} onMouseMove={mMouseMove} onMouseUp={mMouseUp} onMouseLeave={mMouseUp} onDoubleClick={mReset}
          >
            <rect width={MW} height={MH} fill={C.bg} />
            <g transform={`translate(${mPan.x},${mPan.y}) scale(${mZoom})`}>
              {/* Izgara */}
              {[26,28,30,32,34,36,38,40,42,44].map(lng => {
                const p = mProj([lng, 39]);
                return p ? <line key={`gv${lng}`} x1={p[0]} y1={-300} x2={p[0]} y2={900} stroke={C.textMute} strokeWidth={0.3/mZoom} /> : null;
              })}
              {[36,37,38,39,40,41,42].map(lat => {
                const p = mProj([35, lat]);
                return p ? <line key={`gh${lat}`} x1={-200} y1={p[1]} x2={1100} y2={p[1]} stroke={C.textMute} strokeWidth={0.3/mZoom} /> : null;
              })}

              {/* Komşu ülkeler */}
              {neighborGeoJSONs.map((country, ci) => (
                <g key={ci}>
                  {country.features.map((feat, fi) => (
                    <path key={fi} d={mPath(feat)} fill="#0a1520" stroke={C.textMute} strokeWidth={Math.max(0.3, 0.6/mZoom)} opacity={0.7} />
                  ))}
                  {(() => {
                    const pt = mProj(country.center);
                    return pt ? (
                      <text x={pt[0]} y={pt[1]} textAnchor="middle" fill={C.textMute} fontSize={Math.max(4, 7/mZoom)}
                        fontWeight="600" fontFamily="Inter, sans-serif" opacity={0.6}
                        stroke={C.bg} strokeWidth={Math.max(0.5, 1.5/mZoom)} paintOrder="stroke"
                      >{country.label}</text>
                    ) : null;
                  })()}
                </g>
              ))}

              {/* Türkiye sınırı */}
              <path d={mPath(borderGeoJSON)} fill="#0c1c2e" stroke={C.borderHi} strokeWidth={Math.max(0.5, 1.2/mZoom)} />

              {/* İlçe noktaları (zoom > 3'te görünür) */}
              {mZoom > 3 && ilceData.map((d, i) => {
                const pt = mProj([d[1], d[0]]);
                if (!pt) return null;
                return (
                  <g key={`ilce${i}`}>
                    <circle cx={pt[0]} cy={pt[1]} r={Math.max(0.3, 0.7/mZoom)} fill={C.cyan} opacity={0.5} />
                    {mZoom > 5 && (
                      <text x={pt[0]} y={pt[1] - 1.5/mZoom} textAnchor="middle"
                        fill={C.cyan} fontSize={Math.max(2, 3.5/mZoom)} fontFamily="Inter, sans-serif" opacity={0.6}
                        stroke={C.bg} strokeWidth={Math.max(0.3, 0.8/mZoom)} paintOrder="stroke"
                      >{d[2]}</text>
                    )}
                  </g>
                );
              })}

              {/* 81 il noktaları */}
              {iller.map((il, i) => {
                const pt = mProj([il.lon, il.lat]);
                if (!pt) return null;
                const isSel = selIl?.ad === il.ad;
                const isHov = hovIl === i;
                const r = Math.max(1, (isSel ? 4 : isHov ? 3 : 1.5) / mZoom);
                return (
                  <g key={i} style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovIl(i)}
                    onMouseLeave={() => setHovIl(null)}
                    onClick={() => handleSelect(il, selSys)}
                  >
                    {isSel && <circle cx={pt[0]} cy={pt[1]} r={r * 3} fill="none" stroke={C.amber} strokeWidth={Math.max(0.3, 0.8/mZoom)} opacity={0.5} />}
                    <circle cx={pt[0]} cy={pt[1]} r={r} fill={isSel ? C.amber : isHov ? C.white : C.textDim} stroke={C.bg} strokeWidth={Math.max(0.2, 0.5/mZoom)} />
                    {(isSel || isHov || mZoom > 2) && (
                      <text x={pt[0]} y={pt[1] - r - 2/mZoom} textAnchor="middle"
                        fill={isSel ? C.amber : C.text} fontSize={Math.max(3, (isSel ? 7 : 5) / mZoom)}
                        fontWeight="700" fontFamily="Inter, sans-serif"
                        stroke={C.bg} strokeWidth={Math.max(0.5, 1.5/mZoom)} paintOrder="stroke"
                      >{il.ad}</text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Zoom göstergesi */}
            <rect x={4} y={MH-18} width={50} height={14} rx={2} fill={`${C.panel}cc`} stroke={C.border} strokeWidth={0.5} />
            <text x={29} y={MH-8} textAnchor="middle" fill={C.textDim} fontSize={11} fontFamily="Inter, sans-serif">{mZoom.toFixed(1)}x</text>
          </svg>
        </Panel>

        {/* Sağ: Radar polar plot */}
        <Panel
          title={selSys ? `${selSys.name} — ARAZİ MASKELEME` : "RADAR KAPSAMA ALANI"}
          sub={selIl && selSys ? `${selIl.ad} (${selIl.rak}m) · Anten: +${selSys.antH}m · Maks: ${selSys.detRange} km` : "İl ve sistem seçin"}
          glow={C.cyan}
          noPad
        >
          <div style={{ position: "relative" }}>
            <svg viewBox={`0 0 ${PW} ${PH}`} style={{ width: "100%", height: "auto", background: C.bg, display: "block" }}>
              {/* Arkaplan */}
              <rect width={PW} height={PH} fill={C.bg} />

              {/* Izgara */}
              {polarGrid}

              {/* Merkez noktası */}
              <circle cx={PC} cy={PC} r={3} fill={C.white} stroke={C.bg} strokeWidth={2} />

              {/* Kapsama hücreleri */}
              {loading ? (
                <>
                  <text x={PC} y={PC + 20} textAnchor="middle" fill={C.amber} fontSize={13} fontFamily="Inter, sans-serif">
                    Yükleniyor...
                  </text>
                  <text x={PC} y={PC + 38} textAnchor="middle" fill={C.textDim} fontSize={11} fontFamily="Inter, sans-serif">
                    {loadProgress}
                  </text>
                </>
              ) : error ? (
                <>
                  <text x={PC} y={PC + 20} textAnchor="middle" fill={C.red} fontSize={13} fontFamily="Inter, sans-serif">
                    {error}
                  </text>
                  <foreignObject x={PC - 50} y={PC + 32} width={100} height={30}>
                    <button
                      onClick={() => { if (selIl && selSys) handleSelect(selIl, selSys); }}
                      style={{
                        width: "100%", padding: "4px 0", background: `${C.red}20`, border: `1px solid ${C.red}50`,
                        borderRadius: 5, color: C.red, fontSize: 12, fontWeight: 700, fontFamily: FONT,
                        cursor: "pointer",
                      }}
                    >
                      Tekrar Dene
                    </button>
                  </foreignObject>
                </>
              ) : coverage ? (
                polarCells
              ) : (
                <text x={PC} y={PC + 30} textAnchor="middle" fill={C.textDim} fontSize={13} fontFamily="Inter, sans-serif">
                  İl ve radar seçimi yapın
                </text>
              )}

              {/* Merkez üstü beyaz nokta (en üstte) */}
              {coverage && <circle cx={PC} cy={PC} r={4} fill={C.white} stroke={C.amber} strokeWidth={1.5} />}
            </svg>

            {/* Lejant */}
            <div style={{
              position: "absolute", bottom: 8, right: 8,
              background: `${C.panel}ee`, padding: "6px 10px", borderRadius: 4,
              border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 3,
            }}>
              {[
                { l: "Tespit Menzili", c: C.red, o: 0.3 },
                { l: "Takip Menzili", c: C.amber, o: 0.45 },
                { l: "Güdüm Menzili", c: C.green, o: 0.65 },
                { l: "Arazi Maskesi", c: C.bg, o: 1, border: true },
              ].map((x, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{
                    width: 14, height: 8, borderRadius: 1,
                    background: x.c, opacity: x.o,
                    border: x.border ? `1px solid ${C.border}` : "none",
                  }} />
                  <span style={{ fontSize: 10, color: C.textDim, fontFamily: FONT }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Sistem bilgi kartları */}
      {selSys && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
          {[
            { l: "Tespit Menzili", v: `${selSys.detRange} km`, c: C.red },
            { l: "Takip Menzili", v: `${selSys.trkRange} km`, c: C.amber },
            { l: "Güdüm Menzili", v: selSys.guidRange > 0 ? `${selSys.guidRange} km` : "—", c: C.green },
            { l: "Anten Yüksekliği", v: `+${selSys.antH} m`, c: C.cyan },
            { l: "Sistem Türü", v: selSys.type, c: C.purple },
          ].map((x, i) => (
            <Panel key={i} glow={x.c}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1, textTransform: "uppercase", fontFamily: FONT }}>{x.l}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: x.c, textShadow: glow(x.c), fontFamily: MONO }}>{x.v}</div>
              </div>
            </Panel>
          ))}
        </div>
      )}

      {/* Seçili il bilgisi */}
      {selIl && (
        <Panel title={`${selIl.ad} — KONUM BİLGİSİ`} glow={C.amber}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, fontSize: 12, fontFamily: FONT }}>
            <div>
              <span style={{ color: C.textDim }}>Enlem: </span>
              <span style={{ color: C.white, fontWeight: 700 }}>{selIl.lat.toFixed(2)}°N</span>
            </div>
            <div>
              <span style={{ color: C.textDim }}>Boylam: </span>
              <span style={{ color: C.white, fontWeight: 700 }}>{selIl.lon.toFixed(2)}°E</span>
            </div>
            <div>
              <span style={{ color: C.textDim }}>Rakım: </span>
              <span style={{ color: C.amber, fontWeight: 700 }}>{selIl.rak} m</span>
            </div>
            <div>
              <span style={{ color: C.textDim }}>Toplam Anten: </span>
              <span style={{ color: C.cyan, fontWeight: 700 }}>{selIl.rak + (selSys?.antH || 0)} m</span>
            </div>
          </div>
        </Panel>
      )}

      {/* Alt bilgi */}
      <div style={{
        fontSize: 10, padding: "8px 12px", background: C.panel, borderRadius: 4,
        border: `1px solid ${C.border}`, fontFamily: FONT, color: C.textDim,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
      }}>
        <div><span style={{ color: C.green }}>{"●"}</span> Yeşil = Güdüm | <span style={{ color: C.amber }}>{"●"}</span> Amber = Takip | <span style={{ color: C.red }}>{"●"}</span> Kırmızı = Tespit</div>
        <div>Yükseklik verisi: Copernicus DEM GLO-90 (90m çözünürlük) · Open-Meteo API</div>
        <div>4/3 Dünya eğrilik modeli · Standart atmosfer kırılma faktörü</div>
        <div>Tahmini değerler · Gerçek menziller sınıflı bilgidir</div>
      </div>
    </div>
  );
}
