import { useState } from "react";
import { C, glow } from "../../theme";
import { Panel, Badge, SeverityBar } from "../../components";

const threats = [
  { name: "Balistik Füze", icon: "🚀", desc: "Iskander, Fateh-110, DF-21 vb. kısa/orta menzilli balistik füzeler", severity: 95,
    layers: [
      { l: "TESPİT / ERKEN UYARI", sys: ["EIRS (470+ km erken ihbar)","E-7T MESA Radar (600+ km)","HERİKKS C4I Ağı","NATO BMD Veri Linki"], c: C.cyan },
      { l: "TAKİP / KİLİTLENME", sys: ["ÇAFRAD AESA (400+ km)","SİPER Atış Kontrol Radarı","Müşterek Hava Resmi (HAKİM)","Multi-sensor füzyon"], c: C.amber },
      { l: "ANGAJMAN / İMHA", sys: ["SİPER Blok 3 (180+ km, hit-to-kill)","SİPER Blok 2 (150 km, çift mod)","SİPER Blok 1 (100 km)"], c: C.red },
    ]},
  { name: "Cruise Füze", icon: "✈️", desc: "Kalibr, Storm Shadow, JASSM, alçak irtifa seyir füzeleri", severity: 90,
    layers: [
      { l: "TESPİT / ERKEN UYARI", sys: ["EIRS (alçak irtifa tarama)","E-7T MESA (deniz/kara gözetleme)","KALKAN 3D Arama Radarı (120 km)","Sahil gözetleme radarları"], c: C.cyan },
      { l: "TAKİP / KİLİTLENME", sys: ["ÇAFRAD AESA (çoklu hedef takibi)","HİSAR-O+ Atış Kontrol Radarı","KALKAN-050G (25 km)","EO/IR sensörler"], c: C.amber },
      { l: "ANGAJMAN / İMHA", sys: ["SİPER Blok 1/2 (uzun menzil)","HİSAR-O+ RF (40+ km)","HİSAR-O+ IIR (25 km, ateşle-unut)","KORKUT 35mm (yakın savunma)"], c: C.red },
    ]},
  { name: "Savaş Uçağı", icon: "🛩️", desc: "4./5. nesil taktik savaş uçakları, bombardıman uçakları", severity: 85,
    layers: [
      { l: "TESPİT / ERKEN UYARI", sys: ["EIRS (470+ km uzun menzil)","E-7T MESA (360° kapsama)","HERİKKS müşterek hava resmi","Link 16 veri paylaşımı"], c: C.cyan },
      { l: "TAKİP / ANGAJMAN", sys: ["ÇAFRAD AESA (hedef aydınlatma)","HİSAR-O+ RF (aktif radar güdüm)","SİPER (uzun menzil engelleme)","Bozdoğan/Gökdoğan (havadan havaya)"], c: C.amber },
      { l: "YAKIN SAVUNMA", sys: ["HİSAR-A+ (15 km, ateşle-unut)","KORKUT SPAAG (35mm, 1.100 atış/dk)","SUNGUR MANPADS (8 km, IIR)","GÖKDENİZ (deniz yakın savunma)"], c: C.red },
    ]},
  { name: "Taktik İHA / UCAV", icon: "🤖", desc: "TB2 sınıfı silahlı İHA, keşif İHA, kamikaze İHA", severity: 85,
    layers: [
      { l: "TESPİT / İZLEME", sys: ["KALKAN-050G (3D arama)","İHTAR ACAR Radarı","EO/IR Sensörler","RF Sinyal Tespit"], c: C.cyan },
      { l: "YUMUŞAK İMHA", sys: ["KANGAL-FPV (RF karıştırma)","BUKALEMUN (GNSS aldatma)","EJDERHA HPEM (EMP)","SEYMEN (nav. karıştırma)"], c: C.amber },
      { l: "SERT İMHA", sys: ["KORKUT 35mm (AHEAD mühimmat)","SUNGUR (IIR güdümlü)","GÖKBERK Lazer (5 kW)","GÜRZ (lazer güdümlü füze)"], c: C.red },
    ]},
  { name: "FPV / Sürü Drone", icon: "🐝", desc: "Düşük maliyetli FPV dronlar, kamikaze sürüleri, mikro İHA", severity: 80,
    layers: [
      { l: "TESPİT / İZLEME", sys: ["İHTAR ACAR (küçük RCS tespiti)","EO/IR termal kamera","Akustik sensörler","RF tarayıcı"], c: C.cyan },
      { l: "YUMUŞAK İMHA", sys: ["KANGAL-FPV (FPV odaklı)","EJDERHA HPEM (1 km EMP)","BUKALEMUN (GNSS spoofing)","KANGAL Barrage Jammer"], c: C.amber },
      { l: "SERT İMHA", sys: ["GÖKBERK Lazer (düşük maliyet/atış)","KORKUT-100/25 (karşı-İHA)","SUNGUR Mini Füze","ATOM mühimmat (35mm)"], c: C.red },
    ]},
  { name: "Helikopter", icon: "🚁", desc: "Taarruz helikopterleri, nakliye helikopterleri", severity: 70,
    layers: [
      { l: "TESPİT / İZLEME", sys: ["KALKAN-050G Radarı","EO/IR Sensörler","Pasif RF dinleme","Akustik tespit"], c: C.cyan },
      { l: "TAKİP / KİLİTLENME", sys: ["Atış kontrol radarı","EO otomatik takip","Lazer mesafe ölçer","Hedef tanıma algoritmaları"], c: C.amber },
      { l: "ANGAJMAN / İMHA", sys: ["SUNGUR MANPADS (8 km IIR)","HİSAR-A+ (15 km)","KORKUT 35mm SPAAG","Stinger (mevcut envanter)"], c: C.red },
    ]},
];

