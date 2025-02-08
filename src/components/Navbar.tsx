"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            JobFit AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg ${
                pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/profile"
              className={`px-4 py-2 rounded-lg ${
                pathname === "/profile"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Profile
            </Link>
            <Link
              href="/history"
              className={`px-4 py-2 rounded-lg ${
                pathname === "/history"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              History
            </Link>
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
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg ${
              pathname === "/"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Home
          </Link>
          <Link
            href="/profile"
            className={`px-4 py-2 rounded-lg ${
              pathname === "/profile"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/history"
            className={`px-4 py-2 rounded-lg ${
              pathname === "/history"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            History
          </Link>
          <Link
            href="/login"
            className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
