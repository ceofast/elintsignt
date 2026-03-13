import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { C, FONT, MONO, glow } from "./theme";

const SIDEBAR_W = 270;

const ehItems = [
  { label: "GENEL BAKIŞ", icon: "◉", path: "/genel-bakis" },
  { label: "SENARYO MERKEZİ", icon: "◎", path: "/senaryo-merkezi" },
  { label: "TEHDİT ANALİZİ", icon: "◆", path: "/tehdit-analizi" },
  { label: "ZAMAN ÇİZELGESİ", icon: "▸", path: "/zaman-cizelgesi" },
  { label: "PLATFORM & PORTFÖY", icon: "⬡", path: "/platform-portfoy" },
  { label: "HEAT MAP", icon: "▦", path: "/heat-map" },
  { label: "KATMANLI SAVUNMA", icon: "▤", path: "/katmanli-savunma" },
  { label: "DATASHEET", icon: "⊞", path: "/datasheet" },
  { label: "SİMÜLASYON", icon: "🗺", path: "/simulasyon" },
];

const hsItems = [
  { label: "GENEL BAKIŞ", icon: "◉", path: "/hs/genel-bakis" },
  { label: "SİSTEM ENVANTERİ", icon: "⊞", path: "/hs/envanter" },
  { label: "TEHDİT ANALİZİ", icon: "◆", path: "/hs/tehdit-analizi" },
  { label: "KATMANLI SAVUNMA", icon: "▦", path: "/hs/katmanli-savunma" },
  { label: "ZAMAN ÇİZELGESİ", icon: "▸", path: "/hs/zaman-cizelgesi" },
  { label: "ETKİNLİK MATRİSİ", icon: "◆", path: "/hs/etkinlik-matrisi" },
  { label: "MENZİL HARİTASI", icon: "🗺", path: "/hs/menzil-haritasi" },
  { label: "PLATFORM & PORTFÖY", icon: "⬡", path: "/hs/platform-portfoy" },
  { label: "SENARYO MERKEZİ", icon: "◎", path: "/hs/senaryo" },
];

const sections = [
  {
    id: "eh",
    title: "ELEKTRONİK HARP",
    sub: "TAKTİK KOMUTA PANELİ",
    items: ehItems,
    headerTitle: "ELEKTRONİK HARP TAKTİK KOMUTA PANELİ",
    headerSub: "KARA · HAVA · DENİZ — 83+ YERLİ SİSTEM · v2.0",
    systemCount: "83+",
    color: C.cyan,
  },
  {
    id: "hs",
    title: "HAVA SAVUNMA",
    sub: "TAKTİK KOMUTA PANELİ",
    items: hsItems,
    headerTitle: "HAVA SAVUNMA TAKTİK KOMUTA PANELİ",
    headerSub: "ÇELİK KUBBE · KATMANLI SAVUNMA — 21+ YERLİ SİSTEM · v1.0",
    systemCount: "21+",
    color: C.amber,
  },
];

