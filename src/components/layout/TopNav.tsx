
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
}

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center justify-between bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu size={20} />
        </Button>
        <div className="relative ml-4 w-full max-w-md hidden sm:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search"
            placeholder="Search..." 
            className="pl-10 w-full max-w-md focus-visible:ring-theme-purple border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="font-medium text-sm">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
