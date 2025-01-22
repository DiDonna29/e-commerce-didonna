// NavLinks.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  UserGroupIcon,
  HomeIcon,
  ShoppingCartIcon,
  ClipboardDocumentCheckIcon,
  ArrowDownOnSquareIcon,
  HeartIcon,
  ArrowDownRightIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

// Map of links to display in the navigation
export const publicLinks = [
  {
    name: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    name: "Landing",
    href: "/",
    icon: ArrowDownOnSquareIcon,
  },
  {
    name: "Products",
    href: "/Product",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Dark Mode",
    href: "/darkmode",
    icon: MoonIcon,
  },
];

export const personalLinks = [
  {
    name: "Cart",
    href: "/cart",
    icon: ShoppingCartIcon,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: UserGroupIcon,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: HeartIcon,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: ArrowDownRightIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-4">
        {publicLinks.map(link => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-white hover:text-green-500 flex items-center space-x-2",
                {
                  "text-green-500": pathname === link.href,
                }
              )}>
              <span className="hidden md:block">{link.name}</span>
              <LinkIcon className="w-6" />
            </Link>
          );
        })}
      </div>
      <div className="flex items-center space-x-4">
        {personalLinks.map(link => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-white hover:text-green-500 flex items-center space-x-2",
                {
                  "text-green-500": pathname === link.href,
                }
              )}>
              <LinkIcon className="w-6" />
              <span className="hidden md:block">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
