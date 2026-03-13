import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as d3 from "d3";
import { C, glow } from "../theme";
import { Panel } from "../components";
import { turkeyBorder, neighborCountries } from "../data/turkeyGeo";

const MAP_ILLER=[
{n:"Adana",lat:37.00,lng:35.33,e:30},{n:"Adiyaman",lat:37.76,lng:38.28,e:669},{n:"Afyonkarahisar",lat:38.74,lng:30.54,e:1034},
{n:"Agri",lat:39.72,lng:43.05,e:1640},{n:"Amasya",lat:40.65,lng:35.83,e:412},{n:"Ankara",lat:39.93,lng:32.85,e:938},
{n:"Antalya",lat:36.90,lng:30.70,e:30},{n:"Artvin",lat:41.18,lng:41.82,e:220},{n:"Aydin",lat:37.85,lng:27.85,e:56},
{n:"Balikesir",lat:39.65,lng:27.88,e:105},{n:"Bilecik",lat:40.06,lng:30.00,e:530},{n:"Bingol",lat:38.88,lng:40.50,e:1150},
{n:"Bitlis",lat:38.40,lng:42.12,e:1545},{n:"Bolu",lat:40.73,lng:31.61,e:740},{n:"Burdur",lat:37.72,lng:30.29,e:955},
{n:"Bursa",lat:40.19,lng:29.06,e:100},{n:"Canakkale",lat:40.15,lng:26.41,e:10},{n:"Cankiri",lat:40.60,lng:33.62,e:750},
{n:"Corum",lat:40.55,lng:34.95,e:801},{n:"Denizli",lat:37.77,lng:29.09,e:354},{n:"Diyarbakir",lat:37.92,lng:40.22,e:660},
{n:"Edirne",lat:41.68,lng:26.56,e:42},{n:"Elazig",lat:38.67,lng:39.22,e:1067},{n:"Erzincan",lat:39.75,lng:39.50,e:1185},
{n:"Erzurum",lat:39.90,lng:41.27,e:1893},{n:"Eskisehir",lat:39.77,lng:30.52,e:801},{n:"Gaziantep",lat:37.07,lng:37.38,e:855},
{n:"Giresun",lat:40.91,lng:38.39,e:10},{n:"Gumushane",lat:40.46,lng:39.48,e:1219},{n:"Hakkari",lat:37.58,lng:43.74,e:1720},
{n:"Hatay",lat:36.20,lng:36.16,e:85},{n:"Isparta",lat:37.76,lng:30.55,e:1035},{n:"Mersin",lat:36.80,lng:34.63,e:10},
{n:"Istanbul",lat:41.01,lng:28.98,e:40},{n:"Izmir",lat:38.42,lng:27.14,e:10},{n:"Kars",lat:40.60,lng:43.10,e:1838},
{n:"Kastamonu",lat:41.39,lng:33.78,e:780},{n:"Kayseri",lat:38.73,lng:35.48,e:1054},{n:"Kirklareli",lat:41.74,lng:27.23,e:203},
{n:"Kirsehir",lat:39.14,lng:34.16,e:1007},{n:"Kocaeli",lat:40.85,lng:29.88,e:30},{n:"Konya",lat:37.87,lng:32.48,e:1016},
{n:"Kutahya",lat:39.42,lng:29.97,e:960},{n:"Malatya",lat:38.35,lng:38.32,e:950},{n:"Manisa",lat:38.61,lng:27.43,e:71},
{n:"Kahramanmaras",lat:37.60,lng:36.94,e:568},{n:"Mardin",lat:37.31,lng:40.74,e:1050},{n:"Mugla",lat:37.22,lng:28.36,e:650},
{n:"Mus",lat:38.74,lng:41.49,e:1320},{n:"Nevsehir",lat:38.62,lng:34.71,e:1224},{n:"Nigde",lat:37.97,lng:34.68,e:1229},
{n:"Ordu",lat:40.98,lng:37.88,e:5},{n:"Rize",lat:41.02,lng:40.52,e:10},{n:"Sakarya",lat:40.77,lng:30.40,e:31},
{n:"Samsun",lat:41.29,lng:36.33,e:4},{n:"Siirt",lat:37.93,lng:41.94,e:895},{n:"Sinop",lat:42.03,lng:35.15,e:10},
{n:"Sivas",lat:39.75,lng:37.02,e:1275},{n:"Tekirdag",lat:41.00,lng:27.52,e:5},{n:"Tokat",lat:40.31,lng:36.55,e:608},
{n:"Trabzon",lat:41.00,lng:39.72,e:10},{n:"Tunceli",lat:39.11,lng:39.55,e:978},{n:"Sanliurfa",lat:37.17,lng:38.79,e:547},
{n:"Usak",lat:38.68,lng:29.41,e:919},{n:"Van",lat:38.49,lng:43.38,e:1727},{n:"Yozgat",lat:39.82,lng:34.81,e:1301},
{n:"Zonguldak",lat:41.45,lng:31.80,e:10},{n:"Aksaray",lat:38.37,lng:34.03,e:965},{n:"Bayburt",lat:40.26,lng:40.23,e:1550},
{n:"Karaman",lat:37.18,lng:33.23,e:1039},{n:"Kirikkale",lat:39.85,lng:33.51,e:751},{n:"Batman",lat:37.89,lng:41.13,e:610},
{n:"Sirnak",lat:37.42,lng:42.46,e:1350},{n:"Bartin",lat:41.64,lng:32.34,e:25},{n:"Ardahan",lat:41.11,lng:42.70,e:1829},
{n:"Igdir",lat:39.92,lng:44.05,e:840},{n:"Yalova",lat:40.66,lng:29.27,e:5},{n:"Karabuk",lat:41.21,lng:32.62,e:370},
{n:"Kilis",lat:36.72,lng:37.12,e:640},{n:"Osmaniye",lat:37.07,lng:36.25,e:118},{n:"Duzce",lat:40.84,lng:31.17,e:165}
];

