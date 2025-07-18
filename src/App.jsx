import './App.css';
import { HashRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Inventory from './components/Inventory';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { SteamProvider } from './context/SteamContext';

function App() {
  return (
    <SteamProvider>
      <HashRouter>
        <div className="d-flex flex-column min-vh-100" style={{ width: '100%' }}>
          <Navigation />
          <main className="flex-grow-1 w-100"> {/* Added w-100 here */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
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