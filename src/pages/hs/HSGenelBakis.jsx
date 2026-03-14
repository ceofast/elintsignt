import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { C, FONT, MONO, glow, ttStyle, forceColor } from "../../theme";
import { Panel, Stat, ForceTag } from "../../components";

const forceData = [
  { name: "Kara Kuvvetleri", value: 8, fill: C.kara },
  { name: "Hava Kuvvetleri", value: 6, fill: C.hava },
  { name: "Deniz Kuvvetleri", value: 4, fill: C.deniz },
  { name: "AR-GE / Geliştirme", value: 3, fill: C.arge },
];

const statusData = [
  { name: "Aktif Envanter", value: 14, fill: C.green },
  { name: "Seri Üretim", value: 4, fill: C.cyan },
  { name: "Geliştirme", value: 3, fill: C.amber },
];

const growthData = [
  { year: "2016", systems: 2 },
  { year: "2018", systems: 4 },
  { year: "2020", systems: 6 },
  { year: "2022", systems: 10 },
  { year: "2024", systems: 15 },
  { year: "2025", systems: 21 },
  { year: "2026", systems: 26 },
  { year: "2028", systems: 32 },
  { year: "2030", systems: 40 },
];

const producers = [
  { name: "ASELSAN", count: 9, role: "Radar, C4I, CIWS, Lazer" },
  { name: "ROKETSAN", count: 7, role: "Füze, MANPADS, SHORAD" },
  { name: "TÜBİTAK SAGE", count: 4, role: "Güdüm, AAM, Arayıcı" },
  { name: "HAVELSAN", count: 2, role: "Simülasyon, Yazılım" },
];

const celikKubbeLayers = [
  { name: "ÇOK KISA", range: "0–8 km", color: C.red, systems: "SUNGUR, GÖKBERK" },
  { name: "KISA", range: "4–15 km", color: C.amber, systems: "KORKUT, HİSAR-A+, GÜRZ" },
  { name: "ORTA", range: "25–40+ km", color: C.cyan, systems: "HİSAR-O+ IIR/RF" },
  { name: "UZUN", range: "100–180+ km", color: C.purple, systems: "SİPER Blok 1/2/3" },
];

const keyContracts = [
  { label: "Çelik Kubbe Ana Sözleşme", value: "$6.5B", year: "2025", color: C.amber },
  { label: "ASELSAN Seri Üretim", value: "$1.9B", year: "2025", color: C.cyan },
  { label: "HİSAR/SİPER Üretim", value: "$1.5B", year: "2023", color: C.green },
  { label: "İlk Teslimat Paketi", value: "$460M", year: "2025", color: C.hava },
];

