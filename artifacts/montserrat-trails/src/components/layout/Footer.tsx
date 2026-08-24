import { Mountain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-muted-foreground" />
            <span className="font-serif font-semibold text-muted-foreground">
              {t.nav.brand}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>{t.footer.tagline}</p>
            <p className="mt-1 opacity-75">{t.footer.leaveNoTrace}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
