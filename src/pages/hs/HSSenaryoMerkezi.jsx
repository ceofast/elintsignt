import { useState } from "react";
import { C, glow } from "../../theme";
import { Panel, Badge, SeverityBar } from "../../components";

/* ═══════════════════════════════════════════════════════════════
   HAVA SAVUNMA — SENARYO MERKEZİ
   Açık kaynak verilere dayalı taktik senaryo analizi
   ═══════════════════════════════════════════════════════════════ */

const scenarios = [
  /* ─────────────────── 1. FPV / DRONE SÜRÜSÜ ─────────────────── */
  {
    id: "drone-swarm",
    name: "FPV / Kamikaze Drone Sürüsü",
    icon: "◈",
    priority: "KRİTİK",
    color: C.red,
    desc: "Çok sayıda ucuz FPV ve kamikaze drone ile doyurma saldırısı. Ukrayna-Rusya savaşından alınan derslerle günümüzün en olası asimetrik tehdit senaryosu. Hedef: ileri mevziler, lojistik depolar, komuta noktaları.",
    threatProfile: {
      type: "Mikro / Mini İHA Sürüsü",
      count: "50–200+ adet (dalgalar halinde)",
      speed: "60–150 km/s",
      altitude: "10–300 m (arazi takipli)",
      rcs: "0.001–0.01 m² (çok düşük)",
      ecm: "Yok / Sınırlı GPS karıştırma",
      cost: "Birim $500–5.000",
      examples: "Shahed-136 mini, FPV yarış drone, Lancet benzeri",
    },
    layers: ["VSHORAD"],
    phases: [
      { name: "TESPİT", color: C.purple, steps: [
        { time: "T-90s", event: "İHTAR ACAR radarı alçak irtifa küçük hedef tespiti (15–20 km)", system: "İHTAR ACAR", detail: "X-bant, düşük RCS optimizasyonlu, mikro-Doppler analizi ile kuş/drone ayrımı" },
        { time: "T-75s", event: "KALKAN-050G 3D arama radarı ile kümeleme ve sayım", system: "KALKAN-050G", detail: "Sürü büyüklüğü, yön ve hız vektörleri hesaplanır" },
        { time: "T-60s", event: "Elektro-optik sensörler ile görsel sınıflandırma", system: "EO Direği", detail: "Termal + TV kamera ile tip tanıma (FPV/kamikaze/keşif)" },
      ]},
      { name: "YUMUŞAK ÖLDÜRME (Soft-Kill)", color: C.cyan, steps: [
        { time: "T-50s", event: "KANGAL-FPV ile RF kumanda bağlantısı karıştırma", system: "KANGAL-FPV", detail: "2.4/5.8 GHz bantlarında barrage jamming, kontrol kaybı" },
        { time: "T-45s", event: "GNSS aldatma ile sürüyü sahte hedefe yönlendirme", system: "GPS Spoofing", detail: "Koordinat sapması ile drone'ları boş alana yönlendirir" },
        { time: "T-35s", event: "EJDERHA HPEM ile fiber optik kontrollü drone'lara fiziksel hasar", system: "EJDERHA", detail: "Yüksek güçlü mikrodalga, elektronik devre tahrip, 200–500 m etki" },
      ]},
      { name: "SERT ÖLDÜRME (Hard-Kill)", color: C.amber, steps: [
        { time: "T-25s", event: "KORKUT 35mm AHEAD mühimmatı ile sürü angajmanı", system: "KORKUT", detail: "Her mermi 152 tungsten parçacık, programlanabilir zaman tüpü, maliyet ~$200/atış" },
        { time: "T-20s", event: "Oerlikon GDF bataryaları sabit mevzilerden destek ateşi", system: "Oerlikon GDF", detail: "GDF-003/005 ile mevzi savunması, Skyguard radar yönetiminde" },
        { time: "T-12s", event: "SUNGUR IIR füzeleri sızan yüksek öncelikli hedeflere", system: "SUNGUR", detail: "IIR imaj arayıcı, maliyet ~$80.000/füze — yalnızca HVT hedeflere" },
        { time: "T-5s", event: "GÖKBERK mini güdümlü füze ile kalan mikro İHA'lar", system: "GÖKBERK", detail: "Düşük maliyetli mini füze, mikro-İHA optimizasyonlu" },
      ]},
    ],
    primary: ["KORKUT", "Oerlikon GDF", "SUNGUR", "GÖKBERK", "KALKAN-050G", "İHTAR ACAR"],
    secondary: ["EJDERHA (HPEM)", "KANGAL-FPV", "GPS Spoofing Sistemi"],
    tactics: "Drone sürüsü saldırısında en kritik faktör mühimmat ekonomisidir. Bir FPV drone ~$1.000, bir SUNGUR füzesi ~$80.000'dır — 1:80 maliyet oranı sürdürülebilir değildir. Bu nedenle doktrin: (1) Önce soft-kill ile maksimum sayıda drone'u etkisizleştir, (2) AHEAD mühimmatı ile kalan sürüyü angaje et (~$200/atış), (3) Füzeleri yalnızca sızan yüksek değerli hedeflere (mühimmat taşıyan kamikaze) kullan. KORKUT'un 35mm AHEAD mühimmatı bu senaryonun omurgasıdır — her mermi 152 tungsten parçacık saçarak küçük hedeflere karşı yüksek isabet olasılığı sağlar.",
    costAnalysis: {
      perKill: "AHEAD: ~$200–600 | SUNGUR: ~$80.000 | Soft-Kill: ~$0",
      ratio: "Hedef drone maliyeti vs savunma: 1:80 (füze) → 1:0.2 (AHEAD) → 1:0 (EW)",
      note: "100 drone'luk sürüye karşı optimum: %40 soft-kill, %50 AHEAD, %10 füze",
    },
    realWorld: [
      "Ukrayna: Gepard 35mm SPAAG'lar Shahed-136 karşı %80+ isabet oranı",
      "Suudi Arabistan: Patriot ile Houthi drone'larına karşı aşırı füze tüketimi sorunu",
      "İsrail: Iron Dome füze/drone maliyet dengesizliği tartışması",
    ],
    criticalFactors: [
      "Mühimmat stoku derinliği (35mm AHEAD yeterli stok)",
      "Soft-kill/Hard-kill entegrasyonu ve geçiş hızı",
      "Sürü büyüklüğü vs ateş gücü doyurma noktası",
      "Radar düşük RCS tespit performansı",
    ],
  },

  /* ─────────────────── 2. CRUİSE FÜZE ─────────────────── */
  {
    id: "cruise-missile",
    name: "Cruise Füze Saldırısı",
    icon: "▸",
    priority: "KRİTİK",
    color: C.cyan,
    desc: "Düşman deniz veya hava platformlarından atılan seyir füzeleri ile stratejik hedeflere saldırı. Arazi takibi yaparak radar ufkunun altında uçan, düşük RCS'li hedefler. Hedef: havalimanları, enerji tesisleri, C2 merkezleri.",
    threatProfile: {
      type: "Seyir (Cruise) Füzesi",
      count: "10–30 adet (salvo)",
      speed: "Mach 0.8–1.2 (950–1.400 km/s)",
      altitude: "15–100 m (arazi takipli), terminal dalış",
      rcs: "0.05–0.5 m²",
      ecm: "DRFM karıştırıcı, sahte hedef üretici",
      cost: "Birim $1–3 milyon",
      examples: "Kh-101, Kalibr, 3M-54 Klub, Harpoon benzeri",
    },
    layers: ["MRAD", "SHORAD"],
    phases: [
      { name: "ERKEN İHTAR", color: C.purple, steps: [
        { time: "T-600s", event: "EIRS fırlatma platformunu (gemi/uçak) 470+ km'de tespit eder", system: "EIRS", detail: "Fırlatma platformu tespiti, füze yörüngesi tahmini yapılamaz" },
        { time: "T-400s", event: "HERİKKS C4I'ye erken ihtar aktarımı, alarm seviyesi yükseltme", system: "HERİKKS C4I", detail: "Müşterek hava resmine potansiyel tehdit bildirimi" },
      ]},
      { name: "TESPİT & TAKİP", color: C.cyan, steps: [
        { time: "T-180s", event: "ÇAFRAD AESA radar ile alçak irtifa cruise füze tespiti (~80–120 km)", system: "ÇAFRAD", detail: "Dijital hüzme ile eş zamanlı çoklu alçak irtifa tarama" },
        { time: "T-150s", event: "KALKAN 3D arama radarı ile ek tespit ve takip", system: "KALKAN", detail: "120 km menzil, cruise füze yörünge doğrulaması" },
        { time: "T-120s", event: "Hedef kimliklendirme ve angajman kararı", system: "HERİKKS C4I", detail: "IFF sorgu, tehdit değerlendirme, effektör ataması" },
      ]},
      { name: "ORTA MENZIL ANGAJMAN", color: C.cyan, steps: [
        { time: "T-100s", event: "HİSAR-O+ RF aktif radar arayıcılı varyant ile 40+ km'den ateş", system: "HİSAR-O+ RF", detail: "Aktif radar arayıcı, kendi güdümü, ÇAFRAD veri güncellemesi" },
        { time: "T-70s", event: "İlk atış BDA (Battle Damage Assessment), sızan hedef sayısı", system: "ÇAFRAD", detail: "Radar ile vuruş doğrulaması, kalan tehdit yeniden hesaplanır" },
        { time: "T-55s", event: "HİSAR-O+ IIR ile sızan hedeflere ateşle-unut angajmanı", system: "HİSAR-O+ IIR", detail: "Kızılötesi imaj arayıcı, ECM'ye karşı dayanıklı, pasif güdüm" },
      ]},
      { name: "KISA MENZIL SAVUNMA", color: C.amber, steps: [
        { time: "T-30s", event: "HİSAR-A+ son savunma hattı müdahalesi", system: "HİSAR-A+", detail: "15 km menzil, IIR arayıcı, hızlı reaksiyon" },
        { time: "T-15s", event: "KORKUT 35mm ile terminal dalış yapan füzelere ateş", system: "KORKUT", detail: "Yüksek atış hızı ile dalış fazında angajman" },
      ]},
    ],
    primary: ["HİSAR-O+ RF", "HİSAR-O+ IIR", "HİSAR-A+", "ÇAFRAD", "KALKAN"],
    secondary: ["EIRS", "KORKUT", "SUNGUR", "HERİKKS C4I", "HAKİM"],
    tactics: "Cruise füzeler arazi takibi yaparak radar ufkunun altında uçar. EIRS 470+ km'de fırlatma platformunu (gemi/uçak) tespit edebilir ancak cruise füzenin kendisi ancak ~80–120 km'de ÇAFRAD/KALKAN radarları tarafından yakalanır. Bu nedenle reaksiyon süresi kısadır ve otomatik hedef dağıtımı kritiktir. HİSAR-O+ RF varyantının aktif radar arayıcısı, DRFM karıştırıcılı hedeflere karşı avantaj sağlar. IIR varyant ise ECM'den tamamen bağımsız pasif güdüm ile sızan hedeflere karşı ikinci hat oluşturur. Tüm koordinasyon HERİKKS C4I üzerinden otomatik hedef dağıtımı ile yapılır.",
    costAnalysis: {
      perKill: "HİSAR-O+: ~$1–2M | HİSAR-A+: ~$500K (tahmini)",
      ratio: "Hedef cruise füze maliyeti vs savunma: yaklaşık 1:1",
      note: "Cruise füze savunması maliyet açısından dengelidir, asıl zorluk reaksiyon süresi",
    },
    realWorld: [
      "Ukrayna: NASAMS/IRIS-T ile Kh-101 cruise füze müdahalesi, ~70% başarı oranı",
      "Suudi Arabistan: Patriot ile Houthi cruise füzelerine karşı başarılı müdahaleler",
      "Suriye: İsrail cruise füzelerine karşı S-300/Pantsir katmanlı savunma",
    ],
    criticalFactors: [
      "Alçak irtifa radar kapsama boşlukları (arazi gölgeleri)",
      "ÇAFRAD clutter rejection performansı",
      "Reaksiyon süresi (tespit → ateş < 60 saniye)",
      "Eş zamanlı çoklu hedef kapasitesi",
    ],
  },

  /* ─────────────────── 3. HAVA TAARRUZU ─────────────────── */
  {
    id: "air-strike",
    name: "Düşman Hava Taarruzu",
    icon: "◆",
    priority: "KRİTİK",
    color: C.amber,
    desc: "Düşman savaş uçakları ile yapılan koordineli hava taarruzu. SEAD/DEAD, escort ve taarruz unsurlarından oluşan paket. Hedef: hava üsleri, radar mevzileri, stratejik tesisler.",
    threatProfile: {
      type: "4/5. Nesil Savaş Uçağı Paketi",
      count: "12–24 uçak (4-6 filo)",
      speed: "Mach 0.9–1.8",
      altitude: "50 m (penetrasyon) – 15.000 m (cruise)",
      rcs: "0.1–5 m² (4. nesil) / 0.001–0.01 m² (5. nesil)",
      ecm: "AESA tabanlı jamming, DRFM, towed decoy, chaff/flare",
      cost: "Uçak $30–100M + mühimmat $500K–5M/sorti",
      examples: "Su-35, Su-57, F-35 (varsayımsal), Rafale, Eurofighter",
    },
    layers: ["LRAD", "MRAD", "SHORAD"],
    phases: [
      { name: "ERKEN İHTAR & İSTİHBARAT", color: C.purple, steps: [
        { time: "T-900s", event: "EIRS 470+ km'de düşman uçak kalkışlarını tespit eder", system: "EIRS", detail: "Çoklu hedef kümeleme, kalkış yönü ve hız vektörü" },
        { time: "T-750s", event: "ALP-300G S-bant erken ihbar radarı ile doğrulama", system: "ALP-300G", detail: "EIRS verisini çapraz doğrulama, hedef sayısı kesinleştirme" },
        { time: "T-600s", event: "HERİKKS C4I alarm, SİPER bataryaları HAZIR konumuna", system: "HERİKKS C4I", detail: "Ateş kontrol radarları bekleme modunda, EMCON yönetimi" },
      ]},
      { name: "UZUN MENZIL ANGAJMAN", color: C.purple, steps: [
        { time: "T-400s", event: "ÇAFRAD çoklu hedef takip moduna geçiş (~200+ km)", system: "ÇAFRAD", detail: "Dijital AESA hüzme, 200+ hedef eş zamanlı takip" },
        { time: "T-300s", event: "SİPER Blok 2 ile 150 km'den ilk angajman (shoot-look-shoot)", system: "SİPER Blok 2", detail: "Çift modlu arayıcı, ECCM kabiliyetli, 2 füze/hedef" },
        { time: "T-200s", event: "İlk BDA, sızan hedef sayısı belirlenir", system: "ÇAFRAD", detail: "Radar vuruş doğrulaması, angajman yeniden planlama" },
        { time: "T-150s", event: "SİPER Blok 1 ile 100 km'den ikinci atış fırsatı", system: "SİPER Blok 1", detail: "RF arayıcılı, sızan ve ECM kullanan hedeflere" },
      ]},
      { name: "ECCM & HARM KARŞI ÖNLEMİ", color: C.cyan, steps: [
        { time: "T-180s", event: "Düşman SEAD uçağı HARM/AGM-88 atar → EMCON devreye", system: "EMCON Yönetimi", detail: "Radar emisyon kontrolü: kısa süreli kapatma veya frekans atlamalı yayın" },
        { time: "T-160s", event: "ÇAFRAD düşük yan lob + frekans çevikliği ile ECCM", system: "ÇAFRAD ECCM", detail: "HARM'ın home-on-jam yeteneğine karşı frekans hopping" },
        { time: "T-140s", event: "Pasif EO güdüm moduna geçiş (radar kapatılırsa)", system: "EO/IR Güdüm", detail: "IRST + lazer ile pasif takip ve güdüm güncellemesi" },
      ]},
      { name: "ORTA & KISA MENZIL", color: C.amber, steps: [
        { time: "T-80s", event: "HİSAR-O+ ile sızan uçaklara orta menzil müdahale", system: "HİSAR-O+", detail: "40+ km RF / 25 km IIR, penetrasyon irtifasındaki hedefler" },
        { time: "T-40s", event: "HİSAR-A+ kısa menzil savunma, taarruz fazındaki uçaklar", system: "HİSAR-A+", detail: "Bomba/füze atış anında savunmasız uçaklara karşı etkili" },
        { time: "T-15s", event: "KORKUT ve SUNGUR ile son hat savunması", system: "KORKUT / SUNGUR", detail: "Tesisi geçmeye çalışan uçaklara yakın savunma" },
      ]},
    ],
    primary: ["SİPER Blok 1", "SİPER Blok 2", "HİSAR-O+", "ÇAFRAD", "EIRS", "ALP-300G"],
    secondary: ["HİSAR-A+", "KORKUT", "SUNGUR", "HERİKKS C4I", "HAKİM", "KALKAN"],
    tactics: "Düşman hava taarruz paketine karşı tam Çelik Kubbe doktrini uygulanır. SİPER'in 150+ km menzili, düşmanı silah atış mesafesine girmeden angajman imkanı sağlar (engage-on-remote / shoot-look-shoot). En kritik tehdit SEAD unsürüdur — HARM füzesi radar emisyonuna kitlenir. Buna karşı EMCON (emisyon kontrolü), ÇAFRAD'ın düşük yan lob AESA yapısı ve frekans çevikliği ile ECCM uygulanır. 5. nesil (stealth) uçaklara karşı EIRS'in L-bant frekanslı çalışması avantaj sağlar (VHF/L-bant stealth'e karşı daha etkili). Katmanlı savunma derinliği düşmanı her irtifa ve mesafede katmanlarla karşılar.",
    costAnalysis: {
      perKill: "SİPER: ~$2–5M/füze | HİSAR-O+: ~$1–2M | HİSAR-A+: ~$500K",
      ratio: "Hedef uçak ($30–100M) vs savunma ($2–10M): 1:0.03–0.1 (çok avantajlı)",
      note: "Uçak düşürmek maliyet açısından savunma lehine, asıl zorluk ECM/SEAD",
    },
    realWorld: [
      "İsrail: Arrow/David's Sling/Iron Dome katmanlı yapısı ile İran saldırısı (Nisan 2024)",
      "Suriye: S-400 caydırıcı etkisi, düşman uçak operasyon özgürlüğünü kısıtlama",
      "Irak 1991: SEAD/DEAD ile IADS çökertme — Çelik Kubbe'nin varlık sebebi",
    ],
    criticalFactors: [
      "SEAD/HARM karşı önlemi (EMCON disiplini)",
      "5. nesil stealth hedef tespit kabiliyeti",
      "Shoot-look-shoot vs shoot-shoot-look doktrin seçimi",
      "Çoklu hedef eş zamanlı angajman kapasitesi",
      "Batarya arası koordinasyon ve hedef çakışma önleme",
    ],
  },

  /* ─────────────────── 4. BALİSTİK FÜZE ─────────────────── */
  {
    id: "tbm",
    name: "Taktik Balistik Füze",
    icon: "▲",
    priority: "KRİTİK",
    color: C.purple,
    desc: "Düşman kısa/orta menzilli balistik füzeleri ile stratejik tesislere saldırı. Yüksek hız ve irtifa nedeniyle müdahale penceresi çok kısadır. Çelik Kubbe'nin en zorlu senaryosu.",
    threatProfile: {
      type: "SRBM / MRBM (Kısa/Orta Menzil Balistik Füze)",
      count: "4–12 adet (salvo)",
      speed: "Mach 5–12 (terminal fazda)",
      altitude: "100–400 km (apogee) → terminal dalış",
      rcs: "0.1–1 m² (savaş başlığı)",
      ecm: "Aldatma başlıkları (decoy), manevralı RV (MaRV)",
      cost: "Birim $2–10 milyon",
      examples: "İskender (SS-26), Fateh-110/313, DF-15/16, Shahab-3",
    },
    layers: ["LRAD"],
    phases: [
      { name: "ERKEN İHTAR (Boost Phase)", color: C.purple, steps: [
        { time: "T-600s", event: "EIRS uzay-hava gözetleme modu, balistik fırlatma tespiti", system: "EIRS", detail: "L-bant, büyük RCS boost fazı, motor alevi termal imzası" },
        { time: "T-550s", event: "Yörünge hesaplaması, darbe noktası tahmini (CEP)", system: "HERİKKS C4I", detail: "Balistik yörünge modeli, olası hedef listesi, sivil uyarı" },
        { time: "T-500s", event: "ALP-300G ile yörünge doğrulaması ve hassaslaştırma", system: "ALP-300G", detail: "S-bant, EIRS verisini çapraz doğrulama" },
      ]},
      { name: "ORTA SEYİR (Midcourse Phase)", color: C.cyan, steps: [
        { time: "T-300s", event: "ÇAFRAD yüksek irtifa takip moduna geçiş", system: "ÇAFRAD", detail: "X-bant AESA, 300+ km irtifada hedef takibi, decoy ayrımı" },
        { time: "T-250s", event: "Savaş başlığı / aldatma başlık ayrımı (discrimination)", system: "ÇAFRAD", detail: "RCS, hareket paterni ve radar imza analizi ile gerçek RV tespiti" },
      ]},
      { name: "TERMİNAL ANGAJMAN", color: C.red, steps: [
        { time: "T-120s", event: "SİPER Blok 3 ile üst endo-atmosferik müdahale (60–80 km irtifa)", system: "SİPER Blok 3", detail: "Terminal güdüm, hit-to-kill teknolojisi, yüksek-g manevra" },
        { time: "T-60s", event: "BDA — ilk atış başarısız ise SİPER Blok 2 devreye", system: "SİPER Blok 2", detail: "Endo-atmosferik angajman, 30–50 km irtifa, çift modlu arayıcı" },
        { time: "T-25s", event: "Son fırsat: SİPER Blok 1 ile düşük irtifa terminal müdahale", system: "SİPER Blok 1", detail: "Terminal dalış fazı, çok kısa reaksiyon penceresi" },
      ]},
    ],
    primary: ["SİPER Blok 3", "SİPER Blok 2", "SİPER Blok 1", "EIRS", "ÇAFRAD"],
    secondary: ["HERİKKS C4I", "ALP-300G"],
    tactics: "Balistik füze savunması (BMD) Çelik Kubbe'nin en zorlu senaryosudur. Terminal fazda hedef Mach 5–12 hızla dalış yapar — müdahale penceresi 30–120 saniyedir. SİPER Blok 3'ün hit-to-kill teknolojisi üst endo-atmosferik müdahale hedefler (60–80 km irtifa, THAAD benzeri). NOT: SİPER exo-atmosferik (uzay) müdahale için tasarlanmamıştır — bu SM-3/Arrow-3 sınıfı sistemlerin görevidir. Shoot-look-shoot doktrini ile ardışık bloklar devreye girer. Decoy (aldatma başlığı) ayrımı kritiktir — ÇAFRAD'ın RCS analizi ve hareket paterni takibi ile gerçek savaş başlığı tespit edilir. Manevralı RV'lere (MaRV) karşı SİPER'in güdüm güncellemesi hızı belirleyicidir. Bu kapasite 2029+ itibariyle tam operasyonel olması beklenmektedir.",
    costAnalysis: {
      perKill: "SİPER ABM füzesi: ~$5–10M (tahmini)",
      ratio: "Hedef TBM ($2–10M) vs savunma ($10–20M, 2 füze/hedef): 1:1–2",
      note: "BMD maliyet açısından dengesiz, ancak korunan hedefin değeri (şehir, üs) bunu meşrulaştırır",
    },
    realWorld: [
      "İsrail Arrow-2/3: İran balistik füzelerine karşı başarılı müdahale (Nisan 2024)",
      "Suudi Arabistan Patriot: Houthi balistik füzelerine karşı kısmi başarı",
      "ABD THAAD: Üst endo/exo-atmosferik müdahale referans sistemi",
    ],
    criticalFactors: [
      "Erken ihbar süresi (yörünge hesaplama için minimum 3–4 dakika)",
      "Decoy/savaş başlığı ayrımı (discrimination) doğruluğu",
      "Hit-to-kill güdüm hassasiyeti (cm seviyesi)",
      "Shoot-look-shoot için yeterli atış fırsatı sayısı",
      "SİPER Blok 3 olgunlaşma seviyesi (2029+ hedef)",
    ],
  },

  /* ─────────────────── 5. DENİZ HAVA SAVUNMASI ─────────────────── */
  {
    id: "naval-air",
    name: "Deniz Platformu Hava Savunması",
    icon: "◎",
    priority: "YÜKSEK",
    color: C.deniz,
    desc: "Donanma gemilerine yönelik AShM cruise füze, kamikaze İHA ve uçak tehditlerine karşı gemi bazlı hava savunma. GÖKDENİZ CIWS merkezli yakın savunma.",
    threatProfile: {
      type: "Anti-Ship Cruise Füze (AShM) / Kamikaze İHA",
      count: "2–8 adet (salvo), çoklu yönden",
      speed: "Mach 0.9 (subsonic) – Mach 2.5+ (supersonic AShM)",
      altitude: "5–20 m (sea-skimming), terminal pop-up dalış",
      rcs: "0.1–1 m²",
      ecm: "Arayıcı ECCM, sea-skimming, terminal manevra",
      cost: "Birim $500K–3M",
      examples: "P-800 Oniks, Kh-35, C-802, Harpoon benzeri",
    },
    layers: ["VSHORAD (Deniz)"],
    phases: [
      { name: "TESPİT & SINIFLANDIRMA", color: C.purple, steps: [
        { time: "T-180s", event: "Gemi 3D arama radarı ile ufuk ötesi hedef tespiti", system: "Gemi Radarı", detail: "Alçak irtifa tarama modu, sea clutter filtreleme" },
        { time: "T-150s", event: "ARES-2N ESM ile pasif emisyon tespiti ve yön bulma", system: "ARES-2N ESM", detail: "Füze arayıcı radarı emisyonundan tehdit sınıflandırma" },
      ]},
      { name: "YUMUŞAK ÖLDÜRME (Soft-Kill)", color: C.cyan, steps: [
        { time: "T-120s", event: "AREAS-2N ECM ile füze arayıcısına aktif karıştırma", system: "AREAS-2N ECM", detail: "DRFM tabanlı aldatma, sahte hedef üretme" },
        { time: "T-90s", event: "NAZAR DIRCM lazeri ile EO/IR arayıcı kör etme", system: "NAZAR", detail: "Yönlendirilmiş lazer, termal arayıcılı füzelere karşı" },
        { time: "T-60s", event: "KARTACA saçma sistemi ile radar arayıcı aldatma", system: "KARTACA-N", detail: "Çoklu saçma salvo, gemiden uzakta radar yansıma alanı oluşturma" },
      ]},
      { name: "SERT ÖLDÜRME (Hard-Kill)", color: C.deniz, steps: [
        { time: "T-30s", event: "GÖKDENİZ atış kontrol radarı kilitlenme, ateş çözümü", system: "GÖKDENİZ Radar", detail: "Ku-bant, deniz clutter'da küçük hedef takibi" },
        { time: "T-15s", event: "GÖKDENİZ 35mm KDN topu ile AHEAD mühimmatı ateşi", system: "GÖKDENİZ Top", detail: "1.100 atış/dk, AHEAD programlanabilir, 4 km etkili menzil" },
        { time: "T-8s", event: "SUNGUR/Atılgan füze ile sızan hedeflere angajman", system: "SUNGUR (Deniz)", detail: "IIR arayıcı, sea-skimming hedeflere karşı" },
        { time: "T-2s", event: "KALKAN saçma ile son saniye yumuşak savunma", system: "KALKAN Saçma", detail: "Gemiye çok yakın mesafede son şans aldatma" },
      ]},
    ],
    primary: ["GÖKDENİZ", "SUNGUR (Deniz)", "ARES-2N", "AREAS-2N", "NAZAR"],
    secondary: ["KARTACA-N", "KALKAN Saçma", "Gemi Radarı"],
    tactics: "Deniz hava savunmasında self-defense (kendi savunma) konsepti geçerlidir — gemi kendi sensör ve silahlarına dayanır. Kill-chain: Tespit → Soft-Kill → Hard-Kill → Son Savunma. Doktrin önce soft-kill'dir: AREAS ECM arayıcıyı aldatır, NAZAR lazer termal arayıcıyı kör eder, KARTACA saçma radar hedefini kaydırır. Tüm soft-kill başarısız olursa GÖKDENİZ son savunma hattıdır. Sea-skimming hedeflere karşı en büyük zorluk reaksiyon süresidir — deniz seviyesinden gelen füze radar ufku nedeniyle ancak 15–25 km'de görülür. İ-Sınıfı fırkateynlerde çoklu GÖKDENİZ 360° kapsama ve daha yüksek doyurma direnci sağlar.",
    costAnalysis: {
      perKill: "GÖKDENİZ AHEAD: ~$500/salvo | SUNGUR: ~$80K | Soft-Kill: ~$5K (saçma)",
      ratio: "Hedef AShM ($500K–3M) vs savunma: çok avantajlı",
      note: "Asıl risk: reaksiyon süresi yetersizliği, çoklu AShM doyurması",
    },
    realWorld: [
      "Falkland 1982: HMS Sheffield — Exocet ile batırıldı, CIWS eksikliği",
      "Yemen/Kızıldeniz: USV/AShM tehditlerine karşı Phalanx/SeaRAM kullanımı",
      "Ukrayna: Neptün AShM ile Moskva kruvazörünün batırılması — CIWS önemi",
    ],
    criticalFactors: [
      "Sea-skimming hedef tespit mesafesi (radar ufku sınırı)",
      "Soft-kill/Hard-kill geçiş otomasyonu",
      "Çoklu eş zamanlı AShM doyurma direnci",
      "Supersonic AShM'ye karşı reaksiyon süresi (<10 saniye)",
    ],
  },

  /* ─────────────────── 6. KARIŞIK DOYURMA ─────────────────── */
  {
    id: "saturation",
    name: "Karışık Doyurma Saldırısı",
    icon: "◉",
    priority: "KRİTİK",
    color: C.green,
    desc: "Balistik füze, cruise füze, İHA sürüsü ve savaş uçağının eş zamanlı kullanıldığı en zorlu senaryo. Tüm Çelik Kubbe katmanları tam kapasiteyle aktif. Hedef: IADS'ı doyurarak çökertmek.",
    threatProfile: {
      type: "Multi-Domain Doyurma Saldırısı",
      count: "TBM: 4–8, Cruise: 10–20, Drone: 100+, Uçak: 12–24",
      speed: "Mach 0.1 (drone) → Mach 12 (TBM) — geniş hız spektrumu",
      altitude: "10 m (drone) → 400 km (TBM apogee) — tüm irtifalar",
      rcs: "0.001 m² (drone) → 5 m² (uçak) — geniş RCS spektrumu",
      ecm: "Her tehdit tipi kendi ECM'si + koordineli karıştırma",
      cost: "Toplam saldırı: $200M+ (tahmini)",
      examples: "İran'ın İsrail'e saldırısı (Nisan 2024): TBM + Cruise + Drone birleşik",
    },
    layers: ["LRAD", "MRAD", "SHORAD", "VSHORAD"],
    phases: [
      { name: "ERKEN İHTAR & PLANLAMA", color: C.purple, steps: [
        { time: "T-900s", event: "EIRS çoklu balistik fırlatma + hava hareketliliği tespiti", system: "EIRS", detail: "Fırlatma imzaları ve uçak kalkışları eş zamanlı algılanır" },
        { time: "T-800s", event: "HERİKKS otomatik tehdit önceliklendirme başlar", system: "HERİKKS C4I", detail: "Algoritma: TBM > Uçak > Cruise > Drone öncelik sıralaması" },
        { time: "T-700s", event: "Effektör ataması: her tehdit tipine en uygun sistem atanır", system: "HERİKKS C4I", detail: "TBM→SİPER, Uçak→SİPER/HİSAR-O+, Cruise→HİSAR-O+/A+, Drone→KORKUT" },
      ]},
      { name: "UZUN MENZIL (TBM + UÇAK)", color: C.purple, steps: [
        { time: "T-400s", event: "SİPER bataryaları TBM ve uçak tehditlerine eş zamanlı atanır", system: "SİPER", detail: "Yüksek değerli hedeflere SİPER, düşük değerlilere HİSAR-O+" },
        { time: "T-300s", event: "ÇAFRAD çoklu hedef takibi — TBM, uçak ve cruise ayrımı", system: "ÇAFRAD", detail: "200+ hedef eş zamanlı, hedef tip sınıflandırma" },
      ]},
      { name: "ORTA MENZIL (CRUİSE)", color: C.cyan, steps: [
        { time: "T-150s", event: "HİSAR-O+ cruise füze rotalarına yoğunlaştırılır", system: "HİSAR-O+", detail: "RF ve IIR varyantları karışık kullanım" },
        { time: "T-100s", event: "Sızan uçaklara HİSAR-O+ ve HİSAR-A+ müdahale", system: "HİSAR-A+", detail: "Orta ve kısa menzil arasında geçiş bölgesi" },
      ]},
      { name: "KISA MENZIL (DRONE SÜRÜSÜ)", color: C.amber, steps: [
        { time: "T-60s", event: "KORKUT/Oerlikon ile alçak irtifa drone sürüsü angajmanı", system: "KORKUT / Oerlikon", detail: "35mm AHEAD, maliyet etkin sürü savunması" },
        { time: "T-30s", event: "Tüm katmanlar eş zamanlı ateş — otomatik hedef dağıtımı", system: "Çelik Kubbe", detail: "HERİKKS tam otonom mod, hedef çakışma önleme aktif" },
      ]},
      { name: "SON SAVUNMA & BDA", color: C.red, steps: [
        { time: "T-10s", event: "SUNGUR ve GÖKBERK ile sızan hedeflere nokta savunma", system: "SUNGUR / GÖKBERK", detail: "Son hat savunması, kritik tesis koruması" },
        { time: "T+30s", event: "BDA (Hasar Değerlendirme) ve ikinci dalga hazırlığı", system: "HERİKKS BDA", detail: "Vuruş doğrulama, mühimmat durumu, yeniden konuşlanma" },
      ]},
    ],
    primary: ["SİPER", "HİSAR-O+", "HİSAR-A+", "KORKUT", "SUNGUR", "EIRS", "ÇAFRAD", "HERİKKS C4I"],
    secondary: ["ALP-300G", "KALKAN", "KALKAN-050G", "Oerlikon GDF", "GÖKBERK", "GÖKDENİZ", "EJDERHA"],
    tactics: "Doyurma saldırısı Çelik Kubbe'nin nihai sınavıdır. HERİKKS C4I'nin otonom hedef dağıtımı hayati önem taşır — her tehdidi en uygun ve en ucuz effektöre atar: TBM→SİPER (en pahalı, zorunlu), uçak→SİPER/HİSAR-O+ (menzile göre), cruise→HİSAR-O+/A+ (katmanlı), drone→KORKUT/AHEAD (maliyet etkin). Mühimmat yönetimi kritiktir: (1) Pahalı SİPER füzeleri yalnızca TBM ve uçaklara, (2) HİSAR-O+ cruise füzelere, (3) Ucuz AHEAD drone'lara. İran'ın İsrail saldırısı (Nisan 2024) bu senaryonun gerçek dünya örneğidir: 170+ drone, 30+ cruise, 120+ TBM — İsrail Arrow/David's Sling/Iron Dome/Patriot entegrasyonu ile %99 müdahale.",
    costAnalysis: {
      perKill: "Toplam savunma maliyeti: $100–300M (bir dalga)",
      ratio: "Saldırı: ~$200M vs Savunma: ~$200M ≈ 1:1",
      note: "Doyurma senaryosunda mühimmat stoğu biterse sistem çöker — yedek derinliği kritik",
    },
    realWorld: [
      "İran → İsrail (Nisan 2024): 170 drone + 30 cruise + 120 TBM, %99 müdahale başarısı",
      "Rusya → Ukrayna: Günlük karışık saldırılar, mühimmat tükenmesi sorunu",
      "Yemen Houthiler: Kızıldeniz'de drone + AShM + TBM karışık tehdit",
    ],
    criticalFactors: [
      "HERİKKS C4I otonom karar hızı ve doğruluğu",
      "Mühimmat stok derinliği (özellikle SİPER füze stoğu)",
      "Eş zamanlı çoklu katman koordinasyonu",
      "İkinci dalga için hızlı mühimmat ikmali",
      "Batarya hayatta kalabilirliği (shoot-and-scoot)",
      "Komuta-kontrol ağ dayanıklılığı (redundancy)",
    ],
  },
];