const MAP_SYS=[
  {id:"koral",name:"KORAL",rET:200,rED:450,color:"#ff4444"},{id:"koral200",name:"KORAL 200",rET:250,rED:550,color:"#ff6666"},
  {id:"vural",name:"VURAL",rET:80,rED:150,color:"#4488ff"},{id:"ilgar",name:"ILGAR",rET:40,rED:0,color:"#44dd88"},
  {id:"sancak",name:"SANCAK",rET:60,rED:0,color:"#88dd44"},{id:"gergedan",name:"GERGEDAN",rET:15,rED:0,color:"#ddaa44"},
  {id:"kangal",name:"KANGAL",rET:0.5,rED:0,color:"#dd8844"},{id:"ejderha",name:"EJDERHA",rET:1,rED:0,color:"#dd44dd"},
  {id:"gokberk",name:"GOKBERK",rET:2,rED:0,color:"#ff2222"},{id:"ihtar",name:"İHTAR",rET:8,rED:0,color:"#44dddd"},
  {id:"bukalemun",name:"BUKALEMUN",rET:20,rED:0,color:"#aa44ff"},
];

const MAP_DEP=[
  {id:"d1",name:"Hatay Sınır",lat:36.35,lng:36.30,e:120,t:"ova",sys:["koral","vural","ilgar","gergedan","kangal"]},
  {id:"d2",name:"Kilis-Gaziantep",lat:36.85,lng:37.20,e:850,t:"plato",sys:["koral","ilgar","sancak","kangal","ejderha"]},
  {id:"d3",name:"Sirnak",lat:37.42,lng:42.50,e:1350,t:"daglik",sys:["vural","ilgar","gergedan","kangal","ihtar"]},
  {id:"d4",name:"Hakkari",lat:37.58,lng:43.70,e:1700,t:"daglik",sys:["vural","ilgar","kangal","gergedan","ejderha"]},
  {id:"d5",name:"Edirne-Trakya",lat:41.68,lng:26.60,e:50,t:"ova",sys:["koral","vural","ilgar","sancak"]},
  {id:"d6",name:"Izmir-Ege",lat:38.45,lng:26.90,e:200,t:"kiyi",sys:["koral","vural","gergedan"]},
  {id:"d7",name:"Sinop",lat:42.00,lng:35.15,e:30,t:"kiyi",sys:["koral200","vural"]},
  {id:"d8",name:"Diyarbakir",lat:37.92,lng:40.22,e:660,t:"plato",sys:["koral","vural","ilgar","sancak","kangal","ejderha","ihtar","bukalemun"]},
  {id:"d9",name:"Ankara",lat:39.90,lng:32.80,e:900,t:"plato",sys:["koral200","vural","ejderha","gokberk","ihtar","bukalemun"]},
  {id:"d10",name:"Konya EWTTR",lat:37.85,lng:32.50,e:1020,t:"plato",sys:["koral","koral200","vural","ilgar"]},
];

