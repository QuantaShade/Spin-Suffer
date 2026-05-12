import { Link } from "react-router-dom";
import { Skull, Menu, X } from "lucide-react";
import { useState } from "react";
import { gameName } from "@/lib";
import { useI18n } from "../provider/langProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { Theme } from "./mode-toggle";

export default function Header() {
  const { t, isRTL } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.howToPlay, href: "#how" },
    { label: t.nav.challenges, href: "#challenges" },
    { label: t.nav.play, href: "#play" },
  ];

  return (
    <>
      {/* Font import */}

      <header
        dir={isRTL ? "rtl" : "ltr"}
        className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Skull className="h-6 w-6 text-[#ff146e]" />
            <span
              className="text-xl text-white">
                {gameName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-semibold text-gray-400 transition-colors duration-200 hover:text-[#ff146e]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: lang switcher + CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>
            <Theme />

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black px-6 py-4 flex flex-col gap-4">
            <div className="flex">
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold text-gray-300 hover:text-[#ff146e]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}