export default function HSTehditAnalizi() {
  const [selThreat, setSelThreat] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Tehdit Ciddiyet Seviyesi" glow={C.red}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {threats.map((t,i) => (
            <div key={i} className="hov" onClick={() => setSelThreat(i)} style={{ padding: "8px 10px", borderRadius: 3, cursor: "pointer", transition: "all 0.2s", border: selThreat === i ? `1px solid ${C.amber}` : `1px solid ${C.border}`, background: selThreat === i ? C.panelHi : "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.white }}>{t.name}</div>
                  <div style={{ fontSize: 8, color: C.textDim }}>{t.desc}</div>
                </div>
                <Badge color={t.severity > 85 ? C.red : t.severity > 75 ? C.amber : C.green}>SEV {t.severity}</Badge>
              </div>
              <SeverityBar value={t.severity} color={t.severity > 85 ? C.red : t.severity > 75 ? C.amber : C.green} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={`${threats[selThreat].icon} ${threats[selThreat].name} — KATMANLI SAVUNMA ZİNCİRİ`} glow={C.amber}>
        <div style={{ display: "flex", gap: 6 }}>
          {threats[selThreat].layers.map((layer,j) => (
            <div key={j} style={{ flex: 1, position: "relative" }}>
              <div style={{ background: `${layer.c}08`, border: `1px solid ${layer.c}25`, borderRadius: 4, padding: "10px 10px 8px", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: layer.c, borderRadius: "4px 4px 0 0" }} />
                <div style={{ fontSize: 9, fontWeight: 800, color: layer.c, letterSpacing: 1, marginBottom: 6 }}>{layer.l}</div>
                {layer.sys.map((s,k) => (
                  <div key={k} style={{ fontSize: 9, color: C.text, padding: "3px 0", borderBottom: k < layer.sys.length - 1 ? `1px solid ${C.border}` : "none", lineHeight: 1.4 }}>
                    <span style={{ color: layer.c, marginRight: 4 }}>{"▸"}</span>{s}
                  </div>
                ))}
              </div>
              {j < 2 && <div style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.textDim, zIndex: 2, fontWeight: 900 }}>{"→"}</div>}
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="HS Savunma Derinliği — İrtifa Katmanları" glow={C.green}>
        <div style={{ display: "flex", gap: 0, borderRadius: 3, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {[
            { l: "VSHORAD", r: "0–5 km", c: C.red, sys: "SUNGUR · KORKUT · GÖKDENİZ\nGÖKBERK · Oerlikon GDF" },
            { l: "SHORAD", r: "4–8 km", c: C.amber, sys: "HİSAR-A+ · KORKUT\nGÜRZ · SUNGUR Araç Üstü" },
            { l: "MRAD", r: "10–15 km", c: C.cyan, sys: "HİSAR-O+ IIR · HİSAR-O+ RF\nBozdoğan · Gökdoğan" },
            { l: "LRAD", r: "20–30+ km", c: C.purple, sys: "SİPER Blok 1/2/3\nEIRS · ÇAFRAD · E-7T" },
          ].map((z,i) => (
            <div key={i} style={{ flex: 1, padding: "10px 8px", background: `${z.c}06`, borderRight: i < 3 ? `1px solid ${C.border}` : "none", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${z.c}60, ${z.c})` }} />
              <div style={{ fontSize: 9, fontWeight: 800, color: z.c, letterSpacing: 1 }}>{z.l}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: C.white, margin: "2px 0 6px" }}>{z.r}</div>
              <div style={{ fontSize: 8, color: C.textDim, lineHeight: 1.6, whiteSpace: "pre-line" }}>{z.sys}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
