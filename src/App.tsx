import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './i18n';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArtistsPage from './pages/ArtistsPage';
import GalleryPage from './pages/GalleryPage';
import AproposPage from './pages/AproposPage';

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/artistes" element={<ArtistsPage />} />
            <Route path="/artistes/:slug" element={<GalleryPage />} />
            <Route path="/apropos" element={<AproposPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
