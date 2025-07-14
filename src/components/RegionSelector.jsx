import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function RegionSelector() {
  const navigate = useNavigate();
  const { selectedRegion, updateRegion } = useUser();

  const regions = [
    { id: "hokkaido", name: "北海道", icon: "🗻" },
    { id: "tohoku", name: "東北", icon: "🌾" },
    { id: "kanto", name: "関東", icon: "🏙️" },
    { id: "chubu", name: "中部", icon: "⛰️" },
    { id: "kansai", name: "関西", icon: "🏯" },
    { id: "chugoku-shikoku", name: "中国・四国", icon: "🌊" },
    { id: "kyushu-okinawa", name: "九州・沖縄", icon: "🏝️" },
    { id: "all", name: "すべての地域", icon: "🌏" },
  ];

  const handleRegionSelect = (regionName) => {
    updateRegion(regionName);
    navigate("/home");
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="region-selector-container">
      <header className="region-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="region-header-title">地域選択</h1>
      </header>

      <div className="region-content">
        <div className="current-region">
          <MapPin size={20} />
          <span>現在の地域: {selectedRegion}</span>
        </div>

        <div className="region-grid">
          {regions.map((region) => (
            <button
              key={region.id}
              className={`region-card ${selectedRegion === region.name ? "selected" : ""}`}
              onClick={() => handleRegionSelect(region.name)}
            >
              <div className="region-icon">{region.icon}</div>
              <div className="region-name">{region.name}</div>
            </button>
          ))}
        </div>

        <div className="region-description">
          <p>
            地域を選択すると、その地域のお店やスポットが優先的に表示されます。
            「すべての地域」を選択すると、全国のアイテムが表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}
