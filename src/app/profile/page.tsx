"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {session ? (
        <button
          onClick={() => signOut()}
          className="block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 my-2"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
        >
          Login
        </button>
      )}
    </div>
  );
}
