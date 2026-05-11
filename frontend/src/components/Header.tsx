import { Link } from "react-router-dom";
import { Skull, Menu, X } from "lucide-react";
import { useState } from "react";
import { gameName } from "@/lib";
import { useI18n } from "./provider/langProvider";
import LanguageSwitcher from "./LanguageSwitcher";

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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@400;600;700&display=swap');`}</style>

      <header
        dir={isRTL ? "rtl" : "ltr"}
        className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Skull className="h-6 w-6 text-[#ff146e]" />
            <span
              className="text-xl text-white"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              {gameName}
              <span className="text-[#ff146e]"> Challenge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-400 transition-colors duration-200 hover:text-[#ff146e]"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "1.05rem" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: lang switcher + CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#play"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border-2 border-[#ff146e] bg-[#ff146e] px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:bg-transparent hover:text-[#ff146e]"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              {t.nav.play}
            </a>

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold text-gray-300 hover:text-[#ff146e]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}