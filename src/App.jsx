import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";

const GenelBakis = lazy(() => import("./pages/GenelBakis"));
const SenaryoMerkezi = lazy(() => import("./pages/SenaryoMerkezi"));
const TehditAnalizi = lazy(() => import("./pages/TehditAnalizi"));
const ZamanCizelgesi = lazy(() => import("./pages/ZamanCizelgesi"));
const PlatformPortfoy = lazy(() => import("./pages/PlatformPortfoy"));
const HeatMap = lazy(() => import("./pages/HeatMap"));
const Datasheet = lazy(() => import("./pages/Datasheet"));
const Simulasyon = lazy(() => import("./pages/Simulasyon"));
const EHKatmanliSavunma = lazy(() => import("./pages/EHKatmanliSavunma"));

const HSGenelBakis = lazy(() => import("./pages/hs/HSGenelBakis"));
const HSEnvanter = lazy(() => import("./pages/hs/HSEnvanter"));
const HSKatmanliSavunma = lazy(() => import("./pages/hs/HSKatmanliSavunma"));
const HSZamanCizelgesi = lazy(() => import("./pages/hs/HSZamanCizelgesi"));
const HSEtkinlikMatrisi = lazy(() => import("./pages/hs/HSEtkinlikMatrisi"));
const HSMenzilHaritasi = lazy(() => import("./pages/hs/HSMenzilHaritasi"));
const HSSenaryoMerkezi = lazy(() => import("./pages/hs/HSSenaryoMerkezi"));
const HSTehditAnalizi = lazy(() => import("./pages/hs/HSTehditAnalizi"));
const HSPlatformPortfoy = lazy(() => import("./pages/hs/HSPlatformPortfoy"));

const Loading = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", color: "#5a7a9a", fontFamily: "monospace", fontSize: 13 }}>
    Yükleniyor...
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            {/* EH Routes */}
            <Route index element={<Navigate to="/genel-bakis" replace />} />
            <Route path="/genel-bakis" element={<GenelBakis />} />
            <Route path="/senaryo-merkezi" element={<SenaryoMerkezi />} />
            <Route path="/tehdit-analizi" element={<TehditAnalizi />} />
            <Route path="/zaman-cizelgesi" element={<ZamanCizelgesi />} />
            <Route path="/platform-portfoy" element={<PlatformPortfoy />} />
            <Route path="/heat-map" element={<HeatMap />} />
            <Route path="/katmanli-savunma" element={<EHKatmanliSavunma />} />
            <Route path="/datasheet" element={<Datasheet />} />
            <Route path="/simulasyon" element={<Simulasyon />} />

            {/* HS Routes */}
            <Route path="/hs" element={<Navigate to="/hs/genel-bakis" replace />} />
            <Route path="/hs/genel-bakis" element={<HSGenelBakis />} />
            <Route path="/hs/envanter" element={<HSEnvanter />} />
            <Route path="/hs/katmanli-savunma" element={<HSKatmanliSavunma />} />
            <Route path="/hs/zaman-cizelgesi" element={<HSZamanCizelgesi />} />
            <Route path="/hs/etkinlik-matrisi" element={<HSEtkinlikMatrisi />} />
            <Route path="/hs/menzil-haritasi" element={<HSMenzilHaritasi />} />
            <Route path="/hs/tehdit-analizi" element={<HSTehditAnalizi />} />
            <Route path="/hs/platform-portfoy" element={<HSPlatformPortfoy />} />
            <Route path="/hs/senaryo" element={<HSSenaryoMerkezi />} />

            <Route path="*" element={<Navigate to="/genel-bakis" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
