// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "./ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import NavItems from "./NavItems";
// import { LogOut } from "lucide-react";
// import useAuth from "@/hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// const UserDropdown = () => {

//   const { user, logout } = useAuth(); // get user & logout
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // clears token & user
//     navigate("/auth"); // redirect to auth page
//   };

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-3 text-gray-400 hover:text-yellow-500">
//                     <Avatar className="h-8 w-8">
//                         <AvatarImage src="https://github.com/shadcn.pn" />
//                         <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
//                             {User.name[0].toUpperCase()}
//                         </AvatarFallback>
//                     </Avatar>
//                     <div className="hidden md:flex flex-col items-center">
//                         <span className="text-base font-medium text-gray-400">
//                             {User.name}
//                         </span>
//                     </div>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//                 <DropdownMenuLabel>
//                     <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                             <AvatarImage src="https://github.com/shadcn.pn" />
//                             <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
//                                 {User.name[0].toUpperCase()}
//                             </AvatarFallback>
//                         </Avatar>
//                         <div className="flex flex-col">
//                             <span className="text-base font-medium text-gray-400">
//                                 {User.name}
//                             </span>
//                             <span className="text-sm text-gray-400">
//                                 {User.email}
//                             </span>
//                         </div>
//                     </div>

//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
                
//                 <nav className="sm:hidden">
//                     <NavItems />
//                 </nav>
//                 <DropdownMenuSeparator className="sm:hidden"/>
//                 <DropdownMenuItem onClick={handleLogout} className="flex items-center text-gray-100">
//                     <LogOut className="h-4 w-4 sm:block"/>
//                     Logout
//                 </DropdownMenuItem>

//                 {/* <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Team</DropdownMenuItem>
//                 <DropdownMenuItem>Subscription</DropdownMenuItem> */}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }

// export default UserDropdown;

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
