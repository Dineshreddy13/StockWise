import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import NavItems from "./NavItems";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token & user
    navigate("/auth"); // redirect to auth page
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-400 hover:text-yellow-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl || ""} />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
              {user.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-center">
            <span className="text-base font-medium text-gray-400">
              {user.username || "User"}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl || ""} />
              <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                {user.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.username || "User"}
              </span>
              <span className="text-sm text-gray-400">{user.email || "user@example.com"}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center text-gray-100"
        >
          <LogOut className="h-4 w-4 sm:block" />
          Logout
        </DropdownMenuItem>
        <nav className="sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
