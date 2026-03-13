import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { C, FONT, MONO, ttStyle } from "../theme";
import { Panel, Badge } from "../components";

const radarScenario = [
  { s: "SEAD/DEAD", kara: 3, hava: 12, deniz: 0, total: 15 },
  { s: "Konv. Savaş", kara: 12, hava: 10, deniz: 6, total: 28 },
  { s: "Asimetrik", kara: 10, hava: 4, deniz: 0, total: 14 },
  { s: "Karşı-İHA", kara: 7, hava: 2, deniz: 3, total: 12 },
  { s: "Karşı-EYP", kara: 8, hava: 0, deniz: 0, total: 8 },
  { s: "Sınır Güv.", kara: 8, hava: 4, deniz: 0, total: 12 },
  { s: "Deniz Hak.", kara: 0, hava: 2, deniz: 12, total: 14 },
  { s: "Denizaltı", kara: 0, hava: 1, deniz: 8, total: 9 },
  { s: "SIGINT", kara: 5, hava: 8, deniz: 3, total: 16 },
  { s: "EP", kara: 3, hava: 8, deniz: 5, total: 16 },
];

const scenarioFull = [
  { id: "sead", name: "SEAD / DEAD", icon: "🎯", count: 15, color: C.red,
    desc: "Düşman entegre hava savunma sistemi (IADS) baskılama ve imha", priority: "KRİTİK",
    flow: "VURAL/EDPOD radar tespit → KORAL/HAVASOJ karıştırma → SOM/HGK kinetik imha → ANTIDOT ES+EA İHA SEAD",
    primary: ["KORAL","HAVASOJ","EDPOD","EHPOD","SPEWS-II","FEWS-U","ANTIDOT ES+EA","İHA SOJ","ASOJ-234U"],
    secondary: ["VURAL","KORAL 200","ANTIDOT 2-U/S","IVEWS","SİS","YILDIRIM 300"],
    tactics: "KORAL 150-200 km mesafeden SAM radarlarini baskilar. HAVASOJ filoya EH şemsiye acar. EDPOD taktik ELINT ile radar konumlamasi yapar. Akinci ANTIDOT pod ciftiyle insansız SEAD icra eder. Kizelelma FEWS-U ile otonom penetrasyon sağlar." },
  { id: "conv", name: "Konvansiyonel Savaş", icon: "⚔️", count: 28, color: C.amber,
    desc: "Devletler arasi tam ölçekli muharebe; tum kuvvetler eş zamanlı", priority: "KRİTİK",
    flow: "EHKKKS C2 koordinasyonu → Radar EH (KORAL/VURAL) + Hab. EH (ILGAR/SANCAK) → Hava (HAVASOJ/SPEWS) → Deniz (ARES/AREAS)",
    primary: ["KORAL","VURAL","ILGAR","SANCAK","HAVASOJ","SPEWS-II","IVEWS","AREAS-2N","EHKKKS","HEWS"],
    secondary: ["KANGAL-FPV","AKKOR","GERGEDAN","HIZIR","KARTACA-N","MİLKAR","NAZAR","FEWS","SİS"],
    tactics: "EHKKKS tum EH varliklarini karargah seviyesinde koordine eder. KORAL/VURAL düşman radar agini çökertirir. ILGAR/SANCAK haberleşmeyi keser. HAVASOJ cephe boyunca EH koridoru acar. Denizde AREAS filo savunmasi sağlar." },
  { id: "cuav", name: "Karşı-İHA / Drone Savunma", icon: "🛡️", count: 12, color: C.cyan,
    desc: "FPV, kamikaze, keşif ve sürü dronlarına karşı çok katmanlı savunma", priority: "YÜKSEK",
    flow: "İHTAR ACAR radar tespit → EO takip → RF karıştırma (KANGAL-FPV/BUKALEMUN) → HPEM (EJDERHA) → Lazer (GOKBERK)",
    primary: ["İHTAR","EJDERHA","KANGAL-FPV","BUKALEMUN","GOKBERK","KAPAN","ANTIDOT 3-U"],
    secondary: ["SEYMEN","GERGEDAN","ILGAR 3-LT","NAZAR Kompakt"],
    tactics: "İHTAR ACAR radarıyla tespit, EO ile takip eder. RF karıştırma ile kumanda bağlantısı kesilir. BUKALEMUN GNSS aldatma ile dronları saptırır. Fiber optik kontrollü dronlara EJDERHA HPEM ile fiziksel hasar verilir. GOKBERK lazer ile kinetik imha sağlar." },
  { id: "asym", name: "Asimetrik / Terorle Mücadele", icon: "🏔️", count: 14, color: C.kara,
    desc: "Teror örgütlerine karşı sınır ötesi ve iç güvenlik operasyonlari", priority: "YÜKSEK",
    flow: "PUHU/KARAKULAK dinleme → ANKA-S/I havadan SIGINT → GERGEDAN haberleşme kesme → KANGAL EYP korumasi",
    primary: ["KANGAL","GERGEDAN","PUHU 3-LT","KARAKULAK","ANKA-S","ANKA-I","ANTIDOT Mini","EJDERHA"],
    secondary: ["MERT","MERTER","AKSUNGUR","HEWS","ASES"],
    tactics: "PUHU ve KARAKULAK düşman haberleşmesin dinler ve konum tespiti yapar. ANKA-S/ANKA-I havadan SIGINT sağlar. GERGEDAN düşman telsizlerini karıştırır. KANGAL konvoyları EYP'lerden korur. ANTIDOT Mini TB2'leri tehditlerden korur." },
  { id: "naval", name: "Deniz Hakimiyeti", icon: "🚢", count: 18, color: C.deniz,
    desc: "Deniz muharebesi, amfibi çıkarma, filo savunmasi, ticaret yolu güvenliği", priority: "KRİTİK",
    flow: "ARES ESM tespit → AREAS ECM karıştırma → NAZAR lazer kör etme → KARTACA/KALKAN saçma → HIZIR torpido KT",
    primary: ["ARES-2N","AREAS-2N","KARTACA-N","NAZAR","HIZIR 100-N","KALKAN","MARLIN EW 100","LIAS"],
    secondary: ["HAVASOJ","TCG Ufuk","AKSUNGUR"],
    tactics: "ARES düşman gemilerinin radar emisyonlarını anlık tespit ve sınıflandırır. AREAS 32 eş zamanlı tehdide karıştırma/aldatma yapar. NAZAR EO/IR güdümlü füzeleri kör eder. KARTACA/KALKAN saçma fırlatır. HIZIR torpidoları aldatir. MARLIN EW 100 insansız on cephe EH sağlar." },
  { id: "sigint", name: "SIGINT / İstihbarat", icon: "🔍", count: 16, color: C.purple,
    desc: "Stratejik ve taktik sinyal istihbarati toplama, analiz, arşivleme", priority: "YÜKSEK",
    flow: "TCG Ufuk deniz SIGINT → PUHU/KARAKULAK kara COMINT → EDPOD/E-7T hava ELINT → HAVASOJ geniş bant",
    primary: ["TCG Ufuk","PUHU","KARAKULAK","EDPOD","ANKA-S","ANKA-I","AKSUNGUR","E-7T","HAVASOJ","VURAL"],
    secondary: ["ANTIDOT 2-U/S","ARES","SDT SIGINT","MARLIN EW 100"],
    tactics: "TCG Ufuk 7/24 deniz SIGINT yapar. PUHU/KARAKULAK kara sınırlarında COMINT toplar. EDPOD F-16'dan taktik ELINT toplar ve Link-16 ile paylaşır. ANKA-I MİT özel SIGINT platformudur. AKSUNGUR 50+ saat havada SIGINT yapar. HAVASOJ geniş bant COMINT/ELINT toplar." },
];

