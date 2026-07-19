import { Mountain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-muted-foreground" />
            <span className="font-serif font-semibold text-muted-foreground">
              Montserrat Trails
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>A trusted guide to the serrated mountain.</p>
            <p className="mt-1 opacity-75">Respect the trails. Leave no trace.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
