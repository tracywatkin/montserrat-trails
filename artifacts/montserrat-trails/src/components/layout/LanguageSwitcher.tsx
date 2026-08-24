import { Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1.5 px-2.5"
          aria-label="Change language"
        >
          <Languages className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wide">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={lang.code === language ? "bg-secondary/60 font-medium" : ""}
          >
            {lang.code === "en" && "English"}
            {lang.code === "es" && "Español"}
            {lang.code === "ca" && "Català"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
