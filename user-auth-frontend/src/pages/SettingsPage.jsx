// src/pages/SettingsPage.jsx
import React, { useState, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/utils/auth";
import { updateSettings, deleteAccount } from "@/services/auth.service";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { Moon, Bell, Shield, Trash2, Save } from "lucide-react";

export default function SettingsPage() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    emailNotifications: true,
    twoFactor: false,
    privacy: "public",
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };


  const handleSave = useCallback(async () => {
    try {
      const updated = await updateSettings(settings);
      setUser({ ...user, ...updated });
      toast.success("Settings saved!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  }, [settings, setUser, user]);

  const logout = useAuthStore(state=>state.logout);
  const handleDeleteAccount = useCallback(async () => {
    if (confirm("Are you sure? This cannot be undone.")) {
      try {
        await deleteAccount();
        toast.success("Account deleted");
        await logout();
      } catch (e) {
        toast.error("Failed to delete account");
      }
    }
  }, [logout]);

  return (
    <div className="min-h-screen bg-background p-6 mb-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive in-app alerts.</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Get updates via email.</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />

            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add extra security to your account.</p>
              </div>
              <Switch
                checked={settings.twoFactor}
                onCheckedChange={(checked) => handleSettingChange("twoFactor", checked)}
              />
            </div>
            <div>
              <Label htmlFor="privacy" className="p-2">Privacy Level</Label>
              <Input
                id="privacy"
                value={settings.privacy}
                onChange={(e) => handleSettingChange("privacy", e.target.value)}
                placeholder="e.g., public, private"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="destructive" onClick={handleDeleteAccount} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
