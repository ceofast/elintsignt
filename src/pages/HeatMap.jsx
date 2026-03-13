import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { C, FONT, MONO, ttStyle } from "../theme";
import { Panel, HeatCell } from "../components";

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

const heatmapSystems = [
  { name: "KORAL", s: [1,1,0,.3,0,.3,0,0,0,.2,1,0,.4,.8,.3,0] },
  { name: "HAVASOJ", s: [1,1,0,0,0,0,.4,0,1,0,.4,0,1,1,0,0] },
  { name: "KANGAL", s: [0,.2,1,0,1,.3,0,0,0,0,0,.5,.3,.5,0,0] },
  { name: "İHTAR", s: [0,0,0,1,0,.4,0,0,0,0,0,1,.3,.4,0,0] },
  { name: "EJDERHA", s: [0,.3,.4,1,0,.3,0,0,0,0,0,1,.3,0,0,0] },
  { name: "ANTIDOT", s: [.6,.5,.4,.5,0,.3,0,0,1,.8,0,0,.3,.8,0,0] },
  { name: "ARES/AREAS", s: [0,.4,0,0,0,0,1,.4,.6,.4,0,0,.6,.6,0,0] },
  { name: "HIZIR/ZARGANA", s: [0,.3,0,0,0,0,.8,1,0,0,0,0,.5,.6,0,0] },
  { name: "NAZAR", s: [0,.3,0,0,0,0,1,0,0,.5,0,0,.5,.5,0,0] },
  { name: "SPEWS/IVEWS", s: [.8,1,0,0,0,0,0,0,0,1,0,0,.8,.3,0,0] },
  { name: "FEWS-U", s: [1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0] },
  { name: "PUHU/KARAKULAK", s: [0,.3,.8,0,0,1,0,0,1,0,0,.5,.3,0,0,0] },
  { name: "VURAL", s: [.4,1,.3,0,0,.8,0,0,.5,.2,1,0,.4,.6,.3,0] },
  { name: "GÖKBERK", s: [0,.3,0,1,0,0,0,0,0,0,0,.8,0,0,0,0] },
  { name: "MARLIN EW", s: [0,0,0,0,0,0,.8,.4,.5,0,0,0,.6,.7,0,0] },
];

const heatmapScenarios = ["SEAD","Konv.","Asim.","K-İHA","K-EYP","Sınır","Deniz","D.altı","SIGINT","EP","HSB","VIP","NATO","İhraç.","Eğit.","Uzay"];

export default function HeatMapPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Sistem x Senaryo Heat Map" sub="Her sistemin her senaryodaki etkinlik yoğunluğu (0-100)" glow={C.cyan}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "inline-block", minWidth: 650 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 4, paddingLeft: 120 }}>
              {heatmapScenarios.map((s,i) => (
                <div key={i} style={{ width: 32, textAlign: "center", fontSize: 9, color: C.textDim, fontWeight: 600, fontFamily: FONT, transform: "rotate(-45deg)", transformOrigin: "center", height: 32, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>{s}</div>
              ))}
            </div>
            {heatmapSystems.map((sys,i) => (
              <div key={i} style={{ display: "flex", gap: 3, alignItems: "center", marginBottom: 3 }}>
                <div style={{ width: 116, fontSize: 12, fontWeight: 700, color: C.white, textAlign: "right", paddingRight: 6, whiteSpace: "nowrap", fontFamily: FONT }}>{sys.name}</div>
                {sys.s.map((v,j) => <HeatCell key={j} v={v} />)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 14 }}>
          {[
            { l: "Düşük (1-30)", bg: "rgba(107,141,181,0.25)" },
            { l: "Orta (31-70)", bg: "rgba(255,179,0,0.35)" },
            { l: "Yüksek (71-100)", bg: "rgba(0,212,255,0.55)" },
          ].map((x,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: FONT }}>
              <div style={{ width: 16, height: 12, background: x.bg, borderRadius: 2, border: `1px solid ${C.border}` }} />
              <span style={{ color: C.textDim }}>{x.l}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Senaryo Bazlı Toplam Sistem Yoğunluğu" glow={C.amber}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={radarScenario} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="s" tick={{ fill: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Bar dataKey="kara" stackId="a" fill={C.kara} name="Kara" />
            <Bar dataKey="hava" stackId="a" fill={C.hava} name="Hava" />
            <Bar dataKey="deniz" stackId="a" fill={C.deniz} name="Deniz" radius={[3, 3, 0, 0]} />
            <Legend wrapperStyle={{ fontSize: 13, fontFamily: "Inter, sans-serif" }} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
