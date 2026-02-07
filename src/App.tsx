import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import EspeciesList from './pages/EspeciesList';
import EspecieDetail from './pages/EspecieDetail';
import DonacionesList from './pages/DonacionesList';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/especies" element={<EspeciesList />} />
        <Route path="/especies/:id" element={<EspecieDetail />} />
        <Route path="/donaciones" element={<DonacionesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
