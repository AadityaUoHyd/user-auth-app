import { useAuthStore } from "@/utils/auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React, { useEffect } from "react";
import { Outlet } from "react-router";

function AppLayout() {
  const bootStrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    bootStrap();
  }, [bootStrap]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Navbar />

      {/* Main content grows */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer stays at bottom */}
      <Footer className="mt-auto w-full" />
    </div>
  );
}

export default AppLayout;
