import { useAuthStore } from "@/utils/auth";
import React from "react";
import Dashboard from "./Dashboard";

function HomePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default HomePage;
