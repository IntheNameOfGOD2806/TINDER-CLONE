import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ChatPage from "./components/ChatPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import TinderWrapper from "./components/TinderLayout/TinderWrapper.jsx";
function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }
  return (
    <>
      <div className="wrapper w-full h-full absolute inset-0 -z-10 bg-white bg-gradient-to-br from-slate-200 via-red-100 to-red-300">
        <TinderWrapper>
            <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <AuthPage />}
          />
          <Route
            path="/profile"
            element={!authUser ? <Navigate to="/auth" /> : <ProfilePage />}
          />
          <Route
            path="/chat/:chatId"
            element={!authUser ? <Navigate to="/auth" /> : <ChatPage />}
          />
        </Routes>
        </TinderWrapper>
      
        <Toaster />
      </div>
    </>
  );
}

export default App;
