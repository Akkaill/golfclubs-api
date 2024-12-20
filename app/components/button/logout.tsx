"use client";
import { signOut } from "next-auth/react";
export default function LogoutBTN() {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Logout
    </button>
  );
}
