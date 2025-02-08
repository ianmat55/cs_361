import Link from "next/link";

interface NavLinkProps {
  href: string;
  current: boolean;
  children: React.ReactNode;
}

export default function NavLink({ href, current, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg ${
        current
          ? "text-blue-600 font-semibold"
          : "text-gray-700 hover:text-blue-500"
      }`}
    >
      {children}
    </Link>
  );
}
