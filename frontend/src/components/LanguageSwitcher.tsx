import { useI18n, type Lang } from "./provider/langProvider";


const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "so", label: "SO", flag: "🇸🇴" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {LANGS.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-widest transition-all duration-200 ${
            lang === code
              ? "bg-[#ff146e] text-white shadow-lg shadow-[#ff146e]/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}