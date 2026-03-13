import { useState } from "react";
import { C, glow, forceColor } from "../../theme";
import { Panel, Badge, SeverityBar } from "../../components";

/* ── Data ─────────────────────────────────────────────────────── */

const layers = [
  {
    id: "vshorad", name: "VSHORAD", label: "ÇOK KISA MENZIL",
    range: "0–8 km", alt: "0–5 km", color: C.red,
    arcPct: 18, arcStart: 0,
    systems: [
      { name: "SUNGUR", type: "MANPADS / Araç Üstü", range: "8 km", alt: "4 km", note: "IIR arayıcı, 4'lü lanç" },
      { name: "KORKUT", type: "SPAAG (35 mm İkiz Top)", range: "4 km", alt: "3 km", note: "35 mm ikiz top, AHEAD mühimmat, 1.100 atış/dk" },
      { name: "GÖKDENİZ", type: "Deniz CIWS", range: "4 km", alt: "3 km", note: "35 mm deniz topu + SUNGUR/Atılgan füze entegrasyonu" },
      { name: "Oerlikon GDF", type: "Çekili SPAAG", range: "4 km", alt: "3 km", note: "GDF-003/005, 35 mm ikiz, mevcut envanter" },
      { name: "GÖKBERK", type: "Güdümlü Mini Füze", range: "5 km", alt: "3 km", note: "Mikro İHA'lara karşı" },
    ],
    threats: [true, true, false, false, false],
  },
  {
    id: "shorad", name: "SHORAD", label: "KISA MENZIL",
    range: "4–15 km", alt: "4–8 km", color: C.amber,
    arcPct: 35, arcStart: 18,
    systems: [
      { name: "KORKUT", type: "SPAAG / Füze", range: "4 km (top) / 8 km (füze)", alt: "5 km", note: "35 mm ikiz, HİSAR-A+ entegre" },
      { name: "HİSAR-A+", type: "Kısa Menzil SAM", range: "15 km", alt: "6 km", note: "ASELSAN ÇAFRAD radarı ile" },
      { name: "GÜRZ", type: "Lazer Güdümlü", range: "8 km", alt: "5 km", note: "Hafif platform, hızlı konuş" },
    ],
    threats: [true, true, true, false, false],
  },
  {
    id: "mrad", name: "MRAD", label: "ORTA MENZIL",
    range: "25–40+ km", alt: "10–15 km", color: C.cyan,
    arcPct: 60, arcStart: 35,
    systems: [
      { name: "HİSAR-O+ IIR", type: "Orta Menzil SAM", range: "25 km", alt: "10 km", note: "Kızılötesi arayıcı varyant" },
      { name: "HİSAR-O+ RF", type: "Orta Menzil SAM", range: "40+ km", alt: "15 km", note: "Aktif radar arayıcı varyant" },
    ],
    threats: [false, true, true, true, false],
  },
  {
    id: "lrad", name: "LRAD", label: "UZUN MENZIL",
    range: "100–180+ km", alt: "20–30+ km", color: C.purple,
    arcPct: 100, arcStart: 60,
    systems: [
      { name: "SİPER Blok 1", type: "Uzun Menzil SAM", range: "100 km", alt: "20 km", note: "İlk teslimat 2025" },
      { name: "SİPER Blok 2", type: "Uzun Menzil SAM", range: "150 km", alt: "25 km", note: "Gelişmiş güdüm, 2027" },
      { name: "SİPER Blok 3", type: "Uzun Menzil SAM", range: "180+ km", alt: "30+ km", note: "ABM kabiliyeti, 2029+" },
    ],
    threats: [false, false, true, true, true],
  },
];

const threats = ["FPV Drone", "Taktik İHA", "Cruise Füze", "Savaş Uçağı", "Balistik Füze"];

const sensors = [
  { name: "EIRS", range: "470+ km", color: C.purple },
  { name: "ÇAFRAD", range: "400+ km", color: C.cyan },
  { name: "KALKAN", range: "120 km", color: C.amber },
];

const commandFlow = [
  { from: "HERİKKS C4I", to: "HAKİM", color: C.cyan },
  { from: "HAKİM", to: "Müşterek Hava Resmi", color: C.green },
  { from: "Müşterek Hava Resmi", to: "Ateş Kontrol", color: C.amber },
];

const effectorChain = ["SUNGUR", "HİSAR-A+", "HİSAR-O+", "SİPER"];

const stats = [
  { value: "47 Parça", sub: "Ağustos 2025 ilk teslimat", color: C.amber },
  { value: "$6.5B", sub: "Toplam sözleşme değeri", color: C.cyan },
  { value: "4 Katman", sub: "VSHORAD'dan LRAD'a entegre savunma", color: C.green },
  { value: "2030", sub: "Tam operasyonel kapasite hedefi", color: C.purple },
];

