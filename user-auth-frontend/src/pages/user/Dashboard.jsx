import { Link } from "react-router";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Outlet } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import {
  Menu,
  Bell,
  Search,
  Plus,
  Settings,
  LogOut,
  Home,
  BarChart2,
  Users,
  FolderGit2,
  User,
  UserCog
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/utils/auth";
import { getCurrentUser } from "@/services/auth.service";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import DashboardComponent from "./DashboardComponent";

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-full bg-background text-foreground">
      {/* App Shell */}
      <div className="flex h-full overflow-hidden">
        {/* Sidebar (desktop) */}
        <Sidebar />

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 h-14 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-2 px-4">
              {/* Mobile: sidebar */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="px-4 py-3">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="h-6 w-6 text-primary">
                        <UserCog className="h-6 w-6" />
                      </div>
                      <span>Auth Admin</span>
                    </SheetTitle>
                  </SheetHeader>
                  <Separator />
                  <nav className="p-3 space-y-1">
                    <NavItem
                      to="/dashboard"
                      icon={<Home className="h-4 w-4" />}
                      label="Overview"
                      active
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      to="/dashboard/analytics"
                      icon={<BarChart2 className="h-4 w-4" />}
                      label="Analytics"
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      to="/dashboard/customers"
                      icon={<Users className="h-4 w-4" />}
                      label="Customers"
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      to="/dashboard/projects"
                      icon={<FolderGit2 className="h-4 w-4" />}
                      label="Projects"
                      onClick={() => setOpen(false)}
                    />
                    <NavItem
                      to="/dashboard/settings"
                      icon={<Settings className="h-4 w-4" />}
                      label="Settings"
                      onClick={() => setOpen(false)}
                    />
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Search */}
              <div className="relative ml-auto w-full max-w-md">
                <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search…" className="pl-8" />
              </div>

              {/* Actions */}
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>

              <UserMenu />
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 mx-auto w-full max-w-screen-2xl p-4 md:p-6">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}


function NavItem({ to, icon, label, active, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
        active ? "bg-muted font-medium" : "hover:bg-muted",
      ].join(" ")}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}


function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);  // Add this line
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-1 inline-flex items-center gap-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={user.image}
              alt="user"
            />
            <AvatarFallback className="flex items-center justify-center bg-gray-100">
              <User className="h-4 w-4 text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link to="/dashboard/profile">Profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Link to="/dashboard/billing">Billing</Link></DropdownMenuItem>
        <DropdownMenuItem><Link to="/dashboard/settings">Settings</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 hover:text-red-300 flex items-center cursor-pointer"  // Add flex + cursor for better UX
          onClick={logout}  // Add this onClick
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dashboard;