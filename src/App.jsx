import './App.css';
import { HashRouter, Routes, Route } from 'react-router'; // Fixed import
import Navigation from './components/Navigation';
import Home from './components/Home';
import Inventory from './components/Inventory';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { SteamProvider } from './context/SteamContext';
import Logout from './components/logout';
import TradeOffers from './components/trade-offers';
function App() {
  return (
    <SteamProvider>
      <HashRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navigation />
          <main className="flex-grow-1 position-relative"> {/* Added position-relative */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/trade-offers" element={<TradeOffers/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/other-info" element={<OtherInfo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </SteamProvider>
  );
}

export default App;