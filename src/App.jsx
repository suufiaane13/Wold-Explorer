import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-vh-100 d-flex flex-column">
            <Navbar />
            <main className="flex-grow-1" style={{ paddingBottom: '140px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country/:code" element={<CountryDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <Footer />
            <MusicPlayer />
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
