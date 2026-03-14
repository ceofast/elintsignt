import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { C, FONT, ttStyle } from "../../theme";
import { Panel, HeatCell } from "../../components";

const heatmapSystems = [
  { name: "SUNGUR", s: [.9, .7, .2, 0, 0, .8, .5, .3, 0, 0] },
  { name: "KORKUT", s: [.8, .9, .5, .3, 0, .7, .6, .4, .1, 0] },
  { name: "GÖKDENİZ", s: [.7, .8, .6, .3, 0, .5, .7, .5, .1, 0] },
  { name: "HİSAR-A+", s: [.5, .8, .7, .5, 0, .4, .6, .5, .2, 0] },
  { name: "HİSAR-O+ IIR", s: [.2, .5, .8, .8, .1, .2, .3, .6, .4, .1] },
  { name: "HİSAR-O+ RF", s: [.2, .5, .9, .9, .2, .2, .3, .7, .5, .2] },
  { name: "SİPER B1", s: [0, .2, .7, 1, .4, 0, .1, .5, .7, .5] },
  { name: "SİPER B2", s: [0, .1, .8, 1, .5, 0, .1, .5, .8, .6] },
  { name: "SİPER B3", s: [0, .1, .8, 1, .7, 0, 0, .4, .9, .8] },
  { name: "GÜRZ", s: [.9, .9, .6, .3, 0, .8, .7, .4, .1, 0] },
  { name: "GÖKBERK", s: [1, .8, 0, 0, 0, .9, .3, 0, 0, 0] },
  { name: "Bozdoğan", s: [.3, .5, .4, .9, 0, .2, .3, .8, .2, 0] },
  { name: "Gökdoğan", s: [0, .3, .6, 1, .2, 0, .1, .7, .4, .2] },
];

const heatmapThreats = ["FPV", "İHA", "Cruise", "Savaş Uç.", "Balistik", "Sürü Dr.", "Helikop.", "Hava Üst.", "BM Sav.", "Uzay"];

const threatScenario = [
  { t: "FPV Drone", vshorad: 9, shorad: 5, mrad: 2, lrad: 0 },
  { t: "Taktik İHA", vshorad: 7, shorad: 8, mrad: 5, lrad: 2 },
  { t: "Cruise Füze", vshorad: 2, shorad: 6, mrad: 8, lrad: 7 },
  { t: "Savaş Uçağı", vshorad: 0, shorad: 3, mrad: 8, lrad: 10 },
  { t: "Balistik F.", vshorad: 0, shorad: 0, mrad: 2, lrad: 5 },
  { t: "Sürü Drone", vshorad: 8, shorad: 7, mrad: 2, lrad: 0 },
  { t: "Helikopter", vshorad: 5, shorad: 6, mrad: 3, lrad: 1 },
  { t: "Hava Üst.", vshorad: 3, shorad: 5, mrad: 6, lrad: 5 },
];

export default function HSEtkinlikMatrisi() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      <Panel title="Sistem × Tehdit Heat Map" sub="Her sistemin her tehdit türüne karşı etkinlik yoğunluğu (0-100)" glow={C.cyan}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "inline-block", minWidth: 600 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 3, paddingLeft: 100 }}>
              {heatmapThreats.map((s, i) => (
                <div key={i} style={{ width: 28, textAlign: "center", fontSize: 10, color: C.textDim, fontWeight: 600, transform: "rotate(-45deg)", transformOrigin: "center", height: 28, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>{s}</div>
              ))}
            </div>
            {heatmapSystems.map((sys, i) => (
              <div key={i} style={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
                <div style={{ width: 96, fontSize: 12, fontWeight: 700, color: C.white, textAlign: "right", paddingRight: 4, whiteSpace: "nowrap" }}>{sys.name}</div>
                {sys.s.map((v, j) => <HeatCell key={j} v={v} />)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 10 }}>
          {[
            { l: "Düşük (1-30)", bg: "rgba(90,122,154,0.25)" },
            { l: "Orta (31-70)", bg: "rgba(255,179,0,0.35)" },
            { l: "Yüksek (71-100)", bg: "rgba(0,229,255,0.55)" },
          ].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: FONT }}>
              <div style={{ width: 14, height: 10, background: x.bg, borderRadius: 1, border: `1px solid ${C.border}` }} />
              <span style={{ color: C.textDim }}>{x.l}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Tehdit Bazlı Kapsama Yoğunluğu" sub="Her tehdit türüne karşı katmanlı sistem etkinliği" glow={C.amber}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={threatScenario} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="t" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Bar dataKey="vshorad" stackId="a" fill={C.red} name="VSHORAD" />
            <Bar dataKey="shorad" stackId="a" fill={C.amber} name="SHORAD" />
            <Bar dataKey="mrad" stackId="a" fill={C.cyan} name="MRAD" />
            <Bar dataKey="lrad" stackId="a" fill={C.purple} name="LRAD" radius={[3, 3, 0, 0]} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter, sans-serif" }} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