export default function HSGenelBakis() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.35s ease-out" }}>
      {/* Top Stats */}
      <div className="rg-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        <Panel glow={C.amber}>
          <Stat label="Yerli Sistem" value="21" unit="+" color={C.amber} />
        </Panel>
        <Panel glow={C.cyan}>
          <Stat label="Çelik Kubbe Katmanı" value="4" color={C.cyan} />
        </Panel>
        <Panel glow={C.green}>
          <Stat label="Aktif Envanter" value="14" color={C.green} />
        </Panel>
        <Panel glow={C.purple}>
          <Stat label="Maks Menzil" value="180" unit="km+" color={C.purple} />
        </Panel>
      </div>

      {/* Çelik Kubbe Layers */}
      <Panel title="Çelik Kubbe — Katmanlı Hava Savunma Mimarisi" sub="SUNGUR'dan SİPER'e kadar entegre savunma ağı" glow={C.amber}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {celikKubbeLayers.map((layer, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              background: `${layer.color}08`, border: `1px solid ${layer.color}20`,
              borderRadius: 4, borderLeft: `4px solid ${layer.color}`,
            }}>
              <div style={{ minWidth: 70 }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: layer.color, fontFamily: FONT }}>{layer.name}</div>
                <div style={{ fontSize: 12, color: C.textDim, fontFamily: MONO }}>{layer.range}</div>
              </div>
              <div style={{
                flex: 1, height: 8, background: C.border, borderRadius: 4, overflow: "hidden", position: "relative",
              }}>
                <div style={{
                  width: `${[15, 30, 55, 100][i]}%`, height: "100%",
                  background: `linear-gradient(90deg, ${layer.color}60, ${layer.color})`,
                  borderRadius: 4, boxShadow: glow(layer.color, 6),
                }} />
              </div>
              <div style={{ fontSize: 11, color: C.text, minWidth: 160, textAlign: "right", fontFamily: FONT }}>{layer.systems}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <span style={{ fontSize: 11, color: C.amber, fontWeight: 700, background: `${C.amber}12`, padding: "4px 12px", borderRadius: 4, border: `1px solid ${C.amber}25`, fontFamily: FONT }}>
            HERİKKS C4I ile entegre · Yapay zekâ destekli karar destek
          </span>
        </div>
      </Panel>

      {/* Charts Row */}
      <div className="rg-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Panel title="Kuvvet Dağılımı" glow={C.cyan}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={forceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value" stroke={C.bg} strokeWidth={2}>
                {forceData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip contentStyle={ttStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 4 }}>
            {forceData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.fill }} />
                <span style={{ color: C.textDim }}>{d.name.split(" ")[0]} ({d.value})</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Sistem Durumu" glow={C.green}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value" stroke={C.bg} strokeWidth={2}>
                {statusData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip contentStyle={ttStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 4 }}>
            {statusData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.fill }} />
                <span style={{ color: C.textDim }}>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Growth Chart */}
      <Panel title="Yerli Hava Savunma Sistemi Büyüme Eğrisi" sub="2016–2030 birikimli artış (tahmin dahil)" glow={C.amber}>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gHS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.amber} stopOpacity={0.25} />
                <stop offset="100%" stopColor={C.amber} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 11, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="systems" stroke={C.amber} strokeWidth={2} fill="url(#gHS)" dot={{ r: 3, fill: C.amber, stroke: C.bg, strokeWidth: 2 }} name="Sistem Sayısı" />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      {/* Producers */}
      <Panel title="Ana Sanayii Kuruluşları" glow={C.cyan}>
        <div className="rg-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
          {producers.map((p, i) => (
            <div key={i} className="hov" style={{ background: `${C.cyan}06`, border: `1px solid ${C.border}`, borderRadius: 5, padding: "10px", textAlign: "center", cursor: "default", transition: "all 0.2s" }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: C.white }}>{p.name}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.cyan, textShadow: glow(C.cyan), margin: "4px 0" }}>{p.count}</div>
              <div style={{ fontSize: 10, color: C.textDim }}>{p.role}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Key Contracts */}
      <Panel title="Kritik Sözleşmeler" sub="Hava savunma alanındaki büyük tedarik sözleşmeleri" glow={C.amber}>
        <div className="rg-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
          {keyContracts.map((c, i) => (
            <div key={i} style={{ background: `${c.color}06`, border: `1px solid ${c.color}20`, borderRadius: 4, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: c.color, textShadow: glow(c.color) }}>{c.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.white, margin: "4px 0", fontFamily: FONT }}>{c.label}</div>
              <div style={{ fontSize: 10, color: C.textDim }}>{c.year}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Bottom Stats */}
      <div className="rg-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        {[
          { l: "HAWK Değiştirme", v: "HİSAR-O+", s: "MIM-23 envanter çıkışı", c: C.kara },
          { l: "S-400 Durumu", v: "PASİF", s: "F-35 programı için iade görüşmeleri", c: C.red },
          { l: "2025 İhracat", v: "$8.5B", s: "Toplam savunma ihracatı", c: C.amber },
          { l: "TF-2000 Teslim", v: "2030", s: "Hava savunma muhribi", c: C.deniz },
        ].map((x, i) => (
          <Panel key={i} glow={x.c}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1, textTransform: "uppercase" }}>{x.l}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: x.c, textShadow: glow(x.c) }}>{x.v}</div>
              <div style={{ fontSize: 10, color: C.textDim }}>{x.s}</div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
