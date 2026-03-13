import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts";
import { C, FONT, MONO, glow, ttStyle, growthData } from "../theme";
import { Panel, Stat } from "../components";

const forceData = [
  { name: "Kara Kuvvetleri", short: "KARA", value: 29, color: C.kara, sub: "Haberleşme EH, Karşı-EYP, Karşı-İHA, SIGINT, Radar ES" },
  { name: "Hava Kuvvetleri", short: "HAVA", value: 29, color: C.hava, sub: "KORAL, F-16 EH, İHA Pod, HAVASOJ, Helikopter EH, KAAN" },
  { name: "Deniz Kuvvetleri", short: "DENİZ", value: 18, color: C.deniz, sub: "Gemi/Denizaltı ESM-ECM, Torpido KT, Lazer EH" },
  { name: "AR-GE / Gelecek", short: "AR-GE", value: 7, color: C.arge, sub: "KAAN, TF-2000, MİLDEN, Kognitif EW, Uydu EH" },
];

const statusData = [
  { name: "Envanterde", value: 48, color: C.green },
  { name: "Üretimde / Test", value: 14, color: C.cyan },
  { name: "Geliştirmede", value: 16, color: C.amber },
  { name: "AR-GE / Vizyon", value: 5, color: C.purple },
];

const producers = [
  { name: "ASELSAN", val: 52, pct: 63, color: C.cyan, sub: "Ana EH ekosistem entegratoru" },
  { name: "Meteksan", val: 8, pct: 10, color: C.green, sub: "Lazer EH, Karşı-İHA, Anti-Jam" },
  { name: "EHSİM", val: 6, pct: 7, color: C.amber, sub: "CMDS, SİS, JINN harcama KT" },
  { name: "Diğer (SDT, ATEL, TÜBİTAK...)", val: 17, pct: 20, color: C.textDim, sub: "EDPOD, EHPOD, karıştırıcılar" },
];

export default function GenelBakis() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.35s ease-out" }}>
      <Panel glow={C.cyan}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 4 }}>
          <Stat label="Toplam Sistem" value="83" unit="+" big />
          <Stat label="ASELSAN Gelir" value="4.11" unit="B$" color={C.amber} big />
          <Stat label="Sipariş Defteri" value="20.4" unit="B$" color={C.green} big />
          <Stat label="İhracat" value="410" unit="M€" color={C.amber} big />
          <Stat label="Yerlileştirme" value="80" unit="%" color={C.green} big />
          <Stat label="İhracat Ülke" value="6" unit="+" color={C.purple} big />
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel title="Kuvvet Bazlı Dağılım" glow={C.cyan}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={forceData} cx="50%" cy="50%" innerRadius={48} outerRadius={80} dataKey="value" stroke={C.bg} strokeWidth={3}>
              {forceData.map((e,i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip contentStyle={ttStyle} formatter={v=>[`${v} sistem`]} /></PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {forceData.map((d,i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", background: `${d.color}0a`, borderRadius: 6, border: `1px solid ${d.color}18` }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, boxShadow: glow(d.color, 8) }} />
                <span style={{ fontSize: 13, color: C.white, fontWeight: 700, flex: "0 0 70px", fontFamily: FONT }}>{d.short}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: d.color, fontFamily: MONO }}>{d.value}</span>
                <span style={{ fontSize: 12, color: C.textDim, marginLeft: "auto", fontFamily: FONT }}>{d.sub.substring(0,35)}...</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Durum Bazlı Dağılım" glow={C.green}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={48} outerRadius={80} dataKey="value" stroke={C.bg} strokeWidth={3}>
              {statusData.map((e,i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip contentStyle={ttStyle} formatter={v=>[`${v} sistem`]} /></PieChart>
          </ResponsiveContainer>
          {statusData.map((d,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, boxShadow: glow(d.color, 6) }} />
              <span style={{ fontSize: 13, color: C.textDim, flex: 1, fontFamily: FONT }}>{d.name}</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: d.color, fontFamily: MONO }}>{d.value}</span>
              <div style={{ width: 70, height: 5, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${(d.value/83)*100}%`, height: "100%", background: d.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Panel>
      </div>

      <Panel title="Üretici Firma Dağılımı" sub="ASELSAN tek başına ekosistemin %63'ünü oluşturuyor" glow={C.amber}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {producers.map((p,i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 45px 40px", alignItems: "center", gap: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: FONT }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 1, fontFamily: FONT }}>{p.sub}</div>
              </div>
              <div style={{ height: 16, background: C.border, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p.pct}%`, background: `linear-gradient(90deg, ${p.color}80, ${p.color})`, borderRadius: 4, boxShadow: glow(p.color, 6) }} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: p.color, textAlign: "right", fontFamily: MONO }}>{p.val}</span>
              <span style={{ fontSize: 12, color: C.textDim, fontFamily: MONO }}>%{p.pct}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Sistem Büyüme Trendi" sub="2016-2030 yerli EH sistemlerinin birikimli artışı" glow={C.cyan}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={growthData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs><linearGradient id="gCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.3} /><stop offset="100%" stopColor={C.cyan} stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <YAxis tick={{ fill: C.textDim, fontSize: 12, fontFamily: "Inter, sans-serif" }} stroke={C.border} />
            <Tooltip contentStyle={ttStyle} />
            <Area type="monotone" dataKey="systems" stroke={C.cyan} strokeWidth={2} fill="url(#gCyan)" dot={{ r: 4, fill: C.cyan, stroke: C.bg, strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { icon: "📡", t: "Radar EH", n: "6", d: "KORAL, VURAL, KORAL 200", c: C.hava },
          { icon: "📻", t: "Haberleşme EH", n: "10+", d: "İLGAR, SANCAK, GERGEDAN", c: C.kara },
          { icon: "🔍", t: "SIGINT", n: "8+", d: "PUHU, KARAKULAK, ANKA-S/I", c: C.amber },
          { icon: "✈️", t: "Hava Öz-Koruma", n: "12+", d: "SPEWS, IVEWS, FEWS, HEWS", c: C.hava },
          { icon: "🛸", t: "İHA EH Pod", n: "10+", d: "ANTİDOT ailesi, FEWS-U", c: C.hava },
          { icon: "⚡", t: "Stratejik SOJ", n: "4", d: "HAVASOJ, İHA SOJ, ASOJ", c: C.hava },
          { icon: "🚢", t: "Deniz ESM/ECM", n: "12+", d: "ARES, AREAS, KARTACA", c: C.deniz },
          { icon: "🔊", t: "Torpido KT", n: "6+", d: "HIZIR, ZARGANA, TORK", c: C.deniz },
          { icon: "⚔️", t: "Yönlendirilmiş Enerji", n: "3+", d: "EJDERHA HPEM, GÖKBERK", c: C.red },
        ].map((x,i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, ${x.c}0a 0%, ${x.c}04 100%)`,
            border: `1px solid ${x.c}20`,
            borderRadius: 8,
            padding: "12px 14px",
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>{x.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white, fontFamily: FONT }}>{x.t}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: x.c, fontFamily: MONO }}>{x.n}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.textDim, marginTop: 4, fontFamily: FONT }}>{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
