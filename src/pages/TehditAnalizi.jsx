import { useState } from "react";
import { C, glow } from "../theme";
import { Panel, Badge, SeverityBar } from "../components";

const threats = [
  { name: "SAM Radarlari", icon: "📡", desc: "S-300, S-400, Pantsir, NASAMS vb.", severity: 95,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["VURAL (0.4-40 GHz)","EDPOD (Taktik ELINT)","ANTIDOT 2-U/S","ARES-2N","E-7T ESM"], c: C.cyan },
      { l: "SOFT KILL", sys: ["KORAL (150-200 km DRFM)","HAVASOJ (AESA SOJ)","EHPOD (Aktif ECM)","AREAS-2N (32 eş zamanlı)","KORAL 200 (2x güç)"], c: C.amber },
      { l: "HARD KILL", sys: ["SOM Cruise Fuze","HGK/KGK Gudum Kiti","KAAN SEAD Gorevi","Akinci ANTIDOT SEAD"], c: C.red },
    ]},
  { name: "Anti-Gemi Fuzesi", icon: "🚀", desc: "Harpoon, Exocet, P-800, C-802 vb.", severity: 90,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["ARES-2N(V)2 (Geniş bant)","LIAS-200D (Lazer ikaz)","LIAS-200N","Radar ikaz alicisi"], c: C.cyan },
      { l: "SOFT KILL", sys: ["AREAS-2N (AESA ECM)","NAZAR (Lazer kör etme)","KARTACA-N (130mm NATO)","KALKAN (Sacma/IR)"], c: C.amber },
      { l: "HARD KILL", sys: ["RAM (RIM-116)","CIWS / KORKUT Deniz","ATMIS+ Gudumlu Mermi","GOKDENİZ"], c: C.red },
    ]},
  { name: "Drone Surusu", icon: "🤖", desc: "FPV, kamikaze, keşif, fiber optik kontrollü", severity: 85,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["İHTAR ACAR Radari","EO/IR Sensor","RF Sinyal Tespit","KAPAN Retinar FAR-AD"], c: C.cyan },
      { l: "SOFT KILL", sys: ["KANGAL-FPV (FPV hedefli)","BUKALEMUN (GNSS aldatma)","SEYMEN (Nav. karıştırma)","ANTIDOT 3-U (İHA→İHA)"], c: C.amber },
      { l: "HARD KILL", sys: ["EJDERHA HPEM (EMP)","GOKBERK Lazer","KORKUT SPAAG","Suru karşıti muhimmat"], c: C.red },
    ]},
  { name: "Torpido Tehdidi", icon: "💣", desc: "DM2A4, Mk48, 533mm/324mm torpidolar", severity: 80,
    layers: [
      { l: "TESPİT / İKAZ", sys: ["HIZIR Cekili Dizi (Triplet)","Gemi/denizaltı sonarlari","Helikopter sonobuoy","6 eş zamanlı takip"], c: C.cyan },
      { l: "SOFT KILL", sys: ["HIZIR Cekili Aldatma","ZOKA (LAPIN, MERCAN...)","ZARGANA (Baloncuksuz firl.)","Akustik gurultu jeneratoru"], c: C.amber },
      { l: "HARD KILL", sys: ["TORK Aktif Avci (gelistirmede)","Anti-torpido torpido","Aktif gudum+patlama"], c: C.red },
    ]},
  { name: "Düşman Haberleşme", icon: "📻", desc: "C4ISR agi, taktik telsiz, veri bağlantısı", severity: 75,
    layers: [
      { l: "TESPİT / DİNLEME", sys: ["PUHU 3-LT (V/UHF)","PUHU 4-LCT (Yari sabit)","KARAKULAK (HF)","ANKA-S COMINT"], c: C.cyan },
      { l: "KARISTIRMA / KESME", sys: ["ILGAR 3-LT/NG (V/UHF)","SANCAK/MİLKAR (HF)","GERGEDAN (Telsiz/GSM)","MİLKAR-3A3 (Mobil)"], c: C.amber },
      { l: "HEDEF TESPİTİ", sys: ["Konum tespiti→Ates destegi","Yon bulma triangulasyon","EHKKKS koordinasyonu"], c: C.red },
    ]},
];

export default function TehditAnalizi() {
  const [selThreat, setSelThreat] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Tehdit Ciddiyet Seviyesi" glow={C.red}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {threats.map((t,i) => (
            <div key={i} className="hov" onClick={() => setSelThreat(i)} style={{ padding: "8px 10px", borderRadius: 3, cursor: "pointer", transition: "all 0.2s", border: selThreat === i ? `1px solid ${C.cyan}` : `1px solid ${C.border}`, background: selThreat === i ? C.panelHi : "transparent" }}>
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

      <Panel title="EH Savunma Derinligi — Mesafe Katmanlari" glow={C.green}>
        <div style={{ display: "flex", gap: 0, borderRadius: 3, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {[
            { l: "YAKIN TAKTİK", r: "0–30 km", c: C.red, sys: "KANGAL · GERGEDAN · İHTAR\nEJDERHA · GOKBERK · MERT" },
            { l: "OPERATİF", r: "30–100 km", c: C.amber, sys: "VURAL · ILGAR · AREAS\nHIZIR · NAZAR · PUHU" },
            { l: "STRATEJİK", r: "100–200 km", c: C.green, sys: "KORAL · KORAL 200\nARES · EHKKKS" },
            { l: "UZAK", r: "200+ km", c: C.cyan, sys: "HAVASOJ · AKSUNGUR\nE-7T · İHA SOJ" },
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