/* ── Sistem Mimarisi Verisi ─────────────────────────────────── */

const batteryArchitectures = [
  {
    id: "siper",
    name: "SİPER",
    fullName: "Uzun Menzil Bölge Hava Savunma Sistemi",
    layer: "LRAD",
    color: C.purple,
    producers: ["ROKETSAN", "ASELSAN", "TÜBİTAK SAGE"],
    range: "100–180+ km",
    description: "Türkiye'nin S-400 muadili yerli uzun menzil hava ve füze savunma sistemi. Blok 1 ilk teslimat 2025, Blok 3 ile ABM kabiliyeti hedefleniyor.",
    components: [
      { cat: "RADAR", items: [
        { name: "ÇAFRAD", role: "Çok Fonksiyonlu AESA Radar", producer: "ASELSAN", detail: "X-bant, arama + takip + aydınlatma, dijital hüzme", qty: "1 adet / batarya" },
        { name: "EIRS Bağlantısı", role: "Erken İhbar Veri Linki", producer: "ASELSAN", detail: "Ulusal erken ihbar ağından hedef kümeleme", qty: "veri linki" },
      ]},
      { cat: "FÜZE", items: [
        { name: "SİPER Blok 1", role: "Aktif Radar Arayıcılı", producer: "ROKETSAN", detail: "100 km menzil, tek modlu RF arayıcı", qty: "4–6 / TEL" },
        { name: "SİPER Blok 2", role: "Çift Modlu Arayıcılı", producer: "ROKETSAN", detail: "150 km menzil, RF + IIR, gelişmiş ECCM", qty: "4–6 / TEL" },
        { name: "SİPER Blok 3", role: "ABM Kabiliyetli", producer: "ROKETSAN / TÜBİTAK SAGE", detail: "180+ km, balistik füze savunma, hit-to-kill", qty: "4–6 / TEL" },
      ]},
      { cat: "FIRLATICI", items: [
        { name: "TEL 8×8", role: "Fırlatma Aracı (Transporter Erector Launcher)", producer: "ROKETSAN", detail: "8×8 tekerlekli, otonom yükleme, dikey fırlatma", qty: "4–6 adet / batarya" },
        { name: "Mühimmat İkmal Aracı", role: "Saha İkmali", producer: "ROKETSAN", detail: "Vinçli füze yükleme, TEL ile eşleşik", qty: "2 adet / batarya" },
      ]},
      { cat: "KOMUTA", items: [
        { name: "Batarya Komuta Aracı", role: "C2 / Ateş Kontrol", producer: "ASELSAN", detail: "Taktik veri linki, hedef atama, angajman planlama", qty: "1 adet / batarya" },
        { name: "HERİKKS Entegrasyonu", role: "C4I Ağ Bağlantısı", producer: "ASELSAN / HAVELSAN", detail: "Müşterek hava resmi, üst kademe koordinasyon", qty: "yazılım" },
      ]},
      { cat: "DESTEK", items: [
        { name: "Güç Üreteci Aracı", role: "Mobil Enerji", producer: "—", detail: "Radar ve komuta sistemi beslemesi", qty: "2 adet / batarya" },
        { name: "Bakım Aracı", role: "Saha Bakım", producer: "—", detail: "Yedek parça, test ekipmanı", qty: "1 adet / batarya" },
      ]},
    ],
  },
  {
    id: "hisar-o",
    name: "HİSAR-O+",
    fullName: "Orta Menzil Hava Savunma Sistemi",
    layer: "MRAD",
    color: C.cyan,
    producers: ["ROKETSAN", "ASELSAN"],
    range: "25–40+ km",
    description: "Orta irtifa hava tehditlerine karşı geliştirilmiş yerli sistem. IIR ve RF arayıcılı iki füze varyantı mevcut.",
    components: [
      { cat: "RADAR", items: [
        { name: "KALKAN", role: "Arama Radarı", producer: "ASELSAN", detail: "120 km menzil, 3D arama, çoklu hedef takibi", qty: "1 adet / batarya" },
        { name: "Atış Kontrol Radarı", role: "Güdüm & Aydınlatma", producer: "ASELSAN", detail: "Hedef aydınlatma, yarı-aktif güdüm desteği", qty: "1 adet / batarya" },
      ]},
      { cat: "FÜZE", items: [
        { name: "HİSAR-O+ IIR", role: "Kızılötesi Arayıcılı", producer: "ROKETSAN", detail: "25 km menzil, ateşle-unut, IIR imaj arayıcı", qty: "6 / TEL" },
        { name: "HİSAR-O+ RF", role: "Aktif Radar Arayıcılı", producer: "ROKETSAN", detail: "40+ km menzil, aktif RF arayıcı, ECCM", qty: "6 / TEL" },
      ]},
      { cat: "FIRLATICI", items: [
        { name: "TEL 8×8", role: "Fırlatma Aracı", producer: "ROKETSAN", detail: "8×8 tekerlekli, 6'lı kanister, dikey fırlatma", qty: "3–4 adet / batarya" },
        { name: "Mühimmat İkmal Aracı", role: "Saha İkmali", producer: "ROKETSAN", detail: "Vinçli füze yükleme sistemi", qty: "1–2 adet / batarya" },
      ]},
      { cat: "KOMUTA", items: [
        { name: "Atış Komuta Aracı", role: "C2 / Ateş Kontrol", producer: "ASELSAN", detail: "Hedef atama, angajman yönetimi, veri linki", qty: "1 adet / batarya" },
      ]},
    ],
  },
  {
    id: "hisar-a-korkut",
    name: "HİSAR-A+ / KORKUT",
    fullName: "Kısa Menzil Hava Savunma Sistemi",
    layer: "SHORAD",
    color: C.amber,
    producers: ["ROKETSAN", "ASELSAN", "FNSS"],
    range: "4–15 km",
    description: "Alçak irtifa tehditlere karşı top ve füze entegrasyonu. KORKUT 35 mm ikiz topu ve HİSAR-A+ füzesi aynı batarya içinde çalışır.",
    components: [
      { cat: "RADAR", items: [
        { name: "KALKAN-050G", role: "Arama & Atış Kontrol Radarı", producer: "ASELSAN", detail: "25 km menzil, 3D arama, çoklu hedef takibi", qty: "1 adet / batarya" },
        { name: "Elektro-Optik Sensör", role: "Pasif Takip & Tanıma", producer: "ASELSAN", detail: "Termal kamera, TV, lazer mesafe ölçer", qty: "her araçta" },
      ]},
      { cat: "FÜZE", items: [
        { name: "HİSAR-A+", role: "Kısa Menzil SAM", producer: "ROKETSAN", detail: "15 km menzil, IIR arayıcı, ateşle-unut", qty: "2–4 / araç" },
      ]},
      { cat: "SİLAH SİSTEMİ", items: [
        { name: "KORKUT 35 mm İkiz Top", role: "SPAAG (Kendi Yürür Uçaksavar)", producer: "ASELSAN / FNSS", detail: "35 mm Oerlikon-derivasyon, 1.100 atış/dk, AHEAD mühimmatı", qty: "4–6 araç / batarya" },
        { name: "KORKUT Komuta Aracı", role: "Arama & Ateş Yönetim", producer: "ASELSAN / FNSS", detail: "KALKAN-050G radarı entegre, hedef dağıtma", qty: "1 adet / batarya" },
      ]},
      { cat: "PLATFORM", items: [
        { name: "FNSS ACV-30", role: "Paletli Platform (KORKUT)", producer: "FNSS", detail: "ACV-30 bazlı, zırhlı, yüksek manevra kabiliyeti", qty: "5–7 araç / batarya" },
        { name: "6×6 TEL", role: "Fırlatma Aracı (HİSAR-A+)", producer: "ROKETSAN", detail: "6×6 tekerlekli, 4'lü kanister", qty: "2–3 adet / batarya" },
      ]},
    ],
  },
  {
    id: "sungur",
    name: "SUNGUR",
    fullName: "Çok Kısa Menzil Hava Savunma Sistemi",
    layer: "VSHORAD",
    color: C.red,
    producers: ["ROKETSAN"],
    range: "0–8 km",
    description: "Hem araç üstü hem MANPADS olarak kullanılabilen çok kısa menzilli hava savunma sistemi. Düşük irtifa İHA ve helikopter tehditlerine karşı etkili.",
    components: [
      { cat: "FÜZE", items: [
        { name: "SUNGUR", role: "IIR Arayıcılı Füze", producer: "ROKETSAN", detail: "8 km menzil, 4 km irtifa, soğutmalı IIR imaj arayıcı", qty: "4 / lanç" },
      ]},
      { cat: "FIRLATICI", items: [
        { name: "4'lü Araç Üstü Lanç", role: "Mobil Fırlatma Platformu", producer: "ROKETSAN", detail: "4×4 / Kirpi MRAP üstü, 4'lü fırlatma bloğu", qty: "4–6 / manga" },
        { name: "MANPADS Lansçeri", role: "Omuz Atışlı Fırlatıcı", producer: "ROKETSAN", detail: "Tek kişi taşınabilir, BCU ile hızlı ateşleme", qty: "piyade mangası" },
      ]},
      { cat: "PLATFORM", items: [
        { name: "Kirpi MRAP", role: "Araç Üstü Platform", producer: "BMC", detail: "4×4 MRAP, 4'lü SUNGUR lansçeri entegre", qty: "opsiyonel" },
        { name: "4×4 Taktik Araç", role: "Hafif Platform", producer: "Çeşitli", detail: "Toyota, Otokar, vb. hafif taktik araç üstü", qty: "opsiyonel" },
      ]},
    ],
  },
  {
    id: "gokdeniz",
    name: "GÖKDENİZ",
    fullName: "Deniz Yakın Savunma Silah Sistemi (CIWS)",
    layer: "VSHORAD (Deniz)",
    color: C.deniz,
    producers: ["ASELSAN"],
    range: "0–4 km",
    description: "TCG Heybeliada sınıfı korvetlerden başlayarak donanma gemilerine entegre edilen yakın hava savunma sistemi. 35 mm KDN topu ile SUNGUR/Atılgan füze entegrasyonu sağlar.",
    components: [
      { cat: "RADAR", items: [
        { name: "GÖKDENİZ Atış Kontrol Radarı", role: "Takip & Ateş Kontrol", producer: "ASELSAN", detail: "Ku-bant, çoklu hedef takibi, deniz clutter süzme", qty: "1 / sistem" },
        { name: "Elektro-Optik Direği", role: "Pasif Takip & Tanıma", producer: "ASELSAN", detail: "Termal kamera, TV, lazer mesafe ölçer, otonom takip", qty: "1 / sistem" },
      ]},
      { cat: "SİLAH SİSTEMİ", items: [
        { name: "35 mm KDN Topu", role: "Yakın Hava Savunma Topu", producer: "MKEK / ASELSAN", detail: "35 mm, 1.100 atış/dk, AHEAD hava patlamalı mühimmat", qty: "1 / sistem" },
      ]},
      { cat: "FÜZE", items: [
        { name: "SUNGUR Entegrasyonu", role: "Kısa Menzil SAM", producer: "ROKETSAN", detail: "IIR arayıcılı, top menzili dışı hedefler için", qty: "4–8 / sistem" },
        { name: "Atılgan Entegrasyonu", role: "Kısa Menzil SAM (Stinger)", producer: "ROKETSAN", detail: "Stinger füze, mevcut envanter uyumu", qty: "opsiyonel" },
      ]},
      { cat: "PLATFORM", items: [
        { name: "MİLGEM Korveti", role: "Ada Sınıfı Korvet", producer: "STM / İstanbul Tersanesi", detail: "TCG Heybeliada, Büyükada, Burgazada, Kınalıada sınıfı", qty: "entegre" },
        { name: "İ Sınıfı Fırkateyn", role: "İstif Sınıfı", producer: "STM / İstanbul Tersanesi", detail: "TCG İstanbul sınıfı yeni nesil fırkateyn", qty: "entegre" },
        { name: "TF-2000", role: "Hava Savunma Muhribi", producer: "STM", detail: "Gelecek nesil muhribi, çoklu GÖKDENİZ sistemi", qty: "planlanan" },
      ]},
    ],
  },
  {
    id: "oerlikon",
    name: "Oerlikon GDF",
    fullName: "Çekili Alçak İrtifa Hava Savunma Sistemi",
    layer: "VSHORAD (Mevcut)",
    color: C.red,
    producers: ["Oerlikon (orijinal)", "MKEK (mühimmat)"],
    range: "0–4 km",
    description: "TSK envanterinde 1980'lerden beri bulunan 35 mm ikiz uçaksavar top sistemi. GDF-003 ve GDF-005 varyantları mevcut. KORKUT ile modernize edilmekte.",
    components: [
      { cat: "SİLAH SİSTEMİ", items: [
        { name: "GDF-003", role: "35 mm İkiz Uçaksavar Top", producer: "Oerlikon Contraves", detail: "Çekili, 2×35 mm, 550 atış/dk (namlu başı), optik nişangah", qty: "çok sayıda" },
        { name: "GDF-005", role: "35 mm İkiz Uçaksavar (Modernize)", producer: "Oerlikon / Rheinmetall", detail: "Geliştirilmiş atış kontrol, AHEAD mühimmat uyumu", qty: "modernize edilen" },
      ]},
      { cat: "RADAR", items: [
        { name: "Skyguard", role: "Atış Kontrol Radarı", producer: "Oerlikon Contraves", detail: "Arama + takip radarı, her bataryada 1 adet", qty: "1 / batarya" },
        { name: "MKEK AHEAD", role: "Hava Patlamalı Mühimmat", producer: "MKEK", detail: "35×228 mm, programlanabilir zaman tüpü, alçak irtifa etkili", qty: "mühimmat" },
      ]},
      { cat: "PLATFORM", items: [
        { name: "Çekili Platform", role: "Towed (Araç Çekili)", producer: "—", detail: "Kamyon veya taktik araç ile çekilir, sabit mevzide kullanılır", qty: "batarya bazlı" },
        { name: "Statik Mevzi", role: "Sabit Mevzi Koruma", producer: "—", detail: "Havalimanı, üs, tesis koruma mevzileri", qty: "tesis bazlı" },
      ]},
    ],
  },
];

