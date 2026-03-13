import { useState } from "react";
import { C, FONT, MONO, glow } from "../theme";
import { Panel, Badge, SeverityBar } from "../components";

const threats = [
  { name: "SAM Radarları", icon: "📡", desc: "S-300, S-400, Pantsir, NASAMS vb.", severity: 95,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["VURAL (0.4-40 GHz)","EDPOD (Taktik ELINT)","ANTIDOT 2-U/S","ARES-2N","E-7T ESM"], c: C.cyan },
      { l: "SOFT KILL", sys: ["KORAL (150-200 km DRFM)","HAVASOJ (AESA SOJ)","EHPOD (Aktif ECM)","AREAS-2N (32 eş zamanlı)","KORAL 200 (2x güç)"], c: C.amber },
      { l: "HARD KILL", sys: ["SOM Cruise Füze","HGK/KGK Güdüm Kiti","KAAN SEAD Görevi","Akıncı ANTIDOT SEAD"], c: C.red },
    ]},
  { name: "Anti-Gemi Füzesi", icon: "🚀", desc: "Harpoon, Exocet, P-800, C-802 vb.", severity: 90,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["ARES-2N(V)2 (Geniş bant)","LIAS-200D (Lazer ikaz)","LIAS-200N","Radar ikaz alıcısı"], c: C.cyan },
      { l: "SOFT KILL", sys: ["AREAS-2N (AESA ECM)","NAZAR (Lazer kör etme)","KARTACA-N (130mm NATO)","KALKAN (Saçma/IR)"], c: C.amber },
      { l: "HARD KILL", sys: ["RAM (RIM-116)","CIWS / KORKUT Deniz","ATMIS+ Güdümlü Mermi","GÖKDENİZ"], c: C.red },
    ]},
  { name: "Drone Sürüsü", icon: "🤖", desc: "FPV, kamikaze, keşif, fiber optik kontrollü", severity: 85,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["İHTAR ACAR Radarı","EO/IR Sensör","RF Sinyal Tespit","KAPAN Retinar FAR-AD"], c: C.cyan },
      { l: "SOFT KILL", sys: ["KANGAL-FPV (FPV hedefli)","BUKALEMUN (GNSS aldatma)","SEYMEN (Nav. karıştırma)","ANTIDOT 3-U (İHA→İHA)"], c: C.amber },
      { l: "HARD KILL", sys: ["EJDERHA HPEM (EMP)","GÖKBERK Lazer","KORKUT SPAAG","Sürü karşıtı mühimmat"], c: C.red },
    ]},
  { name: "Torpido Tehdidi", icon: "💣", desc: "DM2A4, Mk48, 533mm/324mm torpidolar", severity: 80,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["HIZIR Çekili Dizi (Triplet)","Gemi/denizaltı sonarları","Helikopter sonobuoy","6 eş zamanlı takip"], c: C.cyan },
      { l: "SOFT KILL", sys: ["HIZIR Çekili Aldatma","ZOKA (LAPIN, MERCAN...)","ZARGANA (Baloncuksuz fırl.)","Akustik gürültü jeneratörü"], c: C.amber },
      { l: "HARD KILL", sys: ["TORK Aktif Avcı (geliştirmede)","Anti-torpido torpido","Aktif güdüm+patlama"], c: C.red },
    ]},
  { name: "Düşman Haberleşme", icon: "📻", desc: "C4ISR ağı, taktik telsiz, veri bağlantısı", severity: 75,
    layers: [
      { l: "TESPİT / DİNLEME", sys: ["PUHU 3-LT (V/UHF)","PUHU 4-LCT (Yarı sabit)","KARAKULAK (HF)","ANKA-S COMINT"], c: C.cyan },
      { l: "KARIŞTIRMA / KESME", sys: ["İLGAR 3-LT/NG (V/UHF)","SANCAK/MİLKAR (HF)","GERGEDAN (Telsiz/GSM)","MİLKAR-3A3 (Mobil)"], c: C.amber },
      { l: "HEDEF TESPİTİ", sys: ["Konum tespiti→Ateş desteği","Yön bulma triangülasyon","EHKKKS koordinasyonu"], c: C.red },
    ]},
];

