import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { auth, provider } from "@/helpers/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google-login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );
      console.log(bodyData)
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      return showToast("error", error.message);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
