import { useState } from "react";
import { C, FONT, MONO, glow } from "../theme";
import { Panel, Badge, SeverityBar } from "../components";

/* ── Data ─────────────────────────────────────────────────────── */

const layers = [
  {
    id: "yakin", name: "YAKIN TAKTİK", label: "YAKIN TAKTİK",
    range: "0–30 km", spectrum: "Çok bant", color: C.red,
    arcPct: 25, arcStart: 0,
    systems: [
      { name: "KANGAL", type: "K-EYP / Karıştırıcı", range: "0–5 km", alt: "Çok bant", note: "EYP koruma, FPV karıştırma, reaktif jammer" },
      { name: "KANGAL-FPV", type: "FPV Odaklı RF Karıştırma", range: "0–3 km", alt: "900 MHz–5.8 GHz", note: "<25 kg, frekans atlama takibi" },
      { name: "GERGEDAN", type: "Haberleşme Karıştırıcı", range: "0–20 km", alt: "V/UHF", note: "Telsiz, GSM, uydu telefonu karıştırma" },
      { name: "İHTAR", type: "K-İHA Tespit & Karıştırma", range: "0–10 km", alt: "ACAR radar + RF", note: "Tespit, takip, RF karıştırma, HPEM entegrasyonu" },
      { name: "EJDERHA", type: "HPEM (Yüksek Güçlü Mikrodalga)", range: "0–1 km", alt: "Geniş bant", note: "EMP etkisi, fiber optik dronlara karşı etkili" },
      { name: "GÖKBERK", type: "Lazer Silah", range: "0–1.5 km", alt: "IR/EO", note: "5 kW lazer, düşük maliyet/atış" },
      { name: "MERT", type: "Radar Karıştırıcı", range: "0–25 km", alt: "1–18 GHz", note: "DRFM tabanlı, Meteksan" },
    ],
    threats: [true, true, true, false, false],
  },
  {
    id: "operatif", name: "OPERATİF", label: "OPERATİF",
    range: "30–100 km", spectrum: "V/UHF + Radar", color: C.amber,
    arcPct: 50, arcStart: 25,
    systems: [
      { name: "VURAL (REDET-II)", type: "Radar ES (Tespit)", range: "0.4–40 GHz", alt: "Geniş bant", note: "360° kapsama, anlık tespit, DF" },
      { name: "ILGAR", type: "Haberleşme EA (Karıştırma)", range: "30–100 km", alt: "V/UHF", note: "3-LT/NG/340, reaktif karıştırma" },
      { name: "PUHU", type: "COMINT (Dinleme)", range: "30–80 km", alt: "V/UHF", note: "Sinyal tespit, dil analizi, konum tespiti" },
      { name: "AREAS-2N", type: "Deniz ECM (Karıştırma)", range: "Ufuk mesafesi", alt: "0.5–18 GHz", note: "AESA, 32 eş zamanlı tehdit, DRFM" },
      { name: "HIZIR 100-N", type: "Torpido Karşı Tedbir", range: "Sualtı", alt: "Akustik", note: "Çekili dizi, aldatma, ZOKA efektörleri" },
      { name: "NAZAR", type: "Lazer EH (Kör Etme)", range: "0–5 km", alt: "IR/EO", note: "EO/IR güdümlü füzeleri kör etme" },
    ],
    threats: [true, true, true, true, false],
  },
  {
    id: "stratejik", name: "STRATEJİK", label: "STRATEJİK",
    range: "100–200 km", spectrum: "0.5–18 GHz", color: C.cyan,
    arcPct: 75, arcStart: 50,
    systems: [
      { name: "KORAL", type: "Kara SOJ (Stand-Off Jammer)", range: "150–200 km", alt: "0.5–18 GHz", note: "DRFM, 50W/kanal, 5 araçlık sistem" },
      { name: "KORAL 200", type: "Yeni Nesil SOJ", range: "200+ km", alt: "Genişletilmiş", note: "2× güç, gelişmiş DRFM, AESA" },
      { name: "ARES-2N", type: "Deniz ESM (Tespit)", range: "Ufuk ötesi", alt: "2–18 GHz", note: "Geniş bant radar tespit ve sınıflandırma" },
      { name: "EHKKKS", type: "EH Komuta Kontrol", range: "Tüm katmanlar", alt: "—", note: "Tüm EH varlıklarını karargâh seviyesinde koordine eder" },
    ],
    threats: [false, true, true, true, true],
  },
  {
    id: "uzak", name: "UZAK / HAVA", label: "UZAK / HAVA",
    range: "200+ km", spectrum: "Geniş bant", color: C.purple,
    arcPct: 100, arcStart: 75,
    systems: [
      { name: "HAVASOJ", type: "Hava SOJ Uçağı", range: "300+ km", alt: "Geniş bant AESA", note: "CN-235 platformu, cephe boyunca EH koridoru" },
      { name: "ASOJ-234U", type: "İHA Stand-Off Jammer", range: "200+ km", alt: "HF/UHF/Radar", note: "AKINCI üzerinde, 17-18 saat görev süresi" },
      { name: "E-7T", type: "AEW&C ESM/ELINT", range: "600+ km", alt: "0.5–18 GHz", note: "ARES-2A ESM, pasif radar tespiti" },
      { name: "TCG Ufuk", type: "Deniz SIGINT Gemisi", range: "Ufuk ötesi", alt: "EM/Akustik/EO", note: "7/24 deniz SIGINT, 60 gün dayanıklılık" },
    ],
    threats: [false, false, true, true, true],
  },
];