function NavSection({ section, isOpen, onToggle, isActive, location }) {
  return (
    <>
      <button
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "12px 18px", border: "none", cursor: "pointer",
          background: isActive ? `${section.color}10` : "transparent",
          borderLeft: isActive ? `3px solid ${section.color}` : "3px solid transparent",
          fontFamily: FONT, textAlign: "left", transition: "all 0.2s",
        }}
      >
        <span style={{
          fontSize: 11, color: C.amber, fontWeight: 900,
          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s", display: "inline-block",
        }}>&#9656;</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.white, letterSpacing: 1.5, lineHeight: 1.3 }}>
            {section.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: section.color, letterSpacing: 1.2, marginTop: 1 }}>
            {section.sub}
          </div>
        </div>
      </button>

      <div style={{
        maxHeight: isOpen ? 500 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out",
      }}>
        {section.items.map((item) => (
          <NavLink key={item.path} to={item.path} className="nav-link">
            {({ isActive: active }) => (
              <div className="nav-item" style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 18px 9px 34px",
                borderLeft: active ? `3px solid ${section.color}` : "3px solid transparent",
                background: active ? `${section.color}14` : "transparent",
                transition: "all 0.15s",
                cursor: "pointer",
              }}>
                <span style={{ fontSize: 13, color: active ? section.color : C.textDim, minWidth: 16, textAlign: "center" }}>
                  {item.icon}
                </span>
                <span style={{
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  color: active ? C.white : C.textDim,
                  letterSpacing: 0.8, whiteSpace: "nowrap",
                  fontFamily: FONT,
                }}>
                  {item.label}
                </span>
                {active && <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: section.color, marginLeft: "auto",
                  boxShadow: glow(section.color, 10),
                }} />}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default function Layout() {
  const [time, setTime] = useState(new Date());
  const [scanPos, setScanPos] = useState(0);
  const [openSections, setOpenSections] = useState({ eh: true, hs: false });
  const location = useLocation();

  useEffect(() => {
    const t = setInterval(() => { setScanPos(p => (p + 0.3) % 100); setTime(new Date()); }, 60);
    return () => clearInterval(t);
  }, []);

  const activeSection = sections.find(s => s.items.some(n => location.pathname === n.path)) || sections[0];

  useEffect(() => {
    if (activeSection) {
      setOpenSections(prev => ({ ...prev, [activeSection.id]: true }));
    }
  }, [activeSection.id]);

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: FONT, display: "flex" }}>
      <style>{`
        @keyframes fadeUp { from {opacity:0;transform:translateY(10px)} to {opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes glow { 0%,100%{box-shadow:0 0 4px ${C.cyan}30} 50%{box-shadow:0 0 14px ${C.cyan}50} }
        @keyframes slideIn { from {opacity:0;transform:translateX(-8px)} to {opacity:1;transform:translateX(0)} }
        .hov:hover{border-color:${C.cyan}!important;background:${C.panelHi}!important}
        .nav-link{text-decoration:none;display:block}
        .nav-link:hover .nav-item{background:${C.panelHi};border-color:${C.borderHi}}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:${C.bg}} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
      `}</style>

      {/* SCANLINE OVERLAY */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, background: `linear-gradient(180deg, transparent ${scanPos-0.5}%, ${activeSection.color}04 ${scanPos}%, transparent ${scanPos+0.5}%)` }} />

      {/* SIDEBAR */}
      <div style={{
        width: SIDEBAR_W, minHeight: "100vh", background: C.bg2,
        borderRight: `1px solid ${C.border}`, position: "fixed", top: 0, left: 0, bottom: 0,
        zIndex: 10, display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, color: activeSection.color, letterSpacing: 3, fontWeight: 700, fontFamily: MONO, animation: "pulse 3s infinite" }}>
            SYS.STATUS: ONLINE
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.white, marginTop: 6, letterSpacing: 1.5 }}>
            TSK KOMUTA PANELİ
          </div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>KARA &middot; HAVA &middot; DENİZ</div>
        </div>

        {/* Clock */}
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: activeSection.color, fontFamily: MONO, textShadow: glow(activeSection.color, 20), letterSpacing: 2 }}>
            {time.toLocaleTimeString("tr-TR")}
          </div>
          <div style={{ fontSize: 10, color: C.textDim, marginTop: 4, letterSpacing: 1 }}>MART 2026 &middot; AÇIK KAYNAK</div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: "10px 0" }}>
          {sections.map(section => {
            const isActive = section.items.some(n => location.pathname === n.path);
            return (
              <NavSection
                key={section.id}
                section={section}
                isOpen={openSections[section.id]}
                onToggle={() => toggleSection(section.id)}
                isActive={isActive}
                location={location}
              />
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 9, color: C.textMute, letterSpacing: 2, fontFamily: MONO }}>v2.0 &middot; TSK KOMUTA</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: SIDEBAR_W, flex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <div style={{ background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.border}`, padding: "18px 28px 14px", position: "relative", zIndex: 1 }}>
          <div style={{ position: "absolute", top: 6, left: 6, width: 18, height: 18, borderTop: `2px solid ${activeSection.color}30`, borderLeft: `2px solid ${activeSection.color}30` }} />
          <div style={{ position: "absolute", top: 6, right: 6, width: 18, height: 18, borderTop: `2px solid ${activeSection.color}30`, borderRight: `2px solid ${activeSection.color}30` }} />
          <div style={{ position: "absolute", bottom: 6, left: 6, width: 18, height: 18, borderBottom: `2px solid ${activeSection.color}30`, borderLeft: `2px solid ${activeSection.color}30` }} />
          <div style={{ position: "absolute", bottom: 6, right: 6, width: 18, height: 18, borderBottom: `2px solid ${activeSection.color}30`, borderRight: `2px solid ${activeSection.color}30` }} />
          <div>
            <div style={{ fontSize: 11, color: activeSection.color, letterSpacing: 5, fontWeight: 700, fontFamily: MONO, animation: "pulse 3s infinite" }}>
              TÜRK SİLAHLI KUVVETLERİ
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: C.white, margin: "4px 0 0", letterSpacing: 2, textShadow: glow(activeSection.color, 30) }}>
              {activeSection.headerTitle}
            </h1>
            <div style={{ fontSize: 13, color: C.textDim, marginTop: 3, letterSpacing: 1 }}>{activeSection.headerSub}</div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ flex: 1, width: "100%", padding: "16px 28px 60px", position: "relative", zIndex: 1 }}>
          <Outlet />
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", padding: "14px", borderTop: `1px solid ${C.border}`, background: C.bg2, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, color: C.textMute, letterSpacing: 3, fontFamily: MONO }}>TSK {activeSection.headerTitle} v2.0 &middot; AÇIK KAYNAK VERİLERE DAYALI &middot; MART 2026</div>
        </div>
      </div>
    </div>
  );
}
