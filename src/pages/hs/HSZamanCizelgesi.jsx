import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { C, FONT, MONO, glow, ttStyle, forceColor } from "../../theme";
import { Panel, ForceTag } from "../../components";

const growthData = [
  { year: "2014", systems: 1 },
  { year: "2016", systems: 2 },
  { year: "2018", systems: 5 },
  { year: "2020", systems: 7 },
  { year: "2022", systems: 11 },
  { year: "2024", systems: 16 },
  { year: "2025", systems: 21 },
  { year: "2026", systems: 26 },
  { year: "2028", systems: 32 },
  { year: "2030", systems: 40 },
];

const timeline = [
  { y: 2014, e: "KALKAN hava savunma radarı envantere giriş", f: "kara", imp: 3 },
  { y: 2015, e: "HERİKKS C4I sistemi devreye alındı", f: "kara", imp: 4 },
  { y: 2018, e: "KORKUT alçak irtifa hava savunma sistemi teslim", f: "kara", imp: 4 },
  { y: 2019, e: "S-400 Rusya'dan teslim alındı — F-35 krizi", f: "hava", imp: 5 },
  { y: 2020, e: "GÖKDENİZ deniz CIWS sistemi tamamlandı", f: "deniz", imp: 3 },
  { y: 2021, e: "SUNGUR MANPADS envanter girişi", f: "kara", imp: 4 },
  { y: 2021, e: "HİSAR-A+ kabul testleri tamamlandı ve envantere girdi", f: "kara", imp: 5 },
  { y: 2022, e: "HİSAR-O+ IIR Kara Kuvvetleri'ne teslim", f: "kara", imp: 5 },
  { y: 2022, e: "EIRS erken ihbar radarı devreye alındı", f: "hava", imp: 4 },
  { y: 2023, e: "SİPER Blok 2 ilk atış testi başarılı (150 km)", f: "hava", imp: 5 },
  { y: 2023, e: "MIDLAS dikey fırlatma sistemi İstif sınıfına entegre", f: "deniz", imp: 4 },
  { y: 2023, e: "$1.5B HİSAR/SİPER seri üretim sözleşmesi", f: "hava", imp: 4 },
  { y: 2024, e: "HİSAR-O+ RF 40+ km menzil ile seri üretime geçti", f: "kara", imp: 4 },
  { y: 2024, e: "SİPER Blok 1 aktif hizmete girdi (100+ km)", f: "hava", imp: 5 },
  { y: 2024, e: "ÇAFRAD çok fonksiyonlu radar tamamlandı", f: "deniz", imp: 4 },
  { y: 2025, e: "Çelik Kubbe — 47 parça $460M ilk teslimat", f: "hava", imp: 5 },
  { y: 2025, e: "GÜRZ hibrit SHORAD sistemi uluslararası tanıtım", f: "kara", imp: 4 },
  { y: 2025, e: "GÖKBERK lazer silahı drone testleri başarılı", f: "kara", imp: 5 },
  { y: 2025, e: "Bozdoğan ve Gökdoğan F-16 canlı atış testleri", f: "hava", imp: 5 },
  { y: 2025, e: "$6.5B Çelik Kubbe ana sözleşmesi imzalandı", f: "hava", imp: 5 },
  { y: 2025, e: "$1.9B ASELSAN seri üretim sözleşmesi", f: "kara", imp: 4 },
  { y: 2025, e: "TF-2000 çelik kesim — hava savunma muhribi", f: "deniz", imp: 5 },
  { y: 2025, e: "SİPER-1D MIDLAS'tan dikey fırlatma testi başarılı", f: "deniz", imp: 5 },
  { y: 2026, e: "SİPER Blok 2 envanter girişi (150 km)", f: "hava", imp: 5 },
  { y: 2028, e: "SİPER Blok 3 geliştirme tamamlanması (180+ km)", f: "arge", imp: 4 },
  { y: 2028, e: "Gökbora ramjet AAM — KAAN entegrasyonu", f: "arge", imp: 5 },
  { y: 2030, e: "TF-2000 hava savunma muhribi teslim", f: "deniz", imp: 5 },
  { y: 2030, e: "Çelik Kubbe tam operasyonel kapasite", f: "hava", imp: 5 },
];

const contracts = [
  { name: "Çelik Kubbe Ana Sözleşme", value: "$6.5B", parties: "ASELSAN + HAVELSAN + ROKETSAN", year: "2025", status: "Aktif" },
  { name: "ASELSAN Seri Üretim", value: "$1.9B", parties: "ASELSAN + SSB", year: "2025", status: "Aktif" },
  { name: "HİSAR/SİPER Üretim", value: "$1.5B", parties: "ASELSAN + ROKETSAN + TÜBİTAK SAGE", year: "2023", status: "Teslimat" },
  { name: "İlk Çelik Kubbe Teslimat", value: "$460M", parties: "ASELSAN", year: "2025", status: "Tamamlandı" },
  { name: "Seri Üretim (2027-2030)", value: "€1.12B", parties: "ASELSAN + SSB", year: "2025", status: "Planlandı" },
];