export default function TehditAnalizi() {
  const [selThreat, setSelThreat] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Tehdit Ciddiyet Seviyesi" glow={C.red}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {threats.map((t,i) => (
            <div key={i} className="hov" onClick={() => setSelThreat(i)} style={{ padding: "12px 14px", borderRadius: 6, cursor: "pointer", transition: "all 0.2s", border: selThreat === i ? `1px solid ${C.cyan}` : `1px solid ${C.border}`, background: selThreat === i ? C.panelHi : "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: FONT }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.textDim, fontFamily: FONT }}>{t.desc}</div>
                </div>
                <Badge color={t.severity > 85 ? C.red : t.severity > 75 ? C.amber : C.green}>SEV {t.severity}</Badge>
              </div>
              <SeverityBar value={t.severity} color={t.severity > 85 ? C.red : t.severity > 75 ? C.amber : C.green} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={`${threats[selThreat].icon} ${threats[selThreat].name} — KATMANLI SAVUNMA ZİNCİRİ`} glow={C.amber}>
        <div style={{ display: "flex", gap: 10 }}>
          {threats[selThreat].layers.map((layer,j) => (
            <div key={j} style={{ flex: 1, position: "relative" }}>
              <div style={{ background: `${layer.c}0a`, border: `1px solid ${layer.c}28`, borderRadius: 8, padding: "14px 14px 12px", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: layer.c, borderRadius: "8px 8px 0 0" }} />
                <div style={{ fontSize: 12, fontWeight: 800, color: layer.c, letterSpacing: 1.5, marginBottom: 10, fontFamily: FONT }}>{layer.l}</div>
                {layer.sys.map((s,k) => (
                  <div key={k} style={{ fontSize: 13, color: C.text, padding: "5px 0", borderBottom: k < layer.sys.length - 1 ? `1px solid ${C.border}` : "none", lineHeight: 1.5, fontFamily: FONT }}>
                    <span style={{ color: layer.c, marginRight: 6 }}>{"▸"}</span>{s}
                  </div>
                ))}
              </div>
              {j < 2 && <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: C.textDim, zIndex: 2, fontWeight: 900 }}>{"→"}</div>}
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="EH Savunma Derinliği — Mesafe Katmanları" glow={C.green}>
        <div style={{ display: "flex", gap: 0, borderRadius: 6, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {[
            { l: "YAKIN TAKTİK", r: "0–30 km", c: C.red, sys: "KANGAL · GERGEDAN · İHTAR\nEJDERHA · GÖKBERK · MERT" },
            { l: "OPERATİF", r: "30–100 km", c: C.amber, sys: "VURAL · İLGAR · AREAS\nHIZIR · NAZAR · PUHU" },
            { l: "STRATEJİK", r: "100–200 km", c: C.green, sys: "KORAL · KORAL 200\nARES · EHKKKS" },
            { l: "UZAK", r: "200+ km", c: C.cyan, sys: "HAVASOJ · AKSUNGUR\nE-7T · İHA SOJ" },
          ].map((z,i) => (
            <div key={i} style={{ flex: 1, padding: "14px 12px", background: `${z.c}08`, borderRight: i < 3 ? `1px solid ${C.border}` : "none", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${z.c}60, ${z.c})` }} />
              <div style={{ fontSize: 12, fontWeight: 800, color: z.c, letterSpacing: 1.2, fontFamily: FONT }}>{z.l}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: "4px 0 8px", fontFamily: MONO }}>{z.r}</div>
              <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.7, whiteSpace: "pre-line", fontFamily: FONT }}>{z.sys}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
