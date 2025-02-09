"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Login</h1>
        <p className="text-gray-600 mb-6">
          This app requires a Linkedin account to work
        </p>
        <button
          onClick={() => signIn("")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
        >
          Sign in with Linkedin
        </button>
      </div>
    </div>
  );
}
