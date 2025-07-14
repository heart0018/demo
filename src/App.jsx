import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import MoodSelector from "./components/MoodSelector";
import MyList from "./components/MyList";
import RegionSelector from "./components/RegionSelector";
import SwipeCards from "./components/SwipeCards";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/region" element={<RegionSelector />} />
          <Route path="/mood" element={<MoodSelector />} />
          <Route path="/swipe" element={<SwipeCards />} />
          <Route path="/mylist" element={<MyList />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
