import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function MoodSelector() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const handleBack = () => {
    navigate("/home");
  };

  const renderMoodOptions = () => {
    switch (category) {
      case "eat":
        return (
          <div className="mood-options">
            <h2 className="mood-title">今日の気分は？</h2>
            <div className="mood-grid">
              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=eat")}
              >
                <div className="mood-icon">🍽️</div>
                <h3>なんでも食べたい</h3>
                <p>いろんなジャンルから提案</p>
              </button>
            </div>
          </div>
        );

      case "outing":
        return (
          <div className="mood-options">
            <h2 className="mood-title">今日の気分は？</h2>
            <div className="mood-grid">
              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=outing&mood=relax")}
              >
                <div className="mood-icon">🌱</div>
                <h3>リラックスしたい</h3>
                <p>温泉、公園、カフェなど</p>
              </button>

              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=outing&mood=play")}
              >
                <div className="mood-icon">⚡</div>
                <h3>遊びたい</h3>
                <p>ゲーセン、カラオケ、脱出ゲームなど</p>
              </button>

              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=outing&mood=both")}
              >
                <div className="mood-icon">🎯</div>
                <h3>どっちも！</h3>
                <p>両方からランダムに提案</p>
              </button>
            </div>
          </div>
        );

      case "rest":
        return (
          <div className="mood-options">
            <h2 className="mood-title">何を観ますか？</h2>
            <div className="mood-grid">
              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=rest&genre=drama")}
              >
                <div className="mood-icon">📺</div>
                <h3>ドラマ</h3>
                <p>今話題の作品から人気作まで</p>
              </button>

              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=rest&genre=anime")}
              >
                <div className="mood-icon">🎬</div>
                <h3>アニメ</h3>
                <p>最新アニメから名作まで</p>
              </button>

              <button
                className="mood-card"
                onClick={() => navigate("/swipe?category=rest&genre=all-media")}
              >
                <div className="mood-icon">🍿</div>
                <h3>全て</h3>
                <p>ドラマ・アニメ両方から提案</p>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="mood-options">
            <h2 className="mood-title">カテゴリを選択してください</h2>
            <p>ホームに戻ってカテゴリを選んでください</p>
          </div>
        );
    }
  };

  return (
    <div className="mood-selector-container">
      <header className="mood-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="mood-header-title">気分選択</h1>
      </header>

      <div className="mood-content">{renderMoodOptions()}</div>
    </div>
  );
}
