import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("関東");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [likedItems, setLikedItems] = useState([]);
  const [laterItems, setLaterItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージから保存されたデータを復元
    const savedUser = localStorage.getItem("user");
    const savedRegion = localStorage.getItem("selectedRegion");
    const savedLiked = localStorage.getItem("likedItems");
    const savedLater = localStorage.getItem("laterItems");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedRegion) setSelectedRegion(savedRegion);
    if (savedLiked) setLikedItems(JSON.parse(savedLiked));
    if (savedLater) setLaterItems(JSON.parse(savedLater));

    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateRegion = (region) => {
    setSelectedRegion(region);
    localStorage.setItem("selectedRegion", region);
  };

  const addToLiked = (item) => {
    const newLiked = [...likedItems, { ...item, addedAt: new Date() }];
    if (newLiked.length > 100) {
      newLiked.shift(); // 古い順に削除
    }
    setLikedItems(newLiked);
    localStorage.setItem("likedItems", JSON.stringify(newLiked));
  };

  const addToLater = (item) => {
    const newLater = [...laterItems, { ...item, addedAt: new Date() }];
    if (newLater.length > 30) {
      newLater.shift(); // 古い順に削除
    }
    setLaterItems(newLater);
    localStorage.setItem("laterItems", JSON.stringify(newLater));
  };

  const removeFromLiked = (itemId) => {
    const newLiked = likedItems.filter((item) => item.id !== itemId);
    setLikedItems(newLiked);
    localStorage.setItem("likedItems", JSON.stringify(newLiked));
  };

  const removeFromLater = (itemId) => {
    const newLater = laterItems.filter((item) => item.id !== itemId);
    setLaterItems(newLater);
    localStorage.setItem("laterItems", JSON.stringify(newLater));
  };

  const moveToLater = (item) => {
    removeFromLiked(item.id);
    addToLater(item);
  };

  const moveToLiked = (item) => {
    removeFromLater(item.id);
    addToLiked(item);
  };

  const value = {
    user,
    selectedRegion,
    selectedMood,
    selectedGenre,
    likedItems,
    laterItems,
    isLoading,
    login,
    logout,
    updateRegion,
    setSelectedMood,
    setSelectedGenre,
    addToLiked,
    addToLater,
    removeFromLiked,
    removeFromLater,
    moveToLater,
    moveToLiked,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