/* ═══════════════════ KATMAN RENKLERİ ═══════════════════ */

const layerColors = {
  "VSHORAD": C.red, "SHORAD": C.amber, "MRAD": C.cyan, "LRAD": C.purple,
  "VSHORAD (Deniz)": C.deniz,
};

/* ═══════════════════ ANA BİLEŞEN ═══════════════════ */

export default function HSSenaryoMerkezi() {
  const [selIdx, setSelIdx] = useState(0);
  const s = scenarios[selIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>

      {/* ── Senaryo Seçim Kartları ─────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
        {scenarios.map((sc, i) => {
          const isSel = selIdx === i;
          return (
            <button key={sc.id} onClick={() => setSelIdx(i)} style={{
              padding: "10px 12px", borderRadius: 4, cursor: "pointer", textAlign: "left",
              background: isSel ? `${sc.color}12` : C.panel,
              border: `1px solid ${isSel ? sc.color : C.border}`,
              fontFamily: "monospace", transition: "all 0.2s",
              borderLeft: `4px solid ${isSel ? sc.color : C.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: sc.color }}>{sc.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 900, color: isSel ? sc.color : C.text, letterSpacing: 0.5 }}>{sc.name}</span>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {sc.layers.map((l, j) => (
                  <span key={j} style={{
                    fontSize: 7, padding: "1px 5px", borderRadius: 2, fontWeight: 700,
                    background: `${layerColors[l] || C.textDim}20`,
                    color: layerColors[l] || C.textDim,
                    border: `1px solid ${layerColors[l] || C.textDim}40`,
                  }}>{l}</span>
                ))}
                <span style={{
                  fontSize: 7, padding: "1px 5px", borderRadius: 2, fontWeight: 700, marginLeft: "auto",
                  background: sc.priority === "KRİTİK" ? `${C.red}20` : `${C.amber}20`,
                  color: sc.priority === "KRİTİK" ? C.red : C.amber,
                }}>{sc.priority}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Tehdit Profili ─────────────────────────────────── */}
      <Panel title="Tehdit Profili" sub={s.threatProfile.type} glow={s.color}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {Object.entries(s.threatProfile).filter(([k]) => k !== "type").map(([key, val]) => {
            const labels = { count: "Adet/Miktar", speed: "Hız", altitude: "İrtifa", rcs: "Radar Kesiti (RCS)", ecm: "ECM Kabiliyeti", cost: "Birim Maliyet", examples: "Gerçek Örnekler" };
            return (
              <div key={key} style={{
                padding: "8px 10px", background: `${s.color}06`, border: `1px solid ${s.color}15`,
                borderRadius: 3, borderLeft: `3px solid ${s.color}40`,
              }}>
                <div style={{ fontSize: 7, color: s.color, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
                  {labels[key] || key}
                </div>
                <div style={{ fontSize: 9, color: C.text, fontFamily: "monospace", lineHeight: 1.4 }}>{val}</div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ── Senaryo Detay ─────────────────────────────────── */}
      <Panel title={`${s.icon}  ${s.name} — Angajman Akışı`} sub={s.desc} glow={s.color}>
        <div style={{ animation: "slideIn 0.3s ease-out" }}>

          {/* Fazlı Angajman Zaman Çizelgesi */}
          {s.phases.map((phase, pi) => (
            <div key={pi} style={{ marginBottom: pi < s.phases.length - 1 ? 14 : 0 }}>
              {/* Faz Başlığı */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
                padding: "6px 12px", background: `${phase.color}10`, borderRadius: 3,
                border: `1px solid ${phase.color}25`,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, boxShadow: glow(phase.color, 6) }} />
                <span style={{ fontSize: 10, fontWeight: 900, color: phase.color, letterSpacing: 1.5 }}>{phase.name}</span>
                <span style={{ fontSize: 8, color: C.textDim, marginLeft: "auto" }}>{phase.steps.length} adım</span>
              </div>

              {/* Adımlar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingLeft: 4 }}>
                {phase.steps.map((step, si) => (
                  <div key={si} style={{ display: "flex", gap: 10 }}>
                    {/* Zaman */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 55 }}>
                      <div style={{
                        fontSize: 9, fontWeight: 900, color: phase.color, fontFamily: "monospace",
                        background: `${phase.color}12`, padding: "2px 6px", borderRadius: 2,
                        border: `1px solid ${phase.color}25`, whiteSpace: "nowrap",
                      }}>{step.time}</div>
                      {si < phase.steps.length - 1 && (
                        <div style={{ width: 2, flex: 1, minHeight: 12, background: `${phase.color}30` }} />
                      )}
                    </div>
                    {/* İçerik */}
                    <div style={{ flex: 1, paddingBottom: si < phase.steps.length - 1 ? 6 : 0 }}>
                      <div style={{
                        padding: "7px 10px", borderRadius: 3,
                        background: `${phase.color}05`, border: `1px solid ${phase.color}12`,
                        borderLeft: `3px solid ${phase.color}50`,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                          <div style={{ fontSize: 9, color: C.text, lineHeight: 1.4, flex: 1 }}>{step.event}</div>
                          <span style={{
                            fontSize: 7, fontWeight: 800, color: phase.color, fontFamily: "monospace",
                            background: `${phase.color}15`, padding: "2px 6px", borderRadius: 2,
                            whiteSpace: "nowrap", border: `1px solid ${phase.color}25`, flexShrink: 0,
                          }}>{step.system}</span>
                        </div>
                        <div style={{ fontSize: 8, color: C.textDim, marginTop: 3, lineHeight: 1.4, fontStyle: "italic" }}>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Sistem Listeleri + Maliyet ─────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Panel title="Sistem Ataması" glow={s.color}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 8, fontWeight: 900, color: s.color, letterSpacing: 1.5, marginBottom: 5, textTransform: "uppercase" }}>Birincil Sistemler</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {s.primary.map((p, j) => (
                <span key={j} style={{
                  fontSize: 9, padding: "3px 8px", borderRadius: 3, fontWeight: 700,
                  background: `${s.color}12`, border: `1px solid ${s.color}30`,
                  color: C.white, fontFamily: "monospace",
                }}>{p}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 8, fontWeight: 900, color: C.textDim, letterSpacing: 1.5, marginBottom: 5, textTransform: "uppercase" }}>İkincil / Destek</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {s.secondary.map((p, j) => (
                <span key={j} style={{
                  fontSize: 9, padding: "3px 8px", borderRadius: 3, fontWeight: 600,
                  background: `${C.textDim}10`, border: `1px solid ${C.border}`,
                  color: C.textDim, fontFamily: "monospace",
                }}>{p}</span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Maliyet Analizi" glow={C.amber}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <div style={{ fontSize: 8, color: C.amber, fontWeight: 800, letterSpacing: 1, marginBottom: 3 }}>ANGAJMAN BAŞINA MALİYET</div>
              <div style={{ fontSize: 9, color: C.text, fontFamily: "monospace", lineHeight: 1.5 }}>{s.costAnalysis.perKill}</div>
            </div>
            <div>
              <div style={{ fontSize: 8, color: C.cyan, fontWeight: 800, letterSpacing: 1, marginBottom: 3 }}>SALDIRI / SAVUNMA ORANI</div>
              <div style={{ fontSize: 9, color: C.text, fontFamily: "monospace", lineHeight: 1.5 }}>{s.costAnalysis.ratio}</div>
            </div>
            <div style={{ padding: "6px 8px", background: `${C.amber}08`, borderRadius: 3, border: `1px solid ${C.amber}15` }}>
              <div style={{ fontSize: 8, color: C.amber, fontFamily: "monospace", lineHeight: 1.5 }}>{s.costAnalysis.note}</div>
            </div>
          </div>
        </Panel>
      </div>

      {/* ── Taktik Değerlendirme ──────────────────────────── */}
      <Panel title="Taktik Değerlendirme" glow={C.amber}>
        <div style={{ fontSize: 9, color: C.text, lineHeight: 1.8, fontFamily: "monospace", marginBottom: 12 }}>
          {s.tactics}
        </div>

        {/* Kritik Başarı Faktörleri */}
        <div style={{
          padding: "10px 12px", background: `${C.red}06`, borderRadius: 3,
          border: `1px solid ${C.red}15`, marginBottom: 12,
        }}>
          <div style={{ fontSize: 8, fontWeight: 900, color: C.red, letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>Kritik Başarı Faktörleri</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {s.criticalFactors.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <span style={{ color: C.red, fontSize: 8, marginTop: 1 }}>▸</span>
                <span style={{ fontSize: 9, color: C.text, fontFamily: "monospace", lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gerçek Dünya Referansları */}
        <div style={{
          padding: "10px 12px", background: `${C.cyan}06`, borderRadius: 3,
          border: `1px solid ${C.cyan}15`,
        }}>
          <div style={{ fontSize: 8, fontWeight: 900, color: C.cyan, letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>Gerçek Dünya Referansları</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {s.realWorld.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <span style={{ color: C.cyan, fontSize: 8, marginTop: 1 }}>◆</span>
                <span style={{ fontSize: 9, color: C.text, fontFamily: "monospace", lineHeight: 1.4 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* ── Senaryo × Sistem Matrisi ──────────────────────── */}
      <Panel title="Senaryo × Sistem Kullanım Matrisi" sub="Her senaryoda hangi sistemler birincil (●) veya ikincil (○) rol alır" glow={C.cyan}>
        <SystemScenarioMatrix scenarios={scenarios} />
      </Panel>
    </div>
  );
}

/* ═══════════════════ MATRİS BİLEŞENİ ═══════════════════ */

const allSystems = [
  "SİPER", "HİSAR-O+", "HİSAR-A+", "KORKUT", "SUNGUR", "GÖKDENİZ",
  "Oerlikon GDF", "GÖKBERK", "EIRS", "ALP-300G", "ÇAFRAD", "KALKAN",
  "KALKAN-050G", "HERİKKS C4I", "İHTAR ACAR", "EJDERHA", "KANGAL-FPV",
  "ARES-2N", "AREAS-2N", "NAZAR", "KARTACA-N",
];

function SystemScenarioMatrix({ scenarios }) {
  const check = (sc, sys) => {
    const inPrimary = sc.primary.some(p => p.includes(sys) || sys.includes(p.split(" ")[0]));
    const inSecondary = sc.secondary.some(p => p.includes(sys) || sys.includes(p.split(" ")[0]));
    const inPhases = sc.phases.some(ph => ph.steps.some(st => st.system.includes(sys) || sys.includes(st.system.split(" ")[0])));
    if (inPrimary || inPhases) return "primary";
    if (inSecondary) return "secondary";
    return null;
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace", fontSize: 8 }}>
        <thead>
          <tr>
            <th style={{
              textAlign: "left", padding: "6px 8px", borderBottom: `1px solid ${C.border}`,
              color: C.textDim, fontSize: 8, letterSpacing: 1, position: "sticky", left: 0,
              background: C.panel, zIndex: 1, minWidth: 100,
            }}>SİSTEM</th>
            {scenarios.map((sc, i) => (
              <th key={i} style={{
                textAlign: "center", padding: "6px 4px", borderBottom: `1px solid ${C.border}`,
                color: sc.color, fontSize: 7, fontWeight: 900, minWidth: 55, lineHeight: 1.3,
              }}>
                <div>{sc.icon}</div>
                <div style={{ marginTop: 2 }}>{sc.name.split(" ").slice(0, 2).join(" ")}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSystems.map((sys, si) => (
            <tr key={si} style={{ background: si % 2 === 0 ? "transparent" : `${C.border}15` }}>
              <td style={{
                padding: "5px 8px", borderBottom: `1px solid ${C.border}20`,
                color: C.text, fontWeight: 700, fontSize: 9, position: "sticky", left: 0,
                background: si % 2 === 0 ? C.panel : C.panelHi, zIndex: 1,
              }}>{sys}</td>
              {scenarios.map((sc, sci) => {
                const role = check(sc, sys);
                return (
                  <td key={sci} style={{
                    textAlign: "center", padding: "5px 4px",
                    borderBottom: `1px solid ${C.border}20`,
                  }}>
                    {role === "primary" ? (
                      <span style={{ color: sc.color, fontSize: 14, fontWeight: 900, textShadow: glow(sc.color, 4) }}>●</span>
                    ) : role === "secondary" ? (
                      <span style={{ color: `${sc.color}80`, fontSize: 14 }}>○</span>
                    ) : (
                      <span style={{ color: C.textMute, fontSize: 10 }}>—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
