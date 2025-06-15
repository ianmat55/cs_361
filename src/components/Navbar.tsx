// "use client";
//
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
//
// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const pathname = usePathname();
// const { data: session, status } = useSession();
//
//   if (status === "loading") {
//     return;
//   }
//
//   return (
//     <nav className="bg-white shadow-sm border-b border-dotted border-gray-200">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-2xl font-bold text-gray-900 tracking-tight"
//           >
//             JobFit AI
//           </Link>
//
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link
//               href="/"
//               className={`text-sm px-4 py-2 rounded-lg transition ${
//                 pathname === "/"
//                   ? "text-blue-600 font-semibold"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               href="/profile"
//               className={`text-sm px-4 py-2 rounded-lg transition ${
//                 pathname === "/profile"
//                   ? "text-blue-600 font-semibold"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               Profile
//             </Link>
//             {session ? (
//               <button
//                 onClick={() => signOut()}
//                 className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={() => signIn()}
//                 className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden text-gray-700 focus:outline-none text-xl"
//           >
//             ☰
//           </button>
//         </div>
//       </div>
//
//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden flex flex-col items-center bg-white shadow-sm border-t border-gray-100">
//           <Link
//             href="/"
//             className={`w-full text-center py-2 ${
//               pathname === "/"
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-700 hover:text-blue-600"
//             }`}
//           >
//             Home
//           </Link>
//           <Link
//             href="/profile"
//             className={`w-full text-center py-2 ${
//               pathname === "/profile"
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-700 hover:text-blue-600"
//             }`}
//           >
//             Profile
//           </Link>
//           <Link
//             href="/history"
//             className={`w-full text-center py-2 ${
//               pathname === "/history"
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-700 hover:text-blue-600"
//             }`}
//           >
//             History
//           </Link>
//           {session ? (
//             <button
//               onClick={() => signOut()}
//               className="w-full text-center py-2 text-sm bg-red-500 text-white hover:bg-red-600 my-2 rounded-lg"
//             >
//               Logout
//             </button>
//           ) : (
//             <button
//               onClick={() => signIn()}
//               className="w-full text-center py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 my-2 rounded-lg"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold">JobFit.ai</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-m-2.5 p-2.5">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {session ? (
                      <Button variant="ghost" onClick={() => signOut()}>
                        Sign Out
                      </Button>
                    ) : (
                      <Button variant="ghost" onClick={() => signIn()}>
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {session ? (
            <Button variant="ghost" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
