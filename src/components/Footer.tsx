import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <p>© {new Date().getFullYear()} JobFit AI</p>
      <Link href="/faq" className="text-blue-400 hover:underline">
        FAQ
      </Link>
    </footer>
  );
}
