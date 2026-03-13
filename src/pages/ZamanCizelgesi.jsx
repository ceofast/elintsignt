import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { C, glow, ttStyle, forceColor, growthData } from "../theme";
import { Panel, ForceTag } from "../components";

const timeline = [
  { y: 2016, e: "KORAL Hava Kuvvetleri'ne teslim", f: "hava", imp: 4 },
  { y: 2019, e: "SPEWS-II F-16 entegrasyonu (60 sistem)", f: "hava", imp: 3 },
  { y: 2020, e: "Bahar Kalkani — KORAL muharebe kaniti (Pantsir-S1)", f: "hava", imp: 5 },
  { y: 2021, e: "NAZAR lazer EH ilk montaj (TCG Gokova)", f: "deniz", imp: 3 },
  { y: 2022, e: "TCG Ufuk istihbarat gemisi hizmete giris", f: "deniz", imp: 4 },
  { y: 2022, e: "VURAL (REDET-II) Kara Kuvvetleri'ne teslim", f: "kara", imp: 3 },
  { y: 2024, e: "MARLIN EW 100 — Dunyanin ilk EH İDA'si", f: "deniz", imp: 5 },
  { y: 2025, e: "EDPOD envantere giris (F-16 Blok 40)", f: "hava", imp: 3 },
  { y: 2025, e: "FEWS-U Kizelelma'da ilk ucus — insansız EH suiti", f: "hava", imp: 5 },
  { y: 2025, e: "EJDERHA/AD 200 HPEM seri üretim baslangici", f: "kara", imp: 4 },
  { y: 2025, e: "Polonya 410M€ EH ihracat sozlesmesi", f: "hava", imp: 5 },
  { y: 2025, e: "KORAL 200 tanitimi (IDEF) — 2x güç artisi", f: "hava", imp: 3 },
  { y: 2026, e: "HAVASOJ / ASOJ 23-A ilk teslimat", f: "hava", imp: 5 },
  { y: 2026, e: "İHA SOJ programi (2x Akinci + 1x AKSUNGUR)", f: "hava", imp: 4 },
  { y: 2028, e: "KAAN 5. nesil EH tam entegrasyonu", f: "arge", imp: 5 },
  { y: 2030, e: "TF-2000 Tepe sinifi muhrib teslim", f: "deniz", imp: 5 },
  { y: 2035, e: "MİLDEN milli denizaltı teslim", f: "arge", imp: 4 },
];

const exportList = [
  { c: "Polonya", fl: "🇵🇱", v: "410M€", sys: "KORAL/VURAL turevi + Karşı-İHA", yr: "2025" },
  { c: "Pakıştan", fl: "🇵🇰", v: "Coklu", sys: "HAVASOJ, ZARGANA, EWTTR, ARES-2SC", yr: "2024-26" },
  { c: "Fas", fl: "🇲🇦", v: "—", sys: "KORAL", yr: "2019" },
  { c: "Endonezya", fl: "🇮🇩", v: "—", sys: "ZARGANA", yr: "2020" },
  { c: "S.Arabistan", fl: "🇸🇦", v: "—", sys: "EWTTR", yr: "2018" },
  { c: "G.Kore", fl: "🇰🇷", v: "—", sys: "EWTTR", yr: "2020" },
];

export default function ZamanCizelgesi() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Buyume Egrisi — Yerli EH Sistemleri" sub="2016-2030 birikimli artis (tahmin dahil)" glow={C.cyan}>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs><linearGradient id="gC2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.25} /><stop offset="100%" stopColor={C.cyan} stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 9, fontFamily: "monospace" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 9, fontFamily: "monospace" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="systems" stroke={C.cyan} strokeWidth={2} fill="url(#gC2)" dot={{ r: 3, fill: C.cyan, stroke: C.bg, strokeWidth: 2 }} name="Sistem Sayisi" />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Kronolojik Gelisim" glow={C.cyan}>
        <div style={{ position: "relative", paddingLeft: 38 }}>
          <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.green}, ${C.cyan}, ${C.amber}, ${C.arge})` }} />
          {timeline.map((item, i) => {
            const fc = forceColor(item.f);
            const future = item.y > 2025;
            return (
              <div key={i} style={{ position: "relative", marginBottom: 6, paddingBottom: 6, borderBottom: `1px solid ${C.border}`, opacity: future ? 0.6 : 1, animation: `fadeUp 0.3s ease-out ${i * 0.04}s both` }}>
                <div style={{ position: "absolute", left: -29, top: 1, width: item.imp >= 5 ? 14 : 10, height: item.imp >= 5 ? 14 : 10, borderRadius: "50%", background: fc, border: `2px solid ${C.panel}`, boxShadow: item.imp >= 5 ? glow(fc, 12) : "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: C.cyan, minWidth: 32, fontFamily: "monospace" }}>{item.y}</span>
                  <ForceTag force={item.f} />
                  {item.imp >= 5 && <span style={{ fontSize: 7, color: C.amber, fontWeight: 700, background: `${C.amber}15`, padding: "1px 4px", borderRadius: 2 }}>{"★"} DONUM NOKTASI</span>}
                  <span style={{ fontSize: 10, color: C.text }}>{item.e}</span>
                  {future && <span style={{ fontSize: 7, color: C.amber, fontWeight: 700, marginLeft: "auto", background: `${C.amber}12`, padding: "1px 5px", borderRadius: 2, border: `1px solid ${C.amber}30` }}>HEDEF</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { y: "2020", t: "Bahar Kalkani", d: "KORAL, Pantsir-S1 radarlarini DRFM ile karistirarak muharebe etkinligini kanitladi", c: C.hava },
          { y: "2025", t: "Polonya İhraçati", d: "410M€ — Avrupa'nin en büyük Türk savunma ihracati sozlesmesi", c: C.amber },
          { y: "2025", t: "FEWS-U Ilk Ucus", d: "Kizelelma'da dunyanin ilk insansız ucak EH suitlerinden biri test edildi", c: C.hava },
        ].map((m,i) => (
          <Panel key={i} glow={m.c}>
            <div style={{ fontSize: 28, fontWeight: 900, color: m.c, textShadow: glow(m.c) }}>{m.y}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.white, margin: "2px 0" }}>{m.t}</div>
            <div style={{ fontSize: 8, color: C.textDim, lineHeight: 1.5 }}>{m.d}</div>
          </Panel>
        ))}
      </div>

      <Panel title="EH İhraçat Portfoyu" glow={C.amber}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
          {exportList.map((e,i) => (
            <div key={i} style={{ background: `${C.amber}06`, border: `1px solid ${C.amber}18`, borderRadius: 3, padding: "8px", textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{e.fl}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.white }}>{e.c}</div>
              {e.v !== "—" && <div style={{ fontSize: 13, fontWeight: 900, color: C.amber }}>{e.v}</div>}
              <div style={{ fontSize: 8, color: C.textDim }}>{e.sys}</div>
              <div style={{ fontSize: 7, color: C.textMute, marginTop: 2 }}>{e.yr}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
