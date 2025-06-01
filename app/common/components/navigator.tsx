import { Link, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport } from "./ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogInIcon, SettingsIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { LogOutIcon } from "lucide-react";

const links: { label: string; to: string, trigger: boolean, isDisabled: boolean, submenu: { label: string; to: string }[] }[] = [
  {
    label: "스탭픽이란?",
    to: "#about",
    trigger: false,
    isDisabled: false,
    submenu: [
      {
        label: "Submenu 1",
        to: "#submenu1"
      },
      {
        label: "Submenu 2",
        to: "#submenu2"
      }
    ]
  },
  {
    label: "픽과 함께하기!",
    to: "#action-picks",
    trigger: false,
    isDisabled: false,
    submenu: [
      {
        label: "Submenu 1",
        to: "#submenu1"
      }
    ]
  },
  {
    label: "뉴스",
    to: "#news",
    trigger: false,
    isDisabled: false,
    submenu: [
      {
        label: "Submenu 1",
        to: "#submenu1"
      },
      {
        label: "Submenu 2",
        to: "#submenu2"
      }
    ]
  },
  {
    label: "문의하기",
    to: "#contact",
    trigger: false,
    isDisabled: false,
    submenu: []
  }
]

export default function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    const element = document.querySelector(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex w-full items-center justify-between h-[60px] bg-transparent/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 px-[140px]">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <div className="text-2xl text-[#222222] font-bold">
            <Link to="/">
              Step Pick
            </Link>
          </div>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {location.pathname === "/" && (
              <ul className="flex gap-4 items-center justify-center">
                {
                  links.map((link) => (
                    <li key={link.to} className={link.isDisabled ? "opacity-50 pointer-events-none" : ""}>
                      {link.trigger ? (
                        <a href={link.to} onClick={(e) => handleClick(e, link.to)}>
                          <NavigationMenuItem className="bg-amber-500">
                            <NavigationMenuTrigger >
                              {link.label}
                            </NavigationMenuTrigger>

                            <NavigationMenuContent className="">
                              <ul className="flex flex-col gap-3 p-2 text-nowrap">
                                {link.submenu.map((submenu) => (
                                  <li key={submenu.to}>
                                    <a href={submenu.to} onClick={(e) => handleClick(e, submenu.to)}>
                                      <NavigationMenuLink>
                                        {submenu.label}
                                      </NavigationMenuLink>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </a>
                      ) : (
                        <Link to={link.to} onClick={(e) => handleClick(e, link.to)}>
                          <span className={navigationMenuTriggerStyle()}>
                            {link.label}
                          </span>
                        </Link>
                      )}
                    </li>
                  ))
                }

              </ul>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Login & Signup */}
      <div className="flex items-center">
        {isLoggedIn ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>
                  <span className="text-sm font-medium">
                    Max
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/profile" className="flex items-center">
                      <div className="flex">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span>프로필</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/dashboard" className="flex items-center">
                      <div className="flex">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <span>대쉬보드</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-not-allowed opacity-50">
                    <Link to="/purchase-history" className="flex items-center">
                      <div className="flex">
                        <ShoppingBagIcon className="w-4 h-4 mr-2" />
                        <span>구매내역</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/logout" className="flex items-center">
                    <div className="flex">
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      <span>로그아웃</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <Link to="/login" className="flex items-center">
              <div className="flex items-center hover:opacity-75">
                <LogInIcon className="w-4 h-4 mr-2" />
                <span>로그인</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}