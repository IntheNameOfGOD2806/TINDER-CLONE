import { useState } from "react";
import SignUpForm from "./Auth/SignUpForm.jsx";
import LoginForm from "./Auth/LoginForm.jsx";
import useSignIn from "../hooks/useSignIn.js";

const AuthPage = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, loading } = useSignIn();
  return (
    <>
      {
        <div
          className={
            "min-h-screen flex p-4 items-center justify-center bg-gradient-to-br from-red-500  to-pink-500"
          }
        >
          <div className={"w-full max-w-md space-y-8 "}>
            <h2 className="text-center text-3xl font-extrabold text-white mb-8">
              {isLogin ? <h1>Sign in to swipe</h1> : <h1>Sign up</h1>}
            </h2>
            <div className="bg-white shadow-xl rounded-lg p-8">
              {isLogin === true ? (
                <LoginForm
                  isLogin={isLogin}
                  login={login}
                  loading={loading}
                  setIsLogin={setIsLogin}
                />
              ) : (
                <SignUpForm
                  login={login}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

AuthPage.propTypes = {};

export default AuthPage;
