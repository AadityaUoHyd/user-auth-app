import { Link } from "react-router";
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
import { getCurrentUser } from "@/services/auth.service";
import toast from "react-hot-toast";
function Sidebar() {
return (<>

    <aside className="hidden w-64 shrink-0 border-r bg-card md:block ">
              <div className="flex h-14 items-center gap-2 border-b px-4">
                <div className="h-6 w-6 text-primary">
                  <UserCog className="h-6 w-6" />
                </div>
                <span
                  onClick={async () => {
                    const user = await getCurrentUser();
                    toast.success(`Hello ${user.name}`);
                  }}
                  className="font-semibold tracking-tight"
                >
                  Auth Admin
                </span>
              </div>
              <nav className="p-3 space-y-1">
                <NavItem
                  to="/dashboard"
                  icon={<Home className="h-4 w-4" />}
                  label="Overview"
                />
                <NavItem
                  to="/dashboard/analytics"
                  icon={<BarChart2 className="h-4 w-4" />}
                  label="Analytics" />
                <NavItem
                  to="/dashboard/customers"
                  icon={<Users className="h-4 w-4" />}
                  label="Customers"
                />
                <NavItem
                  to="/dashboard/projects"
                  icon={<FolderGit2 className="h-4 w-4" />}
                  label="Projects"
                />
                <NavItem
                  to="/dashboard/settings"
                  icon={<Settings className="h-4 w-4" />}
                  label="Settings"
                />
              </nav>
            </aside>
    </>);
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

export default Sidebar;