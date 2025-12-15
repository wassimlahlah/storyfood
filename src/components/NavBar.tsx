// components/Navbar.tsx
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    setLocale(savedLang);
    setMounted(true);
  }, [i18n]);

  if (!mounted) return null;

  const languageClick = () => {
    const newLang = locale === "en" ? "ar" : "en";
    setLocale(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <nav className="w-full bg-white border-b-2 border-red-500 uppercase">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-16 md:h-24 px-4 lg:px-20 xl:px-40">

        {/* Left - Desktop Links */}
        <div className="hidden md:flex flex-1 gap-6 text-red-500 font-medium items-center">
          <Link href="/">{t("Home")}</Link>
          <Link href="/menu">{t("Menu")}</Link>
          <Link href="/contact">{t("Contact")}</Link>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 text-center text-2xl md:text-3xl font-bold text-red-500">
          <Link href="/">
            Story<span className="text-amber-500">Food</span>
          </Link>
        </div>

        {/* Right - User Links, Cart, Language */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <UserLinks />

          <Link href="/cart">
            <CartIcon />
          </Link>

          <button
            className="text-amber-300 font-bold text-lg"
            onClick={languageClick}
          >
            {locale === "en" ? "ع" : "E"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex-1 flex justify-end">
          <Menu locale={locale} onLanguageClick={languageClick} />
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
