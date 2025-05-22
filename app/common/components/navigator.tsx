import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport } from "./ui/navigation-menu";

const links: { label: string; to: string, trigger: boolean, isDisabled: boolean, submenu: { label: string; to: string }[] }[] = [
    {
        label: "About",
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
        label: "Action Picks",
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
        label: "What's New",
        to: "#news",
        trigger: true,
        isDisabled: true,
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
        label: "Contact",
        to: "#contact",
        trigger: false,
        isDisabled: false,
        submenu: []
    }
]

export default function Navigation() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
        e.preventDefault();
        const element = document.querySelector(to);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex items-center h-[60px] bg-transparent/50 backdrop-blur-sm px-8 fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center mr-4">
                <div className="text-2xl text-[#222222] font-bold">Step Pick</div>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <ul className="flex gap-4 items-center justify-center">
                        {links.map((link) => (
                            <li key={link.to} className={link.isDisabled ? "opacity-50 pointer-events-none" : ""}>
                                {link.trigger ? (
                                    <a href={link.to} onClick={(e) => handleClick(e, link.to)}>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className="">
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
                                    <a href={link.to} onClick={(e) => handleClick(e, link.to)}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {link.label}
                                        </NavigationMenuLink>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}