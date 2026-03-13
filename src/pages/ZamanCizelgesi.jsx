import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { C, FONT, MONO, glow, ttStyle, forceColor, growthData } from "../theme";
import { Panel, ForceTag } from "../components";

const timeline = [
  { y: 2016, e: "KORAL Hava Kuvvetleri'ne teslim", f: "hava", imp: 4 },
  { y: 2019, e: "SPEWS-II F-16 entegrasyonu (60 sistem)", f: "hava", imp: 3 },
  { y: 2020, e: "Bahar Kalkanı — KORAL muharebe kanıtı (Pantsir-S1)", f: "hava", imp: 5 },
  { y: 2021, e: "NAZAR lazer EH ilk montaj (TCG Gökova)", f: "deniz", imp: 3 },
  { y: 2022, e: "TCG Ufuk istihbarat gemisi hizmete giriş", f: "deniz", imp: 4 },
  { y: 2022, e: "VURAL (REDET-II) Kara Kuvvetleri'ne teslim", f: "kara", imp: 3 },
  { y: 2024, e: "MARLIN EW 100 — Dünyanın ilk EH İDA'sı", f: "deniz", imp: 5 },
  { y: 2025, e: "EDPOD envantere giriş (F-16 Blok 40)", f: "hava", imp: 3 },
  { y: 2025, e: "FEWS-U Kızılelma'da ilk uçuş — insansız EH süiti", f: "hava", imp: 5 },
  { y: 2025, e: "EJDERHA/AD 200 HPEM seri üretim başlangıcı", f: "kara", imp: 4 },
  { y: 2025, e: "Polonya 410M€ EH ihracat sözleşmesi", f: "hava", imp: 5 },
  { y: 2025, e: "KORAL 200 tanıtımı (IDEF) — 2x güç artışı", f: "hava", imp: 3 },
  { y: 2026, e: "HAVASOJ / ASOJ 23-A ilk teslimat", f: "hava", imp: 5 },
  { y: 2026, e: "İHA SOJ programı (2x Akıncı + 1x AKSUNGUR)", f: "hava", imp: 4 },
  { y: 2028, e: "KAAN 5. nesil EH tam entegrasyonu", f: "arge", imp: 5 },
  { y: 2030, e: "TF-2000 Tepe sınıfı muhrip teslim", f: "deniz", imp: 5 },
  { y: 2035, e: "MİLDEN milli denizaltı teslim", f: "arge", imp: 4 },
];

const exportList = [
  { c: "Polonya", fl: "🇵🇱", v: "410M€", sys: "KORAL/VURAL türevi + Karşı-İHA", yr: "2025" },
  { c: "Pakistan", fl: "🇵🇰", v: "Çoklu", sys: "HAVASOJ, ZARGANA, EWTTR, ARES-2SC", yr: "2024-26" },
  { c: "Fas", fl: "🇲🇦", v: "—", sys: "KORAL", yr: "2019" },
  { c: "Endonezya", fl: "🇮🇩", v: "—", sys: "ZARGANA", yr: "2020" },
  { c: "S.Arabistan", fl: "🇸🇦", v: "—", sys: "EWTTR", yr: "2018" },
  { c: "G.Kore", fl: "🇰🇷", v: "—", sys: "EWTTR", yr: "2020" },
];

export default function ZamanCizelgesi() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Büyüme Eğrisi — Yerli EH Sistemleri" sub="2016-2030 birikimli artış (tahmin dahil)" glow={C.cyan}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs><linearGradient id="gC2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.25} /><stop offset="100%" stopColor={C.cyan} stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="systems" stroke={C.cyan} strokeWidth={2} fill="url(#gC2)" dot={{ r: 4, fill: C.cyan, stroke: C.bg, strokeWidth: 2 }} name="Sistem Sayısı" />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Kronolojik Gelişim" glow={C.cyan}>
        <div style={{ position: "relative", paddingLeft: 42 }}>
          <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.green}, ${C.cyan}, ${C.amber}, ${C.arge})` }} />
          {timeline.map((item, i) => {
            const fc = forceColor(item.f);
            const future = item.y > 2025;
            return (
              <div key={i} style={{ position: "relative", marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${C.border}`, opacity: future ? 0.6 : 1, animation: `fadeUp 0.3s ease-out ${i * 0.04}s both` }}>
                <div style={{ position: "absolute", left: -32, top: 2, width: item.imp >= 5 ? 16 : 12, height: item.imp >= 5 ? 16 : 12, borderRadius: "50%", background: fc, border: `2px solid ${C.panel}`, boxShadow: item.imp >= 5 ? glow(fc, 12) : "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.cyan, minWidth: 36, fontFamily: MONO }}>{item.y}</span>
                  <ForceTag force={item.f} />
                  {item.imp >= 5 && <span style={{ fontSize: 10, color: C.amber, fontWeight: 700, background: `${C.amber}18`, padding: "2px 8px", borderRadius: 4, fontFamily: FONT }}>{"★"} DÖNÜM NOKTASI</span>}
                  <span style={{ fontSize: 13, color: C.text, fontFamily: FONT }}>{item.e}</span>
                  {future && <span style={{ fontSize: 10, color: C.amber, fontWeight: 700, marginLeft: "auto", background: `${C.amber}14`, padding: "2px 8px", borderRadius: 4, border: `1px solid ${C.amber}30`, fontFamily: FONT }}>HEDEF</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { y: "2020", t: "Bahar Kalkanı", d: "KORAL, Pantsir-S1 radarlarını DRFM ile karıştırarak muharebe etkinliğini kanıtladı", c: C.hava },
          { y: "2025", t: "Polonya İhracatı", d: "410M€ — Avrupa'nın en büyük Türk savunma ihracatı sözleşmesi", c: C.amber },
          { y: "2025", t: "FEWS-U İlk Uçuş", d: "Kızılelma'da dünyanın ilk insansız uçak EH süitlerinden biri test edildi", c: C.hava },
        ].map((m,i) => (
          <Panel key={i} glow={m.c}>
            <div style={{ fontSize: 30, fontWeight: 800, color: m.c, textShadow: glow(m.c), fontFamily: MONO }}>{m.y}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.white, margin: "4px 0", fontFamily: FONT }}>{m.t}</div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.6, fontFamily: FONT }}>{m.d}</div>
          </Panel>
        ))}
      </div>

      <Panel title="EH İhracat Portföyü" glow={C.amber}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {exportList.map((e,i) => (
            <div key={i} style={{ background: `${C.amber}08`, border: `1px solid ${C.amber}20`, borderRadius: 8, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 26 }}>{e.fl}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.white, marginTop: 4, fontFamily: FONT }}>{e.c}</div>
              {e.v !== "—" && <div style={{ fontSize: 15, fontWeight: 800, color: C.amber, fontFamily: MONO }}>{e.v}</div>}
              <div style={{ fontSize: 12, color: C.textDim, marginTop: 2, fontFamily: FONT }}>{e.sys}</div>
              <div style={{ fontSize: 10, color: C.textMute, marginTop: 4, fontFamily: MONO }}>{e.yr}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
