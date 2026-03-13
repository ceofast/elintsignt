import { ResponsiveContainer, Treemap } from "recharts";
import { C, glow, forceColor } from "../theme";
import { Panel, ForceTag, TreeCell } from "../components";

const treemapData = [
  { name: "KORAL", size: 16, cat: "Radar EA (HvKK)", fill: C.hava },
  { name: "VURAL", size: 9, cat: "Radar ES", fill: C.kara },
  { name: "ILGAR", size: 10, cat: "Hab. EA", fill: C.kara },
  { name: "KANGAL", size: 13, cat: "K-EYP", fill: C.kara },
  { name: "PUHU", size: 8, cat: "COMINT", fill: C.kara },
  { name: "İHTAR+EJDERHA", size: 11, cat: "K-İHA+YE", fill: C.kara },
  { name: "HAVASOJ", size: 16, cat: "Hava SOJ", fill: C.hava },
  { name: "F-16 EH", size: 14, cat: "Oz Koruma", fill: C.hava },
  { name: "ANTIDOT", size: 12, cat: "İHA Pod", fill: C.hava },
  { name: "FEWS/U", size: 11, cat: "Ucak EH", fill: C.hava },
  { name: "HEWS", size: 7, cat: "Heli EH", fill: C.hava },
  { name: "ARES", size: 14, cat: "Deniz ESM", fill: C.deniz },
  { name: "AREAS", size: 11, cat: "Deniz ECM", fill: C.deniz },
  { name: "HIZIR+ZARGANA", size: 10, cat: "Torpido KT", fill: C.deniz },
  { name: "NAZAR+LIAS", size: 8, cat: "Lazer EH", fill: C.deniz },
  { name: "KAAN EH", size: 10, cat: "5.Nesil", fill: C.arge },
  { name: "TF-2000", size: 8, cat: "Muhrib", fill: C.arge },
];

const platforms = [
  { name: "F-16 Blok 50+", f: "hava", sys: ["SPEWS-II","AN/ALQ-211","CMDS/KTSS","EDPOD","EHPOD"], count: 5 },
  { name: "F-16 OZGUR-2", f: "hava", sys: ["FEWS (Yerli Suit)","MURAD AESA","Yerli CMDS"], count: 3 },
  { name: "KAAN (TF-X)", f: "arge", sys: ["IRFS","YILDIRIM 300 DIRCM","SİS","JINN","BURFİS","IEOS"], count: 6 },
  { name: "Bayraktar TB2", f: "hava", sys: ["ANTIDOT 2-U/S","ANTIDOT Mini ECM","ANTIDOT 3-U"], count: 3 },
  { name: "Bayraktar Akinci", f: "hava", sys: ["ANTIDOT ES+EA","ASOJ-234U SOJ","ANTIDOT 3-U"], count: 3 },
  { name: "Kizelelma", f: "arge", sys: ["FEWS-U 360°","RWR","ECM","CMDS"], count: 4 },
  { name: "İstif Sinifi", f: "deniz", sys: ["ARES-2N(V)2","AREAS-2N","KARTACA-N","HIZIR 100-N","NAZAR","LIAS-200"], count: 6 },
  { name: "Reis Sinifi", f: "deniz", sys: ["ARES-2NS","ZARGANA","ZOKA Ailesi"], count: 3 },
  { name: "T-129 ATAK", f: "hava", sys: ["ASES","HEWS","LWR","MWS","CMDS"], count: 5 },
  { name: "TCG Anadolu", f: "deniz", sys: ["ARES-2N(V)2","AREAS-2N","KALKAN","HIZIR 100-N"], count: 4 },
  { name: "ANKA-S / ANKA-I", f: "hava", sys: ["COMINT","ELINT","ESM","EA","Hab. Karıştırma"], count: 5 },
  { name: "E-7T Peace Eagle", f: "hava", sys: ["Yerli ESM/ELINT","IFF Mode 5","KARETTA CRPA"], count: 3 },
];

export default function PlatformPortfoy() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Portfoy Treemap" sub="Ürün ailelerinin goreceli stratejik önem ve agirliklari" glow={C.cyan}>
        <ResponsiveContainer width="100%" height={280}>
          <Treemap data={treemapData} dataKey="size" nameKey="name" content={<TreeCell />} animationDuration={600} />
        </ResponsiveContainer>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 8 }}>
          {[["KARA",C.kara],["HAVA",C.hava],["DENİZ",C.deniz],["AR-GE",C.arge]].map(([l,c],i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c, boxShadow: glow(c, 4) }} /> <span style={{ color: C.textDim }}>{l}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Platform x EH Sistem Entegrasyonu" sub={`Her platformda entegre EH sistemleri — toplam ${platforms.reduce((a,p)=>a+p.count,0)} entegrasyon noktasi`} glow={C.amber}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {platforms.map((p,i) => {
            const fc = forceColor(p.f);
            return (
              <div key={i} className="hov" style={{ background: `${fc}06`, border: `1px solid ${fc}20`, borderRadius: 3, padding: "8px 10px", cursor: "default", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: fc, boxShadow: glow(fc, 6) }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.white }}>{p.name}</span>
                  <ForceTag force={p.f} />
                  <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 800, color: fc }}>{p.count}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {p.sys.map((s,j) => (
                    <span key={j} style={{ fontSize: 7, padding: "2px 4px", background: `${fc}12`, border: `1px solid ${fc}25`, borderRadius: 2, color: C.text }}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        {[
          { l: "İHA-EH Liderligi", v: "DUNYA #1", s: "ANTIDOT ailesi rakipsiz", c: C.hava },
          { l: "İstif Yerlilik", v: "%80", s: "EH sistemlerinde", c: C.deniz },
          { l: "KAAN Hedef", v: "2028", s: "5. nesil EH suiti", c: C.arge },
          { l: "TF-2000 Hedef", v: "2030", s: "Hava sav. muhribi", c: C.deniz },
        ].map((x,i) => (
          <Panel key={i} glow={x.c}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 7, color: C.textDim, letterSpacing: 1, textTransform: "uppercase" }}>{x.l}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: x.c, textShadow: glow(x.c) }}>{x.v}</div>
              <div style={{ fontSize: 7, color: C.textDim }}>{x.s}</div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