const threats = ["Drone / FPV", "Haberleşme", "SAM Radarları", "Savaş Uçağı", "Deniz Tehdidi"];

const sensors = [
  { name: "VURAL", range: "0.4–40 GHz", color: C.purple },
  { name: "ARES-2N", range: "2–18 GHz", color: C.cyan },
  { name: "E-7T ESM", range: "0.5–18 GHz", color: C.amber },
];

const commandFlow = [
  { from: "EHKKKS C2", to: "Görev Planlama", color: C.cyan },
  { from: "Görev Planlama", to: "Sinyal Analiz", color: C.green },
  { from: "Sinyal Analiz", to: "Hedef Atama", color: C.amber },
];

const effectorChain = ["KANGAL/İHTAR", "ILGAR/GERGEDAN", "KORAL/KORAL 200", "HAVASOJ/ASOJ"];

const stats = [
  { value: "83+", sub: "Yerli EH sistemi", color: C.cyan },
  { value: "4 Katman", sub: "Yakın Taktik → Uzak/Hava", color: C.amber },
  { value: "0.4–40 GHz", sub: "Frekans kapsama aralığı", color: C.green },
  { value: "2028", sub: "KAAN EH süiti hedefi", color: C.purple },
];

/* ── Battery Architecture Data ─────────────────────────────── */

