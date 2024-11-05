import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ChatPage from "./components/ChatPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <div className="w-full h-full absolute inset-0 -z-10 bg-white bg-gradient-to-br from-slate-200 via-red-100 to-red-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
