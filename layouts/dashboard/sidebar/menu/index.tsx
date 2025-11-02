'use client';

import Link from "next/link"
import menuItems from "./menu-items"
import { usePathname } from "next/navigation";

const SidebarMenu = () => {

  const pathname = usePathname();

  return (
    <div
      className="space-y-4"
    >
      {menuItems.map((menu, index) => (
        <Link
          key={index}
          href={menu.href}
          className={"block py-3 px-5 rounded-md border border-stroke-light" + ` ${pathname === menu.href ? "bg-theme-primary text-white" : "bg-background-2"}`}
        >{menu.label}</Link>
      ))}
    </div>
  )
}

export default SidebarMenu