const mapTF=t=>({ova:1.0,"kiyi":1.12,plato:0.9,"daglik":0.6}[t]||0.85);
const mapEF=e=>e>1500?1.15:e>800?1.05:e>300?1.0:0.95;
const MAP_GEO_URL="https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities-utf8.json";
const mapBig3=["Istanbul","Ankara","Izmir"];

const terrainFromElev=(e,lat,lng)=>{
  if(e>1500)return"daglik";
  if(e<80&&(lat<37.2||lat>41.2||lng<27.5))return"kiyi";
  if(e>800)return"plato";
  if(e<200)return"ova";
  return"plato";
};
const defaultSys=(c)=>{
  const sys=["vural","ilgar"];
  const border=c.lat<37.5||c.lat>41.3||c.lng<27||c.lng>42.5;
  const big=mapBig3.includes(c.n);
  if(border||big)sys.push("koral");
  if(border)sys.push("sancak","gergedan","kangal");
  if(big)sys.push("koral200","ejderha","gokberk","ihtar","bukalemun");
  if(c.e>1200&&!sys.includes("kangal"))sys.push("kangal");
  if(c.e<80&&(c.lat<37.2||c.lat>41.2))sys.push("ihtar");
  return[...new Set(sys)];
};
const CITY_DEPS=MAP_ILLER.map(c=>({id:`il_${c.n}`,name:c.n,lat:c.lat,lng:c.lng,e:c.e,t:terrainFromElev(c.e,c.lat,c.lng),sys:defaultSys(c)}));
const ALL_DEP=[...MAP_DEP,...CITY_DEPS];

