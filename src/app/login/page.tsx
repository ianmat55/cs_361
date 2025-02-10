"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated" && !session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Login</h1>
        <p className="text-gray-600 mb-6">
          This app requires a LinkedIn account to work
        </p>
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mb-2 hover:bg-red-600"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("linkedin")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
        >
          Sign in with LinkedIn
        </button>
      </div>
    </div>
  );
}
