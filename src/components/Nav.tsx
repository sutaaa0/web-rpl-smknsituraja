"use client"
import React from "react";
import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import { NavbarWrapp } from "./Navbar";

export function Nav() {
  const pathname = usePathname();

  if (
    pathname === "/admin/create" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/settings" ||
    pathname === "/admin/profile" ||
    pathname === "/admin"
  ) {
    return null;
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      <NavbarWrapp />
      <MobileSidebar />
    </div>
  );
}



export default Nav;