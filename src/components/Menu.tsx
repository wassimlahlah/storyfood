"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

interface MenuProps {
  locale: string;
  onLanguageClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ locale, onLanguageClick }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { t } = useTranslation();

  const links = [
    { id: 1, title: t("Home"), url: "/" },
    { id: 2, title: t("Menu"), url: "/menu" },
    { id: 3, title: t("Contact"), url: "/contact" },
  ];

  const isAdmin = session?.user?.isAdmin;
  const isAuthenticated = session?.user;

  return (
    <div>
      {/* زر فتح/إغلاق القائمة */}
      {!open ? (
        <Image
          src="/open.png"
          alt="Open Menu"
          width={25}
          height={25}
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        />
      ) : (
        <Image
          src="/close.png"
          alt="Close Menu"
          width={25}
          height={25}
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      )}

      {/* القائمة المفتوحة */}
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full 
        h-[calc(100vh-6rem)] flex flex-col gap-4 z-10 items-center justify-center text-xl p-4">

          {/* الروابط العامة */}
          {links.map(item => (
            <Link
              href={item.url}
              key={item.id}
              onClick={() => setOpen(false)}
              className="py-2 px-4 rounded hover:bg-red-600 w-3/4 text-center"
            >
              {item.title}
            </Link>
          ))}

          {/* Links حسب حالة المستخدم */}
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <>
                  <Link
                    href="/orders"
                    onClick={() => setOpen(false)}
                    className="py-2 px-4 rounded hover:bg-red-600 w-3/4 text-center"
                  >
                    {t("orders")}
                  </Link>

                  <Link
                    href="/add"
                    onClick={() => setOpen(false)}
                    className="py-2 px-4 rounded text-amber-300  w-3/4 text-center font-bold text-2xl"
                  >
                    +
                  </Link>
                </>
              )}

              {/* Logout */}
              <span
                className="py-2 px-4 rounded hover:bg-red-600 cursor-pointer w-3/4 text-center block"
                onClick={() => { setOpen(false); /* signOut هنا */ }}
              >
                {t("Logout")}
              </span>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="py-2 px-4 rounded hover:bg-red-600 w-3/4 text-center"
            >
              {t("login")}
            </Link>
          )}

          {/* CartIcon */}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="py-2 px-4 rounded hover:bg-red-600 w-3/4 text-center flex justify-center"
          >
            <CartIcon />
          </Link>

          {/* زر اللغة */}
          <button
            onClick={onLanguageClick}
            className="py-2 px-4 rounded text-amber-400 w-3/4 text-center"
          >
            {locale === "en" ? "ع" : "E"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
