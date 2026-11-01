import { Route, Routes } from "react-router";

import { BookingProvider } from "./BookingContext";
import SiteLayout from "./SiteLayout";
import ErsatzteilePage from "./pages/ErsatzteilePage";
import HomePage from "./pages/HomePage";
import KontaktPage from "./pages/KontaktPage";
import { DatenschutzPage, ImpressumPage } from "./pages/LegalPage";
import NotFoundPage from "./pages/NotFoundPage";
import VerkaufPage from "./pages/VerkaufPage";
import VerleihPage from "./pages/VerleihPage";

function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/verleih" element={<VerleihPage />} />
          <Route path="/verkauf" element={<VerkaufPage />} />
          <Route path="/ersatzteile" element={<ErsatzteilePage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BookingProvider>
  );
}

export default App;
