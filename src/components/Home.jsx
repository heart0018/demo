import {
  ChevronDown,
  Coffee,
  Gamepad2,
  History,
  LogOut,
  MapPin,
  Play,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Home() {
  const { user, logout, selectedRegion, updateRegion } = useUser();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const regions = [
    "北海道",
    "東北",
    "関東",
    "中部",
    "関西",
    "中国・四国",
    "九州・沖縄",
    "すべての地域",
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRegionSelect = (region) => {
    updateRegion(region);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleNavigate = (path, mood = "", genre = "") => {
    if (mood) {
      navigate(`/mood?category=${mood}`);
    } else if (genre) {
      navigate(`/swipe?category=rest&genre=${genre}`);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="user-info">
          <img
            src={user?.picture || "https://via.placeholder.com/40"}
            alt={user?.name || "User"}
            className="user-avatar"
          />
          <span className="user-name">{user?.name || "User"}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
        </button>
      </header>

      <nav className="main-nav">
        <div className="nav-item dropdown">
          <button
            className="nav-button"
            onClick={() => toggleDropdown("region")}
          >
            <MapPin size={20} />
            <span>{selectedRegion}</span>
            <ChevronDown size={16} />
          </button>
          {activeDropdown === "region" && (
            <div className="dropdown-menu">
              {regions.map((region) => (
                <button
                  key={region}
                  className={`dropdown-item ${selectedRegion === region ? "active" : ""}`}
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-item">
          <button
            className="nav-button"
            onClick={() => handleNavigate("/mood", "eat")}
          >
            <Coffee size={20} />
            <span>食べる/飲む</span>
          </button>
        </div>

        <div className="nav-item dropdown">
          <button
            className="nav-button"
            onClick={() => toggleDropdown("outing")}
          >
            <Gamepad2 size={20} />
            <span>でかける</span>
            <ChevronDown size={16} />
          </button>
          {activeDropdown === "outing" && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/mood", "outing")}
              >
                リラックスする
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/mood", "outing")}
              >
                遊ぶ
              </button>
            </div>
          )}
        </div>

        <div className="nav-item dropdown">
          <button className="nav-button" onClick={() => toggleDropdown("rest")}>
            <Play size={20} />
            <span>休む</span>
            <ChevronDown size={16} />
          </button>
          {activeDropdown === "rest" && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/swipe", "", "drama")}
              >
                ドラマ
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/swipe", "", "anime")}
              >
                アニメ
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/swipe", "", "all-media")}
              >
                全て
              </button>
            </div>
          )}
        </div>

        <div className="nav-item dropdown">
          <button
            className="nav-button"
            onClick={() => toggleDropdown("history")}
          >
            <History size={20} />
            <span>swipeの履歴</span>
            <ChevronDown size={16} />
          </button>
          {activeDropdown === "history" && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/mylist?type=liked")}
              >
                行きたい！/観たい！
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleNavigate("/mylist?type=later")}
              >
                また今度！/あとで観る！
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="main-content">
        <div className="welcome-section">
          <h1 className="welcome-title">今日は何をしますか？</h1>
          <p className="welcome-subtitle">
            上のメニューから気になるカテゴリを選んで、
            <br />
            スワイプで直感的に選んでみましょう
          </p>
        </div>

        <div className="quick-actions">
          <button
            className="quick-action-card"
            onClick={() => handleNavigate("/mood", "eat")}
          >
            <div className="quick-action-icon">🍽️</div>
            <div className="quick-action-text">
              <h3>食べる/飲む</h3>
              <p>美味しいお店を探す</p>
            </div>
          </button>

          <button
            className="quick-action-card"
            onClick={() => handleNavigate("/mood", "outing")}
          >
            <div className="quick-action-icon">🚶</div>
            <div className="quick-action-text">
              <h3>でかける</h3>
              <p>お出かけスポットを探す</p>
            </div>
          </button>

          <button
            className="quick-action-card"
            onClick={() => handleNavigate("/mood", "rest")}
          >
            <div className="quick-action-icon">😴</div>
            <div className="quick-action-text">
              <h3>休む</h3>
              <p>アニメ・ドラマを観る</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