export default function Simulasyon() {
  const mapRef = useRef(null);
  const [mapGeo, setMapGeo] = useState(null);
  const [mapSel, setMapSel] = useState("il_Ankara");
  const [mapAct, setMapAct] = useState(new Set(MAP_SYS.map(s=>s.id)));
  const [mapET, setMapET] = useState(true);
  const [mapED, setMapED] = useState(true);
  const [mapTerr, setMapTerr] = useState(true);
  const [mapHov, setMapHov] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [mZoom, setMZoom] = useState(1);
  const [mPan, setMPan] = useState({x:0,y:0});
  const [mDrag, setMDrag] = useState(false);
  const [mDragMoved, setMDragMoved] = useState(false);
  const [mDragS, setMDragS] = useState({x:0,y:0});
  const [mPanS, setMPanS] = useState({x:0,y:0});

  useEffect(() => { fetch(MAP_GEO_URL).then(r=>r.json()).then(d=>setMapGeo(d)).catch(()=>{}); }, []);

  const MW=800, MH=420;
  const mProj = d3.geoMercator().center([35.5,39.2]).scale(2400).translate([MW/2,MH/2]);
  const mPath = d3.geoPath().projection(mProj);
  const borderGeoJSON = useMemo(() => ({ type: "Feature", geometry: { type: "Polygon", coordinates: [turkeyBorder] } }), []);
  const neighborGeoJSONs = useMemo(() => neighborCountries.map(c => ({ label: c.label, center: c.center, features: c.polys.map(ring => ({ type: "Feature", geometry: { type: "Polygon", coordinates: [ring] } })) })), []);
  const mKmPx = (km,lat=39) => { const p1=mProj([35,lat]),p2=mProj([35+km/111.32,lat]); return p2&&p1?Math.abs(p2[0]-p1[0]):km*2; };
  const mDep = ALL_DEP.find(d=>d.id===mapSel);
  const mTf = mDep?mapTF(mDep.t):1, mEf = mDep?mapEF(mDep.e):1;
  const mDeps = [mDep].filter(Boolean);
  const filteredCities = useMemo(()=>{
    if(!citySearch)return[];
    const q=citySearch.toLocaleLowerCase("tr-TR");
    return CITY_DEPS.filter(c=>c.name.toLocaleLowerCase("tr-TR").includes(q));
  },[citySearch]);
  const mToggle = id=>setMapAct(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  const mReset = ()=>{setMZoom(1);setMPan({x:0,y:0});};
  const mZoomIn = ()=>{const nz=Math.min(12,mZoom*1.4);const r=nz/mZoom;setMPan(p=>({x:MW/2-(MW/2-p.x)*r,y:MH/2-(MH/2-p.y)*r}));setMZoom(nz);};
  const mZoomOut = ()=>{const nz=Math.max(0.5,mZoom/1.4);const r=nz/mZoom;setMPan(p=>({x:MW/2-(MW/2-p.x)*r,y:MH/2-(MH/2-p.y)*r}));setMZoom(nz);};
  const mFocus = (d)=>{ setMapSel(d.id); const pt=mProj([d.lng,d.lat]); if(!pt)return; setMPan({x:MW/2-pt[0]*3,y:MH/2-pt[1]*3}); setMZoom(3); };
  const mWheel = useCallback((e)=>{ e.preventDefault(); const rect=mapRef.current?.getBoundingClientRect(); if(!rect)return; const mx=(e.clientX-rect.left)/rect.width*MW,my=(e.clientY-rect.top)/rect.height*MH; const f=e.deltaY<0?1.15:1/1.15; const nz=Math.max(0.5,Math.min(12,mZoom*f)); const r=nz/mZoom; setMPan(p=>({x:mx-(mx-p.x)*r,y:my-(my-p.y)*r})); setMZoom(nz); },[mZoom]);
  const mMouseDown = useCallback((e)=>{ if(e.button!==0)return; setMDrag(true); setMDragMoved(false); setMDragS({x:e.clientX,y:e.clientY}); setMPanS({...mPan}); },[mPan]);
  const mMouseMove = useCallback((e)=>{ if(!mDrag)return; const dx=e.clientX-mDragS.x,dy=e.clientY-mDragS.y; if(!mDragMoved&&Math.abs(dx)<3&&Math.abs(dy)<3)return; setMDragMoved(true); const rect=mapRef.current?.getBoundingClientRect(); if(!rect)return; setMPan({x:mPanS.x+dx*(MW/rect.width),y:mPanS.y+dy*(MH/rect.height)}); },[mDrag,mDragMoved,mDragS,mPanS]);
  const mMouseUp = useCallback(()=>{setMDrag(false);},[]);

  return (
    <div style={{ animation: "fadeUp 0.35s ease-out" }}>
      <div style={{ fontSize: 8, color: C.textDim, marginBottom: 6, fontFamily: "monospace" }}>Scroll: Yakinlastir | Surukle: Kaydir | Çift tik: Sifirla | Nokta tikla: Odaklan</div>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 6 }}>
        {/* Left panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, maxHeight: "70vh", overflowY: "auto" }}>
          <Panel title="İL SEÇİMİ" glow={C.cyan}>
            <input value={citySearch} onChange={e=>setCitySearch(e.target.value)} placeholder="İl ara..." style={{
              width: "100%", padding: "4px 6px", fontSize: 8, fontFamily: "inherit", borderRadius: 2, marginBottom: 4,
              border: `1px solid ${C.border}`, background: C.bg, color: C.white, outline: "none",
            }}/>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              {(citySearch ? filteredCities : CITY_DEPS).map(d => (
                <button key={d.id} className="hov" onClick={() => { mFocus(d); setCitySearch(""); }} style={{
                  display: "block", width: "100%", padding: "3px 6px", marginBottom: 1, background: mapSel===d.id?`${C.cyan}15`:"transparent",
                  border: mapSel===d.id?`1px solid ${C.cyan}`:`1px solid transparent`, borderRadius: 2, cursor: "pointer", textAlign: "left",
                  color: mapSel===d.id?C.cyan:C.textDim, fontSize: 8, fontFamily: "inherit", fontWeight: 600
                }}><span style={{ color: C.amber }}>{"▸"} </span>{d.name}<span style={{ float: "right", fontSize: 6, color: C.textMute }}>{d.sys.length} sys · {d.e}m</span></button>
              ))}
            </div>
          </Panel>
          <Panel title="SİSTEMLER" glow={C.amber}>
            {MAP_SYS.map(s => {
              const deployed = mDep && mDep.sys.includes(s.id);
              return (
                <button key={s.id} className="hov" onClick={() => mToggle(s.id)} onMouseEnter={() => setMapHov(s.id)} onMouseLeave={() => setMapHov(null)} style={{
                  display: "block", width: "100%", padding: "2px 5px", marginBottom: 1, background: mapAct.has(s.id)?`${s.color}10`:"transparent",
                  border: `1px solid ${mapAct.has(s.id)?s.color+"40":"transparent"}`, borderRadius: 2, cursor: "pointer", textAlign: "left", fontFamily: "inherit", opacity: deployed?1:0.3
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: mapAct.has(s.id)?s.color:C.border }} />
                    <span style={{ fontSize: 8, fontWeight: 700, color: mapAct.has(s.id)?C.white:C.textDim }}>{s.name}</span>
                    <span style={{ fontSize: 6, color: C.textDim, marginLeft: "auto" }}>{s.rET>5?s.rET+"km":s.rET>0?Math.round(s.rET*1000)+"m":""}</span>
                  </div>
                </button>
              );
            })}
          </Panel>
          <Panel title="KONTROL" glow={C.green}>
            {[{l:"ET Menzili",v:mapET,s:setMapET,c:C.red},{l:"ED Menzili",v:mapED,s:setMapED,c:C.cyan},{l:"Topografya",v:mapTerr,s:setMapTerr,c:C.green}].map((x,i) => (
              <button key={i} onClick={() => x.s(!x.v)} style={{ display: "block", width: "100%", padding: "2px 5px", marginBottom: 2, fontSize: 8, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", textAlign: "left", borderRadius: 2, border: `1px solid ${x.v?x.c+"40":"transparent"}`, background: x.v?`${x.c}08`:"transparent", color: x.v?x.c:C.textDim }}>{x.v?"◉":"○"} {x.l}</button>
            ))}
          </Panel>
          {mDep && <Panel title={`${mDep.name}`} glow={C.amber}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 4 }}>
              {[{l:"RAKIM",v:`${mDep.e}m`,c:C.cyan},{l:"ARAZİ",v:mDep.t.toUpperCase(),c:C.amber},{l:"FAKTOR",v:`x${(mTf*mEf).toFixed(2)}`,c:C.green},{l:"SİSTEM",v:mDep.sys.length,c:C.purple}].map((x,i) => (
                  <div key={i} style={{ background: `${x.c}08`, border: `1px solid ${x.c}20`, borderRadius: 2, padding: "2px 4px", textAlign: "center" }}>
                    <div style={{ fontSize: 6, color: C.textDim }}>{x.l}</div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: x.c }}>{x.v}</div>
                  </div>
              ))}
            </div>
            <div style={{ fontSize: 6, color: C.amber, fontWeight: 700, marginBottom: 2 }}>ETKİLİ MENZİLLER</div>
            {mDep.sys.map(sid => { const s=MAP_SYS.find(x=>x.id===sid); if(!s)return null; const aET=Math.round(s.rET*mTf*mEf), aED=s.rED>0?Math.round(s.rED*mTf*mEf):0;
              return (<div key={sid} style={{ display: "flex", alignItems: "center", gap: 3, padding: "1px 4px", marginBottom: 1, background: `${s.color}06`, borderRadius: 2, fontSize: 7 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: s.color }} />
                <span style={{ fontWeight: 700, color: C.white, minWidth: 50 }}>{s.name}</span>
                {aET>5?<><span style={{ color: C.red }}>ET:{aET}km</span>{aED>0&&<span style={{ color: C.cyan, marginLeft: 3 }}>ED:{aED}km</span>}</>:aET>0?<span style={{ color: C.red }}>ET:{Math.round(aET*1000)}m</span>:null}
              </div>);
            })}
          </Panel>}
        </div>
        {/* Map */}
        <div style={{ position: "relative" }}>
          <Panel title={`TURKIYE ${mDep?`— ${mDep.name}`:""} [${mZoom.toFixed(1)}x]`} glow={C.cyan} noPad>
            <svg ref={mapRef} width={MW} height={MH} viewBox={`0 0 ${MW} ${MH}`}
              style={{ width: "100%", height: "auto", background: "#040810", cursor: mDrag?"grabbing":"grab", touchAction: "none", display: "block" }}
              onWheel={mWheel} onMouseDown={mMouseDown} onMouseMove={mMouseMove} onMouseUp={mMouseUp} onMouseLeave={mMouseUp} onDoubleClick={mReset}>
              <defs><clipPath id="mc"><rect width={MW} height={MH}/></clipPath></defs>
              <rect width={MW} height={MH} fill="#040810"/>
              <g clipPath="url(#mc)">
                <g transform={`translate(${mPan.x},${mPan.y}) scale(${mZoom})`}>
                  {[26,28,30,32,34,36,38,40,42,44].map(lng=>{const p=mProj([lng,39]);return p?<line key={`g${lng}`} x1={p[0]} y1={-200} x2={p[0]} y2={800} stroke={C.textMute} strokeWidth={0.3/mZoom}/>:null;})}
                  {[36,37,38,39,40,41,42].map(lat=>{const p=mProj([35,lat]);return p?<line key={`l${lat}`} x1={-100} y1={p[1]} x2={1000} y2={p[1]} stroke={C.textMute} strokeWidth={0.3/mZoom}/>:null;})}
                  {neighborGeoJSONs.map((country,ci)=>(<g key={`nb${ci}`}>{country.features.map((feat,fi)=>(<path key={fi} d={mPath(feat)} fill="#0a1520" stroke={C.textMute} strokeWidth={Math.max(0.3,0.6/mZoom)} opacity={0.7}/>))}{(()=>{const pt=mProj(country.center);return pt?<text x={pt[0]} y={pt[1]} textAnchor="middle" fill={C.textMute} fontSize={Math.max(4,7/mZoom)} fontWeight="600" fontFamily="monospace" opacity={0.6} stroke="#040810" strokeWidth={Math.max(0.5,1.5/mZoom)} paintOrder="stroke">{country.label}</text>:null;})()}</g>))}
                  <path d={mPath(borderGeoJSON)} fill="#0c1c2e" stroke={C.borderHi} strokeWidth={Math.max(0.5,1.2/mZoom)}/>
                  {mapGeo&&mapGeo.features&&mapGeo.features.map((f,i)=>{const dd=mPath(f);return dd?<path key={i} d={dd} fill="none" stroke="#1a3555" strokeWidth={Math.max(0.2,0.5/mZoom)}/>:null;})}
                  {[{t:"KARADENİZ",lat:42.8,lng:35},{t:"AKDENİZ",lat:35.3,lng:31.5}].map((nb,i)=>{const p=mProj([nb.lng,nb.lat]);return p?<text key={`sea${i}`} x={p[0]} y={p[1]} textAnchor="middle" fill="#162840" fontSize={Math.max(4,8/mZoom)} fontFamily="monospace" fontWeight="bold">{nb.t}</text>:null;})}
                  {mDeps.map(dd=>{const dp=mProj([dd.lng,dd.lat]);if(!dp)return null;const ttf=mapTerr?mapTF(dd.t)*mapEF(dd.e):1;return dd.sys.filter(sid=>mapAct.has(sid)).map(sid=>{const s=MAP_SYS.find(x=>x.id===sid);if(!s)return null;const etR=mKmPx(s.rET*ttf,dd.lat),edR=s.rED>0?mKmPx(s.rED*ttf,dd.lat):0;const isH=mapHov===sid;return(<g key={`${dd.id}-${sid}`}>{mapED&&edR>3&&<circle cx={dp[0]} cy={dp[1]} r={edR} fill={`${s.color}03`} stroke={`${s.color}20`} strokeWidth={Math.max(0.2,(isH?1:0.3)/mZoom)} strokeDasharray={`${5/mZoom},${4/mZoom}`}/>}{mapET&&etR>1&&<circle cx={dp[0]} cy={dp[1]} r={etR} fill={`${s.color}${isH?"12":"06"}`} stroke={`${s.color}${isH?"70":"35"}`} strokeWidth={Math.max(0.3,(isH?1.5:0.7)/mZoom)}/>}</g>);});})}
                  {MAP_ILLER.map((p,i)=>{const pt=mProj([p.lng,p.lat]);if(!pt)return null;const isBig=mapBig3.includes(p.n);const cityDep=CITY_DEPS.find(c=>c.name===p.n);const isSel=cityDep&&mapSel===cityDep.id;const clr=isSel?C.cyan:p.e>1500?"#9a7050":p.e>800?"#7a8a60":"#5a7a9a";const lr=Math.max(isSel?1.5:0.8,(isSel?3:1.5)/mZoom);const br=Math.max(isSel?2.5:1.5,(isSel?4:2.5)/mZoom);const fs=Math.max(3,Math.min(6,5/mZoom));const hitR=Math.max(5,8/mZoom);return(<g key={`il${i}`} onClick={(e)=>{e.stopPropagation();if(!mDragMoved&&cityDep)mFocus(cityDep);}} style={{cursor:"pointer"}}><circle cx={pt[0]} cy={pt[1]} r={hitR} fill="transparent" stroke="none"/><circle cx={pt[0]} cy={pt[1]} r={isBig?br:lr} fill={clr} stroke={isSel?C.cyan:"#050a12"} strokeWidth={isSel?Math.max(0.5,1.5/mZoom):0.3/mZoom} style={isSel?{animation:"pulse 2s infinite"}:{}}/>{(mZoom>0.7||(isBig&&mZoom>0.4))&&<text x={pt[0]} y={pt[1]-(isBig?br+2/mZoom:lr+1.5/mZoom)} textAnchor="middle" fill={isSel?C.cyan:isBig?"#e0e8f0":"#6a8aaa"} fontSize={isBig?Math.max(3,6/mZoom):fs} fontFamily="monospace" fontWeight={isSel?800:isBig?800:400}>{p.n}</text>}{mZoom>2.5&&<text x={pt[0]} y={pt[1]+lr+4/mZoom} textAnchor="middle" fill="#3a5a7a" fontSize={3.5/mZoom} fontFamily="monospace">{p.e}m</text>}</g>);})}
                </g>
              </g>
            </svg>
          </Panel>
          <div style={{ position: "absolute", top: 40, right: 10, display: "flex", flexDirection: "column", gap: 3, zIndex: 10 }}>
            {[{l:"+",f:mZoomIn},{l:"−",f:mZoomOut},{l:"⟲",f:mReset}].map((b,i) => (
              <button key={i} onClick={b.f} style={{ width: 28, height: 28, borderRadius: 4, border: `1px solid ${C.border}`, background: `${C.panel}ee`, color: C.white, fontSize: 15, fontWeight: 900, cursor: "pointer", fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center" }}>{b.l}</button>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 12, left: 10, background: `${C.panel}cc`, padding: "2px 6px", borderRadius: 3, fontSize: 8, color: C.textDim, fontFamily: "monospace", border: `1px solid ${C.border}` }}>{mZoom.toFixed(1)}x</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 7, marginTop: 6, padding: "6px 8px", background: C.panel, borderRadius: 4, border: `1px solid ${C.border}` }}>
        <div><span style={{ color: C.red }}>{"━"}</span> ET (Taarruz) | <span style={{ color: C.cyan }}>{"╤╤"}</span> ED (Tespit)</div>
        <div>Ovax1.0 | Kiyix1.12 | Platox0.9 | Daglikx0.6</div>
        <div>Il: <span style={{ color: "#9a7050" }}>{"●"}</span>&gt;1500m <span style={{ color: "#7a8a60" }}>{"●"}</span>&gt;800m <span style={{ color: "#5a7a9a" }}>{"●"}</span>&lt;800m</div>
        <div style={{ color: C.textDim }}>Tahmini degerler | Gercek menziller sinifli bilgidir</div>
      </div>
    </div>
  );
}
