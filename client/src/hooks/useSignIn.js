import { postLogin } from "../services/apiServices.js";
import { useState } from "react";

import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
const UseSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await postLogin(email, password);
      if (response && response?.success === true && response?.user) {
        localStorage.setItem("authuser", JSON.stringify(response?.user));
        localStorage.setItem("auth-user-id",  JSON.stringify(response?.user?._id));
        useAuthStore.getState().setAuthUser(response?.user);
        navigate("/");
      }
      setLoading(false);
      return response;
    } catch (e) {
      setLoading(false);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default UseSignIn;