const statusColor = s => ({ Aktif: C.green, Teslimat: C.cyan, Tamamlandı: C.amber, Planlandı: C.purple }[s] || C.textDim);

export default function HSZamanCizelgesi() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Büyüme Eğrisi — Yerli Hava Savunma Sistemleri" sub="2014-2030 birikimli artış (tahmin dahil)" glow={C.amber}>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs><linearGradient id="gHStime" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.amber} stopOpacity={0.25} /><stop offset="100%" stopColor={C.amber} stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="systems" stroke={C.amber} strokeWidth={2} fill="url(#gHStime)" dot={{ r: 3, fill: C.amber, stroke: C.bg, strokeWidth: 2 }} name="Sistem Sayısı" />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Kronolojik Gelişim" glow={C.amber}>
        <div style={{ position: "relative", paddingLeft: 38 }}>
          <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.green}, ${C.amber}, ${C.cyan}, ${C.arge})` }} />
          {timeline.map((item, i) => {
            const fc = forceColor(item.f);
            const future = item.y > 2026;
            return (
              <div key={i} style={{ position: "relative", marginBottom: 6, paddingBottom: 6, borderBottom: `1px solid ${C.border}`, opacity: future ? 0.6 : 1, animation: `fadeUp 0.3s ease-out ${i * 0.04}s both` }}>
                <div style={{ position: "absolute", left: -29, top: 1, width: item.imp >= 5 ? 14 : 10, height: item.imp >= 5 ? 14 : 10, borderRadius: "50%", background: fc, border: `2px solid ${C.panel}`, boxShadow: item.imp >= 5 ? glow(fc, 12) : "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 900, color: C.amber, minWidth: 32, fontFamily: MONO }}>{item.y}</span>
                  <ForceTag force={item.f} />
                  {item.imp >= 5 && <span style={{ fontSize: 10, color: C.amber, fontWeight: 700, background: `${C.amber}15`, padding: "1px 4px", borderRadius: 2 }}>{"★"} DÖNÜM NOKTASI</span>}
                  <span style={{ fontSize: 13, color: C.text, fontFamily: FONT }}>{item.e}</span>
                  {future && <span style={{ fontSize: 10, color: C.amber, fontWeight: 700, marginLeft: "auto", background: `${C.amber}12`, padding: "1px 5px", borderRadius: 2, border: `1px solid ${C.amber}30` }}>HEDEF</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { y: "2021", t: "HİSAR-A+ Envanter", d: "Türkiye'nin ilk yerli SAM sistemi envantere girdi", c: C.kara },
          { y: "2025", t: "Çelik Kubbe Teslimat", d: "47 parça, $460M ilk entegre teslimat", c: C.amber },
          { y: "2025", t: "GÖKBERK Test", d: "Dünyanın en küçük lazer hava savunma sistemi drone testlerini geçti", c: C.green },
        ].map((m, i) => (
          <Panel key={i} glow={m.c}>
            <div style={{ fontSize: 28, fontWeight: 900, color: m.c, textShadow: glow(m.c) }}>{m.y}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.white, margin: "2px 0" }}>{m.t}</div>
            <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.5 }}>{m.d}</div>
          </Panel>
        ))}
      </div>

      <Panel title="Tedarik Sözleşmeleri" glow={C.amber}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.borderHi}` }}>
                {["Sözleşme", "Değer", "Taraflar", "Yıl", "Durum"].map(h => (
                  <th key={h} style={{ padding: "6px 8px", textAlign: "left", color: C.textDim, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((c, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "6px 8px", color: C.white, fontWeight: 700, fontSize: 12, fontFamily: FONT }}>{c.name}</td>
                  <td style={{ padding: "6px 8px", color: C.amber, fontWeight: 900, fontSize: 13, fontFamily: MONO }}>{c.value}</td>
                  <td style={{ padding: "6px 8px", color: C.text, fontSize: 11, fontFamily: FONT }}>{c.parties}</td>
                  <td style={{ padding: "6px 8px", color: C.textDim, fontSize: 12, fontFamily: MONO }}>{c.year}</td>
                  <td style={{ padding: "6px 8px" }}>
                    <span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 2, fontSize: 10, fontWeight: 700, color: "#fff", background: statusColor(c.status), letterSpacing: 0.5 }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
