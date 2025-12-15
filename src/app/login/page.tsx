"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  // Redirect when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center p-4">Loading...</p>;
  }

  if (status === "authenticated") {
    return null; // éviter rendu inutile avant la redirection
  }

  return (
    <div className="p-4 h-[calc(110vh-6rem)] md:h-[calc(110vh-9rem)] flex items-center justify-center">
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        
        {/* IMAGE */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/loginBg.png"
            alt="Login background"
            fill
            className="object-cover rounded-t-md md:rounded-l-md md:rounded-tr-none"
          />
        </div>

        {/* FORM */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>

          <button
            className="flex gap-4 p-4 ring-1 ring-orange-200 rounded-md hover:bg-orange-50 transition"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt="Google logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>

          <p className="text-sm">
            Have a problem?
            <Link className="underline ml-1" href="/">
              Contact us
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
