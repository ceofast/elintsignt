export const C = {
  bg: "#040a12", bg2: "#0a1220", bg3: "#0e1a2e",
  panel: "#0d1a2d", panelHi: "#132640",
  border: "#1a3050", borderHi: "#245080", borderGlow: "#3068a0",
  cyan: "#00d4ff", cyanDim: "#007a8a", cyanMid: "#00b8d4",
  amber: "#ffb300", amberDim: "#8a6200",
  red: "#ff4444", redBright: "#ff6b6b",
  green: "#00e676", greenBright: "#69f0ae",
  purple: "#b388ff", purpleBright: "#d4a5ff",
  white: "#f0f4f8", text: "#c8d6e5",
  textDim: "#6b8db5", textMute: "#2a3d55",
  kara: "#43a047", hava: "#1e88e5", deniz: "#0d47a1", arge: "#8e24aa",
};

export const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
export const MONO = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";

export const glow = (c, r = 20) => `0 0 ${r}px ${c}40`;

export const ttStyle = {
  background: C.panel,
  border: `1px solid ${C.borderHi}`,
  borderRadius: 6,
  color: C.text,
  fontSize: 13,
  fontFamily: FONT,
  padding: "8px 12px",
};

export const forceColor = f => ({ kara: C.kara, hava: C.hava, deniz: C.deniz, arge: C.arge }[f] || C.textDim);

export const growthData = [
  { year: "2016", systems: 12 }, { year: "2018", systems: 22 }, { year: "2020", systems: 35 },
  { year: "2022", systems: 50 }, { year: "2024", systems: 68 }, { year: "2025", systems: 83 },
  { year: "2026", systems: 92 }, { year: "2028", systems: 105 }, { year: "2030", systems: 120 },
];
