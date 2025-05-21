
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Home, 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Settings, 
  LogOut 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  userRole?: 'manager' | 'storekeeper';
}

const Sidebar = ({ isOpen, userRole }: SidebarProps) => {
  const { logout } = useAuth();
  const location = useLocation();

  // Define navigation items with role restrictions
  const navItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      path: "/",
      allowedRoles: ['manager', 'storekeeper'],
    },
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      allowedRoles: ['manager'],
    },
    {
      title: "Products",
      icon: <Package size={20} />,
      path: "/products",
      allowedRoles: ['manager', 'storekeeper'],
    },
    {
      title: "Add Product",
      icon: <PlusCircle size={20} />,
      path: "/products/add",
      allowedRoles: ['manager', 'storekeeper'],
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      allowedRoles: ['manager', 'storekeeper'],
    }
  ];

  // Filter based on user role
  const filteredNavItems = navItems.filter(item => 
    !userRole || item.allowedRoles.includes(userRole)
  );

  return (
    <div 
      className={cn(
        "h-[100vh] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        isOpen ? "w-[240px] px-3" : "w-16 px-1"
      )}
    >
      <div className="flex h-16 items-center justify-center">
        <div className={cn("font-bold text-xl", isOpen ? "block" : "hidden")}>
          <span className="text-theme-purple">Bitstore</span>
        </div>
        <div className={cn("font-bold text-xl", isOpen ? "hidden" : "block")}>
          <span className="text-theme-purple">B</span>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        {filteredNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center py-3 px-3 rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-theme-purple-light text-theme-purple font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
              isOpen ? "" : "justify-center"
            )}
          >
            {item.icon}
            {isOpen && <span className="ml-3">{item.title}</span>}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-3">
        <button
          onClick={logout}
          className={cn(
            "flex w-ful items-center py-3 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            isOpen ? "" : "justify-center"
          )}
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
