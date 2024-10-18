import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Player from "./pages/player.jsx";
import PrivateRoutes from "./components/privateroutes.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase.js";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <Routes>
      <Route index path="/login" element={<Login user={user} />} />
      <Route element={<PrivateRoutes user={user} />}>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
      </Route>
    </Routes>
  );
}

export default App;
