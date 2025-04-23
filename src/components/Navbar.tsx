"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-dotted border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            JobFit AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm px-4 py-2 rounded-lg transition ${
                pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/profile"
              className={`text-sm px-4 py-2 rounded-lg transition ${
                pathname === "/profile"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Profile
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-sm border-t border-gray-100">
          <Link
            href="/"
            className={`w-full text-center py-2 ${
              pathname === "/"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/profile"
            className={`w-full text-center py-2 ${
              pathname === "/profile"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/history"
            className={`w-full text-center py-2 ${
              pathname === "/history"
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            History
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="w-full text-center py-2 text-sm bg-red-500 text-white hover:bg-red-600 my-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="w-full text-center py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 my-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
