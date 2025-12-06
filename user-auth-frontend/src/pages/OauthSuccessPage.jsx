import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/utils/auth";
import { refreshToken } from "@/services/auth.service";

function OAuthSuccessPage() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const set = useAuthStore((state) => state.set);
  const bootstrap = useAuthStore((state) => state.bootstrap);
  const navigate = useNavigate();
  const TOKEN_KEY = useAuthStore((state) => state.TOKEN_KEY);

  useEffect(() => {
    async function handleOAuthSuccess() {
      try {
        // First, use the refresh token cookie to get a new access token
        const tokens = await refreshToken();
        
        // Store the access token
        localStorage.setItem(TOKEN_KEY, tokens.accessToken);
        setAccessToken(tokens.accessToken);
        
        // Now bootstrap the user session
        await bootstrap();
        
        toast.success("Successfully authenticated!");
        navigate("/dashboard");
      } catch (err) {
        console.error("OAuth authentication error:", err);
        toast.error("Failed to authenticate. Please log in again.");
        navigate("/login");
      }
    }

    handleOAuthSuccess();
  }, [setAccessToken, set, bootstrap, navigate, TOKEN_KEY]);

  return (
    <div>
      <h1 className="text-2xl text-center m-10">Authenticating...</h1>
    </div>
  );
}

export default OAuthSuccessPage;
