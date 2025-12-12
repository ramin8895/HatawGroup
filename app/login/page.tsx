"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="mt-80 login ">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-80"
      >
        ورود با گوگل
      </button>
    </div>
  );
}