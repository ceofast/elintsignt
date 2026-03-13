import { ResponsiveContainer, Treemap } from "recharts";
import { C, FONT, MONO, glow, forceColor } from "../theme";
import { Panel, ForceTag, TreeCell } from "../components";

const treemapData = [
  { name: "KORAL", size: 16, cat: "Radar EA (HvKK)", fill: C.hava },
  { name: "VURAL", size: 9, cat: "Radar ES", fill: C.kara },
  { name: "İLGAR", size: 10, cat: "Hab. EA", fill: C.kara },
  { name: "KANGAL", size: 13, cat: "K-EYP", fill: C.kara },
  { name: "PUHU", size: 8, cat: "COMINT", fill: C.kara },
  { name: "İHTAR+EJDERHA", size: 11, cat: "K-İHA+YE", fill: C.kara },
  { name: "HAVASOJ", size: 16, cat: "Hava SOJ", fill: C.hava },
  { name: "F-16 EH", size: 14, cat: "Öz Koruma", fill: C.hava },
  { name: "ANTIDOT", size: 12, cat: "İHA Pod", fill: C.hava },
  { name: "FEWS/U", size: 11, cat: "Uçak EH", fill: C.hava },
  { name: "HEWS", size: 7, cat: "Heli EH", fill: C.hava },
  { name: "ARES", size: 14, cat: "Deniz ESM", fill: C.deniz },
  { name: "AREAS", size: 11, cat: "Deniz ECM", fill: C.deniz },
  { name: "HIZIR+ZARGANA", size: 10, cat: "Torpido KT", fill: C.deniz },
  { name: "NAZAR+LIAS", size: 8, cat: "Lazer EH", fill: C.deniz },
  { name: "KAAN EH", size: 10, cat: "5.Nesil", fill: C.arge },
  { name: "TF-2000", size: 8, cat: "Muhrip", fill: C.arge },
];

const platforms = [
  { name: "F-16 Blok 50+", f: "hava", sys: ["SPEWS-II","AN/ALQ-211","CMDS/KTSS","EDPOD","EHPOD"], count: 5 },
  { name: "F-16 ÖZGÜR-2", f: "hava", sys: ["FEWS (Yerli Süit)","MURAD AESA","Yerli CMDS"], count: 3 },
  { name: "KAAN (TF-X)", f: "arge", sys: ["IRFS","YILDIRIM 300 DIRCM","SİS","JINN","BURFİS","IEOS"], count: 6 },
  { name: "Bayraktar TB2", f: "hava", sys: ["ANTIDOT 2-U/S","ANTIDOT Mini ECM","ANTIDOT 3-U"], count: 3 },
  { name: "Bayraktar Akıncı", f: "hava", sys: ["ANTIDOT ES+EA","ASOJ-234U SOJ","ANTIDOT 3-U"], count: 3 },
  { name: "Kızılelma", f: "arge", sys: ["FEWS-U 360°","RWR","ECM","CMDS"], count: 4 },
  { name: "İstif Sınıfı", f: "deniz", sys: ["ARES-2N(V)2","AREAS-2N","KARTACA-N","HIZIR 100-N","NAZAR","LIAS-200"], count: 6 },
  { name: "Reis Sınıfı", f: "deniz", sys: ["ARES-2NS","ZARGANA","ZOKA Ailesi"], count: 3 },
  { name: "T-129 ATAK", f: "hava", sys: ["ASES","HEWS","LWR","MWS","CMDS"], count: 5 },
  { name: "TCG Anadolu", f: "deniz", sys: ["ARES-2N(V)2","AREAS-2N","KALKAN","HIZIR 100-N"], count: 4 },
  { name: "ANKA-S / ANKA-I", f: "hava", sys: ["COMINT","ELINT","ESM","EA","Hab. Karıştırma"], count: 5 },
  { name: "E-7T Peace Eagle", f: "hava", sys: ["Yerli ESM/ELINT","IFF Mode 5","KARETTA CRPA"], count: 3 },
];

export default function PlatformPortfoy() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Portföy Treemap" sub="Ürün ailelerinin göreceli stratejik önem ve ağırlıkları" glow={C.cyan}>
        <ResponsiveContainer width="100%" height={300}>
          <Treemap data={treemapData} dataKey="size" nameKey="name" content={<TreeCell />} animationDuration={600} />
        </ResponsiveContainer>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 12 }}>
          {[["KARA",C.kara],["HAVA",C.hava],["DENİZ",C.deniz],["AR-GE",C.arge]].map(([l,c],i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: FONT }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: c, boxShadow: glow(c, 6) }} /> <span style={{ color: C.textDim }}>{l}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Platform x EH Sistem Entegrasyonu" sub={`Her platformda entegre EH sistemleri — toplam ${platforms.reduce((a,p)=>a+p.count,0)} entegrasyon noktası`} glow={C.amber}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {platforms.map((p,i) => {
            const fc = forceColor(p.f);
            return (
              <div key={i} className="hov" style={{ background: `${fc}08`, border: `1px solid ${fc}22`, borderRadius: 8, padding: "12px 14px", cursor: "default", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: fc, boxShadow: glow(fc, 6) }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: FONT }}>{p.name}</span>
                  <ForceTag force={p.f} />
                  <span style={{ marginLeft: "auto", fontSize: 15, fontWeight: 800, color: fc, fontFamily: MONO }}>{p.count}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {p.sys.map((s,j) => (
                    <span key={j} style={{ fontSize: 11, padding: "3px 8px", background: `${fc}14`, border: `1px solid ${fc}28`, borderRadius: 4, color: C.text, fontFamily: FONT }}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {[
          { l: "İHA-EH Liderliği", v: "DÜNYA #1", s: "ANTIDOT ailesi rakipsiz", c: C.hava },
          { l: "İstif Yerlilik", v: "%80", s: "EH sistemlerinde", c: C.deniz },
          { l: "KAAN Hedef", v: "2028", s: "5. nesil EH süiti", c: C.arge },
          { l: "TF-2000 Hedef", v: "2030", s: "Hava sav. muhribi", c: C.deniz },
        ].map((x,i) => (
          <Panel key={i} glow={x.c}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: C.textDim, letterSpacing: 1.2, textTransform: "uppercase", fontFamily: FONT }}>{x.l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: x.c, textShadow: glow(x.c), fontFamily: MONO }}>{x.v}</div>
              <div style={{ fontSize: 12, color: C.textDim, marginTop: 2, fontFamily: FONT }}>{x.s}</div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
