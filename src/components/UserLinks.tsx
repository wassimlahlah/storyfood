// components/UserLinks.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const UserLinks = () => {
  const { data: session, status } = useSession();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/"); // بعد logout نروح للصفحة الرئيسية
  };

  const isAdmin = session?.user?.isAdmin;

  if (status !== "authenticated") {
    return (
      <Link href="/login" className="text-amber-500 font-medium">
        {t("login")}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {isAdmin && (
        <>
          <Link
            href="/add"
            className="p-3 rounded-full flex items-center justify-center text-amber-400 text-3xl font-bold"
          >
            +
          </Link>
          <Link href="/orders" className="text-amber-500 font-medium">
            {t("orders")}
          </Link>
        </>
      )}

      <span
        onClick={handleLogout}
        className="cursor-pointer text-amber-500 font-medium"
      >
        {t("Logout")}
      </span>
    </div>
  );
};

export default UserLinks;
