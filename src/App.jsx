import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import MachinesPage from './pages/Machines';
import MachineDetail from './pages/MachineDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Downloads from './pages/Downloads';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="za-nas" element={<About />} />
        <Route path="mashini" element={<MachinesPage />} />
        <Route path="mashini/:slug" element={<MachineDetail />} />
        <Route path="serviz" element={<Services />} />
        <Route path="kontakti" element={<Contact />} />
        <Route path="katalozi" element={<Downloads />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