export default function SenaryoMerkezi() {
  const [selScenario, setSelScenario] = useState(0);

  const s = scenarioFull[selScenario];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Kuvvet x Senaryo Radar Analizi" glow={C.cyan}>
        <ResponsiveContainer width="100%" height={340}>
          <RadarChart data={radarScenario}>
            <PolarGrid stroke={C.border} />
            <PolarAngleAxis dataKey="s" tick={{ fill: C.text, fontSize: 12, fontFamily: "Inter, sans-serif" }} />
            <PolarRadiusAxis tick={{ fill: C.textDim, fontSize: 10 }} />
            <Radar name="Kara" dataKey="kara" stroke={C.kara} fill={C.kara} fillOpacity={0.15} strokeWidth={2} />
            <Radar name="Hava" dataKey="hava" stroke={C.hava} fill={C.hava} fillOpacity={0.15} strokeWidth={2} />
            <Radar name="Deniz" dataKey="deniz" stroke={C.deniz} fill={C.deniz} fillOpacity={0.15} strokeWidth={2} />
            <Legend wrapperStyle={{ fontSize: 13, fontFamily: "Inter, sans-serif" }} />
            <Tooltip contentStyle={ttStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Senaryo Detay Paneli" sub="Bir senaryo seçerek akış diyagrami, sistem listesi ve taktik aciklamayi görüntüleyin" glow={C.amber}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {scenarioFull.map((sc,i) => (
            <button key={i} onClick={() => setSelScenario(i)} style={{
              padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT, transition: "all 0.15s", whiteSpace: "nowrap",
              border: selScenario === i ? `1px solid ${sc.color}` : `1px solid ${C.border}`,
              background: selScenario === i ? `${sc.color}20` : C.bg2,
              color: selScenario === i ? sc.color : C.textDim,
            }}>{sc.icon} {sc.name}</button>
          ))}
        </div>

        <div style={{ background: `${s.color}0a`, border: `1px solid ${s.color}30`, borderRadius: 8, padding: 20, animation: "slideIn 0.3s ease-out" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 38 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.white, letterSpacing: 1, fontFamily: FONT }}>{s.name}</div>
              <div style={{ fontSize: 14, color: s.color, fontWeight: 700, marginTop: 2, fontFamily: MONO }}>{s.count} aktif sistem</div>
              <div style={{ fontSize: 13, color: C.text, marginTop: 4, lineHeight: 1.5, fontFamily: FONT }}>{s.desc}</div>
            </div>
            <Badge color={s.priority === "KRİTİK" ? C.red : C.amber}>{s.priority}</Badge>
          </div>

          <div style={{ background: C.bg2, borderRadius: 6, padding: "12px 16px", marginBottom: 14, border: `1px solid ${C.borderHi}` }}>
            <div style={{ fontSize: 11, color: C.cyan, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, fontFamily: FONT }}>{"◉"} OPERASYONEL AKIŞ</div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontFamily: FONT }}>{s.flow}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: s.color, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, fontFamily: FONT }}>BİRİNCİL SİSTEMLER</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {s.primary.map((p,j) => (
                  <span key={j} style={{ fontSize: 12, padding: "4px 10px", background: `${s.color}18`, border: `1px solid ${s.color}35`, borderRadius: 4, color: C.white, fontWeight: 600, fontFamily: FONT }}>{p}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.textDim, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, fontFamily: FONT }}>İKİNCİL / DESTEK</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {s.secondary.map((p,j) => (
                  <span key={j} style={{ fontSize: 12, padding: "4px 10px", background: `${C.textDim}12`, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textDim, fontFamily: FONT }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: C.bg2, borderRadius: 6, padding: "12px 16px", border: `1px solid ${C.borderHi}` }}>
            <div style={{ fontSize: 11, color: C.amber, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, fontFamily: FONT }}>{"◆"} TAKTİK AÇIKLAMA</div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontFamily: FONT }}>{s.tactics}</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
