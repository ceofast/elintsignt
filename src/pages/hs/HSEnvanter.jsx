import { useState } from "react";
import { C, FONT, MONO, glow, forceColor } from "../../theme";
import { Panel, ForceTag, Badge, SeverityBar } from "../../components";

const systemDB = [
  {
    id: 1, name: "SUNGUR", cat: "Füze (MANPADS)", producer: "ROKETSAN",
    force: "kara", status: "Aktif",
    range: "8 km", altitude: "4.5 km", speed: "Süpersonik",
    seeker: "IIR (Görüntüleyici Kızılötesi)", warhead: "HE Parçacıklı",
    platform: "Portatif / Araç üstü", year: 2021,
    desc: "4. nesil yerli MANPADS. Omuz ateşli ve araç üstü versiyonları mevcut. Stinger'ın yerli muadili olarak geliştirildi. 360° ateşleme, gece/gündüz hedef tespit, takip ve angajman kabiliyeti.",
    note: "İlk ihracat sözleşmesi imzalandı. Seri üretim devam ediyor.",
    summary: "Türkiye'nin ilk yerli 4. nesil taşınabilir hava savunma füze sistemi (MANPADS). ROKETSAN tarafından FIM-92 Stinger'ın yerli muadili olarak geliştirilen SUNGUR, omuz ateşli (man-portable) ve 4'lü araç üstü lanç konfigürasyonlarında üretilmektedir. IIR (Imaging Infrared) arayıcı başlığı sayesinde hedefi görüntüleyerek kilitlenme sağlar ve aldatma fişeklerine karşı yüksek direnç gösterir. BCU (Battery Coolant Unit) ile hızlı ateşleme, gece/gündüz ve her hava koşulunda operasyon kabiliyetine sahiptir. 360° tam çevre angajman yapabilir. Çelik Kubbe'nin en alt katmanında (VSHORAD) konumlanarak nokta savunma görevi üstlenir. 2024'te ilk ihracat sözleşmesi imzalanmış olup seri üretim devam etmektedir.",
    specs: [
      { k: "Proje Başlangıcı", v: "2013" },
      { k: "Envanter Girişi", v: "2021 (KKK)" },
      { k: "Füze Tipi", v: "4. nesil IIR güdümlü MANPADS" },
      { k: "Menzil", v: "8 km" },
      { k: "İrtifa", v: "4.5 km" },
      { k: "Hız", v: "Süpersonik (Mach 2+)" },
      { k: "Arayıcı Başlık", v: "IIR (Görüntüleyici Kızılötesi), ateşle-unut" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı, yakınlık tüpü" },
      { k: "Motor", v: "Çift itme katı yakıtlı roket (boost + sustain)" },
      { k: "Konfigürasyon", v: "Omuz ateşli + 4'lü araç üstü lanç" },
      { k: "BCU", v: "Hızlı ateşleme için pil-soğutucu ünitesi" },
      { k: "Gece Görüş", v: "Termal görüntüleme entegrasyonu" },
      { k: "Ağırlık", v: "~16 kg (füze + lanç)" },
      { k: "Aldatma Direnci", v: "Gelişmiş IRCCM (kızılötesi karşı-karşı önlem)" },
      { k: "Araç Platformu", v: "Kirpi MRAP, BMC Vuran, 4x4 taktik araçlar" },
    ],
    scenarios: ["VSHORAD Nokta Savunma", "Helikopter Angajmanı", "İHA/UCAV Savunma", "Konvoy Koruması", "Sabit Tesis Savunma", "İhracat"],
  },
  {
    id: 2, name: "KORKUT", cat: "Top/CIWS", producer: "ASELSAN",
    force: "kara", status: "Aktif",
    range: "4 km (top)", altitude: "4 km", speed: "—",
    seeker: "Radar + Elektro-optik", warhead: "35mm HEI / ATOM",
    platform: "ACV-30 paletli", year: 2018,
    desc: "Alçak irtifa hava savunma sistemi. İkiz 35mm Oerlikon KDC-02 top, dakikada 1.100 atış. Komuta kontrol aracı 70 km radar menzili. 40 silah sistemi + 13 KKA teslim edildi.",
    note: "Seri üretim fazında. KORKUT-100/25 karşı-İHA versiyonu geliştirildi.",
    summary: "Türkiye'nin birincil kara tabanlı alçak irtifa hava savunma top sistemi. ASELSAN tarafından FNSS ACV-30 paletli platform üzerinde geliştirilen KORKUT, ikiz 35mm Oerlikon KDC-02 topunu dakikada 1.100 atış hızıyla kullanır. ATOM (Airburst Technology Ordnance Munition) akıllı mühimmatı ile hedef yakınında parçalanarak etkili bir öldürme zarfı oluşturur. Komuta Kontrol Aracı (KKA) 70 km menzilli 3D arama radarı ile entegre çalışır. Silah Sistemi Aracı (SSA) EO/IR sensör ve takip radarı barındırır. 40 SSA + 13 KKA TSK'ya teslim edilmiştir. KORKUT-100 ve KORKUT-25 varyantları karşı-İHA rolüne özelleştirilmiştir.",
    specs: [
      { k: "Proje Başlangıcı", v: "2011" },
      { k: "Envanter Girişi", v: "2018 (KKK)" },
      { k: "Top", v: "İkiz 35mm Oerlikon KDC-02" },
      { k: "Atış Hızı", v: "2 × 550 = 1.100 atış/dk" },
      { k: "Etkili Menzil (Top)", v: "4 km" },
      { k: "Etkili İrtifa (Top)", v: "4 km" },
      { k: "Mühimmat", v: "35mm HEI, ATOM (Airburst), APFSDS-T" },
      { k: "ATOM Mühimmat", v: "Programlanabilir zamanlı tüp, hava patlamalı" },
      { k: "Platform (SSA)", v: "FNSS ACV-30 paletli araç" },
      { k: "Radar Menzili (KKA)", v: "70 km (3D arama radarı)" },
      { k: "Sensörler (SSA)", v: "EO/IR kamera + takip radarı" },
      { k: "Teslimat", v: "40 SSA + 13 KKA" },
      { k: "Eş Zamanlı Takip", v: "Çoklu hedef takip ve angajman" },
      { k: "Varyantlar", v: "KORKUT-100 (25mm), KORKUT-25 (karşı-İHA)" },
    ],
    scenarios: ["VSHORAD/SHORAD", "Alçak İrtifa Hava Savunma", "Karşı-İHA/FPV", "Cruise Füze Savunma", "Mekanize Birlik Koruması", "Sabit Tesis Savunma"],
  },
  {
    id: 3, name: "GÖKDENİZ", cat: "Top/CIWS", producer: "ASELSAN",
    force: "deniz", status: "Aktif",
    range: "4 km", altitude: "4 km", speed: "—",
    seeker: "Radar + Elektro-optik", warhead: "35mm ATOM / HEI",
    platform: "Gemi üstü", year: 2020,
    desc: "KORKUT'un deniz versiyonu. Çift namlulu 35mm, dakikada 1.100 atış. Anti-gemi füzesi, helikopter, İHA ve su üstü hedeflere karşı nokta savunma. Otomatik şeritsiz mühimmat besleme.",
    note: "TCG İstanbul (F-515) ve İstif sınıfı fırkateynlerde konuşlu.",
    summary: "KORKUT'un denizleştirilmiş versiyonu olan GÖKDENİZ, gemilerin son savunma katmanını (CIWS - Close-In Weapon System) oluşturur. ASELSAN tarafından geliştirilen sistem, çift namlulu 35mm otomatik top ile dakikada 1.100 atış kapasitesine sahiptir. ATOM akıllı mühimmatı ile anti-gemi füzeleri, helikopterler, İHA'lar ve su üstü asimetrik tehditlere karşı etkili nokta savunma sağlar. Otomatik şeritsiz mühimmat besleme sistemi sayesinde kesintisiz ateş imkânı sunar. Entegre arama/takip radarı ve EO/IR sensör süiti ile otonom hedef tespit, takip ve angajman yapabilir. TCG İstanbul (F-515), İstif sınıfı fırkateynler ve TCG Anadolu'da (L-400) konuşludur.",
    specs: [
      { k: "Baz Sistem", v: "KORKUT (denizleştirilmiş)" },
      { k: "Top", v: "Çift namlulu 35mm" },
      { k: "Atış Hızı", v: "1.100 atış/dk" },
      { k: "Etkili Menzil", v: "4 km (hava) / 2+ km (su üstü)" },
      { k: "Etkili İrtifa", v: "4 km" },
      { k: "Mühimmat", v: "35mm ATOM (Airburst), HEI, APFSDS-T" },
      { k: "Besleme Sistemi", v: "Otomatik şeritsiz (linkless) mühimmat besleme" },
      { k: "Sensörler", v: "Arama/takip radarı + EO/IR (TV + termal)" },
      { k: "Çalışma Modu", v: "Tam otonom / Yarı otonom / Manuel" },
      { k: "Hedef Tipleri", v: "AShM, helikopter, İHA, su üstü asimetrik tehdit" },
      { k: "Gemiler", v: "İstif sınıfı, TCG İstanbul (F-515), TCG Anadolu (L-400)" },
      { k: "Deniz Stabilizasyonu", v: "Gemi hareketine karşı stabilize taret" },
    ],
    scenarios: ["Gemi Yakın Savunma (CIWS)", "Anti-Gemi Füze Savunma", "Asimetrik Deniz Tehdidi", "İHA/Drone Savunma", "Liman/Kıyı Savunma"],
  },
  {
    id: 4, name: "HİSAR-A+", cat: "Füze (SAM)", producer: "ROKETSAN / ASELSAN",
    force: "kara", status: "Aktif",
    range: "15 km", altitude: "8 km", speed: "Süpersonik",
    seeker: "RF Yakınlık Tüpü", warhead: "HE Parçacıklı",
    platform: "Araç üstü (6x6)", year: 2021,
    desc: "Kısa menzilli hava savunma füze sistemi. Çift puls katı yakıtlı motor. 360° angajman, eşzamanlı 6 hedef. HAWK'ın yerli muadili olarak tasarlandı. Seri üretim devam ediyor.",
    note: "2025-2029 arası ek teslimatlar planlanıyor.",
    summary: "Türkiye'nin yerli kısa menzilli hava savunma füze sistemi. ROKETSAN ve ASELSAN ortaklığında geliştirilen HİSAR-A+, MIM-23 HAWK sisteminin kısa menzil katmanındaki yerini almak üzere tasarlanmıştır. Çift puls katı yakıtlı roket motoru ile süpersonik hıza ulaşır. Komut güdüm + RF yakınlık tüpü birleşiminde çalışır. Ateş Kontrol Merkezi (AKM), KALKAN-050G arama radarı ve 6 adet fırlatma aracından oluşan batarya konfigürasyonuyla eşzamanlı 6 hedefe angajman yapabilir. 360° tam çevre kapsama ile yüksek manevra kabiliyetli hedeflere karşı etkilidir. Çelik Kubbe'nin SHORAD katmanında konumlanır. Deniz versiyonu da geliştirilmektedir.",
    specs: [
      { k: "Proje Adı", v: "HİSAR-A (geliştirilmiş: HİSAR-A+)" },
      { k: "Envanter Girişi", v: "2021 (KKK)" },
      { k: "Menzil", v: "15 km" },
      { k: "İrtifa", v: "8 km" },
      { k: "Hız", v: "Süpersonik (Mach 2.5+)" },
      { k: "Güdüm", v: "Komut güdüm + RF yakınlık tüpü" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı (yakınlık tüpü ile tetikleme)" },
      { k: "Motor", v: "Çift puls katı yakıtlı roket" },
      { k: "Batarya Yapısı", v: "1 AKM + 1 arama radarı + 6 fırlatma aracı" },
      { k: "Eş Zamanlı Angajman", v: "6 hedef" },
      { k: "Kapsama", v: "360° tam çevre" },
      { k: "Radar", v: "KALKAN-050G 3D arama radarı" },
      { k: "Fırlatma Aracı", v: "6x6 tekerlekli platform" },
      { k: "Deniz Versiyonu", v: "Geliştirme aşamasında" },
    ],
    scenarios: ["SHORAD", "Helikopter Angajmanı", "İHA/UCAV Savunma", "Cruise Füze Savunma", "Sabit Tesis/Üs Savunma", "Deniz Platformu (planlanan)"],
  },
  {
    id: 5, name: "HİSAR-O+ (IIR)", cat: "Füze (SAM)", producer: "ROKETSAN / ASELSAN",
    force: "kara", status: "Aktif",
    range: "25 km", altitude: "15 km", speed: "Süpersonik",
    seeker: "IIR (Görüntüleyici Kızılötesi)", warhead: "HE Parçacıklı",
    platform: "Araç üstü (6x6)", year: 2022,
    desc: "Orta menzilli hava savunma füze sistemi. MIM-23 HAWK'ın yerini alıyor. Kızılötesi arayıcı başlıklı versiyon. Her yıl 2-3 batarya TSK'ya teslim ediliyor.",
    note: "Libya'daki Al Watiya Üssü'nde HAWK yerine konuşlandırıldı.",
    summary: "HİSAR-O+ ailesinin IIR (Imaging Infrared) arayıcı başlıklı versiyonu. Orta menzilli hava savunma füze sistemi olarak MIM-23 HAWK'ın yerini almaktadır. IIR arayıcı başlığı sayesinde ateşle-unut (fire-and-forget) modunda çalışarak atış sonrası radar aydınlatma ihtiyacını ortadan kaldırır. Bu özellik düşük RCS hedefler ve elektromanyetik karıştırma ortamlarında önemli avantaj sağlar. Terminal fazda görüntüleme bazlı kilitlenme ile yüksek isabet oranı sunar. Her yıl 2-3 batarya TSK'ya teslim edilmektedir. Libya'daki Al Watiya Hava Üssü'nde HAWK yerine konuşlandırılmış ve operasyonel olarak kullanılmaktadır.",
    specs: [
      { k: "Proje Adı", v: "HİSAR-O+ IIR" },
      { k: "Envanter Girişi", v: "2022 (KKK)" },
      { k: "Menzil", v: "25 km" },
      { k: "İrtifa", v: "15 km" },
      { k: "Hız", v: "Süpersonik (Mach 2.5+)" },
      { k: "Arayıcı Başlık", v: "IIR (Görüntüleyici Kızılötesi)" },
      { k: "Güdüm Modu", v: "Ateşle-unut (fire-and-forget)" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Çift puls katı yakıtlı roket" },
      { k: "Batarya Yapısı", v: "AKM + KALKAN radar + TEL araçları" },
      { k: "Platform", v: "6x6 tekerlekli TEL" },
      { k: "Teslimat Hızı", v: "Yıllık 2-3 batarya" },
      { k: "Konuşlandırma", v: "Türkiye + Libya (Al Watiya Üssü)" },
    ],
    scenarios: ["MRAD", "HAWK İkamesi", "Savaş Uçağı Angajmanı", "İHA/UCAV Savunma", "Düşük RCS Hedef", "Karıştırma Ortamında Angajman"],
  },
  {
    id: 6, name: "HİSAR-O+ (RF)", cat: "Füze (SAM)", producer: "ROKETSAN / ASELSAN",
    force: "kara", status: "Aktif",
    range: "40+ km", altitude: "15 km", speed: "Süpersonik",
    seeker: "Aktif RF", warhead: "HE Parçacıklı",
    platform: "Araç üstü (6x6)", year: 2024,
    desc: "HİSAR-O+'nın RF arayıcı başlıklı geliştirilmiş versiyonu. Menzil 40+ km'ye çıkarıldı. Her hava koşulunda angajman kabiliyeti. Çelik Kubbe'nin orta katman omurgası.",
    note: "Seri üretim başladı. İhracat potansiyeli yüksek.",
    summary: "HİSAR-O+ ailesinin aktif RF arayıcı başlıklı uzun menzilli versiyonu. IIR versiyonuna göre menzil 25 km'den 40+ km'ye çıkarılmış, her hava koşulunda (bulut, sis, yağmur) ve gece/gündüz angajman kabiliyeti kazandırılmıştır. Aktif radar arayıcı (ARH) terminal fazda kendi radarıyla hedefe kilitlenir. Orta seyir fazında veri bağlantısı (datalink) ile güdüm güncellemesi alır. Çelik Kubbe'nin orta menzil katmanının omurgasını oluşturur ve SİPER ile HİSAR-A+ arasındaki menzil boşluğunu kapatır. 2024'te seri üretime geçilmiş olup yüksek ihracat potansiyeli taşımaktadır.",
    specs: [
      { k: "Proje Adı", v: "HİSAR-O+ RF" },
      { k: "Envanter Girişi", v: "2024" },
      { k: "Menzil", v: "40+ km" },
      { k: "İrtifa", v: "15 km" },
      { k: "Hız", v: "Süpersonik (Mach 3+)" },
      { k: "Arayıcı Başlık", v: "Aktif RF (Active Radar Homing)" },
      { k: "Güdüm", v: "Orta seyir: datalink + inertial / Terminal: ARH" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Geliştirilmiş çift puls roket" },
      { k: "Her Hava Koşulu", v: "Evet — bulut, sis, yağmur, gece" },
      { k: "Platform", v: "6x6 tekerlekli TEL" },
      { k: "Durum", v: "Seri üretim (2024+)" },
    ],
    scenarios: ["MRAD", "Her Hava Koşulunda Angajman", "Savaş Uçağı Angajmanı", "Cruise Füze Savunma", "Çelik Kubbe Orta Katman", "İhracat"],
  },
  {
    id: 7, name: "SİPER Blok 1", cat: "Füze (SAM)", producer: "ROKETSAN / ASELSAN / TÜBİTAK SAGE",
    force: "hava", status: "Aktif",
    range: "100+ km", altitude: "20+ km", speed: "Süpersonik",
    seeker: "RF Arayıcı", warhead: "HE Parçacıklı",
    platform: "Araç üstü (TIR)", year: 2025,
    desc: "Uzun menzilli hava savunma sistemi. HİSAR-O+ RF füzesine takviye motor eklenerek geliştirildi. Çift puls roket motor. S-400/Patriot muadili. Ağustos 2025'te 10 araçlık sistem teslim edildi.",
    note: "Çelik Kubbe'nin uzun menzil katmanı. Seri üretim 2025-2029.",
    summary: "Türkiye'nin ilk yerli uzun menzilli hava savunma füze sistemi ve Çelik Kubbe'nin en üst katmanı. ROKETSAN, ASELSAN ve TÜBİTAK SAGE ortaklığında geliştirilen SİPER Blok 1, HİSAR-O+ RF füzesine takviye motor (booster) eklenerek 100+ km menzile ulaştırılmıştır. S-400 ve MIM-104 Patriot sınıfı sistemlerin yerli muadili olarak tasarlanmıştır. Çift puls katı yakıtlı roket motoru kullanır. ÇAFRAD AESA radar sistemi ile entegre çalışarak çoklu hedef takip ve angajman yapabilir. Ağustos 2025'te 10 araçlık ilk sistem TSK'ya teslim edilmiştir. 2025-2029 arasında seri üretim ve teslimatlar planlanmaktadır.",
    specs: [
      { k: "Proje Başlangıcı", v: "2017 (SİPER sözleşmesi)" },
      { k: "İlk Teslimat", v: "Ağustos 2025 (10 araç)" },
      { k: "Menzil", v: "100+ km" },
      { k: "İrtifa", v: "20+ km" },
      { k: "Hız", v: "Süpersonik" },
      { k: "Arayıcı Başlık", v: "RF Arayıcı" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Çift puls katı yakıtlı roket + takviye motor" },
      { k: "Baz Füze", v: "HİSAR-O+ RF (geliştirilmiş)" },
      { k: "Radar Entegrasyonu", v: "ÇAFRAD AESA" },
      { k: "Platform", v: "TIR tabanlı TEL" },
      { k: "Muadil", v: "S-400, MIM-104 Patriot" },
      { k: "Seri Üretim", v: "2025-2029" },
    ],
    scenarios: ["LRAD", "Savaş Uçağı Engelleme", "Bölge Hava Savunma", "Cruise Füze Savunma", "Çelik Kubbe Üst Katman", "S-400/Patriot İkamesi"],
  },
  {
    id: 8, name: "SİPER Blok 2", cat: "Füze (SAM)", producer: "ROKETSAN / ASELSAN / TÜBİTAK SAGE",
    force: "hava", status: "Seri Üretim",
    range: "150 km", altitude: "25+ km", speed: "Süpersonik",
    seeker: "Aktif RF", warhead: "HE Parçacıklı",
    platform: "Araç üstü (TIR)", year: 2026,
    desc: "Tamamen yeni tasarım füze. Tek kademeli roket motoru. Blok 1'e göre artırılmış menzil ve irtifa. Ağustos 2023'te ilk atış testi başarıyla tamamlandı.",
    note: "2026'da teslimat bekleniyor.",
    summary: "SİPER ailesinin tamamen yeni tasarım ikinci blok füzesi. Blok 1'in HİSAR-O+ türevi yaklaşımından farklı olarak sıfırdan tasarlanmış gövde ve motor sistemine sahiptir. Tek kademeli yüksek performanslı roket motoru ile 150 km menzil ve 25+ km irtifaya ulaşır. Aktif RF arayıcı başlık kullanarak terminal fazda otonom hedef kilitlenme sağlar. Ağustos 2023'te gerçekleştirilen ilk atış testi başarıyla tamamlanmıştır. Blok 1'e göre daha yüksek kinetik enerji ve manevra kabiliyetine sahip olup yüksek hızlı hedeflere karşı etkinliği artırılmıştır. 2026'da TSK'ya teslimat beklenmektedir.",
    specs: [
      { k: "Tasarım", v: "Tamamen yeni gövde ve motor (Blok 1'den bağımsız)" },
      { k: "İlk Atış Testi", v: "Ağustos 2023 (başarılı)" },
      { k: "Menzil", v: "150 km" },
      { k: "İrtifa", v: "25+ km" },
      { k: "Hız", v: "Süpersonik (yüksek kinetik enerji)" },
      { k: "Arayıcı Başlık", v: "Aktif RF" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Tek kademeli yüksek performans roket" },
      { k: "Güdüm", v: "İnertial + datalink + terminal ARH" },
      { k: "Platform", v: "TIR tabanlı TEL (Blok 1 ile uyumlu)" },
      { k: "Teslimat", v: "2026 (planlanan)" },
    ],
    scenarios: ["LRAD", "Yüksek Hızlı Hedef Angajmanı", "Bölge Hava Savunma", "Cruise Füze/Stealth Savunma", "Çelik Kubbe Üst Katman"],
  },
  {
    id: 9, name: "SİPER Blok 3", cat: "Füze (SAM)", producer: "ROKETSAN / ASELSAN / TÜBİTAK SAGE",
    force: "hava", status: "Geliştirme",
    range: "180+ km", altitude: "30+ km", speed: "Süpersonik",
    seeker: "Aktif RF", warhead: "HE Parçacıklı",
    platform: "Araç üstü (TIR)", year: 2028,
    desc: "En uzun menzilli SİPER versiyonu. Balistik füze tehditlerine karşı kabiliyetli olması hedefleniyor. Geliştirme sözleşmesi Mart 2024'te imzalandı.",
    note: "Geliştirme aşamasında.",
    summary: "SİPER ailesinin en gelişmiş ve en uzun menzilli versiyonu. 180+ km menzil ve 30+ km irtifa hedefiyle kısa menzilli balistik füze (SRBM) ve stratosferik hedeflere karşı kabiliyetli olması planlanmaktadır. Hit-to-kill (kinetik imha) yeteneği eklenmesi beklenmektedir. Mart 2024'te geliştirme sözleşmesi imzalanmış olup AR-GE çalışmaları devam etmektedir. Tamamlandığında Türkiye, balistik füze savunma kabiliyetine sahip sınırlı sayıda ülkeden biri olacaktır. Çelik Kubbe mimarisinin en üst irtifa katmanını oluşturarak stratejik derinlik sağlayacaktır.",
    specs: [
      { k: "Sözleşme", v: "Mart 2024 (geliştirme)" },
      { k: "Menzil (Hedef)", v: "180+ km" },
      { k: "İrtifa (Hedef)", v: "30+ km (stratosferik)" },
      { k: "Hız", v: "Süpersonik / Hipersonik" },
      { k: "Arayıcı Başlık", v: "Aktif RF (geliştirilmiş)" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı + Hit-to-kill (planlanan)" },
      { k: "BMD Kabiliyeti", v: "SRBM (kısa menzilli balistik füze) savunma" },
      { k: "Platform", v: "TIR tabanlı TEL" },
      { k: "Hedef Envanter Girişi", v: "2028" },
      { k: "Durum", v: "AR-GE / Geliştirme aşamasında" },
    ],
    scenarios: ["Balistik Füze Savunma (BMD)", "LRAD/Stratosferik Savunma", "Stealth Hedef Angajmanı", "Stratejik Nokta Savunma", "Çelik Kubbe Üst Katman"],
  },
  {
    id: 10, name: "GÜRZ", cat: "Füze (SHORAD)", producer: "ASELSAN",
    force: "kara", status: "Seri Üretim",
    range: "15+ km (füze) / 4 km (top)", altitude: "8 km", speed: "Değişken",
    seeker: "AESA Radar + EO", warhead: "35mm + SAM füzeleri",
    platform: "8x8 araç üstü", year: 2025,
    desc: "Hibrit yakın alan hava savunma sistemi. 35mm top + 4 VSHORAD + 4 SHORAD füze + Kangal EW suite. Hareket halinde ateşleme. Sürü drone, cruise füze, uçak tehditlerine karşı çok katmanlı.",
    note: "Pantsir-S1 muadili. Uluslararası tanıtım 2025'te yapıldı.",
    summary: "Türkiye'nin ilk hibrit yakın alan hava savunma sistemi. ASELSAN tarafından geliştirilen GÜRZ, tek platform üzerinde top, füze ve elektronik harp yeteneklerini birleştiren çok katmanlı bir savunma konsepti sunar. 35mm otomatik top (KORKUT türevi), 4 adet VSHORAD füze (SUNGUR türevi), 4 adet SHORAD füze (HİSAR-A+ türevi) ve KANGAL elektronik harp suite'ini entegre eder. AESA arama/takip radarı ve gelişmiş EO/IR sensör süitiyle hareket halinde ateşleme (shoot-on-the-move) kabiliyetine sahiptir. Sürü drone saldırıları, cruise füzeler, helikopterler ve taktik uçaklara karşı etkilidir. Rusya'nın Pantsir-S1 sisteminin yerli muadili olarak konumlandırılmıştır. 2025'te uluslararası tanıtımı yapılmıştır.",
    specs: [
      { k: "İlk Tanıtım", v: "IDEF 2025" },
      { k: "Top", v: "35mm otomatik (KORKUT türevi)" },
      { k: "VSHORAD Füze", v: "4 adet (SUNGUR türevi, 8 km)" },
      { k: "SHORAD Füze", v: "4 adet (HİSAR-A+ türevi, 15+ km)" },
      { k: "EW Süiti", v: "KANGAL entegre elektronik karıştırma" },
      { k: "Menzil (Toplam)", v: "15+ km (füze) / 4 km (top)" },
      { k: "İrtifa", v: "8 km" },
      { k: "Radar", v: "AESA arama/takip radarı" },
      { k: "Sensörler", v: "EO/IR süiti (TV + termal + lazer mesafe ölçer)" },
      { k: "Ateşleme Modu", v: "Hareket halinde ateşleme (shoot-on-the-move)" },
      { k: "Platform", v: "8x8 tekerlekli araç" },
      { k: "Muadil", v: "Pantsir-S1 (Rusya)" },
    ],
    scenarios: ["Hibrit SHORAD/VSHORAD", "Sürü Drone Savunma", "Cruise Füze Savunma", "Konvoy Koruması", "Manevra Birliği Koruması", "İhracat"],
  },
  {
    id: 11, name: "GÖKBERK", cat: "Lazer", producer: "ASELSAN",
    force: "kara", status: "Aktif",
    range: "1.5 km (quadcopter) / 1.2 km (sabit kanat)", altitude: "Düşük irtifa", speed: "Işık hızı",
    seeker: "Radar + Elektro-optik", warhead: "5+ kW Lazer",
    platform: "6x6 araç üstü", year: 2025,
    desc: "Mobil lazer silah sistemi. FPV drone ve İHA'lara karşı. Fiziksel imha (sert öldürme) + Kangal EW ile elektronik karıştırma (yumuşak öldürme). 7/24 otonom çalışma, kesintisiz ateş.",
    note: "Çelik Kubbe bileşeni. Havalimanı, üs, enerji tesisi koruması.",
    summary: "Türkiye'nin ilk operasyonel mobil lazer silah sistemi ve Çelik Kubbe'nin en alt savunma katmanı. ASELSAN tarafından geliştirilen GÖKBERK, TÜBİTAK BİLGEM üretimi 5+ kW tek modlu (single-mode) lazer kaynağını kullanarak FPV drone ve mini İHA'ları fiziksel olarak imha eder. Stabilize gimbal üzerinde monteli lazer, EO/IR sensörler (TV + termal + NIR) ve entegre radar ile otonom hedef tespit, takip ve angajman zinciri sağlar. KANGAL elektronik bosturucu ile çift modlu savunma (sert+yumuşak öldürme) sunar. 7/24 kesintisiz otonom çalışma, mühimmat gerektirmeden sınırsız atış ve düşük maliyet-per-angajman avantajlarına sahiptir. Mart 2025'te FPV dronlara karşı 1.200-1.500 m mesafeden başarılı testler tamamlanmıştır.",
    specs: [
      { k: "Lazer Kaynağı", v: "TÜBİTAK BİLGEM üretimi" },
      { k: "Lazer Gücü", v: "5+ kW tek modlu (single-mode)" },
      { k: "Planlanan Güçler", v: "10 kW, 15 kW, 30 kW+" },
      { k: "Odaklama Menzili", v: "2.000 m" },
      { k: "Etkili Menzil (Quadcopter)", v: "1.500 m" },
      { k: "Etkili Menzil (Sabit Kanat)", v: "1.200 m" },
      { k: "Sensörler", v: "TV + Termal + NIR aktif takip + Lazer mesafe ölçer" },
      { k: "Gimbal", v: "Stabilize, ±180° dönüş" },
      { k: "EW Entegrasyonu", v: "KANGAL bosturucu (yumuşak öldürme)" },
      { k: "Platform", v: "6x6 tekerlekli mobil araç" },
      { k: "Çalışma Modu", v: "7/24 otonom, kesintisiz ateş" },
      { k: "Mühimmat", v: "Gerekli değil — elektrik enerjisi ile ateş" },
      { k: "Test (Mart 2025)", v: "1.200 m ve 1.500 m'de FPV drone imhası" },
    ],
    scenarios: ["Karşı-FPV/Drone", "Düşük Maliyet Angajman", "Çelik Kubbe Alt Katman", "Havalimanı/Üs Savunma", "Enerji Tesisi Koruması", "7/24 Otonom Savunma"],
  },
  {
    id: 12, name: "ALP 300-G", cat: "Radar", producer: "ASELSAN",
    force: "hava", status: "Aktif",
    range: "Çok uzun menzil", altitude: "—", speed: "—",
    seeker: "—", warhead: "—",
    platform: "Sabit / Yarı-mobil", year: 2023,
    desc: "S-bant erken uyarı radar sistemi. AESA dijital hüzme şekillendirme anteni. Balistik füze, hava soluyan hedefler, anti-radyasyon füzeleri ve düşük RCS/stealth hedefleri tespit ve takip kabiliyeti. Katı hal güç yükselteç teknolojisi. 7/24 kesintisiz çalışma, %99.9 kullanılabilirlik, 3.000 saat MTBCF.",
    note: "Çelik Kubbe'nin uzun menzilli erken uyarı sensörü. EIRS ile birlikte omurga radar.",
    summary: "ASELSAN tarafından geliştirilen S-bant erken uyarı ve hava gözetleme radar sistemi. AESA (Aktif Elektronik Taramalı Dizi) dijital hüzme şekillendirme anteni ile balistik füzeler, hava soluyan hedefler (savaş uçağı, cruise füze), anti-radyasyon füzeleri ve düşük RCS/stealth hedefleri tespit ve takip edebilir. GaN tabanlı katı hal güç yükselteç (SSPA) teknolojisi ile yüksek güvenilirlik sağlar. 7/24 kesintisiz çalışma, %99.9 kullanılabilirlik (availability) ve 3.000 saat MTBCF (Mean Time Between Critical Failures) performansı sunar. Çelik Kubbe mimarisinin uzun menzilli erken uyarı sensörlerinden biri olarak EIRS ile birlikte omurga radar görevini üstlenir.",
    specs: [
      { k: "Frekans Bandı", v: "S-bant" },
      { k: "Anten Tipi", v: "AESA dijital hüzme şekillendirme" },
      { k: "T/R Modülleri", v: "GaN tabanlı katı hal" },
      { k: "Tespit Menzili", v: "Çok uzun menzil" },
      { k: "Hedef Tipleri", v: "Balistik füze, savaş uçağı, cruise füze, ARM, düşük RCS" },
      { k: "Kullanılabilirlik", v: "%99.9" },
      { k: "MTBCF", v: "3.000 saat" },
      { k: "Çalışma Modu", v: "7/24 kesintisiz" },
      { k: "Platform", v: "Sabit / Yarı-mobil" },
      { k: "Envanter Girişi", v: "2023" },
      { k: "Entegrasyon", v: "Çelik Kubbe erken uyarı ağı, HERİKKS C4I" },
    ],
    scenarios: ["Erken Uyarı/Hava Gözetleme", "Balistik Füze Tespiti", "Stealth Hedef Tespiti", "7/24 Hava Kontrolü", "Çelik Kubbe Omurga Radar"],
  },
  {
    id: 13, name: "Bozdoğan", cat: "Havadan Havaya", producer: "TÜBİTAK SAGE",
    force: "hava", status: "Aktif",
    range: "25+ km", altitude: "—", speed: "Mach 4+",
    seeker: "IIR (Görüntüleyici Kızılötesi)", warhead: "HE Parçacıklı",
    platform: "F-16, KAAN, Kızılelma", year: 2025,
    desc: "Görüş mesafesi içi (WVR) havadan havaya füze. Yüksek-G manevra kabiliyeti, itki vektör kontrolü, geniş açı angajman. Düşük dumanlı katı yakıt motoru. Ekim 2025'te F-16'dan canlı atış testi başarılı.",
    note: "F-16, KAAN ve Kızılelma'ya entegre edilecek.",
    summary: "Türkiye'nin ilk yerli görüş mesafesi içi (WVR - Within Visual Range) havadan havaya füzesi. TÜBİTAK SAGE tarafından geliştirilen Bozdoğan, IIR (Imaging Infrared) arayıcı başlıklı 4. nesil bir hava muharebe füzesidir. Yüksek-G manevra kabiliyeti, itki vektör kontrolü (TVC) ve geniş boresight-dışı (off-boresight) angajman yeteneğiyle yüksek manevra kabiliyetli hedeflere karşı etkilidir. Düşük dumanlı katı yakıt motoru ile görsel tespit mesafesini azaltır. Ekim 2025'te F-16 Block 50+ platformundan canlı atış testi başarıyla tamamlanmıştır. AIM-9X Sidewinder muadili olarak F-16, KAAN (TF-X) ve Kızılelma UCAV'a entegre edilecektir.",
    specs: [
      { k: "Sınıf", v: "WVR (Görüş mesafesi içi) AAM" },
      { k: "Menzil", v: "25+ km" },
      { k: "Hız", v: "Mach 4+" },
      { k: "Arayıcı Başlık", v: "IIR (Görüntüleyici Kızılötesi)" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Düşük dumanlı katı yakıt roket" },
      { k: "TVC", v: "İtki vektör kontrolü (Thrust Vector Control)" },
      { k: "Manevra", v: "Yüksek-G, geniş off-boresight angajman" },
      { k: "Güdüm Modu", v: "Ateşle-unut (IIR lock-on)" },
      { k: "Platformlar", v: "F-16 Block 50+, KAAN (TF-X), Kızılelma UCAV" },
      { k: "İlk Canlı Atış", v: "Ekim 2025 (F-16, başarılı)" },
      { k: "Muadil", v: "AIM-9X Sidewinder" },
    ],
    scenarios: ["Hava Muharebesi (WVR/Dogfight)", "KAAN Silah Sistemi", "Kızılelma UCAV Silahlanma", "F-16 Modernizasyonu", "İhracat (JF-17 entegrasyonu)"],
  },
  {
    id: 14, name: "Gökdoğan", cat: "Havadan Havaya", producer: "TÜBİTAK SAGE",
    force: "hava", status: "Aktif",
    range: "65+ km", altitude: "—", speed: "Süpersonik",
    seeker: "Aktif RF", warhead: "HE Parçacıklı",
    platform: "F-16, KAAN, Kızılelma", year: 2025,
    desc: "Görüş mesafesi ötesi (BVR) havadan havaya füze. Aktif RF arayıcı, veri bağlantısı ile ateşle-unut modu. Ekim 2025'te F-16'dan canlı atış testi başarılı.",
    note: "JF-17 Block 3 (Pakıştan/Azerbaycan) entegrasyonu da planlanıyor.",
    summary: "Türkiye'nin ilk yerli görüş mesafesi ötesi (BVR - Beyond Visual Range) havadan havaya füzesi. TÜBİTAK SAGE tarafından geliştirilen Gökdoğan, aktif RF arayıcı başlık ile terminal fazda kendi radarıyla hedefe kilitlenir. Orta seyir fazında inersiyal navigasyon ve veri bağlantısı (datalink) ile güdüm güncellemesi alır, bu sayede ateşle-unut modunda çalışabilir. 65+ km menzille F-16, KAAN ve Kızılelma platformlarından BVR angajman kabiliyeti sağlar. Ekim 2025'te F-16 Block 50+'dan canlı atış testi başarıyla tamamlanmıştır. AIM-120 AMRAAM muadili olarak konumlandırılmıştır. Pakistan ve Azerbaycan'a JF-17 Block 3 entegrasyonu planlanmaktadır.",
    specs: [
      { k: "Sınıf", v: "BVR (Görüş mesafesi ötesi) AAM" },
      { k: "Menzil", v: "65+ km" },
      { k: "Hız", v: "Süpersonik (Mach 4)" },
      { k: "Arayıcı Başlık", v: "Aktif RF (Active Radar Homing)" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Katı yakıt roket" },
      { k: "Güdüm", v: "İnertial + datalink (orta seyir) + ARH (terminal)" },
      { k: "Güdüm Modu", v: "Ateşle-unut (datalink + ARH)" },
      { k: "Platformlar", v: "F-16 Block 50+, KAAN, Kızılelma, JF-17 Block 3" },
      { k: "İlk Canlı Atış", v: "Ekim 2025 (F-16, başarılı)" },
      { k: "Muadil", v: "AIM-120 AMRAAM" },
      { k: "İhracat", v: "Pakistan/Azerbaycan (JF-17 Block 3 entegrasyonu)" },
    ],
    scenarios: ["Hava Muharebesi (BVR)", "KAAN Silah Sistemi", "Kızılelma UCAV Silahlanma", "F-16 BVR Kabiliyeti", "İhracat (JF-17 entegrasyonu)"],
  },
  {
    id: 15, name: "Gökbora", cat: "Havadan Havaya", producer: "ROKETSAN",
    force: "arge", status: "Geliştirme",
    range: "100+ km (tahmini)", altitude: "—", speed: "Ramjet",
    seeker: "Aktif RF", warhead: "HE Parçacıklı",
    platform: "KAAN", year: 2028,
    desc: "Ramjet motorlu uzun menzilli havadan havaya füze. IDEF 2025'te tanıtıldı. KAAN'ın birincil BVR silahı olarak tasarlanıyor. Türkiye'nin ilk ramjet AAM'si.",
    note: "Geliştirme aşamasında. KAAN ile eşzamanlı envanter girişi hedefleniyor.",
    summary: "Türkiye'nin ilk ramjet motorlu uzun menzilli havadan havaya füzesi. ROKETSAN tarafından geliştirilen Gökbora, KAAN (TF-X) 5. nesil savaş uçağının birincil BVR silahı olarak tasarlanmaktadır. Ramjet (hava soluyan) motor teknolojisi sayesinde klasik roket motorlu füzelere göre çok daha uzun menzil ve sürdürülebilir yüksek hız (sustained supersonic) avantajı sunar. Terminal fazda aktif RF arayıcı ile hedefe kilitlenir. IDEF 2025'te ilk kez kamuoyuna tanıtılmıştır. Meteor (MBDA) ve PL-15 (Çin) sınıfı ramjet AAM'lerin yerli muadili olarak konumlandırılmıştır. KAAN ile eşzamanlı envanter girişi hedeflenmektedir.",
    specs: [
      { k: "İlk Tanıtım", v: "IDEF 2025" },
      { k: "Menzil (Tahmini)", v: "100+ km" },
      { k: "Hız", v: "Ramjet (sürdürülebilir süpersonik)" },
      { k: "Arayıcı Başlık", v: "Aktif RF" },
      { k: "Savaş Başlığı", v: "HE Parçacıklı" },
      { k: "Motor", v: "Ramjet (hava soluyan jet motoru)" },
      { k: "Avantaj", v: "Uzun menzil + sürdürülebilir yüksek hız" },
      { k: "Birincil Platform", v: "KAAN (TF-X) dahili silah yuvaları" },
      { k: "Muadil", v: "Meteor (MBDA), PL-15 (Çin)" },
      { k: "Hedef Envanter", v: "2028 (KAAN ile eşzamanlı)" },
      { k: "Durum", v: "Geliştirme aşamasında" },
    ],
    scenarios: ["Uzun Menzil BVR", "KAAN Birincil Silah", "5. Nesil Hava Muharebesi", "Stealth-vs-Stealth Angajman", "Stratejik Caydırıcılık"],
  },
  {
    id: 16, name: "EIRS", cat: "Radar", producer: "ASELSAN",
    force: "hava", status: "Aktif",
    range: "470+ km (tespit)", altitude: "—", speed: "—",
    seeker: "—", warhead: "—",
    platform: "Sabit / Yarı-mobil", year: 2022,
    desc: "Erken ihbar radar sistemi. Uzun menzilli omurga radar. Hava soluyan hedefler, balistik füzeler, anti-radyasyon füzeleri ve düşük RCS hedefleri tespit edebilir.",
    note: "Çelik Kubbe'nin erken uyarı sensörü.",
    summary: "Türkiye'nin birincil erken ihbar radar sistemi ve Çelik Kubbe mimarisinin omurga sensörü. ASELSAN tarafından geliştirilen EIRS, 470+ km tespit menzili ile stratejik derinlik sağlar. Hava soluyan hedefler (savaş uçağı, cruise füze, İHA), balistik füzeler, anti-radyasyon füzeleri (ARM) ve düşük RCS/stealth hedefleri tespit ve takip edebilir. Çoklu hedef takip kapasitesiyle eşzamanlı yüzlerce iz izleyebilir. HERİKKS C4I sistemi ile entegre çalışarak müşterek hava resmi oluşturur ve SİPER/HİSAR sistemlerine hedef ataması yapar. Türkiye sınırlarının tamamını kapsayacak şekilde stratejik noktalara konuşlandırılmaktadır.",
    specs: [
      { k: "Tespit Menzili", v: "470+ km" },
      { k: "Hedef Tipleri", v: "Savaş uçağı, cruise füze, balistik füze, ARM, düşük RCS" },
      { k: "Çoklu Hedef Takip", v: "Eşzamanlı yüzlerce iz" },
      { k: "Platform", v: "Sabit / Yarı-mobil" },
      { k: "Envanter Girişi", v: "2022" },
      { k: "C4I Entegrasyonu", v: "HERİKKS, HAKİM, NATO Link 16" },
      { k: "Çelik Kubbe Rolü", v: "Omurga erken uyarı sensörü" },
      { k: "Kapsama", v: "Türkiye sınırlarının tamamı (çoklu konuşlandırma)" },
    ],
    scenarios: ["Erken İhbar/Gözetleme", "Balistik Füze Erken Uyarı", "Stealth Hedef Tespiti", "Müşterek Hava Resmi", "Çelik Kubbe Omurga Sensör"],
  },
  {
    id: 17, name: "ÇAFRAD", cat: "Radar", producer: "ASELSAN",
    force: "deniz", status: "Aktif",
    range: "400+ km (tespit) / 600+ km (arama)", altitude: "—", speed: "—",
    seeker: "—", warhead: "—",
    platform: "Gemi üstü", year: 2024,
    desc: "Çok fonksiyonlu aktif faz dizili radar süiti. Hava ve su üstü hedef tespit, takip, sınıflandırma, ateş kontrol, hedef aydınlatma. On binlerce GaN tabanlı T/R modülü. TF-2000 için tasarlandı.",
    note: "TF-2000 muhribinin ana sensörü olacak.",
    summary: "Türkiye'nin en gelişmiş çok fonksiyonlu AESA radar süiti. ASELSAN tarafından TF-2000 Hava Savunma Muhribi için geliştirilen ÇAFRAD, gemi üstünde 4 sabit panel konfigürasyonunda 360° kapsama sağlar. Her panelde on binlerce GaN (Galyum Nitrür) tabanlı T/R (Transmit/Receive) modülü barındırır. Arama, tespit, takip, sınıflandırma, tehdit değerlendirme, ateş kontrol ve füze hedef aydınlatma görevlerini eşzamanlı yapabilir. 400+ km hedef tespit ve 600+ km arama menziliyle deniz tabanlı bölge hava savunmasının (Area Air Defense) omurgasını oluşturur. İstif sınıfı fırkateynlerde küçültülmüş versiyonu konuşludur. SİPER ve MIDLAS VLS ile entegre çalışır.",
    specs: [
      { k: "Tip", v: "Çok fonksiyonlu AESA radar süiti" },
      { k: "Frekans", v: "Çoklu bant (S/X)" },
      { k: "Anten", v: "4 sabit panel (360° kapsama)" },
      { k: "T/R Modülleri", v: "On binlerce GaN tabanlı" },
      { k: "Tespit Menzili", v: "400+ km" },
      { k: "Arama Menzili", v: "600+ km" },
      { k: "Görevler", v: "Arama, tespit, takip, sınıflandırma, ateş kontrol, aydınlatma" },
      { k: "Eş Zamanlı İzler", v: "Yüzlerce hedef" },
      { k: "Ana Platform", v: "TF-2000 Hava Savunma Muhribi" },
      { k: "Mevcut Platform", v: "İstif sınıfı fırkateyn (küçültülmüş versiyon)" },
      { k: "Silah Entegrasyonu", v: "SİPER, HİSAR, MIDLAS VLS" },
    ],
    scenarios: ["Deniz Bölge Hava Savunma", "TF-2000 Ana Sensör", "Çoklu Hedef Takip/Angajman", "Anti-Balistik Füze Tespiti", "Cruise Füze Savunma"],
  },
  {
    id: 18, name: "KALKAN", cat: "Radar", producer: "ASELSAN",
    force: "kara", status: "Aktif",
    range: "120 km", altitude: "—", speed: "—",
    seeker: "—", warhead: "—",
    platform: "Araç üstü / sabit", year: 2014,
    desc: "3B arama ve takip radarı. X-bant faz dizili. Kısa ve orta menzil hava savunma görevleri. Düşük ve orta irtifa hedef tespiti. KORKUT ve HİSAR sistemleriyle entegre.",
    note: "Yeni S-bant versiyonu KALKAN-050G 2024'te tanıtıldı.",
    summary: "Türkiye'nin birincil kısa/orta menzil 3B arama ve takip radarı. ASELSAN tarafından geliştirilen KALKAN, X-bant faz dizili anten teknolojisi ile 120 km menzilde düşük ve orta irtifa hedefleri tespit ve takip eder. KORKUT silah sistemi ve HİSAR-A+/O+ bataryalarının organik arama radarı olarak görev yapar. Eşzamanlı çoklu hedef takip ve tehdit önceliklendirme kabiliyetine sahiptir. 2024'te tanıtılan KALKAN-050G versiyonu S-bant'a geçerek daha geniş kapsama ve daha iyi clutter (zemin yansıması) bastırma performansı sunmaktadır. Çelik Kubbe'nin taktik seviye arama/tespit katmanını oluşturur.",
    specs: [
      { k: "Frekans Bandı", v: "X-bant (KALKAN) / S-bant (KALKAN-050G)" },
      { k: "Anten Tipi", v: "Faz dizili (Phased Array)" },
      { k: "Tespit Menzili", v: "120 km" },
      { k: "Boyut Tarama", v: "3B (azimut, elevation, menzil)" },
      { k: "Hedef Tipleri", v: "Savaş uçağı, helikopter, İHA, cruise füze" },
      { k: "İrtifa Kapsamı", v: "Düşük ve orta irtifa" },
      { k: "Çoklu Takip", v: "Eşzamanlı hedef takip ve önceliklendirme" },
      { k: "Entegrasyon", v: "KORKUT SSA/KKA, HİSAR-A+, HİSAR-O+ bataryaları" },
      { k: "Platform", v: "Araç üstü (mobil) / Sabit" },
      { k: "Envanter Girişi", v: "2014" },
      { k: "Yeni Versiyon", v: "KALKAN-050G (S-bant, 2024)" },
    ],
    scenarios: ["Taktik Hava Gözetleme", "HİSAR/KORKUT Batarya Radarı", "Düşük İrtifa Tespit", "İHA/Drone Takip", "Çelik Kubbe Taktik Sensör"],
  },
  {
    id: 19, name: "HERİKKS", cat: "Komuta Kontrol", producer: "ASELSAN",
    force: "kara", status: "Aktif",
    range: "—", altitude: "—", speed: "—",
    seeker: "—", warhead: "—",
    platform: "Sabit / Mobil", year: 2015,
    desc: "Hava savunma erken ihbar ve C4I sistemi. Çelik Kubbe'nin beyni. Müşterek hava resmi, yapay zekâ destekli tehdit değerlendirme, silah atama, LLAPI standardı ile NATO entegrasyonu.",
    note: "HAKİM komuta sistemi ile entegre çalışır.",
    summary: "Türkiye'nin hava savunma komuta kontrol sistemi ve Çelik Kubbe mimarisinin 'beyni'. ASELSAN tarafından geliştirilen HERİKKS (Hava savunma Erken İhbar, Komuta Kontrol Sistemi), tüm radar sensörleri (EIRS, ALP 300-G, KALKAN, ÇAFRAD) ve silah sistemlerini (SİPER, HİSAR, KORKUT, SUNGUR) tek bir komuta ağında birleştirir. Müşterek hava resmi (Recognized Air Picture) oluşturarak yapay zekâ destekli tehdit değerlendirme, silah-hedef ataması ve angajman koordinasyonu yapar. LLAPI (Low Level Air Picture Interface) standardı ile NATO hava savunma mimarisine entegre çalışır. HAKİM (Hava Kuvvetleri Komuta Kontrol) sistemi ile bütünleşiktir.",
    specs: [
      { k: "Sınıf", v: "C4I (Komuta, Kontrol, Muhabere, Bilgisayar, İstihbarat)" },
      { k: "Görev", v: "Hava savunma erken ihbar, komuta kontrol, koordinasyon" },
      { k: "Sensör Entegrasyonu", v: "EIRS, ALP 300-G, KALKAN, ÇAFRAD, E-7T" },
      { k: "Silah Entegrasyonu", v: "SİPER, HİSAR-A+, HİSAR-O+, KORKUT, SUNGUR" },
      { k: "Hava Resmi", v: "Müşterek hava resmi (RAP) oluşturma" },
      { k: "Yapay Zekâ", v: "Tehdit değerlendirme ve silah atama otomasyonu" },
      { k: "NATO Uyumu", v: "LLAPI standardı" },
      { k: "HAKİM", v: "Hava Kuvvetleri komuta sistemiyle entegre" },
      { k: "Platform", v: "Sabit komuta merkezi + Mobil komuta aracı" },
      { k: "Envanter Girişi", v: "2015" },
    ],
    scenarios: ["Çelik Kubbe Komuta/Koordinasyon", "Müşterek Hava Resmi", "Yapay Zekâ Destekli Silah Atama", "NATO Entegrasyonu", "Çoklu Katman Koordinasyonu"],
  },
  {
    id: 20, name: "MIDLAS", cat: "Fırlatıcı", producer: "ROKETSAN",
    force: "deniz", status: "Aktif",
    range: "—", altitude: "—", speed: "—",
    seeker: "—", warhead: "—",
    platform: "Gemi üstü (VLS)", year: 2023,
    desc: "Çok amaçlı dikey fırlatma sistemi. TF-2000'de 96 hücre (32 pruva + 64 orta gövde). Atmaca, Gezgin, hava savunma füzeleri ve balistik füze önleme füzeleri fırlatabilir.",
    note: "İstif sınıfı ve TF-2000'de kullanılıyor.",
    summary: "Türkiye'nin ilk yerli çok amaçlı dikey fırlatma sistemi (VLS - Vertical Launch System). ROKETSAN tarafından geliştirilen MIDLAS, modüler hücre yapısıyla farklı tiplerde füzeleri fırlatabilir. TF-2000 Hava Savunma Muhribi'nde 96 hücre (32 pruva + 64 orta gövde) konfigürasyonunda planlanmaktadır. Atmaca anti-gemi füzesi, Gezgin seyir füzesi, SİPER ve HİSAR hava savunma füzeleri ile ileride balistik füze önleme füzelerini fırlatabilecek şekilde tasarlanmıştır. İstif sınıfı fırkateynlerde daha küçük konfigürasyonda konuşludur. MK-41 VLS muadili olarak deniz kuvvetlerinin dikey fırlatma ihtiyacını karşılamaktadır.",
    specs: [
      { k: "Tip", v: "Çok amaçlı dikey fırlatma sistemi (VLS)" },
      { k: "TF-2000 Konfigürasyonu", v: "96 hücre (32 pruva + 64 orta gövde)" },
      { k: "İstif Konfigürasyonu", v: "Küçültülmüş modüler" },
      { k: "Uyumlu Füzeler", v: "Atmaca, Gezgin, SİPER, HİSAR, BMD (planlanan)" },
      { k: "Fırlatma Yönü", v: "Dikey (360° angajman)" },
      { k: "Modülerlik", v: "Farklı füze tipleri için değiştirilebilir hücre" },
      { k: "Muadil", v: "MK-41 VLS (Lockheed Martin)" },
      { k: "Envanter Girişi", v: "2023" },
      { k: "Ana Platform", v: "TF-2000 Hava Savunma Muhribi" },
    ],
    scenarios: ["Deniz Hava Savunma", "Anti-Gemi Savaşı", "Kara Hedefi Taarruzu", "Balistik Füze Savunma (planlanan)", "TF-2000 Silah Sistemi"],
  },
  {
    id: 21, name: "S-400", cat: "Füze (SAM)", producer: "Almaz-Antey (Rusya)",
    force: "hava", status: "Pasif",
    range: "400 km", altitude: "30 km", speed: "Hipersonik",
    seeker: "Yarı-aktif radar + TVM", warhead: "HE Parçacıklı",
    platform: "Araç üstü", year: 2019,
    desc: "Rus menşeli uzun menzilli hava savunma sistemi. 2019'da teslim alındı ancak F-35 programı nedeniyle hiç aktive edilmedi. İade görüşmeleri devam ediyor.",
    note: "Rusya'ya iade karşılığında F-35 programına dönüş gündemde.",
    summary: "Rusya Federasyonu menşeli uzun menzilli hava savunma sistemi. Almaz-Antey tarafından üretilen S-400 Triumf, Türkiye tarafından 2017'de satın alınmış ve Temmuz 2019'da teslim alınmıştır. Ancak ABD'nin F-35 programından çıkarılma tehdidi ve CAATSA yaptırımları nedeniyle sistem hiçbir zaman aktive edilmemiş ve operasyonel kullanıma alınmamıştır. Mürted Hava Üssü'nde depolanmaktadır. Rusya'ya iade karşılığında F-35 programına dönüş görüşmeleri gündemdedir. Sistemin Türkiye'nin kendi yerli SİPER projesini hızlandırmasında motivasyon kaynağı olduğu değerlendirilmektedir.",
    specs: [
      { k: "Üretici", v: "Almaz-Antey (Rusya)" },
      { k: "NATO Kodu", v: "SA-21 Growler" },
      { k: "Teslim Tarihi", v: "Temmuz 2019" },
      { k: "Menzil (40N6)", v: "400 km" },
      { k: "Menzil (48N6)", v: "250 km" },
      { k: "İrtifa", v: "30 km" },
      { k: "Hız", v: "Hipersonik (Mach 12+ / 48N6E3)" },
      { k: "Füze Tipleri", v: "40N6, 48N6, 9M96E, 9M96E2" },
      { k: "Radar", v: "91N6E (gözetleme) + 92N6E (angajman)" },
      { k: "Durum", v: "Pasif — hiç aktive edilmedi" },
      { k: "Depolama", v: "Mürted Hava Üssü, Ankara" },
      { k: "Siyasi Etki", v: "F-35 programından çıkarılma, CAATSA yaptırımları" },
    ],
    scenarios: ["Pasif/Depolama", "F-35 Programı Müzakereleri", "Rusya İade Görüşmeleri", "Yerli SİPER Projesini Hızlandırma Motivasyonu"],
  },
  {
    id: 22, name: "E-7T Barış Kartalı", cat: "Erken Uyarı", producer: "Boeing / ASELSAN / TUSAŞ",
    force: "hava", status: "Aktif",
    range: "600+ km (MESA radar)", altitude: "41.000 ft (tavan)", speed: "Mach 0.78",
    seeker: "MESA L-bant AESA + ESM/ELINT", warhead: "—",
    platform: "Boeing 737-700 IGW", year: 2014,
    desc: "Havadan erken uyarı ve kontrol uçağı. MESA AESA radarıyla 360° kapsama, 600+ km menzilde hava ve deniz hedeflerini eş zamanlı tespit. 4 uçak (Kuzey, Güney, Doğu, Batı) 131. Filo Konya'da görevde. ARES-2A ESM, Nemesis DIRCM, AAR-54 MWS ile donatılmış. Hava savunma zincirinin erken uyarı katmanını oluşturarak HERİKKS ile entegre çalışır.",
    note: "ASELSAN ARES-2A ESM modernizasyonu devam ediyor. NATO Ramstein Alloy, NEXUS ACE tatbikatlarında görev aldı.",
    summary: "Türk Hava Kuvvetleri'nin havadan erken uyarı ve kontrol (AEW&C) uçağı. Boeing 737-700 IGW gövdesi üzerine Northrop Grumman MESA (Multi-role Electronically Scanned Array) L-bant AESA radarı entegre edilmiştir. 600+ km menzilde hava ve deniz hedeflerini 360° kapsamda eşzamanlı tespit ve takip eder. 4 uçak 131. Filo bünyesinde Konya'da konuşlu olup Kuzey, Güney, Doğu ve Batı sektörlerini kapsayacak şekilde 7/24 rotasyonla görev yapar. ASELSAN ARES-2A ESM süiti, Northrop Grumman Nemesis DIRCM, BAE Systems AAR-54 MWS ve NATO Link 16 veri bağlantısı ile donatılmıştır. Hava savunma zincirinin havadan erken uyarı katmanını oluşturarak HERİKKS C4I sistemiyle entegre çalışır ve SİPER/HİSAR sistemlerine hedef bilgisi sağlar.",
    specs: [
      { k: "Gövde", v: "Boeing 737-700 IGW" },
      { k: "Radar", v: "MESA L-bant AESA (Northrop Grumman)" },
      { k: "Radar Menzili", v: "600+ km (hava), 400+ km (deniz)" },
      { k: "Kapsama", v: "360° (top-hat + sırt anteni)" },
      { k: "ESM/ELINT", v: "ASELSAN ARES-2A (modernizasyon devam ediyor)" },
      { k: "Öz Koruma", v: "Nemesis DIRCM + AAR-54 MWS" },
      { k: "Veri Bağlantısı", v: "Link 16, Link 11, HERİKKS datalink" },
      { k: "Uçak Sayısı", v: "4 (131. Filo, Konya)" },
      { k: "Görev Süresi", v: "10+ saat (havada ikmal ile uzatılabilir)" },
      { k: "Operatör Sayısı", v: "6-10 (görev pozisyonu)" },
      { k: "Tavan İrtifası", v: "41.000 ft" },
      { k: "Hız", v: "Mach 0.78 (seyir)" },
      { k: "NATO Tatbikatları", v: "Ramstein Alloy, NEXUS ACE" },
    ],
    scenarios: ["Havadan Erken Uyarı (AEW&C)", "Müşterek Hava Resmi", "SİPER/HİSAR Hedef Bilgisi", "NATO Operasyonları", "Deniz Gözetleme", "Sınır Güvenliği"],
  },
];

const categories = [
  { label: "Tümü", value: "" },
  { label: "Füze", value: "Füze" },
  { label: "Top/CIWS", value: "Top/CIWS" },
  { label: "Radar", value: "Radar" },
  { label: "Lazer", value: "Lazer" },
  { label: "Havadan Havaya", value: "Havadan Havaya" },
  { label: "Komuta Kontrol", value: "Komuta Kontrol" },
  { label: "Erken Uyarı", value: "Erken Uyarı" },
  { label: "Fırlatıcı", value: "Fırlatıcı" },
];

const statusColor = (s) => {
  if (s === "Aktif") return C.green;
  if (s === "Seri Üretim") return C.cyan;
  if (s === "Geliştirme") return C.amber;
  if (s === "Pasif") return C.red;
  return C.textDim;
};

const catIcon = (cat) => {
  if (cat.startsWith("Füze")) return "▲";
  if (cat === "Top/CIWS") return "❖";
  if (cat === "Radar") return "◉";
  if (cat === "Lazer") return "☇";
  if (cat === "Havadan Havaya") return "✈";
  if (cat === "Komuta Kontrol") return "⌘";
  if (cat === "Fırlatıcı") return "▣";
  if (cat === "Erken Uyarı") return "◎";
  return "●";
};

export default function HSEnvanter() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const q = search.toLocaleLowerCase("tr-TR");
  const filtered = systemDB.filter((s) => {
    const catMatch =
      selectedCat === "" ||
      s.cat.toLocaleLowerCase("tr-TR").includes(selectedCat.toLocaleLowerCase("tr-TR"));
    const textMatch =
      q === "" ||
      s.name.toLocaleLowerCase("tr-TR").includes(q) ||
      s.cat.toLocaleLowerCase("tr-TR").includes(q) ||
      s.producer.toLocaleLowerCase("tr-TR").includes(q) ||
      s.desc.toLocaleLowerCase("tr-TR").includes(q) ||
      s.platform.toLocaleLowerCase("tr-TR").includes(q) ||
      (s.summary && s.summary.toLocaleLowerCase("tr-TR").includes(q)) ||
      (s.scenarios && s.scenarios.some(sc => sc.toLocaleLowerCase("tr-TR").includes(q)));
    return catMatch && textMatch;
  });

  const sel = selectedId !== null ? systemDB.find((s) => s.id === selectedId) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      {/* Search Bar */}
      <Panel glow={C.cyan} noPad>
        <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16, color: C.cyan }}>{"⊞"}</span>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedId(null); }}
              placeholder="Sistem ara... (isim, kategori, üretici, platform, senaryo)"
              style={{
                width: "100%", padding: "8px 12px 8px 30px", background: C.bg2,
                border: `1px solid ${C.border}`, borderRadius: 5, color: C.white,
                fontSize: 13, fontFamily: FONT, outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.cyan)}
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.textDim }}>{"🔍"}</span>
          </div>
          <span style={{ fontSize: 13, color: C.textDim, fontFamily: MONO, whiteSpace: "nowrap" }}>
            {filtered.length} / {systemDB.length}
          </span>
        </div>
      </Panel>

      {/* Category Filters */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "0 2px" }}>
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => { setSelectedCat(cat.value); setSelectedId(null); }}
            style={{
              padding: "3px 10px", borderRadius: 2, fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: FONT, letterSpacing: 0.5, transition: "all 0.15s",
              border: selectedCat === cat.value ? `1px solid ${C.cyan}` : `1px solid ${C.border}`,
              background: selectedCat === cat.value ? `${C.cyan}18` : "transparent",
              color: selectedCat === cat.value ? C.cyan : C.textDim,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Content: List + Detail */}
      <div className="rg-sidebar" style={{ display: "grid", gridTemplateColumns: sel ? "320px 1fr" : "1fr", gap: 10, minHeight: 500 }}>
        {/* System List */}
        <Panel
          title="SİSTEM ENVANTERİ"
          sub={search || selectedCat ? `${selectedCat || "Tümü"}${search ? ` · "${search}"` : ""}` : `${systemDB.length} sistem`}
          glow={C.cyan}
          noPad
        >
          <div style={{ padding: 0, maxHeight: sel ? 620 : 700, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 20, textAlign: "center", color: C.textDim, fontSize: 11 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{"🔍"}</div>
                Sonuç bulunamadı
              </div>
            ) : (
              filtered.map((sys) => (
                <div
                  key={sys.id}
                  onClick={() => setSelectedId(selectedId === sys.id ? null : sys.id)}
                  className="hov"
                  style={{
                    padding: "8px 12px", cursor: "pointer", transition: "all 0.15s",
                    borderBottom: `1px solid ${C.border}`,
                    borderLeft: `3px solid ${selectedId === sys.id ? forceColor(sys.force) : "transparent"}`,
                    background: selectedId === sys.id ? C.panelHi : "transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, minWidth: 24, textAlign: "center", color: forceColor(sys.force) }}>
                      {catIcon(sys.cat)}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: C.white, fontFamily: FONT }}>{sys.name}</span>
                        <ForceTag force={sys.force} />
                      </div>
                      <div style={{ fontSize: 11, color: C.textDim, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: FONT }}>
                        {sys.cat} — {sys.producer}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                      <Badge color={statusColor(sys.status)}>{sys.status}</Badge>
                      <span style={{ fontSize: 10, color: C.textDim, fontFamily: MONO }}>{sys.year}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Panel>

        {/* Detail View */}
        {sel && (
          <Panel title={sel.name} sub={sel.cat} glow={forceColor(sel.force)} noPad>
            <div style={{ padding: 14, maxHeight: 620, overflowY: "auto" }}>
              {/* Top badges */}
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                <ForceTag force={sel.force} />
                <Badge color={statusColor(sel.status)}>{sel.status}</Badge>
                <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 4, fontWeight: 600, color: C.textDim, border: `1px solid ${C.border}`, fontFamily: FONT }}>
                  {sel.producer}
                </span>
                <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 4, fontWeight: 600, color: C.textDim, border: `1px solid ${C.border}`, fontFamily: FONT }}>
                  {sel.year}
                </span>
              </div>

              {/* Summary / Description */}
              <div style={{ background: C.bg2, borderRadius: 5, padding: "10px 12px", marginBottom: 12, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, color: C.cyan, fontWeight: 700, letterSpacing: 1, marginBottom: 4, fontFamily: FONT }}>{"◉"} TANIM</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontFamily: FONT }}>{sel.summary || sel.desc}</div>
              </div>

              {/* Detailed Specs Table */}
              {sel.specs && sel.specs.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.amber, fontWeight: 700, letterSpacing: 1, marginBottom: 6, paddingLeft: 2, fontFamily: FONT }}>
                    {"◆"} TEKNİK ÖZELLİKLER — DATASHEET
                  </div>
                  <div style={{ borderRadius: 5, overflow: "hidden", border: `1px solid ${C.border}` }}>
                    {sel.specs.map((s, j) => (
                      <div
                        key={j}
                        style={{
                          display: "grid", gridTemplateColumns: "140px 1fr",
                          borderBottom: j < sel.specs.length - 1 ? `1px solid ${C.border}` : "none",
                          background: j % 2 === 0 ? C.bg2 : "transparent",
                        }}
                      >
                        <div style={{ padding: "6px 10px", fontSize: 12, fontWeight: 700, color: C.cyan, borderRight: `1px solid ${C.border}`, fontFamily: FONT }}>
                          {s.k}
                        </div>
                        <div style={{ padding: "6px 10px", fontSize: 12, color: C.text, lineHeight: 1.5, fontFamily: FONT }}>
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Bars */}
              {sel.range !== "—" && sel.range !== "" && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.purple, fontWeight: 700, letterSpacing: 1, marginBottom: 6, paddingLeft: 2, fontFamily: FONT }}>
                    {"▸"} KABİLİYET GÖSTERGELERİ
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {(() => {
                      const rangeNum = parseFloat(sel.range.replace(/[^0-9.]/g, "")) || 0;
                      const altNum = parseFloat(sel.altitude.replace(/[^0-9.]/g, "")) || 0;
                      const maxRange = 600;
                      const maxAlt = 41;
                      return (
                        <>
                          <div>
                            <div style={{ fontSize: 11, color: C.textDim, marginBottom: 2, fontFamily: FONT }}>Menzil ({sel.range})</div>
                            <SeverityBar value={Math.min(Math.round((rangeNum / maxRange) * 100), 100)} color={C.cyan} />
                          </div>
                          {altNum > 0 && (
                            <div>
                              <div style={{ fontSize: 11, color: C.textDim, marginBottom: 2, fontFamily: FONT }}>İrtifa ({sel.altitude})</div>
                              <SeverityBar value={Math.min(Math.round((altNum / maxAlt) * 100), 100)} color={C.amber} />
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Scenarios */}
              {sel.scenarios && sel.scenarios.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.green, fontWeight: 700, letterSpacing: 1, marginBottom: 6, paddingLeft: 2, fontFamily: FONT }}>
                    {"▸"} KULLANIM SENARYOLARI
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {sel.scenarios.map((sc, j) => (
                      <span key={j} style={{ fontSize: 11, padding: "4px 8px", background: `${C.green}10`, border: `1px solid ${C.green}25`, borderRadius: 2, color: C.text, fontWeight: 600 }}>{sc}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Note */}
              {sel.note && (
                <div style={{ background: `${C.amber}08`, borderRadius: 5, padding: "10px 12px", marginBottom: 12, border: `1px solid ${C.amber}20` }}>
                  <div style={{ fontSize: 11, color: C.amber, fontWeight: 700, letterSpacing: 1, marginBottom: 4, fontFamily: FONT }}>{"◆"} NOT</div>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontFamily: FONT }}>{sel.note}</div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                style={{
                  marginTop: 6, width: "100%", padding: "7px", background: "transparent",
                  border: `1px solid ${C.border}`, borderRadius: 5, color: C.textDim,
                  fontSize: 12, fontFamily: FONT, cursor: "pointer", fontWeight: 600, letterSpacing: 1,
                }}
              >
                {"✕"} KAPAT
              </button>
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}