const batteryArchitectures = [
  {
    id: "koral",
    name: "KORAL",
    fullName: "Kara Konuşlu Radar Elektronik Taarruz Sistemi",
    layer: "STRATEJİK",
    color: C.cyan,
    producers: ["ASELSAN"],
    range: "150–200+ km",
    description: "Türkiye'nin amiral gemisi stand-off jammer sistemi. DRFM mimarisiyle düşman radarlarını karıştırma ve aldatma. Bahar Kalkanı'nda Pantsir-S1 sistemlerini etkisiz hale getirdi.",
    components: [
      { cat: "RADAR ES", items: [
        { name: "Radar ES Aracı (×4)", role: "Radar Emisyon Tespiti", producer: "ASELSAN", detail: "0.5–18 GHz, anlık tespit, DF, sınıflandırma", qty: "4 adet / sistem" },
      ]},
      { cat: "RADAR EA", items: [
        { name: "Radar EA Aracı (×1)", role: "Radar Karıştırma/Aldatma", producer: "ASELSAN", detail: "DRFM, 50W/kanal, baraj + nokta + aldatma", qty: "1 adet / sistem" },
      ]},
      { cat: "KOMUTA", items: [
        { name: "Operasyon Kontrol Birimi", role: "C2 / Koordinasyon", producer: "ASELSAN", detail: "2 operatör + 1 amir, görev planlama", qty: "1 adet / sistem" },
        { name: "EHKKKS Entegrasyonu", role: "Üst Kademe Koordinasyon", producer: "ASELSAN", detail: "Karargâh seviyesinde EH yönetimi", qty: "yazılım" },
      ]},
      { cat: "PLATFORM", items: [
        { name: "8×8 Taktik Araç", role: "Taşıyıcı Platform", producer: "—", detail: "NBC koruma, -30°C/+50°C, MIL-STD", qty: "5 araç / sistem" },
      ]},
    ],
  },
  {
    id: "kangal-ihtar",
    name: "KANGAL / İHTAR",
    fullName: "Karşı-İHA Elektronik Harp Kümesi",
    layer: "YAKIN TAKTİK",
    color: C.red,
    producers: ["ASELSAN"],
    range: "0–10 km",
    description: "FPV dronlar, kamikaze İHA'lar ve sürü tehditlerine karşı çok katmanlı yumuşak imha sistemi. RF karıştırma, GNSS aldatma ve HPEM teknolojilerini birleştirir.",
    components: [
      { cat: "TESPİT", items: [
        { name: "İHTAR ACAR Radarı", role: "Küçük RCS Hedef Tespiti", producer: "ASELSAN", detail: "Drone boyutlu hedef tespiti, otomatik takip", qty: "1 / küme" },
        { name: "EO/IR Sensör", role: "Pasif Takip & Tanıma", producer: "ASELSAN", detail: "Termal kamera, TV, lazer mesafe ölçer", qty: "1 / küme" },
      ]},
      { cat: "RF KARIŞTIRMA", items: [
        { name: "KANGAL-FPV", role: "FPV Odaklı RF Jammer", producer: "ASELSAN", detail: "<25 kg, frekans atlama takibi, reaktif", qty: "2–4 / küme" },
        { name: "KANGAL Barrage", role: "Geniş Bant Karıştırıcı", producer: "ASELSAN", detail: "Baraj karıştırma, sürü dronlara karşı", qty: "1–2 / küme" },
      ]},
      { cat: "GNSS ALDATMA", items: [
        { name: "BUKALEMUN", role: "GNSS Spoofing", producer: "ASELSAN", detail: "GPS/GLONASS aldatma, drone yönlendirme", qty: "1 / küme" },
      ]},
      { cat: "HPEM / LAZER", items: [
        { name: "EJDERHA", role: "Yüksek Güçlü Mikrodalga", producer: "ASELSAN", detail: "1 km etki mesafesi, fiber optik dronlara karşı", qty: "1 / küme" },
        { name: "GÖKBERK", role: "Lazer Silah", producer: "ASELSAN", detail: "5 kW lazer, düşük maliyet/atış", qty: "1 / küme" },
      ]},
    ],
  },
  {
    id: "ilgar-puhu",
    name: "ILGAR / PUHU",
    fullName: "Haberleşme Elektronik Destek & Taarruz Sistemi",
    layer: "OPERATİF",
    color: C.amber,
    producers: ["ASELSAN"],
    range: "30–100 km",
    description: "Düşman haberleşme ağlarını dinleme, analiz etme ve karıştırma. PUHU dinler, ILGAR karıştırır — koordineli ED/ET çifti olarak çalışır.",
    components: [
      { cat: "ELEKTRONİK DESTEK", items: [
        { name: "PUHU 3-LT", role: "V/UHF COMINT", producer: "ASELSAN", detail: "Mobil dinleme, yön bulma, dil analizi", qty: "2–3 / tim" },
        { name: "PUHU 4-LCT", role: "Yarı Sabit COMINT", producer: "ASELSAN", detail: "Sabit mevzi, geniş kapsama alanı", qty: "1 / üs" },
        { name: "KARAKULAK", role: "HF COMINT", producer: "ASELSAN", detail: "HF bant dinleme, uzun mesafe sinyal tespiti", qty: "1–2 / tim" },
      ]},
      { cat: "ELEKTRONİK TAARRUZ", items: [
        { name: "ILGAR 3-LT", role: "Mobil V/UHF Karıştırıcı", producer: "ASELSAN", detail: "V/UHF karıştırma, reaktif mod, araç üstü", qty: "2–3 / tim" },
        { name: "ILGAR NG", role: "Yeni Nesil Karıştırıcı", producer: "ASELSAN", detail: "Gelişmiş DRFM, çoklu hedef", qty: "1–2 / tim" },
        { name: "MİLKAR-3A3", role: "V/UHF EA", producer: "ASELSAN", detail: "30-3000 MHz, FHSS/DSSS karıştırma", qty: "1 / tim" },
      ]},
      { cat: "KOMUTA", items: [
        { name: "EHKKKS", role: "EH Komuta Kontrol", producer: "ASELSAN", detail: "ED ve ET görevlerini koordine eder", qty: "yazılım" },
      ]},
    ],
  },
  {
    id: "hava-eh",
    name: "HAVA EH SÜİTİ",
    fullName: "Hava Platformları Elektronik Harp Sistemleri",
    layer: "UZAK / HAVA",
    color: C.purple,
    producers: ["ASELSAN", "EHSİM", "TÜBİTAK BİLGEM"],
    range: "200+ km",
    description: "F-16, KAAN, Akıncı ve Kızılelma platformlarının EH öz-koruma ve taarruz yetenekleri. HAVASOJ ile cephe boyunca EH koridoru açma kabiliyeti.",
    components: [
      { cat: "ÖZ-KORUMA", items: [
        { name: "SPEWS-II / FEWS", role: "F-16 EH Süiti", producer: "ASELSAN / BAE", detail: "RWR + ECM + CMDS entegre", qty: "filo geneli" },
        { name: "HEHSİS / HEWS", role: "Helikopter EH Süiti", producer: "ASELSAN", detail: "RWR + MWS + LWR + RF Jammer + CMDS", qty: "350+ platform" },
        { name: "ANTIDOT Ailesi", role: "İHA EH Podları", producer: "ASELSAN", detail: "2-U/S, Mini, 3-U, LB/MB/HB, 200", qty: "çoklu varyant" },
      ]},
      { cat: "STAND-OFF JAMMER", items: [
        { name: "HAVASOJ", role: "Hava SOJ Uçağı", producer: "ASELSAN / TUSAŞ", detail: "CN-235 platformu, AESA, geniş bant", qty: "2+ uçak" },
        { name: "ASOJ-234U", role: "İHA SOJ", producer: "ASELSAN", detail: "AKINCI üzerinde, REDET + HEDET", qty: "2 AKINCI" },
      ]},
      { cat: "DIRCM / CMDS", items: [
        { name: "YILDIRIM-100", role: "DIRCM (Helikopter)", producer: "ASELSAN", detail: "Çift taret, çok bantlı lazer", qty: "envantere giriyor" },
        { name: "YILDIRIM-300", role: "DIRCM (KAAN)", producer: "ASELSAN", detail: "5. nesil savaş uçağı için", qty: "geliştirmede" },
        { name: "ÖZIŞIK / CMDS", role: "Chaff/Flare Atıcı", producer: "ASELSAN", detail: "2400 program, NATO uyumlu", qty: "350+ platform" },
        { name: "SİS / JINN", role: "RF Aldatıcı / Stand-in Jammer", producer: "EHSİM", detail: "KAAN için aldatıcı + kompakt DRFM jammer", qty: "seri üretim" },
      ]},
    ],
  },
  {
    id: "deniz-eh",
    name: "DENİZ EH SÜİTİ",
    fullName: "Deniz Platformları Elektronik Harp Sistemleri",
    layer: "OPERATİF / STRATEJİK",
    color: C.deniz,
    producers: ["ASELSAN", "Meteksan", "SEFİNE"],
    range: "Ufuk mesafesi",
    description: "İstif sınıfı fırkateyn ve diğer donanma gemilerinin entegre EH süiti. ARES tespit, AREAS karıştırma, KARTACA/KALKAN aldatma, HIZIR torpido koruma sağlar.",
    components: [
      { cat: "ESM (TESPİT)", items: [
        { name: "ARES-2N(V)2", role: "Radar ESM", producer: "ASELSAN", detail: "Geniş bant, anlık tespit, sınıflandırma", qty: "1 / gemi" },
      ]},
      { cat: "ECM (KARIŞTIRMA)", items: [
        { name: "AREAS-2N", role: "Radar ECM", producer: "ASELSAN", detail: "AESA, DRFM, 32 eş zamanlı tehdit", qty: "1 / gemi" },
        { name: "NAZAR", role: "Lazer Kör Etme", producer: "Meteksan", detail: "EO/IR güdümlü füzeleri kör etme", qty: "1-2 / gemi" },
      ]},
      { cat: "ALDATICI", items: [
        { name: "KARTACA-N", role: "130mm NATO Chaff/IR", producer: "ASELSAN", detail: "Saçma fırlatıcı, radar ve IR aldatma", qty: "2 / gemi" },
        { name: "KALKAN", role: "Saçma/IR Fırlatıcı", producer: "ASELSAN", detail: "Kompakt saçma ve IR aldatıcı", qty: "2 / gemi" },
      ]},
      { cat: "TORPİDO KT", items: [
        { name: "HIZIR 100-N", role: "Suüstü Torpido KT", producer: "ASELSAN", detail: "Çekili dizi sonar + ZOKA aldatıcıları", qty: "1 / gemi" },
        { name: "ZARGANA", role: "Denizaltı Torpido KT", producer: "ASELSAN", detail: "Sinyal ejektörü + ZOKA efektörleri", qty: "1 / denizaltı" },
      ]},
      { cat: "İNSANSIZ", items: [
        { name: "MARLIN EW 100", role: "EH Yetenekli İDA", producer: "ASELSAN / SEFİNE", detail: "ARES-2NC + AREAS-2NC, 72+ saat otonom", qty: "filosu büyüyor" },
      ]},
    ],
  },
];

