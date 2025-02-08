"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      {" "}
      {/* ✅ Changed nav → header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            JobFit AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink href="/" current={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/profile" current={pathname === "/profile"}>
              Profile
            </NavLink>
            <NavLink href="/history" current={pathname === "/history"}>
              History
            </NavLink>
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md">
          <NavLink href="/" current={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/profile" current={pathname === "/profile"}>
            Profile
          </NavLink>
          <NavLink href="/history" current={pathname === "/history"}>
            History
          </NavLink>
          <Link
            href="/login"
            className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
