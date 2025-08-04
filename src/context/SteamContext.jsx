import { createContext, useContext, useState, useEffect } from 'react';

export const SteamContext = createContext();

export const SteamProvider = ({ children }) => {
  const [steamId, setSteamId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const MONSOON_STEAM_ID = '76561198028175941'; // Your SteamID64
  const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY || 'YOUR_API_KEY'; // Using Vite environment variable
  const APP_ID = 440; // Team Fortress 2 app ID

  const loginWithSteam = async () => {
    setIsLoading(true);
    try {
      setSteamId(MONSOON_STEAM_ID);
      setIsAuthenticated(true);
      localStorage.setItem('steamId', MONSOON_STEAM_ID);
      await fetchUserProfile(MONSOON_STEAM_ID);
    } catch (err) {
      setError('Login failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setSteamId(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem('steamId');
  };

  const fetchUserProfile = async (steamId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://corsproxy.io/?https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`
      );
      const data = await response.json();
      
      if (data?.response?.players?.length > 0) {
        const profile = data.response.players[0];
        setUserProfile(profile);
        return profile;
      }
      throw new Error('No profile data received');
    } catch (err) {
      console.error("Failed to fetch profile, using mock data:", err);
      const mockProfile = {
        steamid: steamId,
        personaname: 'Monsoonification',
        avatarfull: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
        profileurl: 'https://steamcommunity.com/id/monsoonification',
      };
      setUserProfile(mockProfile);
      return mockProfile;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventory = async (steamId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://corsproxy.io/?https://steamcommunity.com/inventory/${steamId}/${APP_ID}/2?l=english&count=500`
      );
      const data = await response.json();
      
      if (data?.descriptions) {
        return data.descriptions.map(item => ({
          id: item.classid,
          name: item.name,
          icon_url: `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`,
          type: item.type,
          marketable: item.marketable,
          tradable: item.tradable
        }));
      }
      throw new Error('No inventory data received');
    } catch (err) {
      console.error("Failed to fetch TF2 inventory, using mock data:", err);
      return Array.from({ length: 25 }, (_, i) => ({
        id: `tf2_item_${i}`,
        name: `TF2 Item ${i + 1}`,
        icon_url: `https://steamcommunity-a.akamaihd.net/economy/image/class/440/${123456 + i}/64fx64f`,
        type: ['Hat', 'Weapon', 'Misc'][i % 3],
        marketable: true,
        tradable: true
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedSteamId = localStorage.getItem('steamId');
    if (storedSteamId) {
      setSteamId(storedSteamId);
      setIsAuthenticated(true);
      fetchUserProfile(storedSteamId);
    }
  }, []);

  return (
    <SteamContext.Provider
      value={{
        steamId,
        setSteamId,
        userProfile,
        isAuthenticated,
        isLoading,
        error,
        loginWithSteam,
        logout,
        fetchUserProfile,
        fetchInventory,
      }}
    >
      {children}
    </SteamContext.Provider>
  );
};

export const useSteam = () => {
  const context = useContext(SteamContext);
  if (!context) {
    throw new Error('useSteam must be used within a SteamProvider');
  }
  return context;
};