const catIcons = {
  "RADAR ES": "◎", "RADAR EA": "◆", "KOMUTA": "◉", "PLATFORM": "■",
  "TESPİT": "◎", "RF KARIŞTIRMA": "◆", "GNSS ALDATMA": "◇", "HPEM / LAZER": "✦",
  "ELEKTRONİK DESTEK": "◎", "ELEKTRONİK TAARRUZ": "◆",
  "ÖZ-KORUMA": "■", "STAND-OFF JAMMER": "◆", "DIRCM / CMDS": "✦",
  "ESM (TESPİT)": "◎", "ECM (KARIŞTIRMA)": "◆", "ALDATICI": "◇", "TORPİDO KT": "▲", "İNSANSIZ": "■",
};
const catColors = {
  "RADAR ES": C.purple, "RADAR EA": C.red, "KOMUTA": C.cyan, "PLATFORM": C.green,
  "TESPİT": C.purple, "RF KARIŞTIRMA": C.red, "GNSS ALDATMA": C.amber, "HPEM / LAZER": C.red,
  "ELEKTRONİK DESTEK": C.purple, "ELEKTRONİK TAARRUZ": C.red,
  "ÖZ-KORUMA": C.amber, "STAND-OFF JAMMER": C.red, "DIRCM / CMDS": C.green,
  "ESM (TESPİT)": C.purple, "ECM (KARIŞTIRMA)": C.red, "ALDATICI": C.amber, "TORPİDO KT": C.cyan, "İNSANSIZ": C.deniz,
};

