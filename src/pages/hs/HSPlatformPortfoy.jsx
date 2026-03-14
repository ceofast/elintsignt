import { ResponsiveContainer, Treemap } from "recharts";
import { C, FONT, MONO, glow, forceColor } from "../../theme";
import { Panel, ForceTag, TreeCell } from "../../components";

const treemapData = [
  { name: "SİPER", size: 18, cat: "Uzun Menzil SAM", fill: C.arge },
  { name: "HİSAR-O+", size: 14, cat: "Orta Menzil SAM", fill: C.kara },
  { name: "HİSAR-A+", size: 12, cat: "Kısa Menzil SAM", fill: C.kara },
  { name: "KORKUT", size: 13, cat: "SPAAG/CIWS", fill: C.kara },
  { name: "SUNGUR", size: 11, cat: "MANPADS", fill: C.kara },
  { name: "GÖKDENİZ", size: 10, cat: "Deniz CIWS", fill: C.deniz },
  { name: "GÖKBERK", size: 9, cat: "Lazer", fill: C.kara },
  { name: "GÜRZ", size: 8, cat: "Mini Füze", fill: C.kara },
  { name: "EIRS", size: 15, cat: "Erken İhbar Radarı", fill: C.hava },
  { name: "ÇAFRAD", size: 14, cat: "AESA Radar", fill: C.hava },
  { name: "KALKAN", size: 10, cat: "Arama Radarı", fill: C.hava },
  { name: "HERİKKS", size: 12, cat: "C4I Komuta", fill: C.hava },
  { name: "E-7T", size: 11, cat: "AEW&C", fill: C.hava },
  { name: "Bozdoğan", size: 9, cat: "BVR AAM", fill: C.hava },
  { name: "Gökdoğan", size: 8, cat: "WVR AAM", fill: C.hava },
  { name: "Gökbora", size: 7, cat: "Ramjet AAM", fill: C.arge },
  { name: "MIDLAS", size: 10, cat: "VLS Fırlatıcı", fill: C.deniz },
  { name: "TF-2000", size: 12, cat: "HS Muhribi", fill: C.arge },
];

const platforms = [
  { name: "SİPER Bataryası", f: "kara", sys: ["ÇAFRAD AESA","SİPER Blok 1/2/3","8×8 TEL","Batarya Komuta Aracı","HERİKKS Entegrasyonu","Güç Üreteci"], count: 6 },
  { name: "HİSAR-O+ Bataryası", f: "kara", sys: ["KALKAN 3D Radar","HİSAR-O+ IIR","HİSAR-O+ RF","8×8 TEL","Atış Komuta Aracı"], count: 5 },
  { name: "HİSAR-A+ / KORKUT Bataryası", f: "kara", sys: ["KALKAN-050G","HİSAR-A+ Füze","KORKUT 35mm İkiz","FNSS ACV-30","Komuta Aracı"], count: 5 },
  { name: "SUNGUR Mangası", f: "kara", sys: ["SUNGUR MANPADS","4'lü Araç Üstü Lanç","Kirpi MRAP","BCU Hızlı Ateşleme"], count: 4 },
  { name: "İstif Sınıfı Fırkateyn", f: "deniz", sys: ["GÖKDENİZ CIWS","MIDLAS VLS","ÇAFRAD","Bozdoğan/ESSM Entegrasyonu"], count: 4 },
  { name: "TF-2000 Muhribi", f: "arge", sys: ["ÇAFRAD (×4 panel)","MIDLAS (96 hücre)","SİPER Deniz Versiyonu","GÖKDENİZ (×2)","EIRS Entegrasyonu"], count: 5 },
  { name: "TCG Anadolu (LHD)", f: "deniz", sys: ["GÖKDENİZ","HİSAR-A+ Deniz","KALKAN Radar","Yakın Savunma Sistemi"], count: 4 },
  { name: "E-7T Barış Kartalı", f: "hava", sys: ["MESA L-bant AESA","ESM/ELINT","Link 16","HERİKKS Veri Linki"], count: 4 },
  { name: "KAAN (TF-X)", f: "arge", sys: ["Bozdoğan BVR","Gökdoğan WVR","Gökbora Ramjet","Dahili Silah Yuvaları"], count: 4 },
  { name: "F-16 Blok 50+", f: "hava", sys: ["AIM-120 AMRAAM","Bozdoğan Entegrasyonu","Gökdoğan Entegrasyonu","AIM-9X"], count: 4 },
  { name: "Sabit Tesis Koruma", f: "kara", sys: ["Oerlikon GDF","SUNGUR Mevzi","KORKUT Mevzi","Radar Kaplama"], count: 4 },
  { name: "MİLGEM Korveti", f: "deniz", sys: ["GÖKDENİZ","SUNGUR Deniz","Stinger/Atılgan","Yakın Savunma"], count: 4 },
];

export default function HSPlatformPortfoy() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Portföy Treemap" sub="Hava savunma sistemlerinin göreceli stratejik önem ve ağırlıkları" glow={C.amber}>
        <ResponsiveContainer width="100%" height={280}>
          <Treemap data={treemapData} dataKey="size" nameKey="name" content={<TreeCell />} animationDuration={600} />
        </ResponsiveContainer>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 8 }}>
          {[["KARA",C.kara],["HAVA",C.hava],["DENİZ",C.deniz],["AR-GE",C.arge]].map(([l,c],i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c, boxShadow: glow(c, 4) }} /> <span style={{ color: C.textDim }}>{l}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Platform x HS Sistem Entegrasyonu" sub={`Her platformda entegre hava savunma sistemleri — toplam ${platforms.reduce((a,p)=>a+p.count,0)} entegrasyon noktası`} glow={C.cyan}>
        <div className="rg-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {platforms.map((p,i) => {
            const fc = forceColor(p.f);
            return (
              <div key={i} className="hov" style={{ background: `${fc}06`, border: `1px solid ${fc}20`, borderRadius: 5, padding: "8px 10px", cursor: "default", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: fc, boxShadow: glow(fc, 6) }} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.white, fontFamily: FONT }}>{p.name}</span>
                  <ForceTag force={p.f} />
                  <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 800, color: fc, fontFamily: MONO }}>{p.count}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {p.sys.map((s,j) => (
                    <span key={j} style={{ fontSize: 10, padding: "3px 6px", background: `${fc}12`, border: `1px solid ${fc}25`, borderRadius: 2, color: C.text }}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="rg-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        {[
          { l: "Çelik Kubbe", v: "47 Parça", s: "Ağustos 2025 ilk teslimat", c: C.amber },
          { l: "Sözleşme Değeri", v: "$6.5B", s: "Toplam yatırım", c: C.cyan },
          { l: "Katman Sayısı", v: "4", s: "VSHORAD → LRAD", c: C.green },
          { l: "Tam Kapasite", v: "2030", s: "Hedef yıl", c: C.purple },
        ].map((x,i) => (
          <Panel key={i} glow={x.c}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1, fontFamily: FONT, textTransform: "uppercase" }}>{x.l}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: x.c, fontFamily: MONO, textShadow: glow(x.c) }}>{x.v}</div>
              <div style={{ fontSize: 10, color: C.textDim, fontFamily: FONT }}>{x.s}</div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
