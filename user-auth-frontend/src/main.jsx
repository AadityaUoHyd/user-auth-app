import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppLayout from "./pages/app.layout";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import OAuthSuccessPage from "./pages/OauthSuccessPage";
import { Home, Layout } from "lucide-react";
import { default as UserDashBoardHome } from "./pages/user/HomePage";
import UserLayout from "./pages/user/UserLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/user/Dashboard";
import DashboardComponent from "./pages/user/DashboardComponent";
import ProfilePage from "./pages/ProfilePage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProjectsPage from "./pages/ProjectsPage";
import CustomersPage from "./pages/CustomersPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DocumentationPage from "./pages/footer-pages/DocumentationPage";
import SupportPage from "./pages/footer-pages/SupportPage";
import TermsConditionPage from "./pages/footer-pages/TermsConditionPage";
import PrivacyPolicyPage from "./pages/footer-pages/PrivacyPolicyPage";

createRoot(document.getElementById("root")).render(
  <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
    <BrowserRouter>
      <Toaster />
      <Routes>

        <Route path="/" element={<AppLayout />}>

          {/* DEFAULT PAGE */}
          <Route index element={<HomePage />} />

          {/* AUTH PAGES */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="auth/success" element={<OAuthSuccessPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />

          {/* FOOTER PAGES */}
          <Route path="docs" element={<DocumentationPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="terms" element={<TermsConditionPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />

          {/* DASHBOARD LAYOUT */}
          <Route path="dashboard" element={<UserLayout />}>

            {/* Dashboard Shell */}
            <Route element={<Dashboard />}>

              {/* DEFAULT PAGE = Overview */}
              <Route index element={<DashboardComponent />} />

              {/* Subpages */}
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="billing" element={<BillingPage />} />

            </Route>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