/* ── Battery Architecture Card ─────────────────────────────── */

const BatteryArchCard = ({ arch }) => {
  const [openCat, setOpenCat] = useState(null);

  return (
    <Panel title={`${arch.name} — ${arch.fullName}`} sub={`${arch.layer} · ${arch.range} · ${arch.producers.join(" / ")}`} glow={arch.color}>
      <div style={{ fontSize: 13, color: C.textDim, fontFamily: FONT, marginBottom: 12, lineHeight: 1.6 }}>
        {arch.description}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {arch.components.map((comp, ci) => {
          const isOpen = openCat === ci;
          const cc = catColors[comp.cat] || C.textDim;
          const icon = catIcons[comp.cat] || "·";

          return (
            <div key={ci} style={{ border: `1px solid ${isOpen ? cc : C.border}40`, borderRadius: 6, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setOpenCat(isOpen ? null : ci)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  padding: "10px 14px", border: "none", cursor: "pointer",
                  background: isOpen ? `${cc}10` : `${C.bg}80`,
                  fontFamily: FONT, textAlign: "left", transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 13, color: cc }}>{icon}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: isOpen ? cc : C.text, letterSpacing: 1.2, flex: 1, fontFamily: FONT }}>
                  {comp.cat}
                </span>
                <Badge color={cc}>{comp.items.length}</Badge>
                <span style={{
                  fontSize: 10, color: cc, fontWeight: 900,
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s", display: "inline-block",
                }}>&#9656;</span>
              </button>

              <div style={{
                maxHeight: isOpen ? 600 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
              }}>
                <div style={{ padding: "6px 10px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {comp.items.map((item, ii) => (
                    <div key={ii} style={{
                      background: `${cc}08`, border: `1px solid ${cc}18`, borderRadius: 6,
                      padding: "10px 14px", borderLeft: `3px solid ${cc}60`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: cc, fontFamily: FONT }}>{item.name}</span>
                        <span style={{ fontSize: 10, color: C.textDim, fontFamily: MONO, background: `${C.border}40`, padding: "2px 8px", borderRadius: 4 }}>{item.qty}</span>
                      </div>
                      <div style={{ fontSize: 12, color: C.text, fontFamily: FONT, fontWeight: 700, marginBottom: 3 }}>{item.role}</div>
                      <div style={{ fontSize: 11, color: C.textDim, fontFamily: FONT, lineHeight: 1.5 }}>{item.detail}</div>
                      {item.producer && item.producer !== "—" && (
                        <div style={{ fontSize: 10, color: `${cc}90`, fontFamily: FONT, marginTop: 4, letterSpacing: 0.5 }}>
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

/* ── Range / Spectrum Diagram (pure SVG) ─────────────────────── */

const RangeSpectrumDiagram = () => {
  const W = 700, H = 370;
  const originX = 80, originY = H - 50;
  const maxRange = 350, maxFreq = 40;
  const scaleX = (W - originX - 30) / maxRange;
  const scaleY = (originY - 30) / maxFreq;

  const toX = r => originX + r * scaleX;
  const toY = f => originY - f * scaleY;

  const layerDefs = [
    { color: C.red, rMin: 0, rMax: 30, fMin: 0, fMax: 6, label: "YAKIN TAKTİK" },
    { color: C.amber, rMin: 30, rMax: 100, fMin: 0, fMax: 18, label: "OPERATİF" },
    { color: C.cyan, rMin: 100, rMax: 200, fMin: 0, fMax: 18, label: "STRATEJİK" },
    { color: C.purple, rMin: 200, rMax: 350, fMin: 0, fMax: 40, label: "UZAK / HAVA" },
  ];

  const gridRanges = [0, 50, 100, 150, 200, 250, 300, 350];
  const gridFreqs = [0, 5, 10, 15, 20, 25, 30, 35, 40];

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <defs>
        <filter id="ehGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {gridRanges.map(r => (
        <line key={`gr${r}`} x1={toX(r)} y1={originY} x2={toX(r)} y2={toY(maxFreq)} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,4" />
      ))}
      {gridFreqs.map(f => (
        <line key={`gf${f}`} x1={originX} y1={toY(f)} x2={toX(maxRange)} y2={toY(f)} stroke={C.border} strokeWidth={0.5} strokeDasharray="3,4" />
      ))}

      <line x1={originX} y1={originY} x2={toX(maxRange)} y2={originY} stroke={C.borderHi} strokeWidth={1.5} />
      <line x1={originX} y1={originY} x2={originX} y2={toY(maxFreq)} stroke={C.borderHi} strokeWidth={1.5} />

      <text x={toX(maxRange / 2)} y={H - 8} textAnchor="middle" fill={C.textDim} fontSize={11} fontFamily="Inter, sans-serif" fontWeight={700}>
        MENZİL (km)
      </text>
      <text x={14} y={toY(maxFreq / 2)} textAnchor="middle" fill={C.textDim} fontSize={11} fontFamily="Inter, sans-serif" fontWeight={700} transform={`rotate(-90,14,${toY(maxFreq / 2)})`}>
        FREKANS (GHz)
      </text>

      {gridRanges.map(r => (
        <text key={`tr${r}`} x={toX(r)} y={originY + 14} textAnchor="middle" fill={C.textDim} fontSize={9} fontFamily="Inter, sans-serif">{r}</text>
      ))}
      {gridFreqs.map(f => (
        <text key={`tf${f}`} x={originX - 8} y={toY(f) + 3} textAnchor="end" fill={C.textDim} fontSize={9} fontFamily="Inter, sans-serif">{f}</text>
      ))}

      {[...layerDefs].reverse().map((l, i) => {
        const x1 = toX(l.rMin);
        const x2 = toX(l.rMax);
        const y1 = toY(l.fMin);
        const y2 = toY(l.fMax);

        return (
          <g key={i}>
            <rect x={x1} y={y2} width={x2-x1} height={y1-y2} fill={`${l.color}15`} stroke={l.color} strokeWidth={1.5} strokeOpacity={0.5} rx={4} filter="url(#ehGlow)" />
            <text x={(x1+x2)/2} y={(y1+y2)/2} textAnchor="middle" fill={l.color} fontSize={12} fontWeight={800} fontFamily="Inter, sans-serif" style={{ textShadow: `0 0 8px ${l.color}` }}>
              {l.label}
            </text>
            <text x={(x1+x2)/2} y={(y1+y2)/2+15} textAnchor="middle" fill={`${l.color}aa`} fontSize={9} fontFamily="Inter, sans-serif">
              {l.rMin}–{l.rMax} km
            </text>
          </g>
        );
      })}

      <circle cx={originX} cy={originY} r={4} fill={C.green} stroke={C.bg} strokeWidth={2}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x={originX} y={originY + 24} textAnchor="middle" fill={C.green} fontSize={9} fontFamily="Inter, sans-serif" fontWeight={700}>
        EH MERKEZİ
      </text>
    </svg>
  );
};

/* ── System Cards ─────────────────────────────────────────────── */

const SystemCard = ({ system, color }) => (
  <div style={{
    background: `${color}08`, border: `1px solid ${color}22`, borderRadius: 6,
    padding: "10px 14px", borderLeft: `3px solid ${color}`,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: FONT }}>{system.name}</span>
      <Badge color={color}>{system.type}</Badge>
    </div>
    <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.textDim, fontFamily: FONT }}>
      <span>Menzil: <span style={{ color: C.text, fontWeight: 700 }}>{system.range}</span></span>
      <span>Frekans: <span style={{ color: C.text, fontWeight: 700 }}>{system.alt}</span></span>
    </div>
    <div style={{ fontSize: 11, color: C.textDim, marginTop: 4, fontFamily: FONT, fontStyle: "italic" }}>{system.note}</div>
  </div>
);

/* ── Flow Arrow ───────────────────────────────────────────────── */

const FlowArrow = ({ from, to, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
    <div style={{ padding: "6px 12px", background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 4, fontSize: 11, fontWeight: 700, color, fontFamily: FONT, whiteSpace: "nowrap" }}>
      {from}
    </div>
    <div style={{ display: "flex", alignItems: "center", margin: "0 -1px" }}>
      <div style={{ width: 20, height: 2, background: `linear-gradient(90deg, ${color}60, ${color})` }} />
      <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `6px solid ${color}` }} />
    </div>
    <div style={{ padding: "6px 12px", background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 4, fontSize: 11, fontWeight: 700, color, fontFamily: FONT, whiteSpace: "nowrap" }}>
      {to}
    </div>
  </div>
);

/* ── Main Component ───────────────────────────────────────────── */

export default function EHKatmanliSavunma() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>

      {/* Stats */}
      <div className="rg-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {stats.map((s, i) => (
          <Panel key={i} glow={s.color}>
            <div style={{ textAlign: "center", padding: "10px 6px" }}>
              <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1, textShadow: glow(s.color) }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: C.textDim, marginTop: 6, fontFamily: FONT, letterSpacing: 0.5 }}>
                {s.sub}
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* Range / Spectrum Diagram */}
      <Panel title="EH Katmanlı Savunma — Menzil / Frekans Diyagramı" sub="Elektronik harp sistemlerinin mesafe ve frekans kapsama alanları" glow={C.cyan}>
        <RangeSpectrumDiagram />
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
          {layers.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: FONT }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color, boxShadow: glow(l.color, 6) }} />
              <span style={{ color: C.text, fontWeight: 700 }}>{l.name}</span>
              <span style={{ color: C.textDim }}>{l.range}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Battery Architectures */}
      <div className="rg-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {batteryArchitectures.map(arch => (
          <BatteryArchCard key={arch.id} arch={arch} />
        ))}
      </div>

      {/* System Cards per Layer */}
      <div className="rg-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {layers.map((layer, i) => (
          <Panel key={i} title={`${layer.label} — ${layer.name}`} sub={`Menzil: ${layer.range} · Spektrum: ${layer.spectrum}`} glow={layer.color}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {layer.systems.map((sys, j) => (
                <SystemCard key={j} system={sys} color={layer.color} />
              ))}
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 4, fontFamily: FONT, fontWeight: 600 }}>KATMAN KAPSAMA</div>
                <SeverityBar value={layer.arcPct} color={layer.color} />
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* Integration Architecture */}
      <Panel title="EHKKKS C2 — Entegrasyon Mimarisi" sub="Sensörden effektöre kadar elektronik harp komuta-kontrol veri akışı" glow={C.cyan}>
        <div className="rg-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.purple, letterSpacing: 1.5, marginBottom: 10, fontFamily: FONT, textTransform: "uppercase" }}>
              Sensörler
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sensors.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: `${s.color}08`, border: `1px solid ${s.color}22`, borderRadius: 6, borderLeft: `3px solid ${s.color}` }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: s.color, fontFamily: FONT }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: C.textDim, fontFamily: MONO }}>{s.range}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.cyan, letterSpacing: 1.5, marginBottom: 10, fontFamily: FONT, textTransform: "uppercase" }}>
              Komuta Zinciri
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              {commandFlow.map((f, i) => (
                <FlowArrow key={i} from={f.from} to={f.to} color={f.color} />
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.amber, letterSpacing: 1.5, marginBottom: 10, fontFamily: FONT, textTransform: "uppercase" }}>
              Effektör Zinciri
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {effectorChain.map((e, i) => {
                const lyr = layers[i];
                return (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: `${lyr.color}08`, border: `1px solid ${lyr.color}22`, borderRadius: 6, borderLeft: `3px solid ${lyr.color}` }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: lyr.color, fontFamily: FONT }}>{e}</span>
                      <span style={{ fontSize: 11, color: C.textDim, fontFamily: MONO }}>{lyr.range}</span>
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

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{ fontSize: 12, color: C.cyan, fontWeight: 700, fontFamily: FONT, background: `${C.cyan}12`, padding: "6px 16px", borderRadius: 6, border: `1px solid ${C.cyan}25` }}>
            EHKKKS → Görev Planlama → Sinyal Analiz → Hedef Atama → Effektör Tetikleme
          </span>
        </div>
      </Panel>

      {/* Threat Coverage Matrix */}
      <Panel title="Tehdit Kapsama Matrisi" sub="Her katmanın etkili olduğu tehdit sınıfları" glow={C.red}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${C.border}`, color: C.textDim, fontSize: 11, letterSpacing: 1.2 }}>
                  TEHDİT SINIFI
                </th>
                {layers.map((l, i) => (
                  <th key={i} style={{ textAlign: "center", padding: "8px 12px", borderBottom: `1px solid ${C.border}`, color: l.color, fontSize: 12, fontWeight: 800 }}>
                    {l.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {threats.map((threat, ti) => (
                <tr key={ti} style={{ background: ti % 2 === 0 ? "transparent" : `${C.border}20` }}>
                  <td style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}30`, color: C.text, fontWeight: 700, fontSize: 13 }}>
                    {threat}
                  </td>
                  {layers.map((l, li) => (
                    <td key={li} style={{ textAlign: "center", padding: "8px 12px", borderBottom: `1px solid ${C.border}30` }}>
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
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: FONT }}>
            <span style={{ color: C.green, fontSize: 14, fontWeight: 900 }}>&#10003;</span>
            <span style={{ color: C.textDim }}>Etkili kapsama</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: FONT }}>
            <span style={{ color: C.red, fontSize: 14, fontWeight: 900, opacity: 0.6 }}>&#10007;</span>
            <span style={{ color: C.textDim }}>Kapsama dışı</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