const catIcons = {
  "RADAR": "◎", "FÜZE": "▲", "FIRLATICI": "◆", "KOMUTA": "◉",
  "DESTEK": "◇", "PLATFORM": "■", "SİLAH SİSTEMİ": "✦",
};
const catColors = {
  "RADAR": C.purple, "FÜZE": C.red, "FIRLATICI": C.amber, "KOMUTA": C.cyan,
  "DESTEK": C.textDim, "PLATFORM": C.green, "SİLAH SİSTEMİ": C.amber,
};

/* ── Batarya Mimarisi Bileşeni ─────────────────────────────── */

const BatteryArchCard = ({ arch }) => {
  const [openCat, setOpenCat] = useState(null);

  return (
    <Panel title={`${arch.name} — ${arch.fullName}`} sub={`${arch.layer} · ${arch.range} · ${arch.producers.join(" / ")}`} glow={arch.color}>
      <div style={{ fontSize: 9, color: C.textDim, fontFamily: "monospace", marginBottom: 10, lineHeight: 1.5 }}>
        {arch.description}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {arch.components.map((comp, ci) => {
          const isOpen = openCat === ci;
          const cc = catColors[comp.cat] || C.textDim;
          const icon = catIcons[comp.cat] || "·";

          return (
            <div key={ci} style={{ border: `1px solid ${isOpen ? cc : C.border}40`, borderRadius: 3, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setOpenCat(isOpen ? null : ci)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, width: "100%",
                  padding: "8px 12px", border: "none", cursor: "pointer",
                  background: isOpen ? `${cc}10` : `${C.bg}80`,
                  fontFamily: "monospace", textAlign: "left", transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 10, color: cc }}>{icon}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: isOpen ? cc : C.text, letterSpacing: 1, flex: 1 }}>
                  {comp.cat}
                </span>
                <Badge color={cc}>{comp.items.length}</Badge>
                <span style={{
                  fontSize: 8, color: cc, fontWeight: 900,
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s", display: "inline-block",
                }}>&#9656;</span>
              </button>

              <div style={{
                maxHeight: isOpen ? 600 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}>
                <div style={{ padding: "4px 8px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {comp.items.map((item, ii) => (
                    <div key={ii} style={{
                      background: `${cc}06`, border: `1px solid ${cc}15`, borderRadius: 3,
                      padding: "8px 10px", borderLeft: `3px solid ${cc}60`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: cc, fontFamily: "monospace" }}>{item.name}</span>
                        <span style={{ fontSize: 7, color: C.textDim, fontFamily: "monospace", background: `${C.border}40`, padding: "1px 6px", borderRadius: 2 }}>{item.qty}</span>
                      </div>
                      <div style={{ fontSize: 8, color: C.text, fontFamily: "monospace", fontWeight: 700, marginBottom: 2 }}>{item.role}</div>
                      <div style={{ fontSize: 8, color: C.textDim, fontFamily: "monospace", lineHeight: 1.4 }}>{item.detail}</div>
                      {item.producer && item.producer !== "—" && (
                        <div style={{ fontSize: 7, color: `${cc}90`, fontFamily: "monospace", marginTop: 3, letterSpacing: 0.5 }}>
                          Üretici: {item.producer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

/* ── Altitude / Range Diagram (pure SVG) ─────────────────────── */

const AltRangeDiagram = () => {
  const W = 700, H = 370;
  const originX = 80, originY = H - 50;
  const maxRange = 200, maxAlt = 35;
  const scaleX = (W - originX - 30) / maxRange;
  const scaleY = (originY - 30) / maxAlt;

  const toX = r => originX + r * scaleX;
  const toY = a => originY - a * scaleY;

  const layerDefs = [
    { color: C.red, rMin: 0, rMax: 8, aMin: 0, aMax: 5, label: "VSHORAD" },
    { color: C.amber, rMin: 4, rMax: 15, aMin: 4, aMax: 8, label: "SHORAD" },
    { color: C.cyan, rMin: 25, rMax: 45, aMin: 10, aMax: 15, label: "MRAD" },
    { color: C.purple, rMin: 100, rMax: 185, aMin: 20, aMax: 32, label: "LRAD" },
  ];

  const gridRanges = [0, 25, 50, 75, 100, 125, 150, 175, 200];
  const gridAlts = [0, 5, 10, 15, 20, 25, 30, 35];

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <defs>
        {layerDefs.map((l, i) => (
          <radialGradient key={i} id={`rg${i}`} cx="0%" cy="100%" r="100%">
            <stop offset="0%" stopColor={l.color} stopOpacity={0.35} />
            <stop offset="80%" stopColor={l.color} stopOpacity={0.08} />
            <stop offset="100%" stopColor={l.color} stopOpacity={0.02} />
          </radialGradient>
        ))}
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {gridRanges.map(r => (
        <line key={`gr${r}`} x1={toX(r)} y1={originY} x2={toX(r)} y2={toY(maxAlt)} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,4" />
      ))}
      {gridAlts.map(a => (
        <line key={`ga${a}`} x1={originX} y1={toY(a)} x2={toX(maxRange)} y2={toY(a)} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,4" />
      ))}

      {/* Axes */}
      <line x1={originX} y1={originY} x2={toX(maxRange)} y2={originY} stroke={C.borderHi} strokeWidth={1.5} />
      <line x1={originX} y1={originY} x2={originX} y2={toY(maxAlt)} stroke={C.borderHi} strokeWidth={1.5} />

      {/* Axis labels */}
      <text x={toX(maxRange / 2)} y={H - 8} textAnchor="middle" fill={C.textDim} fontSize={9} fontFamily="monospace" fontWeight={700}>
        MENZİL (km)
      </text>
      <text x={14} y={toY(maxAlt / 2)} textAnchor="middle" fill={C.textDim} fontSize={9} fontFamily="monospace" fontWeight={700} transform={`rotate(-90,14,${toY(maxAlt / 2)})`}>
        İRTİFA (km)
      </text>

      {/* Range ticks */}
      {gridRanges.map(r => (
        <text key={`tr${r}`} x={toX(r)} y={originY + 14} textAnchor="middle" fill={C.textDim} fontSize={7} fontFamily="monospace">{r}</text>
      ))}
      {/* Altitude ticks */}
      {gridAlts.map(a => (
        <text key={`ta${a}`} x={originX - 8} y={toY(a) + 3} textAnchor="end" fill={C.textDim} fontSize={7} fontFamily="monospace">{a}</text>
      ))}

      {/* Layer arcs (drawn as filled elliptical sections from origin) */}
      {[...layerDefs].reverse().map((l, i) => {
        const x1 = toX(l.rMin);
        const x2 = toX(l.rMax);
        const y1 = toY(l.aMin);
        const y2 = toY(l.aMax);
        const cx = toX(0);
        const cy = originY;

        // Draw a quarter-ellipse arc from range axis up to altitude
        const rx = x2 - cx;
        const ry = cy - toY(l.aMax);
        const rxInner = Math.max(x1 - cx, 0);
        const ryInner = Math.max(cy - toY(l.aMin), 0);

        // Outer arc path (quarter ellipse)
        const outerPath = `M ${cx + rx},${cy} A ${rx},${ry} 0 0,0 ${cx},${cy - ry} L ${cx},${cy - ryInner} A ${rxInner},${ryInner} 0 0,1 ${cx + rxInner},${cy} Z`;

        return (
          <g key={i}>
            <path d={outerPath} fill={`${l.color}18`} stroke={l.color} strokeWidth={1.5} strokeOpacity={0.6} filter="url(#arcGlow)" />
            {/* Label on the arc */}
            <text
              x={cx + (rx + rxInner) / 2}
              y={cy - (ry + ryInner) / 2}
              textAnchor="middle"
              fill={l.color}
              fontSize={10}
              fontWeight={900}
              fontFamily="monospace"
              style={{ textShadow: `0 0 8px ${l.color}` }}
            >
              {l.label}
            </text>
            {/* Range annotation */}
            <text
              x={cx + (rx + rxInner) / 2}
              y={cy - (ry + ryInner) / 2 + 13}
              textAnchor="middle"
              fill={`${l.color}aa`}
              fontSize={7}
              fontFamily="monospace"
            >
              {l.rMin}–{l.rMax} km
            </text>
          </g>
        );
      })}

      {/* Origin marker */}
      <circle cx={originX} cy={originY} r={4} fill={C.green} stroke={C.bg} strokeWidth={2}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x={originX} y={originY + 24} textAnchor="middle" fill={C.green} fontSize={7} fontFamily="monospace" fontWeight={700}>
        SAVUNMA MERKEZİ
      </text>

      {/* Crosshair decorations */}
      <circle cx={originX} cy={originY} r={20} fill="none" stroke={`${C.green}30`} strokeWidth={0.5} strokeDasharray="4,3" />
      <circle cx={originX} cy={originY} r={40} fill="none" stroke={`${C.green}20`} strokeWidth={0.5} strokeDasharray="4,3" />
    </svg>
  );
};

/* ── System Cards ─────────────────────────────────────────────── */

const SystemCard = ({ system, color }) => (
  <div style={{
    background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 3,
    padding: "8px 10px", borderLeft: `3px solid ${color}`,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 900, color, fontFamily: "monospace" }}>{system.name}</span>
      <Badge color={color}>{system.type}</Badge>
    </div>
    <div style={{ display: "flex", gap: 14, fontSize: 8, color: C.textDim, fontFamily: "monospace" }}>
      <span>Menzil: <span style={{ color: C.text, fontWeight: 700 }}>{system.range}</span></span>
      <span>İrtifa: <span style={{ color: C.text, fontWeight: 700 }}>{system.alt}</span></span>
    </div>
    <div style={{ fontSize: 7, color: C.textDim, marginTop: 3, fontFamily: "monospace", fontStyle: "italic" }}>{system.note}</div>
  </div>
);

/* ── Integration Architecture ─────────────────────────────────── */

const FlowArrow = ({ from, to, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
    <div style={{
      padding: "5px 10px", background: `${color}15`, border: `1px solid ${color}40`,
      borderRadius: 3, fontSize: 9, fontWeight: 800, color, fontFamily: "monospace",
      whiteSpace: "nowrap",
    }}>
      {from}
    </div>
    <div style={{ display: "flex", alignItems: "center", margin: "0 -1px" }}>
      <div style={{ width: 20, height: 2, background: `linear-gradient(90deg, ${color}60, ${color})` }} />
      <div style={{
        width: 0, height: 0,
        borderTop: "4px solid transparent", borderBottom: "4px solid transparent",
        borderLeft: `6px solid ${color}`,
      }} />
    </div>
    <div style={{
      padding: "5px 10px", background: `${color}15`, border: `1px solid ${color}40`,
      borderRadius: 3, fontSize: 9, fontWeight: 800, color, fontFamily: "monospace",
      whiteSpace: "nowrap",
    }}>
      {to}
    </div>
  </div>
);

/* ── Main Component ───────────────────────────────────────────── */

export default function HSKatmanliSavunma() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>

      {/* ── Steel Dome Statistics ─────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        {stats.map((s, i) => (
          <Panel key={i} glow={s.color}>
            <div style={{ textAlign: "center", padding: "8px 4px" }}>
              <div style={{
                fontFamily: "monospace", fontSize: 22, fontWeight: 900, color: s.color,
                lineHeight: 1, textShadow: glow(s.color),
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 8, color: C.textDim, marginTop: 4, fontFamily: "monospace", letterSpacing: 0.5 }}>
                {s.sub}
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* ── Altitude / Range Diagram ─────────────────────────── */}
      <Panel
        title="Çelik Kubbe — İrtifa / Menzil Diyagramı"
        sub="Katmanlı hava savunma mimarisinin taktik gösterimi"
        glow={C.amber}
      >
        <AltRangeDiagram />
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8 }}>
          {layers.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8, fontFamily: "monospace" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color, boxShadow: glow(l.color, 6) }} />
              <span style={{ color: C.text, fontWeight: 700 }}>{l.name}</span>
              <span style={{ color: C.textDim }}>{l.range}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Sistem Mimarisi (Batarya Yapıları) ─────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {batteryArchitectures.map(arch => (
          <BatteryArchCard key={arch.id} arch={arch} />
        ))}
      </div>

      {/* ── System Cards per Layer ────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {layers.map((layer, i) => (
          <Panel
            key={i}
            title={`${layer.label} — ${layer.name}`}
            sub={`Menzil: ${layer.range} · İrtifa: ${layer.alt}`}
            glow={layer.color}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {layer.systems.map((sys, j) => (
                <SystemCard key={j} system={sys} color={layer.color} />
              ))}
              <div style={{ marginTop: 2 }}>
                <div style={{ fontSize: 8, color: C.textDim, marginBottom: 3, fontFamily: "monospace" }}>KATMAN KAPSAMA</div>
                <SeverityBar value={layer.arcPct} color={layer.color} />
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* ── Integration Architecture ─────────────────────────── */}
      <Panel
        title="HERİKKS C4I — Entegrasyon Mimarisi"
        sub="Sensörden effektöre kadar komuta-kontrol veri akışı"
        glow={C.cyan}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {/* Sensors */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 900, color: C.purple, letterSpacing: 1.5, marginBottom: 8, fontFamily: "monospace", textTransform: "uppercase" }}>
              Sensörler
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sensors.map((s, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "7px 10px", background: `${s.color}08`, border: `1px solid ${s.color}20`,
                  borderRadius: 3, borderLeft: `3px solid ${s.color}`,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: s.color, fontFamily: "monospace" }}>{s.name}</span>
                  <span style={{ fontSize: 9, color: C.textDim, fontFamily: "monospace" }}>{s.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Command Flow */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 900, color: C.cyan, letterSpacing: 1.5, marginBottom: 8, fontFamily: "monospace", textTransform: "uppercase" }}>
              Komuta Zinciri
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              {commandFlow.map((f, i) => (
                <FlowArrow key={i} from={f.from} to={f.to} color={f.color} />
              ))}
            </div>
          </div>

          {/* Effector Chain */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 900, color: C.amber, letterSpacing: 1.5, marginBottom: 8, fontFamily: "monospace", textTransform: "uppercase" }}>
              Effektör Zinciri
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {effectorChain.map((e, i) => {
                const lyr = layers[i];
                return (
                  <div key={i}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "7px 10px", background: `${lyr.color}08`, border: `1px solid ${lyr.color}20`,
                      borderRadius: 3, borderLeft: `3px solid ${lyr.color}`,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 900, color: lyr.color, fontFamily: "monospace" }}>{e}</span>
                      <span style={{ fontSize: 8, color: C.textDim, fontFamily: "monospace" }}>{lyr.range}</span>
                    </div>
                    {i < effectorChain.length - 1 && (
                      <div style={{ display: "flex", justifyContent: "center", padding: "2px 0" }}>
                        <div style={{ width: 2, height: 10, background: `linear-gradient(180deg, ${lyr.color}60, ${layers[i + 1].color}60)` }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Integration footer */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{
            fontSize: 8, color: C.cyan, fontWeight: 700, fontFamily: "monospace",
            background: `${C.cyan}12`, padding: "3px 12px", borderRadius: 3, border: `1px solid ${C.cyan}25`,
          }}>
            HERİKKS → HAKİM → Müşterek Hava Resmi → Otonom Ateş Kontrol
          </span>
        </div>
      </Panel>

      {/* ── Threat Coverage Matrix ───────────────────────────── */}
      <Panel
        title="Tehdit Kapsama Matrisi"
        sub="Her katmanın etkili olduğu tehdit sınıfları"
        glow={C.red}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace", fontSize: 10 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: `1px solid ${C.border}`, color: C.textDim, fontSize: 8, letterSpacing: 1 }}>
                  TEHDİT SINIFI
                </th>
                {layers.map((l, i) => (
                  <th key={i} style={{
                    textAlign: "center", padding: "6px 10px", borderBottom: `1px solid ${C.border}`,
                    color: l.color, fontSize: 9, fontWeight: 900,
                  }}>
                    {l.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {threats.map((threat, ti) => (
                <tr key={ti} style={{ background: ti % 2 === 0 ? "transparent" : `${C.border}20` }}>
                  <td style={{ padding: "7px 10px", borderBottom: `1px solid ${C.border}30`, color: C.text, fontWeight: 700, fontSize: 10 }}>
                    {threat}
                  </td>
                  {layers.map((l, li) => (
                    <td key={li} style={{
                      textAlign: "center", padding: "7px 10px",
                      borderBottom: `1px solid ${C.border}30`,
                    }}>
                      {l.threats[ti] ? (
                        <span style={{ color: C.green, fontSize: 14, fontWeight: 900, textShadow: glow(C.green, 6) }}>&#10003;</span>
                      ) : (
                        <span style={{ color: C.red, fontSize: 14, fontWeight: 900, opacity: 0.6 }}>&#10007;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Matrix legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8, fontFamily: "monospace" }}>
            <span style={{ color: C.green, fontSize: 12, fontWeight: 900 }}>&#10003;</span>
            <span style={{ color: C.textDim }}>Etkili kapsama</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8, fontFamily: "monospace" }}>
            <span style={{ color: C.red, fontSize: 12, fontWeight: 900, opacity: 0.6 }}>&#10007;</span>
            <span style={{ color: C.textDim }}>Kapsama dışı</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
