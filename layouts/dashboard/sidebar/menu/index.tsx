'use client';

import Link from "next/link"
import menuItems from "./menu-items"
import { usePathname } from "next/navigation";
import SubmenuItem from "./submenu-item";

const SidebarMenu = () => {

  const pathname = usePathname();

  return (
    <div
      className="space-y-4 pt-4"
    >
      {menuItems.map((menu, index) => {

        if (typeof menu === "string") {
          return (
            <h2
              key={index}
              className="text-sm font-semibold underline"
            >{menu}</h2>
          )
        }

        if (menu.submenu) {
          return (
            <SubmenuItem
              key={index}
              menuItem={menu}
            />
          )
        }

        return (
          <Link
            key={index}
            href={menu.href}
            className={"flex items-center gap-3 py-3 px-5 rounded-full shadow-md shadow-theme-primary/20" + ` ${pathname === menu.href ? "bg-theme-primary text-white" : "bg-theme-primary/10"}`}
          >
            <menu.icon
              size={20}
              className={`${pathname !== menu.href ? "text-theme-primary" : ""}`}
            />
            <p>{menu.label}</p>
          </Link>
        )

      })}
    </div>
  )
}

export default SidebarMenu
