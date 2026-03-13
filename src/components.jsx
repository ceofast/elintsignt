import { C, FONT, MONO, glow } from "./theme";

export const Panel = ({ children, title, sub, glow: g, noPad, style = {} }) => (
  <div style={{
    background: `linear-gradient(135deg, ${C.panel} 0%, ${C.bg3} 100%)`,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    backdropFilter: "blur(10px)",
    ...style,
  }}>
    {g && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${g}, transparent)`, boxShadow: `0 0 16px ${g}40` }} />}
    {title && (
      <div style={{ padding: "14px 18px 10px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 3, height: 16, background: g || C.cyan, borderRadius: 2, boxShadow: glow(g || C.cyan, 10) }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: C.white, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: FONT }}>{title}</span>
          </div>
          {sub && <div style={{ fontSize: 12, color: C.textDim, marginTop: 4, paddingLeft: 11, fontFamily: FONT }}>{sub}</div>}
        </div>
      </div>
    )}
    <div style={{ padding: noPad ? 0 : 18 }}>{children}</div>
  </div>
);

export const Stat = ({ label, value, unit, color = C.cyan, big }) => (
  <div style={{ textAlign: "center", padding: big ? "16px 8px" : "10px 6px" }}>
    <div style={{ fontFamily: MONO, fontSize: big ? 40 : 30, fontWeight: 800, color, lineHeight: 1, textShadow: glow(color) }}>
      {value}<span style={{ fontSize: big ? 18 : 14, fontWeight: 400, opacity: 0.6 }}>{unit}</span>
    </div>
    <div style={{ fontSize: 11, color: C.textDim, marginTop: 6, textTransform: "uppercase", letterSpacing: 1.2, fontFamily: FONT, fontWeight: 600 }}>{label}</div>
  </div>
);

export const Badge = ({ children, color }) => (
  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, color: "#fff", background: color, fontFamily: FONT, letterSpacing: 0.5 }}>{children}</span>
);

export const ForceTag = ({ force }) => {
  const m = { kara: [C.kara,"KARA"], hava: [C.hava,"HAVA"], deniz: [C.deniz,"DENİZ"], arge: [C.arge,"AR-GE"] };
  const [c, l] = m[force] || [C.textDim, force];
  return <Badge color={c}>{l}</Badge>;
};

export const SeverityBar = ({ value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ flex: 1, height: 7, background: C.border, borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: `linear-gradient(90deg, ${color}80, ${color})`, borderRadius: 4, transition: "width 1s ease-out", boxShadow: glow(color, 8) }} />
    </div>
    <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: MONO, minWidth: 32, textAlign: "right" }}>{value}%</span>
  </div>
);

export const HeatCell = ({ v, maxV = 1 }) => {
  if (v === 0) return <div style={{ width: 32, height: 22, background: C.bg2, borderRadius: 2, border: `1px solid ${C.border}` }} />;
  const intensity = v / maxV;
  const bg = intensity > 0.7 ? `rgba(0,212,255,${0.3 + intensity * 0.5})` : intensity > 0.3 ? `rgba(255,179,0,${0.2 + intensity * 0.4})` : `rgba(107,141,181,${0.15 + intensity * 0.3})`;
  return <div style={{ width: 32, height: 22, background: bg, borderRadius: 2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <span style={{ fontSize: 10, fontWeight: 700, color: intensity > 0.5 ? C.white : C.textDim, fontFamily: MONO }}>{Math.round(v * 100)}</span>
  </div>;
};

export const TreeCell = ({ x, y, width, height, name, fill, cat }) => {
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect x={x+1} y={y+1} width={width-2} height={height-2} fill={fill} stroke={C.bg} strokeWidth={2} rx={3} opacity={0.8} />
      {width > 50 && height > 28 && <>
        <text x={x+width/2} y={y+height/2-4} textAnchor="middle" fill="#fff" fontSize={width > 75 ? 13 : 11} fontWeight="700" fontFamily="Inter, sans-serif">{name}</text>
        <text x={x+width/2} y={y+height/2+10} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={10} fontFamily="Inter, sans-serif">{cat}</text>
      </>}
    </g>
  );
};
