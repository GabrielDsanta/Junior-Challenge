import { Route, Routes } from "react-router-dom";
import { Home, Login, SplashScreen } from "../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
