import { useAuthStore } from "@/utils/auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React, { use } from "react";
import { Outlet } from "react-router";

function AppLayout() {
  const bootStrap = useAuthStore((state) => state.bootstrap);
  bootStrap();
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
