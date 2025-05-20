import { Link } from "react-router";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport } from "./ui/navigation-menu";
const links: { label: string; to: string, trigger: boolean, isDisabled: boolean, submenu: { label: string; to: string }[] }[] = [
    {
        label: "About",
        to: "/about",
        trigger: false,
        isDisabled: false,
        submenu: [
            {
                label: "Submenu 1",
                to: "/submenu1"
            },
            {
                label: "Submenu 2",
                to: "/submenu2"
            }
        ]
    },
    {
        label: "FAQ",
        to: "/faq",
        trigger: false,
        isDisabled: false,
        submenu: [
            {
                label: "Submenu 1",
                to: "/submenu1"
            }
        ]
    },
    {
        label: "Shop",
        to: "/shop",
        trigger: true,
        isDisabled: true,
        submenu: [
            {
                label: "Submenu 1",
                to: "/submenu1"
            },
            {
                label: "Submenu 2",
                to: "/submenu2"
            }
        ]
    },
    {
        label: "Contact",
        to: "/contact",
        trigger: false,
        isDisabled: false,
        submenu: []
    }
]
export default function Navigation() {
    return (
        <div className="flex items-center h-[60px] bg-transparent/50 backdrop-blur-sm px-8 fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center mr-2">
                <div>Logo</div>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <ul className="flex gap-4 items-center justify-center">
                        {links.map((link) => (
                            <li key={link.to} className={link.isDisabled ? "opacity-50 pointer-events-none" : ""}>
                                {link.trigger ? (
                                    <Link to={link.to}>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className="">
                                                {link.label}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="">
                                                <ul className="flex flex-col gap-3 p-2 text-nowrap">
                                                    {link.submenu.map((submenu) => (
                                                        <li>
                                                            <Link to={submenu.to}>
                                                                <NavigationMenuLink>
                                                                    {submenu.label}
                                                                </NavigationMenuLink>
                                                            </Link>
                                                        </li>

                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </Link>
                                ) : (
                                    <Link to={link.to}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {link.label}
                                        </NavigationMenuLink>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    {/* <NavigationMenuItem>
                    <Link to="/about">
                        <NavigationMenuLink>
                            About
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem> */}
                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}