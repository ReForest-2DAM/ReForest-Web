import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import EspeciesList from './pages/EspeciesList';
import DonacionesList from './pages/DonacionesList';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/especies" element={<EspeciesList />} />
        <Route path="/donaciones" element={<DonacionesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
