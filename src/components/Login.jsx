import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  const { user, login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleGoogleLogin = (credentialResponse) => {
    // Google認証成功時の処理
    try {
      const userData = {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        picture: "https://via.placeholder.com/150",
      };
      login(userData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleDemoLogin = () => {
    const userData = {
      id: "demo",
      name: "デモユーザー",
      email: "demo@example.com",
      picture: "https://via.placeholder.com/150",
    };
    login(userData);
  };

  const isGoogleOAuthAvailable = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return clientId && clientId !== "demo" && clientId !== "demo_client_id";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Swipe</h1>
        <p className="login-subtitle">
          なんとなく開いたら、
          <br />
          なんとなくやることが決まる
        </p>

        <div className="login-features">
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <span>スワイプで簡単選択</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📍</span>
            <span>地域別の提案</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💡</span>
            <span>気分に合わせた提案</span>
          </div>
        </div>

        {isGoogleOAuthAvailable() && (
          <div className="login-button-container">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
        )}

        <p className="login-demo-note">
          {isGoogleOAuthAvailable() 
            ? "※デモ版では仮のログインでお試しできます" 
            : "※デモ版でお試しできます"}
        </p>

        <button
          className="demo-login-button"
          onClick={handleDemoLogin}
        >
          {isGoogleOAuthAvailable() ? "デモでログイン" : "アプリを開始"}
        </button>
      </div>
    </div>
  );
}
