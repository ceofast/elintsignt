import { useState } from "react";
import { C, FONT, MONO, glow, forceColor } from "../theme";
import { Panel, Badge, ForceTag } from "../components";

const productDB = [
  { id:"koral", name:"KORAL (Kara SOJ)", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"Kara Konuşlu Radar ES/EA", img:"📡",
    summary:"Türkiye'nin amiral gemisi kara konuslu stand-off jammer sistemi. Temmuz 2009'da başlayan proje kapsamında geliştirilen KORAL, Şubat 2016'da Hava Kuvvetleri envanterine girmiştir. DRFM mimarisi sayesinde düşman radar sinyallerini yakalayıp sahte hedef, hız kayması ve mesafe hataları üretebilir. Suriye Bahar Kalkanı Harekâtı'nda (2020) Rus yapımı Pantsir-S1 sistemlerini başarıyla karıştırarak Türk İHA'larının etkili operasyonlar yürütmesini sağlamış, Libya'da da muharebe kanıtlanmıştır. Fas'a 50,7 milyon dolarlık ihracat sözleşmesiyle ilk uluslararası müşterisine ulaşmıştır.",
    specs:[
      {k:"Proje Başlangıcı",v:"Temmuz 2009"},{k:"Envanter Girişi",v:"Şubat 2016 (HvKK)"},{k:"Üretilen Adet",v:"5 sistem (ilk parti)"},{k:"Konfigürasyon",v:"4x Radar ES aracı + 1x Radar EA aracı"},{k:"Platform",v:"8x8 taktik tekerlekli araç (her biri)"},{k:"Araçlar Arası Mesafe",v:"500 metreye kadar konuşlanabilir"},{k:"Frekans Aralığı",v:"0,5 – 18 GHz (VHF, UHF, L, S, C, X bantları)"},{k:"Etkin Menzil",v:"150–200+ km"},{k:"Operasyonel İrtifa",v:"12.000 metreye kadar"},{k:"Anten Teknolojisi",v:"Faz dizili anten (Phased Array)"},{k:"Karıştırma Teknolojisi",v:"DRFM tabanlı (baraj, nokta, tarama, aldatma)"},{k:"Kanal Başı Karıştırma Gücü",v:"50 Watt"},{k:"Operatör",v:"2 operatör + 1 amir (Operasyon Kontrol Birimi)"},{k:"NBC Koruma",v:"Evet (NATO standart)"},{k:"Çalışma Sıcaklığı",v:"-30°C — +50°C"},{k:"Nem Oranı",v:"%95'e kadar"},{k:"Standartlar",v:"MIL-STD-810F, MIL-STD-461E/464A"},{k:"İhracat",v:"Fas (50,7 milyon USD)"},{k:"Muharebe Kanıtı",v:"Bahar Kalkanı 2020 (Pantsir-S1), Libya"},
    ],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Hava Savunma Baskılama","İHA Operasyon Desteği","EOB Haritalama","Sınır Güvenliği","İhracat"],
  },
  { id:"koral100", name:"KORAL 100 (Modernize)", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"Kara Konuşlu Radar ES/EA (Modernize)", img:"📡",
    summary:"KORAL'ın modernize versiyonu olup Eylül 2025'te geliştirmesi tamamlanarak TSK'ya teslim edilmiştir. AESA (Aktif Elektronik Taramalı Dizi) anten teknolojisine geçişle birlikte daha geniş frekans kapsamı, artırılmış çıkış gücü ve birden fazla hedefe eş zamanlı karıştırma/aldatma yeteneği kazanmıştır. Gelişmiş LPI (Düşük Yakalama Olasılıklı) radar tespiti ve daha hızlı tepki süresiyle modern tehditlere karşı etkinliği önemli ölçüde artırılmıştır. Çelik Kubbe çok katmanlı hava savunma mimarisine entegre edilmiştir.",
    specs:[{k:"Baz Sistem",v:"KORAL"},{k:"Modernizasyon Tamamlanma",v:"Eylül 2025"},{k:"Anten Tipi",v:"AESA (Aktif Elektronik Taramalı Dizi)"},{k:"Frekans Kapsamı",v:"Orijinal KORAL'a göre genişletilmiş bant genişliği"},{k:"Çıkış Gücü",v:"Orijinal KORAL'a göre artırılmış"},{k:"Eş Zamanlı Hedef",v:"Birden fazla hedefe eş zamanlı karıştırma/aldatma"},{k:"LPI Tespiti",v:"Düşük yakalama olasılıklı radarlara karşı gelişmiş tespit"},{k:"Reaksiyon Süresi",v:"Daha hızlı tepki süresi"},{k:"Entegrasyon",v:"Çelik Kubbe çok katmanlı hava savunma sistemi"},{k:"Platform",v:"8x8 taktik tekerlekli araç"},{k:"NATO Uyumluluğu",v:"Evet"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Hava Savunma Baskılama","Çelik Kubbe Entegrasyonu","LPI Radar Tespiti"],
  },
  { id:"koral200", name:"KORAL 200 (Yeni Nesil)", producer:"ASELSAN", force:"hava", status:"Üretimde", statusColor: C.cyan,
    type:"Kara Konuşlu Radar ES/EA (Yeni Nesil)", img:"📡",
    summary:"ASELSAN'ın yeni nesil mobil radar elektronik harp sistemi olup IDEF 2023'te maket, IDEF 2025'te (Temmuz 2025) ilk kez ürün olarak tanıtılmıştır. Orijinal KORAL'a kıyasla yaklaşık 2 kat güç artışı sunan sistem, ED ve EA yeteneklerini tek bir modüler platformda birleştirmektedir. ASELSAN Genel Müdürü Ahmet Akyol'un ifadesiyle İHA ve savaş uçakları için 'elektronik otoyol' açma kapasitesine sahiptir. Görev Planlama Aracı ile operasyon öncesi tehdit modelleme, Görev Analiz Aracı ile operasyon sonrası değerlendirme yapabilir. Çelik Kubbe mimarisine dahil edilen beşinci yeni sistemdir.",
    specs:[{k:"İlk Sergileme",v:"IDEF 2023 (maket)"},{k:"Ürün Tanıtımı",v:"IDEF 2025 (Temmuz 2025)"},{k:"Güç Artışı",v:"~2x (orijinal KORAL'a göre)"},{k:"Mimari",v:"ED + EA tek modüler platformda"},{k:"ED Alt Sistemi",v:"Çoklu alıcı mimarisi, geniş anlık bant genişliği"},{k:"Yön Bulma",v:"Yüksek hassasiyetli yön bulma, düşük CEP"},{k:"Tespit Yeteneği",v:"CW, LPI ve yoğun PRF ortamlarında etkin"},{k:"EA Alt Sistemi",v:"Dijital entegre, faz dizili antenler, yüksek çıkış gücü"},{k:"DRFM",v:"Sahte hedef, hız kayması, mesafe hatası üretimi"},{k:"Görev Planlama",v:"Operasyon öncesi konfigürasyon ve tehdit modelleme aracı"},{k:"Görev Analiz",v:"Operasyon sonrası kapsamlı analiz aracı"},{k:"Kontrol",v:"3 adet NATO uyumlu operatör konsolu"},{k:"NBC Koruma",v:"Evet"},{k:"Entegrasyon",v:"Çelik Kubbe hava savunma mimarisi"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Hava Savunma Baskılama","Elektronik Otoyol/Koridor Açma","Çelik Kubbe Entegrasyonu","İhracat"],
  },
  { id:"vural", name:"VURAL (REDET-II)", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Radar ES/EA", img:"📡",
    summary:"KORAL'ın taktik tamamlayıcısı olarak tamamen yerli yazılım ve donanımla geliştirilen kara konuşlu taşınabilir radar EH sistemidir. 0,4–40 GHz gibi çok geniş bir frekans bandında faaliyet göstererek düşman radar emisyonlarını tespit, dinleme, sınıflandırma ve etkisizleştirme görevlerini yürütür. Modüler çoklu alıcı mimarisi sayesinde Elektronik Harp Düzeni (EOB) haritası oluşturabilir. Teslimatları 2 Mayıs 2022'de SSB Başkanı İsmail Demir tarafından tamamlandığı duyurulmuştur. İhracat modeli VURAL 100 olarak Polonya'ya 410 milyon dolarlık sözleşme kapsamında pazarlanmıştır.",
    specs:[{k:"Proje Adı",v:"REDET-II"},{k:"İlk Teslimat",v:"Ocak 2022"},{k:"Teslimat Tamamlanma",v:"2 Mayıs 2022"},{k:"Frekans Aralığı",v:"0,4 – 40 GHz"},{k:"Anten Tipi",v:"Aktif faz dizili anten (Active Phased Array)"},{k:"Alıcı Mimarisi",v:"Modüler çoklu alıcı (multi-receiver)"},{k:"ED Yetenekleri",v:"Tespit, dinleme, tanımlama, yön bulma, parametre çıkarma"},{k:"Ölçülen Parametreler",v:"PRF, darbe genişliği, modülasyon, anten tarama örüntüsü"},{k:"Radar Türleri",v:"Darbeli, sürekli dalga (CW), çevik radarlar"},{k:"EOB Yeteneği",v:"Elektronik Harp Düzeni haritası + otomatik yayın listesi"},{k:"EA Yetenekleri",v:"Çoklu düşman radarlarını eş zamanlı karıştırma/aldatma"},{k:"Yazılım/Donanım",v:"Tamamen yerli ve milli"},{k:"Platform",v:"Taktik tekerlekli araç"},{k:"İhracat Modeli",v:"VURAL 100"},{k:"İhracat",v:"Polonya (410 milyon USD, Aralık 2025)"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","EOB Haritalama","ELINT","Sınır Güvenliği","NATO Operasyonları","İhracat"],
  },
  { id:"sancak", name:"SANCAK / MİLKAR-4A2", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"HF Haberleşme Elektronik Taarruz", img:"📻",
    summary:"ASELSAN tarafından geliştirilen MİLKAR-4A2 HF Elektronik Taarruz Sistemi'nin operasyonel adıdır. HF bandında (3–30 MHz) yer dalgası, gökyüzü dalgası ve NVIS yoluyla haberleşme yapan hedeflere karşı etkin karıştırma uygulayabilir. Yüksek hassasiyetli alıcılar ile zayıf sinyallerin tespiti ve analizi yapan temel Elektronik Destek yeteneğine de sahiptir. Temmuz 2021'de TSK Kara Kuvvetleri'ne ilk teslimatı gerçekleştirilmiştir.",
    specs:[{k:"Proje Adı",v:"MİLKAR-4A2 (Operasyonel ad: SANCAK)"},{k:"Frekans Aralığı",v:"3–30 MHz (HF bandı)"},{k:"Platform",v:"Tek adet 10 ton shelterli taktik tekerlekli araç"},{k:"Karıştırma Modları",v:"Yer dalgası, gökyüzü dalgası, NVIS"},{k:"Anten Yapısı",v:"Yer dalgası anteni + gökyüzü dalgası/NVIS anteni"},{k:"Güç Yükselteci",v:"Geniş bant yüksek RF çıkış gücü, hızlı anahtarlamalı"},{k:"ED Yeteneği",v:"Yüksek hassasiyetli alıcılar ile sinyal tespiti ve analizi"},{k:"Sistem Bileşenleri",v:"Çift güç jeneratörü, klima, antenler, shelter (tek araçta)"},{k:"İlk Teslimat",v:"Temmuz 2021 (KKK)"},{k:"Hareketlilik",v:"Yüksek — tüm ekipman tek araçta, engebeli arazide mobilite"}],
    scenarios:["Konvansiyonel Savaş","Asimetrik Savaş","HF Haberleşme Engelleme","Sınır Güvenliği","Sınır Ötesi Operasyonlar","Aldatma (Sahte Veri Enjeksiyonu)"],
  },
  { id:"ilgar", name:"ILGAR 3-LT / NG / 340", producer:"ASELSAN", force:"kara", status:"Envanterde/Üretimde", statusColor: C.green,
    type:"V/UHF Haberleşme Elektronik Taarruz", img:"📻",
    summary:"ASELSAN tarafından geliştirilen MİLKAR-3A3 V/UHF Karıştırma Sistemi'nin modernize versiyonudur. ILGAR 3-LT temel versiyon, ILGAR 3-LT/NG ise kısmi SHF kapsama eklenmiş yeni nesil versiyondur. Yüksek çıkış gücü, gelişmiş görev planlama yazılımı, reaktif karıştırma yeteneği ve dost frekans koruması gibi özelliklere sahiptir. İlk teslimat Aralık 2021'de TSK'ya gerçekleştirilmiş olup ILGAR 340 ihracat modelidir.",
    specs:[{k:"Proje Adı",v:"MİLKAR-3A3 (Modernize: ILGAR)"},{k:"ILGAR 3-LT Frekans",v:"30–3000 MHz (V/UHF bandı)"},{k:"ILGAR 3-LT/NG Frekans",v:"V/UHF + kısmi SHF"},{k:"ILGAR 340",v:"İhracat versiyonu"},{k:"Platform",v:"4x4 taktik tekerlekli araç (iki araç: alt ve üst frekans bantları)"},{k:"Karıştırma Türleri",v:"Sürekli, look-through, hedef-tetiklemeli, reaktif"},{k:"Güç Yükselteci",v:"Geniş bant yüksek güçlü RF çıkış"},{k:"Alıcı",v:"Geniş anlık bant genişliğine sahip geniş bantlı alıcı"},{k:"Dost Koruma",v:"Dost telsiz frekansları için koruma tanımlama"},{k:"İlk Teslimat",v:"Aralık 2021 (TSK)"},{k:"Yazılım",v:"Milli yazılım ve donanım altyapısı, gelişmiş görev planlama"}],
    scenarios:["Konvansiyonel Savaş","Asimetrik Savaş","V/UHF Haberleşme Engelleme","Karşı-İHA","Sınır Güvenliği","Uydu Haberleşme Engelleme (NG/SHF)","İhracat"],
  },
  { id:"gergedan", name:"GERGEDAN Ailesi", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Haberleşme EA (Telsiz/GSM/RCIED)", img:"📻",
    summary:"ASELSAN tarafından geliştirilen taşınabilir RF Aktif Koreltme/Karıştırma Sistemi ailesidir. GERGEDAN (araç tipi RCIED karıştırıcı), GERGEDAN 3-LCT ve 3-U (V/UHF haberleşme karıştırıcı), Anti-Drone (sırt çantası+tabanca tipi, 11,5 kg) varyantlarını içerir. DDS tabanlı FPGA kontrollü taramalı karıştırma ile telsiz, cep telefonu (GSM/3G/4G), Wi-Fi, GPS ve RF uzaktan kumanda sinyallerini etkisizleştirir. Araç bağımsız yapısı sayesinde SUV'dan askeri araca her platforma entegre edilebilir.",
    specs:[{k:"Varyantlar",v:"GERGEDAN (Araç), 3-LCT, 3-U, Anti-Drone"},{k:"Karıştırma Yöntemi",v:"DDS tabanlı FPGA kontrollü taramalı karıştırma (Yazılım Tanımlı)"},{k:"Hedef Sinyaller",v:"RC, PMR/FRS, GPS, WLAN, ISM, GSM 900, DCS 1800, 3G, 4G"},{k:"Anten",v:"Yönlü + çok yönlü (yarı-küresel koruma şemsiyesi)"},{k:"Karıştırıcı Kutu Ağırlığı",v:"<60 kg (araç tipi)"},{k:"Anti-Drone Ağırlık",v:"11,5 kg sırt çantası + 2 kg el tabancası"},{k:"Anti-Drone Pil Süresi",v:"~1,5 saat (Li-ion)"},{k:"Çalışma Sıcaklığı",v:"-30°C ile +50°C"},{k:"Programlanabilirlik",v:"Sahada dizüstü bilgisayar ile profil düzenlenebilir"},{k:"GERGEDAN 3-U Platform",v:"İHA platformlarına da entegre edilebilir"},{k:"Araç Uyumu",v:"Araç bağımsız — SUV, 4x4, askeri araç, minibüs"}],
    scenarios:["Karşı-EYP/RCIED","Asimetrik Savaş","Karşı-İHA/Drone","VIP Koruma","Konvoy Koruma","Sınır Güvenliği","Kritik Tesis Koruma"],
  },
  { id:"puhu", name:"PUHU 3-LT / 4-LCT", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"V/UHF COMINT / Elektronik Destek", img:"🔍",
    summary:"V/UHF bandında düşman haberleşmesini dinleme, konum tespiti ve analiz yapan mobil Elektronik Destek sistemi ailesidir. PUHU 3-LT mobil V/UHF ES sistemi olup Çelik Kubbe projesi kapsamında 7 adet teslim edilmiştir. PUHU 4-LCT ise yarı sabit dairesel monopol anten konfigürasyonuna sahip versiyondur. Yüksek hassasiyetli alıcıları ile zayıf sinyalleri dahi tespit edebilir ve yön bulma yeteneğiyle hedef konumlandırma yapabilir.",
    specs:[{k:"PUHU 3-LT",v:"Mobil V/UHF ES sistemi"},{k:"PUHU 3-LT Teslimat",v:"Çelik Kubbe kapsamında 7 adet"},{k:"PUHU 4-LCT",v:"Yarı sabit, dairesel monopol anten konfigürasyonu"},{k:"Frekans Aralığı",v:"V/UHF bandı"},{k:"ED Yetenekleri",v:"Tespit, takip, izleme, analiz, yön bulma"},{k:"Alıcı Hassasiyeti",v:"Yüksek — zayıf sinyallerin tespiti"},{k:"Konum Tespiti",v:"Yön bulma ile hedef konumlandırma"},{k:"Platform",v:"Mobil araç üstü (3-LT) / Yarı sabit (4-LCT)"}],
    scenarios:["COMINT/SIGINT","Asimetrik Savaş","Terörle Mücadele","Sınır Güvenliği","VIP Koruma","Hedef Konumlandırma"],
  },
  { id:"karakulak", name:"KARAKULAK", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"HF Yön Bulma / Dinleme", img:"🔍",
    summary:"HF bandında çalışan yön bulma ve dinleme sistemidir. İki adet 5 ton taktik araç üzerinde konuşlanır ve HF frekans bandındaki iletişimleri tespit ederek kaynak konumunu belirler. İlk teslimat Eylül 2020'de gerçekleştirilmiştir. Sınır güvenliği operasyonlarında ve terörle mücadelede düşman HF haberleşme ağlarının izlenmesi ve konumlandırılması için kritik istihbarat sağlar.",
    specs:[{k:"Frekans Aralığı",v:"HF bandı (3–30 MHz)"},{k:"Platform",v:"2x 5 ton taktik tekerlekli araç"},{k:"İlk Teslimat",v:"Eylül 2020"},{k:"Yön Bulma",v:"HF kaynak konumlandırma"},{k:"Dinleme",v:"HF haberleşme dinleme ve kayıt"},{k:"Analiz",v:"Sinyal parametresi çıkarma ve sınıflandırma"}],
    scenarios:["COMINT/SIGINT","Asimetrik Savaş","Terörle Mücadele","Sınır Güvenliği","HF İstihbarat Toplama"],
  },
  { id:"kangal", name:"KANGAL Ailesi", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Karşı-EYP / Karşı-İHA Karıştırıcı", img:"🛡️",
    summary:"RF kontrollü EYP düzeneklerine ve mini/mikro İHA'lara karşı aktif karıştırma/bostutma yapan modüler jammer ailesidir. Araç üstü (BMC Vuran, Kirpi), sırt tipi (KANGAL-MP), bomba imha (KANGAL EOD), deniz (KANGAL-D) ve FPV karşıtı (KANGAL-FPV) varyantları bulunur. Yazılım tabanlı yapısı sayesinde frekans bandı önceliklendirmesi ve RF çıkış gücü dağıtımı sahada programlanabilir. İlk teslimatlar Aralık 2019'da gerçekleşmiştir.",
    specs:[{k:"Varyantlar",v:"KANGAL (Araç), KANGAL-MP (Sırt), KANGAL EOD, KANGAL-D (Deniz), KANGAL-FPV"},{k:"Karıştırma Yöntemi",v:"DDS tabanlı FPGA kontrollü taramalı karıştırma (swept jamming)"},{k:"Anten Tipi",v:"Omni-yönlü antenler"},{k:"Araç Entegrasyonu",v:"BMC Vuran, Kirpi, Kirpi-II 4x4, SUV, deniz platformları"},{k:"KANGAL-MP RF Gücü",v:"<130 Watt"},{k:"KANGAL-MP Güç Kaynağı",v:"Li-Ion pil"},{k:"KANGAL-FPV Ağırlığı",v:"<25 kg"},{k:"KANGAL-FPV Pil Süresi",v:">1 saat (pille), sınırsız (şebeke gücünde)"},{k:"KANGAL-FPV Karıştırma",v:"Mini/Mikro İHA, FPV RC/video, GNSS (GPS/GALILEO/GLONASS/BEIDOU), veri bağlantısı"},{k:"KANGAL-FPV Tipi",v:"Reaktif jammer (frekans atlama takibi)"},{k:"İlk Teslimat",v:"Aralık 2019"},{k:"Sipariş Makamı",v:"SSB (EGM ve HvKK ihtiyacı)"}],
    scenarios:["Karşı-EYP/RCIED","Konvoy Koruma","Karşı-İHA/FPV","Bomba İmha (EOD)","Asimetrik Savaş","Deniz Platformu Koruma","Kritik Tesis Koruma"],
  },
  { id:"ihtar", name:"İHTAR", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Entegre Karşı-İHA Sistemi", img:"🛡️",
    summary:"Mini ve mikro İHA tehditlerini kentsel ve kırsal ortamlarda etkisizleştirmek için geliştirilen entegre anti-drone sistemidir. ACAR radarı (tespit/takip), EO/IR sensörler (tanıma) ve GERGEDAN RF karıştırma (yumuşak imha) alt sistemlerini tek çatı altında birleştirir. 360° yarı küresel koruma şemsiyesi oluşturarak tek İHA'dan sürüye kadar çeşitli senaryolara karşı savunma sağlar. KKTC, Kırgızistan, Nijer ve Angola'ya ihraç edilmiş, Polonya'ya 410 milyon dolarlık EH paketi kapsamında da satışı gerçekleşmiştir.",
    specs:[{k:"Varyantlar",v:"İHTAR (sabit), İHTAR Mobil, İHTAR 100, İHTAR 100/S"},{k:"Radar",v:"ACAR arama ve takip radarı (her hava, gece/gündüz)"},{k:"Mini-İHA Tespit Menzili",v:"5 km (RCS: 0,5 m², 10° irtifa kapsamı)"},{k:"Enstrümante Menzil",v:"15 km veya 40 km (konfigürasyona bağlı)"},{k:"EO/IR Sensör",v:"TV kamera + termal kamera, otomatik video takibi"},{k:"Karıştırma",v:"GERGEDAN RF Jammer (RC, PMR, GPS, WLAN, GSM, 3G, 4G)"},{k:"Koruma Geometrisi",v:"Yarı küresel (semi-spherical) koruma şemsiyesi"},{k:"Sert İmha Opsiyonu",v:"40 mm bombatar (ŞAHİN), lazer silah entegrasyonu"},{k:"İhracat",v:"KKTC, Kırgızistan, Nijer, Angola"},{k:"Polonya Anlaşması",v:"410 milyon USD EH paketi kapsamında"}],
    scenarios:["Karşı-İHA","Kritik Tesis Koruma","Kentsel Güvenlik","Askeri Üs Savunma","Sürü Saldırısı Savunma","NATO/Koalisyon","Çelik Kubbe Entegrasyonu","İhracat"],
  },
  { id:"bukalemun", name:"BUKALEMUN", producer:"ASELSAN", force:"kara", status:"Üretimde", statusColor: C.cyan,
    type:"GNSS Aldatma (Spoofing) Sistemi", img:"🛡️",
    summary:"İHA'ların Multi-GNSS alıcılarını aldatarak seyir rotalarını ve konum bilgisini manipüle eden özel EH sistemidir. GPS, GALILEO, GLONASS ve BEIDOU dahil tüm ana uydu navigasyon sinyallerini taklit ederek hedef İHA'nın operatörünün ekranında yanlış konum göstermesini sağlar. Statik ve dinamik aldatma yetenekleriyle önemli mesafelerde etkili çalışabilir. SAHA EXPO 2024'te (22–26 Ekim 2024) ilk kez kamuoyuna tanıtılmıştır.",
    specs:[{k:"İlk Tanıtım",v:"SAHA EXPO 2024 (22–26 Ekim, İstanbul)"},{k:"Hedef GNSS Sistemleri",v:"GPS, GALILEO, GLONASS, BEIDOU"},{k:"Aldatma Yöntemleri",v:"Statik aldatma (sabit yanlış konum) + Dinamik aldatma (hareket halinde manipülasyon)"},{k:"Operasyonel Menzil",v:"Belirgin ölçüde uzatılmış mesafeler (kesin rakam gizli)"},{k:"Çalışma Prensibi",v:"Sahte uydu sinyalleri ile Multi-GNSS alıcı manipülasyonu"},{k:"Senaryo Desteği",v:"Önceden tanımlanmış aldatma senaryoları"},{k:"Entegrasyon",v:"İHTAR ve diğer ASELSAN C-UAS sistemleri ile entegre"}],
    scenarios:["Karşı-İHA/FPV","Kritik Tesis Koruma","İHA Ele Geçirme","Hava Sahası Güvenliği","Katmanlı Savunma (Jamming+Spoofing)","Konvoy Koruma"],
  },
  { id:"ejderha", name:"EJDERHA / AD 200", producer:"ASELSAN", force:"kara", status:"Düşük Hacimli Üretim", statusColor: C.cyan,
    type:"Yüksek Güçlü Elektromanyetik (HPEM) Silah", img:"⚡",
    summary:"Yüksek güçlü elektromanyetik dalgalar (HPEM) yayarak hedef İHA'ların elektronik devrelerini kalıcı olarak hasara uğratıp çalışma dışı bırakan yönlendirilmiş enerji silahıdır. Geleneksel bostuculardan farklı olarak fiziksel hasar vererek kalıcı etkisizleştirme sağlar. Vakum elektroniği teknolojisi kullanır. Ocak 2026'da Gölbek Teknoloji Üssü'nde 4 farklı saldırı senaryosunda (kablolu FPV, kablosuz FPV, çoklu drone) başarıyla test edilmiştir. IDEF 2025'te tanıtılan sistem, Çelik Kubbe'nin kritik bileşenidir.",
    specs:[{k:"Teknoloji",v:"HPEM (High Power Electromagnetic), vakum elektroniği tabanlı"},{k:"Etki Mekanizması",v:"Elektronik devreleri yüksek güçlü EM dalgalarla kalıcı hasara uğratma"},{k:"Etkili Menzil",v:"1 km'ye kadar (İHA); 500 m'de mini İHA doğrulanmış"},{k:"Platform",v:"Mobil (treylere monte, hızlı konuşlandırma)"},{k:"Hedef Tipleri",v:"Mini/mikro İHA, FPV (kablolu+kablosuz), drone sürüleri, seyir füzeleri"},{k:"Ocak 2026 Testi",v:"4 senaryo — 3 kablolu FPV eş zamanlı + farklı açı saldırıları"},{k:"Test Yeri",v:"ASELSAN Gölbek Teknoloji Üssü"},{k:"İlk Tanıtım",v:"IDEF 2025"},{k:"Üretim",v:"Düşük adetli seri üretim (2025+)"},{k:"Operasyonel Hizmet",v:"2026 yılı planlanıyor"},{k:"Entegrasyon",v:"Çelik Kubbe entegre hava savunma sistemi"},{k:"Avantaj",v:"Mühimmat gerektirmez, düşük kolateral hasar, kalıcı etki"}],
    scenarios:["Karşı-İHA/Drone Sürüsü","FPV Drone Savunma (Kablolu+Kablosuz)","Kritik Tesis Koruma","Çelik Kubbe Katmanlı Savunma","Maliyet Etkin Savunma","Hızlı Konuşlandırma"],
  },
  { id:"gokberk", name:"GÖKBERK", producer:"ASELSAN", force:"kara", status:"Envanterde (2025)", statusColor: C.green,
    type:"Mobil Lazer Silah Sistemi", img:"⚡",
    summary:"TÜBİTAK BİLGEM tarafından üretilen 5 kW tek modlu lazer kaynağını kullanan kısa menzilli mobil hava savunma lazer silahıdır. 6x6 tekerlekli araç platformunda lazer silahı, radar, EO/IR sensörler ve elektronik bostucuyu bir arada bulundurur. Mart 2025'te FPV dronlara karşı 1.200–1.500 m mesafeden başarılı testlerini tamamlamıştır. İlerleyen dönemde 10, 15 ve 30 kW versiyonları planlanmaktadır. Çelik Kubbe'nin en alt katmanında konumlanır.",
    specs:[{k:"Lazer Kaynağı",v:"TÜBİTAK BİLGEM üretimi"},{k:"Lazer Gücü",v:"Minimum 5 kW (tek modlu/single-mode)"},{k:"Planlanan Güç Seviyeleri",v:"10 kW, 15 kW, 30 kW ve üzeri"},{k:"Lazer Odaklama Menzili",v:"2.000 metreye kadar"},{k:"Etkili İHA Menzili",v:"1.000–1.500 metre"},{k:"Test Edilen Menziller",v:"1.200 m ve 1.500 m (Mart 2025)"},{k:"Platform",v:"6x6 lastik tekerlekli mobil araç"},{k:"Gimbal",v:"Stabilize gimbal, ±180° dönüş, yüksek hassasiyetli takip"},{k:"EO/IR Sensörler",v:"TV kamera, termal görüntüleme, NIR aktif takip, aydınlatma lazeri"},{k:"Yumuşak İmha",v:"Entegre elektronik bosturucu (soft-kill)"},{k:"Soğutma",v:"7/24 çalışma prensibine uygun sürekli soğutma"},{k:"Hedef Tipleri",v:"FPV, sabit kanatlı, döner kanatlı dronlar"},{k:"Yerlilik",v:"Tüm kritik alt bileşenler yerli üretim"},{k:"Entegrasyon",v:"Çelik Kubbe entegre hava savunma sistemi"}],
    scenarios:["Karşı-İHA/FPV","Kısa Menzil Hava Savunma","Çelik Kubbe Alt Katman","Maliyet Etkin Angajman","Çift Modlu Savunma (Lazer+Jammer)","Mobil Savunma"],
  },
  { id:"karetta", name:"KARETTA", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Anti-Jam GNSS Sistemi", img:"🔒",
    summary:"Çok elementli anten dizisi ve dijital hüzme şekillendirme (digital beamforming) teknolojisi kullanan gelişmiş GNSS anti-jam sistemidir. CRPA (Controlled Reception Pattern Antenna) teknolojisiyle düşman karıştırma sinyallerinin geldiği yöne anten boşluğu oluşturarak navigasyon doğruluğunu korur. Araç, gemi ve uçak platformlarına entegre edilebilir çoklu platform uyumluluğuna sahiptir.",
    specs:[{k:"Teknoloji",v:"CRPA (Controlled Reception Pattern Antenna)"},{k:"Hüzme Şekillendirme",v:"Dijital hüzme şekillendirme (digital beamforming)"},{k:"Yöntem",v:"Karıştırma yönüne anten boşluğu (null) oluşturma"},{k:"GNSS Uyumluluğu",v:"GPS, GALILEO, GLONASS, BEIDOU"},{k:"Platform",v:"Çoklu platform — araç, gemi, uçak"},{k:"Koruma",v:"GNSS karıştırma ve aldatma sinyallerine karşı navigasyon koruması"}],
    scenarios:["Elektronik Koruma","Navigasyon Güvenliği","Konvansiyonel Savaş","NATO","Deniz Platformları","Hava Platformları"],
  },
  { id:"mert", name:"MERT", producer:"Meteksan", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Araç Üstü V/UHF RCIED Karıştırıcı", img:"📻",
    summary:"Meteksan Savunma tarafından geliştirilen araç üstü RCIED (Radyo Kontrollü El Yapımı Patlayıcı Düzeneği) karıştırıcı sistemidir. V/UHF frekans bandında çalışarak konvoy ve devriye araçlarını RF kontrollü EYP tehditlerine karşı korur. Yazılım tanımlı karıştırma mimarisi ile farklı tehdit profillerine hızla uyum sağlar. Türk Silahlı Kuvvetleri ve güvenlik güçlerinin envanterinde aktif olarak kullanılmaktadır.",
    specs:[{k:"Üretici",v:"Meteksan Savunma"},{k:"Frekans",v:"V/UHF bandı"},{k:"Platform",v:"Araç üstü"},{k:"Görev",v:"RCIED karıştırma"},{k:"Mimari",v:"Yazılım tanımlı karıştırma"},{k:"Koruma",v:"Konvoy ve devriye araçları"}],
    scenarios:["Karşı-EYP/RCIED","Asimetrik Savaş","Konvoy Koruma","Terörle Mücadele"],
  },
  { id:"kapan", name:"KAPAN", producer:"Meteksan", force:"kara", status:"Operasyonel", statusColor: C.green,
    type:"Entegre Karşı-İHA Sistemi", img:"🛡️",
    summary:"Meteksan Savunma tarafından geliştirilen, Retinar FAR-AD drone tespit radarı ile entegre çalışan karşı-İHA sistemidir. Radar tespit, EO/IR sensör takip ve RF karıştırma etkisizleştirme zincirini tek bir entegre sistemde sunar. Retinar FAR-AD radarı FMCW teknolojisi ile küçük RCS'li mini/mikro dronları tespit edebilir. Kritik tesis koruma, sınır güvenliği ve VIP koruma senaryolarında kullanılmaktadır.",
    specs:[{k:"Üretici",v:"Meteksan Savunma"},{k:"Radar",v:"Retinar FAR-AD (FMCW drone tespit radarı)"},{k:"Radar Tespit",v:"Küçük RCS'li mini/mikro drone tespiti"},{k:"EO/IR Sensör",v:"Tanıma ve takip"},{k:"Karıştırma",v:"RF karıştırma ile yumuşak imha"},{k:"Zincir",v:"Tespit → Takip → Tanıma → Etkisiz Bırakma"}],
    scenarios:["Karşı-İHA","Kritik Tesis Koruma","Sınır Güvenliği","VIP Koruma","Havalimanı Güvenliği"],
  },
  { id:"seymen", name:"SEYMEN", producer:"Meteksan", force:"kara", status:"Geliştirmede", statusColor: C.amber,
    type:"Navigasyon EH (GNSS Karıştırma/Aldatma)", img:"🛡️",
    summary:"Meteksan Savunma tarafından geliştirilen navigasyon elektronik harp sistemidir. GPS/GNSS sinyallerine karşı hem karıştırma (jamming) hem de aldatma (spoofing) yapabilme yeteneğine sahiptir. Düşman platformlarının navigasyon doğruluğunu bozarak operasyonel avantaj sağlar. Proje sözleşmesi imzalanmış olup geliştirme aşamasındadır.",
    specs:[{k:"Üretici",v:"Meteksan Savunma"},{k:"Hedef",v:"GPS/GNSS sinyalleri (GPS, GALILEO, GLONASS, BEIDOU)"},{k:"Karıştırma",v:"GNSS sinyal karıştırma (jamming)"},{k:"Aldatma",v:"GNSS sinyal aldatma (spoofing)"},{k:"Durum",v:"Proje sözleşmesi imzalanmış, geliştirme aşamasında"}],
    scenarios:["Karşı-İHA","Navigasyon EH","Elektronik Koruma","VIP Koruma","Bölge Erişim Engelleme"],
  },
  { id:"ehkkks", name:"EHKKKS", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"EH Komuta Kontrol ve Koordinasyon Sistemi", img:"🖥️",
    summary:"Tüm kara EH varlıklarını karargâh seviyesinde koordine eden komuta-kontrol sistemidir. Görev planlama, yönetim, sinyal/trafik/ses analizi ve EH durumsal farkındalık sağlar. Taktik seviyeden stratejik seviyeye kadar tüm EH operasyonlarının merkezî kontrolünü mümkün kılar. V/UHF Elektronik Destek alt sistemi ile haberleşme istihbaratı toplama yeteneği de eklenmiştir.",
    specs:[{k:"Seviye",v:"Karargâh (taktikten stratejik seviyeye)"},{k:"Görev Planlama",v:"EH görev planlama ve yönetim"},{k:"Analiz",v:"Sinyal analizi, trafik analizi, ses analizi"},{k:"Durumsal Farkındalık",v:"EH durumsal farkındalık sağlama"},{k:"V/UHF ED",v:"Haberleşme istihbaratı toplama alt sistemi"},{k:"Entegrasyon",v:"Tüm kara EH sistemleri (KORAL, VURAL, SANCAK, ILGAR, KANGAL vb.)"},{k:"Kontrol",v:"Merkezî operasyon kontrolü ve koordinasyon"}],
    scenarios:["Konvansiyonel Savaş","SEAD/DEAD","NATO","EH Koordinasyonu","Haberleşme İstihbaratı"],
  },
  { id:"spews2", name:"SPEWS-II (AN/ALQ-178V5+)", producer:"ASELSAN / BAE Systems", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"F-16 Dahili Gelişmiş Öz-Koruma EH Süiti", img:"✈️",
    summary:"F-16 Blok 50 filosu için geliştirilmiş dahili EH öz-koruma süitidir. ASELSAN ana yüklenici olarak 190,4 milyon dolarlık sözleşme kapsamında 60 sistem üretmiştir. Radar İkaz Alıcısı (RWR), güç yönetimli Elektronik Karşı Tedbir (ECM) ve koordineli saçma/parlak fişek atımını entegre eden sistem, pilota otomatik ve yarı-otomatik tehdit müdahale seçenekleri sunar. BAE Systems ile ortak geliştirme programı kapsamında kritik teknoloji transferi sağlanmıştır.",
    specs:[{k:"Platform",v:"F-16 Blok 50"},{k:"Sözleşme",v:"190,4 milyon USD, 60 sistem"},{k:"Ana Yüklenici",v:"ASELSAN (BAE Systems ortaklığı)"},{k:"RWR",v:"Radar İkaz Alıcısı (360° kapsama)"},{k:"ECM",v:"Güç yönetimli aktif karıştırma"},{k:"Saçma/Fişek",v:"Koordineli saçma ve parlak fişek atımı"},{k:"Modlar",v:"Otomatik + yarı-otomatik tehdit müdahale"},{k:"Entegrasyon",v:"F-16 aviyonik sistemiyle tam entegre"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Elektronik Koruma","Hava-Hava Muharebe","NATO"],
  },
  { id:"ivews", name:"AN/ALQ-257 IVEWS", producer:"Northrop Grumman", force:"hava", status:"Teslimatta", statusColor: C.cyan,
    type:"F-16 Entegre EH Süiti (Yeni Nesil)", img:"✈️",
    summary:"Northrop Grumman tarafından geliştirilen yeni nesil entegre EH süitidir. Türkiye 168 sistem sipariş etmiştir: 40 adet yeni F-16 Blok 70 ve 128 adet mevcut F-16 modernizasyonu için. 360° radar ikaz, gelişmiş tehdit tanımlama, otomatik karşı tedbir ve Link-16 entegrasyonu sunar. Operasyonel değerlendirme testleri 2025'te tamamlanmıştır.",
    specs:[{k:"Üretici",v:"Northrop Grumman"},{k:"Sipariş",v:"168 sistem (40 Blok 70 + 128 modernizasyon)"},{k:"360° Radar İkaz",v:"Tam küresel radar tehdit tespiti"},{k:"Tehdit Tanımlama",v:"Gelişmiş otomatik tehdit sınıflandırma"},{k:"Karşı Tedbir",v:"Otomatik ECM + saçma/fişek koordinasyonu"},{k:"Veri Bağlantısı",v:"Link-16 entegre"},{k:"Test",v:"Operasyonel değerlendirme 2025 tamamlandı"},{k:"Uyumluluk",v:"F-16 Blok 70 Viper + Blok 30/40/50 modernizasyon"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Elektronik Koruma","NATO","Hava-Hava Muharebe"],
  },
  { id:"fews", name:"FEWS (ÖZGÜR Projesi)", producer:"ASELSAN", force:"hava", status:"Geliştirmede", statusColor: C.amber,
    type:"Tamamen Yerli F-16 EH Süiti", img:"✈️",
    summary:"SPEWS-II'nin yerini alacak tamamen yerli ve milli F-16 EH öz-koruma süitidir. ÖZGÜR projesi (Blok 30) ve ÖZGÜR-2 projesi (Blok 40/50) kapsamında 150'den fazla F-16'nın modernizasyonunu hedefler. MURAD AESA radarıyla entegre çalışarak tam yerli aviyonik dönüşümü sağlar. RWR ve ECM alt sistemlerinin tamamı yerli tasarım ve üretimdir. ÖZGÜR kapsamında ilk teslimatlar gerçekleştirilmiştir.",
    specs:[{k:"ÖZGÜR Projesi",v:"F-16 Blok 30 modernizasyonu"},{k:"ÖZGÜR-2 Projesi",v:"F-16 Blok 40/50 modernizasyonu"},{k:"Alt Sistemler",v:"RWR + ECM (tamamen yerli)"},{k:"Radar Entegrasyonu",v:"MURAD AESA radar"},{k:"Hedef",v:"150+ F-16 modernizasyonu"},{k:"İlk Teslimatlar",v:"ÖZGÜR kapsamında gerçekleştirildi"},{k:"Yerlilik",v:"%100 yerli tasarım ve üretim"},{k:"Teknoloji Bağımsızlığı",v:"Yabancı kaynak bağımlılığını ortadan kaldırma"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Elektronik Koruma","Teknoloji Bağımsızlığı"],
  },
  { id:"edpod", name:"EDPOD", producer:"TÜBİTAK BİLGEM", force:"hava", status:"Envanterde (2025)", statusColor: C.green,
    type:"Taktik ELINT/ESM Podu", img:"🔍",
    summary:"TÜBİTAK BİLGEM tarafından geliştirilen F-16 Blok 40'a monte taktik ELINT/ESM podudur. Düşman radar emisyonlarını tespit, sınıflandırma, kayıt ve coğrafi konumlama yaparak Link-16 üzerinden gerçek zamanlı veri paylaşımı sağlar. Haziran 2025'te Türk Hava Kuvvetleri envanterine girmiştir. F-16 jetlerinin keşif ve istihbarat toplama yeteneklerini önemli ölçüde artırmıştır.",
    specs:[{k:"Üretici",v:"TÜBİTAK BİLGEM"},{k:"Platform",v:"F-16 Blok 40"},{k:"Yetenek",v:"Radar tespit, sınıflandırma, kayıt, coğrafi konumlama"},{k:"Veri Paylaşımı",v:"Link-16 gerçek zamanlı"},{k:"Envanter Girişi",v:"Haziran 2025 (HvKK)"},{k:"Görev",v:"Taktik ELINT toplama ve paylaşım"},{k:"Yerlilik",v:"Tamamen yerli tasarım ve üretim"}],
    scenarios:["SEAD/DEAD","SIGINT/ELINT","Tehdit Konumlandırma","Gerçek Zamanlı İstihbarat","NATO"],
  },
  { id:"ehpod", name:"EHPOD", producer:"TÜBİTAK BİLGEM", force:"hava", status:"Geliştirmede", statusColor: C.amber,
    type:"Aktif ECM Podu", img:"✈️",
    summary:"TÜBİTAK BİLGEM tarafından geliştirilen DRFM tabanlı aktif Elektronik Karşı Tedbir (ECM) podudur. Düşman radar ekranlarında çoklu sahte hedef oluşturarak gerçek uçağın tespitini engeller. Kritik Tasarım Safhasını tamamlamış olup test aşamasındadır. EDPOD ile birlikte kullanıldığında tam kapsamlı havadan EH yeteneği sağlayacaktır.",
    specs:[{k:"Üretici",v:"TÜBİTAK BİLGEM"},{k:"Teknoloji",v:"DRFM (Dijital Radyo Frekans Belleği) tabanlı"},{k:"Yetenek",v:"Aktif ECM, çoklu sahte hedef oluşturma"},{k:"Platform",v:"F-16 (ve potansiyel diğer platformlar)"},{k:"Tasarım Durumu",v:"Kritik Tasarım Safhası tamamlandı"},{k:"EDPOD Sinerji",v:"EDPOD ES + EHPOD EA = Tam havadan EH"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Elektronik Aldatma","Hava Savunma Penetrasyonu"],
  },
  { id:"havasoj", name:"HAVASOJ / ASOJ 23-A", producer:"ASELSAN / TUSAŞ", force:"hava", status:"Entegrasyon (2026)", statusColor: C.amber,
    type:"Stratejik Hava Stand-Off Jammer", img:"⚡",
    summary:"Türkiye'nin en iddialı hava EH programıdır. 4 adet Bombardier Global 6000 uçağı üzerinde AESA tabanlı DRFM radar karıştırıcı ve geniş bant COMINT/ELINT SIGINT yeteneği sunar. 8 saate kadar görev süresiyle dünyada bu yeteneğe sahip 4-5 ülkeden biri konumuna getirecektir. İlk teslimat 2026'da planlanmakta olup Pakistan Hava Kuvvetleri'ne de ihracat sözleşmesi imzalanmıştır. Mart 2026'da ilk görüntüleri kamuoyuyla paylaşılmıştır.",
    specs:[{k:"Platform",v:"4x Bombardier Global 6000"},{k:"Radar Karıştırıcı",v:"AESA tabanlı DRFM"},{k:"SIGINT",v:"Geniş bant COMINT/ELINT toplama"},{k:"Görev Süresi",v:"8 saate kadar"},{k:"İlk Teslimat",v:"2026"},{k:"İlk Görüntüler",v:"Mart 2026"},{k:"İhracat",v:"Pakistan Hava Kuvvetleri (Global 6000 platformunda)"},{k:"Stratejik Önem",v:"Dünyada 4-5 ülkede mevcut yetenek"},{k:"Görev",v:"Stand-off elektronik taarruz + stratejik SIGINT"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Stratejik SIGINT","Elektronik Koridor Açma","NATO","İhracat"],
  },
  { id:"antidot2us", name:"ANTIDOT 2-U/S", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"İHA Elektronik Destek Podu (TB2/Akıncı)", img:"🛸",
    summary:"Bayraktar TB2 ve Akıncı platformlarına monte edilen Elektronik Destek (ES) podudur. Düşman radarlarını tespit, tanımlama ve coğrafi konumlama yaparak İHA'nın istihbarat toplama kapasitesini önemli ölçüde artırır. ~300W güç tüketimi ile kompakt ve hafif bir tasarıma sahiptir. Düşük (LB), orta (MB) ve yüksek bant (HB) frekans varyantları mevcuttur. Yurt dışında da operasyonel olarak kullanılmaktadır.",
    specs:[{k:"Platform",v:"Bayraktar TB2, Akıncı"},{k:"Güç Tüketimi",v:"~300W"},{k:"Varyantlar",v:"ANTIDOT 2-U/LB (düşük bant), MB (orta bant), HB (yüksek bant)"},{k:"ES Yeteneği",v:"Radar tespit, tanımlama, parametre çıkarma, coğrafi konumlama"},{k:"Operasyonel Durum",v:"Yurt dışında operasyonel kullanımda"},{k:"Tasarım",v:"Kompakt ve hafif, İHA faydalı yük uyumlu"}],
    scenarios:["SIGINT/ELINT","SEAD/DEAD","Asimetrik Savaş","Tehdit Konumlandırma","İhracat"],
  },
  { id:"antidotmini", name:"ANTIDOT Mini EH Pod", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"İHA ECM Podu (TB2)", img:"🛸",
    summary:"11 kg'lık kompakt ECM podudur. İkili konfigürasyonda TB2'ye 360° EH koruması sağlar. Seri üretim aşamasında olup muharebe kanıtlanmıştır. TB2'nin radar güdümlü hava savunma sistemlerine karşı hayatta kalabilirliğini önemli ölçüde artıran bu pod, çatışma bölgelerinde etkinliğini kanıtlamıştır.",
    specs:[{k:"Ağırlık",v:"11 kg"},{k:"Platform",v:"Bayraktar TB2"},{k:"Kapsama",v:"360° (ikili konfigürasyon)"},{k:"Teknoloji",v:"RF karıştırma"},{k:"Durum",v:"Seri üretim"},{k:"Muharebe Kanıtı",v:"Çatışma bölgelerinde operasyonel kullanım"},{k:"Görev",v:"İHA öz-koruma (radar güdümlü tehditlere karşı)"}],
    scenarios:["Elektronik Koruma","İHA Öz-Koruma","Asimetrik Savaş","İhracat"],
  },
  { id:"antidotakinci", name:"ANTIDOT 2-U/ES + EA (Akıncı)", producer:"ASELSAN", force:"hava", status:"Test (2025)", statusColor: C.amber,
    type:"İHA ES+EA Pod Çifti (Akıncı)", img:"🛸",
    summary:"Akıncı UCAV için yüksek güçlü Elektronik Destek (ES) ve Elektronik Taarruz (EA) pod çiftidir. İnsansız SEAD görevi yeteneği kazandırarak Akıncı'yı elektronik harp platformuna dönüştürür. Ekim 2025'te başarılı uçuş testini tamamlamıştır. ES podu tehdit tespiti ve konumlandırma, EA podu ise karıştırma ve aldatma görevlerini üstlenir.",
    specs:[{k:"Platform",v:"Bayraktar Akıncı"},{k:"Konfigürasyon",v:"ES podu (tespit/konumlama) + EA podu (karıştırma/aldatma)"},{k:"Uçuş Testi",v:"Ekim 2025 başarılı"},{k:"İnsansız SEAD",v:"Düşman hava savunma radarlarını insansız olarak baskılama"},{k:"ES Yeteneği",v:"Radar tespit, tanımlama, coğrafi konumlama"},{k:"EA Yeteneği",v:"Yüksek güçlü karıştırma ve aldatma"},{k:"Operasyonel Durum",v:"Yurt dışında EA podu operasyonel"}],
    scenarios:["İnsansız SEAD/DEAD","Konvansiyonel Savaş","SIGINT/ELINT","Hava Savunma Baskılama"],
  },
  { id:"antidot3u", name:"ANTIDOT 3-U", producer:"ASELSAN", force:"hava", status:"Üretimde", statusColor: C.cyan,
    type:"İHA Karşı-İHA EH Podu", img:"🛸",
    summary:"İHA'dan İHA'ya karşı-drone haberleşme EH podudur. ~11 kg ağırlığında olup DRFM tabanlı karıştırma teknolojisi kullanır. Hedef İHA'nın uzaktan kumanda, video bağlantısı ve veri telemetri sinyallerini karıştırarak etkisizleştirir. GERGEDAN 4-U ile birlikte TSK'ya teslimatları gerçekleştirilmiştir. Expodefensa 2025'te uluslararası pazara sunulmuştur.",
    specs:[{k:"Ağırlık",v:"~11 kg"},{k:"Teknoloji",v:"DRFM tabanlı"},{k:"Görev",v:"İHA→İHA karşı-drone haberleşme karıştırma"},{k:"Hedef Sinyaller",v:"RC, video bağlantısı, veri telemetri, GNSS"},{k:"Teslimat",v:"TSK'ya teslim edildi (GERGEDAN 4-U ile birlikte)"},{k:"İhracat Tanıtımı",v:"Expodefensa 2025"}],
    scenarios:["Karşı-İHA","İHA'dan İHA'ya EH","Konvansiyonel Savaş","Sürü Drone Savunma","İhracat"],
  },
  { id:"fewsu", name:"FEWS-U (Kızılelma)", producer:"ASELSAN", force:"hava", status:"Test (2025)", statusColor: C.amber,
    type:"İnsansız Muharebe Uçağı EH Süiti", img:"🛸",
    summary:"Bayraktar Kızılelma insansız muharebe uçağı için geliştirilen 360° kapsama alanlı tam entegre EH öz-koruma süitidir. Dünyanın ilk insansız muharebe uçağı EH süitlerinden biri olma özelliği taşır. 2025'te ilk uçuş testini başarıyla tamamlamıştır. KAAN 5. nesil savaş uçağı EH teknolojilerinin test yatağı olarak da hizmet vermektedir.",
    specs:[{k:"Platform",v:"Bayraktar Kızılelma"},{k:"Kapsama",v:"360° tam küresel"},{k:"Alt Sistemler",v:"RWR + ECM + saçma/fişek (tam entegre)"},{k:"İlk Uçuş Testi",v:"2025 başarılı"},{k:"Stratejik Rol",v:"KAAN EH teknolojileri test yatağı"},{k:"Özellik",v:"Dünyanın ilk insansız muharebe uçağı EH süitlerinden"},{k:"Yerlilik",v:"Tamamen yerli tasarım"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Elektronik Koruma","İnsansız Muharebe","Teknoloji Doğrulama"],
  },
  { id:"hews", name:"HEWS", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Helikopter EH Süiti", img:"🚁",
    summary:"T-70, T-129 ATAK ve S-70A helikopterleri için geliştirilen entegre EH öz-koruma süitidir. RWR, MWS (Füze İkaz), LWR (Lazer İkaz), RF karıştırıcı (DRFM/AESA), saçma/parlak fişek atıcı ve IR karşı tedbir alt sistemlerini birleştirir. Seri entegrasyon aşamasına geçmiş olup Güney Amerika'ya ihracat sözleşmesi de imzalanmıştır. Helikopterlerin modern tehdit ortamında hayatta kalabilirliğini önemli ölçüde artırır.",
    specs:[{k:"Platformlar",v:"T-70, T-129 ATAK, S-70A"},{k:"RWR",v:"Radar İkaz Alıcısı"},{k:"MWS",v:"Füze İkaz Sistemi"},{k:"LWR",v:"Lazer İkaz Alıcısı"},{k:"RF Karıştırıcı",v:"DRFM/AESA tabanlı aktif karıştırma"},{k:"Saçma/Fişek",v:"Otomatik saçma ve parlak fişek atıcı"},{k:"IR Karşı Tedbir",v:"Kızılötesi karşı tedbir sistemi"},{k:"Üretim Durumu",v:"Seri entegrasyon aşamasında"},{k:"İhracat",v:"Güney Amerika'ya ihracat sözleşmesi"}],
    scenarios:["Konvansiyonel Savaş","Asimetrik Savaş","Helikopter Öz-Koruma","NATO","İhracat"],
  },
  { id:"sis", name:"SİS", producer:"EHSİM", force:"hava", status:"Seri Üretim", statusColor: C.green,
    type:"RF Aktif Harcama Aldatması (KAAN)", img:"✈️",
    summary:"KAAN 5. nesil savaş uçağı için EHSİM (ASELSAN/HAVELSAN/SSTEK ortak girişimi) tarafından geliştirilen yeni nesil RF aktif harcama aldatmasıdır. Uçaktan fırlatıldıktan sonra bağımsız olarak RF sinyalleri yayarak düşman radarlarında sahte hedef oluşturur ve gerçek uçağı maskeler. Seri üretim aşamasındadır.",
    specs:[{k:"Platform",v:"KAAN (TF-X) 5. nesil savaş uçağı"},{k:"Tip",v:"RF aktif harcama aldatma (expendable decoy)"},{k:"Üretici",v:"EHSİM (ASELSAN/HAVELSAN/SSTEK ortak girişimi)"},{k:"Çalışma Prensibi",v:"Fırlatma sonrası bağımsız RF sinyal yayımı"},{k:"Görev",v:"Düşman radarlarında sahte hedef oluşturma"},{k:"Üretim",v:"Seri üretim aşamasında"}],
    scenarios:["SEAD/DEAD","Konvansiyonel Savaş","Elektronik Aldatma","5. Nesil Hava Muharebesi"],
  },
  { id:"yildirim", name:"YILDIRIM 300 DIRCM", producer:"ASELSAN", force:"hava", status:"Geliştirmede", statusColor: C.amber,
    type:"Yönlendirilmiş IR Karşı Tedbir (KAAN)", img:"✈️",
    summary:"KAAN 5. nesil savaş uçağının IEOS (Entegre Elektro-Optik Sistemi) alt sistemi olarak geliştirilen DIRCM (Yönlendirilmiş Kızılötesi Karşı Tedbir) sistemidir. Lazer tabanlı IR aldatma teknolojisi ile EO/IR güdümlü füzelerin arayıcı kafalarını hedeften saptırır. YILDIRIM 100 helikopter versiyonunun testleri başarıyla tamamlanmış olup YILDIRIM 300 KAAN'a özel gelişmiş versiyondur.",
    specs:[{k:"Platform",v:"KAAN (IEOS alt sistemi)"},{k:"Teknoloji",v:"Lazer tabanlı yönlendirilmiş IR aldatma"},{k:"Hedef",v:"EO/IR güdümlü füzeler (arayıcı kafa saptırma)"},{k:"İlgili Sistem",v:"YILDIRIM 100 (helikopter versiyonu — testler tamamlandı)"},{k:"IEOS Bileşenleri",v:"TOYGUN 100 EOTS + KARAT 100 IRST + LIAS 300 + YILDIRIM 300"},{k:"Durum",v:"Geliştirme aşamasında"}],
    scenarios:["5. Nesil Hava Muharebesi","Elektronik Koruma","IR Füze Savunma","SEAD/DEAD"],
  },
  { id:"ares2n", name:"ARES-2N / 2N(V)2", producer:"ASELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Gemi ESM Sistemi", img:"🚢",
    summary:"Türk Deniz Kuvvetleri'nin ESM omurgasını oluşturan gemi radar elektronik destek sistemidir. Düşman gemi ve uçak radar emisyonlarını anlık olarak tespit, tanımlama, yön bulma ve sınıflandırır. 2–18 GHz operasyonel frekans aralığında (genişletilmiş 0,5–40 GHz) çalışır. ARES-2N(V)2 yeni nesil geniş bantlı alıcılarla donatılmış geliştirilmiş versiyondur. Ada sınıfı korvetler, TCG Anadolu, Barbaros MLU fragataları ve İstanbul (İstif) sınıfı fragatalarda kullanılmaktadır.",
    specs:[{k:"ARES-2N Frekans",v:"2–18 GHz (operasyonel), 0,5–40 GHz (genişletilmiş)"},{k:"ARES-2N(V)2",v:"Yeni nesil geniş bantlı alıcılar"},{k:"Yön Bulma",v:"Yüksek hassasiyetli yön bulma (DF)"},{k:"Eş Zamanlı Takip",v:"Çoklu radar emisyonu eş zamanlı takip"},{k:"Platformlar",v:"Ada sınıfı, TCG Anadolu, Barbaros MLU, İstanbul (İstif) sınıfı"},{k:"Tehdit Kütüphanesi",v:"Otomatik tehdit tanımlama ve sınıflandırma"},{k:"EOB",v:"Elektronik Harp Düzeni haritası oluşturma"}],
    scenarios:["Deniz Hakimiyeti","SIGINT/ELINT","Filo Savunma","NATO","İhracat"],
  },
  { id:"ares2sc", name:"ARES-2SC / 2NS", producer:"ASELSAN", force:"deniz", status:"Envanterde/Üretimde", statusColor: C.green,
    type:"Denizaltı ESM Sistemi", img:"🔱",
    summary:"Denizaltı periskop/kuleye monte edilen radar ESM sistemidir. Denizaltının yüzeye çıkmadan radar emisyonlarını tespit etmesini sağlayarak durumsal farkındalık ve gizlilik avantajı sunar. ARES-2SC Ay sınıfı (Tip 209/1200), ARES-2NS Reis sınıfı (Tip 214TN) için geliştirilmiştir. ARES-2SC 200 en yeni nesil versiyon olup UDT 2025'te tanıtılmıştır.",
    specs:[{k:"ARES-2SC",v:"Ay sınıfı (Tip 209/1200) denizaltıları"},{k:"ARES-2NS",v:"Reis sınıfı (Tip 214TN) denizaltıları"},{k:"ARES-2SC 200",v:"En yeni nesil — UDT 2025 tanıtım"},{k:"Montaj",v:"Periskop/kule monte"},{k:"Yetenek",v:"Yüzeye çıkmadan radar emisyon tespiti"},{k:"Avantaj",v:"Denizaltı gizliliğini koruyarak durumsal farkındalık"}],
    scenarios:["Denizaltı Harbi","SIGINT/ELINT","Gizli Keşif","Deniz Durumsal Farkındalık"],
  },
  { id:"areas2n", name:"AREAS-2N", producer:"ASELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Gemi ECM Sistemi (AESA)", img:"🚢",
    summary:"4 adet AESA anten (her biri 90° kapsama, 1.000'den fazla T/R modülü) ile donatılmış gelişmiş deniz ECM sistemidir. Eş zamanlı 32 tehdide karşı DRFM tabanlı karıştırma ve aldatma yapabilir. Türk Deniz Kuvvetleri'nin en gelişmiş gemi ECM sistemi olup TCG Anadolu çıkarma gemisi ve İstanbul (İstif) sınıfı fragatalarda kullanılmaktadır. Düşman anti-gemi füzelerinin radar arayıcılarını aldatarak gemiyi korur.",
    specs:[{k:"Anten",v:"4x AESA (her biri 90° kapsama)"},{k:"T/R Modülü",v:"Her antende 1.000+ T/R modülü"},{k:"Eş Zamanlı Kapasite",v:"32 tehdit"},{k:"Teknoloji",v:"DRFM tabanlı karıştırma ve aldatma"},{k:"Platformlar",v:"TCG Anadolu, İstanbul (İstif) sınıfı"},{k:"Kapsama",v:"360° (4x90°)"},{k:"Görev",v:"Anti-gemi füze arayıcı aldatma, radar karıştırma"}],
    scenarios:["Deniz Hakimiyeti","Filo Savunma","Anti-Gemi Füze Savunma","NATO","İhracat"],
  },
  { id:"kartaca", name:"KARTACA-N", producer:"ASELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Deniz Saçma/IR Aldatma Fırlatıcısı", img:"🚢",
    summary:"NATO standart 130mm kalibreli saçma, IR ve hibrit aldatma fırlatıcısıdır. Amerikan Mk36 SRBOC sisteminin yerini alarak Türk Deniz Kuvvetleri gemilerinde tam yerli çözüm sunmaktadır. Radar ve IR güdümlü füzelere karşı çeşitli aldatma mühimmatları fırlatarak geminin hayatta kalabilirliğini artırır.",
    specs:[{k:"Kalibre",v:"130mm NATO standart"},{k:"Aldatma Tipleri",v:"Saçma (chaff) / IR (parlak fişek) / Hibrit"},{k:"Değiştirdiği Sistem",v:"Mk36 SRBOC (ABD)"},{k:"Görev",v:"Radar ve IR güdümlü füzelere karşı aldatma"},{k:"Yerlilik",v:"Tamamen yerli tasarım ve üretim"},{k:"Entegrasyon",v:"AREAS-2N ECM ile koordineli kullanım"}],
    scenarios:["Deniz Hakimiyeti","Filo Savunma","Anti-Gemi Füze Savunma","NATO","Elektronik Koruma"],
  },
  { id:"hizir", name:"HIZIR 100-N", producer:"ASELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Yüzey Gemisi Torpido Karşı Tedbir", img:"🔊",
    summary:"Çekili dizi sonar, çekili aldatma ve harcama aldatmalarından oluşan kapsamlı torpido karşı tedbir sistemidir. Triplet hidrofon dizisi ile torpido tespiti, geniş bant akustik gürültü üreteci ile aldatma ve 6 eş zamanlı hedef takibi yapabilir. Alman DM2A4 torpidosuna karşı başarılı test edilmiştir. Türk Deniz Kuvvetleri'nin yüzey gemilerini torpido tehdidine karşı koruyan ana sistemdir.",
    specs:[{k:"Çekili Dizi Sonar",v:"Triplet hidrofon dizisi"},{k:"Çekili Aldatma",v:"Geniş bant akustik gürültü üreteci"},{k:"Harcama Aldatma",v:"Fırlatılabilir akustik aldatma"},{k:"Eş Zamanlı Takip",v:"6 hedef"},{k:"Başarılı Test",v:"DM2A4 torpidosuna karşı"},{k:"Görev",v:"Torpido tespiti, sınıflandırma, aldatma ve savuşturma"},{k:"Platform",v:"Yüzey savaş gemileri"}],
    scenarios:["Deniz Hakimiyeti","Torpido Savunma","Filo Koruma","NATO","İhracat"],
  },
  { id:"zargana", name:"ZARGANA", producer:"ASELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Denizaltı Torpido Karşı Tedbir", img:"🔱",
    summary:"24 fırlatma hücresine kadar kapasite sunan denizaltı torpido karşı tedbir sistemidir. Baloncuksuz fırlatma özelliği ile denizaltının pozisyon gizliliğini korur. Pakistan (Agosta 90B) ve Endonezya deniz kuvvetlerine ihraç edilmiştir. Çeşitli akustik aldatma mühimmatları fırlatarak düşman torpidolarını hedeften saptırır.",
    specs:[{k:"Fırlatma Kapasitesi",v:"24 hücreye kadar"},{k:"Fırlatma Özelliği",v:"Baloncuksuz fırlatma (pozisyon gizliliği)"},{k:"Mühimmat",v:"Çeşitli akustik aldatma mühimmatları"},{k:"İhracat",v:"Pakistan (Agosta 90B), Endonezya"},{k:"Avantaj",v:"Denizaltı gizliliğini koruyarak torpido savunma"},{k:"Platform",v:"Çeşitli denizaltı sınıfları"}],
    scenarios:["Denizaltı Harbi","Torpido Savunma","İhracat","Gizli Savunma"],
  },
  { id:"tork", name:"TORK", producer:"ASELSAN", force:"deniz", status:"Geliştirmede", statusColor: C.amber,
    type:"Sert Öldürme Torpido Karşı Tedbiri", img:"🔱",
    summary:"Düşman torpidolarına karşı sert öldürme (hard-kill) konseptinde geliştirilen aktif torpido karşı tedbir sistemidir. Aktif güdüm başlığıyla düşman torpidosuna yaklaşıp etkili mesafede patlayarak fiziksel olarak imha eder. Yumuşak öldürme (aldatma) yerine doğrudan fiziksel imha sağlaması ile benzersiz bir yetenek sunar. IDEF 2015'te ilk tanıtımı yapılmıştır.",
    specs:[{k:"Tip",v:"Sert öldürme (Hard Kill) torpido karşı tedbiri"},{k:"Güdüm",v:"Aktif güdüm başlığı"},{k:"Yöntem",v:"Torpidoya yaklaşma → etkili mesafede patlama → fiziksel imha"},{k:"İlk Tanıtım",v:"IDEF 2015"},{k:"Avantaj",v:"Aldatmaya dirençli torpidolara karşı kesin imha"},{k:"Durum",v:"Geliştirme aşamasında"}],
    scenarios:["Deniz Hakimiyeti","Torpido Savunma","Denizaltı Harbi","Filo Koruma"],
  },
  { id:"nazar", name:"NAZAR / GABYA-LETS", producer:"Meteksan", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Lazer Elektronik Harp / DIRCM Sistemi", img:"🔆",
    summary:"Meteksan Savunma tarafından geliştirilen, EO/IR güdümlü anti-gemi füzelerinin arayıcı kafalarını lazer ile kör ederek/aldatarak etkisizleştiren deniz lazer EH sistemidir. Mart 2021'de TCG Gökova (F-496) fragatasına ilk montajı yapılmıştır. Dünyada sadece ABD, İngiltere ve İsrail'de benzer sistem mevcuttur. TF-2000 muhribi için DIRCM versiyonu da geliştirilmektedir.",
    specs:[{k:"İlk Montaj",v:"Mart 2021 — TCG Gökova (F-496)"},{k:"Hedef",v:"EO/IR güdümlü anti-gemi füzesi arayıcı kafaları"},{k:"Teknoloji",v:"Lazer kör etme/aldatma (DIRCM)"},{k:"Benzeri Sistem",v:"Dünyada sadece ABD, İngiltere, İsrail'de mevcut"},{k:"TF-2000 Versiyonu",v:"DIRCM olarak geliştirilmekte"},{k:"Üretici",v:"Meteksan Savunma"},{k:"Diğer Platformlar",v:"Gabya sınıfı fragatalar ve yeni nesil gemiler"}],
    scenarios:["Deniz Hakimiyeti","Anti-Gemi Füze Savunma","Lazer EH","NATO","İhracat"],
  },
  { id:"tcgufuk", name:"TCG Ufuk (A-591)", producer:"ASELSAN / HAVELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"İstihbarat Gemisi (SIGINT/ELINT)", img:"🚢",
    summary:"Türkiye'nin ilk özel amaçlı istihbarat gemisidir. MİLGEM Ada sınıfı korvet gövdesi üzerine İstanbul Tersanesi'nde inşa edilerek 14 Ocak 2022'de hizmete girmiştir. ASELSAN üretimi ARES ailesi ESM/ELINT sensörleri, CAFRAD tipi AESA anten dizileri ve HAVELSAN ADVENT Savaş Yönetim Sistemi ile donatılmıştır. EM (elektromanyetik), hidro-akustik ve elektro-optik istihbarat toplama yeteneklerine sahip olup 45–60 gün kesintisiz görev sürdürebilir. Türk Deniz Kuvvetleri ve MİT ortak operasyonuyla 7/24 deniz SIGINT görevi icra etmektedir. Mavi Vatan 2022 tatbikatında aktif görev almıştır.",
    specs:[{k:"Hizmete Giriş",v:"14 Ocak 2022"},{k:"Gövde",v:"MİLGEM Ada sınıfı korvet (99,5 m × 14,4 m)"},{k:"Deplasman",v:"~2.400 ton (tam yüklü)"},{k:"Pervane",v:"CODAD – 2× MTU 20V 4000 M93L dizel"},{k:"Hız",v:"18+ knot"},{k:"Dayanıklılık",v:"45–60 gün kesintisiz operasyon"},{k:"Mürettebat",v:"~110 kişi"},{k:"Radar ESM",v:"ASELSAN ARES ailesi ESM/ELINT sensörleri"},{k:"AESA Anten",v:"CAFRAD tipi AESA dizileri (ASELSAN)"},{k:"Arama Radarı",v:"Terma Scanter 4603"},{k:"Savaş Yönetim Sistemi",v:"HAVELSAN ADVENT CMS"},{k:"Veri Bağları",v:"Link 11, Link 16, Link 22, SIMPLE, JREAP"},{k:"EM İstihbarat",v:"Radar ve haberleşme emisyon tespiti, sınıflandırma, konumlama"},{k:"Hidro-Akustik",v:"Denizaltı ve su altı aktivite izleme"},{k:"Elektro-Optik",v:"EO/IR gözetleme"},{k:"Platform Yönetimi",v:"YALTES PIKET3000 IPMS"},{k:"Operatör",v:"Türk Deniz Kuvvetleri + MİT"},{k:"Yerli Katkı",v:"194 yerli firma"},{k:"Tatbikat",v:"Mavi Vatan 2022"}],
    scenarios:["Stratejik SIGINT","Deniz Hakimiyeti","ELINT Toplama","COMINT Dinleme","NATO Tatbikatları","EM İstihbarat","Deniz Gözetleme","MİT Ortak Operasyonları"],
  },
  { id:"marlin", name:"MARLIN EW 100 İDA", producer:"ASELSAN / SEFİNE", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"EH Yetenekli İnsansız Deniz Aracı", img:"🚢",
    summary:"Dünyanın ilk EH yetenekli insansız su üstü aracıdır (İDA). ARES-2NC ESM ve AREAS-2NC ECM sistemleriyle donatılmış olup 72 saatten fazla otonom dayanıklılık sağlar. SATCOM ile ufuk ötesi iletişim kurabilir. REPMUS 2022 ve Denizkurdu-II/2024 NATO tatbikatlarında başarıyla doğrulanmıştır. Filo ön cephesinde insansız EH ve ISR görevi icra eder.",
    specs:[{k:"ESM",v:"ARES-2NC (radar emisyon tespiti)"},{k:"ECM",v:"AREAS-2NC (radar karıştırma/aldatma)"},{k:"Dayanıklılık",v:"72+ saat otonom görev"},{k:"İletişim",v:"SATCOM ufuk ötesi (BLOS)"},{k:"NATO Doğrulama",v:"REPMUS 2022, Denizkurdu-II/2024"},{k:"Yapımcı",v:"SEFİNE Tersanesi (ASELSAN EH entegrasyonu)"},{k:"Görev",v:"İnsansız ön cephe EH, ISR, mayın keşfi"},{k:"Özellik",v:"Dünyanın ilk EH yetenekli İDA"}],
    scenarios:["Deniz Hakimiyeti","İnsansız Deniz EH","SIGINT","Filo Ön Cephe","NATO","Mayın Keşfi","İhracat"],
  },
  { id:"cmds", name:"CMDS / KTSS", producer:"EHSİM", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"Saçma/Parlak Fişek Atıcı", img:"✈️",
    summary:"EHSİM tarafından üretilen Karşı Tedbir Salma Sistemi (KTSS) olup 2006'dan beri Türk Hava Kuvvetleri'nde hizmet vermektedir. F-16 Blok 30/40/50, F-4 Phantom ve Hürkuş eğitim/hafif taarruz uçağı platformlarında kullanılır. Lockheed Martin sertifikalı olup saçma (chaff) ve parlak fişek (flare) mühimmatlarını otomatik veya manuel olarak dağıtarak radar ve IR güdümlü füzelere karşı koruma sağlar. Hürkuş'a entegrasyonu başarıyla tamamlanmıştır.",
    specs:[{k:"Üretici",v:"EHSİM (ASELSAN/HAVELSAN/SSTEK ortak girişimi)"},{k:"Platformlar",v:"F-16 Blok 30/40/50, F-4 Phantom, Hürkuş"},{k:"Sertifika",v:"Lockheed Martin sertifikalı"},{k:"Envanter",v:"2006'dan beri aktif hizmette"},{k:"Mühimmat",v:"Saçma (chaff) + Parlak fişek (flare)"},{k:"Dağıtım Modları",v:"Otomatik + manuel"},{k:"Hürkuş Entegrasyonu",v:"Başarıyla tamamlandı"},{k:"Görev",v:"Radar ve IR güdümlü füzelere karşı pasif koruma"}],
    scenarios:["Konvansiyonel Savaş","Elektronik Koruma","Hava Öz-Koruma","Eğitim"],
  },
  { id:"ewttr", name:"EWTTR", producer:"HAVELSAN", force:"kara", status:"Envanterde / İhracat", statusColor: C.green,
    type:"EH Test ve Eğitim Alanı", img:"🎓",
    summary:"HAVELSAN tarafından geliştirilen Türkiye'nin en büyük Elektronik Harp Test ve Eğitim Alanıdır. Konya'da konuşlanmış olup tüm hava EH sistemlerinin doğrulama, kalibrasyon ve eğitim ihtiyacını karşılar. Suudi Arabistan, Pakistan ve Güney Kore olmak üzere 3 ülkeye ihraç edilmiştir. Gerçekçi tehdit simülasyonu ile EH personelinin eğitimini ve sistem performansının ölçülmesini sağlar.",
    specs:[{k:"Üretici",v:"HAVELSAN"},{k:"Konum",v:"Konya"},{k:"İhracat",v:"Suudi Arabistan, Pakistan, Güney Kore"},{k:"Görev",v:"Tüm hava EH sistemlerinin doğrulama, kalibrasyon ve eğitimi"},{k:"Yetenek",v:"Gerçekçi tehdit simülasyonu ve performans ölçümü"},{k:"Eğitim",v:"EH personeli eğitimi ve sertifikasyonu"}],
    scenarios:["Eğitim / Simülasyon","Sistem Doğrulama","Kalibrasyon","İhracat"],
  },
  { id:"kaaneh", name:"KAAN EH Mimarisi", producer:"ASELSAN / TUSAŞ", force:"arge", status:"Geliştirmede (2028+)", statusColor: C.arge,
    type:"5. Nesil Entegre EH Mimarisi", img:"🔮",
    summary:"Türkiye'nin en gelişmiş ve kapsamlı EH mimarisidir. IRFS (Entegre RF Sensör Süiti), IEOS (Entegre Elektro-Optik Sistem) ve BURFİS (Dağıtık Radar Süiti) olmak üzere üç ana alt sistemden oluşur. MURAD 6000-A AESA radarı kritik tasarım safhasına geçmiştir. İlk parti 20 uçağın 2028'de teslimi hedeflenmektedir. 5. nesil stealth uçağının düşük gözlemlenebilirlik özelliğini koruyarak tam spektrum EH yeteneği sunar.",
    specs:[{k:"IRFS",v:"MURAD 6000-A AESA radar + geniş bant spektrum izleme + yönlü karıştırma"},{k:"MURAD 6000-A Durum",v:"Kritik Tasarım Safhası (CDR)"},{k:"IEOS",v:"TOYGUN 100 EOTS + KARAT 100 IRST + LIAS 300 + YILDIRIM 300 DIRCM"},{k:"BURFİS",v:"Dağıtık radar süiti (KAAN'a özel, konformal antenler)"},{k:"SİS",v:"RF aktif harcama aldatması (EHSİM)"},{k:"İlk Parti",v:"2028 (20 uçak hedefi)"},{k:"Prototip",v:"Geliştirilmiş prototiplerde sensör ve anten değişiklikleri"},{k:"Stealth Uyumu",v:"Düşük gözlemlenebilirlik ile tam spektrum EH dengesi"}],
    scenarios:["SEAD/DEAD","5. Nesil Hava Muharebesi","Elektronik Koruma","NATO","Stealth Operasyonlar"],
  },
  { id:"tf2000", name:"TF-2000 EH Süiti", producer:"ASELSAN / ASFAT", force:"arge", status:"Geliştirmede (2030)", statusColor: C.arge,
    type:"Hava Savunma Muhribi EH Süiti", img:"🔮",
    summary:"TF-2000 Tepe sınıfı hava savunma muhribi için geliştirilen, İstif sınıfından daha güçlü ve kapsamlı EH süitidir. Yeni nesil ARES/AREAS, NAZAR DIRCM, TORK sert öldürme, HIZIR torpido KT ve CAFRAD sabit EH dizilerini entegre eder. Omurgası 2 Ocak 2025'te kızağa konmuştur. Çelik Kubbe deniz bileşeninin amiral gemisi olacaktır.",
    specs:[{k:"Omurga Kızağa Koyma",v:"2 Ocak 2025"},{k:"ESM",v:"Yeni nesil ARES (geliştirilmiş)"},{k:"ECM",v:"Yeni nesil AREAS (geliştirilmiş)"},{k:"Lazer EH",v:"NAZAR DIRCM (TF-2000 için özel tasarım)"},{k:"Torpido KT",v:"TORK sert öldürme + HIZIR yumuşak öldürme"},{k:"Sabit EH Dizileri",v:"CAFRAD konformal antenler"},{k:"Saçma/Aldatma",v:"KARTACA-N"},{k:"Teslim Hedefi",v:"2030"},{k:"Stratejik Rol",v:"Çelik Kubbe deniz bileşeni amiral gemisi"}],
    scenarios:["Deniz Hakimiyeti","Filo Hava Savunma","Elektronik Koruma","NATO","Çelik Kubbe"],
  },
  { id:"milden", name:"MİLDEN EH Süiti", producer:"ASELSAN / STM", force:"arge", status:"Geliştirmede (2035+)", statusColor: C.arge,
    type:"Milli Denizaltı EH Süiti", img:"🔮",
    summary:"Türkiye'nin ilk tamamen yerli tasarım denizaltısı (MİLDEN/Atılay sınıfı) için geliştirilen tam yerli elektronik ve sensör süitidir. Sonar, optronik direk (DENİZGÖZÜ MERCAN) ve EH öz-koruma alt sistemlerinin tamamı yerli üretim olacaktır. Omurgası 2 Ocak 2025'te Gölcük Tersanesi'nde kızağa konmuştur. Türkiye'nin denizaltı teknolojisinde tam bağımsızlık hedefinin temel taşıdır.",
    specs:[{k:"Omurga Kızağa Koyma",v:"2 Ocak 2025, Gölcük Tersanesi"},{k:"Sonar",v:"Tam yerli sonar süiti"},{k:"Optronik Direk",v:"DENİZGÖZÜ MERCAN (ASELSAN)"},{k:"EH Öz-Koruma",v:"Tam yerli (ARES-2SC 200 türevi bekleniyor)"},{k:"Torpido KT",v:"ZARGANA türevi"},{k:"Yerlilik",v:"%100 yerli tasarım ve üretim"},{k:"Teslim Hedefi",v:"2030'ların ikinci yarısı"},{k:"Denizaltı Sınıfı",v:"Atılay sınıfı (MİLDEN)"}],
    scenarios:["Denizaltı Harbi","Elektronik Koruma","Gizli Keşif","Teknoloji Bağımsızlığı"],
  },
  { id:"jinn", name:"JINN", producer:"EHSİM", force:"hava", status:"Seri Üretim", statusColor: C.green,
    type:"Kompakt DRFM Stand-in Karıştırıcı", img:"🎲",
    summary:"JINN (Jammer Integrated Nullification Node), EHSİM (ASELSAN %50, HAVELSAN %49, TSK Vakfı %1 ortaklığı) tarafından geliştirilen kompakt DRFM tabanlı stand-in karıştırma sistemidir. Düşman radarlarına yakın mesafede konuşlanarak düşük güç tüketimi ve düşük iz bırakma özelliğiyle radar ve sensör sistemlerini etkisiz hale getirir. Aynı anda birden fazla tehdide sahte sinyal göndererek aldatma, baraj karıştırma, yan lob karıştırma ve hayalet hedef üretme gibi gelişmiş modları icra edebilmektedir. IDEF 2025'te ilk kez kamuoyuna tanıtılmış, EDEX 2025'te uluslararası pazara sunulmuştur. KAAN 5. nesil savaş uçağı ve F-16 dahil çeşitli hava platformlarına entegrasyonu planlanmaktadır.",
    specs:[{k:"Üretici",v:"EHSİM Elektronik Harp Sistemleri"},{k:"Teknoloji",v:"DRFM (Digital Radio Frequency Memory)"},{k:"Mimari",v:"Yeniden yapılandırılabilir, programlanabilir yazılım mimarisi"},{k:"Karıştırma Modları",v:"Aldatıcı, Baraj, Yan Lob, Hayalet Hedef, Yönlü Karıştırma"},{k:"Çoklu Tehdit",v:"Eş zamanlı birden fazla tehdide sahte sinyal gönderme"},{k:"Frekans",v:"Geniş frekans spektrumu (detay gizli)"},{k:"Güç Tüketimi",v:"Düşük (stand-in konsepti)"},{k:"Tasarım",v:"Kompakt ve minyatür, düşük görünürlük (LPI/LPD)"},{k:"Entegrasyon",v:"Tak-çalıştır (Plug & Play)"},{k:"Uyumlu Platformlar",v:"İHA/SİHA, F-16, KAAN, dolanan mühimmat"},{k:"Komuta-Kontrol",v:"Yer istasyonu veya uçuş kontrol sistemi üzerinden"},{k:"Eğitim",v:"Kullanıcı dostu angajman simülatörü yazılımı"},{k:"İlk Tanıtım",v:"IDEF 2025 (İstanbul)"},{k:"Uluslararası Tanıtım",v:"EDEX 2025 (Mısır)"}],
    scenarios:["SEAD/DEAD","Hava Hakimiyeti","Konvansiyonel Savaş","İHA Operasyonları","Stand-in Karıştırma","Hayalet Hedef Üretme","Dolanan Mühimmat EH","KAAN Entegrasyonu"],
  },
  { id:"milkar3a3", name:"MİLKAR-3A3", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Mobil V/UHF Elektronik Taarruz Sistemi", img:"📻",
    summary:"MİLKAR-3A3, ASELSAN tarafından geliştirilen Mobil V/UHF Elektronik Taarruz Sistemidir. 30–3000 MHz frekans aralığında düşman haberleşme sistemlerine analog ve sayısal karıştırma sinyalleri uygulayarak hedef iletişimi engelleyebilir, geciktirebilir veya yanlış bilgi iletimine sebep olabilir. Ağustos 2019'da Kara Kuvvetleri'ne ilk 11 sistem teslim edilmiş, Bahar Kalkanı Harekâtı'nda (2020) muharebe ortamında operasyonel etkinliğini kanıtlamıştır. ASELSAN'ın 2025'te Polonya ile imzaladığı 410 milyon dolarlık EH ihracat anlaşması, MİLKAR ailesinin uluslararası kabulünün göstergesidir.",
    specs:[{k:"Frekans Aralığı",v:"30 – 3000 MHz (V/UHF bandı)"},{k:"Karıştırma Tipleri",v:"Sürekli, Arabakışlı, Hedef Tetiklemeli"},{k:"Karıştırma Modları",v:"Tekli, Sıralı, Çoklu, Baraj, Reaktif"},{k:"Karıştırma Kaynakları",v:"Ton, Basamaklı Ton, Üçgen, Ramp, Gürültü, Kayıtlı Ses"},{k:"Hedef Karıştırma",v:"FHSS, DSSS ve GNSS yayınlarına karşı etkin"},{k:"Araç Platformu",v:"4x4 taktik araç (alt/üst bant: 2 araç veya tek araç konfigürasyonu)"},{k:"ED Desteği",v:"Karıştırmaya destek amaçlı hedef arama, yakalama, parametre tespiti"},{k:"Dost Koruma",v:"Dost frekans atlamalı telsiz haberleşmesine koruma"},{k:"Görev Planlama",v:"Analiz yeteneğine sahip görev planlama yazılımı"},{k:"İlk Teslimat",v:"Ağustos 2019 (11 sistem, KKK)"},{k:"Muharebe Kanıtı",v:"Bahar Kalkanı Harekâtı (2020)"},{k:"İhracat",v:"Polonya (410 milyon USD EH anlaşması, 2025)"}],
    scenarios:["Konvansiyonel Savaş","Haberleşme Karıştırma","Sınır Ötesi Harekât","GNSS Karıştırma","Asimetrik Harp","Bahar Kalkanı","Reaktif Karıştırma","ED-ET Entegrasyonu"],
  },
  { id:"milked3a3", name:"MİLKED-3A3 / SÖKMEN", producer:"ASELSAN", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Mobil V/UHF Elektronik Destek (COMINT)", img:"👂",
    summary:"MİLKED-3A3 (SÖKMEN), ASELSAN tarafından geliştirilen Mobil V/UHF Elektronik Destek Sistemidir. Düşman haberleşme sistemlerini tespit, teşhis, yön bulma, dinleme ve konuşulan dile kadar analiz etme kabiliyetine sahiptir. Yapay zeka destekli sinyal analiz teknikleri kullanarak yüksek doğruluk seviyelerinde sinyal tanıma ve sınıflandırma yapabilmektedir. Kış 2025 Tatbikatı'nda ilk kez sahada kullanılmış olup Kara Kuvvetleri Komutanlığı envanterine girmiştir. MİLKAR-3A3 ile koordineli çalışarak tespit edilen hedeflere karıştırma yönlendirilmesi sağlar.",
    specs:[{k:"Frekans Aralığı",v:"30 – 3000 MHz (V/UHF bandı)"},{k:"Sinyal Tespit",v:"Hedef V/UHF haberleşme sinyallerinin tespiti ve takibi"},{k:"Yön Bulma (DF)",v:"Sinyallerin yönü ve yerinin hassas belirlenmesi"},{k:"Dinleme ve Analiz",v:"Sinyal dinleme ve konuşulan dile kadar analiz"},{k:"Yapay Zeka",v:"AI destekli sinyal tanıma ve sınıflandırma"},{k:"Araç Platformu",v:"4x4 taktik araç (tek araç konfigürasyonu)"},{k:"Hareket Kabiliyeti",v:"Yüksek taktik mobilite, sıçrama yeteneği"},{k:"Platform Bağımsızlığı",v:"Farklı platformlara entegrasyon imkânı"},{k:"İlk Operasyonel Kullanım",v:"Kış 2025 Tatbikatı (KKK)"},{k:"Entegrasyon",v:"MİLKAR-3A3 ET sistemi ile koordineli çalışma"}],
    scenarios:["SIGINT / İstihbarat","Haberleşme Keşfi","Sınır Güvenliği","Konvansiyonel Savaş","Asimetrik / Terörle Mücadele","Hedef Tespit ve Konum Belirleme","AI Sinyal Sınıflandırma","ED-ET Entegrasyonu"],
  },
  { id:"hehsis", name:"HEHSİS / HEWS", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"Helikopter EH Kendini Koruma Süiti", img:"🚁",
    summary:"HEHSİS (Helikopter Elektronik Harp Kendini Koruma Sistemi), ASELSAN tarafından döner ve sabit kanat hava platformları için geliştirilen entegre bir EH süitidir. Radar İkaz Alıcısı (RWR), Füze İkaz Sistemi (MWS), Lazer İkaz Alıcısı (LWR), AESA tabanlı DRFM RF Karıştırıcı ve Karşı Tedbir Atıcı (CMDS) alt sistemlerinden oluşmaktadır. S-70 Black Hawk, AS532 Cougar, T129 ATAK ve T-70 helikopterlerine entegre edilmiş olup yaklaşık 576 milyon dolarlık üretim sözleşmesi kapsamında seri üretimi devam etmektedir. Şili Silahlı Kuvvetleri'ne AS532 Cougar platformu için ihraç edilmiştir.",
    specs:[{k:"Alt Sistemler",v:"RWR, MWS, LWR, RF Karıştırıcı (RFJ), CMDS"},{k:"RF Karıştırıcı",v:"AESA tabanlı Katı Hal Güç Yükselteci + DRFM"},{k:"Alıcı Tipi",v:"Dar bant ve geniş bant sayısal alıcılar"},{k:"Mimari",v:"Açık mimari, modüler yapı"},{k:"Entegre Platformlar",v:"S-70, AS532 Cougar, T129 ATAK, T-70, AH-1W Cobra"},{k:"Sözleşme Değeri",v:"~576 milyon USD (TSK filo donanımı)"},{k:"İhracat",v:"Şili Silahlı Kuvvetleri (AS532 Cougar)"},{k:"Karşı Tedbir",v:"Otomatik kombine RF karıştırma + chaff/flare"},{k:"NVG Uyumu",v:"Gece görüş gözlüğü uyumlu arayüz"},{k:"Veri Kayıt",v:"Uçuş içi olay ve PDW kaydı"},{k:"Görev Dosyası",v:"Tek noktadan Mission Data File yükleme/indirme"}],
    scenarios:["Helikopter Öz-Koruma","MANPADS Savunması","Taarruz Helikopteri Operasyonları","Sınır Ötesi Harekât","Özel Kuvvet Operasyonları","Lazer Güdümlü Silah Savunması","İhracat Platformları","Çok Tehditli Ortam"],
  },
  { id:"yildirim100", name:"YILDIRIM-100 DIRCM", producer:"ASELSAN", force:"hava", status:"Test (2025)", statusColor: C.amber,
    type:"Yönlendirilmiş Kızılötesi Karşı Tedbir", img:"💎",
    summary:"YILDIRIM-100, ASELSAN tarafından geliştirilen Yönlendirilmiş Kızılötesi Karşı Tedbir (DIRCM) sistemidir. Çift taret konfigürasyonuyla 360 derece küresel kapsama sağlayarak ısı güdümlü füzelerin (özellikle MANPADS) kızılötesi arayıcı başlıklarını çok bantlı lazer enerjisi ile kör eder. 4 Temmuz 2025 tarihinde helikopter platformunda gerçek muhimmatlı canlı atış testlerini başarıyla tamamlamış ve IR güdümlü füzeleri saptırmayı başarmıştır. KAAN savaş uçağı için geliştirilen YILDIRIM-300'ün küçük platform versiyonudur.",
    specs:[{k:"Lazer Tipi",v:"Çok bantlı (multi-band) yüksek güçlü yönlendirilmiş lazer"},{k:"Taret Konfigürasyonu",v:"Çift taret - her tarette Hassas Takip + Lazer Ünitesi"},{k:"Kapsama Alanı",v:"360 derece küresel (hemispherical) koruma"},{k:"Eş Zamanlı Tehdit",v:"Birden fazla IR güdümlü füzeye eş zamanlı müdahale"},{k:"Çalışma Modu",v:"Tam otomatik"},{k:"MWS Uyumu",v:"UV ve IR tabanlı füze ikaz sistemleri ile uyumlu"},{k:"Test Tarihi",v:"4 Temmuz 2025 - canlı atış testi başarılı"},{k:"Test Platformu",v:"Helikopter (gerçek muhimmat ile)"},{k:"Hedef Tehdit",v:"MANPADS - IR güdümlü füzeler"},{k:"Tasarım",v:"Kompakt ve hafif"},{k:"İleri Versiyon",v:"YILDIRIM-300 (KAAN 5. nesil savaş uçağı için)"}],
    scenarios:["MANPADS Savunması","Helikopter Öz-Koruma","Taarruz Helikopteri Operasyonları","Nakliye Helikopteri Koruma","Flare Alternatifi","Gizli Operasyonlarda Sessiz Koruma","İnsani Yardım / Tahliye","KAAN DIRCM Geliştirme"],
  },
  { id:"ozisik", name:"ÖZIŞIK CMDS", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"Karşı Tedbir Atıcı Sistem (Chaff/Flare)", img:"✨",
    summary:"ÖZIŞIK, ASELSAN tarafından geliştirilen Karşı Tedbir Atıcı Sistem (CMDS) olup hava platformlarını RF ve IR güdümlü tehditlere karşı chaff ve flare muhimmat atımı ile korumaktadır. 2006 yılından bu yana TSK envanterindeki 350'den fazla hava platformunda aktif olarak kullanılmaktadır. 2400 farklı chaff/flare atım programı sunan sistem, otomatik, yarı-otomatik, manuel ve bypass olmak üzere dört çalışma moduna sahiptir. F-16, F-4, S-70, AS532, T129 ve T-70 platformlarına entegre edilmiş olup NATO standart kartuşlarıyla uyumludur.",
    specs:[{k:"Atım Programı Sayısı",v:"2400 farklı chaff/flare programı"},{k:"Program Tipleri",v:"Periyodik (Tip-1), Aperiyodik (Tip-2), Özel (Tip-3)"},{k:"Çalışma Modları",v:"Otomatik, Yarı-Otomatik, Manuel, Bypass"},{k:"Magazin (1\"x1\"x8\")",v:"Her magazin 30 adet aldatıcı"},{k:"Magazin (2\"x1\"x8\")",v:"Her magazin 15 adet aldatıcı"},{k:"Atıcı Kontrol",v:"Her DCU 4 adede kadar magazin bağlantısı"},{k:"Uyumlu Platformlar",v:"F-16, F-4, S-70, AS532, T129, T-70"},{k:"Envanterdeki Sayı",v:"350+ hava aracı (2006'dan beri)"},{k:"NATO Uyumu",v:"Standart NATO kartuşlarıyla tam uyumlu"},{k:"Entegrasyon",v:"Bağımsız veya HEWS süiti ile entegre"},{k:"Ek Özellikler",v:"Otomatik ateş etmeme tespiti, sürekli envanter izleme, kritik muhimmat uyarısı"}],
    scenarios:["F-16 Öz-Koruma","Helikopter Öz-Koruma","Radar Güdümlü Füze Savunması","IR Güdümlü Füze Savunması","Kombine Chaff/Flare Atımı","HEWS Entegrasyonu","Gece Görevleri","Taarruz Uçuşları"],
  },
  { id:"ases", name:"ASES / ASES-235M", producer:"ASELSAN", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"Entegre EH Kendini Koruma Sistemi", img:"🛩️",
    summary:"ASES, Türkiye'de geliştirilen ilk entegre Elektronik Harp Kendini Koruma Sistemidir. ASELSAN tarafından geliştirilen sistem, Merkezi Yönetim Birimi etrafında Radar İkaz Alıcısı (RWR), Füze İkaz Sistemi (MWS) ve Chaff/Flare Sarfedici (CMDS) alt sistemlerinden oluşmaktadır. ASES-235M versiyonu, MELTEM-II Projesi kapsamında 6 adet CN-235 deniz karakol uçağına entegre edilmiş ve 2013 yılında teslimatları tamamlanmıştır. Glass-cockpit uyumlu arayüzü ve NVG desteği ile pilota kapsamlı durumsal farkındalık sağlamaktadır.",
    specs:[{k:"Alt Sistemler",v:"RWR, MWS, CMDS"},{k:"Merkezi Yönetim Birimi",v:"Tüm alt sistemleri koordineli yöneten CMU"},{k:"Kokpit Kontrol (CCDU)",v:"Glass-cockpit uyumlu, MFD destekli arayüz"},{k:"Bellek Yükleme (MLU)",v:"Görev veri dosyası yükleme/indirme"},{k:"Platform Uyumu",v:"CN-235 (MELTEM-II), ATR-72/600 (MELTEM-III)"},{k:"NVG Uyumu",v:"Gece görüş gözlüğü uyumlu kokpit"},{k:"Kayıt",v:"Uçuş sırası olay ve RWR kaydı"},{k:"Tehdit Uyarı",v:"Programlanabilir sesli mesajlar, tehdit tipi ve yönü"},{k:"Yer Destek",v:"Görev veri dosyası oluşturma ve görev sonrası analiz yazılımı"},{k:"Teslimat",v:"2013 (6 adet CN-235, Deniz Kuvvetleri)"},{k:"Proje",v:"MELTEM-II Deniz Karakol Uçağı Projesi"}],
    scenarios:["Deniz Karakol Uçağı Koruma","Radar İkaz ve Uyarı","Füze İkaz ve Karşı Tedbir","Görev Sonrası İstihbarat Analizi","Gece Görevi Koruma","Çok Tehditli Ortam","Tehdit Kütüphanesi Güncelleme","MELTEM Projesi"],
  },
  { id:"asoj234u", name:"ASOJ-234U (İHASOJ)", producer:"ASELSAN", force:"hava", status:"Geliştirmede (2026)", statusColor: C.amber,
    type:"İHA Stand-Off Jammer", img:"📡",
    summary:"ASOJ-234U, ASELSAN tarafından İHASOJ Projesi kapsamında geliştirilen, dünyada ilk kez bir insansız hava aracı platformundan radar ve haberleşme karıştırma kabiliyeti sağlayan elektronik harp sistemidir. Bayraktar AKINCI TIHA'nın kanat ucu ve merkez hattına entegre edilen podlardan oluşmakta olup REDET (Radar ES/ET) ve HEDET (Haberleşme ES/ET) konfigürasyonlarında görev yapabilmektedir. 2023 yılında sözleşmeye bağlanan proje kapsamında 2026 sonuna kadar 2 adet AKINCI teslim edilmesi planlanmaktadır. Ekim 2025'te ANTIDOT 2-U/ES ve EA podları ile ilk uçuş tatbikatları gerçekleştirilmiştir.",
    specs:[{k:"Proje Adı",v:"İHASOJ (İnsansız Hava Aracı Stand-Off Jammer)"},{k:"Konfigürasyon 1",v:"REDET - Radar Elektronik Destek ve Taarruz (ELINT + Radar Jammer)"},{k:"Konfigürasyon 2",v:"HEDET - Haberleşme Elektronik Destek ve Taarruz (COMINT + Comms Jammer)"},{k:"Frekans Bantları",v:"HF, UHF ve radar bantları (geniş spektrum)"},{k:"Platform",v:"Bayraktar AKINCI TIHA"},{k:"Havada Kalış",v:"17–18 saat (AKINCI platformu ile)"},{k:"Sözleşme",v:"2023 sonu"},{k:"Planlanan Teslimat",v:"2026 sonu (2 adet AKINCI)"},{k:"İlişkili Podlar",v:"ANTIDOT 2-U/ES, ANTIDOT 2-U/EA"},{k:"İlk Uçuş Tatbikatı",v:"Ekim 2025"},{k:"Özellik",v:"Dünyada ilk İHA tabanlı stand-off jamming"}],
    scenarios:["SEAD/DEAD","ELINT Toplama","COMINT Toplama","Uzun Süreli EH Görevi","Eskort Karıştırma","Aldatma ve Sahte Hedef","HAVASOJ Koordinasyonu","İnsansız EH Operasyonları"],
  },
  { id:"agnosis", name:"AGNOSIS", producer:"Meteksan", force:"kara", status:"Envanterde", statusColor: C.green,
    type:"Anti-Jamming / Anti-Spoofing GNSS", img:"🛰️",
    summary:"AGNOSIS, Meteksan Savunma tarafından tamamen milli kaynaklarla geliştirilen, karıştırıcı ve aldatıcı sinyallere karşı dirençli küresel konumlandırma sistemidir. CRPA (Kontrollü Alım Örüntülü Anten) teknolojisi ve ileri sinyal işleme algoritmaları kullanarak GNSS karıştırıcı sinyallerini mekansal filtreleme yöntemiyle bastırır. GPS, GLONASS, Galileo ve BeiDou uydu sinyallerini eş zamanlı destekleyerek 4, 8 veya 16 antenli dizi konfigürasyonlarında çalışabilmektedir. Füze, İHA, helikopter, uçak, zırhlı araç ve gemi gibi çok çeşitli platformlarda aktif olarak kullanılmakta ve ihracat başarısı elde etmiştir.",
    specs:[{k:"Anten Teknolojisi",v:"CRPA (Controlled Reception Pattern Antenna)"},{k:"Anten Konfigürasyonları",v:"4, 8 veya 16 elemanlı faz dizisi"},{k:"Desteklenen Uydular",v:"GPS, GLONASS, Galileo, BeiDou (eş zamanlı)"},{k:"Frekans Bantları",v:"GPS L1, GPS L2, GLONASS L1 ve diğer GNSS bantları"},{k:"Anti-Jam Teknikleri",v:"Hüzme Sıfırlama (Beam Nulling), Darbe Baskılama, Frekans Çentikelme"},{k:"Anti-Spoofing",v:"Mekansal filtreleme ile sahte uydu sinyallerinin tespiti"},{k:"GNSS Alıcı",v:"Harici veya gömülü çok bantlı seçenek"},{k:"Platform Uyumu",v:"Füzeler, İHA, deniz araçları, helikopterler, uçaklar, zırhlı araçlar, gemiler"},{k:"Bant Bağımsızlığı",v:"Her frekans bandında bağımsız eş zamanlı beam-nulling"},{k:"Anten Tasarımı",v:"Konformal / Blade tipi aerodinamik yapılar"},{k:"Operasyonel Durum",v:"Türkiye ve dünya genelinde aktif kullanım"}],
    scenarios:["GNSS Karıştırma Ortamında Navigasyon","Füze Hassas Güdümü","İHA Otonom Görev Sürekliliği","Deniz Platformu GNSS Spoofing Koruma","Helikopter Güvenli Navigasyon","Çoklu Karıştırıcı Etkisizleştirme","Zırhlı Araç Konum Doğruluğu","Elektronik Koruma"],
  },
  { id:"antidot2u_lbmbhb", name:"ANTIDOT 2-U LB/MB/HB", producer:"ASELSAN", force:"hava", status:"Üretimde", statusColor: C.cyan,
    type:"Hafif İHA Refakat Karıştırma Podu", img:"🪶",
    summary:"ANTIDOT 2-U LB/MB/HB, ASELSAN tarafından geliştirilen, elektronik destek ve elektronik taarruz yeteneklerine sahip kompakt bir İHA elektronik harp pod ailesidir. LB (Düşük Bant), MB (Orta Bant) ve HB (Yüksek Bant) olmak üzere üç ayrı pod versiyonundan oluşmaktadır. Sadece 11 kg ağırlığında olan bu podlar, MAM-L muhimmatı taşıyabilen tüm İHA'lara kolayca entegre edilebilir. SAHA EXPO 2024'te ilk kez tanıtılmış, 2025'te Bayraktar TB2 üzerinde başarılı uçuş testlerini tamamlamıştır.",
    specs:[{k:"Ağırlık",v:"~11 kg (her bir pod)"},{k:"Güç Tüketimi",v:"380 W"},{k:"Frekans Bantları",v:"LB (Düşük Bant), MB (Orta Bant), HB (Yüksek Bant)"},{k:"Görev Tipi",v:"Refakat Karıştırması (Escort Jamming)"},{k:"Anten Yapısı",v:"Yönlü anten (ön) + Çevresel anten (alt, 360°)"},{k:"Platform Uyumu",v:"Bayraktar TB2, MAM-L taşıyabilen tüm taktik İHA'lar"},{k:"Askı Uyumu",v:"MAM-L askı noktalarına doğrudan montaj"},{k:"Çalışma Modu",v:"Tam otonom"},{k:"İlk Tanıtım",v:"SAHA EXPO 2024 (İstanbul)"},{k:"İlk Uçuş Testi",v:"2025 (TB2 üzerinde)"},{k:"Koruma Kapsamı",v:"Hem taşıyıcı hem de yakınındaki dost hava unsurları"}],
    scenarios:["TB2 Refakat Karıştırma","MAM-L Operasyonlarında EH Koruma","Taktik İHA Filo Koruması","Düşman Radar Bastırma","Güvenli Hava Koridoru","Çok Bantlı EH Planlama","Keşif/Gözetleme İHA Koruma","İHA Sürü Operasyonları"],
  },
  { id:"antidot2u200", name:"ANTIDOT 2-U 200", producer:"ASELSAN", force:"hava", status:"Test (2025)", statusColor: C.amber,
    type:"Yeni Nesil Birleşik ES+EA Podu", img:"⚡",
    summary:"ANTIDOT 2-U 200, ASELSAN tarafından geliştirilen yeni nesil bir elektronik harp podudur ve tek bir pod içerisinde hem Elektronik Destek (ES) hem de Elektronik Taarruz (EA) yeteneklerini birleştirmektedir. 45 kg ağırlığında ve 1100 W güçle çalışan sistem, birden fazla düşman radarını aynı anda tespit, analiz ve aldatma yeteneğine sahiptir. 2025 yılında ilk uçuş testini başarıyla tamamlamıştır. Suudi Arabistan Savunma Bakanlığı ile ihracat görüşmeleri devam etmektedir.",
    specs:[{k:"Ağırlık",v:"45 kg"},{k:"Güç Tüketimi",v:"1100 W"},{k:"Yetenek",v:"Birleşik ES (Elektronik Destek) + EA (Elektronik Taarruz)"},{k:"Çoklu Hedef",v:"Birden fazla radarı eş zamanlı tespit, teşhis ve aldatma"},{k:"Çalışma Modu",v:"Tam otonom"},{k:"ES Yetenekleri",v:"Radar emisyonu tespit, sınıflandırma, kayıt, hassas konum belirleme"},{k:"EA Yetenekleri",v:"Yüksek güçlü karıştırma ve aldatma teknikleri"},{k:"Modüler Mimari",v:"Büyük SİHA'lardan taktik İHA'lara kadar entegrasyon"},{k:"Platform Uyumu",v:"Akıncı, TB2, ANKA, AKSUNGUR"},{k:"İlk Uçuş Testi",v:"2025 (başarılı)"},{k:"Veri Aktarımı",v:"Gerçek zamanlı yer kontrol istasyonuna"},{k:"İhracat",v:"Suudi Arabistan ile görüşmeler devam ediyor"}],
    scenarios:["SEAD/DEAD","Çoklu Radar Aldatma","Güvenli Hava Koridoru","Gerçek Zamanlı ELINT","Sahte Hedef Üretme","Karma İHA Operasyonları","Taktik İstihbarat Toplama","İhracat Programları"],
  },
  { id:"edpodk", name:"EDPOD-K", producer:"TÜBİTAK BİLGEM", force:"hava", status:"Geliştirmede", statusColor: C.amber,
    type:"İHA Elektronik Destek Podu", img:"🔬",
    summary:"EDPOD-K, TÜBİTAK BİLGEM İLTAREN tarafından insansız hava araçları için geliştirilen elektronik destek podudur. F-16 savaş uçakları için geliştirilen EDPOD projesinden edinilen deneyimlerden yararlanılarak görev odaklı, hafif, kompakt ve maliyet etkin bir çözüm olarak tasarlanmıştır. Yapay zeka destekli tespit ve teşhis algoritmalarına sahip olup geniş çalışma frekans aralığı ve yüksek doğrulukta yön bulma kapasitesiyle operasyon alanındaki tehdit radarlarının yerini belirler. SAHA EXPO 2024'te ilk kez sergilenmiştir.",
    specs:[{k:"Üretici",v:"TÜBİTAK BİLGEM İLTAREN"},{k:"Ağırlık",v:"30–40 kg"},{k:"SWAP",v:"Boyut, Ağırlık ve Güç için optimize edilmiş"},{k:"Yapay Zeka",v:"AI destekli tespit ve teşhis algoritmaları"},{k:"Frekans Aralığı",v:"Geniş çalışma frekans aralığı"},{k:"Anlık Bant Genişliği",v:"Yüksek anlık bant genişliği"},{k:"Açısal Kapsama",v:"Geniş açısal kapsama"},{k:"Yön Bulma",v:"Yüksek doğrulukta yön bulma ve konumlama"},{k:"Görev Planlama",v:"Programlanabilir görev veri dosyası tabanlı"},{k:"Görev Sonrası",v:"Kayıt ve detaylı görev sonrası analiz"},{k:"Platform Uyumu",v:"TB2, ANKA ve diğer silahlı İHA/SİHA'lar"},{k:"İlk Sergileme",v:"SAHA EXPO 2024"},{k:"Temel Proje",v:"F-16 EDPOD deneyimi üzerine geliştirildi"}],
    scenarios:["İHA ELINT Toplama","Tehdit Radar Haritalama","SEAD Öncesi Keşif","AI Destekli Sinyal Teşhis","Görev Sonrası İstihbarat","Çok Platformlu İHA Keşif","Radar Katalog Oluşturma","TB2 Elektronik Destek"],
  },
  { id:"pelikan", name:"PELİKAN RF GMSİM", producer:"Meteksan", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"RF Güdümlü Mermi Simülatörü / EH Test Sistemi", img:"🎯",
    summary:"PELİKAN RF Güdümlü Mermi Simülatörü, Meteksan Savunma tarafından tamamen yerli olarak tasarlanıp üretilen deniz kuvvetleri elektronik harp test ve değerlendirme sistemidir. Savaş gemilerindeki Elektronik Savunma ve Taarruz sistemlerinin etkinliğini gerçekçi gemisavar füze arayıcı radar simülasyonları ile değerlendirir. 2017 yılından bu yana Türk Deniz Kuvvetleri envanterinde operasyonel olan PELİKAN, Ku-Bant, X-Bant ve Geniş Bant olmak üzere üç ayrı RF donanım seti içermektedir. Taşınabilir sığınak içerisinde konuşlandırılarak farklı füze arayıcı tiplerini simüle edebilmektedir.",
    specs:[{k:"RF Donanım Setleri",v:"3 adet: Ku-Bant, X-Bant, Geniş Bant"},{k:"Her RF Set İçeriği",v:"Alıcı, Verici, Anten ve Gimbal"},{k:"Konfigürasyon",v:"1 Ana Kontrol Ünitesi + 3 Uzak Verici"},{k:"Yerleşim",v:"Taşınabilir sığınak (shelter) içerisinde entegre"},{k:"Yapılandırılabilir Parametreler",v:"Frekans, darbe genişliği, PRF, kapı boyutu, modülasyon, polarizasyon"},{k:"Dijital Altyapı",v:"Geniş dijital programlanabilir donanım"},{k:"Gerçek Zamanlı İzleme",v:"Emüle edilen füze davranışının anlık takibi"},{k:"Veri Kayıt",v:"Tüm verilerin kaydı ve görev sonrası analiz"},{k:"Envanter Girişi",v:"2017 (Türk Deniz Kuvvetleri)"},{k:"Yerlilik",v:"Tamamen yerli tasarım ve üretim"}],
    scenarios:["Gemisavar Füze Savunma Testi","RF Chaff/Aldatıcı Değerlendirme","Gemi Personeli EH Eğitimi","Füze Arayıcı Algoritma Testi","ED Sistemi Kalibrasyon","Radar EKÖ Teknik Geliştirme","Güdümlü Füze Savunma Optimizasyonu","Deniz Tatbikatı EH Senaryosu"],
  },
  { id:"zoka", name:"ZOKA", producer:"ASELSAN", force:"deniz", status:"Envanterde", statusColor: C.green,
    type:"Akustik Torpido Karşı Tedbir", img:"🔊",
    summary:"ZOKA, ASELSAN tarafından geliştirilen akustik torpido karşı tedbir karıştırıcı ve aldatıcı sistemidir. Karıştırıcı efektörler geniş bantlı yüksek seviyeli akustik gürültü yayarak platform sesini maskelerken, aldatıcılar platformun akustik ve dinamik karakteristiklerini taklit ederek torpidoyu kendi üzerine çeker. HIZIR (suüstü) ve ZARGANA (denizaltı) sistemleri bünyesinde kullanılmaktadır. Endonezya Donanması'na 2020'de Nagapasa sınıfı (Tip 209) denizaltılar için teslim edilmiş, Pakistan Deniz Kuvvetleri Agosta 90B için de fabrika kabul testleri tamamlanmıştır.",
    specs:[{k:"Efektör Tipleri",v:"Karıştırıcı (Jammer) ve Aldatıcı (Decoy)"},{k:"Karıştırıcı İşlevi",v:"Geniş bantlı yüksek seviyeli akustik gürültü üretimi"},{k:"Aldatıcı İşlevi",v:"Platform akustik ve dinamik karakteristik taklidi"},{k:"Torpido Modları",v:"Aktif, pasif ve kombine güdümlü akustik torpidolar"},{k:"Fırlatma Yöntemleri",v:"Suüstü gemi fırlatıcıları, denizaltı sinyal ejektörleri, dış fırlatıcılar"},{k:"Hareket Kabiliyeti",v:"Dikey ve/veya yatay düzlemde hareketli"},{k:"Varyantlar",v:"ZOKA 100-S/ED (denizaltı), ZOKA 100-N/ED (suüstü)"},{k:"Entegre Sistemler",v:"HIZIR (suüstü), ZARGANA (denizaltı)"},{k:"İhracat",v:"Endonezya (2020, Nagapasa/Tip 209), Pakistan (Agosta 90B MLU)"},{k:"Programlanabilirlik",v:"Programlanabilir akustik karakteristik ayarları"}],
    scenarios:["Denizaltı Torpido Savunması","Suüstü Gemi Torpido Koruma","Kombine Güdümlü Torpido Aldatma","Acil Torpido Karşı Tedbir","Platform Akustik Maskeleme","Filo Çok Katmanlı Akustik Savunma","İhracat Platformları Entegrasyonu","Sualtı Harbi"],
  },
  { id:"e7t", name:"E-7T Barış Kartalı", producer:"Boeing / ASELSAN / TUSAŞ", force:"hava", status:"Envanterde", statusColor: C.green,
    type:"AEW&C / Havadan Erken Uyarı ve Kontrol", img:"✈️",
    summary:"E-7T Barış Kartalı, Türk Hava Kuvvetleri envanterindeki dört adet Boeing 737 AEW&C platformlu havadan erken uyarı ve kontrol uçağıdır. Northrop Grumman MESA L-bant AESA radarı ile 600 km'yi aşkın mesafede hava ve deniz hedeflerini eş zamanlı tespit edebilmekte ve 360 derece kapsama alanı sunmaktadır. Üzerinde orijinal Elta EL/L-8382 ESM/ELINT sistemi (ASELSAN ARES-2A ile değiştirilmekte), AN/AAQ-24(V) Nemesis DIRCM, AAR-54(V) füze uyarı sistemi ve CMDS yer almaktadır. Fırat Kalkanı, Zeytin Dalı, Barış Pınarı ve Pençe Kilit harekâtlarında aktif görev almış olup NATO Ramstein Alloy ve NEXUS ACE tatbikatlarında havadan komuta kontrol görevi üstlenmiştir. Modernizasyon kapsamında ASELSAN ARES-2A ESM, IFF Mode 5/S, Karetta CRPA ve yeni görev bilgisayarları entegre edilmektedir.",
    specs:[{k:"Platform",v:"Boeing 737-700 IGW"},{k:"Ana Radar",v:"Northrop Grumman MESA L-bant AESA"},{k:"Radar Menzili",v:"Hava: 600+ km, Deniz (fırkateyn): 240+ km"},{k:"ESM/ELINT (Orijinal)",v:"Elta EL/L-8382 / BAE ALR-2001 Odyssey (0,5–18 GHz)"},{k:"ESM/ELINT (Yeni)",v:"ASELSAN ARES-2A (2025 teslimatı başladı)"},{k:"DIRCM",v:"AN/AAQ-24(V) Nemesis + Viper çok bantlı lazer"},{k:"MWS",v:"AAR-54(V) UV tabanlı Füze İkaz Sistemi"},{k:"CMDS",v:"Programlanabilir chaff/flare atıcı"},{k:"Anti-Jam GNSS",v:"ASELSAN Karetta CRPA"},{k:"IFF",v:"ASELSAN IFF Mode 5/S"},{k:"Dayanıklılık",v:"10 saat (18 saat havada ikmal ile)"},{k:"Tavan",v:"41.000 ft"},{k:"Mürettebat",v:"2 pilot + 6–10 görev operatörü (10 konsol)"},{k:"Envanter",v:"4 uçak: Kuzey, Güney, Doğu, Batı (131. Filo, Konya)"},{k:"Veri Bağı",v:"Link 16"},{k:"Muharebe Geçmişi",v:"Fırat Kalkanı, Zeytin Dalı, Barış Pınarı, Pençe Kilit"},{k:"NATO Görevleri",v:"Ramstein Alloy (Baltık), Romanya, Litvanya, NEXUS ACE"}],
    scenarios:["Havadan Erken Uyarı","SIGINT / ELINT Toplama","NATO Komuta Kontrol","Sınır Ötesi Harekât Desteği","Mavi Vatan Deniz Gözetleme","Pasif Radar Emisyon Tespiti","Hava Sahası Bütünlüğü","Arama Kurtarma"],
  },
];

export default function Datasheet() {
  const [dsSearch, setDsSearch] = useState("");
  const [dsSelected, setDsSelected] = useState(null);
  const [dsForce, setDsForce] = useState("");

  const q = dsSearch.toLowerCase();
  const filtered = productDB.filter(p => {
    const forceMatch = dsForce === "" || p.force === dsForce;
    const textMatch = q === "" || (
      p.name.toLowerCase().includes(q) || p.producer.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) ||
      p.specs.some(s => s.k.toLowerCase().includes(q) || s.v.toLowerCase().includes(q)) ||
      p.scenarios.some(s => s.toLowerCase().includes(q))
    );
    return forceMatch && textMatch;
  });
  const sel = dsSelected !== null ? productDB.find(p => p.id === dsSelected) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel glow={C.cyan} noPad>
        <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18, color: C.cyan }}>{"⊞"}</span>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text" value={dsSearch} onChange={e => { setDsSearch(e.target.value); setDsSelected(null); }}
              placeholder="Ürün ara... (isim, üretici, tip, özellik, senaryo)"
              style={{ width: "100%", padding: "10px 14px 10px 34px", background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 6, color: C.white, fontSize: 13, fontFamily: FONT, outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = C.cyan} onBlur={e => e.target.style.borderColor = C.border}
            />
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.textDim }}>{"🔍"}</span>
          </div>
          <span style={{ fontSize: 12, color: C.textDim, fontFamily: MONO, whiteSpace: "nowrap" }}>{filtered.length} / {productDB.length}</span>
        </div>
      </Panel>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "0 2px" }}>
        {[{l:"TÜMÜ",v:"",c:C.cyan},{l:"HAVA",v:"hava",c:C.hava},{l:"KARA",v:"kara",c:C.kara},{l:"DENİZ",v:"deniz",c:C.deniz},{l:"AR-GE",v:"arge",c:C.arge}].map((f,i) => (
          <button key={i} onClick={() => { setDsForce(f.v); setDsSelected(null); }} style={{
            padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: FONT, letterSpacing: 0.8, transition: "all 0.15s",
            border: dsForce === f.v ? `1px solid ${f.c}` : `1px solid ${C.border}`,
            background: dsForce === f.v ? `${f.c}20` : C.bg2,
            color: dsForce === f.v ? f.c : C.textDim,
          }}>{f.l}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: sel ? "320px 1fr" : "1fr", gap: 14, minHeight: 500 }}>
        <Panel title="ÜRÜN LİSTESİ" sub={dsSearch || dsForce ? `${dsForce ? dsForce.toUpperCase() : "TÜMÜ"}${dsSearch ? ` · "${dsSearch}"` : ""}` : `${productDB.length} sistem`} glow={C.cyan} noPad>
          <div style={{ padding: 0, maxHeight: sel ? 620 : 700, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: C.textDim, fontSize: 13, fontFamily: FONT }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{"🔍"}</div>
                Sonuç bulunamadı
              </div>
            ) : filtered.map((p) => (
              <div key={p.id} onClick={() => setDsSelected(dsSelected === p.id ? null : p.id)}
                className="hov"
                style={{
                  padding: "10px 14px", cursor: "pointer", transition: "all 0.15s",
                  borderBottom: `1px solid ${C.border}`, borderLeft: `3px solid ${dsSelected === p.id ? forceColor(p.force) : "transparent"}`,
                  background: dsSelected === p.id ? C.panelHi : "transparent",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20, minWidth: 26, textAlign: "center" }}>{p.img}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: FONT }}>{p.name}</span>
                      <ForceTag force={p.force} />
                    </div>
                    <div style={{ fontSize: 11, color: C.textDim, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: FONT }}>{p.type} — {p.producer}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.statusColor, boxShadow: glow(p.statusColor, 6) }} />
                    <span style={{ fontSize: 10, color: C.textDim, fontFamily: FONT }}>{p.status.split(" ")[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {sel && (
          <Panel title={`${sel.img} ${sel.name}`} sub={sel.type} glow={forceColor(sel.force)} noPad>
            <div style={{ padding: 18, maxHeight: 620, overflowY: "auto" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                <Badge color={forceColor(sel.force)}>{sel.force === "arge" ? "AR-GE" : sel.force.toUpperCase()}</Badge>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 4, fontWeight: 700, color: C.white, background: sel.statusColor, fontFamily: FONT }}>{sel.status}</span>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 4, fontWeight: 600, color: C.textDim, border: `1px solid ${C.border}`, fontFamily: FONT }}>{sel.producer}</span>
              </div>

              <div style={{ background: C.bg2, borderRadius: 6, padding: "12px 16px", marginBottom: 14, border: `1px solid ${C.borderHi}` }}>
                <div style={{ fontSize: 11, color: C.cyan, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6, fontFamily: FONT }}>{"◉"} TANIM</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontFamily: FONT }}>{sel.summary}</div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: C.amber, fontWeight: 700, letterSpacing: 1.2, marginBottom: 8, paddingLeft: 2, fontFamily: FONT }}>{"◆"} TEKNİK ÖZELLİKLER — DATASHEET</div>
                <div style={{ borderRadius: 6, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  {sel.specs.map((s, j) => (
                    <div key={j} style={{
                      display: "grid", gridTemplateColumns: "160px 1fr",
                      borderBottom: j < sel.specs.length - 1 ? `1px solid ${C.border}` : "none",
                      background: j % 2 === 0 ? C.bg2 : "transparent",
                    }}>
                      <div style={{ padding: "7px 12px", fontSize: 12, fontWeight: 700, color: C.cyan, borderRight: `1px solid ${C.border}`, fontFamily: FONT }}>{s.k}</div>
                      <div style={{ padding: "7px 12px", fontSize: 12, color: C.text, lineHeight: 1.6, fontFamily: FONT }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: C.green, fontWeight: 700, letterSpacing: 1.2, marginBottom: 8, paddingLeft: 2, fontFamily: FONT }}>{"▸"} KULLANIM SENARYOLARI</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {sel.scenarios.map((sc, j) => (
                    <span key={j} style={{ fontSize: 11, padding: "4px 10px", background: `${C.green}10`, border: `1px solid ${C.green}25`, borderRadius: 4, color: C.text, fontWeight: 600, fontFamily: FONT }}>{sc}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => setDsSelected(null)} style={{
                marginTop: 8, width: "100%", padding: "9px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 6,
                color: C.textDim, fontSize: 12, fontFamily: FONT, cursor: "pointer", fontWeight: 600, letterSpacing: 1
              }}>{"✕"} KAPAT</button>
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}
